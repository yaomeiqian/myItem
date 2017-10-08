define(function(require,exports,module){
	var cookie={
		addCookie:function(key,value,dayCount,path,domain){
					addCookie(key,value,dayCount,path,domain);
				},
		removeCookie:function(key){
					removeCookie(key);
			},
		getCookie:function(key){
					return getCookie(key);
				}
	};
	function addCookie(key,value,dayCount,path,domain){
		let d=new Date();
		d.setDate(d.getDate()+dayCount);
		let str=key+"="+escape(value)+";expires="+d.toGMTString();
		if(path){
			str+=";path="+path;
		}
		if(domain){
			str+=";domain="+domain;
		}
		document.cookie=str;
	}
	
	function removeCookie(key){
		addCookie(key,"",-1);
	}
	
	function getCookie(key){
		 let str=unescape(document.cookie);
		 let arr=str.split("; ");
		 for(let i in arr){
			 if(arr[i].indexOf(key+"=")==0){
				 return arr[i].substring(key.length+1);
			 }
		 }
		 return null;
	 }
	exports.cookie=cookie;
})

