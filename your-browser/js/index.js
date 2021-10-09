var yourBrowser = {
  // 获取浏览器版本
  // 返回下列值之一 !IE IE11 IE10 IE9 IE8 IE7
  getVersion: function () {
    var div = document.createElement('div');
    switch (true) {
      case (typeof div.attachShadow) === 'function':
        return '!IE';

      case div.style.borderImage === '':
        return 'IE11';
    
      case div.style.transition === '':
        return 'IE10';

      case div.style.borderRadius === '':
        return 'IE9';

      case div.style.captionSide === '':
        return 'IE8';

      case div.style.minWidth === '':
        return 'IE7';

      default:
        return 'IE6';
    }
  },
  // 在浏览器顶部显示浏览器版本过低提示
  showTip: function () {
    var div = document.createElement('div');

    div.style.font            = '16px/1.5 PingFangSC-Regular,HelveticaNeue-Light,Helvetica Neue Light,Microsoft YaHei,sans-serif';
    div.style.backgroundColor = '#f25648';
    div.style.position        = 'absolute';
    div.style.left            = '0';
    div.style.right           = '0';
    div.style.width           = '100%'; // 修复 IE6 宽度撑不满
    div.style.top             = '0';
    div.style.zIndex          = '999';
    div.style.fontSize        = '16px';
    div.style.textAlign       = 'center';
    div.style.padding         = '10px 0';
    div.style.color           = '#fff';

    // 关闭按钮
    var closeBtn = document.createElement('a');

    closeBtn.href                 = 'javascript:';
    closeBtn.innerHTML            = 'X';
    closeBtn.style.position       = 'absolute';
    closeBtn.style.top            = '0';
    closeBtn.style.right          = '0';
    closeBtn.style.color          = '#fff';
    closeBtn.style.textDecoration = 'none';
    closeBtn.style.padding        = '10px 20px'

    closeBtn.onclick = function () {
      div.style.display = 'none';
    };

    div.innerHTML = '<p>您的浏览器版本过低！</p><p><a href="http://lucodestation.gitee.io/demo/get-browser/" target="_blank">下载新版浏览器</a> 以获取更好的体验。</p>';

    div.appendChild(closeBtn);
    document.body.appendChild(div);
  },
  /**
   * 版本比较，返回 true 或 false
   * 
   * @param {Array} args 一个有两个元素的数组
   * - 第一个元素可以是 '<' '<=' '>' '>=' '===' 或 '!'
   * - 第二个参数可以是 'IE' 后跟一个数字如 'IE10' 或是 '!IE'
   * 第一个参数为 '!' 时，第二个参数需要是 'IE' 以表示非 IE
   */
  version: function (args) {
    var version = this.getVersion();
    version = version.toLowerCase() === '!ie' ? '!ie' : parseInt(version.substr(2));
    var obj = {
      '<': function (v) { return version < parseInt(v.substr(2)); },
      '<=': function (v) { return version <= parseInt(v.substr(2)); },
      '>': function (v) { return version > parseInt(v.substr(2)); },
      '>=': function (v) { return version >= parseInt(v.substr(2)); },
      '===': function (v) { return version === parseInt(v.substr(2)); },
      '!': function (v) { return version === '!ie'; }
    };
    return obj[args[0]](args[1]);
  }
};
