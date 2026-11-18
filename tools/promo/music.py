# Синтез оригинальной фоновой музыки (без сэмплов): лёгкий корпоративный lo-fi, 96 BPM.
import sys, wave
import numpy as np

SR = 24000
DUR = float(sys.argv[2]) if len(sys.argv) > 2 else 41.0
OUT = sys.argv[1]
BPM = 96
BEAT = 60 / BPM
BAR = BEAT * 4
N = int(SR * DUR)
t = np.arange(N) / SR
mix_pad = np.zeros(N); mix_arp = np.zeros(N); mix_bass = np.zeros(N); mix_drum = np.zeros(N)
rng = np.random.default_rng(7)

def hz(m): return 440.0 * 2 ** ((m - 69) / 12)

# Am – F – C – G (по 2 такта), голоса пэда в средней октаве
CHORDS = [[57, 60, 64, 69], [53, 57, 60, 65], [48, 55, 60, 64], [55, 59, 62, 67]]
ROOTS = [45, 41, 36, 43]

def add(buf, start, sig):
    i = int(start * SR)
    if i >= N: return
    j = min(N, i + len(sig))
    buf[i:j] += sig[: j - i]

def env_adsr(n, a, r):
    e = np.ones(n); na = max(1, int(a * SR)); nr = max(1, int(r * SR))
    e[:na] = np.linspace(0, 1, na); e[-nr:] *= np.linspace(1, 0, nr)
    return e

def pad_voice(f, length):
    n = int(length * SR); tt = np.arange(n) / SR
    s = np.zeros(n)
    for det in (-0.12, 0.0, 0.12):           # лёгкая расстройка — «тёплый» звук
        ff = f * 2 ** (det / 12)
        s += np.sin(2 * np.pi * ff * tt) + 0.25 * np.sin(4 * np.pi * ff * tt) + 0.08 * np.sin(6 * np.pi * ff * tt)
    return s / 3 * env_adsr(n, 0.6, 0.9)

def pluck(f, length=0.5):
    n = int(length * SR); tt = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * tt) + 0.35 * np.sin(4 * np.pi * f * tt) * np.exp(-tt * 18)
    return s * np.exp(-tt * 7) * env_adsr(n, 0.004, 0.05)

def bass(f, length):
    n = int(length * SR); tt = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(4 * np.pi * f * tt) + 0.1 * np.sin(6 * np.pi * f * tt)
    return s * np.exp(-tt * 2.2) * env_adsr(n, 0.01, 0.08)

def kick():
    n = int(0.35 * SR); tt = np.arange(n) / SR
    f = 45 + 85 * np.exp(-tt * 30)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-tt * 9)

def hat():
    n = int(0.06 * SR); x = rng.standard_normal(n)
    x = np.diff(np.concatenate([[0], x]))
    x = np.convolve(x, np.ones(3) / 3, 'same')    # смягчаем верха
    return x * np.exp(-np.arange(n) / SR * 90)

def snare():
    n = int(0.2 * SR); tt = np.arange(n) / SR
    x = np.convolve(rng.standard_normal(n), np.ones(4) / 4, 'same')
    return (0.5 * x + 0.5 * np.sin(2 * np.pi * 190 * tt)) * np.exp(-tt * 22)

bars = int(np.ceil(DUR / BAR))
ARP = [0, 2, 1, 3, 2, 1, 3, 2]
for b in range(bars):
    ci = (b // 2) % 4
    t0 = b * BAR
    if b % 2 == 0:
        for m in CHORDS[ci]:
            add(mix_pad, t0, pad_voice(hz(m), BAR * 2 + 0.6))
    # бас: 1, «и» 2, 3
    for off, ln in ((0, 0.9), (1.5, 0.45), (2, 0.9), (3.5, 0.4)):
        add(mix_bass, t0 + off * BEAT, bass(hz(ROOTS[ci]), ln * BEAT * 2))
    # арпеджио с 3-го такта
    if b >= 2:
        notes = CHORDS[ci]
        for k in range(8):
            add(mix_arp, t0 + k * BEAT / 2, pluck(hz(notes[ARP[k]] + 12)) * (1.0 if k % 2 == 0 else 0.7))
    # ударные с 5-го такта, кроме последних двух
    if 4 <= b < bars - 2:
        for k in range(4):
            add(mix_drum, t0 + k * BEAT, kick() * 0.9)
            add(mix_drum, t0 + k * BEAT + BEAT / 2, hat() * 0.07)
        for k in (1, 3):
            add(mix_drum, t0 + k * BEAT, snare() * 0.18)

def reverb(x, mix=0.3):
    y = x.copy()
    for d, g in ((0.0297, 0.6), (0.0371, 0.55), (0.0411, 0.5), (0.0437, 0.45)):
        n = int(d * SR); buf = np.zeros(len(x))
        for i in range(0, len(x), n):        # блочный гребенчатый фильтр
            seg = x[i:i + n] + (buf[i - n:i - n + len(x[i:i + n])] * g if i >= n else 0)
            buf[i:i + len(seg)] = seg
        y += buf * mix / 4
    return y

master = 0.20 * reverb(mix_pad, 0.5) + 0.13 * reverb(mix_arp, 0.35) + 0.28 * mix_bass + 0.30 * mix_drum
fi, fo = int(1.5 * SR), int(3.0 * SR)
master[:fi] *= np.linspace(0, 1, fi); master[-fo:] *= np.linspace(1, 0, fo)
master = np.tanh(master * 1.1) / np.tanh(1.1)
master /= np.max(np.abs(master)) / 0.85
pcm = (master * 32767).astype(np.int16)
with wave.open(OUT, 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('ok', OUT, round(len(pcm) / SR, 2), 's')
