


define(function (require){

	require('Scripts/hdf/ui/sliderjs_lunbo/jquery.slides.js');

	function init(){
		
		// 产品小图滚动部分
		$(".proScrollWrap").css({
		    height: 418
		});
		$('.proScrollBox').css({
		    "width": 336,
		    "marginLeft": -168,
		    "left": "50%"
		});
		$('.proScrollBox').slidesjs({
		    width: 336,
		    height: 418,
		    mouseEvent: 'click',
		    play: {
		        auto: true,
		        interval: 4000,
		        swap: true,
		        effect: "slide",
		        pauseOnHover: true,
		        restartDelay: 3000
		    },
		    navigation: {
		        active: true,
		        effect: "slide"
		    },
		    pagination: {
		        active: true,
		        effect: "slide"
		    },
		    effect: {
		        slide: {
		            speed: 600,
		            crossfade: true
		        },
		        fade: {
		            speed: 500,
		            crossfade: true
		        }
		    }
		});
	}
	return {
		init:init
	};
});
