
var gameMap = document.getElementsByClassName('game-map')[0];// 游戏地图盒子
var gameGrid = gameMap.getElementsByTagName('li');// 获取100个li格子
var mineEleArr = [];// 用于存储有雷的li元素
var openedGrid = gameMap.getElementsByClassName('opened');// 获取已打开的格子,用于计算
var gameStatus = 'init';// 记录游戏状态
var firstClickGridIndex = 0;// 记录第一次点击的那个格子的索引

var mineInfo = document.getElementsByClassName('mine-info')[0];// 游戏信息盒子
var timeInfo = mineInfo.getElementsByClassName('time')[0].getElementsByTagName('span')[0];// 显示游戏时间的元素
var timer = null;// 控制显示游戏时间的计时器
var timeInfoSecond = 0;// 要显示的游戏时间秒数

var lastMineNum = mineInfo.getElementsByClassName('last-num')[0].getElementsByTagName('span')[0];// 显示剩余雷的个数的元素
var flagGrid = gameMap.getElementsByClassName('flag');// // 获取已插旗的格子,用于计算

var newGameBtn = document.getElementsByClassName('new-game')[0].getElementsByTagName('a')[0];// 新游戏按钮

/* 游戏初始化 */
gameInit();
function gameInit() {

	// 初始化前把原有的格子全清空
	gameMap.innerHTML = '';

	// 初始化前把记录有雷的li元素数组清空
	mineEleArr = [];

	// 在gameMap中生成100个格子
	createGameGrid();
	// 在100个li中随机生成10个雷
	randomCreateTenMine();
	// 为每个没有雷的li元素计算出周围的雷数，并把雷数添加到li元素中，周围没有雷则为空
	createMineNum();
}

// 取消扫雷地图的默认的右键菜单
gameMap.addEventListener('contextmenu', function (eve) {
	eve.preventDefault();
}, false);

// 让扫雷地图内的文本不可选中
gameMap.onselectstart = function (eve) {
	eve.preventDefault();
};

// 鼠标按下事件
gameMap.addEventListener('mousedown', function (e) {
	var target = e.target;

	// 记录第一次点击的那个格子的索引
	firstClickGridIndex = target.x * 30 + target.y;

	if (target.nodeName === 'LI') {// 假如点到了地图的边框就不进入游戏，可能性很小
		e.button === 0 && leftMouseDown(target);// 左键

		e.button === 2 && rightMouseDown(target);// 右键
	}
}, false);

// 按下左键事件处理程序
function leftMouseDown(ele) {
	// 如果第一次没有点到空的，则自动模拟点击第一次点击的那个格子
	if ((gameStatus === 'init' && ele.mine) || (gameStatus === 'init' && ele.mineNum)) {
		// 初始化游戏
		gameInit();
		// 模拟点击
		leftMouseDown(gameGrid[firstClickGridIndex]);
		return;
	}

	// 游戏状态变为start前开始计时
	gameStatus === 'init' && runTimer();

	gameStatus = 'start';

	if (!ele.classList.contains('flag') && !ele.classList.contains('opened')) {// 过滤掉插过旗的和打开过的
		// 为点过的添加一个为opened的class
		ele.classList.add('opened');

		// 点到是雷
		if (ele.mine) {
			gameEnd();
			return;
		}

		// 点到的是数字
		if (ele.mineNum) {
			ele.innerHTML = ele.mineNum;// 显示数字
			ele.classList.add('num' + ele.mineNum);// 根据数字值添加class，方便为不同的数字设置不同的样式
		}

		// 点到的是空
		if (!ele.mineNum && !ele.mine) {
			var eightGrid = getEightGrid(ele);// 获取点击的元素周围的八个元素，如果点击的是边界，得到的元素会小于八个
			for (var i = 0; i < eightGrid.length; i++) {
				// 过滤掉插过旗的和打开过的																	// 模拟点击空格子周围的格子
				!eightGrid[i].classList.contains('flag') && !eightGrid[i].classList.contains('opened') && leftMouseDown(eightGrid[i]);
			}
		}

		// 每点击一次左键就判断一次是否赢了
		480 - openedGrid.length === 99 && gameEnd(true);
	}
}

// 按下右键事件处理程序
function rightMouseDown(ele) {
	if (!ele.classList.contains('opened')) {// 过滤掉已经打开的
		// 没旗则添加，有旗则去掉
		ele.classList.toggle('flag');

		// 游戏状态变为start前开始计时
		gameStatus === 'init' && runTimer();

		// 把游戏状态改为开始
		gameStatus = 'start';

		// 显示剩余雷数
		lastMineNum.innerHTML = 99 - flagGrid.length;
	}
}

// 新游戏按钮
newGameBtn.addEventListener('click', function (e) {
	// 初始化
	gameInit();
	// 游戏状态改为初始化
	gameStatus = 'init';
	// 清除计时器
	clearInterval(timer);
	// 记录游戏时间的描述归零
	timeInfoSecond = 0;
	// 界面上的计时信息设为0
	timeInfo.innerHTML = 0;
	// 界面上的剩余雷数恢复默认
	lastMineNum.innerHTML = 99;
}, false);

// 运行计时器
function runTimer() {
	timer = setInterval(function () {
		timeInfo.innerHTML = ++timeInfoSecond;
	}, 1000);
}

// 双击数字，满足条件，模拟点击这个数字周围的所有未打开的格子
gameMap.addEventListener('dblclick', function (e) {
	var target = e.target;
	if (target.mineNum) {
		var eightGrid = getEightGrid(target);// 获取双击的含数字的元素周围的八个格子
		var eightGridFlagGridLength = 0;// 统计八个格子中含旗的个数
		var eightGridOpenedGridLength = 0;// 统计八个格子中已打开的个数

		for (var i = 0; i < eightGrid.length; i++) {
			if (eightGrid[i].classList.contains('flag')) {
				eightGridFlagGridLength++;
			}
			if (eightGrid[i].classList.contains('opened')) {
				eightGridOpenedGridLength++;
			}
		}

		// 如果点击的格子里的数字和这个格子周围插的旗数相等
		// 并且
		// 点击的那个格子周围的八个格子中，还有没打开的格子，就模拟点击这些没打开的格子
		if (target.mineNum === eightGridFlagGridLength && !(eightGrid.length === eightGridFlagGridLength + eightGridOpenedGridLength)) {
			console.log('ok');
			for (var j = 0; j < eightGrid.length; j++) {
				if (!eightGrid[j].classList.contains('flag') && !eightGrid[j].classList.contains('opened')) {// 过滤掉插过旗的和打开过的，虽然左点击事件处理程序里判断过了，这里最好还是判断以下，这样可以少一次函数调用
					leftMouseDown(eightGrid[j]);
				}
			}
		}
	}
}, false);

// 游戏结束执行的一些操作
function gameEnd(info) {
	// 清除计时器
	clearInterval(timer);

	// 创建游戏结束的提示信息盒子
	var gameEndDiv = document.createElement('div');
	gameEndDiv.classList.add('game-end');

	if (info) {// 胜利
		gameEndDiv.innerHTML = 'You win!';
		// 赢得游戏，把剩余雷数改为0
		lastMineNum.innerHTML = 0;

	} else {// 失败
		gameEndDiv.innerHTML = 'Game over!';
		// 游戏失败，显示所有的雷
		for (var i = 0; i < 99; i++) {
			mineEleArr[i].classList.add('mine');
		}
	}

	// 把创建好的盒子出入到游戏地图中
	gameMap.appendChild(gameEndDiv);
}

// 在gameMap中生成100个格子
function createGameGrid() {
	// 生成ul元素
	var ul = document.createElement('ul');

	// 在ul元素中生成100个li元素
	for (var i = 0; i < 16; i++) {// 行数
		for (var j = 0; j < 30; j++) {// 一行的30个格子    (列数)
			var li = document.createElement('li');
			// 为每个li添加坐标属性
			li.x = i;
			li.y = j;
			ul.appendChild(li);
		}
	}

	// 把生成的含有100个li元素的ul元素添加到gameMap中
	gameMap.appendChild(ul);
}
	
// 在100个li中随机生成10个雷
function randomCreateTenMine() {
	// 随机生成有雷的格子，并为其添加mine属性，值为true
	gameGrid[Math.floor(Math.random() * 480)].mine = true;

	// 获取100个li中有雷的个数
	var count = eleCount(gameGrid).length;

	// 雷的个数小于10则继续生成
	count < 99 && randomCreateTenMine();

	// 把10个有雷的li塞进数组mineEle
	if (count === 99) {
		var arr = eleCount(gameGrid);
		for (var i = 0; i < 99; i++) {
			mineEleArr.push(arr[i]);
		}
	}
}

// 为每个没有雷的li元素计算出周围的雷数，并为其添加mineNum属性，值为雷的个数，个数为0则不添加mineNum属性
function createMineNum() {
	for (var i = 0; i < 480; i++) {
		if (!gameGrid[i].mine) {// 过滤掉有雷的li
			var eightGrid = getEightGrid(gameGrid[i]);// 获取元素周围的八个格子
			var count = eleCount(eightGrid).length;// 获取八个格子中有雷的个数

			// 过滤掉是0的
			count && (gameGrid[i].mineNum = count);
		}
	}
}

// 返回元素中含有雷的元素数组
function eleCount(ele) {
	var arr = [];
	var len = ele.length;
	for (var i = 0; i < len; i++) {
		ele[i].mine && arr.push(ele[i]);
	}
	return arr;
}

// 获取元素周围的八个格子，如果这个元素在边界，返回的数组长度小于8
function getEightGrid(ele) {
	var x = ele.x,
		y = ele.y;
	var arr = [];
	for (var i = x - 1; i <= x + 1; i++) {
		if (i < 0 || i > 15) { continue; }// 过滤上下边界
		for (var j = y - 1; j <= y + 1; j++) {
			if (j < 0 || j > 29 || x === i && y === j) { continue; }// 过滤左右边界，过滤自身
			arr.push(gameGrid[i * 30 + j]);
		}
	}
	return arr;
}
