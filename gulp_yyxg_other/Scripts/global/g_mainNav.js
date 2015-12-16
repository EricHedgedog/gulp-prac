define(function (require){
	// 所有分类（主导航），鼠标移上去显示二级分类
	function init(){
		var timer1 = [];
		var timer2 = [];
		$('.js-dd-inner .item').each(function (index, ele){
			$(this).mouseenter(function (){
				clearInterval(timer2[index]);
				$(this).addClass('hover');
				$('.js-dorpdown-layer .item-sub').eq(index).show();
			});
			$(this).mouseleave(function (){
				var This = $(this);
				timer1[index] = setTimeout(function (){
					This.removeClass('hover');
					$('.js-dorpdown-layer .item-sub').eq(index).hide();
				}, 0);
			});
		});

		$('.js-dorpdown-layer .item-sub').each(function (index, ele){
			$(this).mouseenter(function (){
				clearInterval( timer1[index] );
			});
			$(this).mouseleave(function (){
				var This = $(this);
				timer2[index] = setTimeout(function (){
					$('.js-dd-inner .item').eq(index).removeClass('hover');
					This.hide();
				}, 0);
			});
		});
	}

	
	return{
		init: init
	};
});