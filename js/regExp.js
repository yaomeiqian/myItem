define(function(require,exports,module){
	var check={
		config:{},//配置数据
		types:{}, //每种类型的验证
		errorMsgs:[], //记录错误信息
		validator:function(data){//data是一个对象，键为要验证的类型，值是要验证的值
			this.errorMsgs=[];//清空错误信息数组
			for(let key in data){
				let checkName=this.config[key];
				if(!this.types[checkName].validator(data[key])){
					this.errorMsgs.push(this.types[checkName].errorMsg);
				}
			}
		}
	};
	check.config={
		mobliePhone:"isMobliePhone",
		imgCheckMa:"isImgCheckMa",
		msgCheckMa:"isMsgCheckMa",
		userPass:"isUserPass"
	};

	check.types.isMobliePhone={
		validator:function(data){
			var reg=/^1[3-9]\d{9}$/;
			return reg.test(data);
		},
		errorMsg:"手机号码格式错误"
	}
	
	check.types.isImgCheckMa={
		validator:function(data){
			var reg=/^[\da-zA-Z]{4}$/;
			return reg.test(data);
		},
		errorMsg:"图片验证码格式错误"
	}
	
	check.types.isMsgCheckMa={
		validator:function(data){
			var reg=/^\d{6}$/;
			return reg.test(data);
		},
		errorMsg:"短信验证码格式错误"
	}
	
	check.types.isUserPass={
		validator:function(data){
			var reg1=/\d/;
			var reg2=/[a-zA-Z]/;
			var symArr=["@","#","$","^","&"];
			var hasSym=false;
			if(data.length>=6&&data.length<=32){
				for(let i in symArr){
					if(data.indexOf(symArr[i])>=0){
						hasSym=true;
					}
				}
				return (reg1.test(data)&&reg2.test(data))||(reg1.test(data)&&hasSym)||(reg2.test(data)&&hasSym);
			}
			return false;
		},
		errorMsg:"请输入6-32位字符，需字母数字符号两种以上组合"
	}
	
	exports.check=check;
	
	
})
