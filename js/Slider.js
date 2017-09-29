define(function(require,exports,module){

		function Slider(obj){
				//所在容器
				this.$box = obj.$box;
				this.width = obj.width;
				this.height = obj.height;
				this.ulPosition=obj.ulPosition;
				this.imgHref=obj.imgHref;
				this.leftBtn=obj.leftBtn;
				this.rightBtn=obj.rightBtn;
				
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
				
				this.leftBtn.click(function(){
					$(that.$box).stop();
					//1、数据处理
					let currOutOrd = that.currOrd;
					that.currOrd --;
					if(that.currOrd<1){
						that.currOrd=that.imgHref.length;
					}
					// //2、外观
					that.showImg(currOutOrd,that.currOrd);
				});
				
				this.rightBtn.click(function(){
					$(that.$box).stop();
					//1、数据处理
					let currOutOrd = that.currOrd;
					that.currOrd ++;
					if(that.currOrd>that.imgHref.length){
						that.currOrd=1;
					}
					
					// //2、外观
					that.showImg(currOutOrd,that.currOrd);
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
			
	exports.Slider=function(obj){
		new Slider(obj);
	}
});
