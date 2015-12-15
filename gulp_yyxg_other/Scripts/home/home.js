


define(function (require){

	var bannerScroll = require('./h_banner');
	var pdScroll = require('./h_pdscroll');
	

	function init(){
		bannerScroll.init();
		pdScroll.init();
	}
	return {
		init:init
	};
});

		