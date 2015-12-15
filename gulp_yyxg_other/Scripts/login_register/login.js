define(function (require){
	function init(){
		// 鼠标的聚焦和失去焦点
		$('.js_itxt').focus(function (event){
			$(this).parent().removeClass('error-item');
			$(this).parent().addClass('focus-item');
		});

		$('.js_itxt').blur(function (){
			$(this).parent().removeClass('focus-item');
		});

		// input的值不为空时，显示右侧小图标
		$('.js_itxt').on('input propertychange',function(){
	        if($(this).val()!=''){
	            $(this).siblings('.clear-btn').show();
	        }else{
	            $(this).siblings('.clear-btn').hide();
	        }
	    })

	    $('.js_itxt').on('input propertychange',function(){
	    	$(this).siblings('.js_itxt').val( $(this).val() );
	    })

		// 点击用户名的叉叉按钮
		$('.js_clearname').click(function (){
			$(this).hide();
			$(this).siblings('.itxt').val('').focus();
		});

		require('Scripts/hdf/lib/strengthjs/strength.js');
		// 判断密码的强弱
	    $('#password').strength({
	    	strengthClass: 'itxt js_itxt',
	        strengthButtonClass: 'preview'
	    });
	}

	return {
		init:init
	}
});