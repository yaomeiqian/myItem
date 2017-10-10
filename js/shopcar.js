$(function(){
		//	引入公共html结构
	function htmlLoad(){
		$("#shopcar-header").load("common.html header",footerLoad);
	}
	function footerLoad(){
		$("#shopcar-footer").load("common.html footer",scriptLoad);
	}
	function scriptLoad(){
		$("body").append("<script type='text/javascript' src='js/public.js'></script>");
	}
	htmlLoad();
	
	//商品数量加减
	$(".changeGoodNum").click(function(event){
		let $that=$(event.target);//事件源
		let sym=$that.html();
		let num=$that.siblings(".goodNum").html();
		if(sym=="-"){
			num--;
		}else if(sym=="+"){
			num++;
		}
		if(num<=1){
			num=1;
		}
		$that.siblings(".goodNum").html(num);
	});
	//删除商品
	$(".deleteGood span").click(function(event){
		let $that=$(event.target);//事件源
		let index=$(".deleteGood span").index($that);
		$(".goods-list-panel table")[0].deleteRow(index);
	})
})
