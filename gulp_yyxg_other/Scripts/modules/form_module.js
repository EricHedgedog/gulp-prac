/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2015-11-22 23:03:21
 * @version $Id$
 */

define(function (require){
	var form_model = (function ($){

		function focus_blur(){
			// 点击提示信息，隐藏提示信息，同时聚焦到input框
			$('.js_tips').click(function (){
				$(this).hide().siblings('.js_itxt').focus();
			});
			// 鼠标聚焦到input框
			$('.js_itxt').focus(function (){
				$(this).siblings('.js_tips').hide();
				$(this).parent().removeClass('error-item');
				$(this).parent().addClass('focus-item');
			});

			// 鼠标从input框中失去焦点
			$('.js_itxt').blur(function (){
				if( $(this).val() == '' ){
					$(this).siblings('.js_tips').show();
				}
				$(this).parent().removeClass('focus-item');
			});

			// 当输入框中有内容，显示对应的按钮
		    $('.js_itxt').on('input propertychange',function(){
		        if( $(this).val() != '' ){
		            $(this).siblings('.js_clearbtn').show();
		            $(this).siblings('.js_preview').show();
		        }else{
		            $(this).siblings('.js_clearbtn').hide();
		            $(this).siblings('.js_preview').hide();
		        }
		    })

		    // 点击叉叉按钮，清楚input框中的内容
		   	$('.js_clearbtn').click(function (){
		   		$(this).hide();
		   		$(this).siblings('.itxt').val('').focus();
		   	});
		}

		// 验证密码的强弱程度
		function checkPWD(){
			require('Scripts/hdf/lib/strengthjs/strength.js');
			// 判断密码的强弱
		    $('#js_setPassword').strength({
		    	strengthClass: 'itxt js_itxt',
		        strengthButtonClass: 'preview'
		    });
		}

		return {
			focus_blur:focus_blur,
			checkPWD:checkPWD
		}
	})(jQuery);

	return form_model;
});

	