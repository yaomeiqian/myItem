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
				for(let i in data){
					let td1="<tr align='center'><td width='35' class='checkbox'><span></span></td>";
					let td2="<td width='135'><a href='javascript:;'><img src="+data[i].goodsImg+" alt='' width='100' height='100'/></a></td>";
					let td3="<td width='602' align='left'><a href='javascript:;'><p>"+data[i].goodsDesc+"</p><ul><li>颜色:<span>酒红色</span></li><li>尺寸:<span>S</span></li></ul></a></td>";
					let td4="<td width='135' class='priceColor'>￥"+data[i].goodsPrice+"</td>";
					let td5="<td width='106' class='changeGoodNum'><span class='minusNum'>-</span><span class='goodNum'>"+data[i].goodsCount+"</span><span class='addNum'>+</span></td>";
					let td6="<td width='125' class='priceColor' id='goodPrice"+i+"'>￥"+data[i].goodsPrice*data[i].goodsCount+"</td>";
					let td7="<td width='62' class='deleteGood'><span>×</span></td></tr>";
					let tableHtml=td1+td2+td3+td4+td5+td6+td7;
					$(".goods-list-panel table").append(tableHtml);
					control();
				}
			
			},"json");
		}
	});
	
	function control(){
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
			//访问后端，删除数据库信息
			
		});
		
		//全选、反选、取消
		$(".checkbox").toggle(function(event){
			$(event.target).css("backgroundPosition","0 -80px");
		},function(event){
			$(event.target).css("backgroundPosition","-20px -80px");
		});
		
		//全选
		$(".common-info .checkbox,.checkAll-panel .checkbox").click(function(){
			$(".checkbox").css("backgroundPosition",$(this).css("backgroundPosition"));
			console.log($(".checkbox").length);
			console.log($(this).css("background-position"));
		});
	}
	
})

	//全选
	function checkAll(controllerChecked){
		this.each(function(){
			this.css("backgroundPosition")=controllerChecked;
		});
	}
	//反选
	function checkedReverse(){
		this.each(function(){
			this.checked=!this.checked;
		});
	}
	//回选（根据选项回选控制按钮，如果选项全部被选中，控制按钮则被选中）
	function backControl(controller){
		let isChecked=true;
		$(this).each(function(){
			if(this.checked==false){
				isChecked=false;
			}
			controller.checked=isChecked;
		});
	}