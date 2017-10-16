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
	

	//获取用户名
	var vipName='';
	seajs.use("cookieTools",function(myCookie){
		vipName=myCookie.cookie.getCookie("userPhone");
		if(vipName!=null){
			//获取购物车
			$(".goods-list-panel table").html("");
			$.get("php/getShoppingCart.php",{"vipName":vipName},function(data){
				if(data.length<=0){
					$("#shopcar-info").css("display","none");
					$("#noGoodsBox").css("display","block");
					$(".loginTip").css("display","inline-block");
					$(".unLoginTip").css("display","none");
					$("#noGoodsBox div:first").css("padding-left","500px");
				}else{
					$("#shopcar-info").css("display","block");
					$("#noGoodsBox").css("display","none");
				}
				for(let i in data){
					let td1="<tr align='center'><td width='35' class='checkbox'><span></span></td>";
					let td2="<td width='135'><a href='javascript:;'><img src="+data[i].goodsImg+" alt='' width='100' height='100'/></a></td>";
					let td3="<td width='602' align='left'><a href='javascript:;'><p>"+data[i].goodsDesc+"</p><ul><li>颜色:<span>酒红色</span></li><li>尺寸:<span>S</span></li></ul></a></td>";
					let td4="<td width='135' class='priceColor'>￥"+data[i].goodsPrice+"</td>";
					let td5="<td width='106' class='changeGoodNum'><span class='minusNum'>-</span><span class='goodNum'>"+data[i].goodsCount+"</span><span class='addNum'>+</span></td>";
					let td6="<td width='125' class='priceColor goodPrice' id='goodPrice"+i+"'>￥"+data[i].goodsPrice*data[i].goodsCount+"</td>";
					let td7="<td width='62' class='deleteGood'><span>×</span></td></tr>";
					let tableHtml=td1+td2+td3+td4+td5+td6+td7;
					$(".goods-list-panel table").append(tableHtml);
					
					let sum=0;
					//更改商品总价
					let goodsPriceArr=$(".priceColor[id]");
					for(let i=0;i<goodsPriceArr.length;i++){
						let priceStr=$(goodsPriceArr[i]).html();
						sum+=Number(priceStr.substring(1));
					}
					$("#goods-nun").html(goodsPriceArr.length);
					$("#goods-priceSum").html("￥"+sum);
					$("#priceAll").html("￥"+sum);
				}
				control(data);
			},"json");
		}else{//用户名为空
			$("#shopcar-info").css("display","none");
			$("#noGoodsBox").css("display","block");
			$(".loginTip").css("display","none");
			$(".unLoginTip").css("display","inline-block");
			$("#noGoodsBox div:first").css("padding-left","424px");
		}
	});
	
	function control(data){
		let goodsList=data;
		//修改商品数量
		$(".changeGoodNum").click(function(event){
			let $that=$(event.target);//事件源
			let index=$(".changeGoodNum").index($that.parent());
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
			//访问后端，更新数据库信息
			$.get("php/updateGoodsCount.php",{"vipName":vipName,"goodsId":data[index].goodsId,"goodsCount":num},function(data){
				if(data=="1"){//数据库更新成功后。更改商品数量
					$that.siblings(".goodNum").html(num);
					$("#goodPrice"+index).html("￥"+goodsList[index].goodsPrice*num);
					let sum=0;
					//更改商品总价
					let goodsPriceArr=$(".priceColor[id]");
					for(let i=0;i<goodsPriceArr.length;i++){
						let priceStr=$(goodsPriceArr[i]).html();
						sum+=Number(priceStr.substring(1));
					}
					$("#goods-nun").html(goodsPriceArr.length);
					$("#goods-priceSum").html("￥"+sum);
					$("#priceAll").html("￥"+sum);
				}
			});

		});
		
		//删除商品
		$(".deleteGood span").click(function(event){
			let $that=$(event.target);//事件源
			let index=$(".deleteGood span").index($that);
			//访问后端，删除数据库信息
			$.get("php/deleteGoods.php",{"vipName":vipName,"goodsId":data[index].goodsId},function(data){
				if(data=="1"){//数据库删除成功后删除dom元素
//					$(".goods-list-panel table")[0].deleteRow(index);
					let $tr=$that.parent().parent();
					$(".goods-list-panel table tbody")[0].removeChild($tr[0]);
				  	
					let sum=0;
					//更改商品总价
					let goodsPriceArr=$(".priceColor[id]");
					for(let i=0;i<goodsPriceArr.length;i++){
						let priceStr=$(goodsPriceArr[i]).html();
						sum+=Number(priceStr.substring(1));
					}
					$("#goods-nun").html(goodsPriceArr.length);
					$("#goods-priceSum").html("￥"+sum);
					$("#priceAll").html("￥"+sum);
				}
			});
		});
		
		//删除所有商品
		$(".deleteAllGoods").click(function(){
			//首先获取目前最新状态的所有商品
			let goodsIdArr=[];
			$.get("php/getShoppingCart.php",{"vipName":vipName},function(data){
				for(let i in data){
					goodsIdArr.push(data[i].goodsId);
				}
				//删除所有商品数据
				deleteAllGoods();
			},"json");
			
		function deleteAllGoods(){
			let isSuccess=true;
			for(let i in goodsIdArr){
				$.get("php/deleteGoods.php",{"vipName":vipName,"goodsId":goodsIdArr[i]},function(data){
					if(data=="0"){//数据库删除成功后删除dom元素
						isSuccess=false;
					}
				});
			}
			if(isSuccess){//如果数据全部删除成功，刷新页面，更改外观
				window.location.reload();
			}
		}
			
		});
		
		//全选、反选、回选
		//反选
		$(".checkbox").toggle(function(event){
			$(event.target).css("backgroundPosition","0px -80px");
		},function(event){
			$(event.target).css("backgroundPosition","-20px -80px");
		});
		
		//全选
		$(".common-info .checkbox,.checkAll-panel .checkbox").click(function(event){
			let bgPos=$(event.target).css("backgroundPosition");
			$(".checkbox span").checkAll(bgPos);
		});
		//根据店铺全选
		$(".shoptit .checkbox").click(function(event){
			let bgPos=$(event.target).css("backgroundPosition");
			$(".goods-list-panel span").checkAll(bgPos);
		});
		
		//回选
		$(".suplier-title .checkbox").click(function(){
			//商铺回选
			$(".goods-list-panel .checkbox span").backControl($(".shoptit .checkbox span"));
			//全选按钮的回选
			$(".goods-list-panel .checkbox span").backControl($(".common-info .checkbox span,.checkAll-panel .checkbox span"))
		});
	}
	
	//弹出层-收货信息
	$("#pay").click(function(){
		$(".layer").css({"display":"block"});
		$(".layer-cont").css({"left":"235px","top":"162px"});
	});
	
	$(".close").mousedown(function(event){
		$(".layer").css("display","none");
		let evt=event||window.event;
		myPreventDefault(evt);
	});
	
	//弹出层拖拽功能
	let isDown=false;
	let offsetX,offsetY;
	$(".layer-cont-tit").mousedown(function(event){
		isDown=true;
		let evt=event||window.event;
		offsetX=evt.offsetX;
		offsetY=evt.offsetY;
		myPreventDefault(evt);
	});
	$(document).mousemove(function(event){
		let evt=event||window.event;
		if(isDown){
			$(".layer-cont").css({
				"left":evt.pageX-$(this).scrollLeft()-offsetX,
				"top":evt.pageY-$(this).scrollTop()-offsetY
			});
		}
	});
	$(document).mouseup(function(){
		isDown=false;
	});
	
	//省市联动
	//获取省
	$(".province ul").html("<li>--请选择--</li>");
	$.get("php/myCity.json",function(data){
		for(let key in data){
			$(".province ul").append("<li>"+key+"</li>");
		}
		//改变省,市
		$(".province ul li").click(function(){
			$(".province>div").html($(this).html());
			$(this).parent().css('display',"none");
			
			//根据省，创建市
			$(".city ul").html("<li>--请选择--</li>");
			let province=$(".province>div").html();
			for(let i in data[province]){
				$(".city ul").append("<li>"+data[province][i].市名+"</li>");
			}
			
			let index=data[province].length;
			if($(".city ul li:eq("+index+")").html()==data[province][index-1].市名){
				$(".city ul li").click(function(){
					$(".city>div").html($(this).html());
					$(this).parent().css('display',"none");
				});
			}
		});
	},"json");
	
	//改变市
	function changeCity(){
		$(".city ul li").click(function(){
			$(".city>div").html($(this).html());
			$(this).parent().css('display',"none");
		});
	}

	$(".province>div,.city>div").toggle(function(){
			$(this).siblings().css('display',"block");
		},function(){
			$(this).siblings().css('display',"none");
		});

})

	jQuery.fn.extend({
		//全选
		checkAll:function(controllerChecked){
					this.css("backgroundPosition",controllerChecked);
				},

		//回选（根据选项回选控制按钮，如果选项全部被选中，控制按钮则被选中）
		backControl:function(controller){
						let bgPos="-20px -80px";
						$(this).each(function(){
							if($(this).css("backgroundPosition")=="0px -80px"){
								bgPos="0px -80px";
								controller.css("backgroundPosition",bgPos);
								return;
							}
						});
						controller.css("backgroundPosition",bgPos);
					}
	});
	
	function myPreventDefault(evt){
		if(evt.preventDefault){
			evt.preventDefault();
		}else{
			evt.returnValue=false;
		}
	}
	function stopBubble(evt){
		if(evt.stopPropagation){
			evt.stopPropagation();
		}else{
			evt.cancleBubble=false;
		}
	}

	
	
	