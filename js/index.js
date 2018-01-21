var city;

$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
	}
})
// 关于天气的信息
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		tianqi=obj.data;
		console.log(tianqi.city);

	}
})
// 页面加载函数
window.onload=function(){

	// 加载数据
	update();

	// 界面交互
	var pos=document.getElementsByClassName("pos")[0];

	// 点击城市出现城市详情页
	pos.onclick=function(){
		var city=document.getElementsByClassName("city")[0];
		city.style.display="block";
	}
	// 点击城市详情，跳转首页，出现该城市的天气状况
	var BOX=$(".city .citys .con .box");
	for(let i in BOX){
		BOX[i].onclick=function(){
			var chengshi=this.innerHTML;
			console.log(chengshi);
			// 调用AJAX函数；
			AJAX(chengshi);
		}
	}
	var searchBox=document.getElementsByClassName("searchbox")[0];
	var button=document.getElementsByClassName("button")[0]
	var text;
	searchBox.onfocus=function(){
		button.innerHTML="确认";
		text=searchBox.value;


	}
		button.onclick=function(){
	    var neirong=button.innerHTML;
		if(neirong=="取消"){
			var city3=document.getElementsByClassName("city")[0];
			city3.style.display="none";
		}else{
			for(let i in city){
				for(let j in city[i]){
					if(text==j){
						AJAX(text);
						return;
					}else{
						alert("没有这个城市");
						return;
					}
				}
			}
			
		}
	}
		

}
// 获取点击城市的天气信息
function AJAX(str){
	$.ajax({
	url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	dataType:"jsonp",
	method:"get",
	success:function(obj){
    tianqi=obj.data;
	update();
	var city2=$(".city")[0];
	city2.style.display="none";
		}
    })
}

// 获取数据的函数

function update(){
	// 当前城市
	var pos=document.getElementsByClassName("pos")[0];
	console.log(pos);
	pos.innerHTML=tianqi.city;

	// 当前空气质量
	var kongqi=document.getElementsByTagName("h5")[0];
	kongqi.innerHTML=tianqi.weather.quality_level;

	// 当前温度
	var current_temperature=document.getElementsByClassName("title1")[0];
	console.log(current_temperature);
	current_temperature.innerHTML=tianqi.weather.current_temperature+"°";

	// 当前天气状况
	var current_condition=document.getElementsByClassName("title2")[0];
	current_condition.innerHTML=tianqi.weather.current_condition;

	// 当前风的方向
	var wind_direction=document.getElementsByClassName("wind_der")[0];
	wind_direction.innerHTML=tianqi.weather.wind_direction;

	// 当前风的等级
	var wind_level=document.getElementsByClassName("wet")[0];
	wind_level.innerHTML=tianqi.weather.wind_level+"级";

	// 今天的天气情况图标
	var today_icon=document.getElementsByClassName("conPic")[0];
	today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;

	// 明天的天气图标
	var tomorrow_icon=document.getElementsByClassName("coPic")[0];
	tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;
	
	// 今天的最高温度
	var todayh=document.getElementsByClassName("heigher")[0];
	todayh.innerHTML=tianqi.weather.dat_high_temperature;

	// 今天的最低温度
	var todayl=document.getElementsByClassName("lower")[0];
	todayl.innerHTML=tianqi.weather.dat_low_temperature+"℃";

	// 明天的最低温度
	var toml=document.getElementsByClassName("loer")[0];
	toml.innerHTML=tianqi.weather.tomorrow_high_temperature+"℃";

	// 明天最高温度
	var tomh=document.getElementsByClassName("heger")[0];
	tomh.innerHTML=tianqi.weather.tomorrow_low_temperature;	

	// 每小时的天气情况
	var hourlyArr=tianqi.weather.hourly_forecast;
	var wrap=document.getElementsByClassName("wrap")[0];
	console.log(hourlyArr);
	for(let i in hourlyArr){
	var box1=document.createElement("div");
	box1.className="box";		

	var time=document.createElement("div");
	time.className="time"
	box1.appendChild(time);
	time.innerHTML=hourlyArr[i].hour+":00";

	var icon=document.createElement("div");
	icon.className="icon"
	box1.appendChild(icon);	
	icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`;


	var timeTem=document.createElement("div");
	timeTem.className="timeTem"
	box1.appendChild(timeTem);
	timeTem.innerHTML=hourlyArr[i].temperature+"°";
	
	wrap.appendChild(box1);
	}


	var dayArr=tianqi.weather.forecast_list;
	var wrap2=document.getElementsByClassName("wrap1")[0];
	console.log(dayArr);
	for(let i in dayArr){
		var box2=document.createElement("div");
		box2.className="box1";

		var date=document.createElement("div");
		date.className="date";
		box2.appendChild(date);
		date.innerHTML=dayArr[i].date;

		var condition=document.createElement("div");
		condition.className="tq1";
		box2.appendChild(condition);
		condition.innerHTML=dayArr[i].condition;

		var icon1=document.createElement("div");
		icon1.className="icon1";
		box2.appendChild(icon1);
		icon1.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`

		var tem1=document.createElement("div");
		tem1.className="tem1";
		box2.appendChild(tem1);
		tem1.innerHTML=dayArr[i].high_temperature;

		var tem2=document.createElement("div");
		tem2.className="tem2";
		box2.appendChild(tem2);
		tem2.innerHTML=dayArr[i].low_temperature;

		var icon2=document.createElement("div");
		icon2.className="icon2";
		box2.appendChild(icon2);
		icon2.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`		

		var tq2=document.createElement("div");
		tq2.className="tq2";
		box2.appendChild(tq2);
		tq2.innerHTML=dayArr[i].condition;

		var fx=document.createElement("div");
		fx.className="fx";
		box2.appendChild(fx);
		fx.innerHTML=dayArr[i].wind_direction;

		var fj=document.createElement("div");
		fj.className="fj";
		box2.appendChild(fj);
		fj.innerHTML=dayArr[i].wind_level; 


		wrap2.appendChild(box2);

	}

	var city1=document.getElementsByClassName("city")[0];
	for(let i in city){
		var citys=document.createElement("div");
		citys.className="citys";

		var title=document.createElement("div");
		title.className="title";
		title.innerHTML=i;
		citys.appendChild(title);

		var con=document.createElement("div");
		con.className="con";

		for(let j in city[i]){
			var box=document.createElement('div');
			box.className="box";
			box.innerHTML=j;
			con.appendChild(box);

		}
		citys.appendChild(con);
		city1.appendChild(citys);

	}

}

