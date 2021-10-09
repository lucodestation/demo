$(function () {
	$('.header img').click(function () {
		
	});
	



(function () {
	var banner = $('.banner'),
		bannerListBox = banner.find('.banner-list-box'),
		bannerList = bannerListBox.find('.banner-list'),
		prev = banner.find('.prev'),
		next = banner.find('.next'),
		dotList = banner.find('.dot').find('i'),
		moveImg = bannerList.find('img[alt^="鲁大师"]'),
		now = 0,
		timer = null;

	moveImg.eq(0).animate({
		left:0
	}, 800);

	next.click(nextClick);
	function nextClick() {
		now++;
		if (now == 3) {
			now = 0;
		}
		changeOpacity();
	}
	prev.click(prevClick);
	function prevClick() {
		now--;
		if (now == -1) {
			now = 2;
		}
		changeOpacity();
	}
	dotList.each(function (index) {
		$(this).click(function () {
			now = index;
			changeOpacity();
		});
	});

	// timer = setInterval(autoPlay, 4000);
	// function autoPlay() {next.click();}
	// banner.hover(function () {clearInterval(timer);
	// }, function () {timer = setInterval(autoPlay, 4000);});

	function changeOpacity() {
		moveImg.css('left', -1920);
		next.unbind('click');
		prev.unbind('click');
		bannerList.eq(now).css('z-index', 2);
		bannerList.eq(now).animate({
			opacity: 1
		}, function () {
			bannerList.each(function (index) {
				if (index != now) {
					$(this).css('opacity', 0);
				}
			});
			bannerList.css('z-index', 0);
			bannerList.eq(now).css('z-index', 1);
			next.click(nextClick);
			prev.click(prevClick);
			moveImg.eq(now).animate({
				left:0
			}, 800);
		});
		dotList.removeClass('on');
		dotList.eq(now).addClass('on');
	}
})();


	







});