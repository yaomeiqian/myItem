define(function(require,exports,module){
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
		
	exports.Piano=function(obj){
		new Piano(obj);
	}
});
