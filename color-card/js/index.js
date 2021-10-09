var arr = [
  ['1abc9c', '2ecc71', '3498db', '9b59b6', '34495e'],
  ['16a085', '27ae60', '2980b9', '8e44ad', '2c3e50'],
  ['f1c40f', 'e67e22', 'e74c3c', 'ecf0f1', '95a5a6'],
  ['f39c12', 'd35400', 'c0392b', 'bdc3c7', '7f8c8d']
];

// 创建容器
var container = document.createElement('div');
container.className = 'container';

arr.map(function (i) {
  // 创建行
  var row = document.createElement('div');
  row.className = 'row';

  i.map(function (i) {
    var color = '#' + i;

    // 创建格，它是触发复制的元素
    var cell = document.createElement('div');
    cell.className = 'cell';
    cell.style.backgroundColor = color;

    // 创建复制按钮
    var copyButton = document.createElement('span');
    copyButton.className = 'copyButton';
    copyButton.innerHTML = '复制';
    
    // 按 clipboard.js 要求设置自定义属性
    cell.setAttribute('data-clipboard-text', color);

    cell.appendChild(copyButton);
    row.appendChild(cell);
  });

  container.appendChild(row);
});

document.body.appendChild(container);

var clipboard = new ClipboardJS('.cell');
clipboard.on('success', function(e) {
  clearTimeout(timer);
  // 这里的 e 是触发复制的元素
  var copyButton = e.trigger.querySelector('.copyButton');
  copyButton.innerHTML = '已复制';
  copyButton.className = 'copyButton copied'; // IE 不支持 classList ，我的天哪😫

  var timer = setTimeout(function () {
    copyButton.innerHTML = '复制';
    copyButton.className = 'copyButton';
  }, 1000);
});
