define(function (require){

	var topmenu =  require('./g_topmenu');

	var analyzeSearch =  require('./g_analyzeSearch');

	var mainNav =  require('./g_mainNav');

	var pagination = require('./g_pagination');
	
	function init(){
		topmenu.init();
		analyzeSearch.init();
		mainNav.init();
		pagination.init();
	}

	return{
		init: init,
		topmenu: topmenu.init,
		pagination : pagination.init
	};
});