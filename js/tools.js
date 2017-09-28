jQuery.fn.extend({
//	轮播图
	FadeInOutSlider:function(obj){//轮播图
		obj.$box = this;
		function Slider(obj){
				//所在容器
				this.$box = obj.$box;
				this.width = obj.width;
				this.height = obj.height;
				this.ulPosition=obj.ulPosition;
				this.imgHref=obj.imgHref;
				
				//图片数组
				this.imgs = obj.imgs;
				
				//时间间隔
				this.timeSpace = obj.timeSpace;
				
				//按钮：
				this.btnObj = {
					width:obj.btnObj.width,
					height:obj.btnObj.height,
					borderColor:obj.btnObj.borderColor,
					bgColor:obj.btnObj.bgColor,
					highBgColor:obj.btnObj.highBgColor,
					highBorderColor:obj.btnObj.highBorderColor,
					marginLeft:obj.btnObj.marginLeft,
					isCircle : obj.btnObj.isCircle
				};
				
				this.myTimer =null;
				this.currOrd=1;//0出，1进
				
				this.initUI();
				this.initEvent();
				this.startGo();
			}
			
			//创建外观
			Slider.prototype.initUI = function(){
				for(let i=0;i<this.imgs.length;i++){
					this.$box.append('<img src="'+this.imgs[i]+'"/>');
				}
				let that = this;
				$(this.$box.selector+" img").css(
					{
						"position":"absolute",
						"opacity":"0",
						"top":"0px",
						"width":"100%",
						"height":"100%",
						"cursor":"pointer"
					}
				);
				$(this.$box.selector+" img").eq(0).css({"opacity":"1"});
				
				this.$box.append('<ul></ul>');
				$(this.$box.selector+" ul").css({
							"position":"absolute",
							"list-style":"none",
							"right":that.ulPosition.right+"px",
							"bottom":that.ulPosition.bottom+"px"		
				});
				for(let i=0;i<this.imgs.length;i++){
					$(this.$box.selector+" ul").append("<li></li>");	
				}
				$(this.$box.selector+" ul li").css({
						"float":"left",
						"margin-left":that.btnObj.marginLeft+"px",
						"width":that.btnObj.width+"px",
						"height":that.btnObj.height+"px",
						"border":"2px solid "+that.btnObj.borderColor,
						"background-color":that.btnObj.bgColor	
				});
				$(this.$box.selector+" ul li:eq(0)").css({
						"background-color":that.btnObj.highBgColor,
						"border":"2px solid "+that.btnObj.highBorderColor
				});
				if(this.btnObj.isCircle){
					$(this.$box.selector+" ul li").css({
							"border-radius":"50%"
					});	
				}
			}
			
			Slider.prototype.initEvent = function(){
				let that = this;
				this.$box.mouseover(function(){
					that.stopChange();
				});
				
				this.$box.mouseout(function(){
					that.startGo();
				});
				
				$(this.$box.selector+" img").click(function(){
					window.location.href=that.imgHref[that.currOrd-1];
				});
				
				$(this.$box.selector+" ul li").click(function(){
					that.goImg($(that.$box.selector+" ul li").index(this)+1);
				});	
			}
			
			//启动定时器
			Slider.prototype.startGo = function(){
				let that = this;
			   	this.myTimer = setInterval(function(){
				   	//1、数据处理
					let currOutOrd = that.currOrd;
					that.currOrd++;
					if(that.currOrd>that.imgs.length){
						that.currOrd=1;		
					}
					//2、改变外观
					that.showImg(currOutOrd,that.currOrd);
			   	},this.timeSpace);
			}
			
			//改变外观
			Slider.prototype.showImg=function(currOutOrd,currInOrd){
				//2、外观
					//1）、滑动的方式切换图片
					$(this.$box.selector+" img").eq(currOutOrd-1).animate({opacity:0},this.timeSpace/2);
					$(this.$box.selector+" img").eq(currInOrd-1).css({opacity:0});
					$(this.$box.selector+" img").eq(currInOrd-1).animate({opacity:1},this.timeSpace/2);
					//2）、改变按钮的外观
					$(this.$box.selector+" ul li").eq(currInOrd-1).css(
										{
										"backgroundColor":this.btnObj.highBgColor,
										"border":"2px solid "+this.btnObj.highBorderColor
									}).siblings().css(
										{"backgroundColor":this.btnObj.bgColor,
										"border":"2px solid "+this.btnObj.borderColor
									});
			}

			//停止定时器
			Slider.prototype.stopChange = function(){
				window.clearInterval(this.myTimer);	
			}
			
			//跳转到对应的图片上
			Slider.prototype.goImg = function(ord){
				if(ord==this.currOrd){
					return;
				}
				//1、数据处理
				let currOutOrd = this.currOrd;
				this.currOrd = ord;
				
				// //2、外观
				this.showImg(currOutOrd,this.currOrd);
			
			}	
			new Slider(obj);
	},
//	手风琴
	piano:function(obj){
			function Piano(obj){
				this.domObj=obj.domObj;
				this.width=obj.width;
				this.height=obj.height;
				this.imgArr=obj.imgArr;
				this.imgWidth=obj.imgWidth;
				this.imgSpace=obj.imgSpace;	
				this.bgColor=obj.bgColor;
				this.initUI();
				this.initEvent();
			}
			
			let arr=[];
			//记录对应的图片在当前显示的图片哪边；0表示在左边，需要右移，1表示在右边
			Piano.prototype.initUI=function(){
				let that=this;
				//创建ul
				$(this.domObj).append("<ul id='piano-ul'></ul>");
				//创建li
				for(let i=0;i<this.imgArr.length;i++){
					$("#piano-ul").append("<li><a href='http://ww.baidu.com'><img/></a><div></div></li>");
					arr.push(1);//初始化arr,默认全部在右边
				}
				//设置css
				$("#piano-ul").css({
					width:"100%",
					height:"100%",
					overflow:"hidden",
					position:"relative"
				});
				$("#piano-ul a").css({
					display:"inline-block",
					width:"100%",
					height:"100%"
				});
				$("#piano-ul li").css({
					position: "absolute",
					width:this.imgWidth+"px",
					height:"100%",
					paddingLeft:this.imgSpace+"px",
					background: this.bgColor
				});
				$("#piano-ul li").first().css("paddingLeft","0px");
				$("#piano-ul li>div").css({
					width:"100%",
					height:"100%",
					position: "absolute",
					left:this.imgSpace+"px",
					top:0,
					background: "rgba(0,0,0,.3)"
				});
				
				$("#piano-ul li>div").first().css("left","0px").addClass("curr");
				//让当前图片蒙层透明
				$("#piano-ul li>div").filter(".curr").css("display","none");
				
				//设置每个li初始left
				let width=(this.width-this.imgWidth-this.imgSpace*(this.imgArr.length-1))/(this.imgArr.length-1);
				$("#piano-ul li").each(function(i){
					let left=i>0?(width+that.imgSpace)*(i-1)+that.imgWidth:0;
					$(this).css("left",left);
				});
				//给每个图片添加src
				$("#piano-ul img").each(function(i){
					let index=$("#piano-ul img").index(this);
					$(this).width("100%");
					$(this).height("100%");
					$(this).attr("src",that.imgArr[index]);
				});
			}	
			Piano.prototype.initEvent=function(){
				let that=this;
				$("#piano-ul li").mouseenter(function(){
					let ord=$("#piano-ul li").index(this);
					$(this).siblings().children().removeClass("curr");
					$(this).children().last().addClass("curr");
					$("#piano-ul li>div").css("display","block");
					$("#piano-ul li>div").filter(".curr").css("display","none");
					if(arr[ord]==0||ord==0){
						that.moveRight(ord);
					}else{
						that.moveLeft(ord);
					}
				});
			Piano.prototype.moveLeft=function(ord){
				if(ord==0){
						return;
					}
				let that=this;
				$("#piano-ul li").stop();
				let width=(this.width-this.imgWidth-this.imgSpace*(this.imgArr.length-1))/(this.imgArr.length-1);
				$("#piano-ul li:lt("+ord+")").each(function(i){
					$(this).next().animate({
						left:(width+that.imgSpace)*(i+1)-that.imgSpace
					},1000);
					arr[i+1]=0;
				});
			}
			Piano.prototype.moveRight=function(ord){
				let that=this;
				$("#piano-ul li").stop();
				let width=(this.width-this.imgWidth-this.imgSpace*(this.imgArr.length-1))/(this.imgArr.length-1);
				$("#piano-ul li:gt("+ord+")").each(function(i){
					$(this).animate({
						left:(width+that.imgSpace)*(ord+i)-that.imgSpace+that.imgWidth
					},1000);
					arr[ord+i+1]=1;
				});
			}
			}
		new Piano(obj);
	}
	

});



	function goTop(top,timeOut){
		let myTimer=null;
		let inc=5;
		let timeSpace=timeOut/(top/inc);
		if(myTimer!=null){
			clearInterval(myTimer);
		}
		myTimer=setInterval(function(){
				top=top-5;
				if(top<=0){
					clearInterval(myTimer);
					myTimer=null;
				}
				$(document).scrollTop(top);
				console.log(top);
		},timeSpace);
	}
	