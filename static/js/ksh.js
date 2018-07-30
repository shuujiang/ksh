// import { SSL_OP_CIPHER_SERVER_PREFERENCE } from "constants";

// 图形选择创建
function createGraphics(item) {
	item.forEach(function (item) {
		var text = item.text;
		$("<p></p>").text(item.text).appendTo($(".shape1"));
		var tx = $("<div></div>").addClass("shape-box").addClass(item.name).appendTo($(".shape1"));
		item.data.forEach(function (item) {
			var icon = $("<i></i>").appendTo(tx);
			$('<svg  xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" preserveAspectRatio="none" style="fill: rgb(117, 134, 151); width:100%;height:100%;" viewBox="0 0 36 36"  enable-background="new 0 0 36 36" xml:space="preserve">' + item.content + '</svg>').appendTo(icon);
			//点击添加图形到画布
			clickTuxin(icon, item.content, text);
		});
	});
}
//图表的点击事件
function clickEcharts(StaticOption) {
	NavHoverFun($(".hoverBox"));
	thisOptionFun(StaticOption.type);
	var dataOption = copyAndClear(StaticOption.dataOption);
	var chartOption = copyAndClear(StaticOption.option);
	thisOption.chartName = StaticOption.name;
	thisOption.chartType = StaticOption.chartType;
	thisOption.staticType = StaticOption.staticType;
	thisOption.dataOption = dataOption;
	thisOption.staticOption = {
		wdType: StaticOption.wdType,
		dimType: StaticOption.dimType,
		meaType: StaticOption.meaType,
		staticType: StaticOption.staticType,
		chartOption: chartOption,
		dataOption: dataOption,
		zIndex: 10
	};
	if (thisOption.chartType == "text") {
		thisOption.staticOption.boxSize = {
			width: 25,
			height: 25
		}
	} else {
		thisOption.staticOption.boxSize = {
			width: 50,
			height: 50
		}
	}
	thisOption.staticOption.position = {
		top: 0,
		left: 0
	}
	boxCreate("chart");
}
//图形的点击事件
function clickTuxin(obj, cont, text) {
	obj.click(function () {
		NavHoverFun($(".hoverBox"));
		thisOptionFun("svg");
		thisOption.chartName = text;
		thisOption.staticOption = { path: cont, zIndex: 10 };
		thisOption.staticOption.boxSize = {
			width: 17.19,
			height: 13.89
		}
		thisOption.staticOption.position = {
			top: 0,
			left: 0
		}
		boxCreate("svg");
	});
}
// 组件的点击事件
var imageUp = true, videoUp = true, audioUp = true;
var uploadUrl = ctx + '/qd/media/tbMedia/BigFileUp';
function componentsFun(type) {
	NavHoverFun($(".hoverBox"));
	bouncedHideFun();
	thisOptionFun("component");
	switch (type) {
		case "tabs":
			tabsCreateFun(type);
			break;
		case "text":
			textreaFun(type);
			break;
		case "marquee":
			marqueeFun(type);
			break;
		case "countUp":
			dealerFun(type, "数字滚动", 17.19);
			break;
		case "statistic":
			dealerFun(type, "数字翻牌", 25);
			break;
		case "time":
			dateTimeFun(type);
			break;
		case "weather":
			weatherFun(type);
			break;
		case "image":
			 $('.imageBox').show();
			 $('#shujuSelect').addClass("shujuSelect");							
			 selContent.imgInitialValue("create");
			 imgUpFun();
//			openDialogUploader("上传图片", ctx + "/qd/images/userRefImage/list", "800px", "500px", " ", {});
			break;
		case "video":
			$('.videoBox').show();
			$('#shujuSelect').addClass("shujuSelect");
			selContent.videoInitialValue("create");
			videoUpFun();
			break;
		case "audio":
			
			allOptions.forEach(function (item, i) {
				if(item != ""){
					if (item.staticOption.staticType == "audio") {
						audio = false;
					}
				}
				
			});
			if (audio) {
				$('.audioBox').show();
				$('#shujuSelect').addClass("shujuSelect");
				selContent.audioInitialValue("create");
			} else {
				top.layer.alert('已有音频组件');
			}
			audioUpFun();
			break;
		case "monitoring":
			$('.monitoringBox').show();
			$('#shujuSelect').addClass("shujuSelect");
			selContent.monitoringInitialValue("create");
			break;
		default:
			break;
	}
}
function videoUpFun(){
	if (videoUp) {
		uoloadBigFile(uploadUrl, '#pickerVd', video_extensions, video_mimeTypes, "video", "0");
		videoUp = false;
	}
}
function audioUpFun(){
	if (audioUp) {
		uoloadBigFile(uploadUrl, '#pickerAd', audio_extensions, audio_mimeTypes, "audio", "1");
		audioUp = false;
	}
}
function imgUpFun(){
	if(imageUp){
	 	uoloadBigFile(uploadUrl,'#pickerImg',img_extensions,img_mimeTypes, "iamge", "2");
	 	imageUp = false;
	 }
}
// //图片点击事件
// $('.loadImg').click(function() {
// 	openDialogUploader("上传图片",ctx+"/qd/images/userRefImage/list", "800px", "500px"," ", {});
// });
//function imgclick(option) {
//	z++;
//	option = srcSwitch(option);
//	// 数据
//	var thisOption = {};
//	var aLen = allOptions.length;
//	thisOption.orderBy = aLen;
//	thisOption.id = uuid();
//	thisOption.type = "component";
//	thisOption.chartName = "图片";
//	thisOption.dataOption = "";
//	thisOption.staticOption = { src: option, zIndex: 10, staticType: "image" };
//	thisOption.staticOption.boxSize = {
//		width: 17.19,
//		height: 13.89,
//		moHeight: 13.89
//	}
//	thisOption.staticOption.position = {
//		top: 0,
//		left: 0
//	}
//	thisOption.dims = "";
//	thisOption.measures = "";
//	allOptions.push(thisOption);
//	create("component", thisOption);
//	// $("<img/>").attr("src", option).width("100%").height("100%").appendTo(element);
//	// $('<li class="yuansuTU '+ sxID +'"></a><i class="element_img"></i><span>图片:</span><em>' + option.chartName + '</em></a></li>').appendTo($(".directory"));
//	pitchUp(sxID);
//	TPSXCSH($("#" + sxID), thisOption.staticOption);
//}
function NavHoverFun(dom) {
	dom.parent().css("background", "none");
	dom.hide();
}
// 数据对象创建
function thisOptionFun(type) {
	z++;
	prevId = sxID;
	var aLen = allOptions.length;
	thisOption = {
		id: uuid(),
		type: type,
		dataOption: "",
		dims: "",
		measures: "",
		orderBy: aLen
	};
}
// 创建box
function boxCreate(type) {
	if (tabsId != undefined) {
		thisOption.staticOption.boxId = tabsId;
		if (type == "tabs") {
			top.layer.alert('tabs组件中不能创建tabs组件');
			return;
		}
	} else {
		thisOption.staticOption.boxId = "content";
	}
	historyFun(thisOption, allOptions.length);
	allOptions.push(thisOption);
	create(type, thisOption);
	pitchUp(sxID);
}
// 创建选择页隐藏
function bouncedHideFun() {
	$('#shujuSelect').removeClass("shujuSelect");
	$('.selectBox').hide();
	$('.monitoringBox').hide();
	$('.videoBox').hide();
	$('.audioBox').hide();
	$('.imageBox').hide();
}
// tabs框
function tabsCreateFun(type) {
	thisOption.chartName = "tabs框";
	thisOption.staticOption = { staticType: type, tabsList: [{ name: "页面1", id: uuid(), option: [] }, { name: "页面2", id: uuid(), option: [] }], unselected: {}, select: {}, zIndex: 10 };
	thisOption.staticOption.boxSize = {
		width: 50,
		height: 50
	}
	thisOption.staticOption.position = {
		top: 0,
		left: 0
	}
	boxCreate("component");
}
// 文本输入框
function textreaFun(type) {
	thisOption.chartName = "文本输入";
	thisOption.staticOption = { content: "", zIndex: 10, staticType: "text"};
	thisOption.staticOption.boxSize = {
		width: 17.19,
		height: 13.89
	}
	thisOption.staticOption.position = {
		top: 0,
		left: 0
	}
	boxCreate("component");
}
//文本滚动框
function marqueeFun(type) {
	thisOption.chartName = "文本滚动";
	thisOption.dataOption = { series: ['可视化编辑器，创造属于您的大屏', '可视化编辑器，创造属于您的大屏'] };
	thisOption.staticOption = {
		staticType: type,
		wdType: "not-one",
		dimType: [1, 0],
		meaType: [0, 0],
		boxSize: {
			width: 17.19,
			height: 5.56
		},
		position: {
			top: 0,
			left: 0
		},
		zIndex: 10
	};
	boxCreate("component");
}
// 数字翻牌
function dealerFun(type, chartName, num) {
	thisOption.chartName = chartName;
	thisOption.dataOption = { series: [{ textStyle: { name: "" }, subtextStyle: { name: "1000" } }] };
	thisOption.dims = "";
	thisOption.measures = "";
	thisOption.staticOption = {
		staticType: type,
		wdType: "not-one",
		dimType: [0, 0],
		meaType: [1, 0],
		boxSize: {
			width: num,
			height: 13.89
		},
		position: {
			top: 0,
			left: 0
		},
		zIndex: 10
	};
	boxCreate("component");
}
//日期时间
function dateTimeFun(type) {
	thisOption.chartName = "时间";
	thisOption.staticOption = { staticType: type, zIndex: 10 };;
	thisOption.staticOption.boxSize = {
		width: 17.19,
		height: 13.89
	}
	thisOption.staticOption.position = {
		top: 0,
		left: 0
	}
	boxCreate("component");
}
// 天气
function weatherFun(type) {
	thisOption.chartName = "天气";
	thisOption.staticOption = { staticType: type, zIndex: 10 };;
	thisOption.staticOption.boxSize = {
		width: 21.88,
		height: 5.56
	}
	thisOption.staticOption.position = {
		top: 0,
		left: 0
	}
	boxCreate("component");
}
// 图片
function imgCreate(src) {
	if (src) {
		thisOption.staticOption = { staticType: "image", src: src, zIndex: 10 };
		thisOption.staticOption.boxSize = {
			width: 17.19,
			height: 13.89
		}
		thisOption.staticOption.position = {
			top: 0,
			left: 0
		}
		thisOption.chartName = "图片";
		boxCreate("component")
		$('#shujuSelect').removeClass("shujuSelect");
	} else {
		top.layer.alert('请选择图片');
	}
}
function imgEditor(src) {
	canvasArray.forEach(function (item, i) {
		if (item.id == sxID) {
			var element = $("#" + sxID);
			element.children().remove();
			allOptions[i].staticOption.src = src;
			iDcreat(allOptions[i], element);
		}
	});
//	pitchUp(sxID);
	$('#shujuSelect').removeClass("shujuSelect");
}
// 视频
function videoCreate() {
	if (videoHref != "" && videoHref != undefined && videoHref != "http://") {
		thisOption.chartName = "视频";
		thisOption.staticOption = { staticType: "video", src: videoHref, repeat: "always", autostart: true, zIndex: 10 };
		thisOption.staticOption.boxSize = {
			width: 50,
			height: 50
		}
		thisOption.staticOption.position = {
			top: 0,
			left: 0
		}
		$('#shujuSelect').removeClass("shujuSelect");
		videoHref = "";
		boxCreate("component");
	} else {
		top.layer.alert('请选择视频');
	}
}
function videoEditor() {
	if (videoHref != "" && videoHref != undefined && videoHref != "http://") {
		canvasArray.forEach(function (item, i) {
			if (item.id == sxID) {
				allOptions[i].staticOption.src = videoHref;
				$("#" + sxID).children().remove();
				vDcreat(allOptions[i], $("#" + sxID), sxID);
			}
		});
//		pitchUp(sxID);
		$('#shujuSelect').removeClass("shujuSelect");
	} else {
		top.layer.alert('请选择视频');
	}
}
// 音频
function audioCreate(list) {
	var len = list.length;
	if (len > 0) {
		list.forEach(function(item){
			delete item.imgSrc;
			delete item.isActive;
		});
		thisOption.staticOption = { staticType: "audio", src: list, zIndex: 10 };
		thisOption.staticOption.boxSize = {
			width: 37.5,
			height: 19.44
		}
		thisOption.staticOption.position = {
			top: 0,
			left: 0
		}
		thisOption.chartName = "音频";
		boxCreate("component")
		$('#shujuSelect').removeClass("shujuSelect");
	} else {
		top.layer.alert('请选择音频');
	}
}
function audioEditor(list) {
	$('#shujuSelect').removeClass("shujuSelect");
	canvasArray.forEach(function (item, i) {
		if (item.id == sxID) {
			var element = $("#" + sxID);
			element.children().remove();
			allOptions[i].staticOption.src = list;
			aDcreat(allOptions[i], element);
		}
	});
}
// 监控
function monitoringCreate(hlsSrc, rtmpSrc) {
	if (rtmpSrc != "") {
		thisOption.staticOption = { staticType: "monitoring", hlsSrc: "http://" + hlsSrc, rtmpSrc: "rtmp://" + rtmpSrc, zIndex: 10 };
		thisOption.staticOption.boxSize = {
			width: 50,
			height: 50
		}
		thisOption.staticOption.position = {
			top: 0,
			left: 0
		}
		thisOption.chartName = "监控";
		boxCreate("component")
		$('#shujuSelect').removeClass("shujuSelect");
	} else {
		top.layer.alert('请输入rtmp地址');
	}
}
function monitoringEditor(hlsSrc, rtmpSrc) {
	if (rtmpSrc != "") {
		canvasArray.forEach(function (item, i) {
			if (item.id == sxID) {
				var element = $("#" + sxID);
				element.empty();
				allOptions[i].staticOption.hlsSrc = "http://" + hlsSrc;
				allOptions[i].staticOption.rtmpSrc = "http://" + rtmpSrc;
				mTcreat(allOptions[i], element);
			}
		});
		$('#shujuSelect').removeClass("shujuSelect");
	} else {
		top.layer.alert('请输入rtmp地址');
	}
}
// 筛选
function SXcreate() {
	SXcsh.id = "sx" + uuid1();
	SXarr.push(SXcsh);
	thisOptionFun("shaixuan");
	thisOption.id = SXcsh.id;
	thisOption.chartName = "数据筛选器";
	thisOption.staticOption = { title: { name: SXname }, zIndex: 10 };
	thisOption.staticOption.boxSize = {
		width: 17.19,
		height: 13.89
	}
	thisOption.staticOption.position = {
		top: 0,
		left: 0
	}
	boxCreate("shaixuan")
}
function SXeditor() {
	SXCJ(SXcsh, $("#" + sxID), sxID);
	SXarr.forEach(function (item, i) {
		if (item.id == sxID) {
			;
			SXarr[i] = SXcsh;
		}
	});
	canvasArray.forEach(function (item, i) {
		if (item.id == sxID) {
			allOptions[i].staticOption.title.name = SXname;
			SXSXCSH(sxID, allOptions[i].staticOption);
		}
	});
//	pitchUp(sxID);
}
//元素点击事件
$(document).on('click', '.yuansuTU', function () {
	dbsxID = $(this).attr("data-type");
	sxID = dbsxID;
	pitchUp(dbsxID);
	$("#" + dbsxID).parent().css("z-index", 22222);
});
var svgInitial = true, tabsInitial = true, textInitial = true, marqueeInitial = true, shaixuanInitial = true, timeInitial = true, weatherInitial = true, countUpInitial = true, statisticInitial = true, imgInitial = true, videoInitial = true, audioInitial = true, monitoringInitial = true;
// 元素选中
function pitchUp(id, type) {
	$('.shuxing').addClass('hidden');
	$('#' + prevId).siblings().filter(".border").removeClass('borHover1');
	if (!type) {
		if (selectedOption) {
			if ($("#" + prevId).children().length == 0) {
				TBSC(selectedOption, prevId, $("#" + prevId), canvasArray[selectedOption.orderBy]);
			}
		}
	}
	if (id) {
		allTabListFun()
		canvasArray.forEach(function (item, i) {
			if (item.id == id) {
				selectedOption = allOptions[i];
				var type = allOptions[i].type;
				var rightDom = $("#" + id).parent().siblings(".rightFunction").show();
				olPlace(allOptions[i].staticOption.position.left, allOptions[i].staticOption.boxSize.width, allOptions[i].staticOption.position.top, rightDom);
				$(".copy").css("display", "none");
				if (type == "echarts2" || type == "echarts" || type == "heightcharts") {
					type = "chart";
				}
				switch (type) {
					case "chart":
						if (JSON.stringify(allOptions[i].dataOption) != "{}") {
							$(".copy").css("display", "block");
							$('.tubiaoshuxing').removeClass('hidden');
							$(".TabsName").each(function (x, item) {
								$(item).children(".TabsBox").hide();
								$(item).children(".TabsNameText").css("border-bottom-color", "rgba(0,0,0,0)").addClass("TabsNameClick").removeClass("TabsNameClick1");
							});
							var tabsId = allOptions[i].staticOption.chartOption.Tabsfrist || "general";
							tabsSelected(tabsId, "frist");
							chartArrVue(tabsId);
							VueChartattr.initialValue(allOptions[i], tabsId);
							dataEditor.initialValue(allOptions[i]);
							if (allOptions[i].staticOption.editorType) {
								SXGNstyleFun($(".tubiaoshuxing .nav li").eq(0), true);
							} else {
								SXGNstyleFun($(".tubiaoshuxing .nav li").eq(1), false);
							}
						}
						break;
					case "svg":
						$('.tuxinshuxing').removeClass('hidden');
						if (svgInitial) {
							svgInitializationFun();
						}
						$(".copy").css("display", "block");
						VueGraphicattr.initialValue(allOptions[i].staticOption);
						svgInitial = false;
						break;
					case "component":
						var staticType = allOptions[i].staticOption.staticType;
						var wdType = allOptions[i].staticOption.wdType;
						$('.zujianshuxing').removeClass('hidden');
						$('.zujianshuxing .attribute .attributeBox').addClass('hidden');
						$('.zujianshuxing .nav').addClass('hidden');
						$('.attribute .' + staticType).removeClass('hidden');
						if (wdType) {
							$(".CompEditor").removeClass('hidden');
							if (allOptions[i].staticOption.editorType) {
								SXGNstyleFun($(".CompEditor li").eq(0), true);
							} else {
								SXGNstyleFun($(".CompEditor li").eq(1), false);
							}
						} else {
							$(".CompOrdinary").removeClass('hidden');
							SXGNstyleFun($(".CompOrdinary li").eq(0), true);
						}
						switch (staticType) {
							case "tabs":
								if (tabsInitial) {
									tabsInitializationFun();
									tabsInitial = false;
								}
								$(".copy").css("display", "block");
								VueTabsattr.initialValue(allOptions[i].staticOption);
								break;
							case "text":
								if (textInitial) {
									textInitializationFun();
									textInitial = false;
								}
								$(".copy").css("display", "block");
								VueTextattr.initialValue(allOptions[i].staticOption);
								break;
							case "marquee":
								if (marqueeInitial) {
									marqueeInitializationFun();
									marqueeInitial = false;
								}
								$(".copy").css("display", "block");
								VueMarqueeattr.initialValue(allOptions[i]);
								dataEditorComp.initialValue(allOptions[i]);	
								break;
							case "countUp":
								$(".copy").css("display", "block");
								if (countUpInitial) {
									countUpInitializationFun();
									countUpInitial = false;
								}
								VueCountUpattr.initialValue(allOptions[i]);
								dataEditorComp.initialValue(allOptions[i]);								
								break;
							case "statistic":
								$(".copy").css("display", "block");
								if (statisticInitial) {
									statisticInitializationFun();
									statisticInitial = false;
								}
								VueStatisticattr.initialValue(allOptions[i]);
								dataEditorComp.initialValue(allOptions[i]);		
								break;
							case "time":
								if (timeInitial) {
									timeInitializationFun();
									timeInitial = false;
								}
								VueTimeattr.initialValue(allOptions[i].staticOption);
								break;
							case "weather":
								if (weatherInitial) {
									weatherInitializationFun();
									weatherInitial = false;
								}
								VueWeatherattr.initialValue(allOptions[i].staticOption);
								break;
							case "image":
								$(".copy").css("display", "block");
								if (imgInitial) {
									imgInitializationFun();
									imgInitial = false;
								}
								VuePictureattr.initialValue(allOptions[i].staticOption);
								break;
							case "video":
								$(".copy").css("display", "block");
								if (videoInitial) {
									videoInitializationFun();
									videoInitial = false;
								}
								VueVideoattr.initialValue(allOptions[i].staticOption);
								break;
							case "audio":
								if (audioInitial) {
									audioInitializationFun();
									audioInitial = false;
								}
								VueAudioattr.initialValue(allOptions[i].staticOption);
								break;
							case "monitoring":
								if (monitoringInitial) {
									monitoringInitializationFun();
									monitoringInitial = false;
								}
								VueMonitoringattr.initialValue(allOptions[i].staticOption);
								break;
						}

						break;
					case "shaixuan":
						$('.shaixuanshuxing').removeClass('hidden');
						if (shaixuanInitial) {
							shaixuanInitializationFun();
							shaixuanInitial = false;
						}
						VueFilterattr.initialValue(allOptions[i].staticOption);
						break;
					default:
						break;
				}
				$('#' + id).siblings().filter(".border").addClass('borHover1');
			}
		});
	} else {
		$(".rightFunction").css("display", "none");
		$('.huabushuxing').removeClass('hidden');
		selectedOption = undefined;
	}
}
// 元素位置选择
function allTabListFun() {
	allTabList = [{
		value: 'content',
		label: '画布'
	}]
	allOptions.forEach(function (item, i) {
		if (item != "") {
			if (item.staticOption.staticType == "tabs") {
				item.staticOption.tabsList.forEach(function (aitem, a) {
					allTabList.push({
						value: aitem.id,
						label: item.chartName + item.orderBy + " " + aitem.name
					});
				});
			}
		}
	});
}
// 右侧功能按钮位置
function olPlace(left, width, top, dom) {
	var olSize = 0.2 * (parseInt(($("html").css("font-size"))));
	dom.css("right", 100 - (left + width) + "%");
	dom.css("top", top / scale + "%");
}
// 元素关闭按钮
$(document).on('click', '.shut', function () {
	canvasArray.forEach(function (item, i) {
		if (item.id == sxID) {
			if(allOptions[i] != ""){
				if (allOptions[i].staticOption.staticType == "tabs") {
					allOptions[i].staticOption.tabsList.forEach(function (aitem, a) {
						allOptions.forEach(function (bitem, b) {
							if (bitem != "") {
								if (aitem.id == bitem.staticOption.boxId) {
									elementDeteFun(b);
								}
							}
						});
					});
				}
			}
			
//			else if(allOptions[i].staticOption.staticType == "audio"){
//				SMusic = null;
//			}
			elementDeteFun(i);
		}
	});

});
function elementDeteFun(i) {
	if (sxID.indexOf("time") != -1) {
		clearInterval(allOptions[i].staticOption.timer);
	}
	SXarr.forEach(function (item, x) {
		if (item.id == allOptions[i].id) {
			SXarr.baoremove(x);
			item.qdFilterChilrdenList.forEach(function (item, i) {
				if (item.wdId != "") {
					var id = item.componentId
					allOptions.forEach(function (item, i) {
						if (item.id == id) {
							var xid = canvasArray[i].id;
							$("#" + xid).remove();
							// if (HBSX.screen != "ratio3") {
							var element = $('<div class="element" id="' + xid + '"></div>').appendTo(oBox[i]);
							// } else {
							// 	var element = $('<div class="element" id="'+xid+'"></div>').appendTo(mooBox[i]);
							// }
							var cht = {
								dbsrcId: item.dbsrcId,
								designId: item.designId,
								dims: item.dims,
								tableId: item.tableId,
								sourceType: item.sourceType,
								measures: item.measures,
								id: item.id,
								type: item.type,
								chartName: item.chartName,
								chartType: item.chartType
							};
							var data = getDataFromAjax(ctx + "/qd/test/getDataoption", { qdDesignChildren: stringifyMore(cht) });
							item.dataOption = data;
							TBSC(item, xid, element, canvasArray[i]);
						}
					});
				}
			});
		}
	});
	canvasArray.baoremove(i);
	allOptions.baoremove(i);
	$(oBox[i]).remove();
	oBox.baoremove(i);
	$(".yuansuTU." + sxID).remove();
	$("#rightFunction").css("display", "none");
	pitchUp(undefined, true);
}
// 图层上
$(document).on('click', '.up', function () {
	var zindex = $("#" + sxID).parent().css('z-index');
	zindex++;
	$("#" + sxID).parent().css('z-index', zindex);
	canvasArray.forEach(function (item, i) {
		if (item.id == sxID) {
			allOptions[i].staticOption.zIndex = zindex;
		}
	})
});
// 图层下
$(document).on('click', '.down', function () {
	var zindex = $("#" + sxID).parent().css('z-index');
	if (zindex > 1) {
		zindex--;
		$("#" + sxID).parent().css('z-index', zindex);
		canvasArray.forEach(function (item, i) {
			if (item.id == sxID) {
				allOptions[i].staticOption.zIndex = zindex;
			}
		})
	}
});
$(document).on('click', '.copy', function () {
	prevId = sxID;
	var oid = uuid();
	var xid;
	canvasArray.forEach(function (item, i) {
		if (item.id == sxID) {
			z++;
			var type = allOptions[i].type;
			var thisOption = copyAndClear(allOptions[i]);
			xid = thisOption.id;
			thisOption.id = oid;
			thisOption.orderBy = z - 1;
			var atop = 100 / HBSX.HXshu;
			var aleft = 100 / HBSX.ZXshu;
			var top = allOptions[i].staticOption.position.top,
				left = allOptions[i].staticOption.position.left,
				width = allOptions[i].staticOption.boxSize.width,
				height = allOptions[i].staticOption.boxSize.height;
			if (top + height + atop <= 100) {
				bTop = top + atop;
			} else if (top - atop >= 0) {
				bTop = top - atop;
			} else {
				bTop = top;
			}
			if (left + height + aleft <= 100) {
				bleft = left + aleft;
			} else if (left - aleft >= 0) {
				bleft = left - aleft;
			} else {
				bleft = left;
			}
			thisOption.staticOption.position.top = bTop;
			thisOption.staticOption.position.left = bleft;
			thisOption.staticOption.position.width = width;
			thisOption.staticOption.position.height = height;
			allOptions.push(thisOption);
			create(type, thisOption);
			pitchUp(sxID);
		}
	});
	SXarr.forEach(function (item, i) {
		item.qdFilterChilrdenList.forEach(function (item, l) {
			if (item.componentId == xid) {
				var obj = copyAndClear(item);
				obj.componentId = oid;
				SXarr[i].qdFilterChilrdenList.splice(l, 0, obj)
			}
		});
	})
});
// 数据筛选  去除重复
function shuzuBJ(index, data) {
	var aindex = index.toUpperCase();
	var aa = [];
	data.forEach(function (item) {
		aa.push(stringifyMore(item));
	})
	var bb = aa.unique1();
	aa = []
	bb.forEach(function (item) {
		aa.push(JSON.parse(item)[aindex]);
	})
	return aa;
}
// 随机生成长id
function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 32; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23];
	var uuid = s.join("");
	return uuid;
}
function uuid1() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 30; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23];
	var uuid = s.join("");
	return uuid;
}
// 数组删除指定项
Array.prototype.baoremove = function (dx) {
	if (isNaN(dx) || dx > this.length) {
		return false;
	}
	this.splice(dx, 1, "");
}
// 数组去除重复
Array.prototype.unique1 = function () {
	var res = [this[0]];
	for (var i = 1; i < this.length; i++) {
		var repeat = false;
		for (var j = 0; j < res.length; j++) {
			if (this[i] == res[j]) {
				repeat = true;
				break;
			}
		}
		if (!repeat) {
			res.push(this[i]);
		}
	}
	return res;
}
// box移动缩放
var newTop, newLeft, newHeight, newWidth, maxTop, maxLeft, maxHeight, maxHeightmin, maxWidth, maxWidthmin;
function boxMove(box, handle, type) {
	var oDrag = new Drag(box, {
		handle: handle
	}, type);
}
// 构造函数
function Drag() {
	this.initialize.apply(this, arguments);
}
Drag.prototype = {
	//初始化
	initialize: function (drag, options, type) {
		this.drag = this.$(drag);
		this._x = this._y = 0;
		this._moveDrag = this.bind(this, this.moveDrag);
		this._stopDrag = this.bind(this, this.stopDrag);
		this.setOptions(options);
		this.handle = this.$(this.options.handle);
		this.handle.style.cursor = type;
		this.type = type;
		this.changeType = false;
		this.i = oBox.indexOf(this.drag);
		this.addHandler(this.handle, "mousedown", this.bind(this, this.startDrag));
	},
	startDrag: function (event) {
		//开始拖拽
		var box = $(this.drag).parent();
		cc = box.height();
		dd = box.width();
		hoverId = $(this.drag).children(".element").attr("id");
		$("#" + hoverId).siblings(".border").addClass("borderBk");
		newTop = allOptions[this.i].staticOption.position.top / scale;
		newLeft = allOptions[this.i].staticOption.position.left;
		newHeight = allOptions[this.i].staticOption.boxSize.height / scale;
		newWidth = allOptions[this.i].staticOption.boxSize.width;
		maxTop = 100 - newHeight;
		maxLeft = 100 - newWidth;
		maxHeight = 100 - newTop;
		maxWidth = 100 - newLeft;
		maxHeightmin = newTop + newHeight;
		maxWidthmin = newWidth + newLeft;
		this.top = newTop;
		this.left = newLeft;
		this.height = newHeight;
		this.width = newWidth;
		var event = event || window.event;
		this._x = event.clientX;
		this._y = event.clientY;
		this.addHandler(document, "mousemove", this._moveDrag);
		this.addHandler(document, "mouseup", this._stopDrag);
		this.handle.setCapture && this.handle.setCapture();
	},
	moveDrag: function (event) {
		//计算坐标
		this.changeType = true;
		var event = event || window.event;
		YY = (event.clientY - this._y) / cc * 100;
		XX = (event.clientX - this._x) / dd * 100;
		switch (this.type) {
			case "move":
				newTop = (YY + this.top);
				newLeft = (XX + this.left);
				// 限定区域
				newTop < 0 && (newTop = 0),
					newTop > maxTop && (newTop = maxTop),
					newLeft < 0 && (newLeft = 0),
					newLeft > maxLeft && (newLeft = maxLeft);
				this.drag.style.top = newTop + "%";
				this.drag.style.left = newLeft + "%";
				var dom = $(this.handle).parent().siblings(".rightFunction");
				olPlace(newLeft, this.width, newTop * scale, dom);
				break;
			case "n-resize":
				newHeight = (this.height - YY) * 1;
				newTop = (YY + this.top);
				// 限定大小
				newHeight < 8 && (newHeight = 8),
					newHeight > maxHeightmin && (newHeight = maxHeightmin),
					newTop < 0 && (newTop = 0);
				var dom = $(this.handle).parent().siblings(".rightFunction");
				olPlace(this.left, this.width, newTop * scale, dom);
				$(this.drag).height(newHeight + "%");
				this.drag.style.top = newTop + "%";
				break;
			case "ne-resize":
				newHeight = (this.height - YY) * 1;
				newWidth = (XX + this.width) * 1;
				newTop = (YY + this.top);
				// 限定大小
				newHeight < 8 && (newHeight = 8),
					newHeight > maxHeightmin && (newHeight = maxHeightmin),
					newWidth < 8 && (newWidth = 8),
					newWidth > maxWidth && (newWidth = maxWidth),
					newTop < 0 && (newTop = 0);
				var dom = $(this.handle).parent().siblings(".rightFunction");
				olPlace(this.left, newWidth, newTop * scale, dom);
				$(this.drag).height(newHeight + "%");
				$(this.drag).width(newWidth + "%");
				this.drag.style.top = newTop + "%";
				break;
			case "e-resize":
				newWidth = (XX + this.width) * 1;
				// 限定大小	
				newWidth < 8 && (newWidth = 8),
					newWidth > maxWidth && (newWidth = maxWidth);
				var dom = $(this.handle).parent().siblings(".rightFunction");
				olPlace(this.left, newWidth, this.top * scale, dom);
				$(this.drag).width(newWidth + "%");
				break;
			case "se-resize":
				newHeight = (YY + this.height) * 1;
				newWidth = (XX + this.width) * 1;
				// 限定大小
				newHeight < 8 && (newHeight = 8),
					newHeight > maxHeight && (newHeight = maxHeight),
					newWidth < 8 && (newWidth = 8),
					newWidth > maxWidth && (newWidth = maxWidth);
				var dom = $(this.handle).parent().siblings(".rightFunction");
				olPlace(this.left, newWidth, this.top * scale, dom);
				$(this.drag).height(newHeight + "%");
				$(this.drag).width(newWidth + "%");
				break;
			case "s-resize":
				newHeight = (YY + this.height) * 1;
				// 限定大小
				newHeight < 8 && (newHeight = 8),
					newHeight > maxHeight && (newHeight = maxHeight);
				var dom = $(this.handle).parent().siblings(".rightFunction");
				olPlace(this.left, this.width, this.top * scale, dom);
				$(this.drag).height(newHeight + "%");
				$(this.drag).width(newWidth + "%");
				break;
			case "sw-resize":
				newHeight = (YY + this.height) * 1;
				newWidth = (this.width - XX) * 1;
				newLeft = (XX + this.left);
				// 限定大小
				newHeight < 8 && (newHeight = 8),
					newHeight > maxHeight && (newHeight = maxHeight),
					newWidth < 8 && (newWidth = 8),
					newWidth > maxWidthmin && (newWidth = maxWidthmin),
					newLeft < 0 && (newLeft = 0);
				var dom = $(this.handle).parent().siblings(".rightFunction");
				olPlace(newLeft, newWidth, this.top * scale, dom);
				$(this.drag).height(newHeight + "%");
				$(this.drag).width(newWidth + "%");
				this.drag.style.left = newLeft + "%";
				break;
			case "w-resize":
				newWidth = (this.width - XX) * 1;
				newLeft = (XX + this.left);
				// 限定大小		
				newWidth < 8 && (newWidth = 8),
					newWidth > maxWidthmin && (newWidth = maxWidthmin),
					newLeft < 0 && (newLeft = 0);
				var dom = $(this.handle).parent().siblings(".rightFunction");
				olPlace(newLeft, newWidth, this.top * scale, dom);
				$(this.drag).height(newHeight + "%");
				$(this.drag).width(newWidth + "%");
				this.drag.style.left = newLeft + "%";
				break;
			case "nw-resize":
				newHeight = (this.height - YY) * 1;
				newWidth = (this.width - XX) * 1;
				newTop = (YY + this.top);
				newLeft = (XX + this.left);
				// 限定大小
				newHeight < 8 && (newHeight = 8),
					newHeight > maxHeight && (newHeight = maxHeight),
					newWidth < 8 && (newWidth = 8),
					newWidth > maxWidthmin && (newWidth = maxWidthmin),
					newLeft < 0 && (newLeft = 0);
				var dom = $(this.handle).parent().siblings(".rightFunction");
				olPlace(newLeft, newWidth, newTop * scale, dom);
				$(this.drag).height(newHeight + "%");
				$(this.drag).width(newWidth + "%");
				this.drag.style.top = newTop + "%";
				this.drag.style.left = newLeft + "%";
				break;
			default:
				break;
		}
		event.preventDefault && event.preventDefault();
	},
	stopDrag: function () {
		// 结束拖拽
		if (newhoverId != hoverId) {
			$("#" + hoverId).siblings(".border").removeClass("borderBk");
			$("#" + newhoverId).siblings(".border").addClass("borderBk");
		}
		hoverId = undefined;
		newTop = Number(newTop.toFixed(2));
		newLeft = Number(newLeft.toFixed(2));
		newHeight = Number(newHeight.toFixed(2));
		newWidth = Number(newWidth.toFixed(2));
		$(this.drag).height(newHeight + "%");
		$(this.drag).width(newWidth + "%");
		this.drag.style.top = newTop + "%";
		this.drag.style.left = newLeft + "%";
		switch (this.type) {
			case "move":
				allOptions[this.i].staticOption.position.top = newTop * scale;
				allOptions[this.i].staticOption.position.left = newLeft;
				break;
			case "n-resize":
				allOptions[this.i].staticOption.boxSize.height = newHeight * scale;
				allOptions[this.i].staticOption.position.top = newTop * scale;
				break;
			case "ne-resize":
				allOptions[this.i].staticOption.boxSize.height = newHeight * scale;
				allOptions[this.i].staticOption.boxSize.width = newWidth;
				allOptions[this.i].staticOption.position.top = newTop * scale;
				break;
			case "e-resize":
				allOptions[this.i].staticOption.boxSize.width = newWidth;
				break;
			case "se-resize":
				allOptions[this.i].staticOption.boxSize.height = newHeight * scale;
				allOptions[this.i].staticOption.boxSize.width = newWidth;
				break;
			case "s-resize":
				allOptions[this.i].staticOption.boxSize.height = newHeight * scale;
				break;
			case "sw-resize":
				allOptions[this.i].staticOption.boxSize.height = newHeight * scale;
				allOptions[this.i].staticOption.boxSize.width = newWidth;
				allOptions[this.i].staticOption.position.left = newLeft;
				break;
			case "w-resize":
				allOptions[this.i].staticOption.boxSize.width = newWidth;
				allOptions[this.i].staticOption.position.left = newLeft;
				break;
			case "nw-resize":
				allOptions[this.i].staticOption.boxSize.height = newHeight * scale;
				allOptions[this.i].staticOption.boxSize.width = newWidth;
				allOptions[this.i].staticOption.position.top = newTop * scale;
				allOptions[this.i].staticOption.position.left = newLeft;
				break;
			default:
				break;
		}
		if (this.type != "move" && this.changeType) {
			echartResizeFun(canvasArray[this.i], this.i);
			this.changeType = false;
		}
		this.removeHandler(document, "mousemove", this._moveDrag);
		this.removeHandler(document, "mouseup", this._stopDrag);
		this.handle.releaseCapture && this.handle.releaseCapture();
	},
	setOptions: function (options) {
		this.options = {
			handle: this.drag, //事件对象
		};
		for (var p in options) this.options[p] = options[p]
	},
	//获取id
	$: function (id) {
		return typeof id === "string" ? document.getElementById(id) : id
	},
	//添加绑定事件
	addHandler: function (oElement, sEventType, fnHandler) {
		return oElement.addEventListener ? oElement.addEventListener(sEventType, fnHandler, false) : oElement.attachEvent("on" + sEventType, fnHandler)
	},
	//删除绑定事件
	removeHandler: function (oElement, sEventType, fnHandler) {
		return oElement.removeEventListener ? oElement.removeEventListener(sEventType, fnHandler, false) : oElement.detachEvent("on" + sEventType, fnHandler)
	},
	//绑定事件到对象
	bind: function (object, fnHandler) {
		return function () {
			return fnHandler.apply(object, arguments)
		}
	}
};
// 所有图表重新渲染
function echartResize() {
	canvasArray.forEach(function (item, i) {
		echartResizeFun(item, i);
	});
}
// 单个图表重新渲染
function echartResizeFun(item, i) {
	var type = allOptions[i].type;
	if (type == "echarts" || type == "echarts2") {
		if (item.chart != null && item.chart != "") {
			item.chart.resize();
		} else {
			var chartType = allOptions[i].chartType;
			if (chartType == "table" || chartType == "text") {
				if (chartType == "text") {
					emFontSiz(item.id, 3.5);
				} else {
					tableLineFun(allOptions[i].staticOption.chartOption, item.id);
				}
				titleWidth(item.id);
				gridWidthFun(item.id, 0);
			}
		}
	} else if (type == "heightcharts") {
		var endOption = $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption);
		$("#" + item.id).highcharts(endOption);
	} else if(type == "component"){
		var staticType = allOptions[i].staticOption.staticType;
		if (staticType == "weather") {
			var weatherBox = $("#" + item.id).children();
			var weatherType = allOptions[i].staticOption.weatherType || "0";
			switch (weatherType) {
				case "0":
					emFontSiz1(weatherBox, 3.0);
					break;
				case "1":
					emFontSiz1(weatherBox, 2.35);
					break;
				case "2":
					emFontSiz1(weatherBox, 1.4);
					break;
				case "3":
					emFontSiz1(weatherBox, 0.8);
					break;
				default:
					break;
			}
		} else if (staticType == "monitoring") {
			var element = $("#" + item.id);
			element.empty();
			mTcreat(allOptions[i], element);
		} else if (staticType == "tabs") {
			tabsResize(i);
		} else if(staticType == "video"){
			var element = $("#" + item.id);
			element.empty();
			vDcreat(allOptions[i], element, item.id);
		}

	}
	
}
// tab页内图重新渲染
function tabsResize(i) {
	allOptions[i].staticOption.tabsList.forEach(function (item, i) {
		var id = item.id;
		allOptions.forEach(function (item, i) {
			if (item != "") {
				if (item.staticOption.boxId == id) {
					echartResizeFun(canvasArray[i], i)
				}
			}
		});
	});
}