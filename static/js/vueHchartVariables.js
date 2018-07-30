// 图表区
function Hchart(athis, ochartOption){
    var depth = haveValue(ochartOption, "chart.options3d.depth", "number");
    depth = depth == null ? 100 : depth;
    var alpha = haveValue(ochartOption, "chart.options3d.alpha", "number") || 0;
    var beta = haveValue(ochartOption, "chart.options3d.beta", "number") || 0;
    var borderWidth = haveValue(ochartOption, "chart.animation", "number");
	borderWidth = borderWidth == null ? 0 : borderWidth;
	var borderRadius = haveValue(ochartOption, "chart.animation", "number");
	borderRadius = borderRadius == null ? 0 : borderRadius;

	athis.Hchart = {
        margin: haveValue(ochartOption, "chart.margin", "array", null),
		stacking: haveValue(ochartOption, "plotOptions.column.stacking", "string"),		
        depth: depth,
        alpha: alpha,
        alpha1: alpha,
        beta: beta,
        beta1: beta,
		backgroundColor: haveValue(ochartOption, "chart.backgroundColor", "string"),
		borderWidth: borderWidth,
		borderWidth1: borderWidth,
		borderRadius: borderRadius,
		borderRadius1: borderRadius,
		borderColor: haveValue(ochartOption, "chart.borderColor", "string"),	
	}
}
// 标题
function Htitle(athis, ochartOption){
	var fontSize =  haveValue(ochartOption, "title.style.fontSize", "number");
	fontSize = fontSize == null ? 18: fontSize;
	var margin = haveValue(ochartOption, "title.margin", "number");
	var subfontSize =  haveValue(ochartOption, "subtitle.style.fontSize", "number");
	subfontSize = subfontSize == null ? 12: subfontSize;
	athis.HtitleObj = {
		title: {
			Text: haveValue(ochartOption, "title.text", "string")|| "",
			margin: margin == null ? 15 : margin,
			align: haveValue(ochartOption, "title.align", "string")|| "center",
			verticalAlign: haveValue(ochartOption, "title.verticalAlign", "string") || "",
			x: haveValue(ochartOption, "title.x", "number") || 0,
			y: haveValue(ochartOption, "title.y", "number"),
			fontFamily: haveValue(ochartOption, "title.style.fontFamily", "string") || "",
			color: haveValue(ochartOption, "title.style.color", "string"),
			fontSize: fontSize,
			fontSize1: fontSize,
			fontSytle: haveValue(ochartOption, "title.style.fontSytle：", "string") || "normal",
			fontWeight: haveValue(ochartOption, "title.style.fontWeight", "string") || "normal"
		},
		subtitle: {
			Text: haveValue(ochartOption, "subtitle.text", "string")|| "",
			align: haveValue(ochartOption, "subtitle.align", "string")|| "center",
			verticalAlign: haveValue(ochartOption, "subtitle.verticalAlign", "string") || "",
			x: haveValue(ochartOption, "subtitle.x", "number") || 0,
			y: haveValue(ochartOption, "subtitle.y", "number"),
			fontFamily: haveValue(ochartOption, "subtitle.style.fontFamily", "string") || "",
			color: haveValue(ochartOption, "subtitle.style.color", "string"),
			fontSize: subfontSize,
			fontSize1: subfontSize,
			fontSytle: haveValue(ochartOption, "subtitle.style.fontSytle：", "string") || "normal",
			fontWeight: haveValue(ochartOption, "subtitle.style.fontWeight", "string") || "normal"
		}
	}
}
// 
function Hseries(athis, ochartOption, type){
	if(type != "pie"){
		var HseriesList = [];
		ochartOption.series.forEach(function(item, i){
			HseriesList.push({name:"系列"+(i+1)});
		});
		var HseriesIndex = haveValue(ochartOption, "HseriesIndex", "number") || 0;
		athis.HseriesIndex = HseriesIndex;  HseriesDataList=[];
		var color = haveValue(ochartOption, "series."+HseriesIndex+".color", "string");
	}else{
		var HseriesDataList=[];
		var HseriesDataIndex = haveValue(ochartOption, "HseriesDataIndex", "number") || 0;		
		ochartOption.series[0].data.forEach(function(item, i){
			HseriesDataList.push({name:"元素"+(i+1)});
		});
		athis.HseriesDataIndex = HseriesDataIndex; 	
		var color = haveValue(ochartOption, "series.0.data."+HseriesDataIndex+".color", "string");	
	}
	var fontSize = haveValue(ochartOption, "series."+HseriesIndex+".dataLabels.style.fontSize", "number") || 12;
	var borderWidth = haveValue(ochartOption, "series."+HseriesIndex+".dataLabels.borderWidth", "number") || 0;
	var borderRadius = haveValue(ochartOption, "series."+HseriesIndex+".dataLabels.borderRadius", "number") || 0;
	var innerSize = haveValue(ochartOption, "series."+HseriesIndex+".innerSize", "number") || 0;
	var size = haveValue(ochartOption, "series."+HseriesIndex+".size", "number");
	size = size == null ? 100 : size;	
	var slicedOffset = haveValue(ochartOption, "series."+HseriesIndex+".slicedOffset", "number");
	slicedOffset = slicedOffset == null ? 10 : slicedOffset;
	athis.HseriesObj = {
		HseriesList: HseriesList,
		HseriesDataList: HseriesDataList,
		allowPointSelect: haveValue(ochartOption, "series."+HseriesIndex+".allowPointSelect", "boolean") || false,
		enabled: haveValue(ochartOption, "series."+HseriesIndex+".dataLabels.enabled", "boolean") || false,
		stack: haveValue(ochartOption, "series."+HseriesIndex+".stack", "string"),
		color: color,
		format: haveValue(ochartOption, "series."+HseriesIndex+".format", "string"),
		align: haveValue(ochartOption, "series."+HseriesIndex+".align", "string") || "center",
		x: haveValue(ochartOption, "series."+HseriesIndex+".x", "number"),
		y: haveValue(ochartOption, "series."+HseriesIndex+".y", "number"),
		fontFamily: haveValue(ochartOption, "series."+HseriesIndex+".dataLabels.style.fontFamily", "string"), 
		Fcolor: haveValue(ochartOption, "series."+HseriesIndex+".dataLabels.style.color", "string"), 
		fontSize: fontSize,
		fontSize1: fontSize,
		fontSytle: haveValue(ochartOption, "series."+HseriesIndex+".dataLabels.style.fontSytle", "string") || "normal", 
		fontWeight: haveValue(ochartOption, "series."+HseriesIndex+".dataLabels.style.fontWeight", "string") || "normal", 
		backgroundColor: haveValue(ochartOption, "series."+HseriesIndex+".dataLabels.backgroundColor", "string"), 
		borderWidth: borderWidth,
		borderWidth1: borderWidth,
		borderRadius: borderRadius,
		borderRadius1: borderRadius,
		innerSize: innerSize,
		innerSize1: innerSize,
		size: size,
		size1: size,
		slicedOffset: slicedOffset,	
		borderColor: haveValue(ochartOption, "series."+HseriesIndex+".dataLabelstyle.borderColor", "string"), 
	}
}
// 直角坐标系
function Hrectangular(athis, ochartOption){
	var id = haveValue(ochartOption, "HTabsAxis", "string") || "HxAxis";
	tabsSelected(id, "Hrectangular");
	if(id == "HxAxis"){
		HrectangularFun("HxAxisObj", "xAxis");
	}else if(id == "HyAxis"){
		HrectangularFun("HyAxisObj", "yAxis");
	}else{
		HrectangularFun("HzAxisObj", "zAxis");
	}
	function HrectangularFun(type, atype){
		var visible = haveValue(ochartOption, atype+".visible", "boolean");
		visible = visible == null ? true : visible;
		var reversed = haveValue(ochartOption, atype+".reversed", "boolean") || false;
		var allowDecimals = haveValue(ochartOption, atype+".allowDecimals", "boolean");
		allowDecimals = allowDecimals == null ? true : allowDecimals;
		var enabled = haveValue(ochartOption, atype+".labels.enabled", "boolean");
		enabled = enabled == null ? true : enabled;
		var fontSize = haveValue(ochartOption, atype+".labels.fontSize", "number") || 12;
		var Trotation = haveValue(ochartOption, atype+".title.rotation", "number") || 0;
		var TfontSize = haveValue(ochartOption, atype+".title.fontSize", "number") || 12;
		var gridLineWidth = haveValue(ochartOption, atype+".gridLineWidth", "number");
		gridLineWidth = gridLineWidth == null ? 1 : gridLineWidth;
		athis[type] = {
			visible: visible,
			reversed: reversed,
			allowDecimals: allowDecimals,
			xAxisStyle: haveValue(ochartOption, atype+".xAxisStyle", "string"),
			enabled: enabled,
			format: haveValue(ochartOption, atype+".labels.format", "string"),
			align:  haveValue(ochartOption, atype+".labels.align", "string") || "center",
			x: haveValue(ochartOption, atype+".labels.x", "number"),
			y: haveValue(ochartOption, atype+".labels.y", "number"),
			fontFamily: haveValue(ochartOption, atype+".labels.fontFamily", "string"),
			color: haveValue(ochartOption, atype+".labels.color", "string"),
			fontSize: fontSize,
			fontSize1: fontSize,
			fontSytle: haveValue(ochartOption, atype+".labels.fontSytle", "string") || "normal",
			fontWeight: haveValue(ochartOption, atype+".labels.fontWeight", "string") || "normal",
			Ttext: haveValue(ochartOption, atype+".title.text", "string"),
			Talign: haveValue(ochartOption, atype+".title.align", "string") || "middle",
			Tx: haveValue(ochartOption, atype+".title.x", "number"),
			Ty: haveValue(ochartOption, atype+".title.y", "number"),
			Trotation: Trotation,
			Trotation1: Trotation,
			TfontFamily: haveValue(ochartOption, atype+".title.fontFamily", "string"),
			Tcolor: haveValue(ochartOption, atype+".title.color", "string"),
			TfontSize: TfontSize,
			TfontSize1: TfontSize,
			TfontSytle: haveValue(ochartOption, atype+".title.fontSytle", "string") || "normal",
			TfontWeight: haveValue(ochartOption, atype+".title.fontWeight", "string") || "normal",
			gridLineWidth: gridLineWidth,
			gridLineWidth1: gridLineWidth,
			gridLineColor: haveValue(ochartOption, atype+".gridLineColor", "string"),
			gridLineDashStyle: haveValue(ochartOption, atype+".gridLineDashStyle", "string") || "Solid",
		};
	
	}
}
// 图例
function Hlegend(athis, ochartOption){
	var enabled = haveValue(ochartOption, "legend.enabled", "boolean");
	var floating = haveValue(ochartOption, "legend.floating", "boolean");
	var rtl = haveValue(ochartOption, "legend.rtl", "boolean");
	var reversed = haveValue(ochartOption, "legend.reversed", "boolean");
	var itemDistance = haveValue(ochartOption, "legend.itemDistance", "number");
	var padding = haveValue(ochartOption, "legend.padding", "number");
	padding = padding == null ? 8 : padding;
	var margin = haveValue(ochartOption, "legend.margin", "number");
	margin = margin == null ? 12 : margin;
	var fontSize = haveValue(ochartOption, "legend.style.fontSize", "number");
	fontSize = fontSize == null ? 12 : fontSize;
	var borderWidth = haveValue(ochartOption, "legend.animation", "number");
	borderWidth = borderWidth == null ? 0 : borderWidth;
	var borderRadius = haveValue(ochartOption, "legend.animation", "number");
	borderRadius = borderRadius == null ? 0 : borderRadius;
	athis.HlegendObj = {
		enabled: enabled == null ? true : enabled,
		floating: floating == null ? false : floating,
		reversed: reversed == null ? false : reversed,
		rtl: rtl == null ? false : rtl,
		align: haveValue(ochartOption, "legend.align", "string")|| "center",
		verticalAlign: haveValue(ochartOption, "legend.verticalAlign", "string") || "bottom",
		x: haveValue(ochartOption, "legend.x", "number") || 0,
		y: haveValue(ochartOption, "legend.y", "number") || 0,
		layout: haveValue(ochartOption, "legend.layout", "string") || "horizontal",
		itemDistance: itemDistance == null ? 20 : itemDistance,
		margin: margin,
		padding: padding,
		valueDecimals: haveValue(ochartOption, "legend.valueDecimals", "number"),
		legendName: haveValue(ochartOption, "legend.legendName", "string") || "",
		fontFamily: haveValue(ochartOption, "legend.style.fontFamily", "string") || "",
		color: haveValue(ochartOption, "legend.style.color", "string"),
		fontSize: fontSize,
		fontSize1: fontSize,
		fontSytle: haveValue(ochartOption, "legend.style.fontSytle", "string") || "normal",
		fontWeight: haveValue(ochartOption, "legend.style.fontWeight", "string") || "bold",
		backgroundColor: haveValue(ochartOption, "legend.backgroundColor", "string"),
		borderWidth: borderWidth,
		borderWidth1: borderWidth,
		borderRadius: borderRadius,
		borderRadius1: borderRadius,
		borderColor: haveValue(ochartOption, "legend.borderColor", "string"),	
	}
}
// 提示
function Htooltip(athis, ochartOption){
	var enabled = haveValue(ochartOption, "tooltip.enabled", "boolean");
	var animation = haveValue(ochartOption, "tooltip.animation", "boolean");
	var padding = haveValue(ochartOption, "tooltip.padding", "number");
	padding = padding == null ? 8 : padding;
	var fontSize = haveValue(ochartOption, "tooltip.style.fontSize", "number");
	fontSize = fontSize == null ? 12 : fontSize;
	var borderWidth = haveValue(ochartOption, "tooltip.animation", "number");
	borderWidth = borderWidth == null ? 1 : borderWidth;
	var borderRadius = haveValue(ochartOption, "tooltip.animation", "number");
	borderRadius = borderRadius == null ? 3 : borderRadius;
	athis.HtooltipObj = {
		enabled: enabled == null ? true : enabled,
		animation: animation == animation ? true : animation,
		followPointer: haveValue(ochartOption, "tooltip.followPointer", "boolean") || false,
		padding: padding,
		valueDecimals: haveValue(ochartOption, "tooltip.valueDecimals", "number"),
		Tname: haveValue(ochartOption, "tooltip.Tname", "string") || "",
		fontFamily: haveValue(ochartOption, "tooltip.style.fontFamily", "string") || "",
		color: haveValue(ochartOption, "tooltip.style.color", "string"),
		fontSize: fontSize,
		fontSize1: fontSize,
		fontSytle: haveValue(ochartOption, "tooltip.style.fontSytle", "string") || "normal",
		fontWeight: haveValue(ochartOption, "tooltip.style.fontWeight", "string") || "normal",
		backgroundColor: haveValue(ochartOption, "tooltip.backgroundColor", "string"),
		borderWidth: borderWidth,
		borderWidth1: borderWidth,
		borderRadius: borderRadius,
		borderRadius1: borderRadius,
		borderColor: haveValue(ochartOption, "tooltip.borderColor", "string"),
		
	}	
}