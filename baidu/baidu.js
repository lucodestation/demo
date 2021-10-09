

/*

01111010 01101000 01101111 01101110 01100111 
01110111 01100101 01101001 01011111 01110111 
01100101 01100010 01000000 00110001 00110110 
00110011 00101110 01100011 01101111 01101101

*/






/* 代码未做优化 */

$(function () {
// 顶部开始
(function () {
	
	// 显示隐藏设置弹出盒（小）
	$('#top .nav .set').hover(function () {
		$('#top .nav .set-box-small').css('display', 'block');
	}, function () {
		$('#top .nav .set-box-small').css('display', 'none');
	});
	$('#top .nav .set-box-small').hover(function () {
		$(this).css('display', 'block');
	}, function () {
		$(this).css('display', 'none');
	});
	// 开启关闭预测
	$('#top .nav .set-box-small a').eq(2).click(function () {
		if ($(this).html() == '开启预测') {
			$(this).html('关闭预测');
		} else {
			$(this).html('开启预测');
		}
		$('#top .nav .set-box-small').css('display', 'none');
	});


	// 初始化更多产品的高度
	if ($(window).height() > 600) {
		$('#top .more-box').height($(window).height());
	} else {
		$('#top .more-box').height(600);
	}
	// 初始化更多产品链接列表的高度
	if ($(window).height() < 565) {
		$('#top .more-box div').height($(window).height() - 53);
	} else {
		$('#top .more-box div').height('auto');
	}
	// 浏览器改变大小时
	$(window).resize(function () {
		// 初始化更多产品的高度
		if ($(window).height() > 600) {
			$('#top .more-box').height($(window).height());
		} else {
			$('#top .more-box').height(600);
		}
		// 初始化更多产品链接列表的高度
		if ($(window).height() < 565) {
			$('#top .more-box div').height($(window).height() - 53);
		} else {
			$('#top .more-box div').height('auto');
		}
	});
	// 显示更多产品弹出盒
	$('#top .nav .more').hover(function () {
		$('#top .more-box').css('display', 'block');
	}, function () {});
	// 隐藏更多产品弹出盒
	$('#top .more-box').hover(function () {}, function () {
		$(this).css('display', 'none');
	});

	// 设置弹出盒（大）
	$(window).resize(function () {
		if ($(window).width() > 960) {
			$('#set-box-big').width(window.innerWidth - 120);// 这里用$(window).width()会有问题
		} else {
			$('#set-box-big').width(840);
		}

	});

	// 点击顶部“搜索设置”
	$('#set-box-big p a').eq(0).click(function () {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
			$('#set-box-big p a').eq(1).removeClass('on');
			$('#set-box-big .search-set').css('display', 'block');
			$('#set-box-big .advs-search').css('display', 'none');
		}
	});
	// 点击顶部“高级设置”
	$('#set-box-big p a').eq(1).click(function () {
		if (!$(this).hasClass('on')) {
			$(this).addClass('on');
			$('#set-box-big p a').eq(0).removeClass('on');
			$('#set-box-big .search-set').css('display', 'none');
			$('#set-box-big .advs-search').css('display', 'block');
		}
	});
	// 搜索设置点击
	$('#top .nav .set-box-small a').eq(0).click(function (evt) {
		evt.stopPropagation();
		$('#set-box-big p a').eq(0).click();
		$('#set-box-big').animate({
			top: 0
		});
		if ($('#center form .pic-up').css('display') == 'block') {
			$('#center form .pic-up').css('display','none');
		}
		if ($(window).width() > 960) {
			$('#set-box-big').width($(window).width() - 120);
		} else {
			$('#set-box-big').width(840);
		}
	});
	// 高级搜索点击
	$('#top .nav .set-box-small a').eq(1).click(function (evt) {
		evt.stopPropagation();
		$('#set-box-big p a').eq(1).click();
		$('#set-box-big').animate({
			top: 0
		});
		if ($('#center form .pic-up').css('display') == 'block') {
			$('#center form .pic-up').css('display','none');
		}
		if ($(window).width() > 960) {
			$('#set-box-big').width($(window).width() - 120);
		} else {
			$('#set-box-big').width(840);
		}
	});


	$('#set-box-big p span').click(function () {
		$('#set-box-big').animate({
			top: -420
		});
	});
	$('#set-box-big>p').click(function (evt) {
		evt.stopPropagation();
	});
	$('#set-box-big>div').click(function (evt) {
		evt.stopPropagation();
	});
	$(document).click(function () {
		if ($('#set-box-big').css('top') == '0px') {
			$('#set-box-big p span').click();
		}
	});



	// 登录框开始
	
	// 点击切换事件
	// 点击“换一张”
	var num1 = selectNumberFrom(1,9), num2 = selectNumberFrom(1,9);
	$('#log-box .user-name-log form .check-code img').attr('src', 'genimage' + num1 + '.png');
	$('#log-box .user-name-log form .check-code a').click(function () {
		while (true) {
			if (num1 != num2) {
				$('#log-box .user-name-log form .check-code img').attr('src', 'genimage' + num2 + '.png');
				num1 = num2;
				num2 = selectNumberFrom(1,9);
				break ;
			} else {
				num1 = num2;
				num2 = selectNumberFrom(1,9);
				continue ;
			}
		}
	});
	// 获取一个随机数
	function selectNumberFrom(lowerValue,upperValue) {
	    var choices = upperValue - lowerValue + 1;
	    return Math.floor(Math.random() * choices + lowerValue);
	}
	// 点击左下角“用户名登录”或“扫码登录”
	$('#log-box .footer .user-name-log').click(function () {
		if ($(this).html() == '用户名登录') {
			$(this).html('扫码登录');
			$('#log-box .title span').html('用户名密码登录');
			$('#log-box .qr-code-log').css('display', 'none');
			$('#log-box div.user-name-log').css('display', 'block');
		} else {
			$(this).html('用户名登录');
			$('#log-box .title span').html('扫码登录');
			$('#log-box .qr-code-log').css('display', 'block');
			$('#log-box div.user-name-log').css('display', 'none');
			$('#log-box .short-message-log').css('display', 'none');
		}
		clickMove();
	});
	
	// 点击“短信快捷登录”
	$('#log-box div.user-name-log div a').eq(2).click(function () {
		$('#log-box .title span').html('短信快捷登录');
		$('#log-box .short-message-log').css('display', 'block');
		$('#log-box div.user-name-log').css('display', 'none');
	});
	// 点击“用户名密码登录”
	$('#log-box .short-message-log div a').eq(1).click(function () {
		$('#log-box .title span').html('用户名密码登录');
		$('#log-box .short-message-log').css('display', 'none');
		$('#log-box div.user-name-log').css('display', 'block');
	});
	var canMove = false;// 判断鼠标是否hover过二维码
	// 鼠标移入移除二维码
	$('#log-box .qr-code-log .qr-code').hover(function () {
		canMove = true;
		$(this).css({
			'width': 258,
			'background': 'url("qrcodeLoginGuide.png") no-repeat right center'
		});
		hoverMove();
	}, function () {
		$(this).css({
			'width': 156,
			'background': 'none'
		});
		hoverMove();
	});
	// 二维码移动动画
	function hoverMove() {
		if ($('#log-box .qr-code-log .qr-code').css('margin-left') == '100px') {
			$('#log-box .qr-code-log .qr-code').animate({
				'margin-left': 51
			}, 300);
		} else {
			$('#log-box .qr-code-log .qr-code').animate({
				'margin-left': 100
			}, 300);
		}
	}
	// 如果鼠标hover过二维码，则在显示二维码的时候执行一个动画
	function clickMove() {
		if (canMove) {
			$('#log-box .qr-code-log .qr-code').css('margin-left', 51);
			$('#log-box .qr-code-log .qr-code').animate({
				'margin-left': 100
			});
		}
	}
	// 点击“登录”显示登录框并使登录框居中
	$('#top .nav .log').click(function () {
		$('#log-box').css('display', 'block');
		$('#log-box-screen').css('display', 'block');
		$('#log-box').css('left', $(window).width()/2 - $('#log-box').outerWidth()/2)
		$('#log-box').css('top', $(window).height()/2 - $('#log-box').outerHeight()/2)
		if (canMove) {
			clickMove();
		}
	});
	// 点击隐藏登录框
	$('#log-box .close').click(function () {
		$('#log-box').css('display', 'none');
		$('#log-box-screen').css('display', 'none');
	});
	// 拖拽事件
	$('#log-box .move').mousedown(function (evt) {
		var oldLeft = parseFloat($('#log-box').css('left')),
			oldTop = parseFloat($('#log-box').css('top')),
			x = evt.pageX,
			y = evt.pageY;
		$(document).mousemove(function (evt) {
			$('#log-box').css('left', evt.pageX - x + oldLeft);
			$('#log-box').css('top', evt.pageY - y + oldTop);
			if (parseFloat($('#log-box').css('left')) <= 0) {
				$('#log-box').css('left', 0);
			}
			if (parseFloat($('#log-box').css('left')) >= $(window).width() - $('#log-box').outerWidth()) {
				$('#log-box').css('left', $(window).width() - $('#log-box').outerWidth());
			}
			if (parseFloat($('#log-box').css('top')) <= 0) {
				$('#log-box').css('top', 0);
			}
			if (parseFloat($('#log-box').css('top')) >= $(window).height() - $('#log-box').outerHeight()) {
				$('#log-box').css('top', $(window).height() - $('#log-box').outerHeight());
			}
		});
	});
	// 鼠标抬起取消移动
	$(document).mouseup(function () {
		$(document).unbind('mousemove');
	});
	// 浏览器窗口大小发生变化使登录框不会显示到可视区外边
	// $(window).resize(function () {
	// 	if (parseFloat($('#log-box').css('left')) <= 0) {
	// 		$('#log-box').css('left', 0);
	// 	}
	// 	if (parseFloat($('#log-box').css('left')) >= $(window).width() - $('#log-box').outerWidth()) {
	// 		$('#log-box').css('left', $(window).width() - $('#log-box').outerWidth());
	// 	}
	// 	if (parseFloat($('#log-box').css('top')) <= 0) {
	// 		$('#log-box').css('top', 0);
	// 	}
	// 	if (parseFloat($('#log-box').css('top')) >= $(window).height() - $('#log-box').outerHeight()) {
	// 		$('#log-box').css('top', $(window).height() - $('#log-box').outerHeight());
	// 	}
	// });
	// 浏览器窗口大小发生变化使登录框居中
	$(window).resize(function () {
		$('#log-box').css('left', $(window).width()/2 - $('#log-box').outerWidth()/2)
		$('#log-box').css('top', $(window).height()/2 - $('#log-box').outerHeight()/2)
	});
	// 禁止提交登录框中的表单
	$('#log-box :submit').click(function () {
		return false;
	});
	
	// 登录框结束









})();
// 顶部结束
	


// 中间部分开始
(function () {
	// 搜索框获取焦点
	$('#center form .search-input :text').focus();
	// 初始化搜索框颜色
	$('#center form .search-input').css('border-color','#4791ff');
	var isFocus = true, inputVal = '';
	// 在搜索框未获取焦点的情况下鼠标移入移出改变边框颜色
	$('#center form .search-input').hover(function () {
		if (!isFocus) {
			$(this).css('border-color','#b3b3b3');
		}
	}, function () {
		if (!isFocus) {
			$(this).css('border-color','#ccc');
		}
	});
	// 搜索框获取焦点
	$('#center form .search-input :text').focusin(function () {
		$('#center form .search-input').css('border-color','#4791ff');
		isFocus = true;
	});
	// 搜索框失去焦点
	$('#center form .search-input :text').focusout(function () {
		$('#center form .search-input').css('border-color','#ccc');
		isFocus = false;
	});
	// 点击相机图标
	$('#center form .search-input span').click(function (evt) {
		evt.stopPropagation();// 阻止冒泡
		$('#center form .pic-up').css('display','block');
	});
	// 点击叉号
	$('#center form .close').click(function (evt) {
		evt.stopPropagation();// 阻止冒泡
		inputVal = $('#center form .search-input input').val();
		$('#center form .pic-up').css('display','none');
		$('#center form :reset').click();
		$('#center .search-input input').val(inputVal);
	});
	// 初始化中间部分的水平位置
	if ($(window).width() > 800) {
		$('#center').css({
			'left': '50%',
			'margin-left': -320
		});
	} else {
		$('#center').css({
			'left': 85,
			'margin-left': 0
		});
	}
	// 初始化中间部分的垂直位置
	if ($(window).height() > 600) {
		$('#center').css('top', ($(window).height() - 600) / 2.6 + 38);
	} else {
		$('#center').css('top', 38);
	}
	// 窗口缩放改变中间的水平、垂直位置
	$(window).resize(function () {
		// 初始化中间部分的水平位置
		if ($(window).width() > 800) {
			$('#center').css({
				'left': '50%',
				'margin-left': -320
			});
		} else {
			$('#center').css({
				'left': 85,
				'margin-left': 0
			});
		}
		// 初始化中间部分的垂直位置
		if ($(window).height() > 600) {
			$('#center').css('top', ($(window).height() - 600) / 2.6 + 38);
		} else {
			$('#center').css('top', 38);
		}
	});
	$('#center form .pic-up').click(function (evt) {
		evt.stopPropagation();// 阻止冒泡
	});
	// 使点击上传图片弹出盒以外的部分也能关闭上传图片弹出盒
	$(document).click(function () {
		if ($('#center form .pic-up').css('display') == 'block') {
			$('#center form .pic-up .close').click();
		}
	});

	
})();
// 中间部分结束


// 底部开始
(function () {
	// 初始化底部水平位置
	if ($(window).width() > 810) {
		$('#footer').css({
			'left': '50%',
			'margin-left': -405
		});
	} else {
		$('#footer').css({
			'left': 0,
			'margin-left': 0
		});
	}
	// 初始化底部垂直位置
	if ($(window).height() > 600) {
		$('#footer').css('top', $(window).height() - 600);
	} else {
		$('#footer').css('top', 0);
	}
	// 窗口缩放改变底部的水平、垂直位置
	$(window).resize(function () {
		// 初始化底部水平位置
		if ($(window).width() > 810) {
			$('#footer').css({
				'left': '50%',
				'margin-left': -405
			});
		} else {
			$('#footer').css({
				'left': 0,
				'margin-left': 0
			});
		}
		
		// 初始化底部垂直位置
		if ($(window).height() > 600) {
			$('#footer').css('top', $(window).height() - 600);
		} else {
			$('#footer').css('top', 0);
		}

	});
})();
// 底部结束






$('#center form .pic-up .pic-up-input span').click(function () {
	$(document).click();
	alert('制作本网页是为了做网页布局练习，暂不支持搜索图片。');
});


$('#set-box-big .search-set :submit').click(function () {
	$(document).click();
	alert('制作本网页是为了做网页布局练习，暂不支持“搜索设置”。');
	return false;
});

$('#set-box-big .advs-search :submit').click(function () {
	$(document).click();
	alert('制作本网页是为了做网页布局练习，暂不支持“高级搜索”。');
	return false;
});


});