$(function(){
	
//	引入公共html结构(存在异步操作，JS可能无法加载完成，需要使用回调函数，并动态创建script文件)	
	function htmlLoad(){
		$("#header").load("common.html header",navLoad);
	}
	function navLoad(){
		$("#nav").load("common.html nav",asideLoad);
	}
	function asideLoad(){
		$("#aside").load("common.html aside",footerLoad);
	}
	function footerLoad(){
		$("#footer").load("common.html footer",scriptLoad);
	}
	function scriptLoad(){
		$("body").append("<script type='text/javascript' src='js/public.js'></script>");
	}
	htmlLoad();

//	主要内容
//	banner轮播图
	let imgs=["img/banner01.jpg","img/banner02.jpg","img/banner03.jpg","img/banner04.jpg","img/banner05.jpg","img/banner06.jpg"];
	 $(".banner-focus").FadeInOutSlider({
   					"width" : 1080,
   					"height" : 360,		
   					//图片数组
   					"imgs" :imgs,
   					//时间间隔
   					"timeSpace" : 2000,
   					"imgHref":["#","#","#","#","#","#"],
   					"ulPosition":{
   						"right":362,
   						"bottom":24
   					},
   					"btnObj" : { //按钮的属性
   						"width":12,
   						"height":12,
   						"borderColor":"#53396b",
   						"bgColor":"transparent",
   						"highBgColor":"#f7b200",
   						"highBorderColor":"transparent",
   						"marginLeft":12,//li的margin-left
   						"isCircle": true
   					}
   			});
   			
	//news-laobi（时间自动获取）
	let	d=new Date();
	$("#laobi-time").html(d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate());
	
	//category-recommend01精选手风琴
	$("#piano").piano({
			domObj:$("#piano")[0],
			width:"1080",
			height:"280",
			imgArr:["img/piano01.jpg","img/piano02.jpg","img/piano03.jpg","img/piano04.jpg","img/piano05.jpg","img/piano06.jpg"],
			imgWidth:620,
			imgSpace:10,
			bgColor:"white"
		});



});
	
	
