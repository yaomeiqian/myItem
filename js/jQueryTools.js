//插件机制
jQuery.fn.extend({
	//购物车全选、取消、回选功能
	//全选
	checkAll:function(controllerChecked){
		this.each(function(){
			this.checked=controllerChecked;
		});
	},
	//反选
	checkedReverse:function(){
		this.each(function(){
			this.checked=!this.checked;
		});
	},
	//回选（根据选项回选控制按钮，如果选项全部被选中，控制按钮则被选中）
	backControl:function(controller){
		let isChecked=true;
		$(this).each(function(){
			if(this.checked==false){
				isChecked=false;
			}
			controller.checked=isChecked;
		});
	},

		//单例模式放大镜
//$("#original_box1").mouseenter(function(){
	// 	$(this).bigMirror({
	// 				boxDom : $("#original_box1")[0],
	// 				width : 80,
	// 				height : 80,
	// 				multiple : 3,
	// 				opacity : 0.3,
	// 				bgColor : "pink",	
	// 				bigObj : {
	// 					showPosition:"右"
	// 				}
	// 	});
		
	// });
	singleton:(function(){
			function BigMirror(obj){
				this.initData();
				this.updataData(obj);
			}
			BigMirror.prototype.initData=function(){
				this.mirrorDom=null;//动态创建
				this.left=0;
				this.top=0;
				
				this.showImgDom=null;
				this.bigObj={
					imgDom:null
				};
			}
			BigMirror.prototype.updataData=function(obj){
				this.boxDom=obj.boxDom;
				this.width=obj.width;
				this.height=obj.height;
				this.multiple=obj.multiple;
				this.bgColor=obj.bgColor;
				this.opacity=obj.opacity;
				this.bigObj.showPosition=obj.bigObj.showPosition;
				let left=0;
				let top=0;
				switch(this.bigObj.showPosition){
					case "上":left=0;top=-1*this.bigObj.height;break;
					case "右":left=this.boxDom.offsetWidth;top=-1;break;
					case "下":left=0;top=this.boxDom.offsetHeight;break;
					case "左":left=-1*this.bigObj.width;top=-1;break;
					default: ;
				}
				this.bigObj.left=left;
				this.bigObj.top=top;
				this.bigObj.width=this.width*this.multiple;
				this.bigObj.height=this.height*this.multiple;
			}

			BigMirror.prototype.initUI=function(){
				this.createAllDom();
				this.updateDomAttr();
			}
			BigMirror.prototype.createAllDom=function(){
				//创建放大镜
				this.mirrorDom=document.createElement("div");
				let cssStr="position:absolute;";
				this.mirrorDom.style.cssText=cssStr;
				
				//创建可视区域
				this.showImgDom=document.createElement("div");
				cssStr="position:absolute;overflow:hidden;border:1px solid black;z-index:10";
				this.showImgDom.style.cssText=cssStr;
				
				//创建放大图片
				this.bigObj.imgDom=document.createElement("img");
				cssStr="position:absolute;";
				this.bigObj.imgDom.style.cssText=cssStr;
				this.showImgDom.appendChild(this.bigObj.imgDom);	
			}
			BigMirror.prototype.updateDomAttr=function(){
				//创建放大镜
				this.mirrorDom.style.backgroundColor=this.bgColor;
				this.mirrorDom.style.opacity=this.opacity;
				this.mirrorDom.style.width=this.width+"px";
				this.mirrorDom.style.height=this.height+"px";
				this.boxDom.appendChild(this.mirrorDom);//换父元素

				//创建可视区域
				this.showImgDom.style.width=this.bigObj.width+"px";
				this.showImgDom.style.height=this.bigObj.height+"px";
				this.showImgDom.style.left=this.bigObj.left+"px";
				this.showImgDom.style.top=this.bigObj.top+"px";
				this.boxDom.appendChild(this.showImgDom);//换父元素
				
				//创建放大图片
				let imgSrc=getStyle(this.boxDom,"backgroundImage");//动态获取图片路径
				imgSrc=imgSrc.substring(5,imgSrc.length-2);
				this.bigObj.imgDom.src=imgSrc;
				this.bigObj.imgDom.style.width=this.boxDom.offsetWidth*this.multiple+"px";
				this.bigObj.imgDom.style.height=this.boxDom.offsetHeight*this.multiple+"px";
			}

			BigMirror.prototype.initEvent=function(){
				//事件监听器添加事件（防止网页该dom有相同的事件）
				let that=this;
				//先移除事件
				removeEvent(this.boxDom,"mouseover",boxDomonmouseover);
				//添加事件
				addEvent(this.boxDom,"mouseover",boxDomonmouseover,false);
				function boxDomonmouseover(event){
					let evt=event||window.event;
					let offsetX=evt.pageX-that.boxDom.offsetLeft;
					let offsetY=evt.pageY-that.boxDom.offsetTop;
					if((offsetX>0&&offsetX<that.boxDom.offsetWidth)&&(offsetY>0&&offsetY<that.boxDom.offsetHeight)){
						that.mirrorDom.style.display="block";
						that.showImgDom.style.display="block";
					}
				}
				
				removeEvent(this.boxDom,"mousemove",boxDomonmousemove);
				addEvent(this.boxDom,"mousemove",boxDomonmousemove);
				function boxDomonmousemove(event){
					let evt=event||window.event;
					//放大镜跟着鼠标走
					let left=evt.pageX-that.boxDom.offsetLeft-that.width/2;
					let top=evt.pageY-that.boxDom.offsetTop-that.height/2;
					
					//边界处理
					if(left<0){
						left=0;
					}else if(left>that.boxDom.offsetWidth-that.width){
						left=that.boxDom.offsetWidth-that.width;
					}
					if(top<0){
						top=0;
					}else if(top>that.boxDom.offsetHeight-that.height){
						top=that.boxDom.offsetHeight-that.height;
					}
					that.mirrorDom.style.left=left+"px";
					that.mirrorDom.style.top=top+"px";
					//让放大图片移动
					that.bigObj.imgDom.style.left=-1*left*that.multiple+"px";
					that.bigObj.imgDom.style.top=-1*top*that.multiple+"px";	
					stopBubble(evt);
				}	
				
				this.mirrorDom.onmouseout=function(){
					that.mirrorDom.style.display="none";
					that.showImgDom.style.display="none";
				};
				document.body.onmousemove=function(){
					that.mirrorDom.style.display="none";
					that.showImgDom.style.display="none";
				}
				
			}
				let instance;
				return {
					getInstance:function(obj){
						if(instance==undefined){
							instance=new BigMirror(obj);
							instance.initUI();
							instance.initEvent();
						}else{
							instance.updataData(obj);
							instance.updateDomAttr();
							instance.initEvent();
						}
						return instance;
					}
				}
			})(),
	bigMirror:function(obj){
		this.singleton.getInstance(obj);
	}	
});

function getStyle(obj,attrName){
	if(obj.currentStyle){//如果说能够得到dom.currentStyle。
		return obj.currentStyle[attrName];  //IE
	}else {
		return window.getComputedStyle(obj)[attrName];  //非IE
	}
}

//添加事件监听器

function addEvent(obj,eventType,func,isNoBubble){ //传入的事件不带on,false是冒泡
	if(obj.attachEvent){    //IE低版本
		obj.attachEvent("on"+eventType,func);
	}else if(obj.addEventListener){   //其他
		obj.addEventListener(eventType,func,isNoBubble);
	}else{
		obj["on"+eventType]=func;
	}
}

//移除事件监听器
function removeEvent(obj,eventType,func){ //传入的事件不带on
	if(obj.detachEvent){    //IE低版本
		obj.detachEvent("on"+eventType,func);
	}else{   //其他
		obj.removeEventListener(eventType,func);
	}
}

//阻止事件冒泡的兼容性函数
function stopBubble(evt){
	if(evt.stopPropagation){
		evt.stopPropagation();
	}else{
		evt.cancleBubble=true;
	}
}