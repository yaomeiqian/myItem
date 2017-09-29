
$(function(){
	//	nav导航栏
	//导航栏搜索提示信息li
	let searchArr=["面膜","拉杆箱","儿童玩具","精华","雨伞","收纳","西服","洗护","床品套件"];
	//创建li
	for(let i=0;i<searchArr.length;i++){
		$("#reminder").append("<li>"+searchArr[i]+"</li>")
	}
	$("#reminder>li").css({
			height:26,
			lineHeight: "26px",
			textIndent:10,
			fontSize:12,
			color:"#595655"
		}).hover(function(){
			$(this).css("background","#eee");
		},function(){
			$(this).css("background","white");
		});
	$("#search-input").focus(function(){
		$("#reminder").css({
			"display":"block"
		});
	});
	var isClickLi=true;//防止点击li时触发blur事件，添加变量控制触发
	$("#reminder li").mouseenter(function(){
		isClickLi=false;
	});
	$("#reminder li").mouseleave(function(){
		isClickLi=true;
	});
	$("#reminder li").click(function(){
		$("#search-input").val(this.innerText);
		$("#reminder").css("display","none");
	});
	$("#search-input").blur(function(){
		if(!isClickLi){
			return;
		}
		$("#reminder").css("display","none");
	});
	
	$(".nav-list>li>p").hover(function(){
		$(this).next().css("display","block");
		
	},function(){
		$(this).next().css("display","none");
	});
	$(".list-content").mousemove(function(){
		$(this).css("display","block");
	});
	$(".list-content").mouseout(function(){
		$(this).css("display","none");
	});
	$(".nav-list>li").hover(function(){
		$(this).css("background","rgba(130,130,130,.8)");
		
	},function(){
		$(this).css("background","none");
	});
	
//	滚动条滚动一段距离后,nav栏高度变化,全部商品列表显示
	let isScroll=true;
	$(window).scroll(function(){
		if($(document).scrollTop()>530&&isScroll){
			$(".nav-cont").height(60);
			$(".logo").css("display","none");
			$(".nav-category").css("display","block");
			$(".good-search").css("marginTop","10px");
			$("nav").css({
				"position":"fixed",
				"top":0
			});
			//让导航栏缓慢显示
			$("nav").css("display","none");
			$("nav").slideDown();
			isScroll=false;
		}else if($(document).scrollTop()<=530){
			isScroll=true;
			$("nav").css("display","block");
			$(".nav-cont").height(98);
			$("nav").css("position","static");
			$(".logo").css("display","block");
			$(".nav-category").css("display","none");
			$(".good-search").css("marginTop","30px");
		}
	});
	
	//侧边栏效果
	let isBar=true;
	$(window).scroll(function(){
		if($(document).scrollTop()>0&&isBar){
			isBar=false;
			$(".rightBar-top").animate({"opacity":1},800);
		}else if($(document).scrollTop()==0){
			isBar=true;
			$(".rightBar-top").animate({"opacity":0},800);
		}
	});
	$(".appear").hover(function(){
			$(".ewmCode").css("display","block");
		},function(){
			$(".ewmCode").css("display","none");
		});
	$(".ewmCode").hover(function(){
			$(this).css("display","block");
		},function(){
			$(this).css("display","none");
		});
			
	//滚动条缓慢回到顶部
	seajs.use("goTop",function(mygoTop){
		$(".rightBar-top").click(function(){
			let barTop=$(document).scrollTop(); 
			mygoTop.goTop(barTop,200);
		});
	})
	

	//footer
	
	

});
