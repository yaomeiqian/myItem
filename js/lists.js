$(function(){
	//	引入公共html结构(存在异步操作，JS可能无法加载完成，需要使用回调函数，并动态创建script文件)	
	function htmlLoad(){
		$("#lists-header").load("common.html header",navLoad);
	}
	function navLoad(){
		$("#lists-nav").load("common.html nav",asideLoad);
	}
	function asideLoad(){
		$("#lists-aside").load("common.html aside",footerLoad);
	}
	function footerLoad(){
		$("#lists-footer").load("common.html footer",scriptLoad);
	}
	function scriptLoad(){
		$("body").append("<script type='text/javascript' src='js/public.js'></script>");
	}
	htmlLoad();
	
	
	
})
