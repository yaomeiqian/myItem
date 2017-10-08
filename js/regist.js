$(function(){
	//	引入公共html结构(存在异步操作，JS可能无法加载完成，需要使用回调函数，并动态创建script文件)	
	
	function footerLoad(){
		$(".regist-footer").load("common.html footer",scriptLoad);
	}
	function scriptLoad(){
		$("body").append("<script type='text/javascript' src='js/public.js'></script>");
	}
	footerLoad();
	
	seajs.use("regExp",function(myRegExp){
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
		
		//	判断图片验证码合法性	
	function isImgCheckOk($obj){
		if($obj.val()==""){
				$("#imgCheckMsg").html("请先输入图片验证码");
				$obj.css("border","1px solid #f49f26");
			}else{
				myRegExp.check.validator({imgCheckMa:$obj.val()});
				if(myRegExp.check.errorMsgs.length>0) {
					$("#imgCheckMsg").html(myRegExp.check.errorMsgs[0]);
					$obj.css("border","1px solid #f49f26");
				} else {
					$("#imgCheckMsg").html("");
					$obj.css("border","1px solid #d5cdda");
					imgCheckOK=true;
				}
			}
	}
	
		//	短信验证码合法性	
	function isMsgCheckOk($obj){
		if($obj.val()==""){
				$("#messageCheckMsg").html("请输入短信验证码");
				$obj.css("border","1px solid #f49f26");
			}else{
				myRegExp.check.validator({msgCheckMa:$obj.val()});
				if(myRegExp.check.errorMsgs.length>0) {
					$("#messageCheckMsg").html(myRegExp.check.errorMsgs[0]);
					$obj.css("border","1px solid #f49f26");
				} else {
					$("#messageCheckMsg").html("");
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
					$("#userPassMsg").html(myRegExp.check.errorMsgs[0]);
					$obj.css("border","1px solid #f49f26");
				} else {
					$("#userPassMsg").html("");
					$obj.css("border","1px solid #d5cdda");		
					return true;
				}
			}
	}
	
	//登录密码一致性判断
	function isUserPassCheckOK($obj){
		if($obj.val()==""){
			$("#userPassCheckMsg").html("请再次输入登录密码");
			$obj.css("border","1px solid #f49f26");
			
		}
		if($obj.val()!=$("#userPass").val()&& $obj.val()!=""){
			$("#userPassCheckMsg").html("两次密码输入不一致，请重新输入");
			$obj.css("border","1px solid #f49f26");
		}
		if($obj.val()==$("#userPass").val()&& $obj.val()!=""){
			$("#userPassCheckMsg").html("");
			$obj.css("border","1px solid #d5cdda");
			return true;
		}
	}
		
		//手机号码验证
		$("#telePhone").blur(function(){
			isTelePhoneOk($(this));
		}).focus(function(){
			if($(this).val()==""){
				$(this).css("border","1px solid #d5cdda");	
					$("#telePhoneMsg").html("");
			}
		});
		
//		获取短信验证码
		let imgCheckMaArr=[{
					"imgUrl":"img/check1.png",
					"tit":"FMKN"
			},{
					"imgUrl":"img/check2.png",
					"tit":"3ZAF"
			},{
					"imgUrl":"img/check3.png",
					"tit":"PU1Z"
			},{
					"imgUrl":"img/check4.png",
					"tit":"PHFA"
			},{
					"imgUrl":"img/check5.png",
					"tit":"YCQB"
			},{
					"imgUrl":"img/check6.png",
					"tit":"QS3L"
			},{
					"imgUrl":"img/check7.png",
					"tit":"7NED"
			},{
					"imgUrl":"img/check8.png",
					"tit":"XVRP"
			},{
					"imgUrl":"img/check9.png",
					"tit":"YAHH"
			},{
					"imgUrl":"img/check10.png",
					"tit":"3TAQ"
			}];
		let t;//记录图片验证码下标
		let checkMaClick=true;//图片验证码没显示是true；
		let imgCheckOK=false;
		$("#getMessageCheck").click(function(){
			
			if($("#telePhoneMsg").html()=="验证码已发出，请在10分钟内完成输入。" && $("#getMessageCheck").val!="获取验证码"){
				return;
			}
	
			isTelePhoneOk($("#telePhone"));//第一步：判断手机号码的合法性
			
			if(isTelePhoneOk($("#telePhone"))&&checkMaClick){
				
				$("#imgCheckLi").css("display","block");//第二步：显示图片验证码

				t=parseInt(Math.random()*10);
				$(".imgCheckShow").css("background","url("+imgCheckMaArr[t].imgUrl+")");
				checkMaClick=false;
				
			}else if(!checkMaClick){//第三步：在图片验证码显示后，如果点击“获取验证码”，首先验证图片验证码格式是否正确
				
				isImgCheckOk($("#imgCheck"));
				
			}
			
				//第四步:如果图片验证码显示并且合法,判断图片验证码是否和图片输入一致，如果不一致在$("#lastErrorMsg")中显示“图片验证码错误”，然后重新获取图片验证码
			// 如果一致，获取短信验证码
			if(!checkMaClick && imgCheckOK && isTelePhoneOk($("#telePhone"))){
			
				if($("#imgCheck").val()==imgCheckMaArr[t].tit.toLowerCase()){

					
					//首先检测该手机号是否被注册过，如果被注册过$("#lastErrorMsg")提示“该手机号已注册过必要，请前往登录”
					$.get("php/regist.php",{userPhone:$("#telePhone").val()},function(data){
						if(data=="0"){
							$("#lastErrorMsg").html("该手机号已注册过必要，请前往  <a href='#'>登录</a>").css("display","block");	
						}else if(data=="1"){
							//获取短信验证码
							
							//改变外观，隐藏短信验证码输入框
							$("#imgCheck").val("");
							$("#lastErrorMsg").css("display","none");	
							$("#imgCheckLi").css("display","none");
							checkMaClick=true;		
							$("#telePhoneMsg").html("验证码已发出，请在10分钟内完成输入。");
							$("#getMessageCheck").val("重新发送("+30+"s)");
							$("#getMessageCheck").css("background","gray");	
							let t=29;
							let myTimer=setInterval(function(){
								$("#getMessageCheck").val("重新发送("+t+"s)");
								$("#getMessageCheck").css("background","gray");	
								t--;
								if(t<=0){
									t=0;
									$("#getMessageCheck").css("background","#724a88");
									$("#getMessageCheck").val("获取验证码");									
									clearInterval(myTimer);
									return;
								}
							
							},1000);

						}
					})
					
				}else if($("#imgCheck").val()!=""){
					$("#imgCheck").val("");
					t=parseInt(Math.random()*10);//重新换图片验证码
					$(".imgCheckShow").css("background","url("+imgCheckMaArr[t].imgUrl+")");
					$("#lastErrorMsg").html("图片验证码错误").css("display","block");
					checkMaClick=false;
				}
			}		

		});
		
		//切换验证码
		$(".changImg").click(function(){
			t=parseInt(Math.random()*10);
			$(".imgCheckShow").css("background","url("+imgCheckMaArr[t].imgUrl+")");
		});
		
		//图片验证码格式验证
		$("#imgCheck").blur(function(){
			isImgCheckOk($(this));
		}).focus(function(){
			if($(this).val()==""){
				$(this).css("border","1px solid #d5cdda");	
					$("#imgCheckMsg").html("");
			}
		});;
		
		//短信验证码格式验证
		$("#messageCheck").blur(function(){
			isMsgCheckOk($(this));
		}).focus(function(){
			if($(this).val()==""){
				$(this).css("border","1px solid #d5cdda");	
					$("#messageCheckMsg").html("");
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
		
		//密码一致性判断、
		$("#userPassCheck").blur(function(){
			isUserPassCheckOK($(this));
		}).focus(function(){
			if($(this).val()==""){
				$(this).css("border","1px solid #d5cdda");	
					$("#userPassCheckMsg").html("");
			}
		});
		
		//点击注册
		$("#regBtn").click(function(){
			let isFormatOK=false;
			let msgCheck=false;
			//先判断格式
			isTelePhoneOk($("#telePhone"));
			if(isTelePhoneOk($("#telePhone"))){
				if($("#imgCheckLi").css("display")=="block"){
					isImgCheckOk($("#imgCheck"));
					if(imgCheckOK){
						isMsgCheckOk($("#messageCheck"));
						if(isMsgCheckOk($("#messageCheck"))){
							msgCheck=true;
						}
					}
				}else{
					isMsgCheckOk($("#messageCheck"));
					if(isMsgCheckOk($("#messageCheck"))){
							msgCheck=true;
					}
				}
				if(msgCheck){
					isUserPassOk($("#userPass"));
					if(isUserPassOk($("#userPass"))){
						isUserPassCheckOK($("#userPassCheck"));
						if(isUserPassCheckOK($("#userPassCheck"))){
							if(checkMaClick){
								$("#lastErrorMsg").html("请先获取验证码").css("display","block");
							}else{
								isImgCheckOk($("#imgCheck"));
								if(imgCheckOK){
									isFormatOK=true;
								}	
							}
						}
					}
				}
			}
			//格式正确后访问后端判断
			if(isFormatOK){
				//ajax访问后端，判断手机号码
				$.ajax({
					type:"get",
					url:"php/regist.php",
					async:true,
					data:"userPhone="+$("#telePhone").val(),
					success:function(data){
						if(data=="0"){
							$("#lastErrorMsg").html("该手机号已注册过必要，请前往  <a href='#'>登录</a>").css("display","block");	
						}else if(data=="1"){
							//ajax访问后端，判断短信验证码
							$.get("php/checkMsg.php",{userMsgCheck:$("#messageCheck").val()},function(data){
								if(data=="1"){
									if($("#agree")[0].checked){
										//保存cookie
										seajs.use("cookieTools",function(myCookie){
											myCookie.cookie.addCookie("userPhone",$("#telePhone").val(),7);
										});
										
										window.location.href="index.html";
									}
								}else if(data=="0"){
									$("#lastErrorMsg").css("display","block");
									
									if($("#lastErrorMsg").html()=="验证码错误，请重新输入"){
										$("#lastErrorMsg").html("验证码超时，请重新输入");
									}else if($("#lastErrorMsg").html()=="验证码超时，请重新输入"){
										$("#lastErrorMsg").html("验证码超时，请重新输入");
									}else{
										$("#lastErrorMsg").html("验证码错误，请重新输入");
										
									}
								}
							});
						}
					}
				
				});
			}
			
			
		});
		
		
		
	});
	
	
	
});


