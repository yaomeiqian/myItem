$(function(){
	//	引入公共html结构(存在异步操作，JS可能无法加载完成，需要使用回调函数，并动态创建script文件)	
	
	function footerLoad(){
		$(".regist-footer").load("common.html footer",scriptLoad);
	}
	function scriptLoad(){
		$("body").append("<script type='text/javascript' src='js/public.js'></script>");
	}
	footerLoad();

	
	
});
