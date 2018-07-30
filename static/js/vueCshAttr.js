// 画布属性
var HBarr;
function HBInitializationFun(){
	HBarr = new Vue({
		el: '#infrastructure',
		data: function() {
			return {
				huabuName: "",
				subject: "",
				backgroundColor: "rgba(0,0,0,0)",
				backgroundColor1: "rgba(0,0,0,0)",
				checked: "",
				refreshTime: 0,
				refreshTime1: 0,
				multiple: 1,
				multiple1: 1,
				addScreen: 0,
				value1: true,
				color: "rgba(0,0,0,0)",
				color1: "rgba(0,0,0,0)",
				crosswise: 0,
				crosswise1: 0,
				portrait: 0,
				portrait1: 0,
				activeNames:"",
				radio: "ratio1",
				radio1: "fbl1",
				data: []
			}
		},
		methods: {
			buttonGet: function(){
				WGopacity("rgba(0,0,0,0)");
				//gis截图
				var photo="";
				canvasArray.forEach(function(item,i) {
					if(allOptions[i].chartType=="GIS"){
						var url = getStaticImgUrl(i);
						var result;
						res=getDataFromAjax(ctx+"/qd/qdDesign/baocun", {
							destUrl:url
						});
						photo+=res+",";
						result=projectName+res;
						$('#'+canvasArray[i].id).hide();
						$('#'+canvasArray[i].id).parent().append("<img src='"+result+"' style='z-index:9999; width:100%; height:100%;position:absolute; top:0;' id='temp"+canvasArray[i].id+"'>");
					}else if(allOptions[i].type=="svg"){
						$('#'+canvasArray[i].id).parent().append('<canvas id="temp'+canvasArray[i].id+'" style="z-index:9999;position:absolute;"></canvas>');
						$('#'+canvasArray[i].id).hide();
						var svgDom=$('#'+canvasArray[i].id)[0];
						//判断是否存在背景色
						if($('#'+canvasArray[i].id)[0].innerHTML.trim().indexOf('background-color')>-1){
							var cc=$('#'+canvasArray[i].id).clone();
							cc.find('svg').prepend('<rect width="100%" height="100%" style=" fill: '+$('#'+canvasArray[i].id+' svg').css('background-color')+' "/>');
							svgDom=cc[0];
						}
						canvg(document.getElementById('temp'+canvasArray[i].id), svgDom.innerHTML.trim(), { ignoreMouse: true, ignoreAnimation: true });
						$("#temp"+canvasArray[i].id).css({width:$('#'+canvasArray[i].id).width(),height:$('#'+canvasArray[i].id).height(),top:0});
					}else if(allOptions[i].staticType=="dynamicMap"){
						var dynamicMap = canvasArray[i].chart.getDataURL();
						$('#'+canvasArray[i].id).parent().append("<img src='"+dynamicMap+"' style='z-index:9999; position:absolute;' id='temp"+canvasArray[i].id+"'>");
						$('#'+canvasArray[i].id).hide();
					}
				});
				photo.substring(0,photo.length-1);
				$('#baidu').val(photo);
				html2canvas($('#palette'), {
					onrendered : function(canvas) {
						dataUrl = canvas.toDataURL();
						$(".cover").css("background","url(" + dataUrl + ") 0 0/100% 100%");
						// gis恢复
						canvasArray.forEach(function(item,i) {
							if(allOptions[i].chartType=="GIS"){
								$('#'+canvasArray[i].id).show();
								$("#temp"+canvasArray[i].id).remove();
							}else if(allOptions[i].type=="svg"){
								$('#'+canvasArray[i].id).show();
								$("#temp"+canvasArray[i].id).remove();
							}else if(allOptions[i].staticType=="dynamicMap"){
								$('#'+canvasArray[i].id).show();
								$("#temp"+canvasArray[i].id).remove();
							}
							 if($('#baidu').val()!="" && $('#baidu').val()!=null){
							 	submitData(ctx+"/qd/qdDesign/deleteFile",{filePath:$('#baidu').val()} , function(data) {});
							 }
						});
						if(HBSX.show){
							WGopacity(HBSX.color);
						}
					}
				});
				this.activeNames = "1";
			},
			inputGet: function(val, type){
				if (type == "name"){
					HBSX.name = val;
				}else{
					var aval = Number(val);
					if(aval>=0 && aval <= 10000){
						HBSX.addScreen = aval;
						scale = (100 + aval)/100;
						screenInitialization(HBSX);
						if (aval < thisVal1) {
							allOptions.forEach(function(item, i){
								var he = 100 - item.staticOption.boxSize.height/scale;
								var tp = item.staticOption.position.top/scale;
								if (tp > he) {
									item.staticOption.position.top = he*scale;
								}
							});
						}
						thisVal1 = val;
						hengWangge(HBSX.HXshu);
						addscreen();
					}else{
						top.layer.alert('增加百分比必须是大于等于0且小于等于10000的数');
						this.addScreen = thisVal1;
					}
				}
			},
			selectGet: function(val){
				if(val != ""){
					themeList.forEach(function(item,i) {
						if (item.id == val) {
							if(item.themeJs != null && item.themeJs != undefined){
								var optionStr_ = item.themeJs.replace(/&quot;/g, '"');
								theme = JSON.parse(optionStr_);
							}else{
								theme = null;
							}
						}
					});
				}else{
					theme = null;
				}
				ztqh(theme);
				HBSX.subject = val;
			},
			get: function(val,type) {
				HBcolorChange(val,type);
				var atype = type+"1";
				this[type] = aval;
				this[atype] = aval;
			},
			inputColorGet: function(val, type){
				if(CheckIsColor(val)){
					HBcolorChange(val,type)
					this[type] = aval;
				}else{
					var atype = type+"1";
					this[atype] = this[type];
				}
			},
			BJget: function(val){
				HBSX.checked = val;
				$(".beijing").toggleClass("hidden");
				if(!val){
					HBSX.backgroundImage=""
					bgImage(HBSX.backgroundImage);
					// scroll($(".basisSet"));
				}
			},
			sliderGet: function(val, type){
				HBsliderChange(val, type);
				var atype = type+"1";
				this[atype] = val;

			},
			sliderInpGet: function(val, type, min, max, step){
				val = Number(val);
				var atype = type+"1";
				if(val>=min && val<=max){
					if(step == 1){
						val = Math.round(val)
					}else if(step == 0.1){
						val = Number(val.toFixed(1));
					}
					HBsliderChange(val, type);
					this[type] = val;
					this[atype] = val;
				}else{
					this[atype] = this[type];
				}
			},
			showGet: function(val){
				HBSX.show = val;
				if(!val){
					WGopacity("rgba(0,0,0,0)");
				}else{
					WGopacity(HBSX.color);
				}
			},
			radioGet: function(val){
				scroll($("#palette"));
				HBSX.screen = val;
				screenInitialization(HBSX);
			},
			fblGet: function(val){
				if(val == "fbl1"){
					HBSX.screenSize.width = 1366;
					HBSX.screenSize.height = 768;
				}else if(val == "fbl2"){
					HBSX.screenSize.width = 1440;
					HBSX.screenSize.height = 900;
				}else if(val == "fbl3"){
					HBSX.screenSize.width = 1920;
					HBSX.screenSize.height = 1080;
				}else{
					var fbw = Number($(".finput input:eq(0)").val());
					var fbh = Number($(".finput input:eq(1)").val());
					HBSX.screenSize.width = fbw;
					HBSX.screenSize.height = fbh;
				}
				HBSX.FenBl = val;
				bigScreen(HBSX);
			},
			initialValue: function(item, themeList){
				this.huabuName = item.name;
				this.backgroundColor = item.backgroundColor;
				this.backgroundColor1 = item.backgroundColor;
				this.checked = item.checked;
				this.refreshTime = Number(item.refreshTime);
				this.refreshTime1 = item.refreshTime;
				this.multiple = Number(item.multiple);
				this.multiple1 = item.multiple;
				this.addScreen = item.addScreen;
				this.value1 = item.show;
				this.color = item.color;
				this.color1 = item.color;
				this.crosswise = Number(item.HXshu);
				this.crosswise1 = item.HXshu;
				this.portrait = Number(item.ZXshu);
				this.portrait1 = item.ZXshu;
				this.activeNames =item.activeNames;
				this.radio = item.screen;
				this.radio1 = item.FenBl;
				this.data = themeList;
				this.subject = item.subject;
				this.selectGet(item.subject)
				hengWangge(item.HXshu);
				zongWangge(item.ZXshu);
			}
		}
	});
	$(".fbl").addClass("hidden");
	var backOption = {
			success : function(layero, index) {
				var iframeWin = layero.find('iframe')[0]; // 得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
				iframeWin.contentWindow.index = index;
				iframeWin.contentWindow.addImg = bgImage;
			}
		};
	$('#BGimage').click(function() {
		openDialogUploader("上传图片",ctx+"/qd/images/userRefImage/list", "800px", "500px"," ", backOption);
	});
	// 屏幕扩展
	function addscreen(){
		oBox.forEach(function(item, i){
			item.style.top = allOptions[i].staticOption.position.top/scale +"%";
			$(item).height(allOptions[i].staticOption.boxSize.height/scale+"%");
		});
		echartResize();
	}
	// 主题切换图表切换
	function ztqh(theme) {
		canvasArray.forEach(function(item, i) {
			if (allOptions[i].type == "echarts" || allOptions[i].type == "echarts2") {
				var option = $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption)
				if (allOptions[i].chartType == "table") {
					myChart = null;
					special(option, item.id);
					tableSeriesArrFun(option, item.id);
					tetbBackfun(option, item.id);
				} else if (allOptions[i].chartType == "text") {
					myChart = null;
					special(option, item.id);
					textSeriesArrFun(option, item.id);
					tetbBackfun(option, item.id);				
				} else if (allOptions[i].chartType == "GIS") {} else {
					item.chart.dispose();
					item.chart = null;
					$("#" + item.id).remove();
					if (HBSX.screen != "ratio3") {
						element = $('<div class="element" id="'+item.id+'"></div>').appendTo(oBox[i]);
					} else {
						element = $('<div class="element" id="'+item.id+'"></div>').appendTo(mooBox[i]);
					}
					console.log(theme)
					if (allOptions[i].type == "echarts2") {
						myChart = echarts2.init(document.getElementById(item.id), theme);
					} else {
						myChart = echarts.init(document.getElementById(item.id), theme);
					}
					myChart.setOption(option);
				}
				item.chart = myChart;
			}else if(allOptions[i].type=="text"){
				$("#"+item.id).children().css("color", allOptions[i].staticOption.color || theme.title.textStyle.color);
			}
		});
	}
}
// 网格颜色改变方法
	function WGopacity(color){
		var val = HBSX.HXshu * ((100+HBSX.addScreen)/100);
		for (var i = 1; i < val; i++) {
			$(".heng" + i).css("background-color", color);
		}
		for (var i = 1; i < HBSX.ZXshu; i++) {
			$(".zong" + i).css("background-color", color);
		}
	}
	// 网格生成
	function hengWangge(val){
		$("#HBgrid").children('div').remove(".heng");
		var valh = val * scale;
		if(HBSX.show){
			var color = HBSX.color;
		}else{
			var color = "rgba(0,0,0,0)";
		}
		for (var i = 1; i < valh; i++) {
			$("<div></div>").addClass("heng" + i).addClass("heng").prependTo($("#HBgrid"));
			$(".heng" + i).css({
				"background-color": color,
				top: i / valh * 100 + "%"
			});
		}
		HBSX.HXshu = val;
	}
	function zongWangge(val){
		$("#HBgrid").children('div').remove(".zong");
		if(HBSX.show){
			var color = HBSX.color;
		}else{
			var color = "rgba(0,0,0,0)";
		}
		for (var i = 1; i < val; i++) {
			$("<div></div>").addClass("zong" + i).addClass("zong").prependTo($("#HBgrid"));
			$(".zong" + i).css({
				"background-color": color,
				left: i / val * 100 + "%"
			});
		}
		HBSX.ZXshu = val;
	}
// 图表
var VueChartattr;
function ChartAttr(id){
	// 图表
	VueChartattr = new Vue({
		el: '#'+ id,
		data: function() {
			return chartObj
		},
		methods: {
			initialValue: function(oitem, id){
				var type = oitem.type;
				var ochartOption = $.extend(true, {}, oitem.dataOption, oitem.staticOption.chartOption);
				var chartType = oitem.chartType;				
				$(".TabsChart").hide();
				$(".TabsTbTe").hide();
				$("#echartBKC").hide();
				$("#tbteBKC").hide();
				$("#gisAtrr").hide();
				$("#heatMapAtrr").hide();
				$("#textTab").hide();
				$("#tableTab").hide();
				$(".shufflingBtn").hide();
				if(type != "heightcharts"){
					// 3d
					$(".TabsHightChart").hide();	
					$("#Hchart").hide();
					var staticType = oitem.staticOption.staticType;
					if(chartType == "GIS"){
						$("#gisAtrr").show();
					}else if(chartType == "text" || chartType == "table"){
						$("#titleTab").show();
						$("#tbteBKC").show();
						$(".TabsTbTe").show();
						if(chartType == "text"){
							$("#textTab").show();
						}else{
							$("#tableTab").show();
							if(staticType == "table"){
								$(".ordinaryTable").show();
							}else{
								$(".ordinaryTable").hide();
								$(".shufflingBtn").show();
							}
						}
					}else{
						if(staticType !="heatmap"){
							$("#echartBKC").show();
							$(".TabsChart").show();
							var axis = ochartOption.xAxis;
							var radar = ochartOption.radar;
							var geo = ochartOption.geo;
							radar == undefined ? $("#radarTab").hide() : $("#radarTab").show();
							axis == undefined ? $("#axisTab").hide() : $("#axisTab").show();
							geo == undefined ? $("#geoTab").hide() : $("#geoTab").show();
							var rectangularId = haveValue(ochartOption, "TabsAxis", "string") || "xAxis";
							tabsSelected(rectangularId, "rectangular");
						}else{
							$("#heatMapAtrr").show();
							$("#Tabslegend").show();
						}
						var legendId = haveValue(ochartOption, "Tabssecond", "string") || "legend";				
						tabsSelected(legendId, "legend");					
					}					
				}else{
					$(".TabsHightChart").show();
					$("#Hchart").show();
					$("#3dbar").show();					
					if(chartType == "pie"){
						$("#HaxisTab").hide();
						$("#3dbar").hide();
						$("#HchartsSeriesPie").show();
						$("#HchartsSeriesBar").hide();
					}else{
						$("#HchartsSeriesPie").hide();
						$("#HchartsSeriesBar").show();
					}
				}	
				switch (id){
					case "general":
						//通用
						general(this, ochartOption, oitem, chartType, staticType);
						if(type == "heightcharts"){
							Hchart(this, ochartOption, oitem);
						}
					break;
					case "Tgrid":
						//绘图网格
						gridFun(this, ochartOption)
					break;
					case "series":
						//系列
						seriesListArr(this, ochartOption, oitem);
					break;
					case "textSeries":
						//系列
						seriesListArr(this, ochartOption, oitem);
					break;
					case "tableSeries":
						//系列
						seriesListArr(this, ochartOption, oitem);
					break;
					case "title":
						//标题
						title(this, ochartOption, oitem);
					break;
					case "radar":
						//视区
						radarFun(this, ochartOption, oitem);
					break;
					case "rectangular":
						//直角坐标系
						rectangularFun(this, ochartOption, oitem);
					break;
					case "geo":
						//地理坐标系
						geoFun(this, ochartOption, oitem);
					break;
					case "legendVisualMap":
						//图例与视觉映射
						legendVisualMap(this, ochartOption, oitem);
					break;
					case "tooltip":
						//提示
						tooltip(this, ochartOption, oitem);
					break;
					//heightchart 
					case "Htitle":
						//标题
						Htitle(this, ochartOption, oitem);
					break;
					case "Hseries":
						//标题
						Hseries(this, ochartOption, chartType);
					break;
					case "Hlegend":
						//  图例
						Hlegend(this, ochartOption, oitem);
					break;
					case "Hrectangular":
						//  直角坐标系
						Hrectangular(this, ochartOption, oitem);
					break;
					case "Htooltip":
						//提示
						Htooltip(this, ochartOption, oitem);
					break;
					default:
					break;
				}
			},
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.generalObj.boxId;
				elementCreateFun(id);
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			switchGet: function(val, DataType, btype){
				chartSwitch(val, DataType, "boolean", btype);
			},
			inputGet: function(val, DataType, atype, unit, num, btype){
				if(atype == "number"){
					val = parseInt(val);
					if(val+"" == "NaN"){
						val = "";
					}
				}else{
					if((val+"").indexOf("function")> -1){
						val =  eval("(function(){return "+val+" })()");
					}
				}
				if(unit == "http"){
					if(val.indexOf("http")>-1){
						val = val.split("://")[1];
						if(num != null){
							this.titleObj[num] = val;
						}else{
							this.generalObj.href = val;
						}
					}
					val = "http://" + val;					
				}else if(unit == "%"){
					val = val + unit;
				}
				if(val == ""){
					btype = "reconstruction";
				}
				chartInput(val, DataType, atype, num, btype);
			},
			selectGet: function(val, DataType, atype, mapType, btype, num){
				if(mapType == "href"){
					if(val != "" && val != null){
						val = "/qd/qdDesign/view?id=" + val;
					}
				}
				chartSelect(val, DataType, atype, mapType, btype, num, this);
			},
			sliderGet: function(val, type, DataType, unit, atype, attrNum, btype){
				chartSilderFun(val, DataType, unit, atype, attrNum, btype);
				sliderSetValue(this, type+"1", val);
			},
			sliderInpGet: function(val, type, DataType, min, max ,step, unit, atype, attrNum, btype){
				val = Number(val);
				if(val>=min && val<=max){
					if(step == 1){
						aval = Number(Math.round(val));
					}else if(step == 0.1){
						aval = Number(val.toFixed(1));
					}else if(step == 0.01){
						aval = Number(val.toFixed(2));
					}
					chartSilderFun(aval, DataType, unit, atype, attrNum, btype);
					sliderSetValue(this, type, val);
				}else{
					sliderSetValue(this, type+"1", thisVal);
				}
			},
			inputColor: function(val){
				thisVal = val;
			},
			colorGet: function(val, type, DataType, atype, colorNum, btype){
				chartColor(val, DataType, atype, colorNum, btype);
			},
			inputColorGet: function(val, type, DataType, atype, colorNum, btype){
				if(CheckIsColor(val)){
					chartColor(val, DataType, atype, colorNum, btype);
				}else{
					sliderSetValue(this, type, thisVal);
				}
			},
			colorAdd: function(listType, type, DataType, atype, btype){
				var len = colorAddSetValue(this, listType);
				chartColor("#cccccc", DataType, atype, len, btype);
			},
			gradientColorGet: function(val, valType, type, type1, type2, type3, DataType, index){
				var athis = this;
				canvasArray.forEach(function(item, i){
					if(item.id == sxID){
						var thisVal = haveValue(allOptions[i].staticOption.chartOption, valType, "string");
						if(thisVal != val){
							objectCompletion(allOptions[i].staticOption.chartOption, val, valType, "string", null, null);
							if(val == "ordinary"){
								typesplit(athis, type, null);
								chartColor(null, DataType, "string", null, "reconstruction", "switch");
							} else{
								typesplit(athis, type1, "rgba(0,0,0,0)");
								typesplit(athis, type2, "rgba(0,0,0,0)");
								typesplit(athis, type3, "linear");
								chartColor("rgba(0,0,0,0)", DataType, "object", 0, null, "switch");
								chartColor("rgba(0,0,0,0)", DataType, "object", 1, null, "switch");
							}
							historyFun(allOptions[i], i);
						}
					}
				});
			},
			tabClickGet: function(val, DataType, index, data){
				var athis = this;
				canvasArray.forEach(function(item, i){
					if(item.id == sxID){
						objectCompletion(allOptions[i].staticOption.chartOption, val, DataType, "string");
						var ochartOption = $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption);
						if(data == "series"){
							var type = ochartOption.series[index].type;
							seriesCollapse(val, ochartOption, index, athis, type);
						}
						historyFun(allOptions[i], i);
					}
				});
			},
			tabPositionGet: function(val, type, type1, type2,DataType1,DataType2, left, top, left1, top1){
				var athis = this;
				canvasArray.forEach(function(item, i){
					if(item.id == sxID){
						var thisVal = allOptions[i].staticOption.chartOption[type];
						if(thisVal != val){
							allOptions[i].staticOption.chartOption[type] = val;
							if(val == "custom"){
								sliderSetValue(athis, type1, left);
								sliderSetValue(athis, type1+"1", left);
								sliderSetValue(athis, type2, top);
								sliderSetValue(athis, type2+"1", top);
								chartSilderFun(left, DataType1, "%", "number", null, null, "switch");
								chartSilderFun(top, DataType2, "%", "number", null, null, "switch");
							}else{
								sliderSetValue(athis, type1+"2", left1);
								sliderSetValue(athis, type2+"2", top1);
								chartRadio(left1, DataType1, "string", "switch");
								chartRadio(top1, DataType2, "string", "switch");
							}
							historyFun(allOptions[i], i);
						}
					}
				});
			},
			tabPositionGet1: function(val, DataType, atype){
				var athis = this;
				canvasArray.forEach(function(item, i){
					if(item.id == sxID){
						var thisVal = haveValue(allOptions[i].staticOption.chartOption, DataType, "string");
						if(thisVal != val){
							objectCompletion(allOptions[i].staticOption.chartOption, val, DataType, atype);
							if(val == "common"){
								athis.generalObj.serlctHref="";
							} else{
								athis.generalObj.href="";
							}
							objectCompletion(allOptions[i].staticOption.chartOption, "", "href", atype);								
						}
					}
				});
			},
			tabsComCusFun: function(val, DataType, DataType1, atype, btype, ctype){
				var athis = this;
				canvasArray.forEach(function(item, i){
					if(item.id == sxID){
						objectCompletion(allOptions[i].staticOption.chartOption, val, DataType, atype);				
						if(ctype == "list"){
							sliderSetValue(athis, btype+"1", null);
							sliderSetValue(athis, btype+"2", null);
							objectCompletion(allOptions[i].staticOption.chartOption, null, DataType1, "array", 0, "linksSymbol");
							objectCompletion(allOptions[i].staticOption.chartOption, null, DataType1, "array", 1, "linksSymbol");
						}else{
							sliderSetValue(athis, btype, null);
							objectCompletion(allOptions[i].staticOption.chartOption, null, DataType1, atype);
						}
						removeChart(i, item);
					}
				});
			},
			axisPointerGet: function(val, DataType){
				canvasArray.forEach(function(item, i){
					if(item.id == sxID){
						var thisVal = haveValue(allOptions[i].staticOption.chartOption, DataType, "string");
						if(thisVal != val){
							objectCompletion(allOptions[i].staticOption.chartOption, val, DataType, "string");
							historyFun(allOptions[i], i);
						}
					}
				});
			},
			radioGet: function(val, DataType, atype, btype, num,){
				if(val != ""){
					chartRadio(val, DataType, atype, btype, num, this);

				}
			}
		}
	});
}
// 图形
var VueGraphicattr
function svgInitializationFun(){
	VueGraphicattr	= new Vue({
		el: '#graphicattr',
		data: function() {
			return {
				boxId:"",
				allTabList:[],
				options1: options1,
				hrefList:[],				
				svgObj:{
					borderWidth: 1,
					borderRadius: 1
				}
			}
		 },
		methods: {
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.boxId;
				elementCreateFun(id);
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			inputGet: function(val, type, DataType, atype){
                attrFun(val, DataType, atype, "init");
            },
            inputColor: function(val){
                thisVal = val;
            },
            colorGet: function(val, DataType){
                attrFun(val, DataType, "string", "init");
            },
            inputColorGet: function(val, type, DataType){
                if(CheckIsColor(val)){
                    attrFun(val, DataType, "string", "init");
                }else{
                    this[type] = thisVal;
                }
			},
			selectGet: function(val, DataType){
                attrFun(val, DataType, "string");
            },
            sliderGet: function(val, type, DataType){
                attrFun(val/100, DataType, "number");
				sliderSetValue(this, type + "1", val);
            },
            sliderInpGet: function(val, type, DataType, min, max ,step){
                val = Number(val);
                if(val>=min && val<=max){
                    if(step == 1){
                        val = Number(Math.round(val));
                    }else if(step == 0.1){
                        val = Number(val.toFixed(1));
                    }
                    attrFun(val/100, DataType, "number");
					sliderSetValue(this, type, val);
                }else{
					sliderSetValue(this, type + "1", thisVal);
                }
            },
            radioGet: function(val, DataType){
                if(val != undefined){
                    attrFun(val, DataType, "string");
                }
            },
            tabPositionGet: function(val, DataType){
                this.serlctHref="";
                this.href="";
                attrFun(val, DataType, "string");
                attrFun("", "href", "string");
            },
            seelectHref: function(val, DataType){
                if(val != "" && val != null){
                    val = "/qd/qdDesign/view?id=" + val;
                }
                attrFun(val, DataType, "string");
            },
			initialValue: function(oitem){
				this.boxId = "";
				this.allTabList = allTabList;
				this.boxId = haveValue(oitem, "boxId", "string") || "contet";
				this.allTabList = allTabList;
                this.hrefList = hrefList;
				var fill = haveValue(oitem, "fill.color", "string");
				fill = fill == "transparent" ? "rgba(0,0,0,0)" : fill;	
				var backgroundColor = haveValue(oitem, "background.color", "string");		
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;	
                var borderWidth = Math.round((haveValue(oitem, "border.width", "number")|| 0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var borderColor = haveValue(oitem, "border.color", "string");
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;	
				this.svgObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					fill: fill || "#758697",
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid",
					hrefChange: haveValue(oitem, "hrefChange", "string") || "common",
					href: null,
					serlctHref: "",
					target: oitem.target || "self"
				}
                var href = oitem.href || "";	
				if(href.indexOf("qd/qdDesign") > -1){				
					this.svgObj.serlctHref = href.split("/qd/qdDesign/view?id=")[1];
				}else{
					if(href.indexOf("://")>-1){
						href = href ? href.split("://")[1] : "";
					}
					this.svgObj.href = href;
				}
			}
		}
	});
	function attrFun(val, DataType, atype, btype){
		canvasArray.forEach(function(item, i){
			if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					TXSXCSH($("#"+sxID), oitem);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
			}
		});
	}
}
// tabs
var VueTabsattr;
function tabsInitializationFun(){
	VueTabsattr = new Vue({
		el: '#tabsattr',
		data: function() {
			return {
				tabsList:[],				
				tabsObj: {
					time:1,
					borderWidth: 1,
					borderRadius:1,
					unselected: {
						fontSize: 14,
						letterSpacing: 1,
						borderWidth: 1
					},
					selected: {
						fontSize: 14,
						letterSpacing: 1,
						borderWidth: 1,
					}
				},
				options:options,
				options1: options1
			}
		},
		methods: {
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			tabsClick: function(){
				attrFun(true, "editor", "boolean");
				$('#' + sxID).siblings().filter(".border").removeClass('borHover1').hide();
				$('#' + sxID).siblings().filter(".scal").hide();
				$("#"+sxID).parent().siblings(".rightFunction").hide();
				tabsId = $($("#"+sxID).children(".tabsBody").children()[this.tabsObj.tabIndex]).attr("id");
			},
			tabSelectGet: function(val, DataType, atype){
				attrFun(val, DataType, atype);
				this.tabsObj.tabName = this.tabsList[val].name;
			},
			switchGet: function(val, DataType){
				attrFun(val, DataType, "boolean");
			},
			inputGet: function(val, DataType, atype){
				attrFun(val, DataType, atype, "init");
				var index = this.tabsObj.tabIndex;
				this.tabsList[index].name = val;
				$("#"+sxID).children(".tabsTitle").children().eq(index).children().text(val);
			},
			tabsListAdd: function(){
				var len;
				canvasArray.forEach(function(item, i){
					if(item.id == sxID){
						var tabsList = allOptions[i].staticOption.tabsList;
						len = tabsList.length+1;
						var id = uuid();
						tabsList.push({name:"页面"+len, id:id});
						var tabsTitle = $("#"+sxID + " .tabsTitle");
						var tabsBody = $("#"+sxID + " .tabsBody");
						var width = 100/len + "%";
						$('<li data="'+id+'"><p>'+"页面"+len+'</p></li>').appendTo(tabsTitle);
						tabsList.forEach(function(item, i){
							tabsTitle.children().eq(i).css("width", width);
						});
						var box = $('<li id="'+id+'" class="tabBox"></li>').appendTo(tabsBody);
						$('<ol class="rightFunction"><li class="compile"></li><li class="copy"></li><li class="up"></li><li class="down"></li><li class="shut"></li></ol>').appendTo(box);	
					}
				});
				this.tabsObj.tabIndex = Number(len-1);
			},
			tabsListRemove: function(){
				canvasArray.forEach(function(item, i){
					if(item.id == sxID){
						var tabsList = allOptions[i].staticOption.tabsList;
						var len = tabsList.length-1;
						if(len){
							var id = tabsList.pop().id;
							var removeList = [];
							allOptions.forEach(function(item, i){
								var boxId = item.staticOption.boxId;
								if(boxId == id){
									elementDeteFun(i);
								}
							});
							var tabsTitle = $("#"+sxID + " .tabsTitle");
							var tabsBody = $("#"+sxID + " .tabsBody");
							tabsTitle.children().eq(len).remove();								
							var width = 100/(len) + "%";
							tabsList.forEach(function(item, i){
								tabsTitle.children().eq(i).css("width", width);
							});
							tabsBody.children("li:last").remove();
						}
					}
				});
				this.tabsObj.tabIndex = 0;
			},
			selectGet: function(val, DataType){
				attrFun(val, DataType, "string");
			},
			inputColor: function(val){
				thisVal = val;
			},
			colorGet: function(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
			inputColorGet: function(val, type, DataType){
				if(CheckIsColor(val)){
					attrFun(val, DataType, "string", "init");
				}else{
					this[type] = thisVal;
				}
			},
			sliderGet: function(val, type, DataType){
				if(DataType == "time"){
					attrFun(val, DataType, "number");
				}else{
					attrFun(val/100, DataType, "number");
				}
				sliderSetValue(this, type+"1", val)
			},
			sliderInpGet: function(val, type, DataType, min, max ,step){
				val = Number(val);
				if(val>=min && val<=max){
					if(step == 1){
						val = Number(Math.round(val));
					}else if(step == 0.1){
						val = Number(val.toFixed(1));
					}
					if(DataType == "time"){
						attrFun(val, DataType, "number");
					}else{
						attrFun(val/100, DataType, "number");
					}
					sliderSetValue(this, type, val);
				}else{
					sliderSetValue(this, type+"1", thisVal)
				}
			},
			radioGet: function(val, DataType){
				attrFun(val, DataType, "string");
			},
			initialValue: function(oitem){
				this.tabsList = oitem.tabsList;
				var tabIndex = Number(haveValue(oitem, "tabIndex", "number") || 0);
				var tabName = oitem.tabsList[tabIndex].name;		
				var time = haveValue(oitem, "time", "number") || 0;
				var show = haveValue(oitem, "tabShow", "boolean");
				show = show == null ? true : show;
				var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var borderColor = haveValue(oitem, "border.color", "string");
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;	
				this.tabsObj = {
					tabIndex: tabIndex,
					tabName: tabName,					
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					time: time,
					time1: time,
					select: haveValue(oitem, "select", "string") || "selected",
					tabShow: show,
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid",
					unselected: {},
					selected: {}
				}
				tabsStyle(this, "unselected", oitem);
				tabsStyle(this, "selected", oitem);
				function tabsStyle(athis, type, oitem){
					var fontSize = haveValue(oitem, type+"font.size", "number");
					fontSize = fontSize == null ? 18 : Math.round(fontSize*100);
					var letterSpacing = Math.round((haveValue(oitem, type+"letter.spacing", "number")||0)*100);
					var color = haveValue(oitem, type+".color", "string");
					color = color == "transparent" ? "rgba(0,0,0,0)" : color;			
					athis.tabsObj[type] = {
						fontWeight: haveValue(oitem, type+".fontWeight", "string") || "normal",
						fontStyle: haveValue(oitem, type+".fontStyle", "string") || "normal",
						fontFamily:  haveValue(oitem, type+".fontFamily", "string") || "sans-serif",
						fontSize: fontSize,
						fontSize1: fontSize,
						letterSpacing: letterSpacing,
						letterSpacing1: letterSpacing,
						color: haveValue(oitem, type+".color", "string") || "#333333",
						backgroundColor: null,
						borderWidth: null,
						borderWidth1: null,
						borderColor: null
					}
					var backgroundColor = haveValue(oitem, type+".backgroundColor", "string");	
					if(type == "unselected"){
						athis.tabsObj[type].backgroundColor =  backgroundColor|| "#eeeeee";
					}else{
						athis.tabsObj[type].backgroundColor =  backgroundColor|| "";
						athis.tabsObj[type].borderWidth = haveValue(oitem, type+".borderWidth", "number")||0;					
						athis.tabsObj[type].borderWidth1 = haveValue(oitem, type+".borderWidth", "number")||0;	
					}
					athis.tabsObj[type].borderColor = haveValue(oitem, "selected.borderColor", "string") || "#409EFF";
				}
			}
		}
	});
	function attrFun(val, DataType, atype, btype){
		canvasArray.forEach(function(item, i){
			if(item.id == sxID){
				var oitem = allOptions[i].staticOption
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(allOptions[i].staticOption, val, DataType, atype);
					tabSXCSH($("#"+sxID), allOptions[i].staticOption);
					if(DataType == "tabShow"){
						if(val){
							$("#"+sxID).children(".tabsTitle").show();
							$("#"+sxID).children(".tabsBody").css("height", "90%");
						}else{
							$("#"+sxID).children(".tabsTitle").hide();
							$("#"+sxID).children(".tabsBody").css("height", "100%");
						}
						tabsResize(i);
					}else if(DataType == "editor"){
						clearInterval(item.timer);
					}else if(DataType == "tabIndex"){
						var editor = haveValue(allOptions[i].staticOption, "editor", "boolean") || false;
						tabSelectedFun(val, sxID);
						if(editor){
							tabsId = allOptions[i].staticOption.tabsList[val].id;
						}else{
							var len = allOptions[i].staticOption.tabsList.length;
							var time = Number(allOptions[i].staticOption.time || 0);							
							tabSwitchFun(time, val, len,  sxID, item);								
						}
					}else if(DataType == "time"){
						var editor = haveValue(allOptions[i].staticOption, "editor", "boolean") || false;
						if(!editor){
							var len = allOptions[i].staticOption.tabsList.length;
							var tabIndex = Number(allOptions[i].staticOption.tabIndex || 0);							
							tabSwitchFun(val, tabIndex, len,  sxID, item);								
						}
					}
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
			}
		});
	}
}
// 文本输入
var VueTextattr;
function textInitializationFun(){
    VueTextattr = new Vue({
        el: '#textattr',
        data: function() {
            return {
                boxId:"",
				allTabList: [],
				hrefList: [],
				options: options,
				options1: options1,
				textObj: {
					fontSize: 14,
					letterSpacing:1,
					lineHeight:2,
					borderWidth:1,
					borderRadius:1,
					serlctHref: "aasas"
				}
            }
        },
        methods: {
            cascaderGet: function(val){
                eleLocationFun(val);
            },
            eleCreatFun: function(){
                var id = this.boxId;
                elementCreateFun(id);
            },
            inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
            inputGet: function(val, type, DataType, atype){
                attrFun(val, DataType, atype, "init");
            },
            inputColor: function(val){
                thisVal = val;
            },
            colorGet: function(val, DataType){
                attrFun(val, DataType, "string", "init");
            },
            inputColorGet: function(val, type, DataType){
                if(CheckIsColor(val)){
                    attrFun(val, DataType, "string", "init");
                }else{
                    this[type] = thisVal;
                }
			},
			selectGet: function(val, DataType){
                attrFun(val, DataType, "string");
            },
            sliderGet: function(val, type, DataType){
                if(type == "textObj.lineHeight"){
                    attrFun(val, DataType, "number");
                }else{
                    attrFun(val/100, DataType, "number");
				}
				sliderSetValue(this, type + "1", val);
            },
            sliderInpGet: function(val, type, DataType, min, max ,step){
                val = Number(val);
                if(val>=min && val<=max){
                    if(step == 1){
                        val = Number(Math.round(val));
                    }else if(step == 0.1){
                        val = Number(val.toFixed(1));
                    }
                    if(type == "textObj.lineHeight"){
                        attrFun(val, DataType, "number");
                    }else{
                        attrFun(val/100, DataType, "number");
                    }
					sliderSetValue(this, type, val);
                }else{
					sliderSetValue(this, type + "1", thisVal);
                }
            },
            radioGet: function(val, DataType){
                if(val != undefined){
                    attrFun(val, DataType, "string");
                }
            },
            tabPositionGet: function(val, DataType){
                this.serlctHref="";
                this.href="";
                attrFun(val, DataType, "string");
                attrFun("", "href", "string");
            },
            seelectHref: function(val, DataType){
                if(val != "" && val != null){
                    val = "/qd/qdDesign/view?id=" + val;
                }
                attrFun(val, DataType, "string");
            },
            initialValue: function(oitem){
                this.boxId = haveValue(oitem, "boxId", "string") || "contet";
				this.allTabList = allTabList;
                this.hrefList = hrefList;				
				var fontSize = haveValue(oitem, "font.size", "number");
				fontSize = fontSize == null ? 16 : Math.round(fontSize*100);
                var letterSpacing = Math.round((haveValue(oitem, "letter.spacing", "number")||0)*100);
                var lineHeight = haveValue(oitem, "line.height", "number") || 1;
                var borderWidth = Math.round((haveValue(oitem, "border.width", "number")|| 0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var color = haveValue(oitem, "color", "string")
				color = color == "transparent" ? "rgba(0,0,0,0)" : color;
				var backgroundColor = haveValue(oitem, "background.color", "string")
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;
				var borderColor = haveValue(oitem, "border.color", "string") 
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;
				this.textObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					textarea: haveValue(oitem, "content", "string") || "",
					select: haveValue(oitem, "select", "string") || "",
					family: haveValue(oitem, "font.family", "string") || "sans-serif",
					color: color || haveValue(theme, "title.textStyle.color", "string") || "#333333",
					fontSytle: haveValue(oitem, "font.style", "string") || "normal",
					fontWeight: haveValue(oitem, "font.weight", "string") || "normal",
					fontSize: fontSize,
					fontSize1: fontSize,
					letterSpacing: letterSpacing,
					letterSpacing1: letterSpacing,
					lineHeight: lineHeight,
					lineHeight1: lineHeight ,
					textAlign: haveValue(oitem, "text.align", "string") || "center",
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid",
					hrefChange: haveValue(oitem, "hrefChange", "string") || "common",
					href: null,
					serlctHref: "",
					target: oitem.target || "self"
				}
                var href = oitem.href || "";	
				if(href.indexOf("qd/qdDesign") > -1){				
					this.textObj.serlctHref = href.split("/qd/qdDesign/view?id=")[1];
				}else{
					if(href.indexOf("://")>-1){
						href = href ? href.split("://")[1] : "";
					}
					this.textObj.href = href;
				}
            }
        }
    });
    function attrFun(val, DataType, atype, btype){
		canvasArray.forEach(function(item, i){
            if(item.id == sxID){
				var oitem = allOptions[i].staticOption
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					WBSXCSH($("#"+sxID), oitem);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
            }
        });
    }
}
// 文本滚动
var VueMarqueeattr;
function marqueeInitializationFun(){
    VueMarqueeattr = new Vue({
        el: '#marqueeattr',
        data: function() {
            return {
                boxId:"",
				allTabList:[],
				options: options,
				options1: options1,
				marqueeObj: {
					fontSize: 14,
					letterSpacing:1,
					lineHeight:2,
					borderWidth:1,
					borderWidth:1
				}
            }
        },
        methods: {
            cascaderGet: function(val){
                eleLocationFun(val);
            },
            eleCreatFun: function(){
                var id = this.boxId;
                elementCreateFun(id);
            },
            inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
            inputGet: function(val, type, DataType, atype){
				if(atype == "number"){
					val = Number(val);
					if(val+"" == "NaN"){
						sliderSetValue(this, type, null);
					}
				}
                if(DataType == "padding"){
					val = val/100;
				}
                attrFun(val, DataType, atype, "init");
			},
			collapseGet: function(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
            inputColor: function(val){
                thisVal = val;
            },
            colorGet: function(val, DataType){
                attrFun(val, DataType, "string", "init");
            },
            inputColorGet: function(val, type, DataType){
                if(CheckIsColor(val)){
                    attrFun(val, DataType, "string", "init");
                }else{
                    this[type] = thisVal;
                }
			},
			selectGet: function(val, DataType){
                attrFun(val, DataType, "string");
            },
            sliderGet: function(val, type, DataType){
                if(type == "marqueeObj.lineHeight"){
                    attrFun(val, DataType, "number");
                }else{
                    attrFun(val/100, DataType, "number");
				}
				sliderSetValue(this, type + "1", val);
            },
            sliderInpGet: function(val, type, DataType, min, max ,step){
                val = Number(val);
                if(val>=min && val<=max){
                    if(step == 1){
                        val = Number(Math.round(val));
                    }else if(step == 0.1){
                        val = Number(val.toFixed(1));
                    }
                    if(type == "marqueeObj.lineHeight"){
                        attrFun(val, DataType, "number");
                    }else{
                        attrFun(val/100, DataType, "number");
                    }
					sliderSetValue(this, type, val);
                }else{
					sliderSetValue(this, type + "1", thisVal);
                }
            },
            radioGet: function(val, DataType){
                if(val != undefined){
                    attrFun(val, DataType, "string");
                }
            },
            initialValue: function(item){
            	var oitem = item.staticOption;
                this.boxId = haveValue(oitem, "boxId", "string") || "contet";
				this.allTabList = allTabList;
				var time = haveValue(oitem, "time", "string");
				var fontSize = haveValue(oitem, "font.size", "number");
				fontSize = fontSize == null ? 16 : Math.round(fontSize*100);
                var letterSpacing = Math.round((haveValue(oitem, "letter.spacing", "number")||0)*100);
				var padding = haveValue(oitem, "padding", "number");
				padding = padding == null ? 20 : Math.round(padding*100);
                var lineHeight = haveValue(oitem, "line.height", "number") || 1;
                var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var color = haveValue(oitem, "color", "string")
				color = color == "transparent" ? "rgba(0,0,0,0)" : color;
				var backgroundColor = haveValue(oitem, "background.color", "string")
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;
				var borderColor = haveValue(oitem, "border.color", "string") 
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;
				this.marqueeObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					time: time == null ? 5 : time,
					textarea: haveValue(oitem, "content", "string") || "",
					select: haveValue(oitem, "select", "string") || "",
					family: haveValue(oitem, "font.family", "string") || "sans-serif",
					color: color || haveValue(theme, "title.textStyle.color", "string") || "#333333",
					fontSytle: haveValue(oitem, "font.style", "string") || "normal",
					fontWeight: haveValue(oitem, "font.weight", "string") || "normal",
					fontSize: fontSize,
					fontSize1: fontSize,
					letterSpacing: letterSpacing,
					letterSpacing1: letterSpacing,	
					padding: padding,
					lineHeight: lineHeight,
					lineHeight1: lineHeight ,
					textAlign: haveValue(oitem, "text.align", "string") || "center",
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid"
				}
            }
        }
    });
    function attrFun(val, DataType, atype, btype){
        canvasArray.forEach(function(item, i){
            if(item.id == sxID){
				var oitem = allOptions[i].staticOption
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					MQSXCSH($("#"+sxID), oitem);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
            }
        });
    }
}
// 数字翻牌
var VueCountUpattr;
function countUpInitializationFun(){
	VueCountUpattr  = new Vue({
		el: '#countUpattr',
		data: function() {
			return {
				boxId:"",
				options: options,
				options1: options1,
				allTabList:[],
				countUpObj: {
					prefix:{
						fontSize: 14,
						letterSpacing:1,
					},
					content:{
						fontSize: 14,
						letterSpacing:1,
					},
					suffix:{
						fontSize: 14,
						letterSpacing:1,
					},
					borderWidth:1,
					borderRadius: 1,
				}
			}
		},
		methods: {
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.boxId;
				elementCreateFun(id);
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			inputGet: function(val, type, DataType, atype, ctype){
				if(atype == "number"){
					val = Number(val);
					if(val+"" == "NaN"){
						sliderSetValue(this, type, null);
					}
				}
                if(DataType.indexOf("padding")>-1){
					val = val/100;
				}
				attrFun(val, DataType, atype, "init", ctype);
			},
			collapseGet(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
			selectGet: function(val, DataType){
				attrFun(val, DataType, "string");
			},
			inputColor: function(val){
				thisVal = val;
			},
			colorGet: function(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
			inputColorGet: function(val, type, DataType){
				if(CheckIsColor(val)){
					attrFun(val, DataType, "string", "init");
				}else{
					this[type] = thisVal;
					sliderSetValue(this, type, thisVal);
				}
			},
			sliderGet: function(val, type, DataType, ctype){
				if(ctype != undefined){
					attrFun(val, DataType, "number", null, ctype);
				}else{
					attrFun(val/100, DataType, "number", null, ctype);
				}
				sliderSetValue(this, type + "1", val);
			},
			sliderInpGet: function(val, type, DataType, min, max ,step, ctype){
				val = Number(val);
				if(val>=min && val<=max){
					if(step == 1){
						val = Number(Math.round(val));
					}else if(step == 0.1){
						val = Number(val.toFixed(1));
					}
					if(ctype != undefined){
						attrFun(val, DataType, "number", null, ctype);
					}else{
						attrFun(val/100, DataType, "number", null, ctype);
					}
					sliderSetValue(this, type, val);
				}else{
					sliderSetValue(this, type + "1", thisVal);
				}
			},
			radioGet: function(val, DataType){
				if(val != undefined){
					attrFun(val, DataType, "string");
				}
			},
			initialValue: function(item, type){
				var oitem = item.staticOption;
				var ditem = item.dataOption;
				this.type = type;
				this.boxId = haveValue(oitem, "boxId", "string") || "contet";
				this.allTabList = allTabList;
				var refreshTime = haveValue(oitem, "refreshTime", "number");
				refreshTime = refreshTime == null ? 0.3 : refreshTime;
				var duration = haveValue(oitem, "duration", "number");
				duration = duration == null ? 2.5 : duration;
				var decimals = haveValue(oitem, "decimals", "number");
				decimals = decimals == null ? 0 : decimals;
				var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var backgroundColor = haveValue(oitem, "background.color", "string")
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;
				var borderColor = haveValue(oitem, "border.color", "string") 
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;
				this.countUpObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					refreshTime: refreshTime,
					refreshTime1: refreshTime,
					prefixName: haveValue(oitem, "prefixName", "string") ||  haveValue(ditem, "series.0.textStyle.name", "string") || "",
					suffixName: haveValue(oitem, "suffixName", "string") || "",
					duration: duration,
					duration1: duration,
					decimals: decimals,
					decimals1: decimals,
					select: haveValue(oitem, "select", "string") || "",
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid",
					prefix:{},
					content:{},
					suffix:{},
				}
				textStyleFun("prefix", this);
				textStyleFun("content", this);
				textStyleFun("suffix", this);
				function textStyleFun(type, athis){
					var fontSize = haveValue(oitem, type+".font.size", "number");
					fontSize = fontSize == null ? 16 : Math.round(fontSize*100);
					var letterSpacing = Math.round((haveValue(oitem, type+".letter.spacing", "number")||0)*100);
					var padding = Math.round((haveValue(oitem, type+".padding", "number")||0)*100);
					var color = haveValue(oitem, type+".color", "string");
					color = color == "transparent" ? "rgba(0,0,0,0)" : color;
					athis.countUpObj[type] = {
						family: haveValue(oitem, type+".font.family", "string") || "sans-serif",
						color: color || "",
						fontSytle: haveValue(oitem, type+".font.style", "string") || "normal",
						fontWeight: haveValue(oitem, type+".font.weight", "string") || "normal",
						fontSize: fontSize,
						fontSize1: fontSize,
						letterSpacing: letterSpacing,
						letterSpacing1: letterSpacing,
						padding: padding
					}
				}
			}
		}
	});
	function attrFun(val, DataType, atype, btype, ctype){
        canvasArray.forEach(function(item, i){
            if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					if(ctype == "prefix"){
						$("#"+sxID).children().children(".prefix").text(val);
					}else if(ctype == "suffix"){
						$("#"+sxID).children().children(".suffix").text(val);
					}else if(ctype == "refreshTime"){
						independenceRefresh(val);
					}else{
						CPSXCSH($("#"+sxID), oitem);
					}
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
            }
        });
    }
}
var VueStatisticattr;
function statisticInitializationFun(){
	VueStatisticattr  = new Vue({
		el: '#statisticattr',
		data: function() {
			return {
				boxId:"",
				options: options,
				options1: options1,
				allTabList:[],
				statisticObj: {
					STprefix:{},
					dataStatistics:{},
					STsuffix:{}
				}
			}
		},
		methods: {
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.boxId;
				elementCreateFun(id);
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			inputGet: function(val, type, DataType, atype, ctype){
				if(atype == "number"){
					val = Number(val);
					if(val+"" == "NaN"){
						sliderSetValue(this, type, null);
					}
				}
                if(DataType.indexOf("padding")>-1){
					val = val/100;
				}
				attrFun(val, DataType, atype, "init", ctype);
			},
			collapseGet(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
			selectGet: function(val, DataType){
				attrFun(val, DataType, "string");
			},
			inputColor: function(val){
				thisVal = val;
			},
			colorGet: function(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
			inputColorGet: function(val, type, DataType){
				if(CheckIsColor(val)){
					attrFun(val, DataType, "string", "init");
				}else{
					this[type] = thisVal;
					sliderSetValue(this, type, thisVal);
				}
			},
			sliderGet: function(val, type, DataType, ctype){
				if(ctype != undefined){
					attrFun(val, DataType, "number", null, ctype);
				}else{
					attrFun(val/100, DataType, "number", null, ctype);
				}
				sliderSetValue(this, type + "1", val);
			},
			sliderInpGet: function(val, type, DataType, min, max ,step, ctype){
				val = Number(val);
				if(val>=min && val<=max){
					if(step == 1){
						val = Number(Math.round(val));
					}else if(step == 0.1){
						val = Number(val.toFixed(1));
					}
					if(ctype != undefined){
						attrFun(val, DataType, "number", null, ctype);
					}else{
						attrFun(val/100, DataType, "number", null, ctype);
					}
					sliderSetValue(this, type, val);
				}else{
					sliderSetValue(this, type + "1", thisVal);
				}
			},
			radioGet: function(val, DataType){
				if(val != undefined){
					attrFun(val, DataType, "string");
				}
			},
			initialValue: function(item, type){
				var oitem = item.staticOption;
				var ditem = item.dataOption;
				this.type = type;
				this.boxId = haveValue(oitem, "boxId", "string") || "contet";
				this.allTabList = allTabList;
				var refreshTime = haveValue(oitem, "refreshTime", "number");
				refreshTime = refreshTime == null ? 0.3 : refreshTime;
				var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var backgroundColor = haveValue(oitem, "background.color", "string")
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;
				var borderColor = haveValue(oitem, "border.color", "string") 
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;
				this.statisticObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					refreshTime: refreshTime,
					refreshTime1: refreshTime,
					STprefixName: haveValue(oitem, "STprefixName", "string") || haveValue(ditem, "series.0.textStyle.name", "string") || "",
					STsuffixName: haveValue(oitem, "STsuffixName", "string") || "",
					select: haveValue(oitem, "select", "string") || "",
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid",
					STprefix:{},
					dataStatistics:{},
					STsuffix:{},
				}
				textStyleFun("STprefix", this);
				textStyleFun("dataStatistics", this);
				textStyleFun("STsuffix", this);
				function textStyleFun(type, athis){
					var fontSize = haveValue(oitem, type+".font.size", "number");
					fontSize = fontSize == null ? 60 : Math.round(fontSize*100);
					var letterSpacing = Math.round((haveValue(oitem, type+".letter.spacing", "number")||0)*100);
					var margin = haveValue(options, "dataStatistics.margin", "number");
					margin = margin == null ? 0.02 : margin;
					var margin = Math.round((margin)*100);
					var padding = Math.round((haveValue(oitem, type+".padding", "number")||0)*100);
					var color = haveValue(oitem, type+".color", "string");
					color = color == "transparent" ? "rgba(0,0,0,0)" : color;
					athis.statisticObj[type] = {
						family: haveValue(oitem, type+".font.family", "string") || "sans-serif",
						color: color || "",
						backgroundColor: haveValue(oitem, type+".backgroundColor", "string") || "",
						fontSytle: haveValue(oitem, type+".font.style", "string") || "normal",
						fontWeight: haveValue(oitem, type+".font.weight", "string") || "normal",
						fontSize: fontSize,
						fontSize1: fontSize,
						letterSpacing: letterSpacing,
						letterSpacing1: letterSpacing,
						margin: margin,
						margin1: margin,
						padding: padding
					}
				}
			}
		}
	});
	function attrFun(val, DataType, atype, btype, ctype){
        canvasArray.forEach(function(item, i){
            if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					if(ctype == "STprefix" || ctype == "STsuffix"){
						$("#"+sxID).children().children("."+ctype).text(val);
						statisticWidthFun($("#"+sxID).children());
					// }else if(ctype == "STsuffix"){
					// 	$("#"+sxID).children().children(".STsuffix").text(val);
					}else if(ctype == "refreshTime"){
						// independenceRefresh(val);
					}else{
						STSXCSH($("#"+sxID), oitem);		
					}
					
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
            }
        });
    }
}
// 时间
var VueTimeattr;
function timeInitializationFun(){
	VueTimeattr  = new Vue({
		el: '#timeattr',
		data: function() {
			return {
				boxId:"",
				allTabList:[],
				options: options,
				options1: options1,
				timeType: timeType,
				timeObj: {
					fontSize: 14,
					letterSpacing: 1,
					borderWidth:1,
					borderRadius: 1,
				}
			}
		},
		methods: {
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.boxId;
				elementCreateFun(id);
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			collapseGet(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
			selectGet: function(val, DataType){
				attrFun(val, DataType, "string");
			},
			inputColor: function(val){
				thisVal = val;
			},
			colorGet: function(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
			inputColorGet: function(val, type, DataType){
				if(CheckIsColor(val)){
					attrFun(val, DataType, "string", "init");
				}else{
					sliderSetValue(this, type, thisVal);
				}
			},
			sliderGet: function(val, type, DataType){
				if(type == "timeObj.lineHeight"){
					attrFun(val, DataType, "number");
				}else{
					attrFun(val/100, DataType, "number");
				}
				sliderSetValue(this, type + "1", val);
			},
			sliderInpGet: function(val, type, DataType, min, max ,step){
				val = Number(val);
				if(val>=min && val<=max){
					if(step == 1){
						val = Number(Math.round(val));
					}else if(step == 0.1){
						val = Number(val.toFixed(1));
					}
					if(type == "lineHeight"){
						attrFun(val, DataType, "number");
					}else{
						attrFun(val/100, DataType, "number");
					}
					sliderSetValue(this, type, val);
				}else{
					sliderSetValue(this, type + "1", thisVal);
				}
			},
			radioGet: function(val, DataType){
				if(val != undefined){
					attrFun(val, DataType, "string");
				}
			},
			initialValue: function(oitem){
				this.boxId = haveValue(oitem, "boxId", "string") || "contet";
				this.allTabList = allTabList;
				var fontSize = haveValue(oitem, "font.size", "number");
				fontSize = fontSize == null ? 16 : Math.round(fontSize*100);
                var letterSpacing = Math.round((haveValue(oitem, "letter.spacing", "number")||0)*100);
                var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var color = haveValue(oitem, "color", "string");
				color = color == "transparent" ? "rgba(0,0,0,0)" : color;
				var backgroundColor = haveValue(oitem, "background.color", "string");
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;	
				var borderColor = haveValue(oitem, "border.color", "string");		
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;
				this.timeObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					select: haveValue(oitem, "select", "string") || "",
					family: haveValue(oitem, "font.family", "string") || "sans-serif",
					color: color || "",
					fontSytle: haveValue(oitem, "font.style", "string") || "normal",
					fontWeight: haveValue(oitem, "font.weight", "string") || "normal",
					fontSize: fontSize,
					fontSize1: fontSize,
					letterSpacing: letterSpacing,
					letterSpacing1: letterSpacing,
					textAlign: haveValue(oitem, "text.align", "string") || "center",
					styleVal: haveValue(oitem, "styleVal", "string") || "0",
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid"
				}
			}
		}
	});
	function attrFun(val, DataType, atype, btype){
		canvasArray.forEach(function(item, i){
			if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					if(DataType == "styleVal"){
						timeRebuild($("#"+sxID), oitem);
					}
					TMSXCSH($("#"+sxID), oitem);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
			}
		});
	}
}
// 天气
var VueWeatherattr;
function weatherInitializationFun(){
	var weatherProvince =  getDataFromAjax(ctx+"/qd/qdApi/getProvinces");
	VueWeatherattr  = new Vue({
		el: '#weatherattr',
		data: function() {
			return {
				options: options,
				options1: options1,
				weatherProvince: weatherProvince,
				weatherCity: [],
				weatherCode: [],
				weatherTypeList: weatherTypeList,
				weatherObj:{},
				boxId:"",
				allTabList: []		
			}
		},
		methods: {
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.boxId;
				elementCreateFun(id);
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			inputGet: function(val, DataType, atype){
				attrFun(val, DataType, atype)
			},
			selectGet: function(val, DataType, atype){
				attrFun(val, DataType, atype);				
				if(DataType == "province"){
					if(val){
						var weatherCity =  getDataFromAjax(ctx+"/qd/qdApi/getCitys?province="+val);
						this.weatherCity = weatherCity;
						this.weatherObj.city = weatherCity[0];
						attrFun(weatherCity[0], "city", atype);	
						var weatherCode =  getDataFromAjax(ctx+"/qd/qdApi/getAreas?province="+val+"&city="+weatherCity[0]);
						this.weatherCode = weatherCode;
						this.weatherObj.code = weatherCode[0].code;		
						attrFun(weatherCode[0].code, "code", atype);	
					}else{
						this.weatherCity = [];
						this.weatherObj.city = "";
						attrFun("", "city", atype);
						this.weatherCode = [];
						this.weatherObj.code = "";
						attrFun("", "code", atype);
					}
				}else if(DataType == "city"){
					if(val){
						var province = this.weatherObj.province;
						var weatherCode =  getDataFromAjax(ctx+"/qd/qdApi/getAreas?province="+province+"&city="+val);
						this.weatherCode = weatherCode;
						this.weatherObj.code = weatherCode[0].code;	
						attrFun(weatherCode[0].code, "code", atype);
					}else{
						this.weatherCode = [];
						this.weatherObj.code = "";	
						attrFun("", "code", atype);
					}	
				}
				
			},
			inputColor: function(val){
				thisVal = val;
			},
			colorGet: function(val, type, DataType, atype){
				attrFun(val, DataType, atype);
			},
			inputColorGet: function(val, type, DataType, atype){
				if(CheckIsColor(val)){
					attrFun(val, DataType, atype);
				}else{
					sliderSetValue(this, type, thisVal);					
				}
			},
			sliderGet: function(val, type, DataType, atype){
				if(type == "lineHeight"){
					attrFun(val, DataType, atype);
				}else{
					attrFun(val/100, DataType, atype);
				}
				sliderSetValue(this, type + "1", val);				
			},
			sliderInpGet: function(val, type, DataType, min, max ,step, atype){
				val = Number(val);
				if(val>=min && val<=max){
					if(step == 1){
						val = Number(Math.round(val));
					}else if(step == 0.1){
						val = Number(val.toFixed(1));
					}
					if(type == "lineHeight"){
						attrFun(val, DataType, atype);
					}else{
						attrFun(val/100, DataType, atype);
					}
					this[type] = val;
					sliderSetValue(this, type, val);		
				}else{
					sliderSetValue(this, type + "1", thisVal);		
				}
			},
			radioGet: function(val, DataType, atype){
				if(val != undefined){
					attrFun(val, DataType, atype);
				}
			},
			switchGet: function(val, DataType){
				attrFun(val, DataType, "boolean");
				// if(val){
				// 	this.weatherObj.province = null;
				// }
			},
			initialValue: function(oitem){
				var show = haveValue(oitem, "show", "boolean");
				var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);	var color = haveValue(oitem, "color", "string");
				color = color == "transparent" ? "rgba(0,0,0,0)" : color;
				var backgroundColor = haveValue(oitem, "background.color", "string");
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;	
				var borderColor = haveValue(oitem, "border.color", "string");		
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;		
				this.weatherObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					family: haveValue(oitem, "font.family", "string") || "sans-serif",
					color: color || "",
					fontSytle: haveValue(oitem, "font.style", "string") || "normal",
					fontWeight: haveValue(oitem, "font.weight", "string") || "normal",
					show: show == null ? true : show,
					weatherType: haveValue(oitem, "weatherType", "string") || "0",
					province: haveValue(oitem, "province", "string"),
					city: haveValue(oitem, "city", "string") || "", 
					code: haveValue(oitem, "code", "string") || "",
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid"
				}
				this.boxId = haveValue(oitem, "boxId", "string") || "contet";
				this.allTabList = allTabList;
				
			}
		}
	});
	function attrFun(val, DataType, atype, btype){
		canvasArray.forEach(function(item, i){
			if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(allOptions[i].staticOption, val, DataType, atype);
					if(DataType == "weatherType" || DataType == "code"){
						weatherRebuild(allOptions[i], $("#"+sxID))
					}
					WHSXCSH($("#"+sxID), allOptions[i].staticOption);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
			}
		});
	}
}
// 图片
var VuePictureattr;
function imgInitializationFun(){
	VuePictureattr = new Vue({
		el: '#pictureattr',
		data: function() {
			return {
				boxId:"",
				allTabList:[],
				options1: options1,
				hrefList:[],				
				imgObj:{
					borderWidth: 1,
					borderRadius: 1
				}
			}
		},
		methods: {
			imgChange: function(){
				bouncedHideFun();
				$('#shujuSelect').addClass("shujuSelect");
				$('.imageBox').show();
				imgUpFun();
				selContent.imgInitialValue("editor");
			},
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.boxId;
				elementCreateFun(id);
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			inputGet: function(val, type, DataType, atype){
                attrFun(val, DataType, atype, "init");
            },
            inputColor: function(val){
                thisVal = val;
            },
            colorGet: function(val, DataType){
                attrFun(val, DataType, "string", "init");
            },
            inputColorGet: function(val, type, DataType){
                if(CheckIsColor(val)){
                    attrFun(val, DataType, "string", "init");
                }else{
                    this[type] = thisVal;
                }
			},
			selectGet: function(val, DataType){
                attrFun(val, DataType, "string");
            },
            sliderGet: function(val, type, DataType){
                attrFun(val/100, DataType, "number");
				sliderSetValue(this, type + "1", val);
            },
            sliderInpGet: function(val, type, DataType, min, max ,step){
                val = Number(val);
                if(val>=min && val<=max){
                    if(step == 1){
                        val = Number(Math.round(val));
                    }else if(step == 0.1){
                        val = Number(val.toFixed(1));
                    }
                    attrFun(val/100, DataType, "number");
					sliderSetValue(this, type, val);
                }else{
					sliderSetValue(this, type + "1", thisVal);
                }
            },
            radioGet: function(val, DataType){
                if(val != undefined){
                    attrFun(val, DataType, "string");
                }
            },
            tabPositionGet: function(val, DataType){
                this.serlctHref="";
                this.href="";
                attrFun(val, DataType, "string");
                attrFun("", "href", "string");
            },
            seelectHref: function(val, DataType){
                if(val != "" && val != null){
                    val = "/qd/qdDesign/view?id=" + val;
                }
                attrFun(val, DataType, "string");
            },
			initialValue: function(oitem){
				this.boxId = "";
				this.allTabList = allTabList;
				this.boxId = haveValue(oitem, "boxId", "string") || "contet";
				this.allTabList = allTabList;
                this.hrefList = hrefList;
                var borderWidth = Math.round((haveValue(oitem, "border.width", "number")|| 0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var backgroundColor = haveValue(oitem, "background.color", "string");
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;	
				var borderColor = haveValue(oitem, "border.color", "string");		
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;	
				this.imgObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid",
					hrefChange: haveValue(oitem, "hrefChange", "string") || "common",
					href: null,
					serlctHref: "",
					target: oitem.target || "self"
				}
                var href = oitem.href || "";	
				if(href.indexOf("qd/qdDesign") > -1){				
					this.imgObj.serlctHref = href.split("/qd/qdDesign/view?id=")[1];
				}else{
					if(href.indexOf("://")>-1){
						href = href ? href.split("://")[1] : "";
					}
					this.imgObj.href = href;
				}
			}
		}
	});
	function attrFun(val, DataType, atype, btype){
		canvasArray.forEach(function(item, i){
			if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					TPSXCSH($("#"+sxID), oitem);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
			}
		});
	}
}
// 视频
var VueVideoattr;
function videoInitializationFun(){
    VueVideoattr = new Vue({
        el: '#videoattr',
        data: function() {
            return {
                boxId:"",
                allTabList:[],
				options1: options1,
				videoObj: {
					borderWidth: 1,
                	borderRadius: 1,
				}
            }
        },
        methods: {
            cascaderGet: function(val){
                eleLocationFun(val);
            },
            eleCreatFun: function(){
                var id = this.boxId;
                elementCreateFun(id);
            },
            videoSrcChange: function(){
				bouncedHideFun();
				$('#shujuSelect').addClass("shujuSelect");
                $('.videoBox').show();
                selContent.videoInitialValue("editor");
                videoUpFun();
            },
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
            switchGet: function(val, DataType){
                if(DataType == "autostart"){
                    attrFun(val, DataType, "boolean");							
                }else{
                    if(val){
                        attrFun("always", DataType, "string");
                    }else{
                        attrFun("", DataType, "string");
                    }
                }
                canvasArray.forEach(function(item, i){
                    if(item.id == sxID){
                        $("#"+sxID).children().remove();
                        vDcreat(allOptions[i], $("#"+sxID), sxID);
                    }
                });
                pitchUp(sxID);
            },
            selectGet: function(val, DataType){
                attrFun(val, DataType, "string");
            },
            inputColor: function(val){
                thisVal = val;
            },
            colorGet: function(val, DataType){
                attrFun(val, DataType, "string", "init");
            },
            inputColorGet: function(val, type, DataType){
                if(CheckIsColor(val)){
                    attrFun(val, DataType, "string", "init");
                }else{
					sliderSetValue(this, type, thisVal);
                }
            },
            sliderGet: function(val, type, DataType){
                attrFun(val/100, DataType, "number");
				sliderSetValue(this, type + "1", val);
            },
            sliderInpGet: function(val, type, DataType, min, max ,step){
                val = Number(val);
                if(val>=min && val<=max){
                    if(step == 1){
                        val = Number(Math.round(val));
                    }else if(step == 0.1){
                        val = Number(val.toFixed(1));
                    }
                    attrFun(val/100, DataType, "number");
					sliderSetValue(this, type, val);
                }else{
					sliderSetValue(this, type + "1", thisVal);
                }
            },
            initialValue: function(oitem){
                this.boxId = "";
				this.allTabList = allTabList;	
                var autostart = haveValue(oitem, "autostart", "boolean");
				autostart = autostart == null ? true: autostart;
				var repeat = haveValue(oitem, "repeat", "string");					
                if(repeat == "always"){
                    repeat = true;
                }else{
                    repeat = false;
				}
				var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var borderColor = haveValue(oitem, "border.color", "string");		
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;	
				this.videoObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					autostart: autostart,
					repeat: repeat,
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid"
				}
            }
        }
    });
    function attrFun(val, DataType, atype, btype){
        canvasArray.forEach(function(item, i){
            if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					VDSXCSH($("#"+sxID), oitem);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
            }
        });
    }
}
// 音频
var VueAudioattr;
function audioInitializationFun(){
	VueAudioattr = new Vue({
		el: '#audioattr',
		data: function() {
			return {
				boxId:"",
				allTabList:[],
				options1: options1,
				audioObj: {
					borderWidth: 1,
                	borderRadius: 1,
				}
			}
		},
		methods: {
			audioListChange: function(){
				audioUpFun()
				bouncedHideFun();
				$('#shujuSelect').addClass("shujuSelect");	
				$('.audioBox').show();
				selContent.audioInitialValue("editor");
			},
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.boxId;
				elementCreateFun(id);
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			switchGet: function(val, DataType){
				attrFun(val, DataType, "boolean");
			},
			selectGet: function(val, DataType){
                attrFun(val, DataType, "string");
            },
            inputColor: function(val){
                thisVal = val;
            },
            colorGet: function(val, DataType){
                attrFun(val, DataType, "string", "init");
            },
            inputColorGet: function(val, type, DataType){
                if(CheckIsColor(val)){
                    attrFun(val, DataType, "string", "init");
                }else{
					sliderSetValue(this, type, thisVal);
                }
            },
            sliderGet: function(val, type, DataType){
                attrFun(val/100, DataType, "number");
				sliderSetValue(this, type + "1", val);
            },
            sliderInpGet: function(val, type, DataType, min, max ,step){
                val = Number(val);
                if(val>=min && val<=max){
                    if(step == 1){
                        val = Number(Math.round(val));
                    }else if(step == 0.1){
                        val = Number(val.toFixed(1));
                    }
                    attrFun(val/100, DataType, "number");
					sliderSetValue(this, type, val);
                }else{
					sliderSetValue(this, type + "1", thisVal);
                }
            },
			initialValue: function(oitem){
				this.boxId = "";
				this.allTabList = allTabList;	
				var show = haveValue(oitem, "show", "boolean");
				show = show == null ? true: show;
				var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var backgroundColor = haveValue(oitem, "background.color", "string");
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;	
				var borderColor = haveValue(oitem, "border.color", "string");		
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;	
				this.audioObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					show: show,
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid"
				}
			}
		}
	});
	function attrFun(val, DataType, atype, btype){
        canvasArray.forEach(function(item, i){
            if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					ADSXCSH($("#"+sxID), oitem);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
            }
        });
    }
}
// 监控
var VueMonitoringattr;
function monitoringInitializationFun(){
	VueMonitoringattr = new Vue({
		el: '#monitoringattr',
		data: function() {
			return {
				boxId:"",
				allTabList:[],
				options1: options1,
				monitoringObj:{
					borderWidth: 1,
					borderRadius: 1,
				}
			}
		},
		methods: {
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.boxId;
				elementCreateFun(id);
			},
			monitoringChange: function(){
				bouncedHideFun();
				$('#shujuSelect').addClass("shujuSelect");	
				$('.monitoringBox').show();
				selContent.monitoringInitialValue("editor");
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			selectGet: function(val, DataType){
                attrFun(val, DataType, "string");
            },
            inputColor: function(val){
                thisVal = val;
            },
            colorGet: function(val, DataType){
                attrFun(val, DataType, "string", "init");
            },
            inputColorGet: function(val, type, DataType){
                if(CheckIsColor(val)){
                    attrFun(val, DataType, "string", "init");
                }else{
					sliderSetValue(this, type, thisVal);
                }
            },
            sliderGet: function(val, type, DataType){
                attrFun(val/100, DataType, "number");
				sliderSetValue(this, type + "1", val);
            },
            sliderInpGet: function(val, type, DataType, min, max ,step){
                val = Number(val);
                if(val>=min && val<=max){
                    if(step == 1){
                        val = Number(Math.round(val));
                    }else if(step == 0.1){
                        val = Number(val.toFixed(1));
                    }
                    attrFun(val/100, DataType, "number");
					sliderSetValue(this, type, val);
                }else{
					sliderSetValue(this, type + "1", thisVal);
                }
            },
			initialValue: function(oitem){
				this.boxId = "";
				this.allTabList = allTabList;
				var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var borderColor = haveValue(oitem, "border.color", "string");		
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;	
				this.monitoringObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid"
				}
			}
		}
	});
	function attrFun(val, DataType, atype, btype){
        canvasArray.forEach(function(item, i){
            if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					ADSXCSH($("#"+sxID), oitem);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
            }
        });
    }
}
// 筛选
var VueFilterattr;
function shaixuanInitializationFun(){
	VueFilterattr  = new Vue({
		el: '#filterattr',
		data: function() {
			return {
				boxId:"",
				allTabList:[],
				options: options,
				options1: options1,
				screeningObj:{
					borderWidth: 1,
					borderRadius: 1,
					title: {
						fontSize: 14,
						letterSpacing: 1,
						lineHeight: 2
					},
					content: {
						fontSize: 14,
						letterSpacing: 1
					}
				}
			}
		},
		methods: {
			cascaderGet: function(val){
				eleLocationFun(val);
			},
			eleCreatFun: function(){
				var id = this.boxId;
				elementCreateFun(id);
			},
			shaixuanChange: function(){
				createInit();
			},
			inputNumGet: function(val, type, DataType){
				inputNumChange(val, type, DataType, this);
			},
			inputGet: function(val, DataType){
				attrFun(val, DataType, "string", "init")
			},
			collapseGet(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
			selectGet: function(val, DataType){
				attrFun(val, DataType, "string");
			},
			inputColor: function(val){
				thisVal = val;
			},
			colorGet: function(val, DataType){
				attrFun(val, DataType, "string", "init");
			},
			inputColorGet: function(val, type, DataType){
				if(CheckIsColor(val)){
					attrFun(val, DataType, "string", "init");
				}else{
					sliderSetValue(this, type, thisVal);
				}
			},
			sliderGet: function(val, type, DataType){
				if(DataType.indexOf("line.height")>-1){
					attrFun(val, DataType, "number");
				}else{
					attrFun(val/100, DataType, "number");
				}
				sliderSetValue(this, type + "1", val);
			},
			sliderInpGet: function(val, type, DataType, min, max ,step){
				val = Number(val);
				if(val>=min && val<=max){
					if(step == 1){
						val = Number(Math.round(val));
					}else if(step == 0.1){
						val = Number(val.toFixed(1));
					}
					if(DataType.indexOf("line.height")>-1){
						attrFun(val, DataType, "number");
					}else{
						attrFun(val/100, DataType, "number");
					}
					sliderSetValue(this, type, val);
				}else{
					sliderSetValue(this, type + "1", thisVal);
				}
			},
			radioGet: function(val, DataType){
				if(val != undefined){
					attrFun(val, DataType, "string");
				}
			},
			initialValue: function(oitem){
				this.boxId = "";
				this.allTabList = allTabList;
				var borderWidth = Math.round((haveValue(oitem, "border.width", "number")||0)*100);
				var borderRadius = Math.round((haveValue(oitem, "border.radius", "number") || 0)*100);
				var fontSize = haveValue(oitem, "font.size", "number");
				fontSize = fontSize == null ? 16 : Math.round(fontSize*100);
				var letterSpacing = Math.round((haveValue(oitem, "letter.spacing", "number")||0)*100);
                var lineHeight = haveValue(oitem, "line.height", "number") || 1;
				var cfontSize = haveValue(oitem, "font.size", "number");
				cfontSize = cfontSize == null ? 16 : Math.round(cfontSize*100);
				var cletterSpacing = Math.round((haveValue(oitem, "letter.spacing", "number")||0)*100);
				var backgroundColor =  haveValue(oitem, "background.color", "string");
				backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;
				var borderColor = haveValue(oitem, "border.color", "string");
				borderColor = borderColor == "transparent" ? "rgba(0,0,0,0)" : borderColor;				
				var color =  haveValue(oitem, "title.color", "string");
				color = color == "transparent" ? "rgba(0,0,0,0)" : color;				
				var TbackgroundColor =  haveValue(oitem, "title.background.color", "string");
				TbackgroundColor = TbackgroundColor == "transparent" ? "rgba(0,0,0,0)" : TbackgroundColor;
				var CbackgroundColor =  haveValue(oitem, "content.background.color", "string");
				CbackgroundColor = CbackgroundColor == "transparent" ? "rgba(0,0,0,0)" : CbackgroundColor;
				this.screeningObj = {
					top: oitem.position.top/scale,
					left: oitem.position.left,
					width: oitem.boxSize.width,
					height: oitem.boxSize.height/scale,
					select: haveValue(oitem, "select", "string") || "",
					shaixuanName: haveValue(oitem, "title.name", "string") || "",
					backgroundColor: backgroundColor || "",
					borderWidth: borderWidth,
					borderWidth1: borderWidth,
					borderRadius: borderRadius,
					borderRadius1: borderRadius,
					borderColor: borderColor || "",
					borderStyle: haveValue(oitem, "border.style", "string") || "solid",
					title:{
						family: haveValue(oitem, "title.font.family", "string") || "sans-serif",
						color: color || "#333333",
						fontSize: fontSize,
						fontSize1: fontSize,
						letterSpacing: letterSpacing,
						letterSpacing1: letterSpacing,
						lineHeight: lineHeight,
						lineHeight1: lineHeight,
						fontSytle: haveValue(oitem, "title.font.style", "string") || "normal",
						fontWeight: haveValue(oitem, "title.font.weight", "string") || "normal",
						backgroundColor: TbackgroundColor || "",
						textAlign: haveValue(oitem, "title.text.align", "string") || "left"
					},
					content:{
						family: haveValue(oitem, "content.font.family", "string") || "sans-serif",
						fontSize: cfontSize,
						fontSize1: cfontSize,
						letterSpacing: cletterSpacing,
						letterSpacing1: cletterSpacing,
						fontSytle: haveValue(oitem, "content.font.style", "string") || "normal",
						fontWeight: haveValue(oitem, "content.font.weight", "string") || "normal",
						backgroundColor: CbackgroundColor || ""
					}
				}
			}
		}
	});
	function attrFun(val, DataType, atype, btype){
        canvasArray.forEach(function(item, i){
            if(item.id == sxID){
				var oitem = allOptions[i].staticOption;
				var thisVal = haveValue(oitem, DataType, atype);
				if(val != thisVal){
					objectCompletion(oitem, val, DataType, atype);
					SXSXCSH(sxID, oitem);
					// attrHistoryFun(allOptions[i], i, btype, thisVal);
				}
            }
        });
    }
}
// // 不同组件历史记录方法
// function attrHistoryFun(option, i, btype, thisVal){
// 	if(btype != "init"){
// 		if(thisVal != null){
// 			historyFun(option, i);					
// 		}
// 	}else{
// 		historyFun(option, i);
// 	}
// }