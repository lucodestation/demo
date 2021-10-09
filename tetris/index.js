
var main = document.getElementsByTagName('main')[0],
tips = main.getElementsByClassName('tips')[0],
tips1 = tips.getElementsByClassName('tips1')[0],
tips2 = tips.getElementsByClassName('tips2')[0],
tips3 = tips.getElementsByClassName('tips3')[0],
newGame = tips3.getElementsByTagName('a')[0],
section = main.getElementsByTagName('section')[0],	// 游戏区域
next = main.getElementsByClassName('next')[0];		// “下一个”提示框
// 取消右键菜单
main.addEventListener('contextmenu', function (eve) { eve.preventDefault(); }, false);
// 使文本不可选中
main.onselectstart = function (eve) { eve.preventDefault(); };
// 得到一个介于vloerValue和upperValue之间(包括vloerValue和upperValue)的一个随机整数
Math.select = function (lowerValue,upperValue) {
var choices = upperValue - lowerValue + 1;
return Math.floor(Math.random() * choices + lowerValue);
};
// section里添加273个li  20行 13列
function sectionAddUl() {
section.innerHTML = '';
var ul = document.createElement('ul'), li;
for (var i = 0; i < 21; i++) {
  for (var j = 0; j < 13; j++) { li = document.createElement('li');
    li.x = i;
    li.y = j;
    ul.appendChild(li);
  }
}
section.appendChild(ul);
}
// next里添加16个i
function nextAddI() {
next.innerHTML = '';
var iEle = 0;
for (var i = 0; i < 4; i++) {
  for (var j = 0; j < 4; j++) {
    iEle = document.createElement('i');
    next.appendChild(iEle);
  }
}
}
// 创建游戏格子
sectionAddUl();
nextAddI();

var level = main.getElementsByClassName('level')[0],
score = main.getElementsByClassName('score')[0],
pices = main.getElementsByClassName('pices')[0],
lines = main.getElementsByClassName('lines')[0],
start = main.getElementsByClassName('start')[0],
pause = main.getElementsByClassName('pause')[0],

lis = section.getElementsByTagName('li'),
nextEles = next.getElementsByTagName('i');

var levelCount = 1,
scoreCount = 0,
picesCount = 0,
linesCount = 0;

var timer = null;// 计时器，自动下落
var gameStatus = 0;// 游戏状态  0 未开始    1 正在进行    2 暂停    -1 gameover

// ======================  初始化 设置变量 结束   =============================

// timer = setInterval(function () { downEvent(); }, 500);
start.onclick = function (e) {					// 开始
// console.log('start clicked');
if (!gameStatus) {
  // console.log('游戏开始');
  tips.classList.remove('tipsbg');
  tips1.classList.add('none');
  shape.createNext();
  shape.createCurrent();
  shape.createNext();
  timer = setInterval(function () { downEvent(); }, 500);
  gameStatus = 1;
}

};
pause.onclick = function (e) {					// 暂停
if (gameStatus === 1) {
  tips.classList.add('tipsbg');
  tips2.classList.remove('none');
  clearInterval(timer);
  this.innerHTML = '继续(P)';
  gameStatus = 2;
} else if (gameStatus === 2) {
  tips.classList.remove('tipsbg');
  tips2.classList.add('none');
  timer = setInterval(function () { downEvent(); }, 500);
  this.innerHTML = '暂停(P)';
  gameStatus = 1;
}
// console.log('pause clicked');
};
newGame.onclick = function () {
if (gameStatus === -1) {
  tips.classList.remove('tipsbg');
  tips3.classList.add('none');
  sectionAddUl();
  nextAddI();
  shape.createNext();
  shape.createCurrent();
  shape.createNext();
  timer = setInterval(function () { downEvent(); }, 500);
  gameStatus = 1;
}
};
document.addEventListener('keydown', function (e) {// 		按键
var ec = e.keyCode;
// console.log(ec);		// s 83  p 80    n 78
if (ec === 40) {
  // console.log('down keydown');
  downEvent();
}
if (ec === 38) {
  // console.log('up keydown');
  upEvent();
}
if (ec === 39) {
  // console.log('right keydown');
  rightEvent();
}
if (ec === 37) {
  // console.log('left keydown');
  leftEvent();
}
if (ec === 32) {
  // console.log('space keydown');
  spaceEvent();
}
if (ec === 83) { start.onclick();}
if (ec === 80) { pause.onclick();}
if (ec === 78) { newGame.onclick();}
}, false);

// ==============  事件添加 结束   ===================

function Shape() {
// 返回一个数组，数组项的值为第n个形状的4个下标组，数组的最后一位为旋转点
this.getIndexArr = function (n, x, y, sectionOrNext) {
  var c = 13;
  if (sectionOrNext === 'next') {
    c = 4;
  }
  var indexArr = [// 19个形状下标组
        [(x - 1) * c + y, (x + 1) * c + y, (x + 1) * c + y + 1, x * c + y],
        [x * c + y - 1, x * c + y + 1, (x + 1) * c + y - 1, x * c + y],
        [(x - 1) * c + y - 1, (x - 1) * c + y, (x + 1) * c + y, x * c + y],
        [x * c + y - 1, (x - 1) * c + y + 1, x * c + y + 1, x * c + y],
        [(x - 1) * c + y, (x + 1) * c + y - 1, (x + 1) * c + y, x * c + y],
        [(x - 1) * c + y - 1, x * c + y - 1, x * c + y + 1, x * c + y],
        [(x - 1) * c + y, (x - 1) * c + y + 1, (x + 1) * c + y, x * c + y],
        [x * c + y - 1, x * c + y + 1, (x + 1) * c + y + 1, x * c + y],
        [(x - 1) * c + y, x * c + y - 1, x * c + y + 1, x * c + y],
        [(x - 1) * c + y, x * c + y + 1, (x + 1) * c + y, x * c + y],
        [x * c + y - 1, x * c + y + 1, (x + 1) * c + y, x * c + y],
        [x * c + y - 1, (x - 1) * c + y, (x + 1) * c + y, x * c + y],
        [(x - 1) * c + y - 1, x * c + y - 1, (x + 1) * c + y, x * c + y],
        [x * c + y - 1, (x - 1) * c + y, (x - 1) * c + y + 1, x * c + y],
        [(x - 1) * c + y + 1, x * c + y + 1, (x + 1) * c + y, x * c + y],
        [(x - 1) * c + y - 1, (x - 1) * c + y, x * c + y + 1, x * c + y],
        [x * c + y - 2, x * c + y - 1, x * c + y + 1, x * c + y],
        [(x - 2) * c + y, (x - 1) * c + y, (x + 1) * c + y, x * c + y],
        [(x - 1) * c + y, (x - 1) * c + y + 1, x * c + y + 1, x * c + y]
        ];
  return indexArr[n];
};
this.colorNameList = ['color0', 'color1', 'color2', 'color3', 'color4', 'color5', 'color6'];
this.indexForColorName = [// 辅助设置颜色
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
            [12, 13],
            [14, 15],
            [16, 17],
            [18]
            ];
// ---------------------------------------------------------------------------
this.nextShapeArrIndex = 0;// 存储下一个形状是19个形状中的第几个		第几个图形
this.setNextXY = function () {
  this.nextX = 1;
  this.nextY = 1;
  this.nextShapeArrIndex = Math.select(0, 18);					// 随机数
  // console.log('nextShapeArrIndex', this.nextShapeArrIndex);
  [1, 7, 10].indexOf(this.nextShapeArrIndex) !== -1 && (this.nextX = 0);
  [2, 4, 11, 12].indexOf(this.nextShapeArrIndex) !== -1 && (this.nextY = 2);
  this.nextShapeArrIndex === 16 && (this.nextX = 0, this.nextY = 2);
  this.nextShapeArrIndex === 17 && (this.nextX = 2, this.nextY = 1);
};
this.setNextColorName = function () {
  this.nextColorName = '';
  // console.log('return next colorName');
  for (var i = 0; i < 7; i++) {
    if (this.indexForColorName[i].indexOf(this.nextShapeArrIndex) !== -1) {
      // console.log('i' , i);
      this.nextColorName = this.colorNameList[i];
    }
  }
};
this.createNext = function () {
  for (var i = 0; i < 16; i++) {
    nextEles[i].removeAttribute('class');
  }
  this.setNextXY();// 改变 nextShapeArrIndex nextX nextY
  this.setNextColorName();
  // console.log('x y ', this.nextX, this.nextY);
  // console.log('indexArr ', this.getIndexArr(this.nextShapeArrIndex, this.nextX, this.nextY, 'next'));
  // console.log('nextColorName', this.nextColorName);
  var indexArr = this.getIndexArr(this.nextShapeArrIndex, this.nextX, this.nextY, 'next');
  for (var j = 0; j < 4; j++) {
    nextEles[indexArr[j]].classList.add(this.nextColorName);
  }
};


// ---------------------------------------------------------------------------------
this.copyShape = function () {
  this.setCurrentXYColorName();
  for (var i = 0; i < 4; i++) {
    if (lis[this.currentIndexArr[i]].fixed) {
      // console.log('game over');
      gameStatus = -1;
      clearInterval(timer);
      tips.classList.add('tipsbg');
      tips3.classList.remove('none');
      return;
    }
  }
  this.createCurrent();
  this.createNext();
};

// ---------------------------------------------------------------------------------
this.currentShapeArrIndex = 0;// 存储当前形状是19个形状中的第几个	第几个图形
this.currentShapeIndex = 0;// 存储当前形状在游戏区域里的li下标		旋转点li下标
this.setCurrentXYColorName = function () {
  this.currentShapeArrIndex = this.nextShapeArrIndex;
  this.currentColorName = this.nextColorName;
  this.currentX = 1;
  this.currentY = 6;
  [1, 7, 10, 16].indexOf(this.currentShapeArrIndex) !== -1 && (this.currentX = 0);
  this.currentShapeArrIndex === 17 && (this.currentX = 2);
  // console.log(this.currentShapeArrIndex, this.currentColorName);
  // console.log('current', this.currentX, this.currentY);
  this.currentShapeIndex = this.currentX * 13 + this.currentY;
  this.currentIndexArr = this.getIndexArr(this.currentShapeArrIndex, this.currentX, this.currentY);
};
this.createCurrent = function () {
  this.setCurrentXYColorName();
  // console.log('current', this.currentShapeArrIndex, this.currentX, this.currentY, this.currentColorName);
  for (var j = 0; j < 4; j++) {
    lis[this.currentIndexArr[j]].classList.add(this.currentColorName);
    // lis[this.currentIndexArr[j]].current = true;
  }
};
}
var shape = new Shape();


shape.setDown = function () {
this.down = true;
for (var i = 0; i < 4; i++) {
  if (this.currentIndexArr[i] + 13 > 272) {
    this.down = false;
    return;
  }
  if (lis[this.currentIndexArr[i] + 13].fixed) {
    this.down = false;
    return;
  }
}
};





function downEvent() {
shape.setDown();
if (shape.down) {
  // console.log('可以下移');
  // console.log(shape.currentIndexArr);
  for (var i = 0; i < 4; i++) {
    lis[shape.currentIndexArr[i]].classList.remove(shape.currentColorName);
    // lis[shape.currentIndexArr[i]].current = false;
    shape.currentIndexArr[i] += 13;
  }
  for (var j = 0; j < 4; j++) {
    lis[shape.currentIndexArr[j]].classList.add(shape.currentColorName);
    // lis[shape.currentIndexArr[j]].current = true;
  }
  shape.currentShapeIndex += 13;// 旋转点下标
  shape.currentX++;
} else {
  // console.log(shape.down);
  for (var k = 0; k < 4; k++) {
    lis[shape.currentIndexArr[k]].fixed = true;
  }
  picesCount++;
  pices.innerHTML = picesCount;
  shape.deleteRow();// 消行
  shape.copyShape();
}
}

// ----------
shape.setRow = function () {
  this.row = null;
  var arr = [];// 存落下去的形状的x坐标值
  var temp = [];// 存需要消除的行编号

  for (var i = 0; i < 4; i++) {
    // console.log(lis[this.currentIndexArr[i]].x);
    if (arr.indexOf(lis[this.currentIndexArr[i]].x) === -1) {
      arr.push(lis[this.currentIndexArr[i]].x);
    }
  }
  var len = arr.length;
  (function () {
    for (var i = 0; i < len; i++) {
      var count = 0;
      for (var j = 0; j < 13; j++) {
        if (lis[arr[i] * 13 + j].fixed) {
          count++;
        }
      }
      if (count === 13) {
        temp.push(arr[i]);
      }
    }
  }());
  
  if (temp.length > 0) {
    // console.log(temp, '行需要消除');
    this.row = temp;
  }
};
shape.deleteRow = function () {// 消行
  this.setRow();
  if (this.row) {
    linesCount++;
    lines.innerHTML = linesCount;

    // console.log('可以消除');
    var x = 0;
    var len = this.row.length;


    // scoreCount
    // 单次消除
    // 			1行		2的3次方		8
    // 			2行		3的3次方		27
    // 			3行		4的3次方		64
    // 			4行		5的3次方		125
    len === 1 && (scoreCount += 8);
    len === 2 && (scoreCount += 27);
    len === 3 && (scoreCount += 64);
    len === 4 && (scoreCount += 125);
    score.innerHTML = scoreCount;


    for (var i = 0; i < len; i++) {
      for (var j = 0; j < 13; j++) {
        lis[this.row[i] * 13 + j].removeAttribute('class');
        lis[this.row[i] * 13 + j].fixed = false;
      }
      if (this.row[i] > x) {
        // x = this.row[i];
        this.allDown(this.row[i]);
      }
    }
    // this.allDown(x);
  }
    
};

shape.allDown = function (x) {
  // console.log(x);
  for (var i = x - 1; i > 0; i--) {
    for (var j = 0; j < 13; j++) {
      if (lis[i * 13 + j].fixed) {
        lis[(i + 1) * 13 + j].className = lis[i * 13 + j].className;
        lis[(i + 1) * 13 + j].fixed = true;
        lis[i * 13 + j].fixed = false;
        lis[i * 13 + j].removeAttribute('class');
      }
    }
  }
};

// ----------

function spaceEvent() {
var count = 1;// 统计要执行downEvent的次数
var arr = [shape.currentIndexArr[0], shape.currentIndexArr[1], shape.currentIndexArr[2], shape.currentIndexArr[3]];
var x = lis[Math.max(arr[0], arr[1], arr[2], arr[3])].x;
var index = arr[3];

// console.log('arr', arr);
// console.log('x', x);
// console.log('index', index);

for (var i = x; i < 20; i++) {
  var temp = 1;
  for (var j = 0; j < 4; j++) {
    if (lis[arr[j] + count * 13].fixed) {
      temp = 0;
      break;
    }
  }
  if (!temp) {
    break;
  }
  count++;
}
// console.log('count', count);
for (var k = 0; k < count; k++) {
  downEvent();
}
}

shape.setLeft = function() {
// console.log('setLeft run...');
this.left = true;
for (var i = 0; i < 4; i++) {
  if (lis[this.currentIndexArr[i]].y === 0) {
    this.left = false;
    return;
  }
  if (lis[this.currentIndexArr[i] - 1].fixed) {
    this.left = false;
    return;
  }
}
};
function leftEvent() {
// console.log('leftEvent run...');
shape.setLeft();
if (shape.left) {
  // console.log(shape.currentIndexArr);
  for (var i = 0; i < 4; i++) {
    lis[shape.currentIndexArr[i]].classList.remove(shape.currentColorName);
    shape.currentIndexArr[i]--;
  }

  for (var j = 0; j < 4; j++) {
    lis[shape.currentIndexArr[j]].classList.add(shape.currentColorName);
  }
  shape.currentShapeIndex--;// 旋转点下标
  shape.currentY--;
}
}



shape.setRight = function () {
// console.log('setRight run...');
this.right = true;
for (var i = 0; i < 4; i++) {
  if (lis[this.currentIndexArr[i]].y === 12) {
    this.right = false;
    return;
  }
  if (lis[this.currentIndexArr[i] + 1].fixed) {
    this.right = false;
    return;
  }
}
};
function rightEvent() {
// console.log('rightEvent run...');
shape.setRight();
if (shape.right) {
  for (var i = 0; i < 4; i++) {
    lis[shape.currentIndexArr[i]].classList.remove(shape.currentColorName);
    shape.currentIndexArr[i]++;
  }
  for (var j = 0; j < 4; j++) {
    lis[shape.currentIndexArr[j]].classList.add(shape.currentColorName);
  }
  shape.currentShapeIndex++;// 旋转点下标
  shape.currentY++;
}
}


// 设置旋转后应该是19个形状中的第几个形状
shape.setRotatedShapeIndex = function () {
this.rotated = 0;
if ([3, 7, 11, 13, 15, 17].indexOf(this.currentShapeArrIndex) === -1) {
  this.rotated = this.currentShapeArrIndex + 1;
}
this.currentShapeArrIndex === 3 && (this.rotated = 0);
this.currentShapeArrIndex === 7 && (this.rotated = 4);
this.currentShapeArrIndex === 11 && (this.rotated = 8);
this.currentShapeArrIndex === 13 && (this.rotated = 12);
this.currentShapeArrIndex === 15 && (this.rotated = 14);
this.currentShapeArrIndex === 17 && (this.rotated = 16);
};

shape.setUp = function () {
this.up = true;
// for (var i = 0; i < 4; i++) {}
if (this.currentShapeArrIndex === 18) {
  // console.log('不可以旋转');
  this.up = false;
  return;
}

if (this.currentY === 0 || this.currentY === 12) {
  // console.log('不可以旋转');
  this.up = false;
  return;
}

if (this.currentShapeArrIndex === 17 && this.currentY === 1) {
  // console.log('不可以旋转');
  this.up = false;
  return;
}

this.setRotatedShapeIndex();
// console.log('旋转前是第', this.currentShapeArrIndex, '个形状');
// console.log('旋转后应该是第', this.rotated, '个形状');
// console.log('当前旋转点的下标', this.currentShapeIndex);
// console.log('currentX', this.currentX, 'currentY', this.currentY);
var indexArr = this.getIndexArr(this.rotated, this.currentX, this.currentY);

for (var i = 0; i < 4; i++) {
  if (!lis[indexArr[i]]) {
    // console.log('不可以旋转');
    this.up = false;
    return;
  }
  if (lis[indexArr[i]].fixed) {
    // console.log('不可以旋转');
    this.up = false;
    return;
  }
}

this.upArr = indexArr;
// console.log('可以旋转');

};
function upEvent() {
shape.setUp();
if (shape.up) {
  // console.log('up run...');
  // console.log(shape.upArr);
  for (var i = 0; i < 4; i++) {
    lis[shape.currentIndexArr[i]].classList.remove(shape.currentColorName);
    shape.currentIndexArr[i] = shape.upArr[i];
  }
  for (var j = 0; j < 4; j++) {
    lis[shape.currentIndexArr[j]].classList.add(shape.currentColorName);
  }
  shape.currentShapeArrIndex = shape.rotated;
}
}
