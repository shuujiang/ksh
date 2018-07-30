// 画布sliderChang
function HBsliderChange(val, type){
	if(type == "refreshTime"){
		HBSX.refreshTime = val;
		refresh(val);
	}else if(type == "multiple"){
		HBSX.multiple = val;
		multiple = val;
		screenInitialization(HBSX);
	}else if(type == "crosswise"){
		hengWangge(val);
	}else if(type == "portrait"){
		zongWangge(val);
	}
}
// 画布colorChange
function HBcolorChange(val,type){
	if(type == "backgroundColor"){
		val = val || "#ffffff";
		$("#HBgrid").css(type, val);
		HBSX.backgroundColor = val;
	}else{
		val = val || "rgba(204, 204, 204, 0.6)";
		if(HBSX.show){
			WGopacity(val);
		}
		HBSX.color = val;
	}
	aval = val;
}
//图表属性
// 是否判断
function chartSwitch(val, DataType, atype, btype){
	canvasArray.forEach(function(item, i){
		if(item.id == sxID){
			objectCompletion(allOptions[i].staticOption.chartOption, val, DataType, atype);
			var endOption =  $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption);
			var type = allOptions[i].type;
			if(type != "heightcharts"){
				var chartType = allOptions[i].chartType;
				if(chartType == "table" || chartType == "text"){
					special(endOption, sxID);
					if(chartType == "text"){
						textSeriesArrFun(endOption, sxID);
					}else{
						if(btype == "reconstruction"){
							removeChart(i, item);
						}else{
							tableSeriesArrFun(endOption, sxID);
						}
					}
				}else{
					if(btype == "reconstruction"){
						removeChart(i, item);
					}else{
						item.chart.setOption(endOption);
					}
				}
			}else{
				$("#"+item.id).highcharts(endOption);(endOption);
			}
		}
	});
}
// 输入框
function chartInput(val, DataType, atype, num, btype){
	canvasArray.forEach(function(item, i){
		if(item.id == sxID){
			var thisVal = haveValue(allOptions[i].staticOption.chartOption, DataType, atype, num, btype);
			if(val+"" != thisVal+""){
				if(btype == "map"){
					val = val.split(",");
				}
				objectCompletion(allOptions[i].staticOption.chartOption, val, DataType, atype, num, btype);
				var endOption =  $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption);
				var type = allOptions[i].type;				
				if(type != "heightcharts"){
					var chartType = allOptions[i].chartType;
					if(chartType == "GIS"){
						GISmap(endOption, sxID);
					}else if(chartType == "table" || chartType == "text"){
						special(endOption, sxID);
						if(chartType == "text"){
							textSeriesArrFun(endOption, sxID);
						}else{
							if(btype == "reconstruction"){
								removeChart(i, item);
							}else if(btype == "shufflingBtn"){
								var sfbnbody = $("#"+sxID+" .sfbnbody");
								shufflingBtnFun(endOption, sfbnbody);
							}else{
								tableSeriesArrFun(endOption, sxID);
							}
						}
					}else{
						if(btype == "reconstruction"){
							removeChart(i, item);
						}else{
							item.chart.setOption(endOption);
						}
					}
				}else{
					$("#"+item.id).highcharts(endOption);
				}
			}
		}
	});
}
// 颜色选择
function chartColor(val, DataType, atype, colorNum, btype, ctype){
	canvasArray.forEach(function(item, i){
		if(item.id == sxID){
			objectCompletion(allOptions[i].staticOption.chartOption, val, DataType, atype, colorNum, btype);
			var endOption =  $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption);
			var type = allOptions[i].type;
			if(type != "heightcharts"){
				if(val == null && (btype == null || btype == undefined)){
					btype = "reconstruction";
				}
				var chartType = allOptions[i].chartType;
				if(chartType == "table" || chartType == "text"){
					special(endOption, sxID);
					if(chartType == "text"){
						textSeriesArrFun(endOption, sxID);
					}else{
						tableSeriesArrFun(endOption, sxID);
					}
					tetbBackfun(endOption, sxID);
				}else{
					if(atype == "string"){
						if(btype == "reconstruction"){
							removeChart(i, item);
						}else{
							item.chart.setOption(endOption);
						}
					}else{
						removeChart(i, item);
					}
				}
				if(ctype != "switch"){
					historyFun(allOptions[i], i);
				}
			}else{
				$("#"+item.id).highcharts(endOption);(endOption);
			}
		}
	});
}
function colorAddSetValue(athis, type){
	var type = type.split(".");
	var len = type.length -1;
	var len1;
	type.forEach(function(item, i){
		if(i == len){
			len1 = athis[item].length;
			athis[item].push({
				color: "#cccccc"
			});
		}else{
			athis=athis[item]
		}
	});
	return len1;
}
// 渐变色
function typesplit(athis, type, color) {
	var typelist = type.split(".");
	var len = typelist.length-1;
	typelist.forEach(function (item, i) {
		if(i == len){
			athis[item] = color;
		}else{
			athis = athis[item];
		}
	})
}
//下拉框
function chartSelect(val, DataType, atype, mapType, btype, num, athis){
	canvasArray.forEach(function(item, i){
		if(item.id == sxID){
			var thisVal = haveValue(allOptions[i].staticOption.chartOption, DataType, atype);
			if(val != thisVal){
				objectCompletion(allOptions[i].staticOption.chartOption, val, DataType, atype, num, btype);
				var endOption =  $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption);
				var type = allOptions[i].type;
				if(type != "heightcharts"){
					var thisCity;
					var chartType = allOptions[i].chartType;
					if(chartType == "GIS"){
						GISmapFun(item.map, val, mapType);
					}else if(chartType == "table" || chartType == "text"){
						special(endOption, sxID);
						if(chartType == "text"){
							textSeriesArrFun(endOption, sxID);
						}else{
							tableSeriesArrFun(endOption, sxID);
						}
					}else{
						if(val == "" && mapType == undefined){
							mapType = "reconstruction";
						}
						var len = endOption.series.length;
						if(mapType == "reconstruction"){
							if(thisVal != null){
								removeChart(i, item);
							}
						}else if(mapType == "chartMap"){
							var alist = Number(DataType.split(".")[1]);
							var aTrue =  DataType.indexOf("geo")> -1
							if(val == ""){
								if(btype == "province"){
									cityList = [];
									if(aTrue){
										thisCity = athis.geoObj.city;
										athis.geoObj.city = "";
										allOptions[i].staticOption.chartOption.geo.cityList = cityList;
										athis.cityList = cityList;
									}else{
										thisCity = athis.seriesObj.map.city;
										athis.seriesObj.map.city = "";
										allOptions[i].staticOption.chartOption.series[alist].cityList = cityList;
										athis.cityList = cityList;									
									}
									val = "china";
								}else if(btype == "city"){
									if(aTrue){
										val = athis.geoObj.province || "china";
									}else{
										val = athis.seriesObj.map.province || "china";
									}
								}
							}else{
								if(btype == "province"){
									echartsMapCreatFun(val, btype, provincesList);
									athis.cityList = cityList;
									if(aTrue){
										athis.geoObj.city = "";
										allOptions[i].staticOption.chartOption.geo.cityList = cityList;
									}else{
										athis.seriesObj.map.city = "";
										allOptions[i].staticOption.chartOption.series[alist].cityList = cityList;
									}
								}else{
									echartsMapCreatFun(val, btype, athis.cityList);
								}
							}
							if(aTrue){
								objectCompletion(allOptions[i].staticOption.chartOption, val, "geo.map", "string", num, btype);
							}else{
								objectCompletion(allOptions[i].staticOption.chartOption, val, "series."+alist+".map", "string", num, btype);
							}
							var endOption =  $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption);
							item.chart.setOption(endOption);					
						}else{
							item.chart.setOption(endOption);
						}
						if(btype == "series"){
							seriesTypeHide();
							var type = endOption.series[val].type;
							echartSeriesFun(endOption, val, athis, type);
						}else if(btype == "data"){
							var type = endOption.series[num].type;
							seriesDataFun(endOption, num, val, type, athis)
						}else if(btype == "categories"){
							var type = endOption.series[num].type;
							seriesCategoriesFun(endOption, num, val, type, athis)
						}else if(btype == "links"){
							var type = endOption.series[num].type;
							seriesLinksFun(endOption, num, val, type, athis);
						}else if(btype == "radar"){
							radarFun(athis, endOption)
						}else if(btype == "indicator"){
							radarIndicator(endOption, num, val, athis);
						}else if(btype == "Axis"){
							rectangularFun(athis, endOption)
						}else if(btype == "pieces"){
							piecesFun(athis, endOption);
						}else if(btype == "range"){
							rangeFun(athis, endOption);
						}
					}
				}else{
					if(btype == "Hseries"){
						Hseries(athis, endOption, "bar")
					}else if(btype == "Hdata"){
						Hseries(athis, endOption, "pie")
					}else{
						$("#"+item.id).highcharts(endOption);
					}
				}
			}
		}
	});
}
// 滑动条
function chartSilderFun(val, DataType, unit, atype, attrNum, btype, ctype){
	if(unit == "ms"){
		aval = val*1000;
	}else if(unit == "%"){
		aval = val + "%";
	}else if(unit == "decimals"){
		aval = val/100;
	}else{
		aval = val;
	}
	canvasArray.forEach(function(item, i){
		if(item.id == sxID){
			var thisVal = haveValue(allOptions[i].staticOption.chartOption, DataType, atype, attrNum, btype);
			if(aval != thisVal){
				objectCompletion(allOptions[i].staticOption.chartOption, aval, DataType, atype, attrNum, btype);
				var endOption =  $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption);
				var type = allOptions[i].type;
				if(btype == "refreshTime"){
					independenceRefresh(aval);
				}else{
					if(type != "heightcharts"){
						var chartType = allOptions[i].chartType;
						var staticType = allOptions[i].staticType;
						if(chartType == "table" || chartType == "text"){
							special(endOption, sxID);
							if(chartType == "text"){
								textSeriesArrFun(endOption, sxID);
							}else{
								if(btype == "reconstruction"){
									if(thisVal != null){
										removeChart(i, item);
									}
								}else{
									tableSeriesArrFun(endOption, sxID);
								}
							}
						}else if(chartType == "GIS"){
							GISmap(endOption, sxID);
						}else{
							if(btype == "reconstruction"){
								if(thisVal != null){
									removeChart(i, item);
								}
							}else{
								item.chart.setOption(endOption);
							}
						}
					}else{
						$("#"+item.id).highcharts(endOption);(endOption);
					}
				}
				
			}
		}
	});
}
function sliderSetValue(athis, type, val){
	if(type != undefined){
		var type = type.split(".");
		var len = type.length -1;
		type.forEach(function(item, i){
			if(i == len){
				athis[item] = val;
			}else{
				athis=athis[item]
			}
		});
	}
}
// 单选
function chartRadio(val, DataType, atype, btype, num, athis){
	canvasArray.forEach(function(item, i){
		if(item.id == sxID){
			var thisVal = haveValue(allOptions[i].staticOption.chartOption, DataType, atype);	
			if(val != thisVal){
				var bItom = allOptions[i].staticOption.chartOption;
				if(btype == "animationEasing"){
					allOptions[i].staticOption.chartOption.series.forEach(function(item, i){
						objectCompletion(bItom, val, "series."+ i +DataType, atype);
					});
					if(thisVal != null){
						removeChart(i, item);
					}
				}else{
					objectCompletion(bItom, val, DataType, atype, num, btype);
					var endOption =  $.extend(true, {}, allOptions[i].dataOption, allOptions[i].staticOption.chartOption);
					var type = allOptions[i].type;
					if(type != "heightcharts"){
						var chartType = allOptions[i].chartType;					
						if(chartType == "table" || chartType == "text"){
							special(endOption, sxID);
							if(chartType == "text"){
								textSeriesArrFun(endOption, sxID);
							}else{
								tableSeriesArrFun(endOption, sxID);
								if(btype == "shufflingBtn"){
									var sfbnbody = $("#"+sxID+" .sfbnbody");
									shufflingBtnFun(endOption, sfbnbody);
								}
							}
						}else{
							if(btype == "animation"){
								GISmapFun(item.map, endOption, btype);
							}else{
								var len = endOption.series.length;
								if(btype == "seriesType"){
									removeChart(i, item);
									pitchUp(sxID);
								}else if(btype == "tooltipPointerType"){
									tooltipAxisPointer(athis, val, bItom);
									athis.tooltipObj.pointer = val;	
									objectCompletion(bItom, val, "tooltip.pointer", "string");							
								}else if(btype == "visualMapOrient"){
									if(athis.visualMapType == "continuous"){
										if(val == "vertical"){
											athis.align1 = "left";
											athis.align2 = "right";
										}else{
											athis.align1 = "top";
											athis.align2 = "bottom";
										}
										athis.visualMapAlign = "auto";
									}else{
										athis.align1 = "left";
										athis.align2 = "right";
									}
								}else if(btype == "reconstruction"){
									if(thisVal != null){
										removeChart(i, item);
									}
								}else{
									if(atype == "string" || atype == "array"){
										item.chart.setOption(endOption);
									}else if(atype == "object"){
										if(thisVal != null){
											removeChart(i, item);
										}
									}
								}
							}
						}
					}else{
						$("#"+item.id).highcharts(endOption);(endOption);
					}
				}
			}
		}
	});
}
// 选中与未选中图元颜色数组
function RangeColorFun(option, visualMapRange){
	var RangeColorList = [];
	RangeColor = option.visualMap[visualMapRange].color
	RangeColor.forEach(function(item, i){
		RangeColorList.push({
			color: item
		})
	});
	return RangeColorList;
}
// 隔线颜色数组
function axisSplitLineFun(axis, axisIndex){
	list = [];
	if(theme != null){
		theme.valueAxis.splitLine.lineStyle.color.forEach(function(item, i){
			list.push({
				color: item
			});
		});
	}else{
		list = [{color:"#cccccc"}]
	}
	if(axis[axisIndex].splitLine != undefined){
		if(axis[axisIndex].splitLine.lineStyle != undefined){
			if(axis[axisIndex].splitLine.lineStyle.color != undefined){
				list = [];
				axis[axisIndex].splitLine.lineStyle.color.forEach(function(item){
					list.push({
						color: item
					});
				});
			}
		}
	}
	return list;
}
// 隔区颜色数组
function axisSplitAreaFun(axis, axisIndex){
	list = [];
	if(theme != null){
		theme.valueAxis.splitArea.areaStyle.color.forEach(function(item, i){
			list.push({
				color: item
			})
		});
	}else{
		list = [{color:'rgba(250,250,250,0.3)'},{color: 'rgba(200,200,200,0.3)'}]
	}
	if(axis[axisIndex].splitArea != undefined){
		if(axis[axisIndex].splitArea.areaStyle != undefined){
			if(axis[axisIndex].splitArea.areaStyle.color != undefined){
				list = [];
				axis[axisIndex].splitArea.areaStyle.color.forEach(function(item){
					list.push({
						color: item
					});
				});
			}
		}
	}
	return list;
}
// 文本表格标题视区属性
function special(endOption, id) {
	var show = endOption.title.show;
	if(show != undefined){
		show ? $("#" + id + " .title").show() : $("#" + id + " .title").hide();
	}
	// 主标题
	$("#" + id + " .title .text").text(endOption.title.text);
	if (endOption.title.link != undefined) {
		$("#" + id + " .title .text").attr("href", endOption.title.link);
	}
	if(endOption.title.target == "blank"){
		$("#" + id + " .title .text").attr("target", "view_window");
	}else{
		$("#" + id + " .title .text").removeAttr("target");
	}
	var fontSize = haveValue(endOption, "title.textStyle.fontSize", "number");
	$("#" + id + " .title .text").css("color", haveValue(endOption, "title.textStyle.color", "string") || haveValue(theme, "title.textStyle.color", "string") || "#333333");
	$("#" + id + " .title .text").css("font-size", fontSize + "px");
	$("#" + id + " .title .text").css("font-style", haveValue(endOption, "title.textStyle.fontStyle", "string"));
	$("#" + id + " .title .text").css("font-weight", haveValue(endOption, "title.textStyle.fontWeight", "string"));
	$("#" + id + " .title .text").css("font-family", haveValue(endOption, "title.textStyle.fontFamily", "string"));
	// 副标题
	$("#" + id + " .title .subtext").text(endOption.title.subtext);
	if (endOption.title.sublink != undefined) {
		$("#" + id + " .title .subtext").attr("href", endOption.title.sublink);
	}
	if(endOption.title.subtarget == "blank"){
		$("#" + id + " .title .subtext").attr("target", "view_window");
	}else{
		$("#" + id + " .title .subtext").removeAttr("target");
	}
	var subfontSize = haveValue(endOption, "title.subtextStyle.fontSize", "number");
	$("#" + id + " .title .subtext").css("color", haveValue(endOption, "title.subtextStyle.color", "string") || haveValue(theme, "title.subtextStyle.color", "string") || "#aaaaaa");
	$("#" + id + " .title .subtext").css("font-size", subfontSize+ "px");
	$("#" + id + " .title .subtext").css("font-style", haveValue(endOption, "title.subtextStyle.fontStyle", "string"));
	$("#" + id + " .title .subtext").css("font-weight", haveValue(endOption, "title.subtextStyle.fontWeight", "string"));
	$("#" + id + " .title .subtext").css("font-family", haveValue(endOption, "title.subtextStyle.fontFamily", "string"));
	var left = endOption.title.left;
	var top = endOption.title.top;
	$("#" + id + " .title").css("left", "");
	$("#" + id + " .title").css("top", "");
	$("#" + id + " .title").removeClass("left");
	$("#" + id + " .title").removeClass("right");
	$("#" + id + " .title").removeClass("center");
	$("#" + id + " .title").removeClass("top");
	$("#" + id + " .title").removeClass("bottom");
	$("#" + id + " .title").removeClass("middle");
	if(left != undefined){
		if(left.indexOf("%") > -1){
			$("#" + id + " .title").css("left", left);
			$("#" + id + " .title").css("top", top);
		}else{
			$("#" + id + " .title").addClass(left);
			$("#" + id + " .title").addClass(top);
		}
	}
	$("#" + id + " .title").css("padding", endOption.title.padding);
	$("#" + id + " .title .subtext").css("padding-top", endOption.title.itemGap);
	var backgroundColor = endOption.title.backgroundColor;
	if(backgroundColor == "transparent"){
		backgroundColor = "rgba(0, 0, 0, 0)";
	}
	backgroundColor = backgroundColor || haveValue(theme, "title.backgroundColor", "string") || "";
	$("#" + id + " .title").css("background-color", backgroundColor);
	$("#" + id + " .title").css("border-width", endOption.title.borderWidth);
	$("#" + id + " .title").css("border-color", endOption.title.borderColor);
	$("#" + id + " .title").css("border-radius", endOption.title.borderRadius);
	if(backgroundColor != ""){
		if(backgroundColor.indexOf("#") > -1){
			shadowFun(endOption, id, "title");
		}else{
			var num = Number(backgroundColor.split(",")[3].split(")")[0]);
			if(num > 0){
				shadowFun(endOption, id, "title");
			}else{
				$("#" + id + " .title").css("box-shadow", "0 0 0 rgba(0, 0, 0, 0)");
			}
		}
	}else{
		$("#" + id + " .title").css("box-shadow", "0 0 0 rgba(0, 0, 0, 0)");
	}
	titleWidth(id);
	// 视区
	$("#" + id + " .grid").css("left", endOption.grid.left);
	$("#" + id + " .grid").css("top", endOption.grid.top);
	$("#" + id + " .grid").css("width", endOption.grid.width);
	$("#" + id + " .grid").css("height", endOption.grid.height);
	$("#" + id + " .grid").css("background-color", endOption.grid.backgroundColor);
	var gridShow = endOption.grid.show;
	$("#" + id + " .grid").css("border-width", endOption.grid.borderWidth);
	$("#" + id + " .grid").css("border-radius", endOption.grid.borderRadius);
	if(gridShow){
		$("#" + id + " .grid").css("border-color", endOption.grid.borderColor);
	}else{
		$("#" + id + " .grid").css("border-color", "rgba(0, 0, 0, 0)");
	}
	var gridBackgroundColor = endOption.grid.backgroundColor;
	if(gridBackgroundColor == "transparent"){
		gridBackgroundColor = "rgba(0, 0, 0, 0)";
	}
	gridBackgroundColor = gridBackgroundColor || "";	if(gridBackgroundColor != ""){
		if(gridBackgroundColor.indexOf("#") > -1){
			shadowFun(endOption, id, "grid");
		}else{
			var num = Number(gridBackgroundColor.split(",")[3].split(")")[0]);
			if(num > 0){
				shadowFun(endOption, id, "grid");
			}else{
				$("#" + id + " .grid").css("box-shadow", "0 0 0 rgba(0, 0, 0, 0)");
			}
		}
	}else{
		$("#" + id + " .grid").css("box-shadow", "0 0 0 rgba(0, 0, 0, 0)");
	}
}
function shadowFun(endOption, id, type){
	var shadowBlur = endOption[type].shadowBlur || 0;
	var shadowColor = endOption[type].shadowColor || "rgba(0, 0, 0, 0)";
	var shadowOffsetX = endOption[type].shadowOffsetX || 0;
	var shadowOffsetY = endOption[type].shadowOffsetY || 0;
	$("#" + id + " ." + type).css("box-shadow", shadowOffsetX+"px " + shadowOffsetY + "px " + shadowBlur + "px " + shadowColor);
}
function titleWidth(id) {
	$("#" + id + " .title").css("width", "auto");
	var a = $("#" + id + " .title .text").width(),
		b = $("#" + id + " .title .subtext").width();
	if ((a - b) > 0) {
		$("#" + id + " .title").width(a);
	} else {
		$("#" + id + " .title").width(b)
	}
}
function tetbBackfun(endOption, id){
	$("#" + id).css("background-color",  haveValue(endOption, "backgroundColor", "string") || haveValue(theme, "backgroundColor", "string") || "");
}
// 表格属性
function tableSeriesArrFun(endOption, id, animate) {
	runNum = endOption.runNum || 1;
	// 隔线
	tableBorderFun();
	function tableBorderFun(){
		var borderWidth = (endOption.borderWidth || 0)/100+"rem";
		var borderColor = endOption.borderColor || themeSeriesFun(0);
		var borderStyle = endOption.borderStyle || "solid";
		tableBorder("head");
		tableBorder("tbBodyBox");
		function tableBorder(className) {
			$("#" + id + " ."+className+" li div").css("border-left-width", borderWidth);
			$("#" + id + " ."+className+" li div").css("border-bottom-width", borderWidth);
			$("#" + id + " ."+className+" li div").css("border-right-width", 0);
			$("#" + id + " ."+className+" li div").css("border-top-width", 0);
			$("#" + id + " ."+className+" li").each(function (i, item){
				if(className == "head"){
					$(item).children("div:last").css("border-right-width", borderWidth);
				}else{
					$(item).children("a").children("div:last").css("border-right-width", borderWidth);
				}
			});
			$("#" + id + " ."+className+" li div").css("border-style", borderStyle);
			$("#" + id + " ."+className+" li div").css("border-color", borderColor);
		}
		$("#" + id + " .grid").css("border-top-width", borderWidth);
		$("#" + id + " .grid").css("border-style", borderStyle);
		$("#" + id + " .grid").css("border-color", borderColor);
	}
	// 行高
	tableLineFun(endOption, id);
	// 表头
	fontFun($("#" + id + " .header"), "header");
	// 奇数
	fontFun($("#" + id + " .idol a"), "idol");
	// 偶数
	fontFun($("#" + id + " .odd a"), "odd");
	function fontFun(dom, type){
		dom.css("color", haveValue(endOption, type + ".color", "string") || themeSeriesFun(0));
		dom.css("font-family", haveValue(endOption, type + ".fontFamily", "string") || "sans-serif");
		dom.css("font-size", (haveValue(endOption, type + ".fontSize", "number") || 14)/100+"rem");
		dom.css("font-style", haveValue(endOption, type + ".fontStyle", "string") || "normal");
		dom.css("font-weight", haveValue(endOption, type + ".fontWeight", "string") || "normal");
		dom.css("background-color", haveValue(endOption, type + ".backgroundColor", "string") || "");
	}
}
function tableLineFun(endOption, id){
	var height = $("#" + id + " .grid").height();
	var showNum = endOption.showNum || 10;
	lineBOxHeight = height/(showNum+1);
	$("#" + id + " .head").height(lineBOxHeight + "px");
	$("#" + id + " .head li div span").css("line-height", lineBOxHeight + "px");	
	$("#" + id + " .tbBodyBox").height(lineBOxHeight*showNum + "px");
	$("#" + id + " .tbBody li").height(lineBOxHeight + "px");
	$("#" + id + " .tbBody li div span").css("line-height", lineBOxHeight + "px");
}
function tableAnimate(canvas, tbBody, val){
	clearInterval(canvas.timer);
	canvas.timer = setInterval(function(){
		tbBody.animate({
			marginTop : -lineBOxHeight*runNum + "px"
		},500,function(){
			for(var i=0; i<runNum; i++){
				$(this).css({marginTop : "0px"}).find("li:first").appendTo(this);
			}
		});
	}, val*1000);
}
function shufflingBtnFun(ochartOption, sfbnbody){
	sfbnbody.css({
		left: "",
		top: "",
		right: "",
		width: ""
	});
	var obj = {};
	var shufflingBtn = haveValue(ochartOption, "shufflingBtn", "string") || "bottom";
	var shufflingBtnWd = haveValue(ochartOption, "shufflingBtnWd", "number") || 10;
	obj[shufflingBtn] = -shufflingBtnWd*1.5;
	if(shufflingBtn == "bottom"){
		obj.left = "50%";
		obj.transform = "translateX(-50%)";
	}else{
		obj.width = shufflingBtnWd*2;
		obj.top = "50%";
		obj.transform = "translateY(-50%)";
	}
	sfbnbody.css(obj);
	sfbnbody.children(".sfbn").css({
		width: shufflingBtnWd,
		height:shufflingBtnWd,
		margin: shufflingBtnWd*0.5,
	});
}
// 文本图属性
function textSeriesArrFun(endOption, id) {
	emFontSiz(id, 3.5);
	endOption.series.forEach(function(item, i) {
		$("#" + id + " .grid .series" + i + " .textName").text(endOption.series[i].textStyle.name);
		var exclusive = endOption.series[i].textStyle.exclusive;
		if(exclusive){
			$("#" + id + " .grid .series" + i + " .prefixes").css("width", "100%");
		}else{
			$("#" + id + " .grid .series" + i + " .prefixes").css("width", "auto");
		}
		$("#" + id + " .grid .series" + i + " .unit").text(endOption.series[i].untextStyle.name);
		var unExclusive = endOption.series[i].untextStyle.exclusive;
		if(unExclusive){
			$("#" + id + " .grid .series" + i + " .suffix").css("width", "100%");
		}else{
			$("#" + id + " .grid .series" + i + " .suffix").css("width", "auto");
		}
		function textArrListFun(className, type){
			if(endOption.series[i][type].padding == undefined){
				if(endOption.series[i][type].margin != undefined){
					endOption.series[i][type].padding = endOption.series[i][type].margin;
				}
			}
			$("#" + id + " .grid .series" + i + " ."+className).css("font-family", haveValue(endOption, "series."+i+ "."+ type +".fontFamily", "string") || "sans-serif");
			$("#" + id + " .grid .series" + i + " ."+className).css("color", haveValue(endOption, "series."+i+ "."+ type +".color", "string") || themeSeriesFun(i));
			$("#" + id + " .grid .series" + i + " ."+className).css("font-size", (haveValue(endOption, "series."+i+ "."+ type +".fontSize", "number")/100 || 12) + "em");
			$("#" + id + " .grid .series" + i + " ."+className).css("letter-spacing", (haveValue(endOption, "series."+i+ "."+ type +".letterSpacing", "number")/100 || 0) + "rem");
			$("#" + id + " .grid .series" + i + " ."+className).css("font-style", haveValue(endOption, "series."+i+ "."+ type +".fontStyle", "string"));
			$("#" + id + " .grid .series" + i + " ."+className).css("font-weight", haveValue(endOption, "series."+i+ "."+ type +".fontWeight", "string"));
			$("#" + id + " .grid .series" + i + " ."+className).css("padding-left", haveValue(endOption, "series."+i+ "."+ type +".padding.left", "number")/100 + "rem");
			$("#" + id + " .grid .series" + i + " ."+className).css("padding-right", haveValue(endOption, "series."+i+ "."+ type +".padding.right", "number")/100 + "rem");
			$("#" + id + " .grid .series" + i + " ."+className).css("padding-top", haveValue(endOption, "series."+i+ "."+ type +".padding.top", "number")/100 + "rem");
			$("#" + id + " .grid .series" + i + " ."+className).css("padding-bottom", haveValue(endOption, "series."+i+ "."+ type +".padding.bottom", "number")/100 + "rem");
			$("#" + id + " .grid .series" + i + " ."+className).css("background-color", haveValue(endOption, "series."+i+ "."+ type +".backgroundColor", "string") || "");
			$("#" + id + " .grid .series" + i + " ."+className).css("border-width", (haveValue(endOption, "series."+i+ "."+ type +".borderWidth", "number")/100 || 0) + "rem");
			$("#" + id + " .grid .series" + i + " ."+className).css("border-radius", (haveValue(endOption, "series."+i+ "."+ type +".borderRadius", "number")/100 || 0) + "rem");
			$("#" + id + " .grid .series" + i + " ."+className).css("border-color", haveValue(endOption, "series."+i+ "."+ type +".borderColor", "string") || "");
			$("#" + id + " .grid .series" + i + " ."+className).css("border-style", haveValue(endOption, "series."+i+ "."+ type +".borderStyle", "string") || "solid");
		}
		textArrListFun("textName", "textStyle");
		textArrListFun("data", "subtextStyle");
		textArrListFun("unit", "untextStyle");
	});
	gridWidthFun(id, 0);
}
function emFontSiz(id, num){
	var width = $("#" + id).width();
	if(width>num*100){
		$("#" + id + " .grid").css("font-size", width/num+"px");
	}else{
		$("#" + id + " .grid").css("font-size", "100px");
	}
}
// 文本图series宽
function gridWidthFun(id, i){
	$("#" + id + " .grid .series" + i).width("100%");
	$("#" + id + " .grid .series" + i).width();
	var width1 = $("#" + id + " .grid .series" + i + " .prefixes").width();
	var width2 = $("#" + id + " .grid .series" + i + " .content").width();
	var width3 = $("#" + id + " .grid .series" + i + " .suffix").width();
	var width = width1 + width2 +width3+1;
	$("#" + id + " .grid .series" + i).width(width);
	$("#" + id + " .grid .series" + i).css("overflow", "hidden");
}
// 重载图表
function removeChart(i, item){
	$("#"+sxID).remove();
	var element = $('<div class="element" id="'+sxID+'"></div>').appendTo($(oBox[i]));
	TBSC(allOptions[i], sxID, element, item);
}
// 主题颜色
var colors = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
function themeSeriesFun(i){
	if(theme != null){
		var len = theme.color.length;
		var color = theme.color[i%len];
		return color;
	}else{
		return colors[i];
	}
}
//链接
function hrefFun(dom, options){
	var href = options.href || "";
	if(href.indexOf("://")>-1){
		href = href ? href.split("://")[1] : "";
	}
	if (href != "") {
		if(href.indexOf("qd/qdDesign") > -1){
			href = ctx+href;
			dom.attr("href", href);
		}else{
			dom.attr("href", "http://"+ href);
		}
	}else{
		dom.removeAttr("href");
	}
	if(options.target == "blank"){
		dom.attr("target", "view_window");
	}else{
		dom.removeAttr("target");
	}
}
// 元素位置选择
function eleLocationFun(val){
	$(".tabsTitle").children("li").children().css("text-decoration", "none");
	if(val != "content" && val != ""){
		$("#"+val).parent().siblings(".tabsTitle").children("li[data ^='"+val+"']").children().css("text-decoration", "underline");
	}
}
// 元素位置选择后创建
function elementCreateFun(id){
	$(".tabsTitle").children("li").children().css("text-decoration", "none");
	var obj = {};
	allOptions.forEach(function(item, i){
		if(item.id == sxID){
			z++;
			obj = copyAndClear(item);
			obj.staticOption.boxId = id;
			elementDeteFun(i);
			allOptions.push(obj);
			create(obj.type, obj);
		}
	});
}
// 图形
function TXSXCSH(dom, options) {
	dom.children().children().css('fill',haveValue(options, "fill.color", "string") || "#758697");
	otherBBAttrFun(dom, options);
	dom.children().css({"background-color": haveValue(options, "background.color", "string") || ""});
	hrefFun(dom, options);
}
// tabs页
function tabSXCSH(dom, options) {
	otherBBAttrFun(dom, options);
	var tabIndex = Number(haveValue(options, "tabIndex", "number") || 0);	
	tabSelectde(dom.children(".tabsTitle").children(), "unselected",  options);
	tabSelectde($(dom.children(".tabsTitle").children()[tabIndex]), "selected",  options);
	tabBodySelectde(dom.children(".tabsBody"),  options);
}
function tabSelectde(dom, type, oitem){
	dom.css({
		"font-weight":haveValue(oitem, type+".fontWeight", "string") || "normal",
		"font-style":haveValue(oitem, type+".fontStyle", "string") || "normal",
		"font-family": haveValue(oitem, type+".fontFamily", "string") || "sans-serif",
		"font-size": (haveValue(oitem, type+".fontSize", "number") || 0.18) + "rem",
		"letter-spacing": (haveValue(oitem, type+".letterSpacing", "number")||0) + "rem",
		"color": haveValue(oitem, type+".color", "string") || "#333333",
		"border-width": (haveValue(oitem, type+".borderWidth", "number")||0) + "rem",
	});
	if(type == "unselected"){
		dom.css({
			"background-color": haveValue(oitem, type+".backgroundColor", "string") || "#eeeeee",
			"border-color": "rgba(0,0,0,0)",
			"border-bottom-color": haveValue(oitem, "selected.borderColor", "string") || "#409EFF"
		});
	}else{
		dom.siblings().css({
			"border-width": (haveValue(oitem, type+".borderWidth", "number")||0) + "rem",
		})
		dom.css({
			"background-color": haveValue(oitem, type+".backgroundColor", "string") || "",
			"border-color": haveValue(oitem, "selected.borderColor", "string") || "#409EFF",
			"border-bottom-color": "rgba(0,0,0,0)"
		});	
	}
}
function tabBodySelectde(dom, oitem){
	dom.css({
		"background-color": haveValue(oitem, "selected.backgroundColor", "string") || "",
		"border-width": (haveValue(oitem, "selected.borderWidth", "number")||0) + "rem",
		"border-color": haveValue(oitem, "selected.borderColor", "string") || "#409EFF"
	});
	var show = haveValue(oitem, "tabShow", "boolean");
	show = show == null ? true : show;
	if(show){
		dom.css({
			"border-top-color": "rgba(0,0,0,0)"
		});
	}else{	
		dom.css({
			"border-top-color": haveValue(oitem, "selected.borderColor", "string") || "#409EFF"
		});
	}
}
// 文本输入
function WBSXCSH(dom, options) {
	var odom = dom.children();
	odom.val(options.content);
	otherAttrFun(dom, options, "rem");
	dom.css({"background-color": haveValue(options, "background.color", "string") || ""});
	odom.css("text-align", haveValue(options, "text.align", "string") || "center");
	odom.css("color", haveValue(options, "color", "string") || haveValue(theme, "title.textStyle.color", "string") || "#333333");
	hrefFun(dom, options);
}
// 文本滚动
function MQSXCSH(dom, options){
	var odom = dom.children();
	odom.val(options.content);
	otherAttrFun(dom, options, "rem");
	dom.css({"background-color": haveValue(options, "background.color", "string") || ""});
	// animation marquee 5s 
	var time = haveValue(options, "time", "number");
	time = time == null ? 5 : time;
	odom.css("animation-duration", time + "s");
	odom.children("span").css("padding-right", (haveValue(options, "padding", "number") || 0.2) + "rem");
	odom.css("color", haveValue(options, "color", "string") || haveValue(theme, "title.textStyle.color", "string") || "#333333");
	hrefFun(dom, options);
}
// 数字翻牌
function CPSXCSH(dom, options){
	otherAttrFun1(dom, "prefix", options, "rem", 0.16);
	otherAttrFun1(dom, "content", options, "rem", 0.16);
	otherAttrFun1(dom, "suffix", options, "rem", 0.16);
	dom.css({"background-color": haveValue(options, "background.color", "string") || ""});	
}
function STSXCSH(dom, options){
	var adom = dom.children();	
	adom.css({
		"width": "",
		"height": "",
	});	
	otherAttrFun1(dom, "STprefix", options, "rem", 0.6);
	otherAttrFun1(dom, "STsuffix", options, "rem", 0.6);
	dom.css({"background-color": haveValue(options, "background.color", "string") || ""});	
	var fontSize = haveValue(options, "dataStatistics.font.size", "number")||0.6;
	var margin = haveValue(options, "dataStatistics.margin", "number");
	margin = margin == null ? 0.02 : margin;
	adom.children(".dataStatistics").children(".digit_set").css({
		"font-family": haveValue(options, "dataStatistics.font.family", "string") || "sans-serif",
		"font-size": fontSize + "rem",
		"font-weight":haveValue(options, "dataStatistics.font.weight", "string") || "normal",
		"font-style":haveValue(options, "dataStatistics.font.style", "string") || "normal",
		"color": haveValue(options, "dataStatistics.color", "string") || "#fff",
		"margin-left": margin+ "rem",
		"width": 2/3*fontSize  + "rem",
		"height": fontSize  + "rem",
		"line-height": fontSize  + "rem"
	});
	var backgroundColor = haveValue(options, "dataStatistics.backgroundColor", "string") || "rgb(99, 45, 93)";
	adom.children(".dataStatistics").children(".digit_set").children(".digit").css({
		"background-color": backgroundColor,

	});
	adom.children(".dataStatistics").children(".digit_set").children(".digit").children("div").css({
		"background-color": backgroundColor,		
		"border-color": backgroundColor
	});
	adom.children(".dataStatistics").children(".digit_set:first").css("margin-left", 0);
	adom.children(".dataStatistics").css({
		"padding-right": (haveValue(options, "dataStatistics.padding", "number")||0) + "rem",		
		"height": fontSize  + "rem"
	});
	statisticWidthFun(adom);
}
function statisticWidthFun(adom){
	var pdom = adom.children(".STprefix");
	var ddom = adom.children(".dataStatistics");
	var sdom = adom.children(".STsuffix");
	var height = [pdom.height(), ddom.height(), sdom.height()].sort()[2];
	var width = pdom.width() + parseInt(pdom.css("padding-right")) + ddom.width() + parseInt(ddom.css("padding-right")) + sdom.width() + parseInt(sdom.css("padding-right")) + 1;
	adom.css({
		"width": width,
		"height": height,
	});	
}
// 时间
function TMSXCSH(dom, options) {
	// emFontSiz1(dom, 7);
	otherAttrFun(dom, options, "rem");
	dom.css({"background-color": haveValue(options, "background.color", "string") || ""});
}
// 天气
function WHSXCSH(dom, options) {
	otherBBAttrFun(dom, options);
	dom.css({
		"background-color": haveValue(options, "background.color", "string") || "",
		"color": haveValue(options, "color", "string") || "#333333",		
		"font-weight":haveValue(options, "font.weight", "string") || "normal",
		"font-style":haveValue(options, "font.style", "string") || "normal",
	});
}
// 图片
function TPSXCSH(dom, options) {
	otherBBAttrFun(dom, options);
	hrefFun(dom, options);
}
// 视频
function VDSXCSH(dom, options) {
	otherBBAttrFun(dom, options);
}
// 音频
function ADSXCSH(dom, options) {
	otherBBAttrFun(dom, options);
	var show = haveValue(options, "show", "boolean");
	show = show == null ? true : show;
	if(show){
		dom.parent().css("display", "block");		
	}else{
		dom.parent().css("display", "none");		
	}
	dom.css({"background-color": haveValue(options, "background.color", "string") || ""});	
}
// 组件共用
function emFontSiz1(dom, num){
	var width = dom.width();
	if(width>num*100){
		dom.css("font-size", width/num+"px");
	}else{
		dom.css("font-size", "100px");
	}
}
// 字体
function otherAttrFun(dom, oitem, unit){
	var odom = dom.children();
	odom.css({
		"font-family": haveValue(oitem, "font.family", "string") || "sans-serif",
		"font-size": (haveValue(oitem, "font.size", "number")||0.16) + unit,
		"font-weight":haveValue(oitem, "font.weight", "string") || "normal",
		"font-style":haveValue(oitem, "font.style", "string") || "normal",
		"letter-spacing": (haveValue(oitem, "letter.spacing", "number")||0) + unit,
		"line-height": (haveValue(oitem, "line.height", "number")|| 1),
		"text-align": haveValue(oitem, "text.align", "string") || "center",
		"color": haveValue(oitem, "color", "string") || "#333333"
	});
	otherBBAttrFun(dom, oitem);
}
function otherAttrFun1(dom, type, oitem, unit, num){
	var odom = dom.children().children("."+type);
	odom.css({
		"font-family": haveValue(oitem, type+".font.family", "string") || "sans-serif",
		"font-size": (haveValue(oitem, type+".font.size", "number")||num) + unit,
		"font-weight":haveValue(oitem, type+".font.weight", "string") || "normal",
		"font-style":haveValue(oitem, type+".font.style", "string") || "normal",
		"letter-spacing": (haveValue(oitem, type+".letter.spacing", "number")||0) + unit,
		"line-height": (haveValue(oitem, type+".line.height", "number")|| 1),
		"padding-right": (haveValue(oitem, type+".padding", "number")||0) + unit,
		"color": haveValue(oitem, type+".color", "string") || "#333333",
	});
	otherBBAttrFun(dom, oitem);
}
// 边框
function otherBBAttrFun(dom, oitem){
	dom.css({
		"border-style": haveValue(oitem, "border.style", "string") || "solid",
		"border-width": (haveValue(oitem, "border.width", "number")||0) + "rem",
		"border-radius": (haveValue(oitem, "border.radius", "number")||0) + "rem",
		"border-color": haveValue(oitem, "border.color", "string") || "rgba(0,0,0,0)",
	});
}
// 筛选器
function SXSXCSH(id, options) {
	$("#" + id + " .SXboxp").text(haveValue(options, "title.name", "string") || "");
	shaixuanArrFun($("#" + id + " .SXboxp"), "title", options);
	shaixuanArrFun($("#" + id + " .SXboxdiv").children(), "content", options);
	otherBBAttrFun($("#" + id).children(), options)
}
function shaixuanArrFun(dom, type, oitem){
	dom.css({
		"font-weight":haveValue(oitem, type+".font.weight", "string") || "normal",
		"font-style":haveValue(oitem, type+".font.style", "string") || "normal",
		"font-family": haveValue(oitem, type+".font.family", "string") || "sans-serif",
		"font-size": (haveValue(oitem, type+".font.size", "number")||0.16) + "rem",
		"letter-spacing": (haveValue(oitem, type+".letter.spacing", "number")||0) + "rem",
		"line-height": haveValue(oitem, type+".line.height", "number") ||1,
		"color": haveValue(oitem, type+".color", "string") || "#333333",
		"background-color": haveValue(oitem, type+".background.color", "string") || "",
		"text-align": haveValue(oitem, type+".text.align", "string") || "left"
	});
}
// 对象属性创建
function objectCompletion(option, val, DataType, atype, colorNum, btype){
	var attrObj = DataType.split(".");
	var length =attrObj.length-1;
	var opt = option;
	var thisOpt = option;
	attrObj.forEach(function(item, i){
		opt = opt[item];
		if(i == length){
			if(atype == "string" || atype == "boolean" || atype == "number"){
				if(val+"" == "null" || val+"" == ""){
					delete thisOpt[item];
				}else if(val == "false"){
					val = false 
					thisOpt[item] = val;
				}else{
					thisOpt[item] = val;
				}
			}else if(atype == "object"){
				if(thisOpt[item] == undefined || thisOpt[item] == null || typeof(thisOpt[item]) == "string"){
					thiObj ={
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0, color: 'rgba(0,0,0,0)'
						}, {
							offset: 1, color: 'rgba(0,0,0,0)'
						}]
					}
					if(colorNum != null){
						thisOpt[item] = copyAndClear(thiObj);
						thisOpt[item].colorStops[colorNum].color = val;
					}else{
						if(val == "linear"){
							thiObj.type = "linear";
							thiObj.x = 0;
							thiObj.y = 0;
							thiObj.x2 = 0;
							thiObj.y2 = 1;
						}else{
							thiObj.type = "radial";
							thiObj.x = 0.5;
							thiObj.y = 0.5;
							thiObj.r = 0.5;
						}
					}
				}else{
					if(colorNum == undefined){
						if(val == "linear"){
							thisOpt[item].type = "linear";
							thisOpt[item].x = 0;
							thisOpt[item].y = 0;
							thisOpt[item].x2 = 0;
							thisOpt[item].y2 = 1;
						}else{
							thisOpt[item].type = "radial";
							thisOpt[item].x = 0.5;
							thisOpt[item].y = 0.5;
							thisOpt[item].r = 0.5;
						}
					}else{
						thisOpt[item].colorStops[colorNum].color = val;
					}
				}
			}else if(atype == "array"){
				if(thisOpt[item] != undefined){
					if(btype == "gaugeAxisLine"){
						thisOpt[item][colorNum][1] = val;
					}else if(btype == "gaugeAxisLine1"){
						thisOpt[item][colorNum][0] = val;
					}else if(btype == "map"){
						thisOpt[item] = val;
					}else{
						thisOpt[item][colorNum] = val;
					}
				}else{
					if(btype == "gaugeAxisLine"){
						var list =  [[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']];
						thisOpt[item]= list;
						thisOpt[item][colorNum][1] = val;
					}else if(btype == "gaugeAxisLine1"){
						var list =  [[0.2, '#91c7ae'], [0.8, '#63869e'], [1, '#c23531']];
						thisOpt[item]= list;
						thisOpt[item][colorNum][0] = val;
					}else if(btype == "map"){
						thisOpt[item]= val;
					}else{
						if(btype == "center"){
							var list = ["50%", "50%"];
						}else if(btype == "radius"){
							var list = ["0%", "75%"];
						}else if(btype == "size"){
							var list = ["40%", "40%"];
						}else if(btype == "markSymbol"){
							var list = ["circle", "arrow"];
						}else if(btype == "toffsetCenter"){
							var list = ["0%", "-40%"];
						}else if(btype == "doffsetCenter"){
							var list = ["0%", "40%"];
						}else if(btype == "linksSymbol"){
							var list = ["none", "none"];
						}else if(btype == "axisSplitLine"){
							var list = haveValue(theme, "valueAxis.splitLine.lineStyle.color") || ["#cccccc"];
						}else if(btype == "axisSplitArea"){
							var list = haveValue(theme, "valueAxis.splitArea.areaStyle.color") || ["#cccccc"]
						}else if(btype == "textRotation"){
							var list = [90, -90];
						}
						thisOpt[item]= list;
						thisOpt[item][colorNum] = val;
					}
				}
			}
		}else{
			if(opt == undefined){
				thisOpt[item] = {};
				opt = thisOpt[item];
			}
		}
		thisOpt = opt;
	});
}
// 获取对象属性值
function haveValue(option, DataType, atype, colorNum, btype){
	var attrObj = DataType.split(".");
	var opt = option;
	var length = attrObj.length-1;
	attrObj.forEach(function(item, i){
		if(opt != undefined && opt != null){
			opt = opt[item];
			if(i == length){
				if(opt !=null || opt !=undefined){
					if(atype == "number" || atype == "boolean" || atype == "list"){
						opt = opt;
					}else if(atype == "string"){
						if(typeof(opt) == "string"){
							opt = opt;
						}else if(typeof(opt) == "boolean"){
							opt = opt + "";
						}else{
							opt=null;
						}
					}else if(atype == "array"){
						if(typeof(opt) == "object"){
							if(colorNum == null){
								opt = opt.join(",")								
								console.log(opt, 1195)
							}else{
								if(btype == "gaugeAxisLine"){
									opt = opt[colorNum][1];
								}else if(btype == "gaugeAxisLine1"){
									opt = opt[colorNum][0];
								}else{
									opt = opt[colorNum];
								}
							}
						}else{
							opt=null;
						}
					}else{
						if(typeof(opt) == "object"){
							if(colorNum != undefined){
								opt = opt.colorStops[colorNum].color
							}else{
								opt = opt.type
							}
						}else{
							opt =null;
						}
					}
				}else{
					opt = null;
				}
			}else{
				if(opt !=null || opt !=undefined){
					opt = opt;
				}else{
					opt = null
				}
			}
		}else{
			opt = null
		}
	});
	return opt;
}
// 颜色输入判断
function CheckIsColor(val){
	val = val+"";
	var atype1 =/^#([0-9a-fA-F])\1{2}$/g;
	var atype2 = /^(#[0-9a-fA-F]{6}){1}$/g;
	var type1 = /rgb\(\s*((\d|([1-9]\d)|(1\d\d)|(2[0-4]\d)|(25[0-5])))\s*,\s*((\d|([1-9]\d)|(1\d\d)|(2[0-4]\d)|(25[0-5])))\s*,\s*((\d|([1-9]\d)|(1\d\d)|(2[0-4]\d)|(25[0-5])))\s*?\)$/g;
	var type2 = /rgba\(\s*((\d|([1-9]\d)|(1\d\d)|(2[0-4]\d)|(25[0-5])))\s*,\s*((\d|([1-9]\d)|(1\d\d)|(2[0-4]\d)|(25[0-5])))\s*,\s*((\d|([1-9]\d)|(1\d\d)|(2[0-4]\d)|(25[0-5])))\s*(?:,\s*(\b(0(\.\d{1,2})?)|1\b)\s*)?\)$/g;
	var a1 = atype1.test(val);
	var a2 = atype2.test(val);
	var b1 = type1.test(val);
	var b2 = type2.test(val);
	return  a1 || a2 || b1 || b2;
}
// 位置宽高
function inputNumChange(val, type, DataType, athis){
	val = Number(val);
	if(val+"" != "NaN"){
		canvasArray.forEach(function(item, i){
			if (item.id == sxID) {
				var oitem = allOptions[i].staticOption;
				newTop = oitem.position.top/scale;
				newLeft = oitem.position.left;
				newHeight = oitem.boxSize.height/scale;
				newWidth = oitem.boxSize.width;
				maxTop = 100 - newHeight;
				maxLeft = 100 - newWidth;
				maxHeight = 100 - newTop;
				maxWidth = 100 - newLeft;
				switch(DataType){
					case "top":
						val = (val<=maxTop) ? val : maxTop;
						oitem.position[DataType] = val*scale;
						break;
					case "left":
						val = (val<=maxLeft) ? val : maxLeft;
						oitem.position[DataType] = val;
						break;
					case "width":
						val = (val<=maxWidth) ? val : maxWidth;
						oitem.boxSize[DataType] = val;
						break;
					case "height":
						val = (val<=maxHeight) ? val : maxHeight;
						oitem.boxSize[DataType] = val*scale;
						maxTop[i] = 100 - val;
						break;
					default:
						break;
				}
				sliderSetValue(athis, type, val);
				$("#"+sxID).parent().css(DataType, val + "%");
				var rightDom = $("#"+sxID).parent().siblings(".rightFunction");
				olPlace(oitem.position.left, oitem.boxSize.width, oitem.position.top, rightDom);
				echartResizeFun(item, i);	
				historyFun(oitem, i);
			}
		});
	}else{
		sliderSetValue(athis, type, thisVal);
	}
}