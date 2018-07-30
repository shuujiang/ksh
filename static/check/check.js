var allOptions = [],
	thisObj = {}, //记录画布中点击的是哪个图表的对象
	tuIndex = 0,
	tuArry = [],
	z = 0, //记录创建拖拽的div的ID下标
	x = 0,
	canvasArray = [], //记录在画布中的图表，图形，文本图
	oBox = [],
	mooBox = [],
	_boxHeight = [],
	_boxWidth = [],
	moHeight= [],
	_moHeight= [],
	mobileheight = [],
	i = 0,
	j,
	p = 0,
	iTop = [],
	iLeft = [],
	maxTop = [],
	maxLeft = [],
	bjID,
	SXarr=[],
	sxID,
	theme,
	endOption,
	moWidth,
	screenSize,
	refreshTimer;
$(document).ready(function(){
 	//画布
	$.ajax({
 		type:"get",
 		url:ctx+"/qd/test/loadDesign?id="+getQueryString("id",window.location.href),
 		async:true,
 		success:function(staticOption){
 			if(staticOption&&staticOption.mubanType=='inner'){
	 			window.location=ctxStatic+'/app/'+staticOption.href;
	 		}else if(staticOption&&staticOption.mubanType=='outer'){
	 			window.location=staticOption.href;
	 		}
 			console.log("-----------请求画布----------");
 			console.log(staticOption);
 			console.log("-----------加载画布----------");
 			huabu($.parseJSON(staticOption.designOption));
 			ratio = $.parseJSON(staticOption.designOption).screen;
 			console.log("-----------加载成功----------");
 			subject = $.parseJSON(staticOption.designOption).subject;
 			refresh(staticOption.refreshTime);
 			$.ajax({
 				type:"get",
 				url:ctx+"/qd/qdDesignTheme/getTheme",
 				async:true,
 				data:{id:subject},
 				success:function(data){
 					if(data!=""){
 						theme=$.parseJSON(data.themeJs.replace(/&quot;/g,'"'));
 					}else{
 						theme=null;
 					}
 					$.ajax({
 		 		 		type:"get",
 		 		 		url:ctx+"/qd/test/getAll?id="+getQueryString("id",window.location.href),
 		 		 		async:false,
 		 		 		staticOptionType: "json",
 		 		 		success:function(data){
 		 		 			console.log(data);
 					 		console.log("-----------请求数据----------");
 					 		console.log(data);
 					 		var filter = data.body.filters
 					 		filter.forEach(function(item){
 					 			item.filterOption = parseMore(item.filterOption)
 					 		})
 					 		SXarr = filter;
 					 		SXarr.forEach(function(item, i){
 					 			if(item.absValue == null){
 									item.absValue = "";
 								}
 								if(item.beginDate == null){
 									item.beginDate = "";
 								}
 								if(item.endDate == null){
 									item.endDate = "";
 								}
 								if(item.tempValue1 == null){
 									item.tempValue1 = "";
 								}
 								if(item.tempValue2 == null){
 									item.tempValue2 = "";
 								}
 							})
 					 		console.log("-----------加载图表----------");
 					 		loadChart(data.body.qdDesignChildrens, "check");
 					 		console.log("-----------加载图表结束----------");
 		 		 		}
 		 		 	})
 				}
 			});
 		}
 	})
});

function huabu(item){
	HBSX = item;
	screenSize = 100+item.addScreen
	scale = (100+item.addScreen)/100;
	multiple = item.multiple;
	option = srcSwitch(item.backgroundImage);
	$("#content").css("background", "url(" + option + ") no-repeat 0 0 / 100% 100%");
	$("#content").css("background-color", item.backgroundColor);
	refresh(item.refreshTime);
	checkAdaption();	
}
// 适应屏幕
function checkAdaption() {
	fullScreen();
	$(window).bind("resize", function() {
		fullScreen();
	});
	function fullScreen() {
		$(".details-zhong").width(innerWidth + "px");
		$(".details-zhong").height(innerHeight + "px");
		screenInitialization(HBSX);		
	}
}
