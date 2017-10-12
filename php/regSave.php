<?php
	header("Content-type:text/html;charset=utf-8");
	//获取用户登录
	$userPhone=$_POST['userPhone'];
	$userPass=$_POST['userPass'];
	
	//1、连接数据库，保存用户名和密码
	$con=mysql_connect("localhost","root","root");//$con是连接对象
	if(!$con){//连接失败
		die("连接失败".myql_error());//执行后直接退出，不会执行下面语句
	}
	
	//2、选择数据库
	mysql_select_db("biyaodb",$con);
	
	//3、执行sql语句
	//查询数据(用户手机号)
	$sqlStr="insert into userinfor values('".$userPhone."','".$userPass."')";
	$t=mysql_query($sqlStr,$con);
	
	//4、关闭数据库
	mysql_close($con);
	
	
	if($t==1){
		echo "1";
	}else{
		echo "0";
	}
?>