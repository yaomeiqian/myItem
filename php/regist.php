<?php
	header("Content-type:text/html;charset=utf-8");
	//获取输入
	$userPhone=$_GET['userPhone'];
	
	//1、连接数据库，判断用户名是否可用
	$con=mysql_connect("localhost","root","root");//$con是连接对象
	if(!$con){//连接失败
		die("连接失败".myql_error());//执行后直接退出，不会执行下面语句
	}
	
	//2、选择数据库
	mysql_select_db("biyaodb",$con);
	
	//3、执行sql语句
	//查询数据(用户手机号)
//	$sqlStr="select * from userinfor where userPhone='".$userPhone."'";
	$sqlStr="select * from userinfor where userPhone=".$userPhone;
	
	$result=mysql_query($sqlStr,$con);//返回值是搜索结果
	
	//4、关闭数据库
	mysql_close($con);
	
	//判断注册是否成功
	if(mysql_num_rows($result)==1){
		echo "0";
	}else{
		echo "1";
	}
	
//	$phoneArr[0]=15991792863;
//	$phoneArr[1]=13892525077;
//	$val;
//	for($i=0;$i<count($phoneArr);$i++){
//		if($phoneArr[$i]==$userPhone){
//			$val=0;
//			break;
//		}else{
//			$val=1;
//		}
//	}
//	echo $val;
?>