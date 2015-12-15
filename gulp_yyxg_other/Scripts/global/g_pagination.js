define(function (require){
	// 所有鼠标移入显现二级菜单
	function init(){
		require.async('Scripts/hdf/ui/jqPaginator/jqPaginator.js',function(){
			$.jqPaginator('#pagination', {
		        totalPages: 100,
		        visiblePages: 8,
		        currentPage: 1,
		        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
		        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
		        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>'
		    });
		});
	}

	
	return{
		init: init
	};
});