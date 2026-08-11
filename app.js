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
    <div class="eyebrow">${g.eyebrow}</div>
    <h2 class="big">${g.title}</h2>
    <div class="hindi-line">${g.hindi}</div>
    <div class="cassette">
      <div class="reel" data-reel></div>
      <div class="window"></div>
      <div class="reel" data-reel></div>
    </div>
    <div class="controls">
      <button class="playbtn" data-play>▶</button>
      <div class="progress-wrap">
        <div class="progress-bar"><div class="progress-fill" data-fill></div></div>
        <div class="time" data-time>0:00 / 0:00</div>
      </div>
    </div>
    <div class="now-playing" data-now-playing></div>
    ${g.hasHorn ? `<button class="horn-btn" data-horn>${g.hornLabel}</button>
    ${g.id === 'saloon' ? '<div class="toast" data-toast>Bhaiya, number aagya! 💈</div>' : ''}` : ''}
    <div class="yt-hidden" id="player-${g.id}"></div>
  `;
  pagesEl.appendChild(page);
});

function showPage(id) {
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('active', b.dataset.id === id));
  document.querySelectorAll('.tape-page').forEach(p => p.classList.toggle('active', p.id === id));
}

// synthesized horn — no copyrighted audio file needed
function playHorn() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const now = ctx.currentTime;
  [300, 380].forEach(freq => {
    const osc = ctx.createOscillator(), gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.9);
  });
}

document.querySelectorAll('[data-horn]').forEach(btn => {
  btn.addEventListener('click', () => {
    playHorn();
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
