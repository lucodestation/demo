var gameMap = document.getElementsByClassName('game-map')[0];// 游戏地图盒子
	var gameGrid = document.getElementsByTagName('li');// 获取400个li
	var snakeArr = [];// 用于存储蛇身和蛇头，最后一个元素存蛇头
	var snakeBodyX = 0, snakeBodyY = 0, snakeHeadX = 0, snakeHeadY = 0, snakeFoodX = 0, snakeFoodY = 0;
	var timer = null, speed = 200;
	var currentArrow = 'right';// 当前移动方向
	var scoreEle = document.getElementsByClassName('score')[0].getElementsByTagName('span')[0];
	var score = 0;// 得分

	var keyArr = [];



	gameInit();
	function gameInit() {
		// 创建400个游戏格子，并为每个格子标上坐标
		createGameGrid();
		// 初始化蛇身蛇头
		createSnake();
		// 显示蛇身蛇头
		showSnake();
		// 创建食物
		createFood();

		// 显示一些游戏信息，方便调试
		// showSomeGameInfo();
	}
	timer = setInterval(autoMove, speed);
	function autoMove() {
		keyArr.pop();


		if (currentArrow === 'up') {
			snakeHeadX--;
		} else if (currentArrow === 'right') {
			snakeHeadY++;
		} else if (currentArrow === 'down') {
			snakeHeadX++;
		} else if (currentArrow === 'left') {
			snakeHeadY--;
		}

		if (snakeHeadX === -1 || snakeHeadY === 20 || snakeHeadX === 20 || snakeHeadY === -1) {
			// console.log('game over');
			gameEnd();
			return;
		}

		if (gameGrid[snakeHeadX * 20 + snakeHeadY].classList.contains('snake-body')) {
			// console.log('eat self, game over');
			gameEnd();
			return;
		}

		snakeArr.push(gameGrid[snakeHeadX * 20 + snakeHeadY]);
		if (snakeArr.length === 399) {
			// console.log('you win');
			gameEnd(true);
			return;
		}
		if (snakeHeadX === snakeFoodX && snakeHeadY === snakeFoodY) {
			// console.log('吃');
			score++;
			scoreEle.innerHTML = score;
			gameGrid[snakeFoodX * 20 + snakeFoodY].classList.remove('snake-food');
			createFood();
		} else {
			var deleted = snakeArr.shift();
			deleted.classList.remove('snake-body');
		}
		showSnake();
	}
	function gameEnd(info) {
		clearInterval(timer);
		var gameEndDiv = document.createElement('div');
		gameEndDiv.classList.add('game-end');
		if (info) {
			gameEndDiv.innerHTML = 'You win!';
		} else {
			gameEndDiv.innerHTML = 'Game over!';
		}
		gameMap.appendChild(gameEndDiv);
	}


	document.addEventListener('keydown', function (e) {

		if (e.keyCode === 38 || e.keyCode === 87) {// 上
			if (currentArrow === 'up') { return; }
			if (currentArrow === 'down') { return; }
			if (keyArr.indexOf('right') !== -1 || keyArr.indexOf('left') !== -1) { return; }
			if (keyArr.length < 3) {
				currentArrow = 'up';
				keyArr.push('up');
			}



		} else if (e.keyCode === 39 || e.keyCode === 68) {// 右
			if (currentArrow === 'right') { return; }
			if (currentArrow === 'left') { return; }
			if (keyArr.indexOf('up') !== -1 || keyArr.indexOf('down') !== -1) { return; }
			if (keyArr.length < 3) {
				currentArrow = 'right';
				keyArr.push('right');
			}


		} else if (e.keyCode === 40 || e.keyCode === 83) {// 下
			if (currentArrow === 'up') { return; }
			if (currentArrow === 'down') { return; }
			if (keyArr.indexOf('right') !== -1 || keyArr.indexOf('left') !== -1) { return; }
			if (keyArr.length < 3) {
				currentArrow = 'down';
				keyArr.push('down');
			}

		} else if (e.keyCode === 37 || e.keyCode === 65) {// 左
			if (currentArrow === 'right') { return; }
			if (currentArrow === 'left') { return; }
			if (keyArr.indexOf('up') !== -1 || keyArr.indexOf('down') !== -1) { return; }
			if (keyArr.length < 3) {
				currentArrow = 'left';
				keyArr.push('left');
			}
		}
	}, false);



	// 显示蛇身蛇头
	function showSnake() {
		var len = snakeArr.length;
		for (var i = 0; i < len; i++) {
			if (i === len -1) {
				snakeArr[i].classList.add('snake-head');// 蛇头
			} else {
				snakeArr[i].classList.add('snake-body');// 蛇身
				snakeArr[i].classList.remove('snake-head');
			}
		}
	}
	// 创建食物
	function createFood() {
		snakeFoodX = selectNumberFrom(0, 19), snakeFoodY = selectNumberFrom(0, 19);
		if (gameGrid[snakeFoodX * 20 + snakeFoodY].classList.contains('snake-body') || gameGrid[snakeFoodX * 20 + snakeFoodY].classList.contains('snake-head')) {
			// gameGrid[snakeFoodX * 20 + snakeFoodY].classList.contains('snake-body') && console.log('生在蛇身，重新生成');
			// gameGrid[snakeFoodX * 20 + snakeFoodY].classList.contains('snake-head') && console.log('生在蛇头，重新生成');
			createFood();
		} else {
			gameGrid[snakeFoodX * 20 + snakeFoodY].classList.add('snake-food');
		}
	}
	// 创建400个游戏格子，并为每个格子标上坐标
	function createGameGrid() {
		// 创建ul
		var ul = document.createElement('ul');
		for (var i = 0; i < 20; i++) {
			for (var j = 0; j < 20; j++) {
				// 创建li，并为其设置坐标
				var li = document.createElement('li');
				li.x = i;
				li.y = j;
				ul.appendChild(li);
			}
		}
		gameMap.appendChild(ul);
	}

	// 初始化蛇身蛇头
	function createSnake() {
		snakeHeadX = selectNumberFrom(2, 9), snakeHeadY = selectNumberFrom(2, 9);
		for (var i = snakeHeadY - 2; i <= snakeHeadY; i++) {
			snakeArr.push(gameGrid[snakeHeadX * 20 + i]);
		}
	}
	// 得到一个介于vloerValue和upperValue之间(包括vloerValue和upperValue)的一个随机整数
	function selectNumberFrom(lowerValue,upperValue) {
		var choices = upperValue - lowerValue + 1;
		return Math.floor(Math.random() * choices + lowerValue);
	}
	// 显示一些游戏信息，方便调试
	function showSomeGameInfo() {
		// (function () {
		// 	for (var i = 0; i < 400; i++) {
		// 		var x = gameGrid[i].x,
		// 			y = gameGrid[i].y;
		// 		gameGrid[i].innerHTML = x + ' ' + y + '<br>' + (x * 20 + y);
		// 	}
		// }());
	}