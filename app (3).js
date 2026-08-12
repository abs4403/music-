// ---- animated background scene markup, one per genre id ----
function sceneHTML(id) {
  switch (id) {
    case 'truck':
      return `
        <div class="truck-sun"></div>
        <div class="truck-pole" style="left:10%;"></div>
        <div class="truck-pole" style="left:45%;animation-delay:-1.3s;"></div>
        <div class="truck-pole" style="left:80%;animation-delay:-2.6s;"></div>
        <div class="truck-road"></div>
        <div class="truck-rig">
          <div class="truck-cab"></div>
          <div class="truck-trailer"></div>
          <div class="truck-wheel spin w1"></div>
          <div class="truck-wheel spin w2"></div>
          <div class="truck-wheel spin w3"></div>
        </div>`;
    case 'saloon':
      return `
        <div class="barber-pole"></div>
        <div class="saloon-scene-figs">
          <div class="barber-chair"></div>
          <div class="barber-customer"></div>
          <div class="barber-figure"></div>
          <div class="barber-arm"></div>
        </div>
        <div class="saloon-patron p1"></div>
        <div class="saloon-patron p2" style="left:220px;"></div>`;
    case 'gym':
      return `
        <div class="gym-lifter">
          <div class="bar"><div class="plate left"></div><div class="plate right"></div></div>
          <div class="torso"></div>
          <div class="head"></div>
        </div>
        <div class="gym-runner">
          <div class="leg back"></div>
          <div class="leg"></div>
          <div class="torso"></div>
          <div class="head"></div>
        </div>
        <div class="gym-treadmill"></div>`;
    case 'romantic':
      return `
        <div class="rom-glow"></div>
        <div class="rom-couple">
          <div class="rom-person a"></div>
          <div class="rom-person b"></div>
        </div>`;
    case 'party':
      return `
        <div class="disco-ball"></div>
        <div class="beam"></div>
        <div class="beam b2"></div>
        <div class="beam b3"></div>
        <div class="party-dancers">
          <div class="p-dancer"></div><div class="p-dancer"></div><div class="p-dancer"></div>
          <div class="p-dancer"></div><div class="p-dancer"></div>
        </div>`;
    case 'dihadi':
      return `
        <div class="dihadi-sun"></div>
        <div class="dihadi-bricks"></div>
        <div class="dihadi-worker w1"><div class="hat"></div><div class="head"></div><div class="torso"></div><div class="tool"></div></div>
        <div class="dihadi-worker w2"><div class="hat"></div><div class="head"></div><div class="torso"></div><div class="tool"></div></div>
        <div class="dihadi-dust" style="left:30%;animation-delay:0s;"></div>
        <div class="dihadi-dust" style="left:55%;animation-delay:1.3s;"></div>
        <div class="dihadi-dust" style="left:70%;animation-delay:2.6s;"></div>`;
    default:
      return '';
  }
}

const nav = document.getElementById('nav');
const pagesEl = document.getElementById('pages');

GENRES.forEach((g, i) => {
  const btn = document.createElement('button');
  btn.textContent = g.label;
  btn.dataset.id = g.id;
  if (i === 0) btn.classList.add('active');
  btn.onclick = () => showPage(g.id);
  nav.appendChild(btn);

  const page = document.createElement('section');
  page.className = 'tape-page' + (i === 0 ? ' active' : '');
  page.id = g.id;
  page.innerHTML = `
    <div class="scene">${sceneHTML(g.id)}</div>
    <div class="content">
      <div class="eyebrow">${g.eyebrow}</div>
      <h2 class="big">${g.title}</h2>
      <div class="hindi-line">${g.hindi}</div>
      <div class="cassette">
        <div class="reel" data-reel></div>
        <div class="window"></div>
        <div class="reel" data-reel></div>
      </div>
      <div class="controls">
        <button class="skipbtn" data-prev title="Previous song">⏮</button>
        <button class="playbtn" data-play>▶</button>
        <button class="skipbtn" data-next title="Next song">⏭</button>
        <div class="progress-wrap">
          <div class="progress-bar"><div class="progress-fill" data-fill></div></div>
          <div class="time" data-time>0:00 / 0:00</div>
        </div>
      </div>
      <div class="now-playing" data-now-playing></div>
      ${g.hasHorn && g.id !== 'truck' ? `<button class="horn-btn" data-horn>${g.hornLabel}</button>
      ${g.id === 'saloon' ? '<div class="toast" data-toast>Bhaiya, number aagya! 💈</div>' : ''}` : ''}
      <div class="yt-hidden" id="player-${g.id}"></div>
    </div>
    ${g.id === 'truck' ? `<button class="horn-fixed" data-horn title="Press horn">🔊<span>HORN</span></button>` : ''}
  `;
  pagesEl.appendChild(page);
});

// live visit counter — no signup, free counter via countapi.xyz
const counterEl = document.getElementById('visit-counter');
if (counterEl) {
  fetch('https://api.countapi.xyz/hit/raasta-abs4403-music/visits')
    .then(r => r.json())
    .then(data => {
      counterEl.textContent = '🔥 ' + data.value.toLocaleString() + ' plays so far';
    })
    .catch(() => { counterEl.textContent = ''; });
}

// floating hearts for the romantic scene
const romanticScene = document.querySelector('#romantic .scene');
if (romanticScene) {
  for (let i = 0; i < 14; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.textContent = '♥';
    h.style.left = (Math.random() * 90 + 2) + '%';
    h.style.animationDuration = (6 + Math.random() * 6) + 's';
    h.style.animationDelay = (Math.random() * 6) + 's';
    h.style.fontSize = (14 + Math.random() * 16) + 'px';
    romanticScene.appendChild(h);
  }
}

function showPage(id) {
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('active', b.dataset.id === id));
  document.querySelectorAll('.tape-page').forEach(p => p.classList.toggle('active', p.id === id));
}

// synthesized Indian truck-style multi-tone air horn — no copyrighted audio file
function playHorn() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const blastStarts = [0, 0.55]; // two blasts, like a real air horn "peep-peep"
  blastStarts.forEach(offset => {
    const now = ctx.currentTime + offset;
    // layered chord for a fuller, more "musical" truck-horn tone
    [220, 277, 330].forEach((freq, i) => {
      const osc = ctx.createOscillator(), gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.linearRampToValueAtTime(freq * 1.02, now + 0.4); // slight pitch bend = realism
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.22 / (i + 1), now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.48);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    });
  });
}

document.querySelectorAll('[data-horn]').forEach(btn => {
  btn.addEventListener('click', () => {
    playHorn();
    btn.classList.add('pulse');
    setTimeout(() => btn.classList.remove('pulse'), 400);
    const toast = btn.parentElement.querySelector('[data-toast]');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 1800);
    }
  });
});

function fmt(s) {
  if (!isFinite(s)) return '0:00';
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
}

const players = {};

function onYouTubeIframeAPIReady() {
  GENRES.forEach(g => {
    const opts = { height: '1', width: '1', events: { onReady: () => {}, onStateChange: e => handleState(g.id, e) } };
    if (g.videoIds && g.videoIds.length) {
      opts.videoId = g.videoIds[0];
      opts.playerVars = { playlist: g.videoIds.slice(1).join(',') };
    } else {
      opts.playerVars = { listType: 'playlist', list: g.playlistId };
    }
    players[g.id] = new YT.Player('player-' + g.id, opts);
  });
}

function handleState(id, e) {
  const page = document.getElementById(id);
  const reels = page.querySelectorAll('[data-reel]');
  const playBtn = page.querySelector('[data-play]');
  const nowPlaying = page.querySelector('[data-now-playing]');
  if (e.data === YT.PlayerState.PLAYING) {
    reels.forEach(r => r.classList.add('spin'));
    playBtn.textContent = '⏸';
    startProgress(id);
    const g = GENRES.find(x => x.id === id);
    if (g && g.videoIds && g.videoIds.length && nowPlaying) {
      const vid = players[id].getVideoData().video_id;
      const idx = g.videoIds.indexOf(vid);
      nowPlaying.textContent = idx > -1 ? g.songTitles[idx] : '';
    }
  } else {
    reels.forEach(r => r.classList.remove('spin'));
    playBtn.textContent = '▶';
  }
}

const timers = {};

function startProgress(id) {
  clearInterval(timers[id]);
  timers[id] = setInterval(() => {
    const p = players[id];
    if (!p || !p.getCurrentTime) return;
    const cur = p.getCurrentTime(), dur = p.getDuration();
    const page = document.getElementById(id);
    page.querySelector('[data-fill]').style.width = dur ? (cur / dur * 100) + '%' : '0%';
    page.querySelector('[data-time]').textContent = fmt(cur) + ' / ' + fmt(dur);
  }, 500);
}

document.querySelectorAll('[data-play]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.closest('.tape-page').id;
    const p = players[id];
    if (!p || !p.getPlayerState) return;
    if (p.getPlayerState() === YT.PlayerState.PLAYING) p.pauseVideo();
    else p.playVideo();
  });
});

document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.closest('.tape-page').id;
    const p = players[id];
    if (p && p.nextVideo) p.nextVideo();
  });
});

document.querySelectorAll('[data-prev]').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.closest('.tape-page').id;
    const p = players[id];
    if (p && p.previousVideo) p.previousVideo();
  });
});
