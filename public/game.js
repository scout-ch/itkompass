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
    coinEl.textContent = 'COIN FOUND!';
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
    "Nicht aufgeben — versuch’s nochmal!",
    "Bonne tentative — recommence pour battre ton score!",
    "Keep going — the next run could be your best!",
    "Courage — tu y es presque, réessaie !"
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
  let clouds = [];
  const obstacleWidth = 30;
  const obstacleHeight = 50;
  const cloudInterval = 150; // frames between cloud spawns
  const cloudSpeedFactor = 0.45; // clouds move slower than obstacles

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
        ctx.fillStyle = '#4e342e';
        ctx.fillRect(obs.x - obs.width * 0.15, obs.y + 10, obs.width * 0.3, obs.height);

        // Foliage
        ctx.fillStyle = '#2d5016';
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y - obs.width * 0.3);
        ctx.lineTo(obs.x - obs.width * 0.5, obs.y + obs.height * 0.6);
        ctx.lineTo(obs.x + obs.width * 0.5, obs.y + obs.height * 0.6);
        ctx.closePath();
        ctx.fill();
      } else if (obs.type === 'tent') {
        ctx.beginPath();
        ctx.moveTo(obs.x, obs.y);
        ctx.lineTo(obs.x - obs.width * 0.8, obs.y + obs.height);
        ctx.lineTo(obs.x + obs.width * 0.8, obs.y + obs.height);
        ctx.lineTo(obs.x, obs.y);
        ctx.fillStyle = "brown";
        ctx.fill();

        ctx.beginPath();
        ctx.strokeStyle = 'black'
        ctx.moveTo(obs.x, obs.y + 4);
        ctx.lineTo(obs.x, obs.y + obs.height);
        ctx.lineWidth = 1;
        ctx.stroke()

      } else {
        // Vogel
        ctx.fillRect(obs.x, obs.y, obs.width, 20);
        ctx.fillRect(obs.x + 5, obs.y - 5, obs.width + 10, 10);
      }
    });
  }

  // Boden zeichnen
  function drawGround() {
    ctx.strokeStyle = '#105407';
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
    ctx.fillText('⚜️', obs.x, obs.y);
    ctx.strokeStyle = '#daa520';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // Clouds
  function drawClouds() {
    clouds.forEach(cloud => {
      ctx.fillStyle = '#3a79e4';
      // left puff
      ctx.beginPath();
      ctx.arc(cloud.x - 30 * cloud.scale, cloud.y, 30 * cloud.scale, 0, Math.PI * 2);
      ctx.fill();
      // top/center puff
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y - 10 * cloud.scale, 35 * cloud.scale, 0, Math.PI * 2);
      ctx.fill();
      // right puff
      ctx.beginPath();
      ctx.arc(cloud.x + 30 * cloud.scale, cloud.y, 30 * cloud.scale, 0, Math.PI * 2);
      ctx.fill();
      // bottom puff
      ctx.beginPath();
      ctx.arc(cloud.x, cloud.y + 10 * cloud.scale, 25 * cloud.scale, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function updateClouds() {
    // spawn
    if (frameCount % cloudInterval === 0) {
      clouds.push({
        x: canvas.width + 80,
        y: 40 + Math.random() * 60, // sky position
        scale: 0.6 + Math.random() * 0.8
      });
    }

    // move
    clouds.forEach(c => {
      c.x -= gameSpeed * cloudSpeedFactor;
    });

    // remove off-screen
    clouds = clouds.filter(c => c.x > -200);
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
          showCoinModal('You found the coin! Get your prize at the ITKom Marktstand / Input Stands CoIT on Sunday.');
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

    // background
    drawClouds();

    drawGround();
    drawClippy();
    drawObstacles();

    updateClippy();
    updateObstacles();
    updateClouds();
    updateScore();

    if ((score > 250 && !bla && frameCount % 77 === 0 && Math.random() > 0.8 && Math.random() < 0.3 && new Date().getSeconds() > 30)) {
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