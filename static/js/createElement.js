 var allOptions = [], 
	thisOption,
	selectedOption,
	z = 0,
	tabsId,
	canvasArray = [], 
	YucanvasArray = [], 
	cc, dd, oo, 
	oBox = [],
	SXarr = [],
	sxID, 
	prevId,
	dbsxID,
	theme, 
	HBSX, 
	thisVal1,
	thisVal,
	refreshTimer,
	element,
	myChart,
	scale,
	dataUrl = "",
	lineBOxHeight,
	newNum = 0,
	cityList = [],
	qdOrderBys = [],
	hoverId,
	newhoverId,
	historyList = [];
var ctx = 'http://172.16.70.75:8080/hlQD/page';
// var ctx = 'http://172.16.70.41:8183/hlQD/page';
// var ctx = 'http://172.16.70.55:8880/hlQD/page';
var curWwwPath , pathName, pos, localhostPaht, projectName;
//js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath(){
	//获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
	curWwwPath=window.document.location.href;
	//获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
	pathName=window.document.location.pathname;
	pos=curWwwPath.indexOf(pathName);
	//获取主机地址，如： http://localhost:8083
	localhostPaht=curWwwPath.substring(0,pos);
	//获取带"/"的项目名，如：/uimcardprj
	projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
}
getRootPath();
// 省级
var provincesList = [{"cityName":"北京市","url":"./import/mapdata/geometryProvince/11.json"},{"cityName":"天津市","url":"./import/mapdata/geometryProvince/12.json"},{"cityName":"河北省","url":"./import/mapdata/geometryProvince/13.json"},{"cityName":"山西省","url":"./import/mapdata/geometryProvince/14.json"},{"cityName":"内蒙古自治区","url":"./import/mapdata/geometryProvince/15.json"},{"cityName":"辽宁省","url":"./import/mapdata/geometryProvince/21.json"},{"cityName":"吉林省","url":"./import/mapdata/geometryProvince/22.json"},{"cityName":"黑龙江省","url":"./import/mapdata/geometryProvince/23.json"},{"cityName":"上海市","url":"./import/mapdata/geometryProvince/31.json"},{"cityName":"江苏省","url":"./import/mapdata/geometryProvince/32.json"},{"cityName":"浙江省","url":"./import/mapdata/geometryProvince/33.json"},{"cityName":"安徽省","url":"./import/mapdata/geometryProvince/34.json"},{"cityName":"福建省","url":"./import/mapdata/geometryProvince/35.json"},{"cityName":"江西省","url":"./import/mapdata/geometryProvince/36.json"},{"cityName":"山东省","url":"./import/mapdata/geometryProvince/37.json"},{"cityName":"河南省","url":"./import/mapdata/geometryProvince/41.json"},{"cityName":"湖北省","url":"./import/mapdata/geometryProvince/42.json"},{"cityName":"湖南省","url":"./import/mapdata/geometryProvince/43.json"},{"cityName":"广东省","url":"./import/mapdata/geometryProvince/44.json"},{"cityName":"广西壮族自治区","url":"./import/mapdata/geometryProvince/45.json"},{"cityName":"海南省","url":"./import/mapdata/geometryProvince/46.json"},{"cityName":"重庆市","url":"./import/mapdata/geometryProvince/50.json"},{"cityName":"四川省","url":"./import/mapdata/geometryProvince/51.json"},{"cityName":"贵州省","url":"./import/mapdata/geometryProvince/52.json"},{"cityName":"云南省","url":"./import/mapdata/geometryProvince/53.json"},{"cityName":"西藏自治区","url":"./import/mapdata/geometryProvince/54.json"},{"cityName":"陕西省","url":"./import/mapdata/geometryProvince/61.json"},{"cityName":"甘肃省","url":"./import/mapdata/geometryProvince/62.json"},{"cityName":"青海省","url":"./import/mapdata/geometryProvince/63.json"},{"cityName":"宁夏回族自治区","url":"./import/mapdata/geometryProvince/64.json"},{"cityName":"新疆维吾尔自治区","url":"./import/mapdata/geometryProvince/65.json"},{"cityName":"台湾省","url":"./import/mapdata/geometryProvince/71.json"},{"cityName":"香港特别行政区","url":"./import/mapdata/geometryProvince/81.json"},{"cityName":"澳门特别行政区","url":"./import/mapdata/geometryProvince/82.json"}];
echartsMapFun("china", './import/mapdata/china.json', "china");
// echartsMapFun("word", './import/mapdata/word.json');
// 地图按需实例化
function echartsMapCreatFun(val, type, list){
	list.forEach(function(aitem, a){
		if(aitem.cityName == val){
			echartsMapFun(val, aitem.url, type);
		}
	});
}
// 地图实例化方法
function echartsMapFun(cityName, url, type){
	$.ajaxSettings.async = false;
	$.getJSON(url, function(data) {
		echarts.registerMap(cityName, data);
		if(type == "province"){
			cityList = mapListFun(data, "geometryCouties");
		}
	});
}
// 次级地图数组创建
function mapListFun(data, type){
	var list = [];
	var crown = true;
	data.features.forEach(function(item, i){
		var id = item.properties.id+"";
		if(type == "geometryCouties"){
			var len = id.length;
			if(len < 5){
				if(id == "3682" || id.indexOf("66")> -1){
					list = [];
					crown = false;	
				}else if(id == "3681"){
					list = [];
					crown = false;	
				}else{
					id = id + "00";
				}
			}else{
				var xId = id.substring(0, 4);
				if(crown){
					if(xId == "1101" || xId == "1201" || xId == "3101"){
						list.push({
							cityName: "市辖区",
							url: "./import/mapdata/"+ type +"/"+xId+"00.json"
						});
						crown = false;												
					}else if(xId == "5001"){
						list.push({
							cityName: "市辖区",
							url: "./import/mapdata/"+ type +"/"+xId+"01.json"
						},{
							cityName: "市辖县",
							url: "./import/mapdata/"+ type +"/"+xId+"02.json"
						});
						crown = false;						
					}else if(xId == "4690"){
						list.push({
							cityName: "省直辖县级行政区划",
							url: "./import/mapdata/"+ type +"/"+xId+"00.json"
						},{
							cityName: "南沙群岛",
							url: "./import/mapdata/"+ type +"/460300.json"
						});
						crown = false;	
					}
				}
			}
		}
		if(crown){
			list.push({
				cityName: item.properties.name,
				url: "./import/mapdata/"+ type +"/"+ id +".json"
			});
		}
	});
	return list;
}
// 天气数组
var weatherIconList=[{type:"晴",dayIcon:"./image/icon/day/00.png",nightIcon:"./image/icon/night/00.png"},{type:"多云",dayIcon:"./image/icon/day/01.png",nightIcon:"./image/icon/night/01.png"},{type:"阴",dayIcon:"./image/icon/day/02.png",nightIcon:"./image/icon/night/02.png"},{type:"阵雨",dayIcon:"./image/icon/day/03.png",nightIcon:"./image/icon/night/03.png"},{type:"雷阵雨",dayIcon:"./image/icon/day/04.png",nightIcon:"./image/icon/night/04.png"},{type:"雷阵雨伴有冰雹",dayIcon:"./image/icon/day/05.png",nightIcon:"./image/icon/night/05.png"},{type:"雨夹雪",dayIcon:"./image/icon/day/06.png",nightIcon:"./image/icon/night/06.png"},{type:"小雨",dayIcon:"./image/icon/day/07.png",nightIcon:"./image/icon/night/07.png"},{type:"中雨",dayIcon:"./image/icon/day/08.png",nightIcon:"./image/icon/night/08.png"},{type:"大雨",dayIcon:"./image/icon/day/09.png",nightIcon:"./image/icon/night/09.png"},{type:"暴雨",dayIcon:"./image/icon/day/10.png",nightIcon:"./image/icon/night/10.png"},{type:"大暴雨",dayIcon:"./image/icon/day/11.png",nightIcon:"./image/icon/night/11.png"},{type:"特大暴雨",dayIcon:"./image/icon/day/12.png",nightIcon:"./image/icon/night/12.png"},{type:"阵雪",dayIcon:"./image/icon/day/13.png",nightIcon:"./image/icon/night/13.png"},{type:"小雪",dayIcon:"./image/icon/day/14.png",nightIcon:"./image/icon/night/14.png"},{type:"中雪",dayIcon:"./image/icon/day/15.png",nightIcon:"./image/icon/night/15.png"},{type:"大雪",dayIcon:"./image/icon/day/16.png",nightIcon:"./image/icon/night/16.png"},{type:"暴雪",dayIcon:"./image/icon/day/17.png",nightIcon:"./image/icon/night/17.png"},{type:"雾",dayIcon:"./image/icon/day/19.png",nightIcon:"./image/icon/night/18.png"},{type:"冻雨",dayIcon:"./image/icon/day/19.png",nightIcon:"./image/icon/night/19.png"},{type:"沙尘暴",dayIcon:"./image/icon/day/20.png",nightIcon:"./image/icon/night/20.png"},{type:"小到中雨",dayIcon:"./image/icon/day/21.png",nightIcon:"./image/icon/night/21.png"},{type:"中到大雨",dayIcon:"./image/icon/day/22.png",nightIcon:"./image/icon/night/22.png"},{type:"大到暴雨",dayIcon:"./image/icon/day/23.png",nightIcon:"./image/icon/night/23.png"},{type:"暴雨到大暴雨",dayIcon:"./image/icon/day/24.png",nightIcon:"./image/icon/night/24.png"},{type:"大暴雨到特大暴雨",dayIcon:"./image/icon/day/25.png",nightIcon:"./image/icon/night/25.png"},{type:"小到中雪  ",dayIcon:"./image/icon/day/26.png",nightIcon:"./image/icon/night/26.png"},{type:"中到大雪",dayIcon:"./image/icon/day/27.png",nightIcon:"./image/icon/night/27.png"},{type:"大到暴雪",dayIcon:"./image/icon/day/28.png",nightIcon:"./image/icon/night/28.png"},{type:"浮尘",dayIcon:"./image/icon/day/29.png",nightIcon:"./image/icon/night/29.png"},{type:"扬沙",dayIcon:"./image/icon/day/30.png",nightIcon:"./image/icon/night/30.png"},{type:"强沙尘暴 ",dayIcon:"./image/icon/day/31.png",nightIcon:"./image/icon/night/31.png"},{type:"霾 ",dayIcon:"./image/icon/day/53.png",nightIcon:"./image/icon/night/53.png"}];
// 图片路径
function srcSwitch(src){
	if(src){
		if(src.indexOf(projectName)>-1){
			return src;
		}else{
			var asrc = projectName + src;
			return asrc;
		}
	}
}
// 屏幕初始化方法
function screenInitialization(item){
	$("#palette").css({
		width:"100%",
		height:"100%"
	})
	// .perfectScrollbar();
	$("html").css("font-size", 100*multiple+"px");		
	if(item.screen == "ratio1"){
		adaptiveScreen();
	}else if(item.screen == "ratio2"){
		bigScreen(item);
	}else{
		var ua = navigator.userAgent;
		var ipad = ua.match(/(iPad).*OS\s([\d_]+)/), isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/), isAndroid = ua.match(/(Android)\s+([\d.]+)/), isMobile = isIphone || isAndroid;
		if(isMobile){
			mobileScreen("mobile");
			// $("#palette").perfectScrollbar("destroy");
			// $("#palette").css("overflow", "auto");
		}else{
			// $("#palette").css("overflow", "hidden");
			mobileScreen();					
		}
	}
}
// 自适应屏
function adaptiveScreen(){
	$(".fbl").addClass("hidden");
	var width = ($("#palette").width()-20)*multiple;
	var height = Math.floor(9/16*width*scale);
	$("#content").css({
		width:width,
		height:height
	});
	$("#HBgrid").css({
		width:width,
		height:height
	});
	echartResize();
}
// 固定屏
function bigScreen(item) {
	$(".finput input:eq(0)").val(item.screenSize.width);
	$(".finput input:eq(1)").val(item.screenSize.height);
	$(".fbl").removeClass("hidden");
	$("#content").css({
		width:item.screenSize.width*multiple,
		height:item.screenSize.height*scale*multiple
	});
	$("#HBgrid").css({
		width:item.screenSize.width*multiple,
		height:item.screenSize.height*scale*multiple
	});
	echartResize();
}
// 手机屏
function mobileScreen(type){
	$(".fbl").addClass("hidden");
	if(type != "mobile"){
		var height = $("#palette").height()*multiple
		var Pheight = 9/16*$("#palette").height();
		var Mheight = Pheight*multiple;
	}else{
		var Pheight = $("#palette").width();
		var Mheight = Pheight*multiple;
		var height = 16/9*Pheight*multiple;
	}
	$("#palette").css({width: Math.floor(Pheight+40)});
	$("#content").css({
		width: Math.floor(Mheight),
		height:height*scale
	});
	$("#HBgrid").css({
		width: Math.floor(Mheight),
		height:height*scale
	});
	echartResize();
}
//加载元素
function loadChart(data, page) {
	var len = data.length;
	for (var i = 0; i < len; i++) {
		data.forEach(function(item) {
			if (item.orderBy == i) {
				var staticOption = parseMore(item.staticOption);
				if(item.dataOption != "{}"){
					if (item.dataOption != null && item.dataOption != "" ) {
						var dataOption = parseMore(item.dataOption);
						item.dataOption = dataOption;
					}else{
						item.dataOption = staticOption.dataOption;
					}
				}
				var type = item.type;
				if(type == "tabs" || type == "text" || type == "marquee" || type == "countUp" || type == "statistic" || type == "time" || type == "weather" || type == "image" || type == "img" || type == "video" || type == "audio" || type == "monitoring"){
					if(type == "img"){
						type == "image"
					}
					staticOption.staticType = type;
					item.type = "component";
				}
				item.staticOption = staticOption;
				
				allOptions.push(item);
			}
		});
	}
	divBuildFun(page);
}
function divBuildFun(page){
	canvasArray.forEach(function (item){
		if(item.timer != undefined){
			clearInterval(item.timer);
		}
	});
	canvasArray = [];
	allOptions.forEach(function(item, index) {
		var option = item,
			type = item.type;
			z = index + 1;	
		create(type, option, page);
		sxID=null;
	});
}
// 元素box创建
function create(type, option, page) {
	var staticOption = option.staticOption,
		t = staticOption.position.top,
		l = staticOption.position.left,
		w = staticOption.boxSize.width,
		h = staticOption.boxSize.height,
		boxId = staticOption.boxId || "content";
	sxID = option.id;
	var box = $('<div id="box' + z + '"></div>').addClass('box').appendTo('#'+boxId);
	oBox.push(document.getElementById("box" + z));
	oBoxcanshu(box, w, h, t, l);
	if(page != "check"){
		// borser
		var border = $('<div class="border"></div>').appendTo(box);
		boxMove(box[0], border[0], "move");
		borderHover(border);	
		// zoom
		var nResize = $('<div class="oneWayTB nResize zoom" ></div>').appendTo(box);
		var neResize = $('<div class="twoWay neResize zoom" ></div>').appendTo(box);
		var eResize = $('<div class="oneWayLR eResize zoom" ></div>').appendTo(box);	
		var seResize = $('<div class="twoWay seResize zoom" ></div>').appendTo(box);
		var sResize = $('<div class="oneWayTB sResize zoom" ></div>').appendTo(box);	
		var swResize = $('<div class="twoWay swResize zoom" ></div>').appendTo(box);
		var wResize = $('<div class="oneWayLR wResize zoom" ></div>').appendTo(box);			
		var nwResize = $('<div class="twoWay nwResize zoom" ></div>').appendTo(box);	
		boxMove(box[0], nResize[0], "n-resize");
		boxMove(box[0], neResize[0], "ne-resize");		
		boxMove(box[0], eResize[0], "e-resize");		
		boxMove(box[0], seResize[0], "se-resize");
		boxMove(box[0], sResize[0], "s-resize");
		boxMove(box[0], swResize[0], "sw-resize");
		boxMove(box[0], wResize[0], "w-resize");
		boxMove(box[0], nwResize[0], "nw-resize");	
		zoomHover(nResize);
		zoomHover(neResize);
		zoomHover(eResize);
		zoomHover(seResize);
		zoomHover(sResize);
		zoomHover(swResize);
		zoomHover(wResize);
		zoomHover(nwResize);
	}
	element = $('<a class="element" id="'+sxID+'"></a>').appendTo(box);
	canvasArray.push({id: option.id});		
	var len = canvasArray.length -1;	
	$("#" + sxID).parent().css("z-index", option.staticOption.zIndex);
	init(sxID, element, type, option, canvasArray[len], "editor");
}
// border hover
function borderHover(dom){
	dom.hover(function(){
		newhoverId = $(this).siblings(".element").attr("id");	
		if(hoverId){
			$("#"+hoverId).siblings(".border").addClass("borderBk");
		}else{
			$(this).addClass("borderBk");
		}
	},function(){
		$(this).removeClass("borderBk");
		$("#"+hoverId).siblings(".border").removeClass("borderBk");
	});
}
// zoom hover
function zoomHover(dom){
	dom.hover(function(){
		newhoverId = $(this).siblings(".element").attr("id");
		if(hoverId){
			$("#"+hoverId).siblings(".border").addClass("borderBk");
		}else{
			$(this).siblings(".border").addClass("borderBk");
		}
	},function(){
		$(this).siblings(".border").removeClass("borderBk");
		$("#"+hoverId).siblings(".border").removeClass("borderBk");
	});
}
// box样式设置
function oBoxcanshu(box, w, h, t, l) {
	box.width(w + "%");
	box.height(h / scale  + "%");
	box[0].style.top = t  / scale  + "%";
	box[0].style.left = l  + "%";
}
// 元素类别判断
function init(id, element, type, option, canvas, eleType) {
	if(type == "echarts2" || type == "echarts" || type == "heightcharts"){
		type = "chart";
	}
	$("."+ id).remove();
	var yuansuTULi =$('<li class="yuansuTU '+ id +'" data-type="'+id+'"><i style="background-image:url(./image/components/'+type+'.png)"></i><span>元素:</span><em>' + option.chartName + '</em></a></li>').appendTo($(".directory"));	
	switch(type){
		case "chart":
			var chartType = option.chartType;
			var chartOption = option.staticOption.chartOption;			
			if(chartType == "map"){
				var staticType = option.staticOption.staticType;
				if(staticType == "flyMap"){
					echartsMapCreatFun(chartOption.geo.province||"", "province", provincesList);
					if(chartOption.geo.city){
						echartsMapCreatFun(chartOption.geo.city, "city", chartOption.geo.cityList);
					}
				}else{
					chartOption.series.forEach(function(item, i){
						if(item.type == "map"){
							echartsMapCreatFun(item.province||"", "province", provincesList);
							if(item.city){
								echartsMapCreatFun(item.city, "city", item.cityList);
							}
						}
					});
				}
			}else if(chartType == "GIS"){
				if(chartOption.center.lng != undefined){
					chartOption.center = [chartOption.center.lng, chartOption.center.lat];
				}
			}
			TBSC(option, id, element, canvas);
			var refreshTime;
			if(chartOption.time != undefined || chartOption.time != null){
				if(chartOption.time.show){
					refreshTime = chartOption.time.longness;
					chartOption.refreshTime = refreshTime;
				}else{
					refreshTime = 0;
				}
				delete chartOption.time;
			}else{
				refreshTime = chartOption.refreshTime || 0;
			}
			independenceRefresh(refreshTime);
			break;
		case 'svg':
			$('<svg  xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" preserveAspectRatio="none" style="width:100%;height:100%;" viewBox="0 0 36 36"  enable-background="new 0 0 36 36" xml:space="preserve">' + option.staticOption.path + '</svg>').appendTo(element)
			TXSXCSH($("#" + id), option.staticOption);
		break;
		case 'component':
			var staticType = option.staticOption.staticType;
			console.log(staticType, 398)
			switch(staticType){
				case 'tabs':
					tabScreat(option, element, id, canvas, eleType);
				break;
				case 'text':
					$('<textarea disabled="disabled" spellcheck="false" id="textarea' + z + '" placeholder="请输入文字">' + option.staticOption.content + '</textarea>').appendTo(element);
					WBSXCSH($("#" + id), option.staticOption);
				break;
				case 'marquee':
					mQcreat(option, element);
				break;
				case "countUp":
					countUpFun(option, id, element, canvas);
					var refreshTime = option.staticOption.refreshTime;
					refreshTime = refreshTime == null ? 0.3 : refreshTime;			
					independenceRefresh(refreshTime);
				break;
				case "statistic":
					statisticFun(option, id, element, canvas);
					var refreshTime = option.staticOption.refreshTime;
					refreshTime = refreshTime == null ? 0.3 : refreshTime;
					independenceRefresh(refreshTime);
				break;
				case 'time':
					var time = $('<div class="otherBox"></div>').appendTo(element);
					timeRebuild(element, option.staticOption);
					TMSXCSH(element, option.staticOption);
				break;
				case 'weather':
					weatherRebuild(option, element);
					WHSXCSH(element, option.staticOption);
				break;
				case "image":
					iDcreat(option, element);
				break;
				case "video":
					vDcreat(option, element, id)
				break;
				case "audio":
					aDcreat(option, element);
				break;
				case "monitoring":
					mTcreat(option, element);
				break;
			}
		break;
		case'shaixuan':
			SXarr.forEach(function(item) {
				if (item.id == option.id) {
					item.nameId = id;
					SXCJ(item, element, id);
				}
			});
			SXSXCSH(id, option.staticOption);
		break;
		default:
			break;
	}
}
//图表生成方法
function TBSC(option, id, element, canvas) {
	var chartType = option.chartType,
		staticType = option.staticOption.staticType,
		name = option.chartName,
		type = option.type;
	if(option.dataOption == "{}"){
		$('<p class="nodata">无数据</p>').appendTo(element);
	}else{
		var endOption = $.extend(true, {}, option.dataOption, option.staticOption.chartOption);		
		console.log(endOption, 472)
		if(type != "heightcharts"){
			if (chartType == 'table') {
				creatTable(option, endOption, id, element, canvas, staticType);
			} else if (chartType == "GIS") {
				// require.config({
				// 	paths : {
				// 		"baiduGis": ["http://api.map.baidu.com/getscript?v=2.0&ak=59KkG4gGSwIzukAsZmfBsp6Y13j6D9LM&services=&t=20171031174121"],
				// 	}
				// });
				// require(["baiduGis"],function(){
				// 	$(function(){
						myChart = null;
						creatMap(id, endOption, canvas);
				// 	})
				// });
			} else if (chartType == "text") {
				creatText(option, endOption, id, element, canvas);
			}else {
				if (type == "echarts2") {
					myChart = echarts2.init(document.getElementById(id), theme);
				} else {
					myChart = echarts.init(document.getElementById(id), theme);
				}
				myChart.setOption(endOption);			
				if(canvas != undefined){
					canvas.chart = myChart;
				}
				myChart.on('click', function (params) {
					var href = endOption.href;
					if(href !="" && href !=null){
						if(href.indexOf("qd/qdDesign") > -1){
							href = ctx+href;
						}
						if(endOption.target =="self"){
							window.location.href=href;
						}else{
							window.open(href);
						}
					}
				});
			}
		}else{
			$("#"+id).highcharts(endOption);
		}	
	}
}
// 表格生成方法
function creatTable(option, endOption, id, element, canvas, staticType){
	var title = $('<div class="title"></div>').appendTo(element);
	$('<a class="text" target="view_window"></a>').appendTo(title);
	$('<a class="subtext" target="view_window"></a>').appendTo(title);
	var grid = $('<div class="grid"></div>').appendTo(element);
	var head = $('<ul class="head" style="text-align: center; width:100%;"></ul>').appendTo(grid);
	var body = $('<div class="tbBodyBox"></div>').appendTo(grid);
	var tbBody = $('<ul class="tbBody" style="text-align: center"></ul>').appendTo(body);
	var sfbnbody = $('<div class="sfbnbody"></div>').appendTo(body);		
	var show = endOption.show || false;
	var showNum = endOption.showNum || 10;
	var interject = endOption.interject;
	interject = interject == null ? 1 : interject;
	if(show){
		var len = 2;
		var lenList = [];
	}else{
		var len = 0;
		var lenList = [];
	}
	var hrefIndex;
	endOption.series[0].data.forEach(function(item, i){
		if(item == "超链接"){
			hrefIndex = i;
			lenList.push("");
		}else{
			var len1 = item.length;
			lenList.push(len1);
			len = len + len1;
		}
	});
	var pagNum = 0, page;
	var href;
	endOption.series.forEach(function(item, i){
		if(i == 0){
			var header = $('<li class="header" style="height:100%;"></li>').appendTo(head);
			if(show){
				$('<div><span>序号</span></div>').css("width", 200/len+"%").appendTo(header);
			}
			item.data.forEach(function(ditem, d){
				if(hrefIndex != d){
					var num = lenList[d]/len*100 + "%";
					var itemDiv = $('<div title="'+ditem+'"><span>'+ditem+'</span></div>').css({"width": num, "cursor": "pointer"}).appendTo(header);
					itemDiv.click(function(e){
						var index = header.children("div").index($(this));
						sorting(option, "", index, id, element, canvas);
					});
				}
			});
			// 表格排序
			function sorting(option, sortingType, index, id, element, canvas){
				var dims = option.dims,measures = option.measures;
				if(dims != "" ||  measures != ""){
					// 请求数据
					var designId = option.designId;
					var dimsList = dims.split(",");
					var measuresList =measures.split(",");
					var wdsList = dimsList.concat(measuresList);
					var fieldId = wdsList[index];
					var qdOrderby = {
						childrenId: designId,
						fieldId: fieldId,
						orderbyType:"asc",
						index: index,
						sort: 1
					}
					if(option.qdOrderbys){
						var fieldId1 =  option.qdOrderbys[0].fieldId;
						if(fieldId1 == fieldId){
							if(option.qdOrderbys[0].orderbyType == "asc"){
								qdOrderby.orderbyType  = "desc";
							}else{
								qdOrderby.orderbyType  = "asc";
							}
						}
					}
					option.qdOrderbys = [];			
					option.qdOrderbys.unshift(qdOrderby);
					var obj = {};
					obj.designId = designId;
					obj.dbsrcId = option.dbsrcId;
					obj.sourceType = option.sourceType;
					obj.tableId = option.tableId;
					obj.dims = option.dims;
					obj.measures = option.measures;
					obj.chartType = option.chartType;
					obj.chartName = option.staticOption.staticType;
					obj.type = option.type;
					obj.qdOrderBys= option.qdOrderbys;
					var dataoption = getDataFromAjax(ctx+"//qd/qdDesign/getDataoption", {
						qdDesignChildren: stringifyMore(obj)
					});
					option.dataOption = dataoption;
					element.children().remove();
					TBSC(option, id, element, canvas)
				}
			}
		}else{
			if(staticType == "table"){
				page = tbBody;
			}else{
				if(pagNum >= showNum){
					pagNum = 0;
				}
				if(pagNum == 0){
					page = $('<div class="paging"></div>').appendTo(tbBody);
					$('<div class="sfbn"></div>').appendTo(sfbnbody);
				}
			}
			if ((i + 1) % 2 == 0) {
				if(i <=newNum){
					var lineBox = $('<li class="idol tableInterject"></li><').appendTo(page);
				}else{
					var lineBox = $('<li class="idol"></li>').appendTo(page);
				}
			} else {
				if(i <=newNum){
					var lineBox = $('<li class="odd tableInterject"></li>').appendTo(page);
				}else{
					var lineBox = $('<li class="odd"></li>').appendTo(page);
				}
			}
			var lineBoxA = $('<a class="tableHref"></a>').appendTo(lineBox);
			if(show){
				$('<div title="'+i+'"><span>'+i+'</span></div>').css("width", 200/len+"%").appendTo(lineBoxA);
			}
			item.data.forEach(function(ditem, d){
				if(hrefIndex == d){
					lineBoxA.attr("href", ditem);					
				}else{
					var num = lenList[d]/len*100 + "%";
					if(ditem != "null"){
						var data = Number(ditem)+"";
						if(data == "NaN"){
							data = ditem;
						}
					}else{
						data = "";
					}
					$('<div title="'+data+'"><span>'+data+'</span></div>').css("width", num).appendTo(lineBoxA);
				}
			});
			pagNum++;
		}
	});
	if(staticType == "table"){
		body.css("overflow", "hidden");
		$(".tableInterject").css("animation", "tBam "+interject+"s linear 0s 1");
		if($(".tableInterject").length > 0){
			var timer = setTimeout(function(){
				$(".tableInterject").css("animation", "none");
				$(".tableInterject").removeClass("tableInterject");
				runAnimateFun();
				clearTimeout(timer);
			},interject*1000);
		}else{
			runAnimateFun();
		}
		function runAnimateFun(){
			if(canvas != undefined){
				var animate = endOption.animate || 0;
				if(animate > 0){
					tableAnimate(canvas, tbBody, animate);
				}
			}
		}
	}else{
		tbBody.css("height", "100%");
		shufflingFun(canvas, tbBody, sfbnbody);
		function shufflingFun(canvas, tbBody, sfbnbody){
			var num = 0;
			var pagingList = tbBody.children(".paging");
			var sfbnList = sfbnbody.children(".sfbn");
			var pagingNum = pagingList.length;
			shufflingAutomatic(0);
				shufflingTime();
			sfbnList.click(function(){
				clearInterval(canvas.timer);
				num = $(this).index();
				shufflingAutomatic(num);
				shufflingTime();
			});
			function shufflingTime(){
				if(canvas != undefined){
					var animate = endOption.animate || 0;
					if(animate > 0){
						canvas.timer = setInterval(function(){
							if(num >= pagingNum){
								num = 0;
							}
							shufflingAutomatic(num);
						}, animate*1000)
					}
				}
			}
			function shufflingAutomatic(index){
				tbBody.children(".shufflingShow").addClass("shufflingHide").removeClass("shufflingShow");
				sfbnbody.children(".sfbnClick").removeClass("sfbnClick");
				sfbnList.eq(index).addClass("sfbnClick")
				pagingList.eq(index).addClass("shufflingShow").removeClass("shufflingHide");
				num++;										
			}
		}
	}
	shufflingBtnFun(endOption, sfbnbody);
	special(endOption, id);
	tableSeriesArrFun(endOption, id, true);
	tetbBackfun(endOption, id);
	myChart = null;
}
// 文本生成方法
function creatText(option, endOption, id, element, canvas){
	var title = $('<div class="title"></div>').appendTo(element);
	$('<a class="text" target="view_window"></a>').appendTo(title);
	$('<a class="subtext" target="view_window"></a>').appendTo(title);
	var grid = $('<div class="grid"></div>').appendTo(element);
	endOption.series.forEach(function(item, i) {
		var series = $('<div class="series' + i + ' series"></div>').appendTo(grid);
		$('<p class="prefixes"><span class="textName"></span></p>').appendTo(series);
		$('<p class="content"><span class="data">' + item.subtextStyle.name + '</span></p>').appendTo(series);
		$('<p class="suffix"><span class="unit" ></span></p>').appendTo(series);
	});
	myChart = null;
	special(endOption, id);
	textSeriesArrFun(endOption, id);
	tetbBackfun(endOption, id);
}
// GIS地图生成方法
function creatMap(id, endOption, canvas) {
	var map = new BMap.Map(id);
	map.centerAndZoom(new BMap.Point(endOption.center[0], endOption.center[1]), endOption.zoom);
	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
	var opts = {
		width: 250, // 信息窗口宽度
		height: 80, // 信息窗口高度
		title: "信息窗口", // 信息窗口标题
		enableMessage: true //设置允许信息窗发送短息
	};
	endOption.series.forEach(function(item) {
		var marker = new BMap.Marker(new BMap.Point(item[0], item[1])); // 创建标注
		marker.setAnimation(BMAP_ANIMATION_DROP);
		var content = item[2];
		map.addOverlay(marker); // 将标注添加到地图中
		addClickHandler(content, marker);
	});
	function addClickHandler(content, marker) {
		marker.addEventListener("click", function(e) {
			var point = e.target.getPosition();
			// openMap(point);
		});
		marker.addEventListener("onmouseover", function(e) {
			var p = e.target;
			var point = p.getPosition();
			infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象
			map.openInfoWindow(infoWindow, point); //开启信息窗口
		});
		marker.addEventListener("onmouseout", function(e) {
			map.closeInfoWindow(infoWindow);
		});
	}

	function openMap(point) {
		allmap = new BMap.Panorama(id);
		allmap.show();
		allmap.disableScrollWheelZoom(true);
		// allmap.addEventListener("pov_changed", onChange);
		allmap.setOptions({
			navigationControl: false //隐藏导航控件
		});
		// $($('#' + id + ' .pano_close')[0]).show();
		// allmap.setPov({heading:0,pitch:0});
		allmap.setPosition(point);
	}
	// $('#' + id + ' .pano_close').click(function() {
	// 	allmap.hide();
	// 	$('#' + id + ' .pano_close').hide();
	// });
	if(canvas != undefined){
		canvas.map = map;
	}
	var mapType = endOption.mapTypes;
	var mapStyle = endOption.mapStyle;
	GISmapFun(map, mapType, "mapTypes");
	GISmapFun(map, mapStyle, "mapStyle");
}
// GIS地图属性
function GISmapFun(mapDom, val, type){
	if(type == "mapTypes"){
		if(val == "BMAP_NORMAL_MAP"){
			mapDom.setMapType(BMAP_NORMAL_MAP);
		}else if(val == "BMAP_SATELLITE_MAP"){
			mapDom.setMapType(BMAP_SATELLITE_MAP);
		}else if(val == "BMAP_HYBRID_MAP"){
			mapDom.setMapType(BMAP_HYBRID_MAP);
		}else{
			mapDom.setMapType(BMAP_PERSPECTIVE_MAP);
		}
	}else if(type == "mapStyle"){
		var mapStyle={style: val};
		mapDom.setMapStyle(mapStyle);
	}
}
// 数据改变地图
function GISmap(endOption){
	canvasArray.forEach(function(item){
		if(item.id == sxID){
			if(item.map != undefined){
				item.map.centerAndZoom(new BMap.Point(endOption.center[0], endOption.center[1]),endOption.zoom);
			}
		}
	});
}
// tabs控件
function tabScreat(option, element, id, canvas, eleType){
	var tabsTitle = $('<ul class="tabsTitle"></ul>').appendTo(element);
	var tabsBodyBox = $('<ul class="tabsBody"></ul>').appendTo(element);
	var tabsList = option.staticOption.tabsList;
	var len = tabsList.length;
	var width = 100/len + "%";
	tabsList.forEach(function(item, i){
		$('<li data="'+ item.id +'" style="width:'+width+'"><p class="tabTitle">'+item.name+'</p></li>').appendTo(tabsTitle);
		var box = $('<li id="'+ item.id +'" class="tabBox"></li>').appendTo(tabsBodyBox);
		$('<ol class="rightFunction"><li class="compile"></li><li class="copy"></li><li class="up"></li><li class="down"></li><li class="shut"></li></ol>').appendTo(box);	
	});
	var num = Number(option.staticOption.tabIndex || 0)
	tabSelectedFun(num, id);
	tabsTitle.children("li").click(function(){
		var xid = $(this).attr("data");
		tabsId = xid;
		tabsList.forEach(function(item, i){
			if(item.id == xid){
				objectCompletion(option.staticOption, i, "tabIndex", "string");
				tabSelectedFun(i, id);
			}
		});
	});
	var time = Number(option.staticOption.time || 0);
	if(eleType != undefined){
		tabSwitchFun(time, num, len,  id, canvas);
	}
}
function tabSwitchFun(time, num, len,  id, canvas){
	clearInterval(canvas.timer);
	if(time > 0){
		canvas.timer = setInterval(function(){
			num++;		
			if(num >= len){
				num = 0;
			}
			tabSelectedFun(num, id);
		}, time*1000);
	}

}
function tabSelectedFun(val, id){
	canvasArray.forEach(function(item, i){
		if(item.id == id){
			tabSelectde($("#"+id).children(".tabsTitle").children(), "unselected",  allOptions[i].staticOption);
			tabSelectde($($("#"+id).children(".tabsTitle").children()[val]), "selected",  allOptions[i].staticOption);
			tabBodySelectde($("#"+id).children(".tabsBody"),  allOptions[i].staticOption);
		}
	});
	$("#"+id).children(".tabsBody").children().css("opacity", 0);
	$($("#"+id).children(".tabsBody").children()[val]).css("opacity", 1);
}
// 文字滚动
function mQcreat(option, element){
	var content = option.dataOption.series;
	var ul = $('<p class="marqueeDiv"></p>').appendTo(element);
	if(content){
		content.forEach(function(item,i){
			$("<span>" + item +"</span>").appendTo(ul);
		});
	}	
	MQSXCSH(element, option.staticOption);
}
// 数字滚动
function countUpFun(option, id, element, canvas){
	var staticOption = option.staticOption;
	var dataOption = option.dataOption || "";
	var prefix = haveValue(staticOption, "prefixName", "string") || haveValue(dataOption, "series.0.textStyle.name", "string") || "";
	var suffix = haveValue(staticOption, "suffixName", "string") || "";
	$('<div class="otherBox"><span class="prefix">'+prefix+'</span><span class="content" id="ch'+id+'"></span><span class="suffix">'+suffix+'</span></div>').appendTo(element);	
	var options = {
		useEasing: true,
		useGrouping: true,
		separator: ',',
		decimal: '.',
	};
	var content = haveValue(dataOption, "series.0.subtextStyle.name", "string");
	var len = ((content+"").split(".")[1] || "").length;
	var duration = staticOption.duration || 2.5
	var decimals = staticOption.decimals || len || 0;
	var countUp = new CountUp("ch"+id, 0, content, decimals, duration || 2.5, options);
	if(canvas != undefined){
		canvas.countUp = countUp;
	}
	countUp.start();
	CPSXCSH($("#"+id), option.staticOption);
}
// statisticFun
function statisticFun(option, id, element, canvas){
	var staticOption = option.staticOption;
	var dataOption = option.dataOption || "";
	var prefix = haveValue(staticOption, "STprefixName", "string") || haveValue(dataOption, "series.0.textStyle.name", "string") || "";
	var content = haveValue(dataOption, "series.0.subtextStyle.name", "string") || 1000;	
	var length = (content+"").length;
	var suffix = haveValue(staticOption, "STsuffixName", "string") || "";
	var otherBox = $('<div class="otherBox"></div>').appendTo(element);	
	$('<div class="STprefix">'+prefix+'</div>').appendTo(otherBox);	
	var dataStatistics = $('<div class="dataStatistics" id="st'+id+'"></div>').appendTo(otherBox);	
	for(var i=0; i<length; i++){
		$('<div class="digit_set "></div>').appendTo(dataStatistics);
	}
	$('<div class="STsuffix">'+suffix+'</div>').appendTo(otherBox);		
	dataStatistics.children(".digit_set:last").addClass("set_last");
	$('#st'+id).dataStatistics({
		min: (content-500) || 0,
		max: content,
		time: 10,
		len: length
	});
	STSXCSH($("#"+id), option.staticOption);
}
// 时间生成方法
function timeRebuild(dom, option) {
	clearInterval(option.timer);
	var sty = option.styleVal || "0";
	timecsh(sty, dom.children());
	option.timer = setInterval(function() {
		timecsh(sty, dom.children());
	}, 1000);
}
function timecsh(sty, tm) {
	var weekArry1 = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
	var weekArry2 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	var time = new Date;
	dateFormatFun(time);
	switch (sty) {
		case '0':
			tm.html('<span>' + year + '-' + month + '-' + day + '</span>  <span>' + hour + ':' + minute + ':' + second + '</span>');
			break;
		case '1':
			tm.html('<span>' + year + '-' + month + '-' + day + '</span>  <span>' + Hour + ':' + minute + ':' + second) + '</span>';
			break;
		case '2':
			tm.html('<span>' + year + '年' + month + '月' + day + '日' + '</span>  <span>' + hour + ':' + minute + ':' + second + '</span>');
			break;
		case '3':
			tm.html('<span>' + year + '年' + month + '月' + day + '日' + '</span>  <span>' + Hour + ':' + minute + ':' + second + '</span>');
			break;
		case '4':
			tm.html('<span>' + year + '-' + month + '-' + day + '</span>');
			break;
		case '5':
			tm.html('<span>' + year + '年' + month + '月' + day + '日' + '</span>');
			break;
		case '6':
			tm.html('<span>' + hour + ':' + minute + ':' + second + '</span>');
			break;
		case '7':
			tm.html('<span>' + Hour + ':' + minute + ':' + second + '</span>');
			break;
		case '8':
			tm.html('<span>' + year + '年' + month + '月' + day + '日' + '</span>  <span>' +  weekArry2[weeks] + '</span>');
			break;
		case '9':
			tm.html('<span>' + year + '年' + month + '月' + day + '日' + '</span>  <span>' +  weekArry1[weeks] + '</span>');
			break;
		default:
			break;
	};
}
var year, month, day, hour, Hour, minute, second, weeks;
function dateFormatFun(val){
	year = val.getFullYear();
	month = addZero(val.getMonth()+1);
	day = addZero(val.getDate());
	Hour = addZero(val.getHours());
	hour = addZero(Hour % 12 == 0 ? 12 : Hour % 12);
	minute = addZero(val.getMinutes());
	second = addZero(val.getSeconds());
	weeks = val.getDay()-1;
	// 1位数加0
	function addZero(number){
		if (number < 10) {
			number = '0' + number;
		}
		return number;
	}
}
// 天气生成方法
function weatherRebuild(option, dom) {
	clearInterval(option.timer);
	wHcreat(option, dom);
	option.timer = setInterval(function() {
		wHcreat(option, dom);
	}, 3600000);
}
function wHcreat(option, dom){
	dom.children().remove();
	var code = option.staticOption.code;
	if(code){
		data= getDataFromAjax(ctx+"/qd/qdApi/weather?code=" + code);	
	}else{
		data= getDataFromAjax(ctx+"/qd/qdApi/weather");	
	}
	var time = data.time;
	var weatherObj = data.data;	
	var url,
		weather = weatherObj.forecast[0],
		type = weather.type,
		city = weatherObj.city, 
		wendu = weatherObj.wendu + "℃";	
		high = weather.high.split(" ")[1];
		low = weather.low.split(" ")[1];
		temperature = high + "&nbsp;&nbsp; ~ &nbsp;&nbsp;" + low;	
	weatherIconList.forEach(function(item){
		if(item.type == type){
			if(time == "day"){
				url = item.dayIcon;
			}else{
				url = item.nightIcon;
			}
		}
	});
	var weatherBox = $('<div class="weatherBox"></div>').appendTo(dom);
	var weatherType = option.staticOption.weatherType || "0";
	switch (weatherType) {
		case "0":
			$('<div class="cityDate cityDate0"><span class="city">'+city+'</span><span class="wendu">'+wendu+'</span><i class="icon" style="background-image: url('+url+')"></i><p><span>'+ temperature +'</span><span>'+ type +'</span></p></div>').appendTo(weatherBox)
			emFontSiz1(weatherBox, 3.0);
			break;
		case "1":
			$('<div class="cityDate cityDate1"><span class="wendu">'+wendu+'</span><i class="icon" style="background-image: url('+url+')"></i><p><span>'+ temperature +'</span><span>'+ type +'</span></p></div>').appendTo(weatherBox)
			emFontSiz1(weatherBox, 2.35);
			break;
		case "2":
			$('<div class="cityDate cityDate2"><span class="city">'+city+'</span><i class="icon" style="background-image: url('+url+')"></i><span>'+ wendu +'</span></div>').appendTo(weatherBox)
			emFontSiz1(weatherBox, 1.4);
			break;
		case "3":
			$('<div class="cityDate cityDate3"><i class="icon" style="background-image: url('+url+')"></i><span>'+ wendu +'</span></div>').appendTo(weatherBox)
			emFontSiz1(weatherBox, 0.8);
			break;
		default:
			break;
	}
}
// 图片
function iDcreat(option, element){
	// src = srcSwitch(option.staticOption.src);
	var src = option.staticOption.src;
	src = option.staticOption.src;
	$("<img/>").attr("src", src).width("100%").height("100%").appendTo(element);
	TPSXCSH(element, option.staticOption);	
}
// 视频控件
function vDcreat(option, element, id){
	
	var repeat = option.staticOption.repeat;
	var autostart = option.staticOption.autostart;
	// var src = option.staticOption.src
	// src = "./import/media/xwz.mp4";
	// src = "https://v.qq.com/iframe/player.html?vid=r0025l82hxp&tiny=0&auto=0";
	// src = "http://open.iqiyi.com/developer/player_js/coopPlayerIndex.html?vid=ac50ef47c879f660a17274ac4de07f6f&tvId=862014200&accessToken=2.f22860a2479ad60d8da7697274de9346&appKey=3955c3425820435e86d0f4cdfe56f5e7&appId=1368&height=100%&width=100%";
	// src = "http://player.youku.com/embed/XMzIwODY0NzgyNA==";
	if(src.indexOf("http") > -1){
		var src = option.staticOption.src.split("&auto")[0];
		$('<iframe src="'+src+'" frameborder=0 "allowfullscreen"></iframe>').width("100%").height("100%").appendTo(element);
	}else{
		var src = srcSwitch(option.staticOption.src);
		var playerId = "p" + id;
		$('<div id="'+playerId+'"></div>').width("100%").height("100%").appendTo(element);
		jwplayer(playerId).setup({
			file:src,
			width: '100%',
			height: '100%',
			repeat:repeat,//重复播放
			autostart:autostart,//自动播放
			"logo.hide": true
		});
	}
	TPSXCSH(element, option.staticOption);
}
// 音频控件
function aDcreat(option, element){
	var html = $("#audioControls").html();
	var  asrc = [];
	option.staticOption.src.forEach(function(item, i){
		var obj = copyAndClear(item);
		obj.src = srcSwitch(obj.src);
		obj.cover = srcSwitch(obj.cover);
		asrc.push(obj);
	});
	element.html(html);
	new SMusic({
		musicList : asrc,
		autoPlay  : true,  //是否自动播放
		defaultMode : 1,   //默认播放模式，随机
		callback   : function (obj) {  //返回当前播放歌曲信息
		}
	});
	ADSXCSH(element, option.staticOption);
}
// 监控控件
function mTcreat(option, element){		
	// rtmpSrc = "rtmp://124.160.79.186:1935/vod/hleast20170.mp4";
	// hlsSrc = "";
	rtmpSrc = option.staticOption.rtmpSrc
	hlsSrc = option.staticOption.hlsSrc;
	var pid = "myPlayer"+z;
	$('<video id="'+ pid +'" poster="" controls playsInline webkit-playsinline autoplay><source src="'+rtmpSrc+'" type="rtmp/flv" /><source src="'+hlsSrc+'" type="application/x-mpegURL" /></video>').width("100%").height("100%").appendTo(element);
	new EZUIPlayer(pid);
}
// 筛选器生成方法
function SXCJ(option, element, id){
	element.children().remove();
	var dom = $('<div style="width:100%;height:100%;"></div>').appendTo(element)
	// 标题
	$('<p class="SXboxp"></p>').appendTo(dom);
	// 内容
	var SXboxdiv =  $('<div class="SXboxdiv"></div>').appendTo(dom);
	if(option.type =='date'){
		//日期时间
		var pickerType = option.remarks;
		if( option.dateType != 'range' ){
			if(pickerType == "dateTimePicker"){
				SXboxdiv.html('<el-date-picker size="small" style="width: 100%" v-model="date" type="datetime" placeholder="选择日期时间" @change="dateFun(date)"></el-date-picker>');
			}else if(pickerType == "datePicker"){
				SXboxdiv.html('<el-date-picker size="small" style="width: 100%" v-model="date" type="date" placeholder="选择日期" @change="dateFun(date)"></el-date-picker>');
			}else{
				SXboxdiv.html('<el-time-picker size="small" style="width: 100%" v-model="date" placeholder="选择时间" @change="dateFun(date)"></el-time-picker>');
			}
			new Vue({
				el: "#"+id,
				data: function() {
					return {
						date:option.absValue
					}
				},
				methods: {
					dateFun: function(val){
						if(val != undefined && val != ""){
							dateFormatFun(val)
							val = dateFormat(pickerType);
						}
						SXarr.forEach(function(item){
							if(item.nameId == id){
								item.tempValue1 = val;
							}
						})
						refreshChart(val, undefined, id);
					}
				}
			});
		}else{
			if(pickerType == "dateTimePicker"){
				SXboxdiv.html('<el-date-picker size="small" style="width: 100%" v-model="daterange" type="datetimerange" placeholder="选择日期时间范围" @change="dateRangeFun(daterange)"></el-date-picker>');
			}else if(pickerType == "datePicker"){
				SXboxdiv.html('<el-date-picker size="small" style="width: 100%" v-model="daterange" type="daterange" placeholder="选择日期范围" @change="dateRangeFun(daterange)"></el-date-picker>');
			}else{
				SXboxdiv.html('<el-time-picker size="small" style="width: 100%" v-model="daterange" placeholder="选择时间范围" @change="dateRangeFun(daterange)"></el-time-picker>');
			}
			new Vue({
				el: "#"+id,
				data: function() {
					return {
						daterange:[option.beginDate, option.endDate]
					}
				},
				methods: {
					dateRangeFun: function(val){
						var aval, bval;
						if(val != undefined){
							if(val[0] != "" && val[0] != null){
								dateFormatFun(val[0]);
								aval = dateFormat();
								dateFormatFun(val[1]);
								bval = dateFormat(datePickerType);
							}
						}
						SXarr.forEach(function(item){
							if(item.nameId == id){
								item.tempValue1 = aval;
								item.tempValue1 = bval;
							}
						})
						refreshChart(aval, bval, id);
					},
				}
			});
		}
	}else{
		// 文本下拉
		if( option.type == "text" ){
			SXboxdiv.html('<el-input v-model="acquiescence" :spellcheck="false" placeholder="请输入筛选值" @blur="selectChange(acquiescence)"></el-input>')
		}else{
			SXboxdiv.html('<el-select v-model="acquiescence" placeholder="请选择筛选值" clearable  style="width:100%;" @change="selectChange(acquiescence)"><el-option v-for="(item, i) in qdtList" :key="i" :label="item" :value="item"></el-option></el-select>');		
		}
		debugger;

		console.log($("#"+id), 1218)
		new Vue({
			el: "#"+id,
			data: function() {
				return {
					acquiescence:option.absValue,
					qdtList:option.filterOption.filterCondition
				}
			},
			methods: {
				selectChange: function(val){
					SXarr.forEach(function(item){
						if(item.nameId == id){
							item.tempValue1 = val;
						}
					})
					refreshChart(val, undefined, id);
				}
			}
	
		});
	}
	if (option.dateType == "range") {
		refreshChart(option.beginDate, option.endDate, id);
	} else {
		refreshChart(option.absValue, undefined, id);
	}
}
// 时间拼接
function dateFormat(type){
	if(type == "timePicker"){
		return bval = Hour + ':' + minute + ':' + second;
	}else if(type == "datePicker"){
		return bval = year + '-' + month + '-' + day;
	}else{
		return bval = year + '-' + month + '-' + day + ' ' + Hour + ':' + minute + ':' + second;
	}
}
// 字体大小单位设定
function htmlFontSize(dom, radix){
	$('html').css("font-size", dom.width()/radix);
	$(window).bind("resize", function() {
		$('html').css("font-size", dom.width()/radix);
	});
}
// JSON方法
function copyAndClear(obj){
	return parseMore(stringifyMore(obj));
}
function stringifyMore(obj) {
	var s=JSON.stringify(obj, function(key, val) {
	if (typeof val === 'function') {
		return val + '';
	}
	return val;
	});
	return s;
}
function parseMore(s) {
	return JSON.parse(s,function(k,v){
	if(v!=null&&v.indexOf && v.indexOf('function') > -1){
		return eval("(function(){return "+v+" })()")
	}
	return v;
	});
}