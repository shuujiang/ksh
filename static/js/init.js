var appx = angular.module("hlksh", []);
var videoHref, thisData, hrefList=[];
appx.controller("kshEdit", function ($scope, $http) {
	$(document).ready(function(){	
		$.ajax({
			type:"get",
			url:ctx+"/qd/qdDesignTheme/queryThemes",
			async:true,
			success:function(data){
				themeList = data;
				$.ajax({
					type:"get",
					url:ctx+"/qd/test/loadDesign?id="+getQueryString("id", window.location.href)+'&moId='+getQueryString('moId',window.location.href),
					async:true,
					success:function(data){
						laodHuaBu(data);
						// console.log("-----------加载成功----------");
					}
				});
			}
		});                                   
	});
	// $scope.chartTypeList = chartTypeList;
	// $scope.chartOptionList = chartOptionList;
	// // 图表
	// $scope.clickChartType = function(data){
	// 	$scope.chartTypeList.forEach(function(item, i){
	// 		if(data.type == item.type){
	// 			item.isActive = true;
	// 		}else{
	// 			item.isActive = false;
	// 		}
	// 	});
	// 	if(data.type == "all"){
	// 		$scope.chartOptionList = chartOptionList
	// 	}else{
	// 		$scope.chartOptionList = data.data;
	// 	}
	// }
	// $scope.clickChart = function (data) {
	// 	clickEcharts(data);
	// };
	// // 图形
	// $scope.graphics = graphics;
	// var SvgList = [];
	// graphics.forEach(function(item, i){
	// 	if(item.data !=undefined){
	// 		SvgList = SvgList.concat(item.data);
	// 	}
	// });
	// svgShowFun("全部图形", SvgList);
	// $scope.clickSvgType = function(data){
	// 	$scope.graphics.forEach(function(item, i){
	// 		if(data.name == item.name){
	// 			item.isActive = true;
	// 		}else{
	// 			item.isActive = false;
	// 		}
	// 	});
	// 	if(data.name == "all"){
	// 		svgShowFun("全部图形", SvgList);
	// 	}else{
	// 		var text = data.text;			
	// 		svgShowFun(text, data.data);	
	// 	}
	// }
	// function svgShowFun(text, data){
		// var svgShowBox = $("#svgShowBox").empty();
		// data.forEach(function(item) {
		// 	var icon = $('<i class="svgIcon"></i>').appendTo(svgShowBox);
		// 	$('<svg  xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" preserveAspectRatio="none" style="fill: rgb(117, 134, 151); width:100%;height:100%;" viewBox="0 0 36 36"  enable-background="new 0 0 36 36" xml:space="preserve">' + item.content + '</svg>').appendTo(icon);
		// 	//点击添加图形到画布
		// 	clickTuxin(icon, item.content, text);
		// });
	// }

	$scope.chartOptionList = chartOptionList;
	$scope.componentsList = componentsList;
	// 图表
	$scope.clickChart = function (data) {
		clickEcharts(data);
	};
	// 图形
	createGraphics(graphics);
	$scope.componentsList = componentsList;	
	// 组件
	$scope.clickComponents =  function (data) {
		componentsFun(data.staticType);
	};
	// 筛选
	$scope.clickScreening =  function () {
		createFound();
	};
	// 保存
	$scope.holdFun = function(){
		//判断不能为空或者是空格
		if(HBSX.name=="" || HBSX.name==null || HBSX.name.replace(/\s/g,'')==''){
			top.layer.alert('画布名称不能为空！');
			pitchUp();
			return false;
		}
		//复制allOptions
		var arr1 = [];
		var num = 0
		allOptions.forEach(function(item, i){
			if(item != ""){
				item.orderBy = num;
				arr1.push(item);
				num++;
			}
		})
		var arr=copyAndClear(arr1);
		clearUselessProperty(arr);
		//画布
		var canvasAttObj=HBSX;
		var qdDesign = {
			id : getQueryString("id", window.location.href),
			designOption : stringifyMore(canvasAttObj),
			name : HBSX.name,
			refreshTime: HBSX.refreshTime+"",
			thumbnail : dataUrl,
			type : $(".type").val(),
			qdService : $('#serviceId').val(),
			themeId : HBSX.subject
		};
		var qdFilters=copyAndClear(SXarr);
		qdFilters.forEach(function(item,i) {
			item.qdFilterChilrdenList=stringifyMore(item.qdFilterChilrdenList);
			item.designId=getQueryString("id", window.location.href);
			item.filterOption=stringifyMore(item.filterOption);
			delete item.createDate;
			delete item.updateDate;
			delete item.remarks;
		});
		// if($("#serviceId").val()==""){
		// 	top.layer.open({
		// 		type: 2,
		// 		area: ['300px', '420px'],
		// 	   ajaxData:{selectIds: $("#serviceId").val()},
		// 		title:"选择分类",
		// 		content: ctx+"/tag/treeselect?url="+encodeURIComponent("/qd/service/qdService/treeData")+"&notAllowSelectParent=true&isAll=true",
		// 		btn: ['确定', '关闭'],
		// 		btn2: function(index, layero){},
		// 		yes: function(index, layero){
		// 					var tree = layero.find("iframe")[0].contentWindow.tree;
		// 					var ids = [], names = [], nodes = [];
		// 					if ("${checked}" == "true"){
		// 						nodes = tree.getCheckedNodes(true);
		// 					}else{
		// 						nodes = tree.getSelectedNodes();
		// 					}
		// 					for(var i=0; i<nodes.length; i++) {
		// 						ids.push(nodes[i].id);
		// 						names.push(nodes[i].name);
		// 						break; // 如果为非复选框选择，则返回第一个选择  </c:if>
		// 					}
		// 					$("#serviceId").val(ids.join(",").replace(/u_/ig,""));
		// 					if($("#serviceId").val()==""){
		// 						top.layer.alert('请选择分类！');
		// 					}else{
		// 						top.layer.close(index);
		// 						var qdDesign = {
		// 								id : getQueryString("id", window.location.href),
		// 								designOption : stringifyMore(canvasAttObj),
		// 								name : HBSX.name,
		// 								thumbnail : dataUrl,
		// 								type : $(".type").val(),
		// 								refreshTime: HBSX.refreshTime+"",
		// 								qdService : $('#serviceId').val()
		// 							};
		// 						saveAll(qdDesign,qdFilters,arr,getQueryString("moId",window.location.href));
		// 					}
		// 						   },
		// 		cancel: function(index){},
		// 		});
		// 	}
		// if($("#serviceId").val()!=""){
			saveAll(qdDesign,qdFilters,arr,getQueryString("moId",window.location.href));
		// }
		function saveAll(qdDesign,qdFilters,arr,moId){
			console.log(arr)
			submitData( ctx+"/qd/test/saveAll",{qdDesign:stringifyMore(qdDesign),qdFilter:stringifyMore(qdFilters),chart : stringifyMore(arr),moId:moId} , function(data) {
				if(data&&data.success){
					top.layer.alert('保存成功');
				}else{
					top.layer.alert('保存失败');
				}
		
			});
		}
		//清理无用属性
		function clearUselessProperty(arr){
			arr.forEach(function(item,i) {
				if(arr[i].type=="echarts"||arr[i].type=="echarts2" || arr[i].type=="heightcharts"){
					delete arr[i].dataOption;
				} else if(arr[i].type=="component" ){
					var staticType = arr[i].staticOption.staticType;
					if(staticType =="countUp" || staticType =="statistic" || staticType =="marquee"){
						delete arr[i].dataOption;
					}else{
						delete arr[i].dbsrcId;
						delete arr[i].tableId;
						delete arr[i].sourceType;
						delete arr[i].dims;
						delete arr[i].measures;
						delete arr[i].chartType;
					}
				}
				else{
					delete arr[i].dbsrcId;
					delete arr[i].tableId;
					delete arr[i].sourceType;
					delete arr[i].dims;
					delete arr[i].measures;
					delete arr[i].chartType;
					// delete arr[i].chartName;
				}
				delete arr[i].createDate;
				delete arr[i].updateDate;
				delete arr[i].remarks;
				delete arr[i].qdFilter;
				delete arr[i].qdFilterChilrden;
				arr[i].staticOption=stringifyMore(arr[i].staticOption);
				arr[i].designId = getQueryString("id", window.location.href);
			});
		}
	}
	// 预览
	$scope.previewFun = function(){
		$(window).unbind("resize");
		$(".yulan").removeClass("hidden");
		$(".ksh1").addClass("hidden");		
		adaptive();		
		$(".ylconent2").css({
			background: "url(" +srcSwitch(HBSX.backgroundImage)+") no-repeat 0 0/ 100% 100%",
			"background-color": HBSX.backgroundColor
		})
		var ylelement = $(".ylconent2");
		canvasArray.forEach(function(item, i) {
			if(allOptions[i] != ""){
				boxId = allOptions[i].staticOption.boxId || "content";
				if(boxId == "content"){
					var yuBox = $('<div class="yl"></div>').appendTo(ylelement);
				}else{
					var yuBox = $('<div class="yl"></div>').appendTo($("#"+boxId));
				}
				yuBox.css("z-index", allOptions[i].staticOption.zIndex);
				var yuBox1 = $('<a class="element" style="width:100%;height:100%;" id="' + item.id + '"></a>').appendTo(yuBox);
				var idaa = item.id;
				var top = allOptions[i].staticOption.position.top,
					left = allOptions[i].staticOption.position.left,
					width = allOptions[i].staticOption.boxSize.width,
					height = allOptions[i].staticOption.boxSize.height,
					moHeight = allOptions[i].staticOption.boxSize.moHeight;
					yuBox.width(width + "%");
					yuBox.height(height /scale  + "%");
					yuBox[0].style.top = top  /scale   + "%";
					yuBox[0].style.left = left + "%";
				var aid = item.id
				var type = allOptions[i].type;
				YucanvasArray.push({
					id: idaa,
					index: i
				});
				init(idaa, yuBox1, type, allOptions[i], YucanvasArray[i]);
			}
			
		});
	}
	// 预览关闭
	$scope.closePreviewFun = function(){
		$(window).unbind("resize");
		$(".ylconent2").children().remove();
		$(".yulan").addClass("hidden");
		$(".ksh1").removeClass("hidden");
		YucanvasArray.forEach(function(item) {
			if (item.chart != undefined || item.chart != null) {
				item.chart.dispose();
				item.chart = null;
			}
			if (item.time != undefined) {
				clearInterval(item.time);
			}
		})
		YucanvasArray = [];
		header();
		screenInitialization(HBSX);
	}
	// 全屏
	$scope.fullScreenFun = function(){
		$(".btnscreen").toggleClass("hidden");
		$(".details-you").toggleClass("hidden");
		$(window).unbind("resize");
		ZSYfull();
		screenInitialization(HBSX);
	}
	// 退出全屏
	$scope.exitFullScreenFun = function(){
		$(".btnscreen").toggleClass("hidden");
		$(".details-you").toggleClass("hidden");
		$(window).unbind("resize");
		header();
		screenInitialization(HBSX);
	}
	// 属性与功能切换
	$scope.SXGNFun = function($event, value, type){
		SXGNstyleFun($($event.target), value);
		if(type == "chart"){
			selectedOption.staticOption.editorType = value;
			pitchUp(sxID, true)
		}else if(type == "Comp"){
			selectedOption.staticOption.editorType = value;			
		}
	}
	// 画布点击事件
	$scope.pitchUpFun = function($event){
		prevId = sxID;
		if($($event.target).parent().attr("class")!="rightFunction"){
			sxID = $($event.target).siblings(".element").attr('id');
			var tabName = $($event.target).attr('class');
			var tabName2 = $($event.target).parent().parent().attr('class');
			if(tabName == "screen" || tabName2 == "screen"){	
				if(tabsId != undefined){
					$(".border").show();
					$(".scal").show();
					var oid = $("#"+tabsId).parents(".element").attr("id");
					canvasArray.forEach(function(item, i){
						if(item.id == oid){
							var len = allOptions[i].staticOption.tabsList.length;
							var num = Number(haveValue(allOptions[i].staticOption, "tabIndex", "Number") || 0);
							objectCompletion(allOptions[i].staticOption, false, "editor", "boolean");
							var time = Number(allOptions[i].staticOption.time || 0);
							tabSwitchFun(time, num, len,  oid, item);	
						}
					});
					tabsId = undefined;					
				}
			}
			pitchUp(sxID);
		}
		if(dbsxID != undefined){
			canvasArray.forEach(function(item, i){
				if(item.id == dbsxID){
					$("#"+dbsxID).parent().css("z-index", allOptions[i].staticOption.zIndex);
				}
			});
		}
	}
	$scope.pitchUpdbFun = function($event){
		dbsxID = $($event.target).siblings(".element").attr('id');  
		if(dbsxID != undefined){
			$($event.target).parent().css("z-index", 22222);
		} 
	}
});
function SXGNstyleFun(dom, val){
	dom.addClass("setUpClick");
	dom.siblings().removeClass("setUpClick");
	if(val){
		dom.parent().siblings(".editor").addClass("hidden");
		dom.parent().siblings(".attribute").removeClass("hidden");
	}else{
		dom.parent().siblings(".editor").removeClass("hidden");
		dom.parent().siblings(".attribute").addClass("hidden");
	}
}
//加载画布
function laodHuaBu(data){
	var type = data.type;
	var serviceId = data.serviceId;
	var refreshTime = data.refreshTime;
	var name = data.name;
	thumbnail = data.thumbnail;
	$(".type").val(type);
	$("#serviceId").val(serviceId);
	if(data.designOption != null){
		HBSX = parseMore(data.designOption);
		HBSX.refreshTime = refreshTime;
		HBSX.name = name;
	}else{
		HBSX = copyAndClear(HBshuxing);
	}
	// 屏幕缩放
	multiple = HBSX.multiple;
	// 屏幕扩展
	scale = (100 + HBSX.addScreen)/100;
	thisVal1 = HBSX.addScreen;
	// 当前屏幕初始化
	header();	
	if(thumbnail != "" && thumbnail != null && thumbnail != undefined){
		HBSX.activeNames = "1";
	}else{
		HBSX.activeNames = "";
	}
	$("#huabuName").val(HBSX.name);
	// 背景色
	$("#HBgrid").css("background-color", HBSX.backgroundColor);
	// 背景图
	if (HBSX.checked) {
		$(".beijing").removeClass("hidden");
		bgImage(HBSX.backgroundImage);
	}
	// 主题
	HBarr.initialValue(HBSX, themeList);
	if(HBSX.show == 0){
		HBSX.show = false;
	}else if(HBSX.show == 1){
		HBSX.show = true;
	}
	thumbnail = projectName+thumbnail;
	// 封面截图
	$(".cover").css("background","url(" + thumbnail + ") 0 0/100% 100%");
	$(".cover").css("background-color","#E5E9F2");
	// 路径选择数组
	hrefList = getDataFromAjax(ctx+"/qd/test/findAll");
	
	$("#loading").hide();	
	//类型图
	$.ajax({
	 	type:"get",
	 	url:ctx+"/qd/test/getAll?id="+getQueryString("id", window.location.href)+'&moId='+getQueryString('moId',window.location.href),
	 	async:true,
	 	dataType: "json",
	 	success:function(data){
	 		console.log("-----------请求数据----------");
	 		console.log("-----------筛选器----------");
	 		console.log(data.body.filters);
	 		if(data.body.filters!=undefined){
	 			data.body.filters.forEach(function(item){
					item.filterOption = parseMore(item.filterOption);
				})
	 		}
			SXarr = data.body.filters;
			if(SXarr!=null){
				SXarr.forEach(function(item, i){
					item.absValue = item.absValue||"";
					item.beginDate = item.beginDate||"";
					item.endDate = item.endDate||"";
					item.tempValue1 = item.tempValue1||"";
					item.tempValue2 = item.tempValue2||"";
				})
			}else{
				SXarr= [];
			}
	 		console.log("-----------筛选器结束----------");
	 		console.log("-----------加载图表----------");
	 		if(data.body.qdDesignChildrens != null){
				loadChart(data.body.qdDesignChildrens);
	 		}
			console.log("-----------加载图表结束----------");
			popupPage();
	 	}
	 });
}
// 导航及画布大小自适应
function header() {
	titlezsy();
	$(window).bind("resize", function() {
		titlezsy();
		echartResize(canvasArray);
	});
	function titlezsy() {
		$(".details-zhong").height(innerHeight - 139 + "px");
		$(".attribute").height(innerHeight - 99 + "px");
		$(".editor").height(innerHeight - 99 + "px");
		$(".details-zhong").width(innerWidth - 440 + "px");
		screenInitialization(HBSX);	
	}
}
// 全屏编辑自适应
function ZSYfull() {
	fullScreen();
	$(window).bind("resize", function() {
		fullScreen();
	});
	function fullScreen() {
		$(".details-zhong").width(innerWidth -20 + "px");
		$(".details-zhong").height(innerHeight - 140 + "px");
		screenInitialization(HBSX);
	}
}
// 预览适应屏幕
function adaptive(){
	yulanCsh();
	$(window).bind("resize", function() {
		yulanCsh();			
	})
	function yulanCsh(){
		$(".details1").height(innerHeight + "px");	
		var ratio = HBSX.screen
		$(".ylconent1").css({
			width:"100%",
			height:"100%"
		})
		switch(ratio){
			case "ratio1":
				var width = $(".ylconent1").width()*multiple;
				var height = Math.floor(9/16*width*scale);
				$(".ylconent2").css({
					width:width,
					height:height
				});				
			break;
			case "ratio2":
				$(".ylconent2").css({
					width: HBSX.screenSize.width+"px",
					height: HBSX.screenSize.height*scale+"px"
				});
			break;
			case"ratio3":
				var height = $(".ylconent1").height()*multiple
				var Pheight = 9/16*$(".ylconent1").height();
				var Mheight = Pheight*multiple;
				$(".ylconent1").css({width: Math.floor(Pheight)});
				$(".ylconent2").css({
					width: Math.floor(Mheight),
					height:height*scale
				});
			break;
			default:
			break;
		}
		echartResize(YucanvasArray);
	}
}
// 背景图
function bgImage(option) {
	var url = srcSwitch(option);
	HBSX.backgroundImage = option;
	$("#HBgrid").css("background", "url(" + url + ") no-repeat")
	$("#HBgrid").css("background-color", HBSX.backgroundColor)
	$("#HBgrid").css("background-size", "100% 100%");
	$(".tupian").css("background", "url(" + url + ") no-repeat")
	$(".tupian").css("background-size", "100% 100%");
}
// 系列属性切换初始化
function tabsSelected(id) {
	$("#"+ id).show();
	$("#"+ id).parent().children(".TabsNameText").css("border-bottom-color", "#409EFF").addClass("TabsNameClick1").removeClass("TabsNameClick");
}
var generalIN=true, TgridIN=true, seriesIN=true, textSeriesIN=true, tableSeriesIN=true, titleIN=true, radarIN=true, rectangularIN=true, geoIN=true, legendVisualMapIN=true, tooltipIN=true, HtitleIN=true, HseriesIN=true, HrectangularIN = true, HlegendIN = true, HtooltipIN=true;
// 属性设置 tabs点击事件
function tabsFun(classNamme, classNamme1) {
	$(document).on("click", "."+classNamme+" ."+classNamme1, function(){
		var dom = $(this).parent();
		var TabsBox = dom.children(".TabsBox");
		var id = TabsBox.attr("id");		
		loadingShowFun(id);
		var timer = setTimeout(() => {
			dom.siblings().each(function(i, item){
				$(item).children(".TabsBox").hide();
				$(item).children(".TabsNameText").css("border-bottom-color", "rgba(0,0,0,0)").addClass("TabsNameClick").removeClass("TabsNameClick1");
			});
			TabsBox.show();
			dom.children(".TabsNameText").css("border-bottom-color", "#409EFF").addClass("TabsNameClick1").removeClass("TabsNameClick");
			chartArrVue(id);
			canvasArray.forEach(function(item, i){
				if(item.id == sxID){
					allOptions[i].staticOption.chartOption[classNamme]=id;
					if(classNamme == "Tabsfrist"){
						VueChartattr.initialValue(allOptions[i], id);
					}else if(classNamme == "TabsAxis"){
						VueChartattr.initialValue(allOptions[i], "rectangular");
					}else if(classNamme == "Tabssecond"){
						VueChartattr.initialValue(allOptions[i], "legendVisualMap");
					}else if(classNamme == "HTabsAxis"){
						VueChartattr.initialValue(allOptions[i], "Hrectangular");
					}
					historyFun(allOptions[i], i);
				}
			});
			clearTimeout(timer);
		}, 10);
		
	});
}
function loadingShowFun(id){
	switch (id){
		case "general":
			if(generalIN){
				$("#loading").show();	
			}
		break;
		case "Tgrid":
			if(TgridIN){
				$("#loading").show();	
			}
		break;
		case "series":
			if(seriesIN){
				$("#loading").show();	
			}
		break;
		case "textSeries":
			if(textSeriesIN){
				$("#loading").show();	
			}
		break;
		case "tableSeries":
			if(tableSeriesIN){
				$("#loading").show();	
			}
		break;
		case "title":
			if(titleIN){
				$("#loading").show();	
			}
		break;
		case "radar":
			if(radarIN){
				$("#loading").show();	
			}
			break;
		case "rectangular":
			if(rectangularIN){
				$("#loading").show();	
			}
		break;
		case "geo":
			if(geoIN){
				$("#loading").show();	
			}
		break;
		case "legendVisualMap":
			if(legendVisualMapIN){
				$("#loading").show();	
			}
		break;
		case "tooltip":
			if(tooltipIN){
				$("#loading").show();	
			}
		break;
		case "Htitle":
			if(HtitleIN){
				$("#loading").show();	
			}
		break;
		case "Hseries":
			//标题
			if(HseriesIN){
				$("#loading").show();
			}
		break;
		case "Hrectangular":
			if(HrectangularIN){
				$("#loading").show();
			}
		break;
		case "Hlegend":
			if(HlegendIN){
				$("#loading").show();
			}
		break;
		case "Htooltip":
			if(HtooltipIN){
				$("#loading").show();	
			}
		break;
		default:
		break;
	}
}
function chartArrVue(id){
	switch (id){
		case "general":
			//通用
			if(generalIN){
				ChartAttr("general1");
				generalIN = false;
			}
		break;
		case "Tgrid":
			//绘图网格
			if(TgridIN){
				ChartAttr("TTGrid");
				TgridIN = false;
			}
		break;
		case "series":
			//系列
			if(seriesIN){
				// ChartAttr("seriesMarkPoint");
				// ChartAttr("seriesMarkLine");
				// ChartAttr("seriesMarkArea");
				ChartAttr("seriesGauge");
				ChartAttr("seriesLabel");
				ChartAttr("seriesLabelLine");
				ChartAttr("seriesItemStyle");
				ChartAttr("seriesItemStyleWordCloud");
				ChartAttr("seriesLineStyle");
				ChartAttr("seriesAreaStyle");
				ChartAttr("seriesLeaves");
				ChartAttr("seriesEdgeLabel");
				// categories
				ChartAttr("seriesCategories");
				ChartAttr("seriesCategoriesStyle");
				ChartAttr("seriesCategoriesLabel");
				ChartAttr("seriesCategoriesItemStyle");
				// // data
				ChartAttr("seriesData");
				ChartAttr("seriesDataLabel");
				ChartAttr("seriesDataLabelLine");
				ChartAttr("seriesDataItemStyle");
				ChartAttr("seriesDataItemStyleWordCloud");
				ChartAttr("seriesDataLineStyle");
				ChartAttr("seriesDataStyle");
				// links
				ChartAttr("seriesLinks");
				ChartAttr("seriesLinksStyle");
				ChartAttr("seriesLinksLabel");
				ChartAttr("seriesLinksLineStyle");
				
				ChartAttr("seriesCommon");
				ChartAttr("seriesCommonLine");
				ChartAttr("seriesCommonBar");
				ChartAttr("seriesCommonPie");
				ChartAttr("seriesCommonScatter");
				ChartAttr("seriesCommonEffectScatter");
				ChartAttr("seriesCommonLines");
				ChartAttr("seriesCommonTree");
				ChartAttr("seriesCommonMap");
				ChartAttr("seriesCommonFunnel");
				ChartAttr("seriesCommonGauge");
				ChartAttr("seriesCommonGraph");
				ChartAttr("seriesCommonWordCloud");
				ChartAttr("seriesCommonSymbol");
				ChartAttr("seriesCommonSilent");
				ChartAttr("seriesCommonlegendHoverLink");
				ChartAttr("seriesCommonhoverAnimation");
				ChartAttr("seriesCommonAxisIndex");
				ChartAttr("seriesCommonZlevel");
				seriesIN = false;
			}
		break;
		case "textSeries":
			//系列
			if(textSeriesIN){
				ChartAttr("seriesText");
				textSeriesIN = false;
			}
		break;
		case "tableSeries":
			//系列
			if(tableSeriesIN){
				ChartAttr("seriesTable");
				tableSeriesIN = false;
			}
		break;
		case "title":
			//标题
			if(titleIN){
				ChartAttr("seriestitle");
				titleIN = false;
			}
		break;
		case "radar":
			//雷达
			if(radarIN){
				ChartAttr("radar1");
				ChartAttr("radar2");
				radarIN = false;
			}
		break;
		case "rectangular":
			//直角坐标系
			if(rectangularIN){
				ChartAttr("xAxis1");
				ChartAttr("xAxis2");
				ChartAttr("yAxis1");
				ChartAttr("yAxis2");
				ChartAttr("Grid");
				rectangularIN = false;
			}
		break;
		case "geo":
			//地理坐标系
			if(geoIN){
				ChartAttr("seriesGeo");
				geoIN = false;
			}
		break;
		case "legendVisualMap":
			//图例与视觉映射
			if(legendVisualMapIN){
				ChartAttr("legend");
				ChartAttr("visualMap1");
				ChartAttr("visualMap2");
				legendVisualMapIN = false;
			}
		break;
		case "tooltip":
			//提示
			if(tooltipIN){
				ChartAttr("tooltip1");
				ChartAttr("tooltip2");
				tooltipIN = false;
			}
		break;
		case "Htitle":
			//标题
			if(HtitleIN){
				ChartAttr("HchartsTitle");
				HtitleIN = false;
			}
		break;
		case "Hseries":
			//标题
			if(HseriesIN){
				ChartAttr("HchartsSeries");
				HseriesIN = false;
			}
		break;
		case "Hrectangular":
			//直角坐标
			if(HrectangularIN){
				ChartAttr("HxAxis");
				ChartAttr("HyAxis");
				ChartAttr("HzAxis");
				HrectangularIN = false;
			}
		break;
		case "Hlegend":
			//图例
			if(HlegendIN){
				ChartAttr("Hchartslegend");
				HlegendIN = false;
			}
		break;
		case "Htooltip":
			//提示
			if(HtooltipIN){
				ChartAttr("HchartsTooltip");
				HtooltipIN = false;
			}
		break;
		default:
		break;
	}
	$("#loading").hide();
}
//一级tabs
tabsFun("Tabsfrist", "frist");
//二级tabs （图例）
tabsFun("Tabssecond", "legend");
//二级tabs （坐标系）
tabsFun("TabsAxis", "rectangular");
tabsFun("HTabsAxis", "Hrectangular");
var selContent, SXname, chartList=[], datePickerType;
// 数据编辑页面切换
function pageswitch(){
	$(".Xvariate").unbind("mousedown");
	$(".X_variable").unbind("mouseup");
	$(".dimension_x").unbind("mouseup");
	$(".Yvariate").unbind("mousedown");
	$(".Y_variable").unbind("mouseup");
	$(".dimension_y").unbind("mouseup");
	$(".ksh1").toggleClass("hidden");
	$(".ksh2").toggleClass("hidden");
	$("._graph").children().remove();
	$(".x-variable").children().remove();
	$(".y-variable").children().remove();
	$(".X_variable").children().remove();
	$(".Y_variable").children().remove();
}
// 导航hover
$(".initial-zhong .nav").hover(function(){
	$(this).css("background", "#004b97");
	$(this).children(".hoverBox").show();
},function(){
	$(this).children(".hoverBox").hide();
	$(this).css("background", "");
});
// 历史记录
function historyFun(option, index){
	historyList.push({
		option: option,
		index: index
	});
}