$(function(){
	//	引入公共html结构
	function htmlLoad(){
		$("#details-header").load("common.html header",navLoad);
	}
	function navLoad(){
		$("#details-nav").load("common.html nav",asideLoad);
	}
	function asideLoad(){
		$("#details-aside").load("common.html aside",footerLoad);
	}
	function footerLoad(){
		$("#details-footer").load("common.html footer",scriptLoad);
	}
	function scriptLoad(){
		$("body").append("<script type='text/javascript' src='js/public.js'></script>");
//		$("body").append("<script type='text/javascript' src='js/jQueryTools.js'></script>");
	}
	htmlLoad();
	
//	nav公共部分更改,此页面需要去掉一些功能
	$(window).scroll(function(){
		if($(document).scrollTop()>400){
			$(".nav-cont").css("display","none");
		}else{
			$(".nav-cont").css("display","block");
		}
	});
	
	//	主要部分
//	获取商品信息
//	获取商品的goodsId
	let hrefStr=location.href;
	let hrefAarr=hrefStr.split("?");
	let goodsId=hrefAarr[1].substring("goodsId=".length);
	
	let goodsList=["goods-pic1.jpg","goods-pic2.jpg","goods-pic3.jpg","goods-pic4.jpg","goods-pic5.jpg"];
	$.get("php/getGoodsInfo.php",{"goodsId":goodsId},function(data){
		
		goodsList[0]=data.goodsImg.substring(4);
		$("#goodsPic").css("backgroundImage","url("+data.goodsImg+")");
		//整体设置商品列表图片#goods-list
		$("#goods-list li").each(function(i){
			$(this).css("backgroundImage","url(img/"+goodsList[i]+")");
		}).click(function(){
			//点击切换商品图片
			$("#goodsPic").css("backgroundImage",$(this).css("backgroundImage"));
			$(this).css("border","1px solid #523669").siblings().css("border","1px solid #cccccc");
		});

	},"json");

	//添加放大镜
	$("#goodsPic").mouseenter(function(){
	 	$(this).bigMirror({
	 				boxDom : $("#goodsPic")[0],
	 				width : 230,
	 				height : 230,
	 				multiple : 2,
	 				opacity : 0.3,
	 				bgColor : "white",	
	 				bigObj : {
	 					showPosition:"右"
	 				}
	 	});
	 });
	
	//goods-specs选择商品规格
	$(".goods-specs-list li").click(function(){
		$(this).css("border","1px solid #523669").siblings().css("border","1px solid #cccccc");
		let lis=$(this).siblings();
		$(this).children("span").addClass("specs-active");
		lis.children("span").removeClass("specs-active");
	});
	
	$(".goods-size-list li").click(function(){
		$(this).css("border","1px solid #523669").siblings().css("border","1px solid #cccccc");
		let lis=$(this).siblings();
		$(this).children("span").addClass("specs-active");
		lis.children("span").removeClass("specs-active");
	});
	
	//点击goods-num-panel商品数量变化
	$(".goods-num-panel").click(function(event){
		let sym=$(event.target).html();//事件源
		let num=$(".goods-num").html();
		if(sym=="-"){
			num--;
		}else if(sym=="+"){
			num++;
		}
		if(num<=1){
			num=1;
		}
		$(".goods-num").html(num);
	});
	
//	sectionView-header
	//滚动条滚动到一定高度时，sectionView-header成为固定定位
	let isScroll=true;
	$(window).scroll(function(){
		let $shopcar=$(".sectionView-header").children(".addShopCar");
		if($(document).scrollTop()>=700 && isScroll){
			$shopcar.css("display","block");
			$(".sectionView-header").css({"position":"fixed","top":"0","display":"none"}).slideDown("slow");
			isScroll=false;
		}else if($(document).scrollTop()<700){
			isScroll=true;
			$shopcar.css("display","none");
			$(".sectionView-header").css({"position":"static","display":"block"});
		}
	});
	//选择规格，显示选中状态
	$(".sectionView-focus li").click(function(){
		$(this).css({"color":"#523669","background":"#fff"}).siblings().css({"color":"#000","background":"#eeecef"});
		$(".sectionView-focus li i").css("display","none");
		$(this).children("i").css({"display":"block"});
	});
	$(".sectionView-focus li").each(function(i){
		$(this).click(function(){
			$(".aside-right>div").css("display","none");
			$(".aside-right>div:eq("+i+")").css("display","block");
		});
	});
	
	//加入购物车
	$(".addShopCar").click(function(){
		//获取cookie（用户名）
		let vipName="";
		seajs.use("cookieTools",function(myCookie){
			vipName=myCookie.cookie.getCookie("userPhone");
		});
		if(vipName==null){
			window.location.href="login.html";
		}else{
			$.get("php/addShoppingCart.php",{"vipName":vipName,"goodsId":goodsId,"goodsCount":$(".goods-num").html()},function(data){
				if(data=="1"){
					window.open("shopcar.html");
				}
			});
		}
	});
})
