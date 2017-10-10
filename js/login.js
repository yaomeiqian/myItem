$(function(){
	//	引入公共html结构(存在异步操作，JS可能无法加载完成，需要使用回调函数，并动态创建script文件)	
	function footerLoad(){
		$(".login-footer").load("common.html footer",scriptLoad);
	}
	function scriptLoad(){
		$("body").append("<script type='text/javascript' src='js/public.js'></script>");
	}
	footerLoad();
	
	$("#autoLoginCheck").click(function(){
		if($("#autoLogin")[0].checked){
			$(".loginTit").html("请勿在公用电脑上勾选此选项");
		}else{
			$(".loginTit").html("下次自动登录");
		}
	});
	seajs.use("regExp",function(myRegExp){
		//手机号码验证
		$("#telePhone").blur(function(){
			isTelePhoneOk($(this));
		}).focus(function(){
			if($(this).val()==""){
				$(this).css("border","1px solid #d5cdda");	
					$("#telePhoneMsg").html("");
			}
		});
		
			//密码格式验证
		$("#userPass").blur(function(){
			isUserPassOk($(this));
		}).focus(function(){
			if($(this).val()==""){
				$(this).css("border","1px solid #d5cdda");	
					$("#userPassMsg").html("");
			}
		});
		
		$("#LogBtn").click(function(){
			let isFormatOK=false;
			//先判断格式
			isTelePhoneOk($("#telePhone"));
			if(isTelePhoneOk($("#telePhone"))){
				isUserPassOk($("#userPass"));
				if(isUserPassOk($("#userPass"))){
					isFormatOK=true;
				}
			}
			
			//判断用户名和登录密码
			if(isFormatOK){
				$.ajax({
					type:"post",
					url:"php/login.php",
					async:true,
					data:"userPhone="+$("#telePhone").val()+"&userPass="+$("#userPass").val(),
					success:function(data){
						if(data==1){
							//保存cookie
							seajs.use("cookieTools",function(myCookie){
								myCookie.cookie.addCookie("userPhone",$("#telePhone").val(),7);
								if(!$("#autoLogin")[0].checked){
									setTimeout(function(){
										myCookie.cookie.removeCookie("userPhone");
									},60000);
								}
							});
							window.location.href="index.html";
						}else if(data==0){
							$("#lastErrorMsg").html("用户名或密码错误").css("display","block");
						}
					}
				});
			}
			
		})
		
		
		//	判断手机号码合法性	
		function isTelePhoneOk($obj){
			if($obj.val()==""){
					$("#telePhoneMsg").html("请输入手机号");
					$obj.css("border","1px solid #f49f26");
					return false;
				}else{
					myRegExp.check.validator({mobliePhone:$obj.val()});
					if(myRegExp.check.errorMsgs.length>0) {
						$("#telePhoneMsg").html(myRegExp.check.errorMsgs[0]);
						$obj.css("border","1px solid #f49f26");
						return false;
					} else {
						$("#telePhoneMsg").html("");
						$obj.css("border","1px solid #d5cdda");
						return true;
					}
				}
		}
		
			//	登录密码合法性	
		function isUserPassOk($obj){
			if($obj.val()==""){
					$("#userPassMsg").html("请输入登录密码");
					$obj.css("border","1px solid #f49f26");
				}else{
					myRegExp.check.validator({userPass:$obj.val()});
					if(myRegExp.check.errorMsgs.length>0) {
						$("#userPassMsg").html("登录密码格式错误");
						$obj.css("border","1px solid #f49f26");
					} else {
						$("#userPassMsg").html("");
						$obj.css("border","1px solid #d5cdda");		
						return true;
					}
				}
		}
		
	});
	
})
