var aa=123;
console.log(aa);
// 当页面加载完成时候
window.onload=function(){
	var button=document.getElementsByClassName("button");
    console.log(button);
	// 当点击按钮消失
	button[0].onclick=function(){
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="none";

	}
	var pos=document.getElementsByClassName("pos");
	pos[0].onclick=function(){
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="block";
	}
}


$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		var city=obj.data;
		console.log(city);
	}
})



$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		var weather=obj.data;
		console.log(weather);
		// var tem=tianqi.weather
	}
})



// 1.当整个页面加载完成时才能对其进行操作
// 2.获取元素：document.getElementsByClassName("xxxx");
// 3.添加事件函数
// 4.进行样式的操作