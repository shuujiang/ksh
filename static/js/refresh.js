//筛选请求
function refreshChart(aa, bb, id) {
	var f = getObjFromArr('nameId', SXarr, id);
	var fc = f.qdFilterChilrdenList;
	var nf = copyAndClear(f),
		nfc = copyAndClear(fc);
	for (var i = 0; i < fc.length; i++) {
		if (fc[i].wdId == "") {
			if (fc[i].remarks) {
				fc[i].remarks = false;
				var cId = fc[i].componentId;
				var cht = copyAndClear(getObjFromArr('id', allOptions, cId));
				deleteFun(i);
				cht.qdFilterChilrden = null;
				cht.qdFilter = null;
				cht.chartName = allOptions[i].staticOption.staticType;
			} else {
				continue;
			}
		} else {
			var cId = fc[i].componentId;
			var cht = copyAndClear(getObjFromArr('id', allOptions, cId));
			deleteFun(i);
			cht.qdFilterChilrden = nfc[i];
			nf.tempValue1 = aa;
			if (bb != undefined && bb != "") {
				nf.tempValue2 = bb;
			}
			cht.qdFilter = nf;
			cht.chartName = allOptions[i].staticOption.staticType;
		}
		function deleteFun(i) {
			// nfc
			delete nfc[i].createDate;
			delete nfc[i].updateDate;
			delete nfc[i].remarks;
			delete nfc[i].orderBy;
			delete nfc[i].filterId;
			delete nfc[i].filterCondition;
			// nf
			delete nf.qdFilterChilrdenList;
			delete nf.createDate;
			delete nf.updateDate;
			delete nf.remarks;
			delete nf.orderBy;
			delete nf.filterOption;
			// cht
			delete cht.dataOption;
			delete cht.createDate;
			delete cht.updateDate;
			delete cht.remarks;
			delete cht.orderBy;
			delete cht.staticOption;
		}
		var data = getDataFromAjax(ctx + "/qd/test/getDataoption", {
			qdDesignChildren: stringifyMore(cht)
		});
		allOptions.forEach(function (item, i) {
			if (item.id == cId) {
				debugger;
				
				var newPotion = item;
				newPotion.dataOption = data;
				var Box = $("#" + canvasArray[i].id).parent();
				var className = $("#" + canvasArray[i].id).attr("class");
				$("#" + canvasArray[i].id).remove();
				var element = $('<div class="' + className + '" id="' + canvasArray[i].id + '" style="width:100%;height:100%;"></div>').appendTo(Box);
				if (className == "yl1") {
					if (YucanvasArray[i].chart != undefined || YucanvasArray[i].chart != null) {
						YucanvasArray[i].chart.dispose();
						YucanvasArray[i].chart = null;
					}
					TBSC(newPotion, canvasArray[i].id, element, YucanvasArray[i]);

				} else {
					TBSC(newPotion, canvasArray[i].id, element, canvasArray[i]);
				}
			}
		})
	}
}
//全页面定时刷新
function refresh(time) {
	if (refreshTimer != undefined) {
		clearInterval(refreshTimer);
	}
	if (time > 0) {
		refreshTimer = setInterval(function () {
			canvasArray.forEach(function (item, i) {
				var type = allOptions[i].type;
				if (type == "echarts2" || type == "echarts" || type == "heightcharts") {
					var refreshTime = allOptions[i].staticOption.refreshTime || 0;
				} else if(type == "component") {
					var staticType = allOptions[i].staticOption.staticType;
					if (staticType == "countUp" || staticType == "statistic") {
						var refreshTime = allOptions[i].staticOption.refreshTime || 0.3;
					}
				}
				if (refreshTime == 0) {
					rebulidFun(item, i, type);
				}
			});
		}, time * 1000 * 60)
	}
}
// 单独刷新
function independenceRefresh(val) {
	var id = sxID;
	canvasArray.forEach(function (item, i) {
		if (item.id == id) {
			if (item.refreshTimer != undefined) {
				clearInterval(item.refreshTimer);
			}
			if (val > 0) {
				item.refreshTimer = setInterval(function () {
					var type = allOptions[i].type;
					rebulidFun(item, i, type);
				}, val * 1000 * 60)
			}
		}
	});
}
function rebulidFun(item, i, type) {
	if ((allOptions[i].dims != null && allOptions[i].dims != "") || (allOptions[i].measures != null && allOptions[i].measures != "")) {
		var aa;
		var bb;
		//定时刷新==  后台请求
		var qdDesignChildren;
		var oid = allOptions[i].id;
		var vId;
		SXarr.forEach(function (item, i) {
			if (item.qdFilterChilrdenList[0].componentId == oid) {
				aa = item.tempValue1;
				bb = item.tempValue2;
				vId = item.nameId;
				if (item.tempValue1 == "") {
					dateTime = $(".JDDYdayinp").val();
					aa = dateTime;
				}
			}
		});
		if (allOptions[i].chartType == "table") {
			var thislist = allOptions[i].dataOption.series[1].data + "";
		}
		if (aa != undefined && aa != "") {
			var f = getObjFromArr('nameId', SXarr, vId);
			var fc = f.qdFilterChilrdenList;
			var nf = copyAndClear(f),
				nfc = copyAndClear(fc);
			for (var j = 0; j < fc.length; j++) {
				if (fc[j].wdId == "") {
					continue;
				}
				var cId = fc[j].componentId;
				var cht = copyAndClear(getObjFromArr('id', allOptions, cId));
				delete nfc[j].createDate;
				delete nfc[j].updateDate;
				delete nfc[j].remarks;
				delete nfc[j].orderBy;
				delete nfc[j].filterId;
				delete nfc[j].filterCondition;
				cht.qdFilterChilrden = nfc[j];
				delete nf.qdFilterChilrdenList;
				delete nf.createDate;
				delete nf.updateDate;
				delete nf.remarks;
				delete nf.orderBy;
				delete nf.filterOption;
				nf.tempValue1 = aa;
				if (bb != undefined && bb != "") {
					nf.tempValue2 = bb;
				}
				cht.qdFilter = nf;
				cht.chartName = allOptions[i].staticOption.staticType;
				delete cht.dataOption;
				delete cht.createDate;
				delete cht.updateDate;
				delete cht.remarks;
				delete cht.orderBy;
				delete cht.staticOption;
				qdDesignChildren = cht;
				cht.chartName = allOptions[i].staticOption.staticType;
			}
		} else {
			var sId = allOptions[i].id;
			var dos = copyAndClear(getObjFromArr('id', allOptions, sId));
			delete dos.dataOption;
			delete dos.createDate;
			delete dos.updateDate;
			delete dos.remarks;
			delete dos.orderBy;
			delete dos.staticOption;
			dos.chartName = allOptions[i].staticOption.staticType;
			qdDesignChildren = dos;
			dos.chartName = allOptions[i].staticOption.staticType;
		}
		var data = getDataFromAjax(ctx + "/qd/test/getDataoption", {
			qdDesignChildren: stringifyMore(qdDesignChildren)
		});
		if (allOptions[i].chartType == "table") {
			newNum = data.series.length - 1;
			data.series.forEach(function (item, i) {
				var aitem = item.data + "";
				if (aitem == thislist) {
					newNum = i - 1;
				}
			});
		}
		allOptions[i].dataOption = data;
		rebulidElementFun(item, i, type)
	} else {
		newNum = 0;
		allOptions[i].dataOption = allOptions[i].staticOption.dataOption;
		rebulidElementFun(item, i, type);
		element = null;
	}
}
function rebulidElementFun(item, i, type) {
	var className = $("#" + item.id).attr("class");
	if (type == "echarts2" || type == "echarts" || type == "heightcharts") {
		var Box = $("#" + item.id).parent();
		$("#" + item.id).remove();
		if (item.chart != undefined || item.chart != null) {
			item.chart.dispose();
			item.chart = null;
		}
		clearInterval(item.timer);
		var element = $('<div class="' + className + '" id="' + item.id + '" style="width:100%;height:100%;"></div>').appendTo(Box)
		if (className == "yl1") {
			TBSC(allOptions[i], item.id, element, YucanvasArray[i]);
		} else {
			TBSC(allOptions[i], item.id, element, canvasArray[i]);
		}
		newNum = 0;
	} else if(type == "component") {
		var staticType = allOptions[i].staticOption.staticType;		
		if (staticType == "countUp") {
			var num;
			if (allOptions[i].dataOption != undefined) {
				num = allOptions[i].dataOption.series[0].subtextStyle.name;
			} else {
				num = Math.random() * 1000 + 1;
			}
			if (className == "yl1") {
				YucanvasArray[i].countUp.update(num);
			} else {
				canvasArray[i].countUp.update(num);
			}
		} else if (staticType == "statistic") {
			var Box = $("#" + item.id).parent();
			$("#" + item.id).remove();
			clearInterval(item.timer);
			var element = $('<div class="' + className + '" id="' + item.id + '" style="width:100%;height:100%;"></div>').appendTo(Box)
			if (className == "yl1") {
				statisticFun(allOptions[i], item.id, element, YucanvasArray[i]);
			} else {
				statisticFun(allOptions[i], item.id, element, canvasArray[i]);
			}
		}
	}

}
