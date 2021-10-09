var gameMap = document.getElementsByClassName('game-map')[0];// 获取游戏地图
var gameGrid = document.getElementsByTagName('li');// 获取16个li格子
var isWin = false;// 判断是否赢得游戏
var isLose = false;// 判断游戏是否失败，无法移动
var keyArrow = null;// 记录按下的方向

var gameResult = document.getElementsByClassName('result')[0];

// 游戏初始化
gameInit();
function gameInit() {
	// 创建252个格子
	createGameGrid();
	// 随机初始化两个数字为2或4的格子
	selectGridPutNum();// 随机选择一个没有数字的格子并放入数字2或4
	selectGridPutNum();

	gameEnd();
}
// 取消游戏地图的默认的右键菜单
gameMap.addEventListener('contextmenu', function (eve) {
	eve.preventDefault();
}, false);
// 让游戏地图内的文本不可选中
gameMap.onselectstart = function (eve) {
	eve.preventDefault();
};

// 方向键或 wasd 按键控制移动方向
document.addEventListener('keydown', function (e) {
	var c = e.keyCode;
	if ([38, 87].indexOf(c) + 1) {// 上
		keyArrow = 'up';
		canMove(keyArrow) && run();
	} else if ([39, 68].indexOf(c) + 1) {// 右
		keyArrow = 'right';
		canMove(keyArrow) && run();
	} else if ([40, 83].indexOf(c) + 1) {// 下
		keyArrow = 'down';
		canMove(keyArrow) && run();
	} else if ([37, 65].indexOf(c) + 1) {// 左
		keyArrow = 'left';
		canMove(keyArrow) && run();
	}
	if ([38, 87, 39, 68, 40, 83, 37, 65].indexOf(c) + 1) {// 排除不是控制游戏的按键
		// 如果无法移动，游戏结束
		if (!isLose && !canMove('up') && !canMove('right') && !canMove('down') && !canMove('left')) {
			// console.log('game over');
			gameResult.innerHTML = 'Game Over!';
			isLose = true;
		}
	}
	function run() {
		arrowKeyDown(keyArrow);
		selectGridPutNum();
		gameEnd();
	}



}, false);



function canMove(arrow) {
	var re = 4;
	for (var i = 0; i < 4; i++) {
		var tempArr = [];
		for (var j = 0; j < 4; j++) {
			if (arrow === 'left' || arrow === 'right') {// 横向格子
				tempArr.push(gameGrid[i * 4 + j]);
			} else if (arrow === 'up' || arrow === 'down') {// 纵向格子
				tempArr.push(gameGrid[j * 4+ i]);
			}
		}
		var count = getRowOrColNumCount(tempArr);// 得到一行或一列中有数字的个数
		count === 0 && re--;
		count === 1 && !checkCanMove(tempArr, arrow, 1) && re--;
		count === 2 && !checkCanMove(tempArr, arrow, 2) && re--;
		count === 3 && !checkCanMove(tempArr, arrow, 3) && re--;
		count === 4 && !checkCanMove(tempArr, arrow, 4) && re--;
	}
	return re;
}


function checkCanMove(eleArr, arrow, n) {
	if (arrow === 'up' || arrow == 'left') {
		var a = 0;
	} else if (arrow === 'down' || arrow === 'right') {
		var a = 3;
	}
	var v = [];
	for (var i = 0; i < 4; i++) {
		v[i] = +eleArr[i].innerHTML;
	}

	if (n === 1) {// 只有一个数字
		if (!a) {// 向上或向左
			if (v[0]) {// 第一个元素有数字
				return false;
			}
		} else {// 向下或向右
			if (v[3]) {// 最后一个元素有数字
				return false;
			}
		}
	}
	if (n === 2) {// 有两个数字
		if (!a) {// 向上或向左
			if (v[0] && v[1] && v[0] !== v[1]) {// 前两个元素有数字 且这两个数字不相等
				return false;
			}
		} else {// 向下或向右
			if (v[3] && v[2] && v[3] !== v[2]) {// 后两个元素有数字 且这两个数字不相等
				return false;
			}
		}
	}
	if (n === 3) {// 有三个数字
		if (!a) {// 向上或向左
			if (v[0] && v[1] && v[2] && v[0] !== v[1] && v[1] !== v[2]) {// 前三个元素有数字 且 这三个数字 前两个不相等 且 后两个不相等
				return false;
			}
		} else {// 向下或向右
			if (v[3] && v[2] && v[1] && v[3] !== v[2] && v[2] !== v[1]) {// 后三个元素有数字 且 这三个数字 前两个不相等 且 后两个不相等
				return false;
			}
		}

	}
	if (n === 4) {// 有四个数字
		if (v[0] !== v[1] && v[1] !== v[2] && v[2] !== v[3]) {
			return false;
		}
	}
	return true;
}


// 按下方向键
function arrowKeyDown(arrow) {
	for (var i = 0; i < 4; i++) {
		var tempArr = [];
		for (var j = 0; j < 4; j++) {
			if (arrow === 'left' || arrow === 'right') {// 横向移动
				tempArr.push(gameGrid[i * 4 + j]);
			} else if (arrow === 'up' || arrow === 'down') {// 纵向移动
				tempArr.push(gameGrid[j * 4+ i]);
			}
		}
		var count = getRowOrColNumCount(tempArr);// 得到一行或一列中有数字的个数
		count === 1 && oneNumMove(tempArr, arrow);// 有一个数字时怎么移动
		count === 2 && twoNumMove(tempArr, arrow);
		count === 3 && threeNumMove(tempArr, arrow);
		count === 4 && fourNumMove(tempArr, arrow);
	}
}


function oneNumMove(eleArr, arrow) {
	// eleArr 始终存储的是4个li
	var num = 0;
	for (var i = 0; i < 4; i++) {
		if (eleArr[i].innerHTML !== '') {
			num = eleArr[i].innerHTML;
			eleArr[i].innerHTML = '';
		}
	}

	(arrow === 'up' || arrow === 'left') && (eleArr[0].innerHTML = num);
	(arrow === 'down' || arrow === 'right') && (eleArr[3].innerHTML = num);
}



function twoNumMove(eleArr, arrow) {
	var numArr = [];
	for (var i = 0; i < 4; i++) {
		if (eleArr[i].innerHTML !== '') {
			numArr.push(eleArr[i].innerHTML);
			eleArr[i].innerHTML = '';
		}
	}
	var isEqual = numArr[0] === numArr[1];
	if (isEqual) {
		var n = numArr[0] * 2;
		(arrow === 'up' || arrow === 'left') && (eleArr[0].innerHTML = n);
		(arrow === 'down' || arrow === 'right') && (eleArr[3].innerHTML = n);
	} else {
		var n0 = numArr[0],
			n1 = numArr[1];
		(arrow === 'up' || arrow === 'left') && (eleArr[0].innerHTML = n0, eleArr[1].innerHTML = n1);
		(arrow === 'down' || arrow === 'right') && (eleArr[3].innerHTML = n1, eleArr[2].innerHTML = n0);
	}
}


function threeNumMove(eleArr, arrow) {
	var numArr = [];
	for (var i = 0; i < 4; i++) {
		if (eleArr[i].innerHTML !== '') {
			numArr.push(eleArr[i].innerHTML);
			eleArr[i].innerHTML = '';
		}
	}
	if (numArr[0] === numArr[1] && numArr[1] !== numArr[2]) {// 1. 前两个相等 且 后两个不相等
		(arrow === 'up' || arrow === 'left') && (eleArr[0].innerHTML = numArr[0] * 2, eleArr[1].innerHTML = numArr[2]);
		(arrow === 'down' || arrow === 'right') && (eleArr[3].innerHTML = numArr[2], eleArr[2].innerHTML = numArr[0] * 2);
	} else if (numArr[0] !== numArr[1] && numArr[1] === numArr[2]) {// 2. 前两个不相等 且 后两个相等
		(arrow === 'up' || arrow === 'left') && (eleArr[0].innerHTML = numArr[0], eleArr[1].innerHTML = numArr[2] * 2);
		(arrow === 'down' || arrow === 'right') && (eleArr[3].innerHTML = numArr[2] * 2, eleArr[2].innerHTML = numArr[0]);
	} else if (numArr[0] === numArr[1] && numArr[1] === numArr[2]) {//3. 三个都相等
		(arrow === 'up' || arrow === 'left') && (eleArr[0].innerHTML = numArr[0] * 2, eleArr[1].innerHTML = numArr[2]);
		(arrow === 'down' || arrow === 'right') && (eleArr[3].innerHTML = numArr[2] * 2, eleArr[2].innerHTML = numArr[0]);
	} else {// 4. 三个不相等
		(arrow === 'up' || arrow === 'left') && (eleArr[0].innerHTML = numArr[0], eleArr[1].innerHTML = numArr[1], eleArr[2].innerHTML = numArr[2]);
		(arrow === 'down' || arrow === 'right') && (eleArr[3].innerHTML = numArr[2], eleArr[2].innerHTML = numArr[1], eleArr[1].innerHTML = numArr[0]);
	}

}

// gameGrid[0].innerHTML = 4;
// gameGrid[1].innerHTML = 2;
// gameGrid[2].innerHTML = 2;
// gameGrid[3].innerHTML = 2;
// 有问题
// 前两个相等 且 后两个不相等		2 2 2 4    2 2 4 8
// 前三个相等	 和情况2冲突
// 后三个相等
function fourNumMove(eleArr, arrow) {
	var numArr = [];
	for (var i = 0; i < 4; i++) {
		numArr.push(eleArr[i].innerHTML);
	}
	var equal1 = numArr[0] === numArr[1] && numArr[2] === numArr[3],
		equal2 = numArr[0] === numArr[1] && numArr[1] !== numArr[2] && numArr[2] !== numArr[3],		// 修改
		equal3 = numArr[0] !== numArr[1] && numArr[1] === numArr[2] && numArr[2] !== numArr[3],
		equal4 = numArr[0] !== numArr[1] && numArr[1] !== numArr[2] && numArr[2] === numArr[3],
		equal5 = numArr[0] === numArr[1] && numArr[1] === numArr[2] && numArr[2] !== numArr[3],
		equal6 = numArr[0] !== numArr[1] && numArr[1] === numArr[2] && numArr[2] === numArr[3];

	if (equal1) {// 1. 前两个相等 且 后两个相等 或四个都相等
		if (arrow === 'up' || arrow === 'left') {
			eleArr[0].innerHTML = numArr[0] * 2;
			eleArr[1].innerHTML = numArr[3] * 2;
			eleArr[2].innerHTML = '';
			eleArr[3].innerHTML = '';

		} else if (arrow === 'down' || arrow === 'right') {
			eleArr[3].innerHTML = numArr[3] * 2;
			eleArr[2].innerHTML = numArr[0] * 2;
			eleArr[1].innerHTML = '';
			eleArr[0].innerHTML = '';
		}

	} else if (equal2) {// 2. 前两个相等 且 中间两个不相等 且 后两个不相等		修改
		if (arrow === 'up' || arrow === 'left') {
			eleArr[0].innerHTML = numArr[0] * 2;
			eleArr[1].innerHTML = numArr[2];
			eleArr[2].innerHTML = numArr[3];
			eleArr[3].innerHTML = '';

		} else if (arrow === 'down' || arrow === 'right') {
			eleArr[3].innerHTML = numArr[3];
			eleArr[2].innerHTML = numArr[2];
			eleArr[1].innerHTML = numArr[1] * 2;
			eleArr[0].innerHTML = '';
		}


	} else if (equal3) {// 3. 前两个不相等 且 中间两个相等 且 后两个不相等
		if (arrow === 'up' || arrow === 'left') {
			eleArr[0].innerHTML = numArr[0];
			eleArr[1].innerHTML = numArr[1] * 2;
			eleArr[2].innerHTML = numArr[3];
			eleArr[3].innerHTML = '';

		} else if (arrow === 'down' || arrow === 'right') {
			eleArr[3].innerHTML = numArr[3];
			eleArr[2].innerHTML = numArr[2] * 2;
			eleArr[1].innerHTML = numArr[0];
			eleArr[0].innerHTML = '';
		}


	} else if (equal4) {// 4. 前两个不相等 且 中间两个不相等 且 后两个相等
		if (arrow === 'up' || arrow === 'left') {
			eleArr[0].innerHTML = numArr[0];
			eleArr[1].innerHTML = numArr[1];
			eleArr[2].innerHTML = numArr[3] * 2;
			eleArr[3].innerHTML = '';

		} else if (arrow === 'down' || arrow === 'right') {
			eleArr[3].innerHTML = numArr[3] * 2;
			eleArr[2].innerHTML = numArr[1];
			eleArr[1].innerHTML = numArr[0];
			eleArr[0].innerHTML = '';
		}

	} else if (equal5) {// 5. 前三个相等 且 后两个不相等
		if (arrow === 'up' || arrow === 'left') {				// 增加
			eleArr[0].innerHTML = numArr[0] * 2;
			eleArr[1].innerHTML = numArr[2];
			eleArr[2].innerHTML = numArr[3];
			eleArr[3].innerHTML = '';

		} else if (arrow === 'down' || arrow === 'right') {
			// console.log(numArr);
			eleArr[3].innerHTML = numArr[3];
			eleArr[2].innerHTML = numArr[2] * 2;
			eleArr[1].innerHTML = numArr[0];
			eleArr[0].innerHTML = '';
		}

	} else if (equal6) {// 6. 后三个相等 且 前两个不相等
		if (arrow === 'up' || arrow === 'left') {				// 增加
			eleArr[0].innerHTML = numArr[0];
			eleArr[1].innerHTML = numArr[1] * 2;
			eleArr[2].innerHTML = numArr[3];
			eleArr[3].innerHTML = '';

		} else if (arrow === 'down' || arrow === 'right') {
			eleArr[3].innerHTML = numArr[3] * 2;
			eleArr[2].innerHTML = numArr[1];
			eleArr[1].innerHTML = numArr[0];
			eleArr[0].innerHTML = '';
		}

	}

}


// 判断是否合成了2048
function gameEnd() {
	for (var i = 0; i < 16; i++) {
		gameGrid[i].className = '';
		var v = +gameGrid[i].innerHTML;
		if (v) {
			gameGrid[i].className = 'num' + v;
		}
		if (v > 2048) {								// 修改
			gameGrid[i].className = 'numgt2048';
		}
		(v === 2048 && !isWin) && (gameResult.innerHTML = 'You win!', isWin = true);
	}
}
// 得到一行或一列中有数字的个数
function getRowOrColNumCount(arr) {
	var count = 0;
	for (var i = 0; i < 4; i++) {
		arr[i].innerHTML && count++;
	}
	return count;
}

// 随机选择一个没有数字的格子并放入数字2或4
function selectGridPutNum() {
	var x = selectNumberFrom(0, 3),
		y = selectNumberFrom(0, 3);
	var newNumGrid = gameGrid[x * 4 + y];
	newNumGrid.innerHTML !== '' ? selectGridPutNum() : (newNumGrid.innerHTML = selectNumberFrom(1, 100) % 7 ? 2 : 4);
}

// 创建16个格子
function createGameGrid() {
	var ul = document.createElement('ul');
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			var li = document.createElement('li');
			li.x = i;
			li.y = j;
			ul.appendChild(li);
		}
	}
	gameMap.appendChild(ul);
}
// 得到一个介于vloerValue和upperValue之间(包括vloerValue和upperValue)的一个随机整数
function selectNumberFrom(lowerValue,upperValue) {
	var choices = upperValue - lowerValue + 1;
	return Math.floor(Math.random() * choices + lowerValue);
}

