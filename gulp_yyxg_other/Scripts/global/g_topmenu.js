define(function (require){
	// 所有鼠标移入显现二级菜单
	function init(){
		$('.js-hasSubNav').each(function (index, ele){
			$(this).mouseenter(function (){
				$(this).addClass('hover');
			});
			$(this).mouseleave(function (){
				$(this).removeClass('hover');
			});
		});
	}

	
	return{
		init: init
	};
});