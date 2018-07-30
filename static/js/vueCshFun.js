//弹出页面初始化
function popupPage(){
	selContent = new Vue({
		el: '#shujuSelect',
		data: function() {
			return {
				shaixuanType:"create",
				name:"",
				chartId:"",
				chartList:[],
				datasource:"",
				wdsId:"",
				wdsList:[],
				otherChartList:[],
				fieldType: "",
				qdtList:[],
				acquiescence:"",
				dateType:"single",
				date:"",
				daterange:"",
				datetimerType:"datetime",
				videoType:"create",
				videoSrc:"",
				videoList:[],
				audioType:"create",
				audioList:[],
				imgType:"create",
				imgSrc:"",
				imgList:[],
				monitoringType:"create",
				hlsSrc:"",
				rtmpSrc:"",
			}
		},
		methods: {
			bouncedHide: function(){
				if(thisData != undefined){
					thisData.isActive = false;
				}
				this.videoSrc = "";
				$('#shujuSelect').removeClass("shujuSelect");
			},
			// 筛选
			inputName: function(val, DataType, atype){
				SXname = val;
				SXcsh.name = val;
			},
			chartChangeFun: function(val){
				if(val != SXcsh.filterOption.componentId){
					var athis = this;
					SXcsh.filterOption.componentId = val;
					chartList.forEach(function(item, i){
						if(item.id == val){
							var wdsId = item.wds[0].id;
							var j = item.index;
							//请求数据
							var qdDesignChildren={
									dbsrcId:allOptions[j].dbsrcId,
									tableId:allOptions[j].tableId,
									sourceType:allOptions[j].sourceType,
									measures:allOptions[j].measures,
									dims:wdsId
								};
							qdt= getDataFromAjax(ctx+"/qd/qdDesign/getScreen",qdDesignChildren);
							var qdtList = shuzuBJ(wdsId, qdt);
							SXcsh.type = item.wds[0].fieldType;
							var oindex=getIndexFromArr('componentId',SXcsh.qdFilterChilrdenList,val);
							var robj=getObjFromArr('componentId',SXcsh.qdFilterChilrdenList,val);
							//开始替换位置
							var temp = SXcsh.qdFilterChilrdenList[0];
							temp.remarks = true;
							SXcsh.qdFilterChilrdenList[0] = robj;
							temp.wdId='';
							SXcsh.qdFilterChilrdenList[oindex] = temp;
							SXcsh.qdFilterChilrdenList[0].wdId=wdsId;
							SXcsh.qdFilterChilrdenList[0].orderBy="0";
							SXcsh.qdFilterChilrdenList[oindex].orderBy=oindex;
							SXcsh.filterOption.filterCondition = qdtList;
							SXcsh.filterOption.wdId = wdsId;
							SXcsh.absValue="";
							SXcsh.absDefault=0;
							SXcsh.beginDate="";
							SXcsh.endDate="";
							SXcsh.tempValue1="";
							SXcsh.tempValue2="";
							var otherChartList = copyAndClear(chartList);
							otherChartList.splice(i,1);
							athis.wdsId = wdsId;
							athis.wdsList = item.wds;
							athis.datasource = item.datasource;
							athis.qdtList = qdtList;
							athis.otherChartList = otherChartList;
						}
					});
					dateShowFun();
					this.fieldType = SXcsh.type;
					if(SXcsh.type == "date"){
						this.dateType = "single";
					}
					this.acquiescence = "";
				}
				
			},
			wdsChangeFun: function(val){
				if(val != SXcsh.qdFilterChilrdenList[0].wdId){
					var chartId = this.chartId
					var athis = this;
					SXcsh.filterOption.wdId = val;
					chartList.forEach(function(item, i){
						if(item.id == chartId){
							var j = item.index;
							//请求数据
							var qdDesignChildren={
									dbsrcId:allOptions[j].dbsrcId,
									tableId:allOptions[j].tableId,
									sourceType:allOptions[j].sourceType,
									measures:allOptions[j].measures,
									dims:val
								};
							qdt= getDataFromAjax(ctx+"/qd/qdDesign/getScreen",qdDesignChildren);
							var qdtList = shuzuBJ(val, qdt);
							SXcsh.filterOption.filterCondition = qdtList;
							SXcsh.qdFilterChilrdenList[0].wdId = val;
							item.wds.forEach(function(item, i){
								if(item.id == val){
									SXcsh.type = item.fieldType;
								}
							});
							SXcsh.absValue="";
							SXcsh.beginDate="";
							SXcsh.endDate="";
							SXcsh.tempValue1="";
							SXcsh.tempValue2="";
							athis.qdtList = qdtList;
						}
					});
					dateShowFun();
					this.fieldType = SXcsh.type;
					this.acquiescence = "";
				}
			},
			otherWdsChangeFun: function(val, i){
				SXcsh.qdFilterChilrdenList[i+1].wdId = val;
				SXcsh.qdFilterChilrdenList[i+1].remarks = true;
			},
			radioFun: function(val){
				if(val != SXcsh.type){
					SXcsh.type = val;
					this.acquiescence = "";
				}
				if(val == "text"){
					$("#textInput").show();
					$("#selectInput").hide();
				}else{
					$("#textInput").hide();
					$("#selectInput").show();
				}
			},
			acquiescenceFun: function(val){
				if(val != SXcsh.absValu){
					SXcsh.absValue = val;
					SXcsh.tempValue1 = val;
				}
			},
			dateTypeFun: function(val){
				if(val != SXcsh.dateType){
					this.date = "";
					this.daterange = "";
					if(val == "range"){
						SXcsh.dateType = "range";
						if(datePickerType == "tinePicker"){
							$("#timerange").show();
							$("#timesingle").hide();
						}else if(datePickerType == "datePicker"){
							$("#daterange").show();
							$("#datesingle").hide();
						}else{
							$("#datetimerange").show();
							$("#datetimesingle").hide();
						}
					}else{
						if(datePickerType == "tinePicker"){
							$("#timesingle").show();
							$("#timerange").hide();
						}else if(datePickerType == "datePicker"){
							$("#datesingle").show();
							$("#daterange").hide();
						}else{
							$("#datetimesingle").show();
							$("#datetimerange").hide();
						}
					}
				}
				
			},
			dateFun: function(val){
				if(val != undefined  && val != ""){
					dateFormatFun(val)
					var cval = dateFormat(datePickerType);
					SXcsh.absValue = cval;
					SXcsh.tempValue1 = cval;
				}else{
					SXcsh.absValue = "";
					SXcsh.beginDate = "";
					SXcsh.endDate = "";
					SXcsh.tempValue1 = "";
					SXcsh.tempValue2 = "";
				}
			},
			dateRangeFun: function(val){
				if(val != undefined){
					if(val[0] != "" && val[0] != null){
						dateFormatFun(val[0]);
						var aval = dateFormat();
						dateFormatFun(val[1]);
						var bval = dateFormat(datePickerType);
						SXcsh.beginDate = aval;
						SXcsh.endDate = bval;
						SXcsh.tempValue1 = aval;
						SXcsh.tempValue2 = bval;
					}else{
						SXcsh.absValue = "";
						SXcsh.beginDate = "";
						SXcsh.endDate = "";
						SXcsh.tempValue1 = "";
						SXcsh.tempValue2 = "";
					}
				}
			},
			bottomClick: function(){
				$('.shujuSelect').removeClass("shujuSelect");
				if(this.shaixuanType == "create"){
					SXcreate()
				}else{
					SXeditor()
				}			
			},
			initialValue: function(option){
				this.shaixuanType = option.shaixuanType;
				this.name = option.SXname;
				this.chartId = option.chartId;
				this.chartList = option.chartList;
				this.wdsId = option.wdsId;
				this.wdsList = option.wdsList;
				this.datasource = option.datasource;
				this.otherChartList = option.otherChartList;
				this.fieldType = option.fieldType;
				this.qdtList = option.qdtList;
				this.acquiescence = option.acquiescence;
				this.date = option.date;
				this.daterange = option.daterange;
				this.dateType = option.dateType;
				if(option.fieldType == "text"){
					$("#textInput").show();
					$("#selectInput").hide();
				}else{
					$("#textInput").hide();
					$("#selectInput").show();
				}
			},
			// 删除
			delFun(type, data){
				var _this = this;
				var title;
				if(type == "video"){
					title = '确认删除该视频吗?';
				}else  if(type == "audio"){
					title = '确认删除该音频吗?'
				}else{
					title = '确认删除该图片吗?'
				}
				 top.layer.confirm(title, {icon: 3, title:'系统提示'},function(index){
						submitData(ctx+"/qd/media/tbMedia/del",{"id":data.id},function(){
							if(type == "video"){
								_this.videoInitialValue();
							}else if(type == "audio"){
								_this.audioInitialValue();
							}else{
								_this.imgInitialValue();
							}
							top.layer.close(index);
						}); 
				 }); 
			},
			// 图片
			imgFun: function(val){
				this.imgList.forEach(function(item, i){
					item.isActive = false;
				});
				val.isActive = true;
				this.imgSrc = val.imgSrc;
			},
			imgClickFun: function(){
				var src = this.imgSrc;
				if(this.imgType == "create"){
					imgCreate(src);					
				}else{
					imgEditor(src);
				}
			},
			imgInitialValue: function(type){
				var imgList=[];
				var imgArr = getDataFromAjax(ctx+"/qd/media/tbMedia/findListImg") || [];
				imgArr.forEach(function(item, i){
					imgList.push({
						id: item.id,
						title: item.title,
						src: srcSwitch(item.path),
						imgSrc: item.path,
						isActive:false
					});
				});
				this.imgList = imgList;
				if(type){
					this.imgType = type;
				}
			},
			// 视频
			videoHrefFun: function(val){
				if(val.indexOf("://") > -1){
					val = val.split("://")[1];
				}
				this.href = val;
				videoHref = "http://"+val
			},
			videoFun1: function(data) {
				if(thisData != undefined){
					thisData.isActive = false;
				}
			},
			videoFun: function(data) {
				this.videoSrc="";
				if(thisData != undefined){
					thisData.isActive = false;
				}
				if(data != undefined){
					data.isActive = true;
					videoHref = data.videoSrc;
					thisData = data;
				}else{
					videoHref = "";
				}
			},
			videoClickFun: function() {
				this.videoSrc="";
				if(thisData != undefined){
					thisData.isActive = false;
				}
				if(this.videoType == "create"){
					videoCreate();					
				}else{
					videoEditor();
				}
			},
			videoSrcFun: function(val, type){
				if(val.indexOf("://") > -1){
					val = val.split("://")[1];
				}
				this[type] = val;		
			},
			videoInitialValue: function(type){
				var videoList=[];
				var videoArr = getDataFromAjax(ctx+"/qd/media/tbMedia/findListMedia");
				videoArr.forEach(function(item, i){
					videoList.push({
						name: item.title,
						id: item.id,
						imgSrc: ctxStatic+"/design/image/video.png",
						videoSrc: item.path,
						isActive:false
					});
				});
				this.videoList = videoList;
				if(type){
					this.videoType = type;
				}
			},
			// 音频
			audioFun: function(val){
				if(val.isActive){
					val.isActive = false;
				}else{
					val.isActive = true;
				}
			},
			audioClickFun: function(){
				var  songList = [];
				this.audioList.forEach(function(item, i){
					if(item.isActive){
						songList.push(item);
					}
				});
				if(this.audioType == "create"){
					audioCreate(songList);					
				}else{
					audioEditor(songList)
				}
			},
			audioInitialValue: function(type){
				var audioList=[];
				var audioArr = getDataFromAjax(ctx+"/qd/media/tbMedia/findListAudio") || [];
				audioArr.forEach(function(item, i){
					audioList.push({
						title: item.title,
						id: item.id,
						cover: "/static/design/image/audio.png",
						imgSrc: ctxStatic+"/design/image/audio.png",
						src: item.path,
						isActive:false
					});
				});
				this.audioList = audioList;
				if(type){
					this.audioType = type;
				}
			},
			// 监控
			monitoringInitialValue: function(val){
				this.monitoringType = val;
				this.hlsSrc = "";
				this.rtmpSrc = "";
			},
			monitoringclickFun: function(){
				var hlsSrc = this.hlsSrc;
				var rtmpSrc = this.rtmpSrc;
				if(this.monitoringType == "create"){
					monitoringCreate(hlsSrc, rtmpSrc);				
				}else{
					monitoringEditor(hlsSrc, rtmpSrc);
				}
			}
		},
	});
}
// 数据编辑
var yuanArray = [], biaoArray=[], wds=[], dimsList=[], measList=[], seldimsList=[], selmeasList=[], dataEditor, dataEditorComp, dbsrcId, tableId, sourceType;
var yuanArray = getDataFromAjax(ctx+"/qd/qdDimMeasureFields/source");
dataEditor = new Vue({
	el: "#chartEditor",
	data: function (){
		return {
			chartOptionList: chartOptionList,
			dbsrcId: "",
			yuanArray: yuanArray,
			tableId: "",
			biaoArray: biaoArray,
			dimsList: dimsList,
			measList: measList,
			seldimsList: seldimsList,
			selmeasList: selmeasList,
		}
	},
	methods: {
		yuanGet: function(val){
			yuanArray.forEach(function(item, i){
				if(item.id == val){
					dbsrcId = val;
					sourceType = item.type;
					biaoArray = getDataFromAjax(ctx+"/qd/qdDimMeasureFields/getTable", {
						qdDatasourceId : val,
						type: sourceType
					});
				}
			})
			this.tableId = "";
			this.biaoArray = biaoArray;
			dimsList = [];
			measList = [];
			seldimsList = [];
			selmeasList = [];
			this.dimsList = dimsList;
			this.measList = measList;
			this.seldimsList = seldimsList;
			this.selmeasList = selmeasList;
//			var Box = $("#"+sxID).parent();	
//			$("#"+sxID).remove();
//			$('<div class="element" id="'+sxID+'"></div>').appendTo(Box);	
		},
		biaoGet: function(val){
			var yuan = this.yuan;
			dimsList = [];
			measList = [];
			seldimsList = [];
			selmeasList = [];
			biaoArray.forEach(function(item, i){
				if(item.id == val){
					tableId = val;
					wds = getDataFromAjax(ctx+"/qd/qdDimMeasureFields/getWD", {
						qdDatasourceId : dbsrcId,
						tableId : val,
						type : sourceType
					});
					wds.forEach(function(item, index) {
						if (item.type == "1") {
							dimsList.push(item);
						} else {
							measList.push(item);
						}
					})
				}
			});
			this.dimsList = dimsList;
			this.measList = measList;
			this.seldimsList = seldimsList;
			this.selmeasList = selmeasList;
//			var Box = $("#"+sxID).parent();				
//			$("#"+sxID).remove();
//			$('<div class="element" id="'+sxID+'"></div>').appendTo(Box);	
		},
		dimChangeFun(event){
			$(event.target).clone().addClass("clone").appendTo($(".editorBox"));
			clonePosition();
		},
		dimRemove(val, type){
			if(type == 1){
				arrayDelete(seldimsList);
			}else{
				arrayDelete(selmeasList);
			}
			requestNewData();				
			function arrayDelete(list){
				var have = true;
				list.forEach(function(item, i){
					if(item.id == val){
						list.splice(i, 1);
					}
				});
			}
		},
		chartSwitch(StaticOption){
			if(StaticOption.isActive){
				if(StaticOption.staticType != selectedOption.staticType){
					var dataOption = copyAndClear(StaticOption.dataOption);
					var chartOption = copyAndClear(StaticOption.option);
					selectedOption.type = StaticOption.type;	
					selectedOption.chartName = StaticOption.name;	
					selectedOption.chartType = StaticOption.chartType;
					selectedOption.staticType = StaticOption.staticType;
					selectedOption.staticOption.wdType = StaticOption.wdType;
					selectedOption.staticOption.dimType = StaticOption.dimType;
					selectedOption.staticOption.meaType = StaticOption.meaType;
					selectedOption.staticOption.staticType = StaticOption.staticType;
					selectedOption.staticOption.chartOption = chartOption;
					selectedOption.staticOption.dataOption = dataOption;
					requestNewData();
				}
			}
		},
		initialValue(oitem){
			dbsrcId = oitem.dbsrcId;
			sourceType = oitem.sourceType;
			tableId = oitem.tableId;
			seldimsList = [], selmeasList = [], dimsList = [], measList = [];				
			biaoArray =  getDataFromAjax(ctx+"/qd/qdDimMeasureFields/getTable", {
				qdDatasourceId: dbsrcId,
				type: sourceType
			});
			biaoArray.forEach(function(item, i){
				if(item.id == oitem.tableId){
					wds = getDataFromAjax(ctx+"/qd/qdDimMeasureFields/getWD", {
						qdDatasourceId : dbsrcId,
						tableId : tableId,
						type : sourceType
					});
					wds.forEach(function(item, index) {
						if (item.type == "1") {
							dimsList.push(item);
						} else {
							measList.push(item);
						}
					})
				}
			});
			seldimsFun(oitem.dims, seldimsList, dimsList);
			seldimsFun(oitem.measures, selmeasList, measList);
			function seldimsFun(data, newList, allList){
				var list;
				if (data == "" || data == null) {
					list = new Array;
				} else {
					list = data.split(',');
				}
				list.forEach(function(item, i){
					allList.forEach(function(oitem, o){
						if(item == oitem.id){
							newList.push(oitem);
						}
					})
				})
			}
			this.dbsrcId = oitem.dbsrcId;				
			this.biaoArray = biaoArray;
			this.tableId = oitem.tableId;
			this.dimsList = dimsList;
			this.measList = measList;
			this.seldimsList = seldimsList;
			this.selmeasList = selmeasList;
			var dimType = oitem.staticOption.dimType;
			var meaType = oitem.staticOption.meaType;
			var Dlen = seldimsList.length;
			var Mlen = selmeasList.length;
			chartTypeChangeFun(dimType, meaType, Dlen, Mlen);
			chartSelectdeFun(oitem);
			this.chartOptionList = chartOptionList;
		}
	}
});
dataEditorComp = new Vue({
	el: "#compEditor",
	data: function (){
		return {
			chartOptionList: chartOptionList,
			dbsrcId: "",
			yuanArray: yuanArray,
			tableId: "",
			biaoArray: biaoArray,
			dimsList: dimsList,
			measList: measList,
			seldimsList: seldimsList,
			selmeasList: selmeasList,
		}
	},
	methods: {
		yuanGet: function(val){
			yuanArray.forEach(function(item, i){
				if(item.id == val){
					dbsrcId = val;
					sourceType = item.type;
					biaoArray = getDataFromAjax(ctx+"/qd/qdDimMeasureFields/getTable", {
						qdDatasourceId : val,
						type: sourceType
					});
				}
			})
			this.tableId = "";
			this.biaoArray = biaoArray;
			dimsList = [];
			measList = [];
			seldimsList = [];
			selmeasList = [];
			this.dimsList = dimsList;
			this.measList = measList;
			this.seldimsList = seldimsList;
			this.selmeasList = selmeasList;
//			var Box = $("#"+sxID).parent();	
//			$("#"+sxID).remove();
//			$('<div class="element" id="'+sxID+'"></div>').appendTo(Box);	
		},
		biaoGet: function(val){
			var yuan = this.yuan;
			dimsList = [];
			measList = [];
			seldimsList = [];
			selmeasList = [];
			biaoArray.forEach(function(item, i){
				if(item.id == val){
					tableId = val;
					wds = getDataFromAjax(ctx+"/qd/qdDimMeasureFields/getWD", {
						qdDatasourceId : dbsrcId,
						tableId : val,
						type : sourceType
					});
					wds.forEach(function(item, index) {
						if (item.type == "1") {
							dimsList.push(item);
						} else {
							measList.push(item);
						}
					})
				}
			});
			this.dimsList = dimsList;
			this.measList = measList;
			this.seldimsList = seldimsList;
			this.selmeasList = selmeasList;
//			var Box = $("#"+sxID).parent();				
//			$("#"+sxID).remove();
//			$('<div class="element" id="'+sxID+'"></div>').appendTo(Box);	
		},
		dimChangeFun(event){
			$(event.target).clone().addClass("clone").appendTo($(".editorBox"));
			clonePosition();
		},
		dimRemove(val, type){
			if(type == 1){
				arrayDelete(seldimsList);
			}else{
				arrayDelete(selmeasList);
			}
			requestNewData();				
			function arrayDelete(list){
				var have = true;
				list.forEach(function(item, i){
					if(item.id == val){
						list.splice(i, 1);
					}
				});
			}
		},
		chartSwitch(StaticOption){
			if(StaticOption.isActive){
				if(StaticOption.staticType != selectedOption.staticType){
					var dataOption = copyAndClear(StaticOption.dataOption);
					var chartOption = copyAndClear(StaticOption.option);
					selectedOption.type = StaticOption.type;	
					selectedOption.chartName = StaticOption.name;	
					selectedOption.chartType = StaticOption.chartType;
					selectedOption.staticType = StaticOption.staticType;
					selectedOption.staticOption.wdType = StaticOption.wdType;
					selectedOption.staticOption.dimType = StaticOption.dimType;
					selectedOption.staticOption.meaType = StaticOption.meaType;
					selectedOption.staticOption.staticType = StaticOption.staticType;
					selectedOption.staticOption.chartOption = chartOption;
					selectedOption.staticOption.dataOption = dataOption;
					requestNewData();
				}
			}
		},
		initialValue(oitem){
			dbsrcId = oitem.dbsrcId;
			sourceType = oitem.sourceType;
			tableId = oitem.tableId;
			seldimsList = [], selmeasList = [], dimsList = [], measList = [];				
			biaoArray =  getDataFromAjax(ctx+"/qd/qdDimMeasureFields/getTable", {
				qdDatasourceId: dbsrcId,
				type: sourceType
			});
			biaoArray.forEach(function(item, i){
				if(item.id == oitem.tableId){
					wds = getDataFromAjax(ctx+"/qd/qdDimMeasureFields/getWD", {
						qdDatasourceId : dbsrcId,
						tableId : tableId,
						type : sourceType
					});
					wds.forEach(function(item, index) {
						if (item.type == "1") {
							dimsList.push(item);
						} else {
							measList.push(item);
						}
					})
				}
			});
			seldimsFun(oitem.dims, seldimsList, dimsList);
			seldimsFun(oitem.measures, selmeasList, measList);
			function seldimsFun(data, newList, allList){
				var list;
				if (data == "" || data == null) {
					list = new Array;
				} else {
					list = data.split(',');
				}
				list.forEach(function(item, i){
					allList.forEach(function(oitem, o){
						if(item == oitem.id){
							newList.push(oitem);
						}
					})
				})
			}
			this.dbsrcId = oitem.dbsrcId;				
			this.biaoArray = biaoArray;
			this.tableId = oitem.tableId;
			this.dimsList = dimsList;
			this.measList = measList;
			this.seldimsList = seldimsList;
			this.selmeasList = selmeasList;
			var dimType = oitem.staticOption.dimType;
			var meaType = oitem.staticOption.meaType;
			var Dlen = seldimsList.length;
			var Mlen = selmeasList.length;
			chartTypeChangeFun(dimType, meaType, Dlen, Mlen);
			chartSelectdeFun(oitem);
			this.chartOptionList = chartOptionList;
		}
	}
});
var thisDom;
// 维度移动
$(document).bind("mousemove", function(event) {
	if($(".clone").length > 0){
		clonePosition()
		if(event.clientX>(innerWidth- 195) && event.clientX<(innerWidth- 22)){
			var dataType = $(".clone").attr("type");
			$(".newDims").hide();	
			if(event.clientY>155 && event.clientY<270){
				if(dataType == "1"){
					dimsPromptFun($(".variatSedeBox").eq(0));
					dimsPromptFun($(".variatSedeBox").eq(2));
				}
			}else if(event.clientY>300 && event.clientY<415){
				if(dataType == "2"){
					dimsPromptFun($(".variatSedeBox").eq(1));
					dimsPromptFun($(".variatSedeBox").eq(3));
				}
			}
		}else{
			$(".newDims").hide();
		}
		function dimsPromptFun(dom){
			dom.children(".newDims").show();
			dom.scrollTop(20000);	
		}
	}
});
// 维度创建
$(document).mouseup(function(event) {
	if($(".clone").length > 0){
		// debugger;
		if(event.clientX>(innerWidth- 195) || event.clientX>(innerWidth- 22) ){
			var dataType = $(".clone").attr("type");
			$(".newDims").hide();
			if(event.clientY>155 && event.clientY<270){
				if(dataType == "1"){
					wdChange();
				}
			}else if(event.clientY>300 && event.clientY<415){
				if(dataType == "2"){
					wdChange();
				}
			}
		}
		
		function wdChange(){
			var dimType = selectedOption.staticOption.dimType;
			var meaType = selectedOption.staticOption.meaType;
			var Dlen = seldimsList.length;
			var Mlen = selmeasList.length;
			if(dataType == "1"){
				wdChangeFun(dimType, Dlen, seldimsList);
			}else{
				wdChangeFun(meaType, Mlen, selmeasList);								
			}	
			function wdChangeFun(type, len, list){
				if(type[0] == "n"){
					arrayHeavy(list);
				}else{
					if(len < type[0]){
						arrayHeavy(list);
					}
				}
				function arrayHeavy(list){
					var id = $(".clone").attr("aid");
					wds.forEach(function(item,i){
						if(item.id == id){
							var have = true;
							list.forEach(function(item){
								if(item.id == id){
									have = false;
								}
							})
							if(have){
								list.push(item);
								requestNewData();
							}
						}
					});
				}
			}
		}
		$(".clone").remove();
	}
});
// 维度位置计算
function clonePosition(){
	var left = event.clientX  - innerWidth + 400;
	if(left < -120){
		$(".clone").hide();
	}else{
		$(".clone").show();
		$(".clone").css('left', left);
		$(".clone").css('top', event.clientY - 75);
	}
}
// 数据请求  重新加载
function requestNewData(){
	var dimType = selectedOption.staticOption.dimType;
	var meaType = selectedOption.staticOption.meaType;
	var Dlen = seldimsList.length;
	var Mlen = selmeasList.length;
	chartTypeChangeFun(dimType, meaType, Dlen, Mlen);
	chartSelectdeFun(selectedOption);	
	if (Dlen >= dimType[1] && Mlen >= meaType[1] && (Dlen + Mlen) > 0){
		var Box = $("#"+sxID).parent();
		$("#"+sxID).remove();
		$('<div class="element" id="'+sxID+'"></div>').appendTo(Box);
		canvasArray.forEach(function(item, i) {
			if (item.id == sxID) {
				if (item.chart != undefined || item.chart != null) {
					item.chart.dispose();
					item.chart = null;
				}
				var type = allOptions[i].type;
				var element = $("#"+sxID);
				var  dim = [], measures = [];
				seldimsList.forEach(function(item, i){
					dim.push(item.id)
				});
				selmeasList.forEach(function(item, i){
					measures.push(item.id)
				});
				allOptions[i].dbsrcId = dbsrcId;
				allOptions[i].sourceType = sourceType;				
				allOptions[i].tableId = tableId;
				allOptions[i].dims = dim.join();
				allOptions[i].measures = measures.join();
				var obj = {
					designId: getQueryString("id", window.location.href),
					dbsrcId: dbsrcId,
					sourceType: sourceType,
					tableId: tableId,
					dims: dim.join(),
					measures: measures.join(),
					chartType: allOptions[i].chartType,
					chartName: allOptions[i].staticOption.staticType,
					type: type,
					field: stringifyMore(wds)
				}
				var dataoption = getDataFromAjax(ctx+"/qd/qdDesign/getDataoption", {
					qdDesignChildren: stringifyMore(obj)
				});
				allOptions[i].dataOption = dataoption;
				if(type == "echarts2" || type == "echarts" || type == "heightcharts"){
					if(allOptions[i].staticOption.staticOption == "bar"){
						var tempVal = copyAndClear(dataoption.xAxis);
						dataoption.xAxis = dataoption.yAxis;
						dataoption.yAxis = tempVal;
					}
					if (allOptions[i].chartType == "GIS") {
						var length = dataoption.series.length;
						var lng = 0;
						var lat = 0;
						dataoption.series.forEach(function(item){
							lng += item[0];
							lat += item[1];
						});
						allOptions[i].staticOption.chartOption.center = [(lng/length).toFixed(6), (lat/length).toFixed(6)];
					}
					TBSC(allOptions[i], sxID, element, item);
				}else{
					var staticType = allOptions[i].staticOption.staticType;
					if(staticType == "countUp"){
						countUpFun(allOptions[i], sxID, element, item);
					}else if(staticType == "statistic"){
						statisticFun(allOptions[i], sxID, element, item);
					}else if(staticType == "marquee"){
						mQcreat(allOptions[i], element);
					}
				}
			}
		});
	}else if(Dlen == 0 && Mlen == 0){
		var Box = $("#"+sxID).parent();
		$("#"+sxID).remove();
		$('<div class="element" id="'+sxID+'"></div>').appendTo(Box);
		canvasArray.forEach(function(item, i) {
			if (item.id == sxID) {
				if (item.chart != undefined || item.chart != null) {
					item.chart.dispose();
					item.chart = null;
				}
				var type = allOptions[i].type;
				var element = $("#"+sxID);
				allOptions[i].dataOption = allOptions[i].staticOption.dataOption;
				if(type == "echarts2" || type == "echarts" || type == "heightcharts"){
					TBSC(allOptions[i], sxID, element, item);
				}
			}
		});
	}
}
// 可切换图表判断
function chartTypeChangeFun(dimType, meaType, Dlen, Mlen){
	chartOptionList.forEach(function(item, i){
		item.isActive = false;
		if((Dlen<=item.dimType[0]||item.dimType[0]=="n") && (Mlen<=item.meaType[0]||item.meaType[0]=="n")){
			item.isActive = true;
		}
	});
}
function chartSelectdeFun(option){
	var staticType = option.staticOption.staticType;
	chartOptionList.forEach(function(item, i){
		item.isSelected = false;
		if(staticType == item.staticType){
			item.isSelected = true;
		}
	});
}
/*************************数据筛选********************************/
//请求数据
var SXcsh = {};
function createFound(){
	NavHoverFun($(".hoverBox"));
	SXcsh = {
		"id": "",
		"isNewRecord": false,
		"remarks": null,
		"createDate": null,
		"updateDate": null,
		"designId": "",
		"type": "select",
		"dateType": "",
		"absDefault": 0,
		"absValue": "",
		"beginDate": "",
		"endDate": "",
		"name": "",
		"nameId": "",
		"tempValue1": "",
		"tempValue2": "",
		"filterOption": {},
		"qdFilterChilrdenList":[]
	}
	canFilterFun();
	var alen = chartList.length;
	if(alen > 0){
		bouncedHideFun();
		$('.selectBox').show();
		$('#shujuSelect').addClass("shujuSelect");		
		//请求数据
		var i = chartList[0].index;
		var qdDesignChildren={
			dbsrcId:allOptions[i].dbsrcId,
			tableId:allOptions[i].tableId,
			sourceType:allOptions[i].sourceType,
			measures:allOptions[i].measures,
			dims:allOptions[i].dims
		};
		qdt= getDataFromAjax(ctx+"/qd/test/getScreen", qdDesignChildren);
		var qdtList = shuzuBJ(chartList[0].wds[0].id, qdt);
		otherChartList = copyAndClear(chartList);
		otherChartList.splice(0,1)
		SXcsh.filterOption.componentId = chartList[0].id;
		SXcsh.filterOption.designId = getQueryString("id", window.location.href);
		SXcsh.filterOption.filterCondition = qdtList;
		SXcsh.type = chartList[0].wds[0].fieldType
		SXcsh.filterOption.wdId =  chartList[0].wds[0].id;
		SXcsh.qdFilterChilrdenList[0].wdId = chartList[0].wds[0].id;
		canFilterFun();
		initialeOption(0, "create");
	}else if(allOptions.length==0){
		top.layer.alert('请添加图表！')
	}else{
		top.layer.alert('图表需要先配置数据源信息！')
	}
}
function createInit(){
	bouncedHideFun();
	$('.selectBox').show();
	$('#shujuSelect').addClass("shujuSelect");		
	SXarr.forEach(function(item, i){
		if(item.nameId == sxID){
			allOptions.forEach(function(aitem, a){
				if(item.id == aitem.id){
					item.name = aitem.staticOption.title.name;
				}
			});
			SXcsh = item;
			canFilterFun();
			chartList.forEach(function(item, i){
				if(SXcsh.filterOption.componentId == item.id){
					otherChartList = copyAndClear(chartList);
					otherChartList.splice(i,1);
					otherChartList.forEach(function(item, i){
						item.wdsId = SXcsh.qdFilterChilrdenList[i+1].wdId;
					})
					initialeOption(i, "editor");
				}
			});
		
		}
	});
}
function canFilterFun(){
	var num=0;
	chartList = [];
	var blen = SXcsh.qdFilterChilrdenList.length;
	canvasArray.forEach(function(item, i){
		if(allOptions[i].dims != "" && allOptions[i].dims != undefined){
			wds = getDataFromAjax(ctx+"/qd/qdDimMeasureFields/getWD", {
			 	qdDatasourceId : allOptions[i].dbsrcId,
			 	tableId : allOptions[i].tableId,
			 	type : allOptions[i].sourceType
			});
			var wdsList = [];
			wds.forEach(function(items, index) {
				if (items.type == "1") {
					wdsList.push(items);
				}
			});
			var datasource= getDataFromAjax(ctx+"/qd/qdDimMeasureFields/datasource", {
				datasourceId : allOptions[i].dbsrcId,
				type : allOptions[i].sourceType
			});	
			if(blen ==  0){
				SXcsh.qdFilterChilrdenList.push({
					"componentId": allOptions[i].id,
					"type": "1",
					"wdId": "",
					"filterCondition": [],
					"orderBy": num+++""
				})
			}
			var obj = {
				id: allOptions[i].id,
				chartName: allOptions[i].chartName,
				datasource:datasource[0].name,
				wds:wdsList,
				wdsId: "",
				index: i
			};
			chartList.push(obj);
		}
	});
}
function initialeOption(i, type){
	var dateType = SXcsh.dateType;
	if(dateType == ""){
		dateType = "single";
	}
	var option = {
		shaixuanType: type,
		SXname: SXcsh.name,
		chartList: chartList,
		otherChartList: otherChartList,
		chartId: SXcsh.filterOption.componentId,
		wdsList: chartList[i].wds,
		wdsId: SXcsh.filterOption.wdId,
		fieldType: SXcsh.type,
		qdtList: SXcsh.filterOption.filterCondition,
		datasource: chartList[i].datasource,
		acquiescence:"",
		dateType:dateType,
		date:"",
		daterange:"",
	}
	dateShowFun();
	if(SXcsh.type == "date"){
		if(dateType == "range"){
			if(datePickerType == "dateTimePicker" || datePickerType == "datePicker"){
				option.daterange = [new Date(SXcsh.beginDate), new Date(SXcsh.endDate)];
			}else{
				option.daterange = [new Date("2017-01-01 " + SXcsh.beginDate), new Date("2017-01-01 " + SXcsh.endDate)];
			}
		}else{
			if(datePickerType == "dateTimePicker" || datePickerType == "datePicker"){
				if(SXcsh.absValue !=""){
					option.date = new Date(SXcsh.absValue);
				}
			}else{
				option.date = new Date("2017-01-01 " + SXcsh.absValue);
			}
		}
	}else{
		option.acquiescence = SXcsh.absValue;
	}
	selContent.initialValue(option);
}
function dateShowFun(){
	if(SXcsh.type == "date"){
		$('.section4').removeClass('hidden');
		$('.section3').addClass('hidden');
		$("#datetime").hide();
		$("#date").hide();
		$("#timePicker").hide();
		var dateType = SXcsh.dateType;
		var qdtOption = SXcsh.filterOption.filterCondition[0];
		if(qdtOption.indexOf("-") > -1 && qdtOption.indexOf(":") > -1){
			$("#datetime").show();
			datePickerType = "dateTimePicker";
			$("#datetimerange").hide();
			$("#datetimesingle").hide();
			if(dateType == "range"){
				$("#datetimerange").show();
			}else{
				$("#datetimesingle").show();
			}
		}else if(qdtOption.indexOf("-") > -1){
			$("#date").show();
			datePickerType = "datePicker";
			$("#daterange").hide();
			$("#datesingle").hide();
			if(dateType == "range"){
				$("#daterange").show();
			}else{
				$("#datesingle").show();
			}
		}else if(qdtOption.indexOf(":") > -1){
			$("#timePicker").show();
			datePickerType = "timePicker";
			$("#timerange").hide();
			$("#timesingle").hide();
			if(dateType == "range"){
				$("#timerange").show();
			}else{
				$("#timesingle").show();
			}
		}
		SXcsh.remarks = datePickerType;
	}else {
		$('.section3').removeClass('hidden');
		$('.section4').addClass('hidden');
	}
}