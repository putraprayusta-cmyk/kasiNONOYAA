/* ==========================================================================
   ROYAL CASINO VIP - JAVASCRIPT ENGINE & GAME SUITE
   100% Offline Synthesizer Audio + 12 Fully Interactive Games
   ========================================================================== */

/* ==========================================================================
   1. SISTEM AUDIO SYNTHESIZER (Web Audio API)
   ========================================================================== */
class AudioSystem {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
  }

  initContext() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    document.getElementById('audioIcon').textContent = this.isMuted ? '🔇' : '🔊';
  }

  playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playThunder() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 0.4;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.1));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.4);
      
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start();
    } catch (e) {}
  }

  playExplosion() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(25, this.ctx.currentTime + 0.5);
      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.5);
    } catch (e) {}
  }

  playPegBounce() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const freq = 600 + Math.random() * 400;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch (e) {}
  }

  playShatter() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const notes = [880, 1174, 1480, 1760];
      notes.forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + (i * 0.03));
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime + (i * 0.03));
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + (i * 0.03) + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + (i * 0.03));
        osc.stop(this.ctx.currentTime + (i * 0.03) + 0.08);
      });
    } catch (e) {}
  }

  playCardDeal() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.14, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  playDiceRoll() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      for (let i = 0; i < 4; i++) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const f = 200 + Math.random() * 300;
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + (i * 0.06));
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + (i * 0.06));
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + (i * 0.06) + 0.05);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + (i * 0.06));
        osc.stop(this.ctx.currentTime + (i * 0.06) + 0.05);
      }
    } catch (e) {}
  }

  playWin() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + (idx * 0.1));
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + (idx * 0.1));
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + (idx * 0.1) + 0.3);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + (idx * 0.1));
        osc.stop(this.ctx.currentTime + (idx * 0.1) + 0.35);
      });
    } catch (e) {}
  }

  playLose() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(120, this.ctx.currentTime + 0.3);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch (e) {}
  }
}

const audioSys = new AudioSystem();

/* ==========================================================================
   2. MANAJER APLIKASI & STATE UTAMA
   ========================================================================== */
class CasinoApp {
  constructor() {
    this.chips = 1000;
    this.history = [];
  }

  updateUI() {
    const display = document.getElementById('headerChipDisplay');
    display.textContent = Number(this.chips).toLocaleString('id-ID');
  }

  adjustChips(amount) {
    this.chips += amount;
    this.updateUI();
    if (this.chips <= 0) {
      this.checkBankrupt();
    }
  }

  recordHistory(gameName, bet, resultText, change) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    this.history.unshift({
      time: timeStr,
      game: gameName,
      bet: bet,
      result: resultText,
      change: change
    });

    if (this.history.length > 10) {
      this.history.pop();
    }
  }

  openHistoryModal() {
    audioSys.playClick();
    const tbody = document.getElementById('historyTableBody');
    if (this.history.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--text-muted);">Belum ada riwayat permainan.</td></tr>`;
    } else {
      tbody.innerHTML = this.history.map(item => {
        const isProfit = item.change > 0;
        const isLoss = item.change < 0;
        const color = isProfit ? '#34d399' : (isLoss ? '#f87171' : '#94a3b8');
        const sign = isProfit ? '+' : '';
        return `
          <tr>
            <td style="color:var(--text-muted); font-size:0.75rem;">${item.time}</td>
            <td><strong>${item.game}</strong></td>
            <td>${item.bet.toLocaleString('id-ID')}</td>
            <td>${item.result}</td>
            <td style="color:${color}; font-weight:700;">${sign}${item.change.toLocaleString('id-ID')}</td>
          </tr>
        `;
      }).join('');
    }
    document.getElementById('historyModal').classList.add('open');
  }

  closeHistoryModal() {
    audioSys.playClick();
    document.getElementById('historyModal').classList.remove('open');
  }

  resetChips() {
    audioSys.playClick();
    if (confirm('Reset saldo kembali ke 1.000 chip virtual?')) {
      this.chips = 1000;
      this.updateUI();
    }
  }

  checkBankrupt() {
    if (this.chips <= 0) {
      setTimeout(() => {
        document.getElementById('bankruptModal').classList.add('open');
        audioSys.playLose();
      }, 800);
    }
  }

  refillAndRestart() {
    audioSys.playWin();
    this.chips = 1000;
    this.updateUI();
    document.getElementById('bankruptModal').classList.remove('open');
    this.showLobby();
  }

  showLobby() {
    audioSys.playClick();
    if (spacemanGame.state === 'flying') {
      spacemanGame.cashOut();
    }
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('viewLobby').classList.add('active');
  }

  filterLobby(category, btnEl) {
    audioSys.playClick();
    document.querySelectorAll('.lobby-tab-btn').forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');

    const cards = document.querySelectorAll('#lobbyGamesGrid .game-card');
    cards.forEach(c => {
      if (category === 'all') {
        c.style.display = 'flex';
      } else {
        const cats = c.dataset.cat || '';
        c.style.display = cats.includes(category) ? 'flex' : 'none';
      }
    });
  }

  openGame(gameType) {
    audioSys.playClick();
    document.querySelectorAll('.view-section').forEach(sec => sec.classList.remove('active'));
    
    if (gameType === 'olympus') {
      document.getElementById('viewOlympus').classList.add('active');
      olympusGame.init();
    } else if (gameType === 'mines') {
      document.getElementById('viewMines').classList.add('active');
      minesGame.init();
    } else if (gameType === 'plinko') {
      document.getElementById('viewPlinko').classList.add('active');
      plinkoGame.init();
    } else if (gameType === 'dragontiger') {
      document.getElementById('viewDragonTiger').classList.add('active');
      dtGame.init();
    } else if (gameType === 'duofu') {
      document.getElementById('viewDuofu').classList.add('active');
      duofuGame.init();
    } else if (gameType === 'spaceman') {
      document.getElementById('viewSpaceman').classList.add('active');
      spacemanGame.init();
    } else if (gameType === 'slot') {
      document.getElementById('viewSlot').classList.add('active');
    } else if (gameType === 'blackjack') {
      document.getElementById('viewBlackjack').classList.add('active');
      bjGame.initTable();
    } else if (gameType === 'roulette') {
      document.getElementById('viewRoulette').classList.add('active');
      rouletteGame.init();
    } else if (gameType === 'baccarat') {
      document.getElementById('viewBaccarat').classList.add('active');
      baccaratGame.init();
    } else if (gameType === 'poker') {
      document.getElementById('viewPoker').classList.add('active');
      pokerGame.init();
    } else if (gameType === 'sicbo') {
      document.getElementById('viewSicbo').classList.add('active');
      sicboGame.init();
    }
  }

  showBanner(bannerId, text, type = 'info') {
    const el = document.getElementById(bannerId);
    if (!el) return;
    el.className = `result-banner show ${type}`;
    el.textContent = text;
  }
}

const app = new CasinoApp();

/* ==========================================================================
   3. GAME 1: GATES OF OLYMPUS (Slot Kakek Zeus / Petir x500)
   ========================================================================== */
class GatesOfOlympusGame {
  constructor() {
    this.currentBet = 10;
    this.isSpinning = false;
    this.freeSpinsLeft = 0;
    this.totalFsMultiplier = 0;
    this.currentRoundMultiplier = 1;
    this.grid = []; // 6 columns x 5 rows
    this.symbols = [
      { id: 'crown', icon: '👑', name: 'Mahkota', pay: { 8: 10, 10: 25, 12: 50 } },
      { id: 'hourglass', icon: '⏳', name: 'Jam Pasir', pay: { 8: 2.5, 10: 10, 12: 25 } },
      { id: 'ring', icon: '💍', name: 'Cincin', pay: { 8: 2, 10: 5, 12: 15 } },
      { id: 'chalice', icon: '🏆', name: 'Cawan', pay: { 8: 1.5, 10: 2, 12: 12 } },
      { id: 'red_gem', icon: '🔴', name: 'Delima', pay: { 8: 1, 10: 1.5, 12: 10 } },
      { id: 'purple_gem', icon: '🟣', name: 'Ametis', pay: { 8: 0.8, 10: 1.2, 12: 8 } },
      { id: 'yellow_gem', icon: '🟡', name: 'Topas', pay: { 8: 0.5, 10: 1, 12: 5 } },
      { id: 'green_gem', icon: '🟢', name: 'Zamrud', pay: { 8: 0.4, 10: 0.9, 12: 4 } },
      { id: 'blue_gem', icon: '🔵', name: 'Safir', pay: { 8: 0.25, 10: 0.75, 12: 2 } },
      { id: 'scatter', icon: '⚡', name: 'Zeus Scatter', isScatter: true }
    ];
  }

  init() {
    this.generateInitialGrid();
    this.renderGrid();
    this.updateMultiplierDisplay(1);
  }

  setBet(val) {
    if (this.isSpinning || this.freeSpinsLeft > 0) return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewOlympus .chip-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.val) === val);
    });
    document.getElementById('btnSpinOlympus').textContent = `⚡ PUTAR ZEUS (${val})`;
  }

  updateMultiplierDisplay(val) {
    document.getElementById('zeusRoundMultDisplay').textContent = `${val}x`;
  }

  getRandomSymbol() {
    if (Math.random() < 0.035) return this.symbols.find(s => s.id === 'scatter');
    const regular = this.symbols.filter(s => !s.isScatter);
    const weights = [3, 5, 7, 9, 12, 14, 16, 17, 17];
    const total = weights.reduce((a, b) => a + b, 0);
    let rnd = Math.random() * total;
    for (let i = 0; i < regular.length; i++) {
      if (rnd < weights[i]) return regular[i];
      rnd -= weights[i];
    }
    return regular[regular.length - 1];
  }

  generateInitialGrid() {
    this.grid = [];
    for (let r = 0; r < 5; r++) {
      const row = [];
      for (let c = 0; c < 6; c++) {
        row.push(this.getRandomSymbol());
      }
      this.grid.push(row);
    }
  }

  renderGrid() {
    const gridEl = document.getElementById('olympusGrid');
    gridEl.innerHTML = '';
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 6; c++) {
        const sym = this.grid[r][c];
        const cell = document.createElement('div');
        cell.className = 'olympus-cell';
        cell.id = `cell_${r}_${c}`;
        cell.textContent = sym.icon;
        if (sym.isScatter) {
          cell.style.filter = 'drop-shadow(0 0 10px #facc15)';
        }
        gridEl.appendChild(cell);
      }
    }
  }

  buyFreeSpins() {
    if (this.isSpinning || this.freeSpinsLeft > 0) return;
    const cost = this.currentBet * 100;
    if (app.chips < cost) {
      app.showBanner('olympusResultBanner', `Saldo tidak cukup untuk beli Free Spins (${cost} Chip)!`, 'lose');
      audioSys.playLose();
      return;
    }

    app.adjustChips(-cost);
    app.showBanner('olympusResultBanner', `⚡ MEMBELI BABAK 15 FREE SPINS ZEUS! (-${cost} Chip)`, 'jackpot');
    audioSys.playWin();

    this.startFreeSpinsMode();
  }

  startFreeSpinsMode() {
    this.freeSpinsLeft = 15;
    this.totalFsMultiplier = 0;
    document.getElementById('zeusFsBanner').style.display = 'block';
    document.getElementById('zeusFsCount').textContent = this.freeSpinsLeft;
    document.getElementById('zeusFsMult').textContent = '0x';
    document.getElementById('btnBuySpinZeus').disabled = true;

    setTimeout(() => this.runSpin(), 600);
  }

  spin() {
    if (this.isSpinning) return;
    if (this.freeSpinsLeft === 0) {
      if (app.chips < this.currentBet) {
        app.showBanner('olympusResultBanner', 'Saldo chip tidak mencukupi!', 'lose');
        audioSys.playLose();
        return;
      }
      app.adjustChips(-this.currentBet);
    }

    this.runSpin();
  }

  async runSpin() {
    this.isSpinning = true;
    document.getElementById('btnSpinOlympus').disabled = true;
    this.currentRoundMultiplier = 1;
    this.updateMultiplierDisplay(1);

    app.showBanner('olympusResultBanner', '⚡ Rel Olympus Runtuh Berputar...', 'info');
    audioSys.playThunder();

    this.generateInitialGrid();
    this.renderGrid();

    let scatterCount = 0;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 6; c++) {
        if (this.grid[r][c].isScatter) scatterCount++;
      }
    }

    await new Promise(res => setTimeout(res, 600));

    let totalWinThisSpin = 0;
    let multipliersGenerated = [];

    while (true) {
      const matches = this.findMatches();
      if (matches.length === 0) break;

      audioSys.playShatter();
      
      matches.forEach(m => {
        const el = document.getElementById(`cell_${m.r}_${m.c}`);
        if (el) el.classList.add('winning');
      });

      let cycleWin = 0;
      const matchCounts = {};
      matches.forEach(m => {
        const id = m.sym.id;
        matchCounts[id] = (matchCounts[id] || 0) + 1;
      });

      for (const [id, count] of Object.entries(matchCounts)) {
        const sym = this.symbols.find(s => s.id === id);
        if (sym && sym.pay) {
          let mult = 0;
          if (count >= 12) mult = sym.pay[12];
          else if (count >= 10) mult = sym.pay[10];
          else if (count >= 8) mult = sym.pay[8];
          cycleWin += this.currentBet * mult;
        }
      }

      totalWinThisSpin += cycleWin;
      await new Promise(res => setTimeout(res, 500));

      if (Math.random() < 0.45) {
        const orbMult = this.triggerZeusLightning();
        multipliersGenerated.push(orbMult);
      }

      this.collapseAndRefill(matches);
      this.renderGrid();
      await new Promise(res => setTimeout(res, 400));
    }

    let sumMult = multipliersGenerated.reduce((a, b) => a + b, 0);
    if (sumMult > 0) {
      this.currentRoundMultiplier = sumMult;
      this.updateMultiplierDisplay(sumMult);
      if (this.freeSpinsLeft > 0) {
        this.totalFsMultiplier += sumMult;
        document.getElementById('zeusFsMult').textContent = `${this.totalFsMultiplier}x`;
      }
    }

    const finalMultiplier = this.freeSpinsLeft > 0 
      ? Math.max(1, this.totalFsMultiplier || this.currentRoundMultiplier)
      : this.currentRoundMultiplier;

    const netPayout = Math.floor(totalWinThisSpin * finalMultiplier);

    if (netPayout > 0) {
      app.adjustChips(netPayout);
      const bannerMsg = finalMultiplier > 1 
        ? `⚡ PETIR KAKEK ZEUS ${finalMultiplier}x! Menang +${netPayout.toLocaleString('id-ID')} Chip!` 
        : `🎉 Menang Runtuh +${netPayout.toLocaleString('id-ID')} Chip!`;
      app.showBanner('olympusResultBanner', bannerMsg, 'win');
      audioSys.playWin();
      app.recordHistory('Gates of Olympus', this.currentBet, `Menang ${finalMultiplier}x`, netPayout - (this.freeSpinsLeft > 0 ? 0 : this.currentBet));
    } else {
      app.showBanner('olympusResultBanner', 'Belum ada simbol kembar 8+ yang pecah.', 'lose');
      if (this.freeSpinsLeft === 0) {
        app.recordHistory('Gates of Olympus', this.currentBet, 'Kalah', -this.currentBet);
      }
    }

    if (scatterCount >= 4 && this.freeSpinsLeft === 0) {
      app.showBanner('olympusResultBanner', `⚡ 4 SCATTER ZEUS! MENDAPATKAN 15 FREE SPINS!`, 'jackpot');
      audioSys.playWin();
      setTimeout(() => this.startFreeSpinsMode(), 1200);
      return;
    }

    if (this.freeSpinsLeft > 0) {
      this.freeSpinsLeft--;
      document.getElementById('zeusFsCount').textContent = this.freeSpinsLeft;
      if (this.freeSpinsLeft > 0) {
        setTimeout(() => this.runSpin(), 1000);
        return;
      } else {
        app.showBanner('olympusResultBanner', '🔥 BABAK FREE SPINS SELESAI!', 'jackpot');
        document.getElementById('zeusFsBanner').style.display = 'none';
        document.getElementById('btnBuySpinZeus').disabled = false;
      }
    }

    this.isSpinning = false;
    document.getElementById('btnSpinOlympus').disabled = false;
    app.checkBankrupt();
  }

  findMatches() {
    const counts = {};
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 6; c++) {
        const sym = this.grid[r][c];
        if (!sym.isScatter) {
          counts[sym.id] = counts[sym.id] || [];
          counts[sym.id].push({ r, c, sym });
        }
      }
    }
    let matches = [];
    for (const [id, list] of Object.entries(counts)) {
      if (list.length >= 8) {
        matches = matches.concat(list);
      }
    }
    return matches;
  }

  triggerZeusLightning() {
    audioSys.playThunder();
    const avatar = document.getElementById('zeusAvatar');
    avatar.classList.add('casting');
    setTimeout(() => avatar.classList.remove('casting'), 800);

    const possibleMults = [2, 3, 5, 10, 25, 50, 100, 500];
    const weights = [40, 25, 18, 10, 4, 2, 0.8, 0.2];
    let rand = Math.random() * 100;
    let chosen = 2;
    for (let i = 0; i < possibleMults.length; i++) {
      if (rand < weights[i]) {
        chosen = possibleMults[i];
        break;
      }
      rand -= weights[i];
    }

    app.showBanner('olympusResultBanner', `⚡ KAKEK ZEUS MELEMPAR PETIR ORB x${chosen}!`, 'jackpot');
    return chosen;
  }

  collapseAndRefill(matches) {
    matches.forEach(m => {
      this.grid[m.r][m.c] = null;
    });

    for (let c = 0; c < 6; c++) {
      let writeRow = 4;
      for (let r = 4; r >= 0; r--) {
        if (this.grid[r][c] !== null) {
          this.grid[writeRow][c] = this.grid[r][c];
          if (writeRow !== r) this.grid[r][c] = null;
          writeRow--;
        }
      }
      for (let r = writeRow; r >= 0; r--) {
        this.grid[r][c] = this.getRandomSymbol();
      }
    }
  }
}

const olympusGame = new GatesOfOlympusGame();

/* ==========================================================================
   4. GAME 2: MINES (Kasino Tambang Bom 5x5)
   ========================================================================== */
class MinesGame {
  constructor() {
    this.currentBet = 10;
    this.minesCount = 3;
    this.gameState = 'idle';
    this.grid = [];
    this.revealedGems = 0;
  }

  init() {
    this.gameState = 'idle';
    this.revealedGems = 0;
    this.renderEmptyGrid();
    this.updateStats();
    document.getElementById('btnMinesMain').textContent = `Mulai Taruhan (${this.currentBet} Chip)`;
    document.getElementById('btnMinesMain').className = 'btn-action';
  }

  setBet(val) {
    if (this.gameState === 'playing') return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewMines .chip-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.val) === val);
    });
    document.getElementById('btnMinesMain').textContent = `Mulai Taruhan (${val} Chip)`;
  }

  onMinesCountChange() {
    if (this.gameState === 'playing') return;
    this.minesCount = parseInt(document.getElementById('minesCountSelect').value);
    this.updateStats();
  }

  calculateMultiplier(gems) {
    if (gems === 0) return 1.00;
    let p = 1.0;
    for (let i = 0; i < gems; i++) {
      p *= (25 - this.minesCount - i) / (25 - i);
    }
    return Math.max(1.05, Math.floor((0.97 / p) * 100) / 100);
  }

  updateStats() {
    const gemsTotal = 25 - this.minesCount;
    document.getElementById('minesGemsCount').textContent = this.revealedGems;
    document.getElementById('minesGemsTotal').textContent = gemsTotal;

    const currentM = this.calculateMultiplier(this.revealedGems);
    const nextM = this.calculateMultiplier(this.revealedGems + 1);

    document.getElementById('minesCurrentMult').textContent = `${currentM.toFixed(2)}x`;
    document.getElementById('minesNextMult').textContent = `${nextM.toFixed(2)}x`;
  }

  renderEmptyGrid() {
    const grid = document.getElementById('minesGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const tile = document.createElement('div');
      tile.className = 'mines-tile';
      tile.dataset.index = i;
      tile.onclick = () => this.clickTile(i);
      grid.appendChild(tile);
    }
  }

  handleMainButton() {
    if (this.gameState === 'idle') {
      this.startGame();
    } else if (this.gameState === 'playing') {
      this.cashOut();
    }
  }

  startGame() {
    if (app.chips < this.currentBet) {
      app.showBanner('minesResultBanner', 'Saldo chip tidak mencukupi!', 'lose');
      audioSys.playLose();
      return;
    }

    app.adjustChips(-this.currentBet);
    this.gameState = 'playing';
    this.revealedGems = 0;

    const bombIndices = new Set();
    while (bombIndices.size < this.minesCount) {
      bombIndices.add(Math.floor(Math.random() * 25));
    }

    this.grid = [];
    for (let i = 0; i < 25; i++) {
      this.grid.push({
        isBomb: bombIndices.has(i),
        isRevealed: false
      });
    }

    this.renderEmptyGrid();
    this.updateStats();

    document.getElementById('minesCountSelect').disabled = true;
    document.getElementById('btnMinesMain').textContent = `Ambil Kemenangan (Cash Out)`;
    document.getElementById('btnMinesMain').style.background = 'linear-gradient(135deg, #10b981, #059669)';
    app.showBanner('minesResultBanner', 'Pilih kotak untuk membuka berlian! Klik Cash Out kapan saja.', 'info');
    audioSys.playClick();
  }

  clickTile(index) {
    if (this.gameState !== 'playing') return;
    const item = this.grid[index];
    if (item.isRevealed) return;

    item.isRevealed = true;
    const tileEl = document.querySelector(`.mines-tile[data-index="${index}"]`);

    if (item.isBomb) {
      tileEl.classList.add('revealed-bomb');
      tileEl.textContent = '💣';
      audioSys.playExplosion();
      this.endGameLose();
    } else {
      tileEl.classList.add('revealed-gem');
      tileEl.textContent = '💎';
      this.revealedGems++;
      audioSys.playClick();
      this.updateStats();

      const mult = this.calculateMultiplier(this.revealedGems);
      const currentWin = Math.floor(this.currentBet * mult);
      app.showBanner('minesResultBanner', `💎 Berlian ke-${this.revealedGems}! Pengali ${mult.toFixed(2)}x (${currentWin} Chip)`, 'win');

      if (this.revealedGems === (25 - this.minesCount)) {
        this.cashOut();
      }
    }
  }

  cashOut() {
    if (this.gameState !== 'playing' || this.revealedGems === 0) return;
    const mult = this.calculateMultiplier(this.revealedGems);
    const winAmount = Math.floor(this.currentBet * mult);
    const netProfit = winAmount - this.currentBet;

    app.adjustChips(winAmount);
    app.showBanner('minesResultBanner', `🎉 BERHASIL CASH OUT! Menang +${winAmount.toLocaleString('id-ID')} Chip (${mult.toFixed(2)}x)!`, 'win');
    audioSys.playWin();
    app.recordHistory('Mines', this.currentBet, `Cash Out ${mult.toFixed(2)}x`, netProfit);

    this.revealAllBombs();
    this.gameState = 'idle';
    document.getElementById('minesCountSelect').disabled = false;
    document.getElementById('btnMinesMain').textContent = `Mulai Taruhan (${this.currentBet} Chip)`;
    document.getElementById('btnMinesMain').style.background = '';
  }

  endGameLose() {
    this.revealAllBombs();
    this.gameState = 'idle';
    document.getElementById('minesCountSelect').disabled = false;
    document.getElementById('btnMinesMain').textContent = `Mulai Taruhan (${this.currentBet} Chip)`;
    document.getElementById('btnMinesMain').style.background = '';

    app.showBanner('minesResultBanner', '💥 DUARR! Anda menyentuh BOM! Taruhan hilang.', 'lose');
    app.recordHistory('Mines', this.currentBet, 'Kena Bom', -this.currentBet);
    app.checkBankrupt();
  }

  revealAllBombs() {
    this.grid.forEach((item, idx) => {
      const tile = document.querySelector(`.mines-tile[data-index="${idx}"]`);
      if (!item.isRevealed) {
        tile.classList.add('disabled');
        if (item.isBomb) {
          tile.classList.add('revealed-bomb');
          tile.textContent = '💣';
        } else {
          tile.textContent = '💎';
          tile.style.opacity = '0.5';
        }
      }
    });
  }
}

const minesGame = new MinesGame();

/* ==========================================================================
   5. GAME 3: PLINKO (Tanpa Pembatas Samping - Jatuh ke Samping = 0x)
   ========================================================================== */
class PlinkoGame {
  constructor() {
    this.currentBet = 10;
    this.rows = 16;
    this.risk = 'medium';
    this.canvas = null;
    this.ctx = null;
    this.pins = [];
    this.balls = [];
    this.animId = null;
    this.buckets = [];
  }

  init() {
    this.canvas = document.getElementById('plinkoCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.onSettingsChange();
    if (!this.animId) {
      this.loop();
    }
  }

  setBet(val) {
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewPlinko .chip-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.val) === val);
    });
    document.getElementById('btnDropPlinko1').textContent = `🔴 Jatuhkan 1 Bola (${val})`;
    document.getElementById('btnDropPlinko5').textContent = `💥 Multi-Drop 5 Bola (${val * 5})`;
  }

  onSettingsChange() {
    this.rows = parseInt(document.getElementById('plinkoRowsSelect').value);
    this.risk = document.getElementById('plinkoRiskSelect').value;
    this.generatePinsAndBuckets();
  }

  getMultipliers() {
    const payoutTables = {
      8: {
        low: [5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6],
        medium: [13, 3, 1.3, 0.7, 0.4, 0.7, 1.3, 3, 13],
        high: [29, 4, 1.5, 0.3, 0.2, 0.3, 1.5, 4, 29]
      },
      12: {
        low: [10, 3, 1.6, 1.4, 1.1, 1, 0.5, 1, 1.1, 1.4, 1.6, 3, 10],
        medium: [33, 11, 4, 2, 1.1, 0.6, 0.3, 0.6, 1.1, 2, 4, 11, 33],
        high: [170, 24, 8.1, 2, 0.7, 0.2, 0.2, 0.2, 0.7, 2, 8.1, 24, 170]
      },
      16: {
        low: [16, 9, 2, 1.4, 1.4, 1.2, 1.1, 1, 0.5, 1, 1.1, 1.2, 1.4, 1.4, 2, 9, 16],
        medium: [110, 41, 10, 5, 3, 1.5, 1, 0.5, 0.3, 0.5, 1, 1.5, 3, 5, 10, 41, 110],
        high: [1000, 130, 26, 9, 4, 2, 0.2, 0.2, 0.2, 0.2, 0.2, 2, 4, 9, 26, 130, 1000]
      }
    };
    return (payoutTables[this.rows] && payoutTables[this.rows][this.risk]) || payoutTables[16].medium;
  }

  generatePinsAndBuckets() {
    this.pins = [];
    const w = this.canvas.width;
    const h = this.canvas.height;
    const startY = 45;
    const endY = h - 65;
    const rowSpacing = (endY - startY) / this.rows;
    
    const maxPins = this.rows + 2;
    const pinSpacing = Math.min(32, (w - 70) / maxPins);

    this.topY = startY;
    this.bottomY = endY;

    let bottomRowPins = [];

    for (let r = 0; r <= this.rows; r++) {
      const pinCount = r + 2; // Row 0 has 2 pins (ball drops in between)
      const startX = w / 2 - ((pinCount - 1) * pinSpacing) / 2;
      const rowPins = [];

      for (let p = 0; p < pinCount; p++) {
        const pinObj = {
          x: startX + p * pinSpacing,
          y: startY + r * rowSpacing,
          radius: 3.5
        };
        this.pins.push(pinObj);
        rowPins.push(pinObj);
      }

      if (r === this.rows) bottomRowPins = rowPins;
    }

    // Buckets at the bottom slots (No side walls!)
    this.buckets = [];
    const mults = this.getMultipliers();
    const bucketWidth = pinSpacing - 3;

    for (let i = 0; i < mults.length; i++) {
      const gapCenterX = (bottomRowPins[i].x + bottomRowPins[i + 1].x) / 2;
      this.buckets.push({
        x: gapCenterX - bucketWidth / 2,
        y: endY + 20,
        width: bucketWidth,
        height: 24,
        multiplier: mults[i]
      });
    }
  }

  dropBall() {
    if (app.chips < this.currentBet) {
      app.showBanner('plinkoResultBanner', 'Saldo chip tidak cukup!', 'lose');
      audioSys.playLose();
      return;
    }
    app.adjustChips(-this.currentBet);

    const w = this.canvas.width;
    this.balls.push({
      x: w / 2 + (Math.random() * 4 - 2),
      y: 18,
      vx: (Math.random() - 0.5) * 0.6,
      vy: 1.5,
      radius: 5.5,
      bet: this.currentBet
    });
  }

  dropMulti(count) {
    for (let i = 0; i < count; i++) {
      setTimeout(() => this.dropBall(), i * 140);
    }
  }

  loop() {
    this.updatePhysics();
    this.draw();
    this.animId = requestAnimationFrame(() => this.loop());
  }

  updatePhysics() {
    const gravity = 0.22;
    const damping = 0.58;

    for (let i = this.balls.length - 1; i >= 0; i--) {
      const b = this.balls[i];
      b.vy += gravity;
      b.x += b.vx;
      b.y += b.vy;

      // Pin collision
      for (const p of this.pins) {
        const dx = b.x - p.x;
        const dy = b.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < b.radius + p.radius) {
          const nx = dx / dist;
          const ny = dy / dist;
          const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
          const jitter = (Math.random() - 0.5) * 0.4;
          b.vx = (nx * speed + jitter) * damping;
          b.vy = Math.max(0.8, ny * speed * damping);
          b.x = p.x + nx * (b.radius + p.radius + 0.5);
          b.y = p.y + ny * (b.radius + p.radius + 0.5);
          audioSys.playPegBounce();
        }
      }

      // Check if ball reaches bottom
      const triggerY = this.bottomY + 16;
      if (b.y >= triggerY) {
        let landingBucket = null;
        for (const bucket of this.buckets) {
          if (b.x >= bucket.x && b.x <= bucket.x + bucket.width) {
            landingBucket = bucket;
            break;
          }
        }

        // IF THE BALL FELL OFF THE SIDES -> 0x (TIDAK DAPAT APA-APA)
        if (!landingBucket) {
          app.showBanner('plinkoResultBanner', '❌ Bola jatuh ke samping / jurang! Tidak mendapat apa-apa (0x).', 'lose');
          audioSys.playLose();
          app.recordHistory('Plinko', b.bet, 'Jatuh ke Samping (0x)', -b.bet);
          app.checkBankrupt();
        } else {
          const winAmount = Math.floor(b.bet * landingBucket.multiplier);
          const netProfit = winAmount - b.bet;
          app.adjustChips(winAmount);

          if (landingBucket.multiplier >= 1) {
            app.showBanner('plinkoResultBanner', `🎉 Bola mendarat di ${landingBucket.multiplier}x (+${winAmount.toLocaleString('id-ID')} Chip)!`, 'win');
            audioSys.playWin();
          } else {
            app.showBanner('plinkoResultBanner', `Bola mendarat di ${landingBucket.multiplier}x. Kembali ${winAmount} Chip.`, 'lose');
          }
          app.recordHistory('Plinko', b.bet, `Bucket ${landingBucket.multiplier}x`, netProfit);
          app.checkBankrupt();
        }

        this.balls.splice(i, 1);
      }
    }
  }

  draw() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Pins
    ctx.fillStyle = '#f8fafc';
    ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
    ctx.shadowBlur = 5;
    for (const p of this.pins) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;

    // Draw Buckets
    for (const b of this.buckets) {
      let col = '#3b82f6';
      if (b.multiplier >= 100) col = '#ef4444';
      else if (b.multiplier >= 10) col = '#f59e0b';
      else if (b.multiplier >= 2) col = '#10b981';

      ctx.fillStyle = col;
      ctx.beginPath();
      ctx.roundRect(b.x, b.y, b.width, b.height, 5);
      ctx.fill();

      ctx.fillStyle = '#fff';
      const fontSize = b.width < 24 ? 7 : (b.width < 30 ? 8 : 9);
      ctx.font = `bold ${fontSize}px Orbitron`;
      ctx.textAlign = 'center';
      ctx.fillText(`${b.multiplier}x`, b.x + b.width / 2, b.y + 15);
    }

    // Draw Balls
    for (const b of this.balls) {
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#f87171';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
  }
}

const plinkoGame = new PlinkoGame();

/* ==========================================================================
   6. GAME 4: DRAGON TIGER
   ========================================================================== */
class DragonTigerGame {
  constructor() {
    this.currentBet = 10;
    this.selectedBetType = 'dragon';
    this.isDealing = false;
    this.suits = ['♠', '♥', '♦', '♣'];
    this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  }

  init() {
    this.isDealing = false;
    this.renderCardPlaceholder('dtDragonCard');
    this.renderCardPlaceholder('dtTigerCard');
  }

  setBet(val) {
    if (this.isDealing) return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewDragonTiger .chip-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.val) === val);
    });
  }

  selectBet(type, label) {
    if (this.isDealing) return;
    audioSys.playClick();
    this.selectedBetType = type;
    document.getElementById('dtSelectedText').textContent = label;
    document.querySelectorAll('#viewDragonTiger .roulette-btn').forEach(b => b.classList.remove('selected'));
    const el = document.getElementById(`dt_${type}`);
    if (el) el.classList.add('selected');
  }

  renderCardPlaceholder(id) {
    const el = document.getElementById(id);
    el.className = 'card-item hidden-card';
    el.innerHTML = '';
  }

  renderCard(id, card) {
    const el = document.getElementById(id);
    const isRed = card.suit === '♥' || card.suit === '♦';
    el.className = `card-item ${isRed ? 'red' : 'black'}`;
    el.innerHTML = `
      <div>${card.rank}${card.suit}</div>
      <div class="card-center">${card.suit}</div>
      <div style="align-self:flex-end;">${card.rank}${card.suit}</div>
    `;
  }

  deal() {
    if (this.isDealing) return;
    if (app.chips < this.currentBet) {
      app.showBanner('dtResultBanner', 'Saldo chip tidak cukup!', 'lose');
      audioSys.playLose();
      return;
    }

    this.isDealing = true;
    app.adjustChips(-this.currentBet);
    document.getElementById('btnDealDT').disabled = true;

    this.renderCardPlaceholder('dtDragonCard');
    this.renderCardPlaceholder('dtTigerCard');
    app.showBanner('dtResultBanner', 'Membuka kartu Dragon & Tiger...', 'info');
    audioSys.playCardDeal();

    setTimeout(() => {
      const dRankIdx = Math.floor(Math.random() * 13);
      const dSuit = this.suits[Math.floor(Math.random() * 4)];
      const dragonCard = { rank: this.ranks[dRankIdx], suit: dSuit, val: dRankIdx + 1 };

      const tRankIdx = Math.floor(Math.random() * 13);
      const tSuit = this.suits[Math.floor(Math.random() * 4)];
      const tigerCard = { rank: this.ranks[tRankIdx], suit: tSuit, val: tRankIdx + 1 };

      this.renderCard('dtDragonCard', dragonCard);
      this.renderCard('dtTigerCard', tigerCard);

      document.getElementById('dtDragonValText').textContent = `Nilai: ${dragonCard.val}`;
      document.getElementById('dtTigerValText').textContent = `Nilai: ${tigerCard.val}`;

      this.evaluate(dragonCard, tigerCard);
      this.isDealing = false;
      document.getElementById('btnDealDT').disabled = false;
    }, 800);
  }

  evaluate(d, t) {
    let outcome = 'dragon';
    if (d.val === t.val) {
      outcome = (d.suit === t.suit) ? 'suited_tie' : 'tie';
    } else if (t.val > d.val) {
      outcome = 'tiger';
    }

    let won = false;
    let payout = 0;

    if (this.selectedBetType === outcome) {
      won = true;
      payout = (outcome === 'suited_tie') ? 50 : ((outcome === 'tie') ? 8 : 1);
    } else if (this.selectedBetType === 'tie' && outcome === 'suited_tie') {
      won = true;
      payout = 8;
    }

    if (won) {
      const totalWin = this.currentBet + (this.currentBet * payout);
      const netProfit = this.currentBet * payout;
      app.adjustChips(totalWin);
      app.showBanner('dtResultBanner', `🎉 Anda Menang ${payout}:1 (+${totalWin} Chip)!`, 'win');
      audioSys.playWin();
      app.recordHistory('Dragon Tiger', this.currentBet, `Menang ${payout}:1`, netProfit);
    } else {
      app.showBanner('dtResultBanner', `Hasil: ${outcome.toUpperCase()}. Anda belum beruntung.`, 'lose');
      audioSys.playLose();
      app.recordHistory('Dragon Tiger', this.currentBet, `Kalah (${outcome})`, -this.currentBet);
      app.checkBankrupt();
    }
  }
}

const dtGame = new DragonTigerGame();

/* ==========================================================================
   7. GAME 5: DUO FU DUO CAI (多福多财 – 88 Fortunes VIP Slot)
   5 Reels x 3 Rows | 243 Ways to Win | Grand/Major/Minor/Mini Jackpot
   Scatter (Gong 🔔) → 10 Free Spins | Wild (Fu 🧧) → Gentong Emas pot
   ========================================================================== */
class DuoFuDuoCaiGame {
  constructor() {
    this.currentBet = 10;
    this.isSpinning = false;
    this.freeSpinsLeft = 0;
    this.potLevel = 0;      // 0-100, triggers bonus at 100
    this.pendingJackpotWin = 0;
    this.grid = [];         // 3 rows × 5 cols
    this.bonusCoinsData = [];
    this.revealedCoins = 0;
    this.bonusCounts = { grand: 0, major: 0, minor: 0, mini: 0 };

    // Auto Spin state
    this.autoSpinActive = false;
    this.autoSpinRemaining = 0;   // -1 = infinite

    // Symbol definitions: id, icon, name, pay[3 of a kind], pay[4], pay[5]
    this.symbols = [
      { id: 'fu',      icon: '🧧', name: 'Fu Bao Wild',   isWild: true,   pay: [0,    0,    0   ] },
      { id: 'gong',    icon: '🔔', name: 'Gong Scatter',  isScatter: true, pay: [0,    0,    0   ] },
      { id: 'phoenix', icon: '🦜', name: 'Phoenix Emas',  pay: [5,    10,   50  ] },
      { id: 'ship',    icon: '🛳️', name: 'Kapal Emas',    pay: [4,    8,    30  ] },
      { id: 'turtle',  icon: '🐢', name: 'Kura Emas',     pay: [2.5,  5,    20  ] },
      { id: 'ingot',   icon: '🪙', name: 'Yuan Bao',      pay: [1.5,  3,    10  ] },
      { id: 'ace',     icon: '🀄', name: 'A Merah',        pay: [0.5,  1,    3   ] },
      { id: 'king',    icon: '🎴', name: 'K Emas',         pay: [0.4,  0.8,  2.5 ] },
      { id: 'queen',   icon: '🎋', name: 'Q Bambu',        pay: [0.3,  0.6,  2   ] },
      { id: 'jack',    icon: '🏮', name: 'J Lentera',      pay: [0.2,  0.5,  1.5 ] },
    ];

    // Weighted reel pool (higher index = more common)
    this.reelWeights = [
      { id: 'fu',      weight: 3  },
      { id: 'gong',    weight: 4  },
      { id: 'phoenix', weight: 5  },
      { id: 'ship',    weight: 6  },
      { id: 'turtle',  weight: 8  },
      { id: 'ingot',   weight: 10 },
      { id: 'ace',     weight: 14 },
      { id: 'king',    weight: 16 },
      { id: 'queen',   weight: 17 },
      { id: 'jack',    weight: 17 },
    ];

    // Bonus coins pool: each coin is assigned a random jackpot type
    this.jackpotTypes = [
      { id: 'grand', icon: '🌟', label: 'GRAND',  prize: 10000, color: '#ef4444' },
      { id: 'major', icon: '💜', label: 'MAJOR',  prize: 2500,  color: '#a855f7' },
      { id: 'minor', icon: '💙', label: 'MINOR',  prize: 500,   color: '#3b82f6' },
      { id: 'mini',  icon: '💚', label: 'MINI',   prize: 100,   color: '#10b981' },
    ];
  }

  /* ─── Public API ─── */
  init() {
    this.autoSpinActive = false;
    this.autoSpinRemaining = 0;
    this.updateAutoUI();
    this.generateInitialGrid();
    this.renderGrid();
    this.updateBtnLabel();
  }

  setBet(val) {
    if (this.isSpinning || this.freeSpinsLeft > 0) return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewDuofu .chip-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.val) === val);
    });
    this.updateBtnLabel();
  }

  buyFreeSpins() {
    if (this.isSpinning || this.freeSpinsLeft > 0) return;
    const cost = this.currentBet * 50;
    if (app.chips < cost) {
      app.showBanner('duofuResultBanner', `Saldo tidak cukup! Butuh ${cost.toLocaleString('id-ID')} chip.`, 'lose');
      return;
    }
    audioSys.playClick();
    app.adjustChips(-cost);
    this.freeSpinsLeft = 10;
    this.activateFsMode();
    this.spin();
  }

  spin() {
    if (this.isSpinning) return;

    const isFree = this.freeSpinsLeft > 0;
    if (!isFree && app.chips < this.currentBet) {
      app.showBanner('duofuResultBanner', 'Saldo chip tidak cukup!', 'lose');
      audioSys.playLose();
      return;
    }

    this.isSpinning = true;
    document.getElementById('btnSpinDuofu').disabled = true;

    if (!isFree) {
      app.adjustChips(-this.currentBet);
    } else {
      this.freeSpinsLeft--;
      document.getElementById('duofuFsCount').textContent = this.freeSpinsLeft;
      if (this.freeSpinsLeft === 0) {
        this.deactivateFsMode();
      }
    }

    app.showBanner('duofuResultBanner', isFree ? '🔥 FREE SPIN berlangsung...' : '🎋 Memutar gulungan keberuntungan...', 'info');

    // Animate spin
    const cells = document.querySelectorAll('.duofu-cell');
    cells.forEach(c => c.classList.add('spinning'));

    const rollInterval = setInterval(() => {
      this.generateInitialGrid(isFree);
      this.renderGridQuick();
      audioSys.playPegBounce();
    }, 80);

    setTimeout(() => {
      clearInterval(rollInterval);
      cells.forEach(c => c.classList.remove('spinning'));
      this.generateInitialGrid(isFree);
      this.renderGrid();
      this.evaluateSpin(isFree);
      this.isSpinning = false;
      document.getElementById('btnSpinDuofu').disabled = false;

      // Auto Spin chaining
      if (this.autoSpinActive) {
        if (this.autoSpinRemaining === -1) {
          // Infinite: continue unless bankrupt or bonus triggered
          if (app.chips >= this.currentBet) {
            setTimeout(() => this.spin(), 300);
          } else {
            this.stopAutoSpin();
          }
        } else if (this.autoSpinRemaining > 0) {
          this.autoSpinRemaining--;
          this.updateAutoUI();
          if (this.autoSpinRemaining > 0 && app.chips >= this.currentBet) {
            setTimeout(() => this.spin(), 300);
          } else {
            this.stopAutoSpin();
          }
        }
      }
    }, 1400);
  }

  /* ─── Auto Spin Controls ─── */
  toggleAutoSpin() {
    if (this.autoSpinActive) {
      this.stopAutoSpin();
    } else {
      this.startAutoSpin();
    }
  }

  startAutoSpin() {
    if (this.isSpinning) return;
    const select = document.getElementById('duofuAutoCount');
    const count = parseInt(select ? select.value : '10');
    this.autoSpinRemaining = count; // -1 = infinite
    this.autoSpinActive = true;
    this.updateAutoUI();
    // Disable bet buttons & selector during auto spin
    document.querySelectorAll('#viewDuofu .chip-btn').forEach(b => b.disabled = true);
    document.getElementById('duofuAutoCount').disabled = true;
    this.spin();
  }

  stopAutoSpin() {
    this.autoSpinActive = false;
    this.autoSpinRemaining = 0;
    this.updateAutoUI();
    // Re-enable controls
    document.querySelectorAll('#viewDuofu .chip-btn').forEach(b => b.disabled = false);
    const sel = document.getElementById('duofuAutoCount');
    if (sel) sel.disabled = false;
  }

  updateAutoUI() {
    const btn = document.getElementById('btnAutoSpinDuofu');
    const countdown = document.getElementById('duofuAutoCountdown');
    if (!btn) return;

    if (this.autoSpinActive) {
      btn.textContent = '⏹ STOP AUTO';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
      if (countdown) {
        countdown.style.display = 'inline';
        countdown.textContent = this.autoSpinRemaining === -1 ? '∞' : `${this.autoSpinRemaining}×`;
      }
    } else {
      btn.textContent = '▶ MULAI AUTO';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      if (countdown) countdown.style.display = 'none';
    }
  }

  /* ─── Internal Helpers ─── */
  getRandomSymbol(freeSpinMode = false) {
    // In free spin mode only high-value symbols
    const pool = freeSpinMode
      ? this.reelWeights.filter(w => ['fu','gong','phoenix','ship','turtle','ingot'].includes(w.id))
      : this.reelWeights;

    const total = pool.reduce((a, b) => a + b.weight, 0);
    let rnd = Math.random() * total;
    for (const entry of pool) {
      if (rnd < entry.weight) return this.symbols.find(s => s.id === entry.id);
      rnd -= entry.weight;
    }
    return this.symbols.find(s => s.id === 'jack');
  }

  generateInitialGrid(freeSpinMode = false) {
    this.grid = [];
    for (let row = 0; row < 3; row++) {
      this.grid[row] = [];
      for (let col = 0; col < 5; col++) {
        this.grid[row][col] = this.getRandomSymbol(freeSpinMode);
      }
    }
  }

  renderGrid() {
    const container = document.getElementById('duofuGrid');
    if (!container) return;
    container.innerHTML = '';
    // Render column by column left-to-right (visual slot layout: 5 cols × 3 rows)
    // grid[row][col] → place cell at row, col
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        const sym = this.grid[row][col];
        const cell = document.createElement('div');
        cell.className = 'duofu-cell';
        cell.id = `duofu-cell-${row}-${col}`;
        cell.textContent = sym.icon;
        container.appendChild(cell);
      }
    }
  }

  renderGridQuick() {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        const el = document.getElementById(`duofu-cell-${row}-${col}`);
        if (el) el.textContent = this.grid[row][col].icon;
      }
    }
  }

  updateBtnLabel() {
    const btn = document.getElementById('btnSpinDuofu');
    if (btn) btn.textContent = `🎋 PUTAR DUOFU (${this.currentBet})`;
  }

  activateFsMode() {
    const banner = document.getElementById('duofuFsBanner');
    if (banner) banner.style.display = 'flex';
  }

  deactivateFsMode() {
    const banner = document.getElementById('duofuFsBanner');
    if (banner) banner.style.display = 'none';
  }

  /* ─── Win Evaluation (243 Ways: match 3+ same symbol from reel 1 leftward) ─── */
  evaluateSpin(isFree = false) {
    // Count scatters across entire grid
    let scatterCount = 0;
    let wildCount = 0;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        if (this.grid[row][col].isScatter) scatterCount++;
        if (this.grid[row][col].isWild) wildCount++;
      }
    }

    // Wild / Fu coins contribute to Gentong pot
    if (wildCount > 0) {
      this.potLevel = Math.min(100, this.potLevel + wildCount * 15);
      this.updatePotVisual();
    }

    // Check for winning combinations per symbol (243 ways logic simplified)
    let totalWinMultiplier = 0;
    const winningCells = new Set();

    const regularSymbols = this.symbols.filter(s => !s.isScatter && !s.isWild);
    for (const sym of regularSymbols) {
      // Count how many reels have this symbol (or a wild) in ANY row
      let reelMatches = [];
      for (let col = 0; col < 5; col++) {
        let hasInReel = false;
        let matchingRows = [];
        for (let row = 0; row < 3; row++) {
          const s = this.grid[row][col];
          if (s.id === sym.id || s.isWild) {
            hasInReel = true;
            matchingRows.push(row);
          }
        }
        if (hasInReel) {
          reelMatches.push({ col, rows: matchingRows });
        } else {
          break; // Must be consecutive from reel 0
        }
      }

      const consecutive = reelMatches.length;
      if (consecutive >= 3) {
        const payIdx = consecutive - 3; // 0=3match, 1=4match, 2=5match
        const mult = sym.pay[payIdx] || 0;
        if (mult > 0) {
          // Ways count = product of matching rows per reel
          let ways = 1;
          for (let r = 0; r < consecutive; r++) ways *= reelMatches[r].rows.length;
          totalWinMultiplier += mult * ways;

          // Mark winning cells
          for (const rm of reelMatches) {
            for (const row of rm.rows) {
              winningCells.add(`${row}-${rm.col}`);
            }
          }
        }
      }
    }

    // Highlight winning cells
    document.querySelectorAll('.duofu-cell').forEach(el => el.classList.remove('winning-line'));
    winningCells.forEach(key => {
      const [row, col] = key.split('-');
      const el = document.getElementById(`duofu-cell-${row}-${col}`);
      if (el) el.classList.add('winning-line');
    });

    // Apply win
    if (totalWinMultiplier > 0) {
      const totalWin = Math.round(this.currentBet * totalWinMultiplier);
      app.adjustChips(totalWin);
      app.showBanner('duofuResultBanner',
        `🎉 MENANG! ${winningCells.size} sel cocok! +${totalWin.toLocaleString('id-ID')} Chip (×${totalWinMultiplier.toFixed(1)})`, 'win');
      audioSys.playWin();
      app.recordHistory('Duo Fu Duo Cai', this.currentBet,
        `Menang ×${totalWinMultiplier.toFixed(1)}`, totalWin);
    } else {
      app.showBanner('duofuResultBanner',
        scatterCount >= 3 ? '🔔 3 Gong! Bersiap Free Spins...' : '😔 Belum beruntung. Coba lagi, rezeki selalu ada!', 'lose');
      if (!scatterCount || scatterCount < 3) {
        audioSys.playLose();
        app.recordHistory('Duo Fu Duo Cai', this.currentBet, 'Tidak menang', -this.currentBet);
        app.checkBankrupt();
      }
    }

    // Scatter trigger: 3+ scatters → free spins
    if (scatterCount >= 3 && this.freeSpinsLeft === 0) {
      setTimeout(() => this.triggerFreeSpins(), 900);
    }

    // Pot full → Jackpot bonus
    if (this.potLevel >= 100) {
      this.potLevel = 0;
      this.updatePotVisual();
      setTimeout(() => this.triggerJackpotBonus(), 1000);
    }
  }

  updatePotVisual() {
    const icon = document.getElementById('duofuPotIcon');
    if (!icon) return;
    // Shake/glow based on fill level
    if (this.potLevel >= 70) {
      icon.classList.add('shake');
      icon.style.filter = `drop-shadow(0 0 ${20 + this.potLevel / 5}px #fbbf24)`;
    } else {
      icon.classList.remove('shake');
      icon.style.filter = `drop-shadow(0 0 15px #fbbf24)`;
    }
  }

  triggerFreeSpins() {
    this.stopAutoSpin();  // pause auto spin during free spins mode
    this.freeSpinsLeft = 10;
    document.getElementById('duofuFsCount').textContent = this.freeSpinsLeft;
    this.activateFsMode();
    app.showBanner('duofuResultBanner', '🔥 10 FREE SPINS DIMULAI! Hanya simbol tinggi!', 'jackpot');
    audioSys.playWin();
    setTimeout(() => this.spin(), 800);
  }

  /* ─── Jackpot Bonus Pick Game ─── */
  triggerJackpotBonus(manualClick = false) {
    this.stopAutoSpin();  // pause auto spin so player can pick coins
    // Build 12-coin pool: guarantee at least one 3-of-a-kind set; rest random
    // Chosen jackpot tier: weighted towards MINI/MINOR
    const tierWeights = [
      { type: this.jackpotTypes[0], w: 5  },  // grand
      { type: this.jackpotTypes[1], w: 15 },  // major
      { type: this.jackpotTypes[2], w: 30 },  // minor
      { type: this.jackpotTypes[3], w: 50 },  // mini
    ];

    const pickTier = () => {
      const total = tierWeights.reduce((a, b) => a + b.w, 0);
      let r = Math.random() * total;
      for (const t of tierWeights) {
        if (r < t.w) return t.type;
        r -= t.w;
      }
      return this.jackpotTypes[3];
    };

    // The winning tier (3-of-a-kind guaranteed)
    const winTier = manualClick ? this.jackpotTypes[3] : pickTier(); // manual click always MINI

    // Build 12 coins: 3 winners + 9 random others
    const coins = [winTier, winTier, winTier];
    for (let i = 0; i < 9; i++) {
      let t;
      do { t = pickTier(); } while (t.id === winTier.id && coins.filter(c => c.id === t.id).length >= 3);
      coins.push(t);
    }

    // Shuffle
    for (let i = coins.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coins[i], coins[j]] = [coins[j], coins[i]];
    }

    this.bonusCoinsData = coins;
    this.revealedCoins = 0;
    this.bonusCounts = { grand: 0, major: 0, minor: 0, mini: 0 };
    this.pendingJackpotWin = 0;

    // Render coins
    const grid = document.getElementById('duofuBonusCoinsGrid');
    grid.innerHTML = '';
    coins.forEach((coin, idx) => {
      const el = document.createElement('div');
      el.className = 'duofu-bonus-coin';
      el.id = `bonus-coin-${idx}`;
      el.textContent = '🪙';
      el.onclick = () => this.flipBonusCoin(idx);
      grid.appendChild(el);
    });

    // Reset counters
    ['grand', 'major', 'minor', 'mini'].forEach(t => {
      const el = document.getElementById(`pickCount${t.charAt(0).toUpperCase() + t.slice(1)}`);
      if (el) el.textContent = '0/3';
    });
    document.getElementById('duofuBonusWinAnnouncement').style.display = 'none';
    document.getElementById('duofuBonusModal').classList.add('open');
  }

  flipBonusCoin(idx) {
    const coin = this.bonusCoinsData[idx];
    const el = document.getElementById(`bonus-coin-${idx}`);
    if (!el || el.classList.contains('revealed')) return;

    el.classList.add('revealed');
    el.textContent = coin.icon;
    el.style.background = `radial-gradient(circle, ${coin.color}55, #1e1b4b)`;
    el.style.borderColor = coin.color;

    this.bonusCounts[coin.id]++;
    this.revealedCoins++;

    // Update counters display
    const countEl = document.getElementById(`pickCount${coin.id.charAt(0).toUpperCase() + coin.id.slice(1)}`);
    if (countEl) countEl.textContent = `${this.bonusCounts[coin.id]}/3`;

    audioSys.playClick();

    // Check if any tier reached 3
    for (const tier of this.jackpotTypes) {
      if (this.bonusCounts[tier.id] >= 3) {
        this.pendingJackpotWin = tier.prize;
        this.revealAllCoins();
        this.showJackpotWin(tier);
        return;
      }
    }

    // If all 12 revealed and no 3-match (shouldn't happen, but safety)
    if (this.revealedCoins >= 12) {
      this.pendingJackpotWin = 100;
      this.showJackpotWin(this.jackpotTypes[3]);
    }
  }

  revealAllCoins() {
    this.bonusCoinsData.forEach((coin, idx) => {
      const el = document.getElementById(`bonus-coin-${idx}`);
      if (el && !el.classList.contains('revealed')) {
        el.classList.add('revealed');
        el.textContent = coin.icon;
        el.style.background = `radial-gradient(circle, ${coin.color}33, #1e1b4b)`;
        el.style.borderColor = coin.color;
        el.style.opacity = '0.5';
      }
    });
  }

  showJackpotWin(tier) {
    const ann = document.getElementById('duofuBonusWinAnnouncement');
    document.getElementById('duofuBonusWinTitle').textContent = `🎉 SELAMAT! ANDA MENANG ${tier.label} JACKPOT!`;
    document.getElementById('duofuBonusWinAmount').textContent = `+${tier.prize.toLocaleString('id-ID')} Chip`;
    ann.style.display = 'block';
    audioSys.playWin();
  }

  claimJackpot() {
    if (this.pendingJackpotWin > 0) {
      app.adjustChips(this.pendingJackpotWin);
      app.recordHistory('Duo Fu Duo Cai', this.currentBet, `Jackpot Bonus +${this.pendingJackpotWin}`, this.pendingJackpotWin);
      this.pendingJackpotWin = 0;
    }
    document.getElementById('duofuBonusModal').classList.remove('open');
  }
}

const duofuGame = new DuoFuDuoCaiGame();

/* ==========================================================================
   8. GAME 6: SPACEMAN CRASH
   ========================================================================== */
class SpacemanGame {
  constructor() {
    this.currentBet = 10;
    this.state = 'idle';
    this.multiplier = 1.00;
    this.crashPoint = 1.00;
    this.stars = [];
    this.astronaut = { x: 80, y: 260 };
  }

  init() {
    this.initStars();
    this.state = 'idle';
    this.multiplier = 1.00;
    document.getElementById('spaceMultiplierText').textContent = '1.00x';
    document.getElementById('spaceMultiplierText').classList.remove('crashed');
    document.getElementById('spaceStatusText').textContent = 'Astronot siap di landasan. Tekan LUNCURKAN!';
    
    const btn = document.getElementById('btnSpacemanMain');
    btn.className = 'spaceman-btn-launch';
    btn.textContent = `Luncurkan Astronot (${this.currentBet} Chip)`;
    btn.disabled = false;

    this.drawScene(1.00);
  }

  setBet(val) {
    if (this.state === 'flying') return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewSpaceman .chip-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.val) === val);
    });
    document.getElementById('btnSpacemanMain').textContent = `Luncurkan Astronot (${val} Chip)`;
  }

  initStars() {
    this.stars = [];
    for (let i = 0; i < 70; i++) {
      this.stars.push({
        x: Math.random() * 750,
        y: Math.random() * 340,
        size: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 2 + 1
      });
    }
  }

  handleAction() {
    if (this.state === 'idle' || this.state === 'crashed' || this.state === 'cashed_out') {
      this.launch();
    } else if (this.state === 'flying') {
      this.cashOut();
    }
  }

  launch() {
    if (app.chips < this.currentBet) {
      app.showBanner('spacemanResultBanner', 'Saldo chip tidak mencukupi!', 'lose');
      audioSys.playLose();
      return;
    }

    app.adjustChips(-this.currentBet);
    this.state = 'flying';
    this.multiplier = 1.00;

    const rand = Math.random();
    if (rand < 0.05) {
      this.crashPoint = 1.00 + (Math.random() * 0.1);
    } else {
      this.crashPoint = Math.min(50, 1.05 + Math.pow(Math.random(), 3) * 20);
    }

    const btn = document.getElementById('btnSpacemanMain');
    btn.className = 'spaceman-btn-launch cashout';
    btn.textContent = `AMBIL CHIP (Cash Out)`;

    document.getElementById('spaceMultiplierText').classList.remove('crashed');
    app.showBanner('spacemanResultBanner', 'Astronot meluncur ke angkasa! Ambil sebelum jatuh!', 'info');

    this.startTime = performance.now();
    this.animateFlight();
  }

  animateFlight() {
    if (this.state !== 'flying') return;

    const elapsed = (performance.now() - this.startTime) / 1000;
    this.multiplier = 1.00 + Math.pow(elapsed * 0.45, 1.65);

    const autoInput = parseFloat(document.getElementById('inputAutoCashout').value);
    if (!isNaN(autoInput) && autoInput > 1.00 && this.multiplier >= autoInput) {
      this.multiplier = autoInput;
      this.cashOut();
      return;
    }

    if (this.multiplier >= this.crashPoint) {
      this.multiplier = this.crashPoint;
      this.crash();
      return;
    }

    document.getElementById('spaceMultiplierText').textContent = `${this.multiplier.toFixed(2)}x`;
    document.getElementById('spaceStatusText').textContent = `Astronot mengudara... Pengali ${this.multiplier.toFixed(2)}x`;
    this.drawScene(this.multiplier);

    requestAnimationFrame(() => this.animateFlight());
  }

  cashOut() {
    if (this.state !== 'flying') return;
    this.state = 'cashed_out';

    const winAmount = Math.floor(this.currentBet * this.multiplier);
    const netProfit = winAmount - this.currentBet;
    app.adjustChips(winAmount);

    app.showBanner('spacemanResultBanner', `🎉 BERHASIL CASHOUT! Astronot selamat di ${this.multiplier.toFixed(2)}x (+${winAmount} Chip)!`, 'win');
    audioSys.playWin();
    app.recordHistory('Spaceman', this.currentBet, `Cash Out ${this.multiplier.toFixed(2)}x`, netProfit);

    const btn = document.getElementById('btnSpacemanMain');
    btn.className = 'spaceman-btn-launch';
    btn.textContent = `Luncurkan Lagi (${this.currentBet} Chip)`;
  }

  crash() {
    this.state = 'crashed';
    document.getElementById('spaceMultiplierText').textContent = `${this.multiplier.toFixed(2)}x (CRASH)`;
    document.getElementById('spaceMultiplierText').classList.add('crashed');
    document.getElementById('spaceStatusText').textContent = `💥 Astronot Jatuh di ${this.multiplier.toFixed(2)}x!`;

    app.showBanner('spacemanResultBanner', `💥 ASTRONOT JATUH (CRASH) pada ${this.multiplier.toFixed(2)}x! Taruhan hilang.`, 'lose');
    audioSys.playExplosion();
    app.recordHistory('Spaceman', this.currentBet, `Crash ${this.multiplier.toFixed(2)}x`, -this.currentBet);
    app.checkBankrupt();

    const btn = document.getElementById('btnSpacemanMain');
    btn.className = 'spaceman-btn-launch';
    btn.textContent = `Luncurkan Lagi (${this.currentBet} Chip)`;
    this.drawScene(this.multiplier);
  }

  drawScene(mult) {
    const canvas = document.getElementById('spaceCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    ctx.fillStyle = '#fff';
    this.stars.forEach(s => {
      if (this.state === 'flying') {
        s.x -= s.speed * (1 + (mult * 0.4));
        if (s.x < 0) s.x = w;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    });

    const progress = Math.min((mult - 1) / 5, 1);
    const curX = 80 + progress * 520;
    const curY = 260 - Math.sin(progress * Math.PI * 0.5) * 170;

    ctx.font = '38px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(this.state === 'crashed' ? '💥' : '👨‍🚀', curX, curY);
  }
}

const spacemanGame = new SpacemanGame();

/* ==========================================================================
   9. GAMES 7-12: SLOT, BLACKJACK, ROULETTE, BACCARAT, POKER, SIC BO
   ========================================================================== */
// Slot Classic
class SlotGame {
  constructor() {
    this.currentBet = 10;
    this.isSpinning = false;
    this.symbols = ['7️⃣', '💎', '🔔', '🍋', '🍒'];

    // Auto Spin state
    this.autoSpinActive = false;
    this.autoSpinRemaining = 0; // -1 = infinite
  }

  setBet(val) {
    if (this.isSpinning || this.autoSpinActive) return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewSlot .chip-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.val) === val);
    });
    document.getElementById('btnSpinSlot').textContent = `Putar (${val})`;
  }

  spin() {
    if (this.isSpinning) return;
    if (app.chips < this.currentBet) {
      app.showBanner('slotResultBanner', 'Saldo chip tidak mencukupi!', 'lose');
      audioSys.playLose();
      this.stopAutoSpin();
      return;
    }

    this.isSpinning = true;
    app.adjustChips(-this.currentBet);
    document.getElementById('btnSpinSlot').disabled = true;

    const r1 = document.getElementById('reel1');
    const r2 = document.getElementById('reel2');
    const r3 = document.getElementById('reel3');

    r1.classList.add('spinning');
    r2.classList.add('spinning');
    r3.classList.add('spinning');

    const s1 = this.symbols[Math.floor(Math.random() * this.symbols.length)];
    const s2 = this.symbols[Math.floor(Math.random() * this.symbols.length)];
    const s3 = this.symbols[Math.floor(Math.random() * this.symbols.length)];

    setTimeout(() => { r1.classList.remove('spinning'); r1.querySelector('.reel-content').textContent = s1; audioSys.playClick(); }, 600);
    setTimeout(() => { r2.classList.remove('spinning'); r2.querySelector('.reel-content').textContent = s2; audioSys.playClick(); }, 1000);
    setTimeout(() => {
      r3.classList.remove('spinning');
      r3.querySelector('.reel-content').textContent = s3;
      audioSys.playClick();
      this.evaluate(s1, s2, s3);
      this.isSpinning = false;
      document.getElementById('btnSpinSlot').disabled = false;

      // ── Auto Spin chaining ──
      if (this.autoSpinActive) {
        if (this.autoSpinRemaining === -1) {
          // infinite: keep going unless bankrupt
          if (app.chips >= this.currentBet) {
            setTimeout(() => this.spin(), 350);
          } else {
            this.stopAutoSpin();
          }
        } else if (this.autoSpinRemaining > 0) {
          this.autoSpinRemaining--;
          this.updateAutoUI();
          if (this.autoSpinRemaining > 0 && app.chips >= this.currentBet) {
            setTimeout(() => this.spin(), 350);
          } else {
            this.stopAutoSpin();
          }
        }
      }
    }, 1400);
  }

  evaluate(s1, s2, s3) {
    let mult = 0;
    if (s1 === s2 && s2 === s3) {
      if (s1 === '7️⃣') mult = 100;
      else if (s1 === '💎') mult = 50;
      else if (s1 === '🔔') mult = 20;
      else if (s1 === '🍋') mult = 10;
      else if (s1 === '🍒') mult = 5;
    } else if (s1 === s2 || s2 === s3 || s1 === s3) {
      mult = 2;
    }

    if (mult > 0) {
      const winAmount = this.currentBet * mult;
      app.adjustChips(winAmount);
      app.showBanner('slotResultBanner', `🎉 JACKPOT! [${s1} ${s2} ${s3}] Menang ${mult}x (+${winAmount} Chip)!`, 'win');
      audioSys.playWin();
      app.recordHistory('Slot Machine', this.currentBet, `Jackpot ${mult}x`, winAmount - this.currentBet);
    } else {
      app.showBanner('slotResultBanner', `[${s1} ${s2} ${s3}] Tidak ada kombinasi. Coba lagi!`, 'lose');
      audioSys.playLose();
      app.recordHistory('Slot Machine', this.currentBet, 'Kalah', -this.currentBet);
      app.checkBankrupt();
    }
  }

  /* ── Auto Spin Controls ── */
  toggleAutoSpin() {
    if (this.autoSpinActive) {
      this.stopAutoSpin();
    } else {
      this.startAutoSpin();
    }
  }

  startAutoSpin() {
    if (this.isSpinning) return;
    const select = document.getElementById('slotAutoCount');
    const count = parseInt(select ? select.value : '10');
    this.autoSpinRemaining = count;
    this.autoSpinActive = true;
    this.updateAutoUI();
    // Lock controls during auto spin
    document.querySelectorAll('#viewSlot .chip-btn').forEach(b => b.disabled = true);
    const sel = document.getElementById('slotAutoCount');
    if (sel) sel.disabled = true;
    this.spin();
  }

  stopAutoSpin() {
    this.autoSpinActive = false;
    this.autoSpinRemaining = 0;
    this.updateAutoUI();
    // Restore controls
    document.querySelectorAll('#viewSlot .chip-btn').forEach(b => b.disabled = false);
    const sel = document.getElementById('slotAutoCount');
    if (sel) sel.disabled = false;
  }

  updateAutoUI() {
    const btn = document.getElementById('btnAutoSpinSlot');
    const countdown = document.getElementById('slotAutoCountdown');
    if (!btn) return;

    if (this.autoSpinActive) {
      btn.textContent = '⏹ STOP AUTO';
      btn.style.background = 'linear-gradient(135deg, #ef4444, #b91c1c)';
      if (countdown) {
        countdown.style.display = 'inline';
        countdown.textContent = this.autoSpinRemaining === -1 ? '∞' : `${this.autoSpinRemaining}×`;
      }
    } else {
      btn.textContent = '▶ MULAI AUTO';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      if (countdown) countdown.style.display = 'none';
    }
  }
}
const slotGame = new SlotGame();

// Blackjack
class BlackjackGame {
  constructor() {
    this.currentBet = 10;
    this.deck = [];
    this.playerHand = [];
    this.dealerHand = [];
    this.gameState = 'betting';
  }

  setBet(val) {
    if (this.gameState === 'playing') return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewBlackjack .chip-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.val) === val));
    document.getElementById('bjCurrentBetDisplay').textContent = `${val} Chip`;
  }

  initTable() {
    this.playerHand = [];
    this.dealerHand = [];
    this.renderHands(true);
    document.getElementById('btnBjDeal').disabled = false;
    document.getElementById('btnBjHit').disabled = true;
    document.getElementById('btnBjStand').disabled = true;
    document.getElementById('btnBjDouble').disabled = true;
  }

  createDeck() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.deck = [];
    suits.forEach(s => ranks.forEach(r => this.deck.push({ suit: s, rank: r })));
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  dealCard() { return this.deck.pop(); }

  getHandValue(hand) {
    let sum = 0;
    let aces = 0;
    hand.forEach(c => {
      if (c.rank === 'A') { aces++; sum += 11; }
      else if (['K', 'Q', 'J'].includes(c.rank)) sum += 10;
      else sum += parseInt(c.rank);
    });
    while (sum > 21 && aces > 0) { sum -= 10; aces--; }
    return sum;
  }

  renderHands(hideHoleCard = false) {
    const pCont = document.getElementById('playerCards');
    const dCont = document.getElementById('dealerCards');
    pCont.innerHTML = this.playerHand.map(c => this.makeCardHTML(c)).join('');
    
    if (hideHoleCard && this.dealerHand.length > 0) {
      dCont.innerHTML = this.makeCardHTML(this.dealerHand[0]) + `<div class="card-item hidden-card"></div>`;
      document.getElementById('dealerScore').textContent = `Nilai: ?`;
    } else {
      dCont.innerHTML = this.dealerHand.map(c => this.makeCardHTML(c)).join('');
      document.getElementById('dealerScore').textContent = `Nilai: ${this.getHandValue(this.dealerHand)}`;
    }
    document.getElementById('playerScore').textContent = `Nilai: ${this.getHandValue(this.playerHand)}`;
  }

  makeCardHTML(c) {
    const isRed = c.suit === '♥' || c.suit === '♦';
    return `<div class="card-item ${isRed ? 'red' : 'black'}"><div>${c.rank}${c.suit}</div><div class="card-center">${c.suit}</div><div style="align-self:flex-end;">${c.rank}${c.suit}</div></div>`;
  }

  deal() {
    if (app.chips < this.currentBet) {
      app.showBanner('bjResultBanner', 'Saldo chip tidak cukup!', 'lose');
      audioSys.playLose();
      return;
    }
    app.adjustChips(-this.currentBet);
    this.gameState = 'playing';
    this.createDeck();
    this.playerHand = [this.dealCard(), this.dealCard()];
    this.dealerHand = [this.dealCard(), this.dealCard()];
    this.renderHands(true);

    document.getElementById('btnBjDeal').disabled = true;
    document.getElementById('btnBjHit').disabled = false;
    document.getElementById('btnBjStand').disabled = false;
    document.getElementById('btnBjDouble').disabled = (app.chips < this.currentBet);

    audioSys.playCardDeal();

    if (this.getHandValue(this.playerHand) === 21) {
      this.stand();
    }
  }

  hit() {
    audioSys.playCardDeal();
    this.playerHand.push(this.dealCard());
    this.renderHands(true);
    document.getElementById('btnBjDouble').disabled = true;
    if (this.getHandValue(this.playerHand) >= 21) {
      this.stand();
    }
  }

  doubleDown() {
    if (app.chips < this.currentBet) return;
    app.adjustChips(-this.currentBet);
    this.currentBet *= 2;
    audioSys.playCardDeal();
    this.playerHand.push(this.dealCard());
    this.renderHands(true);
    this.stand();
  }

  stand() {
    this.gameState = 'dealer_turn';
    this.renderHands(false);

    const playDealer = () => {
      if (this.getHandValue(this.dealerHand) < 17) {
        audioSys.playCardDeal();
        this.dealerHand.push(this.dealCard());
        this.renderHands(false);
        setTimeout(playDealer, 500);
      } else {
        this.evaluate();
      }
    };
    setTimeout(playDealer, 500);
  }

  evaluate() {
    const pVal = this.getHandValue(this.playerHand);
    const dVal = this.getHandValue(this.dealerHand);

    if (pVal > 21) {
      app.showBanner('bjResultBanner', `Bust! Nilai kartu Anda ${pVal}. Anda kalah.`, 'lose');
      audioSys.playLose();
      app.recordHistory('Blackjack', this.currentBet, `Bust (${pVal})`, -this.currentBet);
    } else if (dVal > 21 || pVal > dVal) {
      const isBJ = (pVal === 21 && this.playerHand.length === 2);
      const winAmount = isBJ ? Math.floor(this.currentBet * 2.5) : (this.currentBet * 2);
      app.adjustChips(winAmount);
      app.showBanner('bjResultBanner', `🎉 Anda Menang! (${pVal} vs ${dVal}) +${winAmount} Chip!`, 'win');
      audioSys.playWin();
      app.recordHistory('Blackjack', this.currentBet, `Menang (${pVal} vs ${dVal})`, winAmount - this.currentBet);
    } else if (pVal === dVal) {
      app.adjustChips(this.currentBet);
      app.showBanner('bjResultBanner', `Push (Seri) di angka ${pVal}. Chip dikembalikan.`, 'info');
      app.recordHistory('Blackjack', this.currentBet, `Push (${pVal})`, 0);
    } else {
      app.showBanner('bjResultBanner', `Dealer menang (${dVal} vs ${pVal}).`, 'lose');
      audioSys.playLose();
      app.recordHistory('Blackjack', this.currentBet, `Kalah (${pVal} vs ${dVal})`, -this.currentBet);
    }

    this.initTable();
    app.checkBankrupt();
  }
}
const bjGame = new BlackjackGame();

// Roulette
class RouletteGame {
  constructor() {
    this.currentBet = 10;
    this.selectedBetType = 'red';
    this.selectedNumber = null;
    this.isSpinning = false;
    this.numbers = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];
    this.reds = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
  }

  init() {
    this.renderBoard();
    this.drawWheel(0);
  }

  setBet(val) {
    if (this.isSpinning) return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewRoulette .chip-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.val) === val));
  }

  selectBet(type, label, num = null) {
    if (this.isSpinning) return;
    audioSys.playClick();
    this.selectedBetType = type;
    this.selectedNumber = num;
    document.getElementById('rouletteSelectedText').textContent = label;
  }

  renderBoard() {
    const cont = document.getElementById('rouletteNumbersGrid');
    let html = `<button class="roulette-btn num-btn zero" onclick="rouletteGame.selectBet('single', 'Angka 0 (35:1)', 0)">0</button>`;
    for (let i = 1; i <= 36; i++) {
      const isRed = this.reds.includes(i);
      html += `<button class="roulette-btn num-btn ${isRed ? 'red' : 'black'}" onclick="rouletteGame.selectBet('single', 'Angka ${i} (35:1)', ${i})">${i}</button>`;
    }
    cont.innerHTML = html;
  }

  drawWheel(rotation) {
    const canvas = document.getElementById('rouletteCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = 150, cy = 150, r = 135;
    const slice = (Math.PI * 2) / this.numbers.length;

    ctx.clearRect(0, 0, 300, 300);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    for (let i = 0; i < this.numbers.length; i++) {
      const num = this.numbers[i];
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, r, i * slice, (i + 1) * slice);
      ctx.fillStyle = (num === 0) ? '#047857' : (this.reds.includes(num) ? '#dc2626' : '#1e293b');
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.rotate(i * slice + slice / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 11px Poppins';
      ctx.fillText(num, r - 10, 4);
      ctx.restore();
    }
    ctx.restore();
  }

  spin() {
    if (this.isSpinning) return;
    if (app.chips < this.currentBet) {
      app.showBanner('rouletteResultBanner', 'Saldo chip tidak mencukupi!', 'lose');
      audioSys.playLose();
      return;
    }

    this.isSpinning = true;
    app.adjustChips(-this.currentBet);
    document.getElementById('btnSpinRoulette').disabled = true;

    const winningNum = this.numbers[Math.floor(Math.random() * this.numbers.length)];
    const targetIdx = this.numbers.indexOf(winningNum);
    const slice = (Math.PI * 2) / this.numbers.length;
    const targetRot = (Math.PI * 2 * 6) - (targetIdx * slice) - (slice / 2) - (Math.PI / 2);

    let startRot = 0;
    const startTime = performance.now();
    const duration = 3500;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const curRot = startRot + targetRot * easeOut;

      this.drawWheel(curRot);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.evaluate(winningNum);
        this.isSpinning = false;
        document.getElementById('btnSpinRoulette').disabled = false;
      }
    };

    requestAnimationFrame(animate);
  }

  evaluate(num) {
    const isRed = this.reds.includes(num);
    let won = false;
    let payout = 0;

    if (this.selectedBetType === 'red' && isRed) { won = true; payout = 1; }
    else if (this.selectedBetType === 'black' && !isRed && num !== 0) { won = true; payout = 1; }
    else if (this.selectedBetType === 'even' && num % 2 === 0 && num !== 0) { won = true; payout = 1; }
    else if (this.selectedBetType === 'odd' && num % 2 !== 0) { won = true; payout = 1; }
    else if (this.selectedBetType === 'low' && num >= 1 && num <= 18) { won = true; payout = 1; }
    else if (this.selectedBetType === 'high' && num >= 19 && num <= 36) { won = true; payout = 1; }
    else if (this.selectedBetType === 'single' && this.selectedNumber === num) { won = true; payout = 35; }

    if (won) {
      const totalWin = this.currentBet + (this.currentBet * payout);
      app.adjustChips(totalWin);
      app.showBanner('rouletteResultBanner', `🎉 Bola jatuh di ${num} (${isRed ? 'Merah' : (num === 0 ? 'Hijau' : 'Hitam')})! Anda Menang ${payout}x (+${totalWin} Chip)!`, 'win');
      audioSys.playWin();
      app.recordHistory('Roulette', this.currentBet, `Angka ${num} (Menang)`, totalWin - this.currentBet);
    } else {
      app.showBanner('rouletteResultBanner', `Bola jatuh di angka ${num}. Anda belum beruntung.`, 'lose');
      audioSys.playLose();
      app.recordHistory('Roulette', this.currentBet, `Angka ${num} (Kalah)`, -this.currentBet);
      app.checkBankrupt();
    }
  }
}
const rouletteGame = new RouletteGame();

// Baccarat
class BaccaratGame {
  constructor() {
    this.currentBet = 10;
    this.selectedBet = 'player';
    this.isDealing = false;
  }

  init() {
    this.selectBet('player');
  }

  setBet(val) {
    if (this.isDealing) return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewBaccarat .chip-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.val) === val));
  }

  selectBet(side) {
    if (this.isDealing) return;
    audioSys.playClick();
    this.selectedBet = side;
    document.querySelectorAll('.baccarat-bet-btn').forEach(b => b.classList.remove('active-bet'));
    if (side === 'player') document.getElementById('betPlayer').classList.add('active-bet');
    else if (side === 'banker') document.getElementById('betBanker').classList.add('active-bet');
    else if (side === 'tie') document.getElementById('betTie').classList.add('active-bet');
  }

  deal() {
    if (this.isDealing) return;
    if (app.chips < this.currentBet) {
      app.showBanner('bacResultBanner', 'Saldo chip tidak cukup!', 'lose');
      audioSys.playLose();
      return;
    }

    this.isDealing = true;
    app.adjustChips(-this.currentBet);
    document.getElementById('btnDealBac').disabled = true;

    const getRandomCard = () => {
      const suits = ['♠', '♥', '♦', '♣'];
      const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      const suit = suits[Math.floor(Math.random() * 4)];
      const rank = ranks[Math.floor(Math.random() * 13)];
      const val = (rank === 'A') ? 1 : (['10', 'J', 'Q', 'K'].includes(rank) ? 0 : parseInt(rank));
      return { suit, rank, val };
    };

    const pCards = [getRandomCard(), getRandomCard()];
    const bCards = [getRandomCard(), getRandomCard()];

    const pScore = (pCards[0].val + pCards[1].val) % 10;
    const bScore = (bCards[0].val + bCards[1].val) % 10;

    const makeHTML = (cards) => cards.map(c => {
      const isRed = c.suit === '♥' || c.suit === '♦';
      return `<div class="card-item ${isRed ? 'red' : 'black'}"><div>${c.rank}${c.suit}</div><div class="card-center">${c.suit}</div><div>${c.rank}${c.suit}</div></div>`;
    }).join('');

    document.getElementById('bacPlayerCards').innerHTML = makeHTML(pCards);
    document.getElementById('bacBankerCards').innerHTML = makeHTML(bCards);
    document.getElementById('bacPlayerScore').textContent = `Nilai: ${pScore}`;
    document.getElementById('bacBankerScore').textContent = `Nilai: ${bScore}`;

    audioSys.playCardDeal();

    let winner = (pScore > bScore) ? 'player' : (bScore > pScore ? 'banker' : 'tie');

    setTimeout(() => {
      if (this.selectedBet === winner) {
        const mult = (winner === 'tie') ? 8 : (winner === 'banker' ? 0.95 : 1);
        const totalWin = Math.floor(this.currentBet + (this.currentBet * mult));
        app.adjustChips(totalWin);
        app.showBanner('bacResultBanner', `🎉 Menang! ${winner.toUpperCase()} (${pScore} vs ${bScore}) +${totalWin} Chip!`, 'win');
        audioSys.playWin();
        app.recordHistory('Baccarat', this.currentBet, `Menang ${winner.toUpperCase()}`, totalWin - this.currentBet);
      } else {
        app.showBanner('bacResultBanner', `Kalah. Hasil: ${winner.toUpperCase()} (${pScore} vs ${bScore}).`, 'lose');
        audioSys.playLose();
        app.recordHistory('Baccarat', this.currentBet, `Kalah (${winner.toUpperCase()})`, -this.currentBet);
        app.checkBankrupt();
      }

      this.isDealing = false;
      document.getElementById('btnDealBac').disabled = false;
    }, 600);
  }
}
const baccaratGame = new BaccaratGame();

// Video Poker
class VideoPokerGame {
  constructor() {
    this.currentBet = 10;
    this.state = 'idle';
    this.hand = [];
    this.held = [false, false, false, false, false];
  }

  init() {
    this.renderPayTable();
  }

  setBet(val) {
    if (this.state === 'held') return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewPoker .chip-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.val) === val));
    document.getElementById('btnPokerAction').textContent = `Bagi Kartu (${val})`;
  }

  renderPayTable() {
    const pay = [
      ['Royal Flush', '800x'],
      ['Straight Flush', '50x'],
      ['Four of a Kind', '25x'],
      ['Full House', '9x'],
      ['Flush', '6x'],
      ['Straight', '4x'],
      ['Three of a Kind', '3x'],
      ['Two Pair', '2x'],
      ['Jacks or Better', '1x']
    ];
    document.getElementById('pokerPayGrid').innerHTML = pay.map(([k, v]) => `
      <div class="poker-pay-row">
        <div>${k}</div>
        <div style="font-weight:700; color:var(--gold-light);">${v}</div>
      </div>
    `).join('');
  }

  getRandomCard() {
    const suits = ['♠', '♥', '♦', '♣'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    return { suit: suits[Math.floor(Math.random() * 4)], rank: ranks[Math.floor(Math.random() * 13)] };
  }

  handleAction() {
    if (this.state === 'idle') {
      if (app.chips < this.currentBet) {
        app.showBanner('pokerResultBanner', 'Saldo chip tidak cukup!', 'lose');
        audioSys.playLose();
        return;
      }
      app.adjustChips(-this.currentBet);
      this.state = 'held';
      this.hand = [this.getRandomCard(), this.getRandomCard(), this.getRandomCard(), this.getRandomCard(), this.getRandomCard()];
      this.held = [false, false, false, false, false];
      this.renderCards();
      document.getElementById('btnPokerAction').textContent = 'TUKAR KARTU (DRAW)';
      app.showBanner('pokerResultBanner', 'Klik kartu yang ingin DITAHAN (HOLD), lalu klik Tukar Kartu.', 'info');
      audioSys.playCardDeal();
    } else {
      for (let i = 0; i < 5; i++) {
        if (!this.held[i]) this.hand[i] = this.getRandomCard();
      }
      this.renderCards();
      this.evaluate();
      this.state = 'idle';
      document.getElementById('btnPokerAction').textContent = `Bagi Kartu (${this.currentBet})`;
    }
  }

  toggleHold(idx) {
    if (this.state !== 'held') return;
    audioSys.playClick();
    this.held[idx] = !this.held[idx];
    this.renderCards();
  }

  renderCards() {
    const cont = document.getElementById('pokerHand');
    cont.innerHTML = this.hand.map((c, i) => {
      const isRed = c.suit === '♥' || c.suit === '♦';
      return `
        <div class="poker-card-wrapper ${this.held[i] ? 'held' : ''}" onclick="pokerGame.toggleHold(${i})">
          <div class="card-item ${isRed ? 'red' : 'black'}">
            <div>${c.rank}${c.suit}</div>
            <div class="card-center">${c.suit}</div>
            <div>${c.rank}${c.suit}</div>
          </div>
          <span class="hold-tag">${this.held[i] ? 'HELD' : 'HOLD'}</span>
        </div>
      `;
    }).join('');
  }

  evaluate() {
    const ranks = this.hand.map(c => c.rank);
    const counts = {};
    ranks.forEach(r => counts[r] = (counts[r] || 0) + 1);
    const vals = Object.values(counts);

    let mult = 0;
    let name = 'Tanpa Kombinasi';

    if (vals.includes(4)) { mult = 25; name = 'Four of a Kind'; }
    else if (vals.includes(3) && vals.includes(2)) { mult = 9; name = 'Full House'; }
    else if (vals.includes(3)) { mult = 3; name = 'Three of a Kind'; }
    else if (vals.filter(v => v === 2).length === 2) { mult = 2; name = 'Two Pair'; }
    else if (counts['J'] === 2 || counts['Q'] === 2 || counts['K'] === 2 || counts['A'] === 2) { mult = 1; name = 'Jacks or Better'; }

    if (mult > 0) {
      const win = this.currentBet + (this.currentBet * mult);
      app.adjustChips(win);
      app.showBanner('pokerResultBanner', `🎉 ${name}! Menang ${mult}x (+${win} Chip)!`, 'win');
      audioSys.playWin();
      app.recordHistory('Video Poker', this.currentBet, name, win - this.currentBet);
    } else {
      app.showBanner('pokerResultBanner', `${name}. Anda belum beruntung.`, 'lose');
      audioSys.playLose();
      app.recordHistory('Video Poker', this.currentBet, 'Kalah', -this.currentBet);
      app.checkBankrupt();
    }
  }
}
const pokerGame = new VideoPokerGame();

// Sic Bo
class SicBoGame {
  constructor() {
    this.currentBet = 10;
    this.selectedBetType = 'small';
    this.selectedLabel = 'Kecil 4-10 (1:1)';
    this.selectedSum = null;
    this.isRolling = false;
  }

  init() {
    this.renderTotals();
    this.renderDice(1, 2, 3);
  }

  setBet(val) {
    if (this.isRolling) return;
    audioSys.playClick();
    this.currentBet = val;
    document.querySelectorAll('#viewSicbo .chip-btn').forEach(b => b.classList.toggle('active', parseInt(b.dataset.val) === val));
  }

  selectBet(type, label, sumVal = null) {
    if (this.isRolling) return;
    audioSys.playClick();
    this.selectedBetType = type;
    this.selectedLabel = label;
    this.selectedSum = sumVal;
    document.getElementById('sicboSelectedText').textContent = label;
    document.querySelectorAll('#viewSicbo .roulette-btn').forEach(b => b.classList.remove('selected'));
    const el = document.getElementById(sumVal ? `sb_sum_${sumVal}` : (type === 'small' ? 'sb_small' : (type === 'big' ? 'sb_big' : (type === 'odd' ? 'sb_odd' : (type === 'even' ? 'sb_even' : 'sb_triple')))));
    if (el) el.classList.add('selected');
  }

  renderTotals() {
    const cont = document.getElementById('sicboTotalsGrid');
    let html = '';
    for (let s = 4; s <= 17; s++) {
      const pay = (s === 4 || s === 17) ? 60 : ((s === 5 || s === 16) ? 30 : ((s === 6 || s === 15) ? 17 : ((s === 7 || s === 14) ? 12 : ((s === 8 || s === 13) ? 8 : 6))));
      html += `<button class="roulette-btn" id="sb_sum_${s}" onclick="sicboGame.selectBet('sum', 'Total ${s} (${pay}:1)', ${s})"><strong>${s}</strong><br><small>${pay}:1</small></button>`;
    }
    cont.innerHTML = html;
  }

  renderDice(d1, d2, d3) {
    const map = { 1: [4], 2: [0, 8], 3: [0, 4, 8], 4: [0, 2, 6, 8], 5: [0, 2, 4, 6, 8], 6: [0, 2, 3, 5, 6, 8] };
    const makeDots = (num) => {
      const active = map[num] || [];
      let d = '';
      for (let i = 0; i < 9; i++) d += `<div class="dice-dot ${active.includes(i) ? 'show' : ''}"></div>`;
      return d;
    };
    document.getElementById('dice1').innerHTML = makeDots(d1);
    document.getElementById('dice2').innerHTML = makeDots(d2);
    document.getElementById('dice3').innerHTML = makeDots(d3);
  }

  roll() {
    if (this.isRolling) return;
    if (app.chips < this.currentBet) {
      app.showBanner('sicboResultBanner', 'Saldo chip tidak cukup!', 'lose');
      audioSys.playLose();
      return;
    }

    this.isRolling = true;
    app.adjustChips(-this.currentBet);
    document.getElementById('btnSpinSicbo').disabled = true;

    const dome = document.getElementById('sicboDome');
    dome.classList.add('shaking');
    const rollInt = setInterval(() => audioSys.playDiceRoll(), 150);

    setTimeout(() => {
      clearInterval(rollInt);
      dome.classList.remove('shaking');

      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      const d3 = Math.floor(Math.random() * 6) + 1;

      this.renderDice(d1, d2, d3);
      this.evaluate(d1, d2, d3);
      this.isRolling = false;
      document.getElementById('btnSpinSicbo').disabled = false;
    }, 1600);
  }

  evaluate(d1, d2, d3) {
    const sum = d1 + d2 + d3;
    const isTriple = (d1 === d2 && d2 === d3);
    const isSmall = !isTriple && (sum >= 4 && sum <= 10);
    const isBig = !isTriple && (sum >= 11 && sum <= 17);
    const isOdd = !isTriple && (sum % 2 !== 0);
    const isEven = !isTriple && (sum % 2 === 0);

    let won = false;
    let pay = 0;

    if (this.selectedBetType === 'small' && isSmall) { won = true; pay = 1; }
    else if (this.selectedBetType === 'big' && isBig) { won = true; pay = 1; }
    else if (this.selectedBetType === 'odd' && isOdd) { won = true; pay = 1; }
    else if (this.selectedBetType === 'even' && isEven) { won = true; pay = 1; }
    else if (this.selectedBetType === 'any_triple' && isTriple) { won = true; pay = 30; }
    else if (this.selectedBetType === 'sum' && this.selectedSum === sum) {
      won = true;
      pay = (sum === 4 || sum === 17) ? 60 : ((sum === 5 || sum === 16) ? 30 : ((sum === 6 || sum === 15) ? 17 : ((sum === 7 || sum === 14) ? 12 : ((sum === 8 || sum === 13) ? 8 : 6))));
    }

    const diceStr = `[${d1}, ${d2}, ${d3}] Total: ${sum}`;

    if (won) {
      const totalWin = this.currentBet + (this.currentBet * pay);
      app.adjustChips(totalWin);
      app.showBanner('sicboResultBanner', `🎉 Dadu ${diceStr}! Menang ${pay}x (+${totalWin} Chip)!`, 'win');
      audioSys.playWin();
      app.recordHistory('Sic Bo', this.currentBet, `Menang ${diceStr}`, totalWin - this.currentBet);
    } else {
      app.showBanner('sicboResultBanner', `Dadu ${diceStr}. Anda belum beruntung.`, 'lose');
      audioSys.playLose();
      app.recordHistory('Sic Bo', this.currentBet, `Kalah ${diceStr}`, -this.currentBet);
      app.checkBankrupt();
    }
  }
}
const sicboGame = new SicBoGame();

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  app.updateUI();
});
