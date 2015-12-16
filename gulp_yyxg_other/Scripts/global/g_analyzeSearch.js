define(function (require){
	// 搜索栏下面的智能提示
	// 鼠标浮动上去有背景提示
	function init(){
		$('.search').on('mouseenter', '.js-analyze-search .item', function (){
			$(this).addClass('active');
		});
		$('.search').on('mouseleave', '.js-analyze-search .item', function (){
			$(this).removeClass('active');
		});
	}

	
	return{
		init: init
	};
});