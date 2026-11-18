#!/usr/bin/env bash
# Установка AI Master на чистый сервер Ubuntu 22.04 / 24.04.
# Запуск из папки проекта под root:
#   bash deploy/setup.sh ваш-домен.uz [почта-для-сертификата]
# Повторный запуск безопасен — используйте его и для обновления.
set -euo pipefail

DOMAIN="${1:-}"
EMAIL="${2:-}"
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "$DOMAIN" ]; then echo "Укажите домен: bash deploy/setup.sh ваш-домен.uz"; exit 1; fi
if [ "$(id -u)" -ne 0 ]; then echo "Запустите под root (или через sudo)"; exit 1; fi
cd "$APP_DIR"

echo "== 1. Системные пакеты"
export DEBIAN_FRONTEND=noninteractive
apt-get update -y
apt-get install -y curl ca-certificates nginx ufw certbot python3-certbot-nginx

echo "== 2. Файл подкачки (страховка для сервера с 1 ГБ памяти)"
if ! swapon --show | grep -q .; then
  fallocate -l 1G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "== 3. Node.js 20 и pm2"
if ! command -v node >/dev/null || [ "$(node -p 'process.versions.node.split(".")[0]')" -lt 20 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
command -v pm2 >/dev/null || npm install -g pm2

echo "== 4. Зависимости сайта"
npm ci --omit=dev

echo "== 5. Настройки (.env)"
if [ ! -f .env ]; then
  cp .env.example .env
  PW="$(head -c 18 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c 16)"
  sed -i "s/^ADMIN_PASSWORD=.*/ADMIN_PASSWORD=${PW}/" .env
  echo "   Создан .env. Пароль админки: ${PW}"
  echo "   Впишите в .env TELEGRAM_BOT_TOKEN и TELEGRAM_CHAT_ID, затем: pm2 restart aimaster"
fi
chmod 600 .env
mkdir -p data

echo "== 6. Запуск сайта через pm2"
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save
pm2 startup systemd -u root --hp /root >/dev/null

echo "== 7. nginx"
sed "s/DOMAIN/${DOMAIN}/g" deploy/nginx-aimaster.conf > /etc/nginx/sites-available/aimaster
ln -sf /etc/nginx/sites-available/aimaster /etc/nginx/sites-enabled/aimaster
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "== 8. Файрвол"
ufw allow OpenSSH >/dev/null
ufw allow 'Nginx Full' >/dev/null
ufw --force enable >/dev/null

echo "== 9. HTTPS-сертификат"
if [ -n "$EMAIL" ]; then MAILARG=(--email "$EMAIL"); else MAILARG=(--register-unsafely-without-email); fi
if certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --non-interactive --agree-tos --redirect "${MAILARG[@]}"; then
  echo "   HTTPS включён для $DOMAIN и www.$DOMAIN"
elif certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --redirect "${MAILARG[@]}"; then
  echo "   HTTPS включён для $DOMAIN (для www нет A-записи — её можно добавить позже)"
else
  echo "   Сертификат пока не выдан — скорее всего, домен ещё не указывает на этот сервер."
  echo "   Когда A-запись заработает, повторите: bash deploy/setup.sh $DOMAIN $EMAIL"
fi

echo "== 10. Ежедневная резервная копия данных (хранится 14 дней)"
cat > /etc/cron.daily/aimaster-backup <<EOF
#!/bin/sh
mkdir -p /var/backups/aimaster
tar -czf /var/backups/aimaster/data-\$(date +%F).tar.gz -C "$APP_DIR" data .env
find /var/backups/aimaster -name 'data-*.tar.gz' -mtime +14 -delete
EOF
chmod +x /etc/cron.daily/aimaster-backup

echo
echo "Готово: https://${DOMAIN}  ·  админка: https://${DOMAIN}/admin"
pm2 status aimaster
