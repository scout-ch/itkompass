(function () {
  const canvas = document.getElementById('gameCanvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = document.getElementById('score');
  const gameOverEl = document.getElementById('gameOver');
  const coinEl = document.getElementById('coin');
  const modal = document.getElementById('gameOverModal');
  const modalMessageEl = document.getElementById('modalMessage');
  const modalRestartBtn = document.getElementById('modalRestart');
  const jumpBtn = document.getElementById('jumpBtn');
  const restartBtn = document.getElementById('restartBtn');

  const banner = document.getElementById('topBanner');
  const closeBtn = document.getElementById('closeBannerBtn');
  if (!banner || !closeBtn) return;

  closeBtn.addEventListener('click', () => {
    banner.style.display = 'none';
    sessionStorage.setItem('dv_banner_hidden', '1');
    document.getElementById('gameContainer').style.marginTop = '0';
  });

  // coin modal elements
  const coinModal = document.getElementById('coinModal');
  const coinModalClose = document.getElementById('coinModalClose');
  const coinModalMessage = document.getElementById('coinModalMessage');

  // form action moved to JS variable
  const formActionUrl = 'https://docs.google.com/forms/d/1BtFXUZWaCbjnQQP3iEjlUMzIoIhzUjgrOU0LUFQACxE/formResponse';
  const myForm = document.getElementById('my-form');
  if (myForm) myForm.action = formActionUrl;

  // session storage keys
  const scoreKey = 'dvgame_score';
  const coinKey = 'dvgame_coin_found';

  // restore coin state from sessionStorage (if any)
  let coinFound = sessionStorage.getItem(coinKey) === '1';
  if (coinFound) {
    coinEl.textContent = 'COIN FOUND! => you will receive a prize!';
  }

  // helper to persist score
  function persistScore() {
    sessionStorage.setItem(scoreKey, String(score));
  }

  // helper to persist coin found flag
  function persistCoinFound() {
    sessionStorage.setItem(coinKey, coinFound ? '1' : '0');
  }

  function showCoinModal(customMessage) {
    if (customMessage) coinModalMessage.textContent = customMessage;
    if (coinModal) {
      // pause and show
      wasRunningBeforeCoinModal = !!gameRunning;
      gameRunning = false;
      coinModal.style.display = 'flex';
    }
  }

  // close coin modal behavior
  if (coinModalClose) {
    coinModalClose.addEventListener('click', (e) => {
      e.preventDefault();
      if (coinModal) coinModal.style.display = 'none';
      if (wasRunningBeforeCoinModal) {
        wasRunningBeforeCoinModal = false;
        resumeGame();
      }
    });
  }

  // Spiel Variablen
  let score = 0;
  let gameRunning = false;
  let gameSpeed = 5;
  let frameCount = 0;
  let bla = false;

  // remember if the game was running before showing the coin modal
  let wasRunningBeforeCoinModal = false;

  // resume game without resetting score/objects
  function resumeGame() {
    if (!gameRunning) {
      gameRunning = true;
      gameLoop();
    }
  }

  // rotating game over messages (4 messages)
  const gameOverMessages = [
    "Danke für deinen Einsatz in der ITKom!",
    "Frohe Weihnachten und einen guten Rutsch ins neue Jahr!",
    "Danke das du Teil der grossartigen ITKom bist!",
  ];
  const msgIndexKey = 'dvgame_gameover_msg_index';
  function nextGameOverMessage() {
    const raw = sessionStorage.getItem(msgIndexKey);
    let idx = raw ? parseInt(raw, 10) : 0;
    const msg = gameOverMessages[idx % gameOverMessages.length];
    idx = (idx + 1) % gameOverMessages.length;
    sessionStorage.setItem(msgIndexKey, String(idx));
    return msg;
  }

  const clippy = {
    x: 50,
    y: 150,
    width: 40,
    height: 50,
    dy: 0,
    jumpPower: -12,
    gravity: 0.6,
    grounded: false,
    jumping: false
  };

  let obstacles = [];
  let snowflakes = [];
  const obstacleWidth = 30;
  const obstacleHeight = 50;
  const snowInterval = 4; // frames between new snow spawns
  const snowWind = 0.4; // max horizontal drift per frame

  // ground
  const groundY = 150;

  function startGame() {
    score = 0;
    gameSpeed = 5;
    obstacles = [];
    clippy.y = groundY;
    clippy.dy = 0;
    clippy.grounded = false;
    gameRunning = true;
    gameOverEl.style.display = 'none';
    // hide modal if visible and reset form state
    if (modal) {
      modal.style.display = 'none';
      const submitBtn = document.querySelector('#score-form input[type="submit"]');
      if (submitBtn) submitBtn.value = 'Submit Score';
      if (submitBtn) submitBtn.disabled = false;
      const nameField = document.getElementById('name-field');
      if (nameField) nameField.style.display = 'block';

    }
    // reset session stored current score and coin-on-this-run
    sessionStorage.setItem(scoreKey, '0');
   
    coinFound = false;
    persistCoinFound();
    const scoreInputOnStart = document.querySelector('#score-form input#score');
    if (scoreInputOnStart) scoreInputOnStart.value = '0';
    // hide any on-screen hints when playing
    if (jumpBtn) jumpBtn.style.opacity = '0.95';
    if (restartBtn) restartBtn.style.opacity = '0.95';
    frameCount = 0;
    gameLoop();
  }

  // show modal with rotating message
  function showGameOverModal() {
    const msg = nextGameOverMessage();
    modalMessageEl.textContent = msg;
    // set the score input in the form to the current score
    const scoreInput = document.querySelector('#score-form input#score');
    if (scoreInput) scoreInput.value = String(score);
    modal.style.display = 'flex';

    if (Math.random() < 0.5) {
      sessionStorage.setItem('dv_banner_hidden', '0');
      banner.style.display = 'flex';
    }
  }

  function drawClippy() {
    ctx.strokeStyle = '#521d3a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(clippy.x + 9.3, clippy.y + 31.2);
    ctx.bezierCurveTo(clippy.x + 9.3, clippy.y + 31.2, clippy.x + 9.3, clippy.y + 38.55, clippy.x + 9.3, clippy.y + 46.8);
    ctx.bezierCurveTo(clippy.x + 9.3, clippy.y + 55.05, clippy.x + 19.8, clippy.y + 55.2, clippy.x + 19.8, clippy.y + 46.8);
    ctx.bezierCurveTo(clippy.x + 19.8, clippy.y + 38.4, clippy.x + 19.8, clippy.y + 25.35, clippy.x + 19.8, clippy.y + 12);
    ctx.bezierCurveTo(clippy.x + 19.8, clippy.y + -1.35, clippy.x + 5.7, clippy.y + -2.85, clippy.x + 5.7, clippy.y + 12);
    ctx.bezierCurveTo(clippy.x + 5.7, clippy.y + 26.85, clippy.x + 5.7, clippy.y + 45.3, clippy.x + 5.7, clippy.y + 59.7);
    ctx.bezierCurveTo(clippy.x + 5.7, clippy.y + 74.1, clippy.x + 23.4, clippy.y + 74.4, clippy.x + 23.4, clippy.y + 59.7);
    ctx.bezierCurveTo(clippy.x + 23.4, clippy.y + 45, clippy.x + 23.4, clippy.y + 31.2, clippy.x + 23.4, clippy.y + 31.2);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.ellipse(clippy.x + 5, clippy.y + 14, 7, 4, -3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.3;
    ctx.ellipse(clippy.x + 5, clippy.y + 14, 7, 4, -3, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.ellipse(clippy.x + 5, clippy.y + 14, 2.5, 1.5, -3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 0.3;
    ctx.ellipse(clippy.x + 20, clippy.y + 18, 7, 4, -3, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.ellipse(clippy.x + 20, clippy.y + 18, 7, 4, -3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = 'black';
    ctx.ellipse(clippy.x + 20, clippy.y + 18, 2.5, 1.5, -3, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.moveTo(clippy.x, clippy.y + 2);
    ctx.lineTo(clippy.x + 14, clippy.y + 9);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;

    ctx.moveTo(clippy.x + 13, clippy.y + 5);
    ctx.lineTo(clippy.x + 28, clippy.y + 13);
    ctx.stroke();
  }

  // Hindernisse zeichnen
  function drawObstacles() {
    ctx.fillStyle = '#535353';
    obstacles.forEach(obs => {
      if (obs.type === 'coin') {
        drawCoin(obs);
      } else if (obs.type === 'tree') {
        // anchor tree to ground bottom (ground line is at groundY + clippy.height)
        const groundBottom = groundY + clippy.height;

        // scale tree relative to obstacle size
        const treeHeight = Math.max(80, obs.height * 1.6);
        const trunkW = Math.max(10, obs.width * 0.36);
        const trunkH = Math.max(12, treeHeight * 0.26);
        const trunkX = obs.x - trunkW / 2;
        const trunkY = groundBottom - trunkH; // trunk top so trunk bottom == groundBottom

        // draw trunk
        ctx.fillStyle = '#6b3f2f';
        ctx.fillRect(trunkX, trunkY, trunkW, trunkH);

        // foliage / tiers (smallest on top, largest at bottom)
        const foliageHeight = Math.max(48, treeHeight * 0.72);
        const apexY = trunkY - foliageHeight; // top of the tree
        const layers = 3;
        const baseWidth = Math.max(48, obs.width * 1.8);
        const layerH = foliageHeight / layers;
        const greens = ['#2d7c28', '#2d6f22', '#235a18'];

        for (let i = 0; i < layers; i++) {
          // compute layerIndex so 0 => top (smallest), layers-1 => bottom (largest)
          const layerIndex = layers - 1 - i;
          const w = baseWidth * (1 - (layerIndex * 0.18)); // smaller for higher layers
          const topY = apexY + i * layerH;
          ctx.fillStyle = greens[i % greens.length];
          ctx.beginPath();
          ctx.moveTo(obs.x, topY);
          ctx.lineTo(obs.x - w / 2, topY + layerH);
          ctx.lineTo(obs.x + w / 2, topY + layerH);
          ctx.closePath();
          ctx.fill();
        }

        // star on top
        const starR = Math.max(4, obs.width * 0.09);
        const starX = obs.x;
        const starY = apexY - starR;
        ctx.fillStyle = '#f6d55c';
        ctx.beginPath();
        ctx.arc(starX, starY, starR, 0, Math.PI * 2);
        ctx.fill();

        // ornaments: persistent offsets so they move with obs.x
        if (!obs.ornaments) {
          obs.ornaments = [];
          const ornamentCount = Math.max(4, Math.floor(obs.width / 8));
          const colors = ['#e63946', '#f77f00', '#ffb703', '#2a9d8f', '#7b2cbf'];
          for (let i = 0; i < ornamentCount; i++) {
            const layerIndex = Math.floor(Math.random() * layers);
            const layerTop = apexY + layerIndex * layerH;
            const layerWidth = baseWidth * (1 - layerIndex * 0.18);
            const dx = (Math.random() - 0.5) * layerWidth * 0.72;      // horizontal offset relative to obs.x
            const dy = (layerTop - apexY) + Math.random() * (layerH * 0.7); // vertical offset from apexY
            obs.ornaments.push({ dx, dy, color: colors[i % colors.length] });
          }
        }

        // draw ornaments (use offsets so they move with the tree)
        obs.ornaments.forEach(o => {
          const ox = obs.x + o.dx;
          const oy = apexY + o.dy;
          ctx.beginPath();
          ctx.fillStyle = o.color;
          ctx.arc(ox, oy, Math.max(3, obs.width * 0.06), 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = 'rgba(0,0,0,0.18)';
          ctx.lineWidth = 0.6;
          ctx.stroke();
        });
      } else if (obs.type === 'tent') {
        // Draw a gift box anchored to the ground (so it doesn't float)
        const groundBottom = groundY + clippy.height;

        const boxW = Math.max(36, obs.width * 1.4);
        const boxH = Math.max(30, obs.height * 0.8);
        const boxX = obs.x - boxW / 2;
        const boxY = groundBottom - boxH;

        // persistent per-obstacle colors
        if (!obs.giftColor) {
          const colors = ['#e63946', '#2a9d8f', '#f77f00', '#ffb703', '#7b2cbf'];
          obs.giftColor = colors[Math.floor(Math.random() * colors.length)];
          obs.ribbonColor = '#ffffff';
          obs.bowColor = '#ffffff';
        }

        // draw shadow under box
        ctx.fillStyle = 'rgba(0,0,0,0.12)';
        ctx.fillRect(boxX + 3, boxY + boxH, boxW - 6, 3);

        // box body
        ctx.fillStyle = obs.giftColor;
        ctx.fillRect(boxX, boxY, boxW, boxH);

        // subtle top rim
        ctx.fillStyle = 'rgba(0,0,0,0.06)';
        ctx.fillRect(boxX, boxY, boxW, Math.max(3, boxH * 0.08));

        // vertical ribbon (center)
        const ribbonW = Math.max(6, boxW * 0.12);
        ctx.fillStyle = obs.ribbonColor;
        ctx.fillRect(obs.x - ribbonW / 2, boxY, ribbonW, boxH);

        // horizontal ribbon
        const hrH = Math.max(5, boxH * 0.14);
        ctx.fillRect(boxX, boxY + boxH * 0.44, boxW, hrH);

        // bow (two loops)
        ctx.fillStyle = obs.bowColor;
        ctx.beginPath();
        ctx.moveTo(obs.x, boxY + boxH * 0.06);
        ctx.quadraticCurveTo(obs.x - boxW * 0.12, boxY + boxH * 0.18, obs.x, boxY + boxH * 0.28);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(obs.x, boxY + boxH * 0.06);
        ctx.quadraticCurveTo(obs.x + boxW * 0.12, boxY + boxH * 0.18, obs.x, boxY + boxH * 0.28);
        ctx.fill();

        // small tag
        ctx.fillStyle = 'rgba(255,255,255,0.92)';
        ctx.fillRect(boxX + boxW - 10, boxY + boxH * 0.12, 7, 10);

        // optional decoration: outline
        ctx.strokeStyle = 'rgba(0,0,0,0.08)';
        ctx.lineWidth = 1;
        ctx.strokeRect(boxX + 0.5, boxY + 0.5, boxW - 1, boxH - 1);
      } else {
        // Vogel
        ctx.fillRect(obs.x, obs.y, obs.width, 20);
        ctx.fillRect(obs.x + 5, obs.y - 5, obs.width + 10, 10);
      }
    });
  }

  // Boden zeichnen
  function drawGround() {
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, groundY + clippy.height);
    ctx.lineTo(canvas.width, groundY + clippy.height);
    ctx.stroke();
  }

  // Clippy Physik
  function updateClippy() {
    clippy.dy += clippy.gravity;
    clippy.y += clippy.dy;

    if (clippy.y >= groundY) {
      clippy.y = groundY;
      clippy.dy = 0;
      clippy.grounded = true;
      clippy.jumping = false;
    } else {
      clippy.grounded = false;
    }
  }

  function drawCoin(obs) {
    ctx.fillStyle = '#fad700';
    ctx.beginPath();
    ctx.arc(obs.x, obs.y, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎁', obs.x, obs.y);
    ctx.strokeStyle = '#daa520';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Snowflakes (background)
  function drawSnowflakes() {
    for (let s of snowflakes) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${s.opacity})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function updateSnowflakes() {
    // spawn a few small flakes over time
    if (frameCount % snowInterval === 0) {
      const spawnCount = 1 + Math.floor(Math.random() * 2);
      for (let i = 0; i < spawnCount; i++) {
        snowflakes.push({
          x: Math.random() * canvas.width,
          y: -8 - Math.random() * 20,
          r: 1 + Math.random() * 3,
          speedY: 0.4 + Math.random() * 1.2,
          drift: (Math.random() - 0.5) * snowWind,
          opacity: 0.6 + Math.random() * 0.4
        });
      }
    }

    // move flakes
    for (let f of snowflakes) {
      f.x += f.drift;
      f.y += f.speedY;
      // small horizontal sway
      f.drift += (Math.random() - 0.5) * 0.02;
    }

    // remove off-screen flakes
    snowflakes = snowflakes.filter(f => f.y < canvas.height + 20);
  }

  function updateObstacles() {
    // create new obstacles
    const obstacleInterval = 100;
    const drawNext = [frameCount % obstacleInterval === 90, frameCount % obstacleInterval === 50]
    const a = drawNext.some(Boolean) ? drawNext[Math.floor(Math.random() * drawNext.length)] : false;
    if (frameCount % obstacleInterval === 0 || a) {
      const type = Math.random() > 0.7 ? 'tent' : 'tree';
      obstacles.push({
        x: canvas.width,
        y: type === 'bird' ? groundY - 20 : groundY,
        width: obstacleWidth,
        height: type === 'bird' ? 20 : obstacleHeight,
        type: type
      });
    }

    // move obstacles
    obstacles.forEach(obs => {
      obs.x -= gameSpeed;
    });

    // remove off-screen obstacles
    obstacles = obstacles.filter(obs => obs.x > -obstacleWidth);
  }

  function checkCollision() {
    for (let obs of obstacles) {
      if (clippy.x < obs.x + obs.width &&
        clippy.x + clippy.width > obs.x &&
        clippy.y < obs.y + obs.height &&
        clippy.y + clippy.height > obs.y) {
        if (obs.type === 'coin') {
          coinEl.textContent = 'COIN FOUND!';
          obstacles = obstacles.filter(o => o !== obs);
          // mark coin found in session and persist current score
          coinFound = true;
          persistCoinFound();
          sessionStorage.setItem(scoreKey, String(score));
          // show coin modal to inform player where to claim prize
          showCoinModal('You found the gift-coin! 🎁\nYou will receive a prize for your effort!\n Send a Screenshot of this to Folletta.');
          continue;
        } else {
          return true;
        }
      }
    }
    return false;
  }

  function updateScore() {
    if (frameCount % 5 === 0) {
      score++;
      scoreEl.textContent = 'Score: ' + score;
      persistScore();

      // increase speed every 100 points
      if (score % 100 === 0) {
        gameSpeed += 0.5;
      }
    }
  }

  function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // background: falling snow
    drawSnowflakes();

    drawGround();
    drawClippy();
    drawObstacles();

    updateClippy();
    updateObstacles();
    updateSnowflakes();
    updateScore();

    if ((score > 250 && !bla && frameCount % 10 === 0 &&Math.random() < 0.5)) {
      bla = true;
      obstacles.push({
        x: canvas.width,
        y: groundY - 45,
        width: obstacleWidth,
        height: obstacleHeight,
        type: 'coin'
      });
    }

    if (checkCollision()) {
      gameRunning = false;
      bla = false;
      // show rotating modal message on loss
      gameOverEl.style.display = 'none';
      showGameOverModal();
      return;
    }

    frameCount++;
    requestAnimationFrame(gameLoop);
  }

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();

      // if modal is visible, hide and restart
      if (modal && modal.style.display === 'flex') {
        return;
      }

      if (!gameRunning) {
        startGame();
      } else if (clippy.grounded && !clippy.jumping) {
        clippy.dy = clippy.jumpPower;
        clippy.jumping = true;
      }
    } else if (e.code === 'Enter') {
      // Restart the game on Enter key, also hides modal if visible
      e.preventDefault();
      if (modal && modal.style.display === 'flex') {
        modal.style.display = 'none';
        startGame();
      } else {
        startGame();
      }
    }
  });

  // Touch
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    // if modal visible => hide and restart
    if (modal && modal.style.display === 'flex') {
      modal.style.display = 'none';
      startGame();
      return;
    }

    if (!gameRunning) {
      startGame();
    } else if (clippy.grounded && !clippy.jumping) {
      clippy.dy = clippy.jumpPower;
      clippy.jumping = true;
    }
  });

  // modal restart button
  if (modalRestartBtn) {
    modalRestartBtn.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
      startGame();
    });
  }

  // on-screen jump button (touch/click)
  if (jumpBtn) {
    const doJump = (ev) => {
      ev.preventDefault();
      if (gameRunning) {
        if (clippy.grounded && !clippy.jumping) {
          clippy.dy = clippy.jumpPower;
          clippy.jumping = true;
        }
      } else {
        startGame();
      }
    };
    jumpBtn.addEventListener('touchstart', doJump, { passive: false });
    jumpBtn.addEventListener('mousedown', doJump);
  }

  // on-screen restart button
  if (restartBtn) {
    restartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) modal.style.display = 'none';
      startGame();
    });
    restartBtn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (modal) modal.style.display = 'none';
      startGame();
    }, { passive: false });
  }

  // change submit button text to "Saved" on submit
  (function () {
    const scoreForm = document.getElementById('my-form');
    const submitBtn = document.querySelector('#score-form input[type="submit"]');
    if (scoreForm && submitBtn) {
      scoreForm.addEventListener('submit', function () {
        submitBtn.value = 'Saved';
        submitBtn.disabled = true;
        const nameField = document.getElementById('name-field');
        if (nameField) nameField.style.display = 'none';
      });
    }
  })();

  // ensure the form submit button and name field reset when modal closes
  function resetScoreForm() {
    const submitBtn = document.querySelector('#score-form input[type="submit"]');
    if (submitBtn) {
      submitBtn.value = 'Submit Score';
      submitBtn.disabled = false;
    }
    const nameField = document.getElementById('name-field');
    if (nameField) nameField.style.display = 'block';
  }

  // wire modal close to reset form (if modal has a close path elsewhere, call resetScoreForm)
  // already handled in startGame and modal interactions above

  // load game visuals
  drawGround();
  drawClippy();

})();