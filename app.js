(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  const symbols = ['🍒', '🍋', '🍊', '🔔', '⭐', '💎', '7️⃣'];
  const outcomeOdds = [
    { symbol: null, label: 'ハズレ', odds: 83.84 },
    { symbol: '🍒', label: '🍒', odds: 5 }, { symbol: '🍋', label: '🍋', odds: 5 },
    { symbol: '🍊', label: '🍊', odds: 5 }, { symbol: '🔔', label: '🔔', odds: 1 },
    { symbol: '⭐', label: '⭐', odds: .1 }, { symbol: '💎', label: '💎', odds: .05 },
    { symbol: '7️⃣', label: '7️⃣', odds: .01 }
  ];
  const payout = { '🍒': 150, '🍋': 150, '🍊': 150, '🔔': 700, '⭐': 2000, '💎': 5000, '7️⃣': 10000 };
  const jackpotSymbols = new Set(['⭐', '💎', '7️⃣']);
  const buffs = [
    { id: 'focus', icon: '🎯', name: '集中力', price: 1000, group: 'ミニゲーム', desc: 'タイミングゲームの判定範囲が広がる。' },
    { id: 'luck', icon: '🎰', name: '幸運', price: 1500, group: 'スロット', desc: '⭐・💎・7️⃣が少し出やすくなる。' },
    { id: 'saving', icon: '💰', name: '節約', price: 2000, group: 'ミニゲーム', desc: 'ミニゲーム参加料が10から8コインになる。' },
    { id: 'gambler', icon: '🔥', name: 'ギャンブラー', price: 2500, group: 'スロット', desc: '通常スロット報酬+20%、SPIN料金+10。' },
    { id: 'highlow', icon: '🃏', name: 'ハイロー強化', price: 3000, group: 'ミニゲーム', desc: 'ハイ＆ローの正解ごとの賞金が2倍になる。' },
    { id: 'memory', icon: '🧠', name: '記憶力', price: 3500, group: 'ミニゲーム', desc: '記憶ゲームの数字表示時間が長くなる。' },
    { id: 'fruitBonus', icon: '🍇', name: 'フルーツマスター', price: 4000, group: 'スロット', desc: 'フルーツが当たった時のコイン報酬が2倍になる。' },
    { id: 'bellBonus', icon: '🔔', name: 'ベルコレクター', price: 5000, group: 'スロット', desc: 'ベル当たりの無料SPINが5回から10回になる。' },
    { id: 'spinSaver', icon: '🎟️', name: '回転割引', price: 6000, group: 'スロット', desc: '有料SPINの料金が10コイン安くなる。' },
    { id: 'miniBonus', icon: '🏅', name: 'ミニゲーム名人', price: 7000, group: 'ミニゲーム', desc: 'ミニゲームの獲得コインが50%増える。' },
    { id: 'taStipend', icon: '🧳', name: 'TA支度金', price: 8000, group: 'タイムアタック', desc: 'TA開始時のコインが10から100になる。' },
    { id: 'timingBonus', icon: '⏱️', name: 'タイミング報酬', price: 9000, group: 'ミニゲーム', desc: 'タイミングゲームのGOOD以上の報酬が50%増える。' },
    { id: 'focusPlus', icon: '🎯', name: '超集中力', price: 12000, group: 'ミニゲーム', desc: '集中力よりさらにタイミング判定の範囲が広がる。集中力より優先。' },
    { id: 'luckPlus', icon: '🌠', name: '強運', price: 14000, group: 'スロット', desc: '⭐・💎・7️⃣が幸運よりさらに出やすくなる。幸運より優先。' },
    { id: 'savingPlus', icon: '🪙', name: '超節約', price: 16000, group: 'ミニゲーム', desc: 'ミニゲーム参加料が10から5コインになる。節約より優先。' },
    { id: 'gamblerPlus', icon: '👑', name: '大ギャンブラー', price: 18000, group: 'スロット', desc: '通常スロット報酬+50%、SPIN料金+20。ギャンブラーより優先。' },
    { id: 'highlowPlus', icon: '♠️', name: 'ハイロー極意', price: 20000, group: 'ミニゲーム', desc: 'ハイ＆ローの正解ごとの賞金がさらに増える。ハイロー強化より優先。' },
    { id: 'memoryPlus', icon: '🧠', name: '完全記憶', price: 22000, group: 'ミニゲーム', desc: '記憶ゲームの数字表示時間がさらに長くなる。記憶力より優先。' },
    { id: 'fruitBonusPlus', icon: '🍉', name: 'フルーツレジェンド', price: 24000, group: 'スロット', desc: 'フルーツ報酬が3倍になる。フルーツマスターより優先。' },
    { id: 'bellBonusPlus', icon: '🔔', name: '黄金のベル', price: 26000, group: 'スロット', desc: 'ベル当たりで無料SPINを15回獲得する。ベルコレクターより優先。' },
    { id: 'spinSaverPlus', icon: '🎫', name: '永久割引', price: 28000, group: 'スロット', desc: '有料SPINの料金が20コイン安くなる。回転割引より優先。' },
    { id: 'miniBonusPlus', icon: '🏆', name: 'ミニゲーム達人', price: 30000, group: 'ミニゲーム', desc: 'ミニゲームの獲得コインが2倍になる。ミニゲーム名人より優先。' },
    { id: 'taStipendPlus', icon: '💼', name: 'TAスポンサー', price: 32000, group: 'タイムアタック', desc: 'TA開始時のコインが500になる。TA支度金より優先。' },
    { id: 'timingBonusPlus', icon: '⌛', name: 'タイミング極意', price: 34000, group: 'ミニゲーム', desc: 'タイミングゲームのGOOD以上の報酬が2倍になる。タイミング報酬より優先。' }
  ];
  const achievements = [
    ['firstWin', '🎰', '初当たり', 'スロットで初めて当たる。'], ['seven', '7️⃣', 'セブン', '777を当てる。'],
    ['highLowWin', '🃏', '読み勝ち', 'ハイ＆ローで正解する。'], ['memoryWin', '🧠', '記憶の達人', '数字記憶に成功する。'],
    ['ta10000', '🏆', '10000コイン', '10000コインTAを完走する。'], ['taComplete', '⏱️', 'TAプレイヤー', 'タイムアタックを完走する。'],
    ['buffExpansion', '⚡', '装備拡張', 'Tコインで装備枠を増やす。'], ['rich', '💰', '大金持ち', '通常コインを10000枚以上にする。'],
    ['collector', '✨', 'バフコレクター', '3種類以上のバフを所持する。'],
    ['fruitTen', '🍒', 'フルーツ好き', 'フルーツを合計10回当てる。'], ['fruitTrio', '🍒🍋🍊', 'フルーツ盛り合わせ', '3種類のフルーツをそれぞれ当てる。'],
    ['bellFive', '🔔', 'ベル連打', 'ベルを5回当てる。'], ['jackpotFirst', '💎', 'レア絵柄', '星・ダイヤ・777のどれかを当てる。'],
    ['bigPayout', '💸', '大当たり', '1回で5000コイン以上獲得する。'], ['miniTen', '🎮', 'ゲーム好き', 'ミニゲームで10回成功する。'],
    ['taFive', '⌛', '5分走破', '5分TAを完走する。'], ['taTen', '⏱️', '10分走破', '10分TAを完走する。'],
    ['buffTwelve', '🧰', 'バフ収集家', '12種類のバフを所持する。'], ['buffMaster', '🌟', '上位装備', '上位版バフを初めて装備する。'],
    ['fullLoadout', '🎒', 'フル装備', '5つ以上のバフを同時に装備する。'], ['richFifty', '💎', '資産家', '所持コインが50000枚に到達する。'],
    ['spinHundred', '🎰', '回し続けて', 'スロットを100回プレイする。'], ['doubleUpWin', '🎲', '勝負師', 'ダブルアップに成功する。'],
    ['bonusReelUsed', '🎡', '運命のリール', 'ボーナスリールを回す。'], ['stopChallengeWin', '🛑', '目押し成功', '3リールチャレンジで絵柄を揃える。']
  ];
  const fresh = () => ({ coins: 0, freeSpins: 3, best: 0, miniCoins: 0, miniBest: 0, tCoins: 0, slotCount: 2, owned: [], equipped: [], achievements: [], stats: { spins: 0, fruits: 0, bells: 0, miniWins: 0, fruitTypes: [] }, pendingDoubleUp: 0, lastLogin: '', streak: 0, best10k: null, best10min: 0, best5min: 0, timingDate: '', timingFree: true });
  let data;
  try {
    const current = localStorage.getItem('kyslot.save.v2');
    if (current) data = { ...fresh(), ...JSON.parse(current) };
    else {
      data = fresh();
      const number = (key, fallback) => { const raw = localStorage.getItem(key); if (raw === null) return fallback; const value = Number(raw); return Number.isFinite(value) ? value : fallback; };
      data.coins = number('slotCoins', 0); data.freeSpins = number('slotFreeSpins', 3); data.best = number('slotBest', 0);
      data.miniCoins = number('miniGameCoins', 0); data.miniBest = number('miniGameBest', 0); data.tCoins = number('tCoins', 0);
      data.slotCount = Math.max(2, number('buffSlotCount', 2));
      data.owned = JSON.parse(localStorage.getItem('ownedBuffs') || '[]'); data.equipped = JSON.parse(localStorage.getItem('equippedBuffs') || '[]');
      data.achievements = JSON.parse(localStorage.getItem('achievements') || '[]');
      data.lastLogin = localStorage.getItem('lastLoginDate') || ''; data.streak = number('loginStreak', 0);
    }
  } catch { data = fresh(); }
  for (const k of ['owned', 'equipped', 'achievements']) if (!Array.isArray(data[k])) data[k] = [];
  if (!data.stats || typeof data.stats !== 'object') data.stats = fresh().stats;
  data.stats = { ...fresh().stats, ...data.stats };
  if (!Array.isArray(data.stats.fruitTypes)) data.stats.fruitTypes = [];
  data.pendingDoubleUp = Math.max(0, Number(data.pendingDoubleUp) || 0);
  data.achievements = data.achievements.filter(id => id !== 'multiplierWin');
  delete data.multiUnlocked;
  data.owned = [...new Set(data.owned.filter(id => buffs.some(buff => buff.id === id)))];
  data.equipped = [...new Set(data.equipped.filter(id => data.owned.includes(id)))].slice(0, Math.max(2, Number(data.slotCount) || 2));
  let activeTA = null, spinLock = false, stopChallenge = null, doubleUpResolving = false, hl = null, memoryAnswer = '', memoryEntry = '', memoryRun = null, timingRun = null, timingTimer = null, timingPos = 0, timingDir = 1, toastTimer;

  function save() { localStorage.setItem('kyslot.save.v2', JSON.stringify(data)); }
  function fmt(n) { return Math.floor(n).toLocaleString('ja-JP'); }
  function has(id) { return data.equipped.includes(id); }
  function hasPair(base, plus) { return has(base) && has(plus); }
  function nowDay() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; }
  function notice(message) { const t = $('toast'); t.textContent = message; t.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 2200); }
  function unlock(id) { if (data.achievements.includes(id)) return; data.achievements.push(id); save(); renderAchievements(); const a = achievements.find(x => x[0] === id); if (a) notice(`🏆 実績解除：${a[2]}`); }
  function addCoins(amount, to = 'normal') {
    amount = Math.floor(amount); if (amount <= 0) return;
    if (to === 'ta' && activeTA) activeTA.coins += amount;
    else if (to === 'mini') { data.miniCoins += amount; data.miniBest = Math.max(data.miniBest, data.miniCoins); }
    else { data.coins += amount; data.best = Math.max(data.best, data.coins); }
    refresh();
  }
  function spend(amount, to = 'normal') {
    if (data.pendingDoubleUp > 0 || stopChallenge || spinLock) return false;
    const balance = to === 'ta' && activeTA ? activeTA.coins : to === 'mini' ? data.miniCoins : data.coins;
    if (balance < amount) return false;
    if (to === 'ta' && activeTA) activeTA.coins -= amount;
    else if (to === 'mini') data.miniCoins -= amount;
    else data.coins -= amount;
    refresh(); return true;
  }
  function refresh() {
    $('coins').textContent = fmt(data.coins); $('freeSpins').textContent = data.freeSpins; $('miniCoins').textContent = fmt(data.miniCoins); $('miniBest').textContent = fmt(data.miniBest);
    $('tCoins').textContent = data.tCoins; $('slotExpandCost').textContent = slotExpandCost();
    $('settingsCoins').textContent = fmt(data.coins); $('settingsBest').textContent = fmt(data.best); $('settingsT').textContent = data.tCoins;
    $('spinCost').textContent = spinCost();
    $('highLowCost').textContent = entryFee(); $('memoryCost').textContent = entryFee();
    $('timingCost').textContent = timingFreeReady() ? '今日の無料プレイ' : `参加料 ${entryFee()} コイン`;
    const hasDoubleUp = data.best >= 10000, hasBonusReel = data.best >= 30000, hasStopChallenge = data.best >= 50000;
    $('doubleUpStatus').textContent = hasDoubleUp ? '✅ 解放済み' : '🔒 最高コイン1万で解放';
    $('bonusReelStatus').textContent = hasBonusReel ? '✅ 解放済み' : '🔒 最高コイン3万で解放';
    $('stopChallengeStatus').textContent = hasStopChallenge ? `✅ 解放済み · 掛け金 ${fmt(spinCost())}` : '🔒 最高コイン5万で解放';
    $('doubleUpControls').classList.toggle('hidden', data.pendingDoubleUp <= 0);
    $('doubleUpPrompt').textContent = `現在の報酬 ${fmt(data.pendingDoubleUp)}コイン。もう一度成功で倍、失敗でこの報酬を失います。`;
    $('spin').disabled = spinLock || data.pendingDoubleUp > 0;
    $('stopChallengeStart').classList.toggle('hidden', !hasStopChallenge || !!stopChallenge);
    $('stopChallengeControls').classList.toggle('hidden', !stopChallenge);
    if (!hasStopChallenge) $('stopChallengeResult').textContent = '3リールチャレンジはロック中です。';
    else if (!stopChallenge && $('stopChallengeResult').textContent === '3リールチャレンジはロック中です。') $('stopChallengeResult').textContent = '3本を順番に止めて、同じ絵柄を揃えよう。';
    renderPaytable();
    $('taBanner').classList.toggle('hidden', !activeTA); if (activeTA) updateTA();
    if (data.coins >= 50000) unlock('richFifty');
    save();
  }
  function slotExpandCost() { return Math.max(1, Math.floor(data.slotCount) - 1); }
  function spinCost() { const base = has('gamblerPlus') ? 70 : has('gambler') ? 60 : 50; const discount = hasPair('spinSaver', 'spinSaverPlus') ? 25 : has('spinSaverPlus') ? 20 : has('spinSaver') ? 10 : 0; return Math.max(10, base - discount); }
  function pickSymbol() { return symbols[Math.floor(Math.random() * symbols.length)]; }
  function spinOdds() {
    const luckMultiplier = hasPair('luck', 'luckPlus') ? 1.65 : has('luckPlus') ? 1.5 : has('luck') ? 1.2 : 1;
    const weights = outcomeOdds.map(outcome => outcome.odds * (jackpotSymbols.has(outcome.symbol) ? luckMultiplier : 1));
    const total = weights.reduce((sum, weight) => sum + weight, 0);
    return weights.map(weight => weight / total);
  }
  function drawSpinOutcome() {
    const probabilities = spinOdds();
    const roll = Math.random(); let cumulative = 0;
    for (let i = 0; i < outcomeOdds.length; i++) { cumulative += probabilities[i]; if (roll < cumulative) return outcomeOdds[i]; }
    return outcomeOdds[outcomeOdds.length - 1];
  }
  function makeDisplayResult(hit) {
    if (hit) return [hit, hit, hit];
    const result = [pickSymbol(), pickSymbol(), pickSymbol()];
    if (result[0] === result[1] && result[1] === result[2]) result[2] = symbols[(symbols.indexOf(result[2]) + 1) % symbols.length];
    return result;
  }
  function renderPaytable() {
    $('paytableBody').innerHTML = outcomeOdds.map(outcome => {
      const reward = outcome.symbol ? payout[outcome.symbol].toLocaleString('ja-JP') : '—';
      const bonus = outcome.symbol === '🔔' ? '+ 無料SPIN 5回' : '—';
      const oddsText = outcome.odds < .1 ? `${outcome.odds.toFixed(3)}%` : `${outcome.odds.toFixed(2)}%`;
      return `<tr><th>${outcome.label}</th><td>${oddsText}</td><td>${reward}</td><td>${bonus}</td></tr>`;
    }).join('');
  }
  let jackpotOverlayTimer;
  function showJackpotOverlay(symbol, reward) {
    const overlay = $('jackpotOverlay');
    overlay.className = `jackpot-overlay show ${symbol === '7️⃣' ? 'seven' : symbol === '💎' ? 'diamond' : 'star'}`;
    $('jackpotOverlaySymbol').textContent = symbol;
    $('jackpotOverlayAmount').textContent = `+${fmt(reward)}コイン！`;
    overlay.setAttribute('aria-hidden', 'false');
    clearTimeout(jackpotOverlayTimer);
    jackpotOverlayTimer = setTimeout(() => {
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
    }, 1900);
  }
  function spin() {
    if (spinLock || data.pendingDoubleUp > 0) return;
    $('bonusReelDisplay').classList.add('hidden'); $('bonusReelResult').textContent = '';
    const taRun = activeTA;
    const cost = spinCost();
    if (taRun) {
      if (taRun.free > 0) taRun.free--;
      else if (taRun.coins >= cost) taRun.coins -= cost;
      else { $('slotResult').textContent = 'TAコインが足りません！ ミニゲームで増やそう。'; return; }
    } else if (data.freeSpins > 0) data.freeSpins--;
    else if (data.coins >= cost) data.coins -= cost;
    else { $('slotResult').textContent = 'コインが足りません！'; return; }
    spinLock = true; $('spin').disabled = true; $('slotResult').className = 'result'; $('slotResult').textContent = '回転中……';
    const outcome = drawSpinOutcome();
    const out = makeDisplayResult(outcome.symbol); let count = 0;
    const settleSpin = (bonusMultiplier = 1, bonusLabel = '') => {
      for (let i=0;i<3;i++) { const el = $(`reel${i}`); el.textContent = out[i]; el.classList.remove('spinning'); }
      const fruit = ['🍒', '🍋', '🍊'].includes(outcome.symbol);
      const gamblerMultiplier = hasPair('gambler', 'gamblerPlus') ? 1.65 : has('gamblerPlus') ? 1.5 : has('gambler') ? 1.2 : 1;
      const fruitMultiplier = hasPair('fruitBonus', 'fruitBonusPlus') ? 3.5 : has('fruitBonusPlus') ? 3 : has('fruitBonus') ? 2 : 1;
      const baseReward = outcome.symbol ? Math.floor(payout[outcome.symbol] * gamblerMultiplier * (fruit ? fruitMultiplier : 1)) : 0;
      const reward = Math.floor(baseReward * bonusMultiplier);
      const bellFree = outcome.symbol === '🔔' ? (hasPair('bellBonus', 'bellBonusPlus') ? 17 : has('bellBonusPlus') ? 15 : has('bellBonus') ? 10 : 5) : 0;
      data.stats.spins++;
      if (fruit) { data.stats.fruits++; if (!data.stats.fruitTypes.includes(outcome.symbol)) data.stats.fruitTypes.push(outcome.symbol); }
      if (outcome.symbol === '🔔') data.stats.bells++;
      if (data.stats.spins >= 100) unlock('spinHundred');
      if (data.stats.fruits >= 10) unlock('fruitTen');
      if (data.stats.fruitTypes.length === 3) unlock('fruitTrio');
      if (data.stats.bells >= 5) unlock('bellFive');
      if (jackpotSymbols.has(outcome.symbol)) unlock('jackpotFirst');
      if (outcome.symbol === '7️⃣') unlock('seven');
      if (reward >= 5000) unlock('bigPayout');
      const jackpotClass = outcome.symbol === '7️⃣' ? 'jackpot-seven' : outcome.symbol === '💎' ? 'jackpot-diamond' : outcome.symbol === '⭐' ? 'jackpot-star' : '';
      $('slotResult').className = `result${reward ? ' win' : ''}${jackpotClass && reward ? ` ${jackpotClass}` : ''}`;
      for (let i=0;i<3;i++) $('reel'+i).classList.toggle('jackpot-reel', !!(jackpotClass && reward));
      if (jackpotClass && reward) {
        $('slotResult').textContent = `${outcome.symbol === '7️⃣' ? '🌈 JACKPOT!!' : outcome.symbol === '💎' ? '💎 DIAMOND BONUS!' : '⭐ STAR BONUS!'} +${fmt(reward)} ${taRun ? 'TA' : ''}コイン！${bonusLabel}`;
        showJackpotOverlay(outcome.symbol, reward);
      } else $('slotResult').textContent = reward ? `🎉 +${fmt(reward)} ${taRun ? 'TA' : ''}コイン！${bonusLabel}${bellFree ? ` 🔔無料SPIN +${bellFree}回` : ''}` : outcome.symbol ? `ボーナスリールでハズレ……報酬なし${bellFree ? ` 🔔無料SPIN +${bellFree}回` : ''}` : 'ハズレ……';
      if (taRun) { if (activeTA === taRun) { taRun.coins += reward; taRun.free += bellFree; if (taRun.type === '10k' && taRun.coins >= 10000) finishTA(true); } }
      else {
        data.coins += reward; data.best = Math.max(data.best, data.coins);
        if (outcome.symbol) unlock('firstWin');
        if (data.best >= 10000) unlock('rich');
        if (reward > 0 && data.best >= 10000) data.pendingDoubleUp = reward;
      }
      if (!taRun) data.freeSpins += bellFree;
      spinLock = data.pendingDoubleUp > 0;
      refresh();
    };
    const tick = setInterval(() => {
      for (let i=0;i<3;i++) { const el = $(`reel${i}`); el.textContent = pickSymbol(); el.classList.add('spinning'); }
      if (++count < 14) return; clearInterval(tick);
      for (let i=0;i<3;i++) { const el = $(`reel${i}`); el.textContent = out[i]; el.classList.remove('spinning'); }
      if (outcome.symbol && !taRun && data.best >= 30000) {
        unlock('bonusReelUsed');
        const bonusDisplay = $('bonusReelDisplay'), options = ['×2', '×3', 'ハズレ'];
        bonusDisplay.classList.remove('hidden'); $('bonusReelResult').textContent = 'ボーナスリール抽選中……';
        const roll = Math.random(), multiplier = roll < .5 ? 2 : roll < .7 ? 3 : 0;
        const label = multiplier ? ` ${multiplier}倍！` : ' ボーナスハズレ！';
        let bonusCount = 0;
        const bonusTick = setInterval(() => {
          bonusDisplay.textContent = options[Math.floor(Math.random() * options.length)];
          if (++bonusCount < 12) return;
          clearInterval(bonusTick); bonusDisplay.textContent = multiplier ? `×${multiplier}` : 'ハズレ';
          $('bonusReelResult').textContent = multiplier ? `${multiplier}倍！ 報酬アップ！` : 'ハズレ！ 今回のコイン報酬はなし。';
          settleSpin(multiplier, label);
        }, 70);
      } else settleSpin();
    }, 72);
    refresh();
  }
  $('spin').addEventListener('click', spin);

  $('stopChallengeStart').addEventListener('click', () => {
    if (data.best < 50000) { notice('最高所持コイン5万で解放されます'); return; }
    if (activeTA || spinLock || stopChallenge || data.pendingDoubleUp > 0) { notice('現在のプレイを終えてから挑戦してください'); return; }
    const cost = spinCost();
    if (!spend(cost)) { notice(`掛け金${fmt(cost)}コインが必要です`); return; }
    stopChallenge = { stopped: [false, false, false], timers: [] }; spinLock = true;
    $('stopChallengeResult').textContent = `掛け金${fmt(cost)}コイン。リールを順番に止めよう！`;
    document.querySelectorAll('[data-stop]').forEach((button, index) => {
      button.classList.remove('hidden'); button.disabled = false;
      const reel = $(`challengeReel${index}`); reel.classList.add('spinning');
      stopChallenge.timers[index] = setInterval(() => { reel.textContent = pickSymbol(); }, 75);
    });
    refresh();
  });
  document.querySelectorAll('[data-stop]').forEach(button => button.addEventListener('click', () => {
    if (!stopChallenge) return;
    const index = Number(button.dataset.stop);
    if (stopChallenge.stopped[index]) return;
    clearInterval(stopChallenge.timers[index]); stopChallenge.stopped[index] = true;
    $(`challengeReel${index}`).classList.remove('spinning'); button.classList.add('hidden');
    if (!stopChallenge.stopped.every(Boolean)) return;
    const result = [0, 1, 2].map(i => $(`challengeReel${i}`).textContent);
    const symbol = result.every(item => item === result[0]) ? result[0] : null;
    const fruit = ['🍒', '🍋', '🍊'].includes(symbol);
    const gamblerMultiplier = hasPair('gambler', 'gamblerPlus') ? 1.65 : has('gamblerPlus') ? 1.5 : has('gambler') ? 1.2 : 1;
    const fruitMultiplier = hasPair('fruitBonus', 'fruitBonusPlus') ? 3.5 : has('fruitBonusPlus') ? 3 : has('fruitBonus') ? 2 : 1;
    const reward = symbol ? Math.floor(payout[symbol] * gamblerMultiplier * (fruit ? fruitMultiplier : 1)) : 0;
    const bellFree = symbol === '🔔' ? (hasPair('bellBonus', 'bellBonusPlus') ? 17 : has('bellBonusPlus') ? 15 : has('bellBonus') ? 10 : 5) : 0;
    data.stats.spins++;
    if (fruit) { data.stats.fruits++; if (!data.stats.fruitTypes.includes(symbol)) data.stats.fruitTypes.push(symbol); }
    if (symbol === '🔔') data.stats.bells++;
    if (data.stats.spins >= 100) unlock('spinHundred');
    if (data.stats.fruits >= 10) unlock('fruitTen');
    if (data.stats.fruitTypes.length === 3) unlock('fruitTrio');
    if (data.stats.bells >= 5) unlock('bellFive');
    if (jackpotSymbols.has(symbol)) unlock('jackpotFirst');
    if (symbol === '7️⃣') unlock('seven');
    if (reward >= 5000) unlock('bigPayout');
    if (reward) { data.coins += reward; data.freeSpins += bellFree; data.best = Math.max(data.best, data.coins); unlock('firstWin'); unlock('stopChallengeWin'); }
    if (data.best >= 10000) unlock('rich');
    stopChallenge = null; spinLock = false;
    $('stopChallengeResult').textContent = reward ? `🎉 ${symbol}が揃った！ +${fmt(reward)}コイン${bellFree ? ` · 無料SPIN +${bellFree}回` : ''}` : '残念！ 揃いませんでした。';
    refresh();
  }));

  function finishDoubleUp(keep) {
    if (data.pendingDoubleUp <= 0 || doubleUpResolving) return;
    if (keep) {
      const reward = data.pendingDoubleUp; data.pendingDoubleUp = 0;
      $('slotResult').textContent = `💰 +${fmt(reward)}コインを受け取りました！`;
      spinLock = false; refresh(); return;
    }
    doubleUpResolving = true; $('doubleUpContinue').disabled = true; $('doubleUpCollect').disabled = true;
    $('doubleUpPrompt').textContent = 'ダブルアップ挑戦中……';
    setTimeout(() => {
      const currentReward = data.pendingDoubleUp;
      if (Math.random() < .5) {
        data.coins += currentReward; data.best = Math.max(data.best, data.coins);
        data.pendingDoubleUp = currentReward * 2; unlock('doubleUpWin');
        $('slotResult').textContent = `🎉 成功！ 報酬が${fmt(data.pendingDoubleUp)}コインに倍増！`;
      } else {
        data.coins = Math.max(0, data.coins - currentReward); data.pendingDoubleUp = 0;
        $('slotResult').textContent = `😵 失敗……今回の報酬${fmt(currentReward)}コインを失いました。`;
      }
      doubleUpResolving = false; $('doubleUpContinue').disabled = false; $('doubleUpCollect').disabled = false;
      spinLock = data.pendingDoubleUp > 0; refresh();
    }, 750);
  }
  $('doubleUpContinue').addEventListener('click', () => finishDoubleUp(false));
  $('doubleUpCollect').addEventListener('click', () => finishDoubleUp(true));

  function startTA(type) {
    if(data.pendingDoubleUp>0){notice('ダブルアップの報酬を先に受け取ってください');return;}
    if(stopChallenge||spinLock){notice('現在のスロットを終えてからTAを始めてください');return;}
    if(activeTA){notice('タイムアタック中です');return;}
    const duration = type === '5min' ? 300000 : type === '10min' ? 600000 : 0;
    const startCoins = hasPair('taStipend', 'taStipendPlus') ? 550 : has('taStipendPlus') ? 500 : has('taStipend') ? 100 : 10;
    activeTA={type,coins:startCoins,free:3,start:performance.now(),duration};
    $('taName').textContent=type==='10k'?'🏆 10000コインTA':type==='5min'?'⌛ 5分コインTA':'⏱️ 10分コインTA'; $('slotResult').textContent='TAスタート！'; refresh(); showView('slotView'); updateTA();
    if(duration) activeTA.interval=setInterval(()=>{if(!activeTA)return;const run=activeTA;const left=Math.max(0,run.duration-(performance.now()-run.start));updateTA();if(!left)finishTA(true);},100);
    activeTA.display=setInterval(updateTA,100);
  }
  function updateTA() {
    if(!activeTA)return; $('taCoins').textContent=fmt(activeTA.coins); $('taFree').textContent=activeTA.free;
    if(activeTA.duration){const left=Math.max(0,activeTA.duration-(performance.now()-activeTA.start));$('taClock').textContent=`${String(Math.floor(left/60000)).padStart(2,'0')}:${String(Math.floor(left%60000/1000)).padStart(2,'0')}`;$('taProgress').style.width=`${left/activeTA.duration*100}%`;}
    else{$('taClock').textContent=`${((performance.now()-activeTA.start)/1000).toFixed(1)}秒`;$('taProgress').style.width=`${Math.min(100,activeTA.coins/10000*100)}%`;}
  }
  function finishTA(success=false) {
    if(!activeTA)return; const run=activeTA; clearInterval(run.interval);clearInterval(run.display);const elapsed=(performance.now()-run.start)/1000;activeTA=null;
    if(run.type==='10k'&&success){data.tCoins+=1;data.best10k=data.best10k===null?elapsed:Math.min(data.best10k,elapsed);unlock('ta10000');$('record10k').textContent=`ベスト記録：${data.best10k.toFixed(2)}秒`;}
    else if(run.type==='10min'&&success){data.tCoins+=1;data.best10min=Math.max(data.best10min,run.coins);$('record10min').textContent=`最高スコア：${fmt(data.best10min)}コイン`;unlock('taTen');}
    else if(run.type==='5min'&&success){data.tCoins+=0.5;data.best5min=Math.max(data.best5min,run.coins);$('record5min').textContent=`最高スコア：${fmt(data.best5min)}コイン`;unlock('taFive');}
    if(success)unlock('taComplete');
    refresh();
    const rewardMessage = run.type === '10k'
      ? `🏆 1万コイン達成！ ${elapsed.toFixed(2)}秒 · +1 Tコイン`
      : `TA完走！ ${fmt(run.coins)}コイン · +${run.type === '5min' ? '0.5' : '1'} Tコイン`;
    notice(success ? rewardMessage : `TA終了。完走報酬はありません（${fmt(run.coins)}コイン）`);
    $('taName').textContent=success?'TA完走！':'TA終了';
  }
  $('start10k').addEventListener('click',()=>startTA('10k')); $('start10min').addEventListener('click',()=>startTA('10min')); $('start5min').addEventListener('click',()=>startTA('5min')); $('taEnd').addEventListener('click',()=>{if(confirm('タイムアタックを終了しますか？'))finishTA(false);});

  function entryFee() { return hasPair('saving', 'savingPlus')?4:has('savingPlus')?5:has('saving')?8:10; }
  function rewardMini(amount, run=activeTA) { const multiplier=hasPair('miniBonus','miniBonusPlus')?2.25:has('miniBonusPlus')?2:has('miniBonus')?1.5:1;amount=Math.floor(amount*multiplier);data.stats.miniWins++;if(data.stats.miniWins>=10)unlock('miniTen');if(run){if(activeTA!==run)return;run.coins+=amount;refresh();return;}data.miniCoins+=amount;data.miniBest=Math.max(data.miniBest,data.miniCoins);data.coins+=amount;data.best=Math.max(data.best,data.coins);if(data.best>=10000)unlock('rich');refresh(); }
  function showView(id) { document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===id));window.scrollTo({top:0,behavior:'smooth'}); }
  document.querySelector('.nav').addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)showView(b.dataset.view);});
  document.querySelector('.game-tabs').addEventListener('click',e=>{const b=e.target.closest('[data-game]');if(!b)return;document.querySelectorAll('.game-tabs button').forEach(x=>x.classList.toggle('active',x===b));for(const id of ['timing','highlow','memory'])$(`${id}Game`).classList.toggle('hidden',id!==b.dataset.game);});

  function timingFreeReady(){return data.timingDate!==nowDay()||data.timingFree;}
  function startTiming() {
    if(data.pendingDoubleUp>0||stopChallenge||spinLock){notice('現在のスロットを終えてから挑戦してください');return;}
    const free=timingFreeReady(); const fee=free?0:entryFee(); if(!free&&!spend(fee,activeTA?'ta':'normal')){notice('コインが足りません');return;}
    if(free){data.timingDate=nowDay();data.timingFree=false;save();} $('timingStartArea').classList.add('hidden');$('timingResult').textContent='';$('timingPlayArea').classList.remove('hidden');
    timingPos=0;timingDir=1;timingRun=activeTA;const track=document.querySelector('.timing-track');const focusPlus=has('focusPlus');track.classList.toggle('focus',has('focus')&&!focusPlus);track.classList.toggle('focus-plus',focusPlus&&!hasPair('focus','focusPlus'));track.classList.toggle('focus-plus-pair',hasPair('focus','focusPlus'));const cursor=track.querySelector('i');timingTimer=setInterval(()=>{timingPos+=timingDir*2.15;if(timingPos>99){timingPos=99;timingDir=-1}if(timingPos<0){timingPos=0;timingDir=1}cursor.style.left=`${timingPos}%`;},16);
  }
  function stopTiming(){if(!timingTimer)return;clearInterval(timingTimer);timingTimer=null;$('timingPlayArea').classList.add('hidden');$('timingStartArea').classList.remove('hidden');const d=Math.abs(timingPos-50),focusPair=hasPair('focus','focusPlus'),focusPlus=has('focusPlus'),focus=has('focus')||focusPlus;const perfect=focusPair?14:focusPlus?12:focus?9:6,great=focusPair?32:focusPlus?30:focus?25:20,good=focusPair?47:focusPlus?45:focus?40:35;const grade=d<=perfect?'PERFECT':d<=great?'GREAT':d<=good?'GOOD':'MISS';const baseReward=grade==='PERFECT'?100:grade==='GREAT'?70:grade==='GOOD'?40:0;const timingMultiplier=hasPair('timingBonus','timingBonusPlus')?2.25:has('timingBonusPlus')?2:has('timingBonus')?1.5:1;const reward=Math.floor(baseReward*timingMultiplier);$('timingResult').textContent=reward?`${grade}！ +${reward}コイン`:'MISS！ 報酬なし';if(reward)rewardMini(reward,timingRun);timingRun=null;$('timingCost').textContent=timingFreeReady()?'今日の無料プレイ':'参加料 '+entryFee()+' コイン';}
  $('timingStart').addEventListener('click',startTiming);$('timingStop').addEventListener('click',stopTiming);

  function cardName(n){return n===1?'A':n===11?'J':n===12?'Q':n===13?'K':String(n)}
  $('hlBegin').addEventListener('click',()=>{if(data.pendingDoubleUp>0||stopChallenge||spinLock){notice('現在のスロットを終えてから挑戦してください');return;}if(!spend(entryFee(),activeTA?'ta':'normal')){notice('コインが足りません');return;}hl={card:1+Math.floor(Math.random()*13),pot:20,steps:0,run:activeTA};$('hlStart').classList.add('hidden');$('hlPlay').classList.remove('hidden');$('hlResult').textContent='';$('card').textContent=cardName(hl.card);$('pot').textContent=hl.pot;});
  function guessHighLow(choice){if(!hl)return;const next=1+Math.floor(Math.random()*13);const ok=next===hl.card||(choice==='high'?next>hl.card:next<hl.card);$('card').textContent=cardName(next);if(ok){hl.steps++;hl.pot+=hasPair('highlow','highlowPlus')?70:has('highlowPlus')?60:has('highlow')?40:20;hl.card=next;$('pot').textContent=fmt(hl.pot);$('hlResult').textContent='正解！ もう一度予想するか、賞金を受け取ろう。';unlock('highLowWin');}else{hl=null;$('hlPlay').classList.add('hidden');$('hlStart').classList.remove('hidden');$('hlResult').textContent=`残念！ カードは${cardName(next)}。`;}}
  $('low').addEventListener('click',()=>guessHighLow('low'));$('high').addEventListener('click',()=>guessHighLow('high'));$('cashOut').addEventListener('click',()=>{if(!hl)return;const reward=hl.pot,run=hl.run;hl=null;$('hlPlay').classList.add('hidden');$('hlStart').classList.remove('hidden');$('hlResult').textContent=`+${fmt(reward)}コイン獲得！`;rewardMini(reward,run);});

  const memoryRewards={3:30,4:50,5:70,6:100,7:150,8:200};
  function startMemory(digits){if(data.pendingDoubleUp>0||stopChallenge||spinLock){notice('現在のスロットを終えてから挑戦してください');return;}if(!spend(entryFee(),activeTA?'ta':'normal')){notice('コインが足りません');return;}memoryRun=activeTA;memoryAnswer=Array.from({length:digits},()=>Math.floor(Math.random()*10)).join('');memoryEntry='';$('memoryStart').classList.add('hidden');$('memoryResult').textContent='';$('memoryShow').classList.remove('hidden');$('memoryNumber').textContent=memoryAnswer;setTimeout(()=>{if(!$('memoryShow').classList.contains('hidden')){$('memoryShow').classList.add('hidden');$('memoryInputArea').classList.remove('hidden');$('memoryInput').textContent='_';}},hasPair('memory','memoryPlus')?7000:has('memoryPlus')?6000:has('memory')?4000:2600);}
  $('memoryStart').addEventListener('click',e=>{const b=e.target.closest('[data-digits]');if(b)startMemory(Number(b.dataset.digits));});
  $('keypad').addEventListener('click',e=>{const b=e.target.closest('[data-key]');if(!b)return;const key=b.dataset.key;if(key==='clear'){memoryEntry='';$('memoryInput').textContent='_';return;}if(key==='enter'){if(memoryEntry.length!==memoryAnswer.length){$('memoryPrompt').textContent='桁数が足りません';return;}const ok=memoryAnswer===memoryEntry;const reward=ok?memoryRewards[memoryAnswer.length]:0;$('memoryInputArea').classList.add('hidden');$('memoryStart').classList.remove('hidden');$('memoryResult').textContent=ok?`正解！ +${reward}コイン`:`不正解。正解は ${memoryAnswer}`;if(ok){rewardMini(reward,memoryRun);unlock('memoryWin');}memoryAnswer='';memoryRun=null;return;}if(memoryEntry.length<memoryAnswer.length){memoryEntry+=key;$('memoryInput').textContent=memoryEntry;}});

  function renderBuffs(){
    $('equipCount').textContent=data.equipped.length;$('equipSlots').textContent=data.slotCount;
    if(data.owned.length>=12)unlock('buffTwelve');
    if(data.equipped.length>=5)unlock('fullLoadout');
    if(data.equipped.some(id=>id.endsWith('Plus')))unlock('buffMaster');
    const card=(buff,equipped=false)=>`<div class="buff-item ${equipped?'buff-equipped':''}"><div class="buff-head"><span class="buff-icon">${buff.icon}</span><span class="buff-text"><strong>${buff.name} ${equipped?'· 装備中':''}</strong><small>${buff.desc}　${buff.group}</small></span><span class="buff-actions">${equipped?`<button class="secondary" data-unequip="${buff.id}">外す</button>`:data.owned.includes(buff.id)?data.equipped.includes(buff.id)?`<button class="secondary" disabled>装備中</button>`:`<button class="secondary" data-equip="${buff.id}" ${data.equipped.length>=data.slotCount?'disabled':''}>装備</button>`:`<button class="secondary" data-buy="${buff.id}">${buff.price}🪙</button>`}</span></div></div>`;
    $('equipped').innerHTML=data.equipped.map(id=>buffs.find(b=>b.id===id)).filter(Boolean).map(b=>card(b,true)).join('')||'<p class="muted">まだバフを装備していません。</p>';
    $('buffList').innerHTML=buffs.map(b=>card(b,false)).join('');
    $('buffList').querySelectorAll('[data-buy]').forEach(btn=>btn.addEventListener('click',()=>{const b=buffs.find(x=>x.id===btn.dataset.buy);if(!spend(b.price)){notice('コインが足りません');return;}data.owned.push(b.id);if(data.owned.length>=3)unlock('collector');if(data.owned.length>=12)unlock('buffTwelve');renderBuffs();refresh();}));
    document.querySelectorAll('[data-equip]').forEach(btn=>btn.addEventListener('click',()=>{const id=btn.dataset.equip;if(data.equipped.includes(id)){notice('同じバフは1つだけ装備できます');return;}if(data.equipped.length>=data.slotCount){notice('装備枠がいっぱいです');return;}data.equipped.push(id);if(id.endsWith('Plus'))unlock('buffMaster');if(data.equipped.length>=5)unlock('fullLoadout');renderBuffs();refresh();}));
    document.querySelectorAll('[data-unequip]').forEach(btn=>btn.addEventListener('click',()=>{data.equipped=data.equipped.filter(id=>id!==btn.dataset.unequip);renderBuffs();refresh();}));
  }
  $('expandSlots').addEventListener('click',()=>{const cost=slotExpandCost();if(data.tCoins<cost){notice(`装備枠の拡張にはTコインが${cost}枚必要です`);return;}data.tCoins-=cost;data.slotCount++;unlock('buffExpansion');notice(`装備枠が${data.slotCount}枠になりました`);renderBuffs();refresh();});

  function renderAchievements(){$('achievementCount').textContent=data.achievements.length;$('achievementTotal').textContent=achievements.length;$('achievementList').innerHTML=achievements.map(([id,icon,name,desc])=>{const done=data.achievements.includes(id);return `<div class="achievement ${done?'':'locked'}"><span>${done?icon:'🔒'}</span><div><strong>${done?name:'？？？'}</strong><small>${done?desc:'条件を達成すると解放されます。'}</small></div></div>`;}).join('');}
  function doLogin(){const today=nowDay();if(data.lastLogin===today)return;const d=new Date();d.setDate(d.getDate()-1);const y=`${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;data.streak=data.lastLogin===y?(data.streak%7)+1:1;data.lastLogin=today;const coin=[50,50,100,100,0,200,0][data.streak-1];data.coins+=coin;data.best=Math.max(data.best,data.coins);$('loginMessage').textContent=`${data.streak}日目：${coin?`+${coin}コイン`:''}`;}
  function renderLogin(){$('streak').textContent=data.streak||1;$('loginGrid').innerHTML=Array.from({length:7},(_,i)=>`<div class="login-day ${i+1===data.streak?'today':''} ${i+1<data.streak?'claimed':''}">DAY ${i+1}<b>${[50,50,100,100,'—',200,'—'][i]}</b></div>`).join('');if(data.lastLogin===nowDay())$('loginMessage').textContent=`${data.streak}日目のボーナスを受け取りました。`;}
  $('reset').addEventListener('click',()=>{if(!confirm('セーブデータをすべて削除しますか？'))return;localStorage.removeItem('kyslot.save.v2');location.reload();});

  function init(){doLogin();renderBuffs();renderAchievements();renderLogin();$('record10k').textContent=data.best10k===null?'ベスト記録：未達成':`ベスト記録：${data.best10k.toFixed(2)}秒`;$('record10min').textContent=`最高スコア：${fmt(data.best10min)}コイン`;$('record5min').textContent=`最高スコア：${fmt(data.best5min)}コイン`;$('timingCost').textContent=timingFreeReady()?'今日の無料プレイ':'参加料 '+entryFee()+' コイン';refresh();}
  init();
  if ('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
})();
