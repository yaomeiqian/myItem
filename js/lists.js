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
	
//动态获取并创建商品列表
//[
//{
//'goodsId':'01001',
//'goodsName':'李宁牌运动鞋' ,
//'goodsType':'运动鞋',
//'goodsPrice':'350' ,
//'goodsCount':'0',
//'goodsDesc':'' ,'goodsImg':'','beiyong1':'' ,'beiyong2':'','beiyong3':'' ,'beiyong4':'','beiyong5':'' ,'beiyong6':'','beiyong7':'' ,'beiyong8':'','beiyong9':'' ,'beiyong10':'','beiyong11':'' ,'beiyong12':'','beiyong13':'' }
//,
//{ 'goodsId':'01002','goodsName':'耐克' ,'goodsType':'运动','goodsPrice':'400' ,'goodsCount':'0','goodsDesc':'' ,'goodsImg':'','beiyong1':'' ,'beiyong2':'','beiyong3':'' ,'beiyong4':'','beiyong5':'' ,'beiyong6':'','beiyong7':'' ,'beiyong8':'','beiyong9':'' ,'beiyong10':'','beiyong11':'' ,'beiyong12':'','beiyong13':'' }
//]
	$(".lists-cont-goods ul").html("");//先清除内容
	
	$.get("php/getGoodsList.php",function(data){
		for(let i in data){
			//动态创建li
			$(".lists-cont-goods ul").append("<li><a href='javascript:;'><img src='"+data[i].goodsImg+"' alt=''/><p>"+data[i].goodsDesc+"</p><span>￥"+data[i].goodsPrice+"</span></a></li>");
		}
		
		//点击商品进入响应的详情页面
		$(".lists-cont-goods ul li").each(function(i){
			$(this).click(function(){
				window.open("details.html?goodsId="+data[i].goodsId);
//				window.location.href="details.html?goodsId="+data[i].goodsId;
			});
		});

	},"json");
	

})
