<?php
	header("Content-type:text/html;charset=utf-8");
//	$userMsgArr=array(0=>array('phone'=>'15991792863',"userPass"=>'163yao163'),1=>array('phone'=>'13892525077',"userPass"=>'666666aaa'));
	$userPhone=$_POST['userPhone'];
	$userPass=$_POST['userPass'];
	
	//1、连接数据库，判断用户名是否可用
	$con=mysql_connect("localhost","root","root");//$con是连接对象
	if(!$con){//连接失败
		die("连接失败".myql_error());//执行后直接退出，不会执行下面语句
	}
	
	//2、选择数据库
	mysql_select_db("biyaodb",$con);
	
	//3、执行sql语句
	//查询数据(用户手机号)
	$sqlStr="select * from userinfor where userPhone='".$userPhone."'and userPass='".$userPass."'";
	
	$result=mysql_query($sqlStr,$con);
	
	//4、关闭数据库
	mysql_close($con);
	
		//判断登录是否成功
	if(mysql_num_rows($result)==1){
		echo "1";
	}else if(mysql_num_rows($result)==0){
		echo "0";
	}
	
	
	
	
	
	
	
//	$val;
//	for($i=0;$i<count($userMsgArr);$i++){
//		if($userMsgArr[$i]['phone']==$userPhone && $userMsgArr[$i]['userPass']==$userPass){
//			$val=1;
//			break;
//		}else{
//			$val=0;
//		}
//	}
//	echo $val;
?>