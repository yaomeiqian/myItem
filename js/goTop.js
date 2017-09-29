define(function(require,exports,module){
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
	exports.goTop=goTop;
})
	
	