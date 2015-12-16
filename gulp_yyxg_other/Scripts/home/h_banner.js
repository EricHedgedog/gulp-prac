


define(function (require){

	require('Scripts/hdf/ui/sliderjs_lunbo/jquery.slides.js');

	function init(){
		
		// 大图banner部分
		$(".bigImgBanner_bd").css({
		    height: 466
		});
		$('.slides_wrapperbox').css({
		    "width": 1920,
		    "marginLeft": -960,
		    "left": "50%"
		});
		$('.slides_wrapperbox').slidesjs({
		    width: 1920,
		    height: 466,
		    mouseEvent: 'click',
		    play: {
		        auto: true,
		        interval: 5000,
		        swap: true,
		        effect: "fade",
		        pauseOnHover: true,
		        restartDelay: 3000
		    },
		    navigation: {
		        active: true,
		        effect: "fade"
		    },
		    pagination: {
		        active: true,
		        effect: "fade"
		    },
		    effect: {
		        slide: {
		            speed: 2000,
		            crossfade: false
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
