
// 通用
function general(athis, ochartOption, oitem, chartType, staticType){
	athis.generalObj = {
		boxId: "",
		allTabList: allTabList,
		top: oitem.staticOption.position.top/scale,
		left: oitem.staticOption.position.left,
		width: oitem.staticOption.boxSize.width,
		height: oitem.staticOption.boxSize.height/scale,
		refreshTime: ochartOption.refreshTime || 0,
		refreshTime1: ochartOption.refreshTime || 0,
		hrefList: hrefList,
		href: "",
		serlctHref: "",
		target: "",
		hrefChange: "",
		center: "",
		zoom:"",
		backgroundColor:"",
		gname:"",
		activeName:"ordinary",
		gradationBack:"",
		gradationbackground:"",
		gradation:"",
		mapTypes:"",
		mapStyle:""
	}
	if(chartType == "GIS"){
		athis.generalObj.center = haveValue(ochartOption, "center", "array", null);
		var zoom = haveValue(ochartOption, "zoom", "number");
		athis.generalObj.zoom = zoom;
		var mapTypes = haveValue(ochartOption, "mapTypes", "string");
		athis.generalObj.mapTypes = mapTypes;
		var mapStyle = haveValue(ochartOption, "mapStyle", "string");
		athis.generalObj.mapStyle = mapStyle;
	}else {
		if(staticType == "heatmap"){
			athis.generalObj.center = haveValue(ochartOption, "bmap.center", "array", null);
			var zoom = haveValue(ochartOption, "bmap.zoom", "number");
			athis.generalObj.zoom = zoom;
		}else{
			if(chartType == "text" || chartType == "table"){
				var backgroundColor = haveValue(ochartOption, "backgroundColor", "string");
				athis.generalObj.backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;
			}else{
				athis.generalObj.gname = haveValue(ochartOption, "gname", "string") || "";
				var activeName = haveValue(ochartOption, "activeName", "string") || "ordinary";
				athis.generalObj.activeName = activeName;
				if(activeName == "ordinary"){
					var backgroundColor = haveValue(ochartOption, "backgroundColor", "string");
					athis.generalObj.backgroundColor = backgroundColor == "transparent" ? "rgba(0,0,0,0)" : backgroundColor;
				}else{
					var gradationBack = haveValue(ochartOption, "backgroundColor", "object", 0, null, "color");
					athis.generalObj.gradationBack = gradationBack;
					var gradationbackground = haveValue(ochartOption, "backgroundColor", "object", 1, null, "color");
					athis.generalObj.gradationbackground = gradationbackground;
					athis.generalObj.gradation = haveValue(ochartOption, "backgroundColor", "object") || "linear";
				}
				var animation = haveValue(ochartOption, "animation", "boolean");
				var animationDuration = haveValue(ochartOption, "animationDuration", "number");
				animationDuration = animationDuration == null ? 1 : animationDuration/1000;
				var animationThreshold = haveValue(ochartOption, "animationThreshold", "number");
				animationThreshold = animationThreshold == null ? 2000 : animationThreshold;
				var animationEasing = haveValue(ochartOption, "series.animationEasing", "string") || "linear";
				athis.animationObj ={
					animation: animation==null ? true : animation,
					animationDuration: animationDuration,
					animationDuration1: animationDuration,
					animationThreshold: animationThreshold,
					animationThreshold1: animationThreshold,
					animationEasing: animationEasing,
					animationEasingList: animationEasingList
				}
			}
			athis.generalObj.target = haveValue(ochartOption, "target", "string") || "blank";
			athis.generalObj.hrefChange = haveValue(ochartOption, "hrefChange", "string") || "common";
			var href = ochartOption.href || "";
			if(href.indexOf("qd/qdDesign") > -1){
				athis.generalObj.serlctHref = href.split("/qd/qdDesign/view?id=")[1];
			}else{
				if(href.indexOf("://")>-1){
					href = href ? href.split("://")[1] : "";
				}
				athis.generalObj.href = href;
			}
		}
		
	}
}
// 标题
function title(athis, ochartOption){
	// 主标题
	var Link = haveValue(ochartOption, "title.link", "string");
	var textStyleColor = haveValue(ochartOption, "title.textStyle.color", "string") || haveValue(theme, "title.textStyle.color", "string") ||"#333333";
	var textStyleFontSize = haveValue(ochartOption, "title.textStyle.fontSize", "number");
	textStyleFontSize = textStyleFontSize == null ? 18 : textStyleFontSize;
	// 副标题
	var Sublink = haveValue(ochartOption, "title.sublink", "string")
	var subtextStyleColor = haveValue(ochartOption, "title.subtextStyle.color", "string") || haveValue(theme, "title.subtextStyle.color", "string") ||"#aaaaaa";
	var subtextStyleFontSize = haveValue(ochartOption, "title.subtextStyle.fontSize", "number");
	subtextStyleFontSize = subtextStyleFontSize == null ? 12 : subtextStyleFontSize;
	// 标题通用
	var titleShow = haveValue(ochartOption, "title.show", "boolean");
	var titlePadding = haveValue(ochartOption, "title.padding", "number");
	titlePadding = titlePadding == null ? 5 : titlePadding;
	var titleItemGap = haveValue(ochartOption, "title.itemGap", "number");
	titleItemGap = titleItemGap == null ? 10 : titleItemGap;
	var titlePlace = ochartOption.titlePlace || "common";
	var titleLeft = haveValue(ochartOption, "title.left", "string");
	var titleLeft1 =  parseInt(titleLeft);
	var titleTop = haveValue(ochartOption, "title.top", "string");
	var titleTop1 =  parseInt(titleTop);
	var titleBackgroundColor = haveValue(ochartOption, "title.backgroundColor", "string") || haveValue(theme, "title.backgroundColor", "string");
	var titleBorderWidth =  haveValue(ochartOption, "title.borderWidth", "number") || 0;;
	var titleBorderRadius = haveValue(ochartOption, "title.borderRadius", "number") || 0;
	var titleBorderColor = haveValue(ochartOption, "title.borderColor", "string") || haveValue(theme, "title.borderColor", "string") || "#cccccc";
	var titleShadowBlur = haveValue(ochartOption, "title.shadowBlur", "number") || 0;
	var titleShadowColor = haveValue(ochartOption, "title.shadowColor", "string") || haveValue(theme, "title.shadowColor", "string") || "rgba(0, 0, 0, 0.5)";
	var titleShadowOffsetX = haveValue(ochartOption, "title.shadowOffsetX", "number") || 0;
	var titleShadowOffsetY = haveValue(ochartOption, "title.shadowOffsetY", "number") || 0;
	athis.titleObj = {
		Show: titleShow == null ? true : titleShow,	
		titleName: haveValue(ochartOption, "titleName", "string") || "",
		Text: haveValue(ochartOption, "title.text", "string")|| "",
		Subtext: haveValue(ochartOption, "title.subtext", "string"),
		Link: Link ? Link.split("://")[1] : Link,
		Target: haveValue(ochartOption, "title.target", "string") || "blank",
		textStyleColor: textStyleColor == "transparent" ? "rgba(0,0,0,0)" : textStyleColor,
		textStyleFontSytle: haveValue(ochartOption, "title.textStyle.fontStyle", "string") || "normal",
		textStyleFontWeight: haveValue(ochartOption, "title.textStyle.fontWeight", "string") || "bold",
		textStyleFontFamily: haveValue(ochartOption, "title.textStyle.fontFamily", "string") || "sans-serif",
		textStyleFontSize: textStyleFontSize,
		textStyleFontSize1: textStyleFontSize,
		Sublink: Sublink ? Sublink.split("://")[1] : "",
		Subtarget: haveValue(ochartOption, "title.subtarget", "string") || "blank",
		subtextStyleColor: subtextStyleColor == "transparent" ? "rgba(0,0,0,0)" : subtextStyleColor,
		subtextStyleFontSytle: haveValue(ochartOption, "title.subtextStyle.fontStyle", "string") || "normal",
		subtextStyleFontWeight: haveValue(ochartOption, "title.subtextStyle.fontWeight", "string") || "bold",
		subtextStyleFontFamily: haveValue(ochartOption, "title.subtextStyle.fontFamily", "string") || "sans-serif",
		subtextStyleFontSize: subtextStyleFontSize,
		subtextStyleFontSize1: subtextStyleFontSize,
		Padding: titlePadding,
		Padding1: titlePadding,
		ItemGap: titleItemGap,
		ItemGap1: titleItemGap,
		Place: titlePlace,
		BackgroundColor: titleBackgroundColor == "transparent" ? "rgba(0,0,0,0)" : titleBackgroundColor,
		BorderWidth: titleBorderWidth,
		BorderWidth1: titleBorderWidth,
		BorderRadius: titleBorderRadius,
		BorderRadius1: titleBorderRadius,
		BorderColor: titleBorderColor == "transparent" ? "rgba(0,0,0,0)" : titleBorderColor,
		ShadowBlur: titleShadowBlur,
		ShadowBlur1: titleShadowBlur,
		ShadowColor: titleShadowColor == "transparent" ? "rgba(0,0,0,0)" : titleShadowColor,
		ShadowOffsetX: titleShadowOffsetX,
		ShadowOffsetX1: titleShadowOffsetX,
		ShadowOffsetY: titleShadowOffsetY,
		ShadowOffsetY1: titleShadowOffsetY,
		Left: 0,
		Left1: 0,
		Left2: "left",
		Top: 0,
		Top1: 0,
		Top2: "top"
	}
	if(titlePlace == "common"){
		athis.titleObj.Left2 =  titleLeft || "left";
		athis.titleObj.Top2 = titleTop || "top";
	}else{
		athis.titleObj.Left = titleLeft1 || 0;
		athis.titleObj.Left1 = titleLeft1 || 0;
		athis.titleObj.Top = titleTop1 || 0;
		athis.titleObj.Top1 = titleTop1 || 0;
	}
}
// 雷达坐标
function radarFun(athis, ochartOption){
	radar = ochartOption.radar;
	var themeColor = haveValue(theme, "valueAxis.axisLine.lineStyle.color", "string");
	var radarList = [];
	var radarIndex = haveValue(ochartOption, "radarIndex", "number") || 0;
	radar.forEach(function(item, i){
		radarList.push({name:"轴"+(i+1)});
	});
	athis.radarIndex = radarIndex;
	var radarType = haveValue(ochartOption, "radar."+radarIndex+".type");
	var radarCenterX = parseInt(haveValue(ochartOption, "radar."+radarIndex+".center", "array", 0));
	var radarCenterY = parseInt(haveValue(ochartOption, "radar."+radarIndex+".center", "array", 1));
	radarCenterX = radarCenterX == 0 ? 0 : radarCenterX || 50;
	radarCenterY = radarCenterY == 0 ? 0 : radarCenterY || 50;
	var radarRadius = parseInt(haveValue(ochartOption, "radar."+radarIndex+".radius", "number"));
	radarRadius = radarRadius == 0 ? 0 : radarRadius || 70;
	var radarStartAngle = haveValue(ochartOption, "radar."+radarIndex+".startAngle", "number");
	radarStartAngle = radarStartAngle == null ? 90 : radarStartAngle;
	var radarShape = haveValue(ochartOption, "radar."+radarIndex+".shape", "string") || "polygon";
	var radarNameGap = haveValue(ochartOption, "radar."+radarIndex+".nameGap", "number");
	radarNameGap = radarNameGap == null ? 15 : radarNameGap;
	var radarSplitNumber = haveValue(ochartOption, "radar."+radarIndex+".splitNumber", "number");
	radarSplitNumber = radarSplitNumber == null ? 5 : radarSplitNumber;
	var radarScalee = haveValue(ochartOption, "radar."+radarIndex+".scale", "boolean");
	radarScalee = radarScalee == null ? false : radarScalee;
	var radarStyle = haveValue(ochartOption, "radar."+radarIndex+".radarStyle", "string") || "";
	// 名称文本折叠
	var radarNameShow = haveValue(ochartOption, "radar."+radarIndex+".name.show", "boolean");
	radarNameShow = radarNameShow == null ? true : radarNameShow;
	var radarNameTextStyleColor =  haveValue(ochartOption, "radar."+radarIndex+".name.color", "string") || haveValue(theme, "radar."+radarIndex+".name.color", "string") || "#cccccc";
	var radarNameTextStyleFontSytle = haveValue(ochartOption, "radar."+radarIndex+".name.fontStyle", "string") || "normal";
	var radarNameTextStyleFontWeight = haveValue(ochartOption, "radar."+radarIndex+".name.fontWeight", "string") || "normal";
	var radarNameTextStyleFontFamily = haveValue(ochartOption, "radar."+radarIndex+".name.fontFamily", "string") || "sans-serif";
	var radarNameTextStyleFontSize = haveValue(ochartOption, "radar."+radarIndex+".name.fontSize", "number");
	radarNameTextStyleFontSize = radarNameTextStyleFontSize == null ? 12 : radarNameTextStyleFontSize;
	var radarNameTextStyleBackgroundColor =  haveValue(ochartOption, "radar."+radarIndex+".name.backgroundColor", "string");
	var radarNameTextStyleBorderWidth = haveValue(ochartOption, "radar."+radarIndex+".name.bordetWidth", "number") || 0;
	var radarNameTextStyleBorderRadius = haveValue(ochartOption, "radar."+radarIndex+".name.borderRadius", "number") || 0;
	var radarNameTextStyleBorderColor =  haveValue(ochartOption, "radar."+radarIndex+".name.borderColor", "string");
	var radarNameTextStyleShadowBlur = haveValue(ochartOption, "radar."+radarIndex+".name.shadowBlur", "number") || 0;
	var radarNameTextStyleShadowColor =  haveValue(ochartOption, "radar."+radarIndex+".name.shadowColor", "string");
	var radarNameTextStyleShadowOffsetX = haveValue(ochartOption, "radar."+radarIndex+".name.shadowOffsetX", "number") || 0;
	var radarNameTextStyleShadowOffsetY = haveValue(ochartOption, "radar."+radarIndex+".name.shadowOffsetY", "number") || 0;
	// 轴线
	var radarLineShow = haveValue(ochartOption, "radar."+radarIndex+".axisLine.show", "boolean");
	radarLineShow = radarLineShow == null ? true : radarLineShow;
	var radarLineStyleColor =  haveValue(ochartOption, "radar."+radarIndex+".axisLine.lineStyle.color", "string") || themeColor || "#333333";
	radarLineStyleColor =  radarLineStyleColor == "transparent" ? "rgba(0,0,0,0)" : radarLineStyleColor;
	var radarLineStyleWidth = haveValue(ochartOption, "radar."+radarIndex+".axisLine.lineStyle.width", "number");
	radarLineStyleWidth = radarLineStyleWidth == null ? 1 : radarLineStyleWidth;
	var radarLineStyleType = haveValue(ochartOption, "radar."+radarIndex+".axisLine.lineStyle.type", "string") || "solid";
	var radarLineStyleShadowBlur = haveValue(ochartOption, "radar."+radarIndex+".axisLine.lineStyle.shadowBlur", "number") || 0;
	var radarLineStyleShadowColor =  haveValue(ochartOption, "radar."+radarIndex+".axisLine.lineStyle.shadowColor", "string") || "#333333";
	radarLineStyleShadowColor =  radarLineStyleShadowColor == "transparent" ? "rgba(0,0,0,0)" : radarLineStyleShadowColor;
	var radarLineStyleShadowOffsetX = haveValue(ochartOption, "radar."+radarIndex+".axisLine.lineStyle.shadowOffsetX", "number") || 0;
	var radarLineStyleShadowOffsetY = haveValue(ochartOption, "radar."+radarIndex+".axisLine.lineStyle.shadowOffsetY", "number") || 0;
	// 刻度线
	var radarTickShow = haveValue(ochartOption, "radar."+radarIndex+".axisTick.show", "boolean") || false;
	var radarTickAlignWithLabel = haveValue(ochartOption, "radar."+radarIndex+".axisTick.alignWithLabel", "boolean") || false;
	var radarTickInterval = haveValue(ochartOption, "radar."+radarIndex+".axisTick.interval", "string") || "auto";
	var radarTickInside = haveValue(ochartOption, "radar."+radarIndex+".axisTick.inside", "boolean") || false;
	var radarTickStyleLength = haveValue(ochartOption, "radar."+radarIndex+".axisTick.length", "number");
	radarTickStyleLength = radarTickStyleLength == null ? 5 : radarTickStyleLength;
	var radarTickStyleWidth = haveValue(ochartOption, "radar."+radarIndex+".axisTick.lineStyle.width", "number");
	radarTickStyleWidth = radarTickStyleWidth == null ? 1 : radarTickStyleWidth;
	var radarTickStyleColor =  haveValue(ochartOption, "radar."+radarIndex+".axisTick.lineStyle.color", "string") || "#333333";
	var radarTickStyleType = haveValue(ochartOption, "radar."+radarIndex+".axisTick.lineStyle.type", "string") || "solid";
	var radarTickStyleShadowBlur = haveValue(ochartOption, "radar."+radarIndex+".axisTick.lineStyle.shadowBlur", "number") || 0;
	var radarTickStyleShadowColor =  haveValue(ochartOption, "radar."+radarIndex+".axisTick.lineStyle.shadowColor", "string") || "#333333";
	var radarTickStyleShadowOffsetX = haveValue(ochartOption, "radar."+radarIndex+".axisTick.lineStyle.shadowOffsetX", "number") || 0;
	var radarTickStyleShadowOffsetY = haveValue(ochartOption, "radar."+radarIndex+".axisTick.lineStyle.shadowOffsetY", "number") || 0;
	// 标签
	var radarLabelShow = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.show", "boolean");
	radarLabelShow = radarLabelShow == null ? true : radarLabelShow;
	var radarLabelInterval = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.interval", "string") || "auto";
	var radarLabelInside = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.inside", "boolean") || false;
	var radarLabelRotate = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.rotate", "number") || 0;
	// radarLabelRotate = radarLabelRotate == null ? 0 : radarLabelRotate;
	var radarLabelMargin = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.margin", "number");
	radarLabelMargin = radarLabelMargin == null ? 8 : radarLabelMargin;
	var radarLabelColor = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.color", "string") || themeColor || "#333333";
	radarLabelColor = radarLabelColor == "transparent" ? "rgba(0,0,0,0)" : radarLabelColor;
	var radarLabelFontSytle = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.fontStyle", "string") || "normal";
	var radarLabelFontWeight = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.fontWeight", "string") || "normal";
	var radarLabelFontFamily = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.fontFamily", "string") || "sans-serif";
	var radarLabelFontSize = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.fontSize", "number");
	radarLabelFontSize = radarLabelFontSize == null ? 12 : radarLabelFontSize;
	var radarLabelBackgroundColor =  haveValue(ochartOption, "radar."+radarIndex+".axisLabel.backgroundColor", "string");
	var radarLabelBorderWidth = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.borderWidth", "number") || 0;
	var radarLabelBorderRadius = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.borderRadius", "number") || 0;
	var radarLabelBorderColor =  haveValue(ochartOption, "radar."+radarIndex+".axisLabel.borderColor", "string");
	var radarLabelShadowBlur = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.shadowBlur", "number") || 0;
	var radarLabelShadowColor = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.shadowColor", "string");
	radarLabelShadowColor = radarLabelShadowColor == "transparent" ? "rgba(0,0,0,0)" : radarLabelShadowColor;
	var radarLabelShadowOffsetX = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.shadowOffsetX", "number") || 0;
	var radarLabelShadowOffsetY = haveValue(ochartOption, "radar."+radarIndex+".axisLabel.shadowOffsetY", "number") || 0;
	// 隔区
	var radarSplitAreaColorList = axisSplitAreaFun(radar, radarIndex);
	var radarSplitAreaShow = haveValue(ochartOption, "radar."+radarIndex+".splitArea.show", "boolean") || false;
	var radarSplitAreaColor = haveValue(ochartOption, "radar."+radarIndex+".splitArea.areaStyle.color", "string") || themeColor || "#333333";
	radarSplitAreaColor = radarSplitAreaColor == "transparent" ? "rgba(0,0,0,0)" : radarSplitAreaColor;
	var radarSplitAreaShadowBlur = haveValue(ochartOption, "radar."+radarIndex+".splitArea.areaStyle.shadowBlur", "number") || 0;
	var radarSplitAreaShadowColor =  haveValue(ochartOption, "radar."+radarIndex+".splitArea.areaStyle.shadowColor", "string") || "#333333";
	radarSplitAreaShadowColor = radarSplitAreaShadowColor == "transparent" ? "rgba(0,0,0,0)" : radarSplitAreaShadowColor;
	var radarSplitAreaShadowOffsetX = haveValue(ochartOption, "radar."+radarIndex+".splitArea.areaStyle.shadowOffsetX", "number") || 0;
	var radarSplitAreaShadowOffsetY = haveValue(ochartOption, "radar."+radarIndex+".splitArea.areaStyle.shadowOffsetY", "number") || 0;
	// 隔线设置
	var radarSplitLineColorList = axisSplitLineFun(radar, radarIndex);
	var radarSplitLineShow = haveValue(ochartOption, "radar."+radarIndex+".splitLine.show", "boolean");
	radarSplitLineShow = radarSplitLineShow == null ? true : radarSplitLineShow;
	var radarSplitLineColor = haveValue(ochartOption, "radar."+radarIndex+".splitLine.lineStyle.color", "string") || themeColor || "#333333";
	radarSplitLineColor = radarSplitLineColor == "transparent" ? "rgba(0,0,0,0)" : radarSplitLineColor;
	var radarSplitLineWidth = haveValue(ochartOption, "radar."+radarIndex+".splitLine.lineStyle.width", "number");
	radarSplitLineWidth = radarSplitLineWidth == null ? 1 : radarSplitLineWidth;
	var radarSplitLineType = haveValue(ochartOption, "radar."+radarIndex+".splitLine.lineStyle.type", "string") || "solid";
	var radarSplitLineShadowBlur = haveValue(ochartOption, "radar."+radarIndex+".splitLine.lineStyle.shadowBlur", "number") || 0;
	var radarSplitLineShadowColor =  haveValue(ochartOption, "radar."+radarIndex+".splitLine.lineStyle.shadowColor", "string") || "#333333";
	radarSplitLineShadowColor = radarSplitLineShadowColor == "transparent" ? "rgba(0,0,0,0)" : radarSplitLineShadowColor;
	var radarSplitLineShadowOffsetX = haveValue(ochartOption, "radar."+radarIndex+".splitLine.lineStyle.shadowOffsetX", "number") || 0;
	var radarSplitLineShadowOffsetY = haveValue(ochartOption, "radar."+radarIndex+".splitLine.lineStyle.shadowOffsetY", "number") || 0;
	// 指示器
	var indicatorIndex = haveValue(ochartOption, "radar."+radarIndex+".indicatorIndex", "number") || 0;
	var indicatorList = haveValue(ochartOption, "radar."+radarIndex+".indicator", "list") || [];
	var indicatorColor = haveValue(ochartOption, "radar."+radarIndex+".indicator."+indicatorIndex+".color", "string") || "";
	athis.radarObj ={
		radarList: radarList,
		radarCenterX: radarCenterX,
		radarCenterX1: radarCenterX,
		radarCenterY: radarCenterY,
		radarCenterY1: radarCenterY,
		radarRadius: radarRadius,
		radarRadius1: radarRadius,
		radarStartAngle: radarStartAngle,
		radarStartAngle1: radarStartAngle,
		radarShape: radarShape,
		radarNameGap: radarNameGap,
		radarNameGap1: radarNameGap,
		radarSplitNumber: radarSplitNumber,
		radarSplitNumber1: radarSplitNumber,
		radarScalee: radarScalee,
		radarStyle: radarStyle,
		radarNameShow: radarNameShow,
		radarNameTextStyleColor: radarNameTextStyleColor,
		radarNameTextStyleFontSytle: radarNameTextStyleFontSytle,
		radarNameTextStyleFontWeight: radarNameTextStyleFontWeight,
		radarNameTextStyleFontFamily: radarNameTextStyleFontFamily,
		radarNameTextStyleFontSize: radarNameTextStyleFontSize,
		radarNameTextStyleFontSize1: radarNameTextStyleFontSize,
		radarNameTextStyleBackgroundColor: radarNameTextStyleBackgroundColor,
		radarNameTextStyleBorderWidth: radarNameTextStyleBorderWidth,
		radarNameTextStyleBorderWidth1: radarNameTextStyleBorderWidth,
		radarNameTextStyleBorderRadius: radarNameTextStyleBorderRadius,
		radarNameTextStyleBorderRadius1: radarNameTextStyleBorderRadius,
		radarNameTextStyleBorderColor: radarNameTextStyleBorderColor,
		radarNameTextStyleShadowBlur: radarNameTextStyleShadowBlur,
		radarNameTextStyleShadowBlur1: radarNameTextStyleShadowBlur,
		radarNameTextStyleShadowColor: radarNameTextStyleShadowColor,
		radarNameTextStyleShadowOffsetX: radarNameTextStyleShadowOffsetX,
		radarNameTextStyleShadowOffsetX1: radarNameTextStyleShadowOffsetX,
		radarNameTextStyleShadowOffsetY: radarNameTextStyleShadowOffsetY,
		radarNameTextStyleShadowOffsetY1: radarNameTextStyleShadowOffsetY,
		radarLineShow: radarLineShow,
		radarLineStyleColor: radarLineStyleColor,
		radarLineStyleWidth: radarLineStyleWidth,
		radarLineStyleWidth1: radarLineStyleWidth,
		radarLineStyleType: radarLineStyleType,
		radarLineStyleShadowBlur: radarLineStyleShadowBlur,
		radarLineStyleShadowBlur1: radarLineStyleShadowBlur,
		radarLineStyleShadowColor: radarLineStyleShadowColor,
		radarLineStyleShadowOffsetX: radarLineStyleShadowOffsetX,
		radarLineStyleShadowOffsetX1: radarLineStyleShadowOffsetX,
		radarLineStyleShadowOffsetY: radarLineStyleShadowOffsetY,
		radarLineStyleShadowOffsetY1: radarLineStyleShadowOffsetY,
		radarTickShow: radarTickShow,
		radarTickAlignWithLabel: radarTickAlignWithLabel,
		radarTickInterval: radarTickInterval,
		radarTickInside: radarTickInside,
		radarTickStyleLength: radarTickStyleLength,
		radarTickStyleLength1: radarTickStyleLength,
		radarTickStyleWidth: radarTickStyleWidth,
		radarTickStyleWidth1: radarTickStyleWidth,
		radarTickStyleColor: radarTickStyleColor,
		radarTickStyleType: radarTickStyleType,
		radarTickStyleShadowBlur: radarTickStyleShadowBlur,
		radarTickStyleShadowBlur1: radarTickStyleShadowBlur,
		radarTickStyleShadowColor: radarTickStyleShadowColor,
		radarTickStyleShadowOffsetX: radarTickStyleShadowOffsetX,
		radarTickStyleShadowOffsetX1: radarTickStyleShadowOffsetX,
		radarTickStyleShadowOffsetY: radarTickStyleShadowOffsetY,
		radarTickStyleShadowOffsetY1: radarTickStyleShadowOffsetY,
		radarLabelShow: radarLabelShow,
		radarLabelInterval: radarLabelInterval,
		radarLabelInside: radarLabelInside,
		radarLabelRotate: radarLabelRotate,
		radarLabelRotate1: radarLabelRotate,
		radarLabelMargin: radarLabelMargin,
		radarLabelMargin1: radarLabelMargin,
		radarLabelColor: radarLabelColor,
		radarLabelFontSytle: radarLabelFontSytle,
		radarLabelFontWeight: radarLabelFontWeight,
		radarLabelFontFamily: radarLabelFontFamily,
		radarLabelFontSize: radarLabelFontSize,
		radarLabelFontSize1: radarLabelFontSize,
		radarLabelBackgroundColor: radarLabelBackgroundColor,
		radarLabelBorderWidth: radarLabelBorderWidth,
		radarLabelBorderWidth1: radarLabelBorderWidth,
		radarLabelBorderRadius: radarLabelBorderRadius,
		radarLabelBorderRadius1: radarLabelBorderRadius,
		radarLabelBorderColor: radarLabelBorderColor,
		radarLabelShadowBlur: radarLabelShadowBlur,
		radarLabelShadowBlur1: radarLabelShadowBlur,
		radarLabelShadowColor: radarLabelShadowColor,
		radarLabelShadowOffsetX: radarLabelShadowOffsetX,
		radarLabelShadowOffsetX1: radarLabelShadowOffsetX,
		radarLabelShadowOffsetY: radarLabelShadowOffsetY,
		radarLabelShadowOffsetY1: radarLabelShadowOffsetY,
		radarSplitLineColorList: radarSplitLineColorList,
		radarSplitLineShow: radarSplitLineShow,
		radarSplitLineColor: radarSplitLineColor,
		radarSplitLineWidth: radarSplitLineWidth,
		radarSplitLineWidth1: radarSplitLineWidth,
		radarSplitLineType: radarSplitLineType,
		radarSplitLineShadowBlur: radarSplitLineShadowBlur,
		radarSplitLineShadowBlur1: radarSplitLineShadowBlur,
		radarSplitLineShadowColor: radarSplitLineShadowColor,
		radarSplitLineShadowOffsetX: radarSplitLineShadowOffsetX,
		radarSplitLineShadowOffsetX1: radarSplitLineShadowOffsetX,
		radarSplitLineShadowOffsetY: radarSplitLineShadowOffsetY,
		radarSplitLineShadowOffsetY1: radarSplitLineShadowOffsetY,	
		radarSplitAreaColorList: radarSplitAreaColorList,
		radarSplitAreaShow: radarSplitAreaShow,
		radarSplitAreaColor: radarSplitAreaColor,
		radarSplitAreaShadowBlur: radarSplitAreaShadowBlur,
		radarSplitAreaShadowBlur1: radarSplitAreaShadowBlur,
		radarSplitAreaShadowColor: radarSplitAreaShadowColor,
		radarSplitAreaShadowOffsetX: radarSplitAreaShadowOffsetX,
		radarSplitAreaShadowOffsetX1: radarSplitAreaShadowOffsetX,
		radarSplitAreaShadowOffsetY: radarSplitAreaShadowOffsetY,
		radarSplitAreaShadowOffsetY1: radarSplitAreaShadowOffsetY,
		indicatorIndex: indicatorIndex,
		indicatorList: indicatorList,
		indicatorColor: indicatorColor
	}
}
function radarIndicator(ochartOption, radarIndex, indicatorIndex, athis){
	var indicatorColor = haveValue(ochartOption, "radar."+radarIndex+".indicator."+indicatorIndex+".color", "string") || "";
	athis.radarObj.indicatorColor= indicatorColor;
}
// 地理坐标
function geoFun(athis, ochartOption){
	var province = haveValue(ochartOption, "geo.province", "string") || "";
	var city = haveValue(ochartOption, "geo.city", "string") || "";
	var show = haveValue(ochartOption, "geo.show", "boolean");
	show = show == null ? true : show;
	var roam = haveValue(ochartOption, "geo.roam", "boolean") || false;
	var silent = haveValue(ochartOption, "geo.roam", "silent") || false;
	var center = haveValue(ochartOption, "geo.center", "array", null) || "";
	var zoom = haveValue(ochartOption, "geo.zoom", "number");
	zoom = zoom == null ? 1 : zoom;
	var selectedMode = haveValue(ochartOption, "geo.selectedMode", "string") || "false";
	var aspectScale = haveValue(ochartOption, "geo.aspectScale", "number");
	aspectScale = aspectScale == null ? 0.75 : aspectScale;
	// label
	var labelSelect = haveValue(ochartOption, "geo.labelSelect", "string")|| "normal";
	var labelList = [{name:"普通",labelSelect:"normal"},{name:"高亮(不设置则同普通)",labelSelect:"emphasis"}];
	labelList.forEach(function (item, a) {
		var show = haveValue(ochartOption, "geo.label."+ item.labelSelect+".show", "boolean");
		item.show = show == null ? false : show;
		var distance = haveValue(ochartOption, "geo.label."+ item.labelSelect+".distance", "number") || 5;
		item.distance = distance;
		item.distance1 = distance;
		var rotate = haveValue(ochartOption, "geo.label."+ item.labelSelect+".rotate", "number") || 0;
		item.rotate = rotate;
		item.rotate1 = rotate;
		var fontFamily = haveValue(ochartOption, "geo.label."+ item.labelSelect+".fontFamily", "string") || "sans-serif";
		item.fontFamily = fontFamily;
		var position = haveValue(ochartOption, "geo.label."+ item.labelSelect+".position", "string")|| "top";
		var color = haveValue(ochartOption, "geo.label."+ item.labelSelect+".color", "string") || "#333333";
		item.position = position;
		item.color = color;
		var fontSize = haveValue(ochartOption, "geo.label."+ item.labelSelect+".fontSize", "number") || 12;
		item.fontSize = fontSize;
		item.fontSize1 = fontSize;
		var fontStyle = haveValue(ochartOption, "geo.label."+ item.labelSelect+".fontStyle", "string") || "normal";
		item.fontStyle = fontStyle;
		var fontWeight = haveValue(ochartOption, "geo.label."+ item.labelSelect+".fontWeight", "string") || "normal";
		item.fontWeight = fontWeight;
		var padding =  haveValue(ochartOption, "geo.label."+ item.labelSelect+".padding", "number") || 0;
		item.padding = padding;
		item.padding1 = padding;
		var backgroundColor = haveValue(ochartOption, "geo.label."+ item.labelSelect+".backgroundColor", "string");
		item.backgroundColor = backgroundColor;
		var borderWidth = haveValue(ochartOption, "geo.label."+ item.labelSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderRadius = haveValue(ochartOption, "geo.label."+ item.labelSelect+".borderRadius", "number") || 0;
		item.borderRadius = borderRadius;
		item.borderRadius1 = borderRadius;
		var borderColor = haveValue(ochartOption, "geo.label."+ item.labelSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "geo.label."+ item.labelSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "geo.label."+ item.labelSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "geo.label."+ item.labelSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "geo.label."+ item.labelSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	// itemStyle
	var itemStyleSelect = haveValue(ochartOption, "geo.itemStyleSelect", "string")|| "normal";
	var itemStyleList = [{name:"普通",itemStyleSelect:"normal"},{name:"高亮(不设置则同普通)",itemStyleSelect:"emphasis"}];
	itemStyleList.forEach(function (item, a) {
		var itemStyleareaColor = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".itemStyleareaColor", "string")|| "ordinary";
		item.itemStyleareaColor = itemStyleareaColor;
		var areaColor = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".areaColor", "string")|| "#eeeeee";
		item.areaColor = areaColor;
		var areaGradationColor = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".areaColor", "object", 0, null, "color");
		item.areaGradationColor = areaGradationColor;
		var areaGradationColor1 = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".areaColor", "object", 1, null, "color");
		item.areaGradationColor1 = areaGradationColor1;
		var areaGradationType = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".areaColor", "object") || "linear";
		item.areaGradationType = areaGradationType;
		var itemStyleColor = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".itemStyleColor", "string")|| "ordinary";
		item.itemStyleColor = itemStyleColor;
		var color = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".color", "string");
		item.color = color;
		var gradationColor = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".color", "object", 0, null, "color");
		item.gradationColor = gradationColor;
		var gradationColor1 = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".color", "object", 1, null, "color");
		item.gradationColor1 = gradationColor1;
		var gradationType = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".color", "object") || "linear";
		item.gradationType = gradationType;
		var borderType = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".borderType", "string")|| "solid";
		item.borderType = borderType;
		var borderWidth = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".borderWidth", "number");
		borderWidth = borderWidth == null ? 1 : borderWidth;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderColor = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "geo.itemStyle."+ item.itemStyleSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	athis.cityList = ochartOption.geo.cityList || "";	
	athis.geoObj = {
		province: province,
		city: city,
		show: show,
		roam: roam,
		silent: silent,
		center: center,
		zoom: zoom,
		zoom1: zoom,
		selectedMode: selectedMode,
		aspectScale: aspectScale,
		aspectScale1: aspectScale,
		labelSelect: labelSelect,
		labelList: labelList,
		itemStyleSelect: itemStyleSelect,
		itemStyleList: itemStyleList
	}
	
}
// 直角坐标
function rectangularFun(athis, ochartOption){
	var themeColor = haveValue(theme, "valueAxis.axisLine.lineStyle.color", "string");
	var id = haveValue(ochartOption, "TabsAxis", "string") || "xAxis";
	tabsSelected(id, "rectangular");
	if(id == "xAxis"){
		// X轴
		xAxis = ochartOption.xAxis;		
		var xAxisList = [];
		var xAxisIndex = haveValue(ochartOption, "xAxisIndex", "number") || 0;
		xAxis.forEach(function(item, i){
			xAxisList.push({name:"轴"+(i+1)});
		});
		athis.xAxisIndex = xAxisIndex;
		var xAxisType = haveValue(ochartOption, "xAxis."+xAxisIndex+".type", "string");
		var xAxisShow = haveValue(ochartOption, "xAxis."+xAxisIndex+".show", "boolean");
		xAxisShow = xAxisShow == null ? true : xAxisShow;	
		var xAxisPosition = haveValue(ochartOption, "xAxis."+xAxisIndex+".position", "string") || "bottom";
		var xAxisName = haveValue(ochartOption, "xAxis."+xAxisIndex+".name", "string") || "";
		var xAxisNameLocation = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameLocation", "string") || "end";
		// 名称文本折叠
			var xAxisNameTextStyleColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.color", "string") || themeColor || "#333333";
			var xAxisNameTextStyleFontSytle = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.fontStyle", "string") || "normal";
			var xAxisNameTextStyleFontWeight = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.fontWeight", "string") || "normal";
			var xAxisNameTextStyleFontFamily = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.fontFamily", "string") || "sans-serif";
			var xAxisNameTextStyleFontSize = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.fontSize", "number");
			xAxisNameTextStyleFontSize = xAxisNameTextStyleFontSize == null ? 12 : xAxisNameTextStyleFontSize;	
			var xAxisNameTextStyleBackgroundColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.backgroundColor", "string");
			var xAxisNameTextStyleBorderWidth = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.bordetWidth", "number") || 0;
			var xAxisNameTextStyleBorderRadius = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.borderRadius", "number") || 0;
			var xAxisNameTextStyleBorderColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.borderColor", "string");
			var xAxisNameTextStyleShadowBlur = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.shadowBlur", "number") || 0;
			var xAxisNameTextStyleShadowColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.shadowColor", "string");
			var xAxisNameTextStyleShadowOffsetX = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.shadowOffsetX", "number") || 0;
			var xAxisNameTextStyleShadowOffsetY = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameTextStyle.shadowOffsetY", "number") || 0;
		var xAxisNameGap = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameGap", "number");
		xAxisNameGap = xAxisNameGap == null ? 15 : xAxisNameGap;
		var xAxisNameRotate = haveValue(ochartOption, "xAxis."+xAxisIndex+".nameRotate", "number") || 0;
		var xAxisInverse = haveValue(ochartOption, "xAxis."+xAxisIndex+".inverse", "boolean") || false;
		var xAxisBoundaryGap = haveValue(ochartOption, "xAxis."+xAxisIndex+".bounzhdaryGap", "boolean") || false;
		var xAxisScalee = haveValue(ochartOption, "xAxis."+xAxisIndex+".scale", "boolean") || false;
		var xAxisStyle = haveValue(ochartOption, "xAxis."+xAxisIndex+".xAxisStyle", "string") || "";
		// 轴线
			var xAxisLineShow = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLine.show", "boolean");
			xAxisLineShow = xAxisLineShow == null ? true : xAxisLineShow;			
			var xAxisLineStyleColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLine.lineStyle.color", "string") || themeColor || "#333333";
			xAxisLineStyleColor = xAxisLineStyleColor == "transparent" ? "rgba(0,0,0,0)" : xAxisLineStyleColor;
			var xAxisLineStyleWidth = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLine.lineStyle.width", "number");
			xAxisLineStyleWidth = xAxisLineStyleWidth == null ? 1 : xAxisLineStyleWidth;;
			var xAxisLineStyleType = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLine.lineStyle.type", "string") || "solid";
			var xAxisLineStyleShadowBlur = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLine.lineStyle.shadowBlur", "number") || 0;
			var xAxisLineStyleShadowColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLine.lineStyle.shadowColor", "string") || "#333333";
			xAxisLineStyleShadowColor = xAxisLineStyleShadowColor == "transparent" ? "rgba(0,0,0,0)" : xAxisLineStyleShadowColor;			
			var xAxisLineStyleShadowOffsetX = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLine.lineStyle.shadowOffsetX", "number") || 0;
			var xAxisLineStyleShadowOffsetY = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLine.lineStyle.shadowOffsetY", "number") || 0;
		// 刻度线
			var xAxisTickShow = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.show", "boolean") || false;
			var xAxisTickAlignWithLabel = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.alignWithLabel", "boolean") || false;
			var xAxisTickInterval = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.interval", "string") || "auto";
			var xAxisTickInside = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.inside", "boolean") || false;
			var xAxisTickStyleLength = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.length", "number");
			xAxisTickStyleLength = xAxisTickStyleLength == null ? 5 : xAxisTickStyleLength;		
			var xAxisTickStyleWidth = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.lineStyle.width", "number");
			xAxisTickStyleWidth = xAxisTickStyleWidth == null ? 1 : xAxisTickStyleWidth;
			var xAxisTickStyleColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.lineStyle.color", "string") || "#333333";
			var xAxisTickStyleType = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.lineStyle.type", "string") || "solid";
			var xAxisTickStyleShadowBlur = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.lineStyle.shadowBlur", "number") || 0;
			var xAxisTickStyleShadowColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.lineStyle.shadowColor", "string") || "#333333";
			var xAxisTickStyleShadowOffsetX = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.lineStyle.shadowOffsetX", "number") || 0;
			var xAxisTickStyleShadowOffsetY = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisTick.lineStyle.shadowOffsetY", "number") || 0;
		// 标签
			var xAxisLabelShow = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.show", "boolean");
			xAxisLabelShow = xAxisLabelShow == null ? true : xAxisLabelShow;			
			var xAxisLabelInterval = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.interval", "string") || "auto";
			var xAxisLabelInside = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.inside", "boolean") || false;
			var xAxisLabelRotate = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.rotate", "number") || 0;
			var xAxisLabelMargin = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.margin", "number");
			xAxisLabelMargin = xAxisLabelMargin  == null ? 8 : xAxisLabelMargin;	
			var xAxisLabelColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.color", "string") || themeColor || "#333333";
			xAxisLabelColor = xAxisLabelColor == "transparent" ? "rgba(0,0,0,0)" : xAxisLabelColor;			
			var xAxisLabelFontSytle = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.fontStyle", "string") || "normal";
			var xAxisLabelFontWeight = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.fontWeight", "string") || "normal";
			var xAxisLabelFontFamily = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.fontFamily", "string") || "sans-serif";
			var xAxisLabelFontSize = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.fontSize", "number");
			xAxisLabelFontSize = xAxisLabelFontSize  == null ? 12 : xAxisLabelFontSize;		
			var xAxisLabelBackgroundColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.backgroundColor", "string");
			var xAxisLabelBorderWidth = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.borderWidth", "number") || 0;
			var xAxisLabelBorderRadius = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.borderRadius", "number") || 0;
			var xAxisLabelBorderColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.borderColor", "string");
			var xAxisLabelShadowBlur = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.shadowBlur", "number") || 0;
			var xAxisLabelShadowColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.shadowColor", "string");
			xAxisLabelShadowColor = xAxisLabelShadowColor == "transparent" ? "rgba(0,0,0,0)" : xAxisLabelShadowColor;		
			var xAxisLabelShadowOffsetX = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.shadowOffsetX", "number") || 0;
			var xAxisLabelShadowOffsetY = haveValue(ochartOption, "xAxis."+xAxisIndex+".axisLabel.shadowOffsetY", "number") || 0;
		// 隔线设置
			var xAxisSplitLineColorList = axisSplitLineFun(xAxis, xAxisIndex);;
			var xAxisSplitLineShow = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitLine.show", "boolean") || false;
			var xAxisSplitLineWidth = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitLine.lineStyle.width", "number");
			xAxisSplitLineWidth = xAxisSplitLineWidth == null ? 1 : xAxisSplitLineWidth;		
			var xAxisSplitLineType = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitLine.lineStyle.type", "string") || "solid";
			var xAxisSplitLineShadowBlur = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitLine.lineStyle.shadowBlur", "number") || 0;
			var xAxisSplitLineShadowColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".splitLine.lineStyle.shadowColor", "string") || "#333333";
			xAxisSplitLineShadowColor = xAxisSplitLineShadowColor == "transparent" ? "rgba(0,0,0,0)" : xAxisSplitLineShadowColor;			
			var xAxisSplitLineShadowOffsetX = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitLine.lineStyle.shadowOffsetX", "number") || 0;
			var xAxisSplitLineShadowOffsetY = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitLine.lineStyle.shadowOffsetY", "number") || 0;
		// 隔区
			var xAxisSplitAreaColorList = axisSplitAreaFun(xAxis, xAxisIndex);
			var xAxisSplitAreaShow = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitArea.show", "boolean") || false;
			var xAxisSplitAreaShadowBlur = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitArea.areaStyle.shadowBlur", "number") || 0;
			var xAxisSplitAreaShadowColor =  haveValue(ochartOption, "xAxis."+xAxisIndex+".splitArea.areaStyle.shadowColor", "string") || "#333333";
			xAxisSplitAreaShadowColor = xAxisSplitAreaShadowColor == "transparent" ? "rgba(0,0,0,0)" : xAxisSplitAreaShadowColor;			
			var xAxisSplitAreaShadowOffsetX = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitArea.areaStyle.shadowOffsetX", "number") || 0;
			var xAxisSplitAreaShadowOffsetY = haveValue(ochartOption, "xAxis."+xAxisIndex+".splitArea.areaStyle.shadowOffsetY", "number") || 0;
		if(xAxisType == "category"){
			$(".xAxisCategory").show();
			$(".xAxisFalseCategory").hide();
			$(".xAxisScale").hide();
		}else{
			$(".xAxisCategory").hide();
			$(".xAxisFalseCategory").show()
			if(xAxisType == "value"){
				$(".xAxisScale" ).show();
			}
		}
		athis.xAxisObj = {
			xAxisList: xAxisList,
			xAxisShow: xAxisShow,
			xAxisPosition: xAxisPosition,
			xAxisName: xAxisName,
			xAxisNameLocation: xAxisNameLocation,
			xAxisNameTextStyle: "",
			xAxisNameTextStyleColor: xAxisNameTextStyleColor,
			xAxisNameTextStyleFontSytle: xAxisNameTextStyleFontSytle,
			xAxisNameTextStyleFontWeight: xAxisNameTextStyleFontWeight,
			xAxisNameTextStyleFontFamily: xAxisNameTextStyleFontFamily,
			xAxisNameTextStyleFontSize: xAxisNameTextStyleFontSize,
			xAxisNameTextStyleFontSize1: xAxisNameTextStyleFontSize,
			xAxisNameTextStyleBackgroundColor: xAxisNameTextStyleBackgroundColor,
			xAxisNameTextStyleBorderWidth: xAxisNameTextStyleBorderWidth,
			xAxisNameTextStyleBorderWidth1: xAxisNameTextStyleBorderWidth,
			xAxisNameTextStyleBorderRadius: xAxisNameTextStyleBorderRadius,
			xAxisNameTextStyleBorderRadius1: xAxisNameTextStyleBorderRadius,
			xAxisNameTextStyleBorderColor: xAxisNameTextStyleBorderColor,
			xAxisNameTextStyleShadowBlur: xAxisNameTextStyleShadowBlur,
			xAxisNameTextStyleShadowBlur1: xAxisNameTextStyleShadowBlur,
			xAxisNameTextStyleShadowColor: xAxisNameTextStyleShadowColor,
			xAxisNameTextStyleShadowOffsetX: xAxisNameTextStyleShadowOffsetX,
			xAxisNameTextStyleShadowOffsetX1: xAxisNameTextStyleShadowOffsetX,
			xAxisNameTextStyleShadowOffsetY: xAxisNameTextStyleShadowOffsetY,
			xAxisNameTextStyleShadowOffsetY1: xAxisNameTextStyleShadowOffsetY,
			xAxisNameGap: xAxisNameGap,
			xAxisNameGap1: xAxisNameGap,
			xAxisNameRotate: xAxisNameRotate,
			xAxisNameRotate1: xAxisNameRotate,
			xAxisInverse: xAxisInverse,
			xAxisBoundaryGap: xAxisBoundaryGap,
			xAxisScalee: xAxisScalee,
			xAxisStyle:xAxisStyle,
			// 轴线
			xAxisLineShow: xAxisLineShow,
			xAxisLineStyleColor: xAxisLineStyleColor,
			xAxisLineStyleWidth: xAxisLineStyleWidth,
			xAxisLineStyleWidth1: xAxisLineStyleWidth,
			xAxisLineStyleType: xAxisLineStyleType,
			xAxisLineStyleShadowBlur: xAxisLineStyleShadowBlur,
			xAxisLineStyleShadowBlur1: xAxisLineStyleShadowBlur,
			xAxisLineStyleShadowColor: xAxisLineStyleShadowColor,
			xAxisLineStyleShadowOffsetX: xAxisLineStyleShadowOffsetX,
			xAxisLineStyleShadowOffsetX1: xAxisLineStyleShadowOffsetX,
			xAxisLineStyleShadowOffsetY: xAxisLineStyleShadowOffsetY,
			xAxisLineStyleShadowOffsetY1: xAxisLineStyleShadowOffsetY,
			// 刻度线
			xAxisTickShow: xAxisTickShow,
			xAxisTickAlignWithLabel: xAxisTickAlignWithLabel,
			xAxisTickInterval: xAxisTickInterval,
			xAxisTickInside: xAxisTickInside,
			xAxisTickStyleLength: xAxisTickStyleLength,
			xAxisTickStyleLength1: xAxisTickStyleLength,
			xAxisTickStyleWidth: xAxisTickStyleWidth,
			xAxisTickStyleWidth1: xAxisTickStyleWidth,
			xAxisTickStyleColor: xAxisTickStyleColor,
			xAxisTickStyleType: xAxisTickStyleType,
			xAxisTickStyleShadowBlur: xAxisTickStyleShadowBlur,
			xAxisTickStyleShadowBlur1: xAxisTickStyleShadowBlur,
			xAxisTickStyleShadowColor: xAxisTickStyleShadowColor,
			xAxisTickStyleShadowOffsetX: xAxisTickStyleShadowOffsetX,
			xAxisTickStyleShadowOffsetX1: xAxisTickStyleShadowOffsetX,
			xAxisTickStyleShadowOffsetY: xAxisTickStyleShadowOffsetY,
			xAxisTickStyleShadowOffsetY1: xAxisTickStyleShadowOffsetY,
			// 标签
			xAxisLabelShow: xAxisLabelShow,
			xAxisLabelInterval: xAxisLabelInterval,
			xAxisLabelInside: xAxisLabelInside,
			xAxisLabelRotate: xAxisLabelRotate,
			xAxisLabelRotate1: xAxisLabelRotate,
			xAxisLabelMargin: xAxisLabelMargin,
			xAxisLabelMargin1: xAxisLabelMargin,
			xAxisLabelColor: xAxisLabelColor,
			xAxisLabelFontSytle: xAxisLabelFontSytle,
			xAxisLabelFontWeight: xAxisLabelFontWeight,
			xAxisLabelFontFamily: xAxisLabelFontFamily,
			xAxisLabelFontSize: xAxisLabelFontSize,
			xAxisLabelFontSize1: xAxisLabelFontSize,
			xAxisLabelBackgroundColor: xAxisLabelBackgroundColor,
			xAxisLabelBorderWidth: xAxisLabelBorderWidth,
			xAxisLabelBorderWidth1: xAxisLabelBorderWidth,
			xAxisLabelBorderRadius: xAxisLabelBorderRadius,
			xAxisLabelBorderRadius1: xAxisLabelBorderRadius,
			xAxisLabelBorderColor: xAxisLabelBorderColor,
			xAxisLabelShadowBlur: xAxisLabelShadowBlur,
			xAxisLabelShadowBlur1: xAxisLabelShadowBlur,
			xAxisLabelShadowColor: xAxisLabelShadowColor,
			xAxisLabelShadowOffsetX: xAxisLabelShadowOffsetX,
			xAxisLabelShadowOffsetX1: xAxisLabelShadowOffsetX,
			xAxisLabelShadowOffsetY: xAxisLabelShadowOffsetY,
			xAxisLabelShadowOffsetY1: xAxisLabelShadowOffsetY,
			// 隔线
			xAxisSplitLineColorList: xAxisSplitLineColorList,
			xAxisSplitLineShow: xAxisSplitLineShow,
			xAxisSplitLineWidth: xAxisSplitLineWidth,
			xAxisSplitLineWidth1: xAxisSplitLineWidth,
			xAxisSplitLineType: xAxisSplitLineType,
			xAxisSplitLineShadowBlur: xAxisSplitLineShadowBlur,
			xAxisSplitLineShadowBlur1: xAxisSplitLineShadowBlur,
			xAxisSplitLineShadowColor: xAxisSplitLineShadowColor,
			xAxisSplitLineShadowOffsetX: xAxisSplitLineShadowOffsetX,
			xAxisSplitLineShadowOffsetX1: xAxisSplitLineShadowOffsetX,
			xAxisSplitLineShadowOffsetY: xAxisSplitLineShadowOffsetY,
			xAxisSplitLineShadowOffsetY1: xAxisSplitLineShadowOffsetY,
			// 隔区
			xAxisSplitAreaColorList: xAxisSplitAreaColorList,
			xAxisSplitAreaShow: xAxisSplitAreaShow,
			xAxisSplitAreaShadowBlur: xAxisSplitAreaShadowBlur,
			xAxisSplitAreaShadowBlur1: xAxisSplitAreaShadowBlur,
			xAxisSplitAreaShadowColor: xAxisSplitAreaShadowColor,
			xAxisSplitAreaShadowOffsetX: xAxisSplitAreaShadowOffsetX,
			xAxisSplitAreaShadowOffsetX1: xAxisSplitAreaShadowOffsetX,
			xAxisSplitAreaShadowOffsetY: xAxisSplitAreaShadowOffsetY,
			xAxisSplitAreaShadowOffsetY1: xAxisSplitAreaShadowOffsetY,
		};
	}else if(id == "yAxis"){
		// Y轴
		yAxis = ochartOption.yAxis;		
		var yAxisList = [];
		var yAxisIndex = haveValue(ochartOption, "yAxisIndex", "number") || 0;
		yAxis.forEach(function(item, i){
			yAxisList.push({name:"轴"+(i+1)});
		});
		athis.yAxisIndex = yAxisIndex;
		var yAxisType = haveValue(ochartOption, "yAxis."+yAxisIndex+".type", "string");
		var yAxisShow = haveValue(ochartOption, "yAxis."+yAxisIndex+".show", "boolean");
		yAxisShow = yAxisShow == null ? true : yAxisShow;	
		var yAxisPosition = haveValue(ochartOption, "yAxis."+yAxisIndex+".position", "string") || "left";
		var yAxisName = haveValue(ochartOption, "yAxis."+yAxisIndex+".name", "string") || "";
		var yAxisNameLocation = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameLocation", "string") || "end";
		// 名称文本折叠
			var yAxisNameTextStyleColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.color", "string") || themeColor || "#333333";
			var yAxisNameTextStyleFontSytle = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.fontStyle", "string") || "normal";
			var yAxisNameTextStyleFontWeight = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.fontWeight", "string") || "normal";
			var yAxisNameTextStyleFontFamily = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.fontFamily", "string") || "sans-serif";
			var yAxisNameTextStyleFontSize = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.fontSize", "number");
			yAxisNameTextStyleFontSize = yAxisNameTextStyleFontSize == null ? 12 : yAxisNameTextStyleFontSize;	
			var yAxisNameTextStyleBackgroundColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.backgroundColor", "string");
			var yAxisNameTextStyleBorderWidth = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.bordetWidth", "number") || 0;
			var yAxisNameTextStyleBorderRadius = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.borderRadius", "number") || 0;
			var yAxisNameTextStyleBorderColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.borderColor", "string");
			var yAxisNameTextStyleShadowBlur = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.shadowBlur", "number") || 0;
			var yAxisNameTextStyleShadowColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.shadowColor", "string");
			var yAxisNameTextStyleShadowOffsetX = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.shadowOffsetX", "number") || 0;
			var yAxisNameTextStyleShadowOffsetY = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameTextStyle.shadowOffsetY", "number") || 0;
			yAxisNameTextStyleShadowOffsetY = yAxisNameTextStyleShadowOffsetY;	
		var yAxisNameGap = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameGap", "number");
		yAxisNameGap = yAxisNameGap == null ? 15 : yAxisNameGap;
		var yAxisNameRotate = haveValue(ochartOption, "yAxis."+yAxisIndex+".nameRotate", "number") || 0;
		var yAxisInverse = haveValue(ochartOption, "yAxis."+yAxisIndex+".inverse", "boolean") || false;
		var yAxisBoundaryGap = haveValue(ochartOption, "yAxis."+yAxisIndex+".bounzhdaryGap", "boolean") || false;
		var yAxisScalee = haveValue(ochartOption, "yAxis."+yAxisIndex+".scale", "boolean") || false;
		var yAxisStyle = haveValue(ochartOption, "yAxis."+yAxisIndex+".yAxisStyle", "string") || "";
		// 轴线
			var yAxisLineShow = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLine.show", "boolean");
			yAxisLineShow = yAxisLineShow == null ? true : yAxisLineShow;			
			var yAxisLineStyleColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLine.lineStyle.color", "string") || themeColor || "#333333";
			yAxisLineStyleColor = yAxisLineStyleColor == "transparent" ? "rgba(0,0,0,0)" : yAxisLineStyleColor;
			var yAxisLineStyleWidth = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLine.lineStyle.width", "number");
			yAxisLineStyleWidth = yAxisLineStyleWidth == null ? 1 : yAxisLineStyleWidth;
			var yAxisLineStyleType = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLine.lineStyle.type", "string") || "solid";
			var yAxisLineStyleShadowBlur = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLine.lineStyle.shadowBlur", "number") || 0;
			var yAxisLineStyleShadowColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLine.lineStyle.shadowColor", "string") || "#333333";
			yAxisLineStyleShadowColor = yAxisLineStyleShadowColor == "transparent" ? "rgba(0,0,0,0)" : yAxisLineStyleShadowColor;			
			var yAxisLineStyleShadowOffsetX = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLine.lineStyle.shadowOffsetX", "number") || 0;
			var yAxisLineStyleShadowOffsetY = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLine.lineStyle.shadowOffsetY", "number") || 0;
		// 刻度线
			var yAxisTickShow = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.show", "boolean") || false;
			var yAxisTickAlignWithLabel = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.alignWithLabel", "boolean") || false;
			var yAxisTickInterval = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.interval", "string") || "auto";
			var yAxisTickInside = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.inside", "boolean") || false;
			var yAxisTickStyleLength = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.length", "number");
			yAxisTickStyleLength = yAxisTickStyleLength == null ? 5 : yAxisTickStyleLength;		
			var yAxisTickStyleWidth = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.lineStyle.width", "number");
			yAxisTickStyleWidth = yAxisTickStyleWidth == null ? 1 : yAxisTickStyleWidth;
			var yAxisTickStyleColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.lineStyle.color", "string") || "#333333";
			var yAxisTickStyleType = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.lineStyle.type", "string") || "solid";
			var yAxisTickStyleShadowBlur = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.lineStyle.shadowBlur", "number") || 0;
			var yAxisTickStyleShadowColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.lineStyle.shadowColor", "string") || "#333333";
			var yAxisTickStyleShadowOffsetX = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.lineStyle.shadowOffsetX", "number") || 0;
			var yAxisTickStyleShadowOffsetY = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisTick.lineStyle.shadowOffsetY", "number") || 0;
		// 标签
			var yAxisLabelShow = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.show", "boolean");
			yAxisLabelShow = yAxisLabelShow == null ? true : yAxisLabelShow;			
			var yAxisLabelInterval = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.interval", "string") || "auto";
			var yAxisLabelInside = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.inside", "boolean") || false;
			var yAxisLabelRotate = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.rotate", "number") || 0;
			var yAxisLabelMargin = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.margin", "number");
			yAxisLabelMargin = yAxisLabelMargin == null ? 8 : yAxisLabelMargin;	
			var yAxisLabelColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.color", "string") || themeColor || "#333333";
			yAxisLabelColor = yAxisLabelColor == "transparent" ? "rgba(0,0,0,0)" : yAxisLabelColor;			
			var yAxisLabelFontSytle = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.fontStyle", "string") || "normal";
			var yAxisLabelFontWeight = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.fontWeight", "string") || "normal";
			var yAxisLabelFontFamily = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.fontFamily", "string") || "sans-serif";
			var yAxisLabelFontSize = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.fontSize", "number");
			yAxisLabelFontSize = yAxisLabelFontSize == null ? 12 : yAxisLabelFontSize;			
			var yAxisLabelBackgroundColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.backgroundColor", "string");
			var yAxisLabelBorderWidth = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.borderWidth", "number") || 0;
			var yAxisLabelBorderRadius = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.borderRadius", "number") || 0;
			var yAxisLabelBorderColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.borderColor", "string");
			var yAxisLabelShadowBlur = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.shadowBlur", "number") || 0;
			var yAxisLabelShadowColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.shadowColor", "string");
			yAxisLabelShadowColor = yAxisLabelShadowColor == "transparent" ? "rgba(0,0,0,0)" : yAxisLabelShadowColor;		
			var yAxisLabelShadowOffsetX = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.shadowOffsetX", "number") || 0;
			var yAxisLabelShadowOffsetY = haveValue(ochartOption, "yAxis."+yAxisIndex+".axisLabel.shadowOffsetY", "number") || 0;
		// 隔线设置
			var yAxisSplitLineColorList = axisSplitLineFun(yAxis, yAxisIndex);;
			var yAxisSplitLineShow = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitLine.show", "boolean") || false;
			var yAxisSplitLineWidth = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitLine.lineStyle.width", "number");
			yAxisSplitLineWidth = yAxisSplitLineWidth == null ? 1 : yAxisSplitLineWidth;		
			var yAxisSplitLineType = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitLine.lineStyle.type", "string") || "solid";
			var yAxisSplitLineShadowBlur = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitLine.lineStyle.shadowBlur", "number") || 0;
			var yAxisSplitLineShadowColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".splitLine.lineStyle.shadowColor", "string") || "#333333";
			yAxisSplitLineShadowColor = yAxisSplitLineShadowColor == "transparent" ? "rgba(0,0,0,0)" : yAxisSplitLineShadowColor;			
			var yAxisSplitLineShadowOffsetX = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitLine.lineStyle.shadowOffsetX", "number") || 0;
			var yAxisSplitLineShadowOffsetY = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitLine.lineStyle.shadowOffsetY", "number") || 0;
		// 隔区
			var yAxisSplitAreaColorList = axisSplitAreaFun(yAxis, yAxisIndex);
			var yAxisSplitAreaShow = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitArea.show", "boolean") || false;
			var yAxisSplitAreaShadowBlur = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitArea.areaStyle.shadowBlur", "number") || 0;
			var yAxisSplitAreaShadowColor =  haveValue(ochartOption, "yAxis."+yAxisIndex+".splitArea.areaStyle.shadowColor", "string") || "#333333";
			yAxisSplitAreaShadowColor = yAxisSplitAreaShadowColor == "transparent" ? "rgba(0,0,0,0)" : yAxisSplitAreaShadowColor;			
			var yAxisSplitAreaShadowOffsetX = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitArea.areaStyle.shadowOffsetX", "number") || 0;
			var yAxisSplitAreaShadowOffsetY = haveValue(ochartOption, "yAxis."+yAxisIndex+".splitArea.areaStyle.shadowOffsetY", "number") || 0;
		if(yAxisType == "category"){
			$(".yAxisCategory").show();
			$(".yAxisFalseCategory").hide();
			$(".yAxisScale").hide();
		}else{
			$(".yAxisCategory").hide();
			$(".yAxisFalseCategory").show()
			if(yAxisType == "value"){
				$(".yAxisScale" ).show();
			}
		}
		athis.yAxisObj = {
			yAxisList: yAxisList,
			yAxisShow: yAxisShow,
			yAxisPosition: yAxisPosition,
			yAxisName: yAxisName,
			yAxisNameLocation: yAxisNameLocation,
			yAxisNameTextStyle: "",
			yAxisNameTextStyleColor: yAxisNameTextStyleColor,
			yAxisNameTextStyleFontSytle: yAxisNameTextStyleFontSytle,
			yAxisNameTextStyleFontWeight: yAxisNameTextStyleFontWeight,
			yAxisNameTextStyleFontFamily: yAxisNameTextStyleFontFamily,
			yAxisNameTextStyleFontSize: yAxisNameTextStyleFontSize,
			yAxisNameTextStyleFontSize1: yAxisNameTextStyleFontSize,
			yAxisNameTextStyleBackgroundColor: yAxisNameTextStyleBackgroundColor,
			yAxisNameTextStyleBorderWidth: yAxisNameTextStyleBorderWidth,
			yAxisNameTextStyleBorderWidth1: yAxisNameTextStyleBorderWidth,
			yAxisNameTextStyleBorderRadius: yAxisNameTextStyleBorderRadius,
			yAxisNameTextStyleBorderRadius1: yAxisNameTextStyleBorderRadius,
			yAxisNameTextStyleBorderColor: yAxisNameTextStyleBorderColor,
			yAxisNameTextStyleShadowBlur: yAxisNameTextStyleShadowBlur,
			yAxisNameTextStyleShadowBlur1: yAxisNameTextStyleShadowBlur,
			yAxisNameTextStyleShadowColor: yAxisNameTextStyleShadowColor,
			yAxisNameTextStyleShadowOffsetX: yAxisNameTextStyleShadowOffsetX,
			yAxisNameTextStyleShadowOffsetX1: yAxisNameTextStyleShadowOffsetX,
			yAxisNameTextStyleShadowOffsetY: yAxisNameTextStyleShadowOffsetY,
			yAxisNameTextStyleShadowOffsetY1: yAxisNameTextStyleShadowOffsetY,
			yAxisNameGap: yAxisNameGap,
			yAxisNameGap1: yAxisNameGap,
			yAxisNameRotate: yAxisNameRotate,
			yAxisNameRotate1: yAxisNameRotate,
			yAxisInverse: yAxisInverse,
			yAxisBoundaryGap: yAxisBoundaryGap,
			yAxisScalee: yAxisScalee,
			yAxisStyle:yAxisStyle,
			// 轴线
			yAxisLineShow: yAxisLineShow,
			yAxisLineStyleColor: yAxisLineStyleColor,
			yAxisLineStyleWidth: yAxisLineStyleWidth,
			yAxisLineStyleWidth1: yAxisLineStyleWidth,
			yAxisLineStyleType: yAxisLineStyleType,
			yAxisLineStyleShadowBlur: yAxisLineStyleShadowBlur,
			yAxisLineStyleShadowBlur1: yAxisLineStyleShadowBlur,
			yAxisLineStyleShadowColor: yAxisLineStyleShadowColor,
			yAxisLineStyleShadowOffsetX: yAxisLineStyleShadowOffsetX,
			yAxisLineStyleShadowOffsetX1: yAxisLineStyleShadowOffsetX,
			yAxisLineStyleShadowOffsetY: yAxisLineStyleShadowOffsetY,
			yAxisLineStyleShadowOffsetY1: yAxisLineStyleShadowOffsetY,
			// 刻度线
			yAxisTickShow: yAxisTickShow,
			yAxisTickAlignWithLabel: yAxisTickAlignWithLabel,
			yAxisTickInterval: yAxisTickInterval,
			yAxisTickInside: yAxisTickInside,
			yAxisTickStyleLength: yAxisTickStyleLength,
			yAxisTickStyleLength1: yAxisTickStyleLength,
			yAxisTickStyleWidth: yAxisTickStyleWidth,
			yAxisTickStyleWidth1: yAxisTickStyleWidth,
			yAxisTickStyleColor: yAxisTickStyleColor,
			yAxisTickStyleType: yAxisTickStyleType,
			yAxisTickStyleShadowBlur: yAxisTickStyleShadowBlur,
			yAxisTickStyleShadowBlur1: yAxisTickStyleShadowBlur,
			yAxisTickStyleShadowColor: yAxisTickStyleShadowColor,
			yAxisTickStyleShadowOffsetX: yAxisTickStyleShadowOffsetX,
			yAxisTickStyleShadowOffsetX1: yAxisTickStyleShadowOffsetX,
			yAxisTickStyleShadowOffsetY: yAxisTickStyleShadowOffsetY,
			yAxisTickStyleShadowOffsetY1: yAxisTickStyleShadowOffsetY,
			// 标签
			yAxisLabelShow: yAxisLabelShow,
			yAxisLabelInterval: yAxisLabelInterval,
			yAxisLabelInside: yAxisLabelInside,
			yAxisLabelRotate: yAxisLabelRotate,
			yAxisLabelRotate1: yAxisLabelRotate,
			yAxisLabelMargin: yAxisLabelMargin,
			yAxisLabelMargin1: yAxisLabelMargin,
			yAxisLabelColor: yAxisLabelColor,
			yAxisLabelFontSytle: yAxisLabelFontSytle,
			yAxisLabelFontWeight: yAxisLabelFontWeight,
			yAxisLabelFontFamily: yAxisLabelFontFamily,
			yAxisLabelFontSize: yAxisLabelFontSize,
			yAxisLabelFontSize1: yAxisLabelFontSize,
			yAxisLabelBackgroundColor: yAxisLabelBackgroundColor,
			yAxisLabelBorderWidth: yAxisLabelBorderWidth,
			yAxisLabelBorderWidth1: yAxisLabelBorderWidth,
			yAxisLabelBorderRadius: yAxisLabelBorderRadius,
			yAxisLabelBorderRadius1: yAxisLabelBorderRadius,
			yAxisLabelBorderColor: yAxisLabelBorderColor,
			yAxisLabelShadowBlur: yAxisLabelShadowBlur,
			yAxisLabelShadowBlur1: yAxisLabelShadowBlur,
			yAxisLabelShadowColor: yAxisLabelShadowColor,
			yAxisLabelShadowOffsetX: yAxisLabelShadowOffsetX,
			yAxisLabelShadowOffsetX1: yAxisLabelShadowOffsetX,
			yAxisLabelShadowOffsetY: yAxisLabelShadowOffsetY,
			yAxisLabelShadowOffsetY1: yAxisLabelShadowOffsetY,
			// 隔线
			yAxisSplitLineColorList: yAxisSplitLineColorList,
			yAxisSplitLineShow: yAxisSplitLineShow,
			yAxisSplitLineWidth: yAxisSplitLineWidth,
			yAxisSplitLineWidth1: yAxisSplitLineWidth,
			yAxisSplitLineType: yAxisSplitLineType,
			yAxisSplitLineShadowBlur: yAxisSplitLineShadowBlur,
			yAxisSplitLineShadowBlur1: yAxisSplitLineShadowBlur,
			yAxisSplitLineShadowColor: yAxisSplitLineShadowColor,
			yAxisSplitLineShadowOffsetX: yAxisSplitLineShadowOffsetX,
			yAxisSplitLineShadowOffsetX1: yAxisSplitLineShadowOffsetX,
			yAxisSplitLineShadowOffsetY: yAxisSplitLineShadowOffsetY,
			yAxisSplitLineShadowOffsetY1: yAxisSplitLineShadowOffsetY,
			// 隔区
			yAxisSplitAreaColorList: yAxisSplitAreaColorList,
			yAxisSplitAreaShow: yAxisSplitAreaShow,
			yAxisSplitAreaShadowBlur: yAxisSplitAreaShadowBlur,
			yAxisSplitAreaShadowBlur1: yAxisSplitAreaShadowBlur,
			yAxisSplitAreaShadowColor: yAxisSplitAreaShadowColor,
			yAxisSplitAreaShadowOffsetX: yAxisSplitAreaShadowOffsetX,
			yAxisSplitAreaShadowOffsetX1: yAxisSplitAreaShadowOffsetX,
			yAxisSplitAreaShadowOffsetY: yAxisSplitAreaShadowOffsetY,
			yAxisSplitAreaShadowOffsetY1: yAxisSplitAreaShadowOffsetY,
		};
	}else{
		gridFun(athis, ochartOption);
	}
}
// grid 绘图网格
function gridFun(athis, ochartOption) {
	var gridShow = haveValue(ochartOption, "grid.show", "boolean") || false;
	var gridContainLabel = haveValue(ochartOption, "grid.containLabel", "boolean") || false;
	var gridWidth = parseInt(haveValue(ochartOption, "grid.width", "number"));
	gridWidth = gridWidth == 0 ? 0 : gridWidth || 80;
	var gridHeight = parseInt(haveValue(ochartOption, "grid.height", "number"));
	gridHeight = gridHeight == 0 ? 0 : gridHeight || 70;	
	var gridLeft = parseInt(haveValue(ochartOption, "grid.left", "number"));
	gridLeft = gridLeft == 0 ? 0 : gridLeft || 10;	
	var gridTop = parseInt(haveValue(ochartOption, "grid.top", "number"));
	gridTop = gridTop == 0 ? 0 : gridTop || 15;	
	var shufflingBtn = haveValue(ochartOption, "shufflingBtn", "string") || "bottom";	
	var shufflingBtnWd = haveValue(ochartOption, "shufflingBtnWd", "number") || 10;
	var gridBackgroundColor = haveValue(ochartOption, "grid.backgroundColor", "string") || haveValue(theme, "grid.backgroundColor", "string");
	gridBackgroundColor = gridBackgroundColor == "transparent" ? "rgba(0,0,0,0)" : gridBackgroundColor;	
	var gridBorderWidth =  haveValue(ochartOption, "grid.borderWidth", "number");
	gridBorderWidth = gridBorderWidth == null ? 1 : gridBorderWidth;
	var gridBorderRadius = haveValue(ochartOption, "grid.borderRadius", "number") || 0;
	var gridBorderColor = haveValue(ochartOption, "grid.borderColor", "string") || haveValue(theme, "grid.borderColor", "string")  || "#cccccc";
	gridBorderColor = gridBorderColor == "transparent" ? "rgba(0,0,0,0)" : gridBorderColor;
	var gridShadowBlur = haveValue(ochartOption, "grid.shadowBlur", "number") || 0;
	var gridShadowColor = haveValue(ochartOption, "grid.shadowColor", "string") || haveValue(theme, "grid.shadowColor", "string") || "rgba(0, 0, 0, 0.5)";
	gridShadowColor = gridShadowColor == "transparent" ? "rgba(0,0,0,0)" : gridShadowColor;
	var gridShadowOffsetX = haveValue(ochartOption, "grid.shadowOffsetX", "number") || 0;
	var gridShadowOffsetY = haveValue(ochartOption, "grid.shadowOffsetY", "number") || 0;
	athis.gridObj={
		gridShow: gridShow,
		gridContainLabel: gridContainLabel,
		gridWidth: gridWidth,
		gridWidth1: gridWidth,
		gridHeight: gridHeight,
		gridHeight1: gridHeight,
		gridLeft: gridLeft,
		gridLeft1: gridLeft,
		gridTop: gridTop,
		gridTop1: gridTop,
		shufflingBtn: shufflingBtn,
		shufflingBtnWd: shufflingBtnWd,
		gridBackgroundColor: gridBackgroundColor,
		gridBorderWidth: gridBorderWidth,
		gridBorderWidth1: gridBorderWidth,
		gridBorderRadius: gridBorderRadius,
		gridBorderRadius1: gridBorderRadius,
		gridBorderColor: gridBorderColor,
		gridShadowBlur: gridShadowBlur,
		gridShadowBlur1: gridShadowBlur,
		gridShadowColor: gridShadowColor,
		gridShadowOffsetX: gridShadowOffsetX,
		gridShadowOffsetX1: gridShadowOffsetX,
		gridShadowOffsetY: gridShadowOffsetY,
		gridShadowOffsetY1: gridShadowOffsetY
	}	
}
// 图例与视觉映射
function legendVisualMap(athis, ochartOption){
	var id = haveValue(ochartOption, "Tabssecond", "string") || "legend";
	if(ochartOption.visualMap != undefined){
		$("#visualMap").parent().show();
	}else{
		$("#visualMap").parent().hide();
	}
	if(id == "legend"){
		// 图例
		var legendShow = haveValue(ochartOption, "legend.show", "boolean");
		legendShow = legendShow == null ? true : legendShow;
		// 'scroll' 时有效
		var legendPageButtonItemGap = haveValue(ochartOption, "legend.pageButtonItemGap", "number");
		legendPageButtonItemGap = legendPageButtonItemGap == null ? 5 : legendPageButtonItemGap;
		var legendPageButtonGap = haveValue(ochartOption, "legend.pageButtonGap", "number") || 0;
		var legendPageIconColor = haveValue(ochartOption, "legend.pageIconColor", "string") || haveValue(theme, "legend.pageIconColor", "string") || "#2f4554";
		legendPageIconColor = legendPageIconColor == "transparent" ? "rgba(0,0,0,0)" : legendPageIconColor;
		var legendPageIconInactiveColor = haveValue(ochartOption, "legend.pageIconInactiveColor", "string") || haveValue(theme, "legend.pageIconInactiveColor", "string") || "#aaaaaa";
		var legendPageIconSize = haveValue(ochartOption, "legend.pageIconSize", "number");
		legendPageIconSize = legendPageIconSize == null ? 15 : legendPageIconSize;
		// 文本
		var legendpageTextStyleColor = haveValue(ochartOption, "legend.pageTextStyle.color", "string") || haveValue(theme, "legend.pageTextStyle.color", "string") ||"#333333";
		legendpageTextStyleColor = legendpageTextStyleColor == "transparent" ? "rgba(0,0,0,0)" : legendpageTextStyleColor;
		var legendpageTextStyleFontSize = haveValue(ochartOption, "legend.pageTextStyle.fontSize", "number");
		legendpageTextStyleFontSize = legendpageTextStyleFontSize == null ? 12 : legendpageTextStyleFontSize;
		var legendPlace = ochartOption.legendPlace || "common";
		var legendLeft = haveValue(ochartOption, "legend.left", "string");
		var legendLeft1 =  parseInt(legendLeft);
		var legendTop = haveValue(ochartOption, "legend.top", "string");
		var legendTop1 =  parseInt(legendTop);
		var legendPadding = haveValue(ochartOption, "legend.padding", "number");
		legendPadding = legendPadding == null ? 5 : legendPadding;
		var legendItemGap = haveValue(ochartOption, "legend.itemGap", "number");
		legendItemGap = legendItemGap == null ? 10 : legendItemGap;
		var legendItemWidth = haveValue(ochartOption, "legend.itemWidth", "number");
		legendItemWidth = legendItemWidth == null ? 25 : legendItemWidth;
		var legendItemHeight = haveValue(ochartOption, "legend.itemHeight", "number");
		legendItemHeight = legendItemHeight == null ? 14 : legendItemHeight;
		var legendSelectedMode = haveValue(ochartOption, "legend.selectedMode", "string") || "multiple";
		var legendInactiveColor = haveValue(ochartOption, "legend.inactiveColor", "string") || haveValue(theme, "legend.inactiveColor", "string") || "#cccccc";
		var legendTextStyleColor = haveValue(ochartOption, "legend.textStyle.color", "string") || haveValue(theme, "legend.textStyle.color", "string") ||"#333333";
		var legendTextStyleFontSize = haveValue(ochartOption, "legend.textStyle.fontSize", "number");
		legendTextStyleFontSize =  legendTextStyleFontSize == null ? 12 : legendTextStyleFontSize;
		var legendBackgroundColor = haveValue(ochartOption, "legend.backgroundColor", "string") || haveValue(theme, "legend.backgroundColor", "string");
		var legendBorderWidth =  haveValue(ochartOption, "legend.borderWidth", "number") || 0;
		var legendBorderRadius = haveValue(ochartOption, "legend.borderRadius", "number") || 0;
		var legendBorderColor = haveValue(ochartOption, "legend.borderColor", "string") || haveValue(theme, "legend.borderColor", "string") || "#cccccc";
		var legendShadowBlur = haveValue(ochartOption, "legend.shadowBlur", "number") || 0;
		var legendShadowColor = haveValue(ochartOption, "legend.shadowColor", "string") || haveValue(theme, "legend.shadowColor", "string") || "rgba(0, 0, 0, 0.5)";
		var legendShadowOffsetX = haveValue(ochartOption, "legend.shadowOffsetX", "number") || 0;
		var legendShadowOffsetY = haveValue(ochartOption, "legend.shadowOffsetY", "number") || 0;
		athis.legendObj = {
			Show: legendShow,
			Type: haveValue(ochartOption, "legend.type", "string") || "plain",
			Typescroll: haveValue(ochartOption, "legend.Typescroll", "string") || "",
			PageButtonItemGap: legendPageButtonItemGap,
			PageButtonItemGap1: legendPageButtonItemGap,
			PageButtonGap: legendPageButtonGap,
			PageButtonGap1: legendPageButtonGap,
			PageButtonPosition: haveValue(ochartOption, "legend.pageButtonPosition", "string") || "end",
			PageIconColor: legendPageIconColor,
			PageIconInactiveColor: legendPageIconInactiveColor,
			PageIconSize: legendPageIconSize,
			PageIconSize1: legendPageIconSize,
			pageTextStyleColor: legendpageTextStyleColor,
			pageTextStyleFontSytle: haveValue(ochartOption, "legend.pageTextStyle.fontStyle", "string") || "normal",
			pageTextStyleFontWeight: haveValue(ochartOption, "legend.pageTextStyle.fontWeight", "string") || "normal",
			pageTextStyleFontFamily: haveValue(ochartOption, "legend.pageTextStyle.fontFamily", "string") || "sans-serif",
			pageTextStyleFontSize: legendpageTextStyleFontSize,
			pageTextStyleFontSize1: legendpageTextStyleFontSize,
			Place: legendPlace,		
			Align: haveValue(ochartOption, "legend.align", "string") || "auto",
			Orient: haveValue(ochartOption, "legend.orient", "string") || "horizontal",
			Padding: legendPadding,
			Padding1: legendPadding,
			ItemGap: legendItemGap,
			ItemGap1: legendItemGap,
			ItemWidth: legendItemWidth,
			ItemWidth1: legendItemWidth,
			ItemHeight: legendItemHeight,
			ItemHeight1: legendItemHeight,
			SelectedMode:  legendSelectedMode,
			InactiveColor: legendInactiveColor == "transparent" ? "rgba(0,0,0,0)" : legendInactiveColor,
			// 文本
			ActiveNames: haveValue(ochartOption, "legend.ActiveNames", "string") || "",
			TextStyleColor: legendTextStyleColor == "transparent" ? "rgba(0,0,0,0)" : legendTextStyleColor,
			TextStyleFontSytle: haveValue(ochartOption, "legend.textStyle.fontStyle", "string") || "normal",
			TextStyleFontWeight: haveValue(ochartOption, "legend.textStyle.fontWeight", "string") || "normal",
			TextStyleFontFamily: haveValue(ochartOption, "legend.textStyle.fontFamily", "string") || "sans-serif",
			TextStyleFontSize: legendTextStyleFontSize,
			TextStyleFontSize1: legendTextStyleFontSize,
			BackgroundColor: legendBackgroundColor == "transparent" ? "rgba(0,0,0,0)" : legendBackgroundColor,
			BorderWidth: legendBorderWidth,
			BorderWidth1: legendBorderWidth,
			BorderRadius: legendBorderRadius,
			BorderRadius1: legendBorderRadius,
			BorderColor: legendBorderColor == "transparent" ? "rgba(0,0,0,0)" : legendBorderColor,
			ShadowBlur: legendShadowBlur,
			ShadowBlur1: legendShadowBlur,
			ShadowColor: legendShadowColor == "transparent" ? "rgba(0,0,0,0)" : legendShadowColor,
			ShadowOffsetX: legendShadowOffsetX,
			ShadowOffsetX1: legendShadowOffsetX,
			ShadowOffsetY: legendShadowOffsetY,
			ShadowOffsetY1: legendShadowOffsetY,
			Left: 0,
			Left1: 0,
			Left2: "center",
			Top: 0,
			Top1: 0,
			Top2: "top"
		}
		if(legendPlace == "common"){
			athis.legendObj.Left2 =  legendLeft || "center";
			athis.legendObj.Top2 = legendTop || "top";
		}else{
			athis.legendObj.Left = legendLeft1 == null ? 0 : legendLeft1;
			athis.legendObj.Left1 = legendLeft1 == null ? 0 : legendLeft1;
			athis.legendObj.Top = legendTop1 || 0;
			athis.legendObj.Top1 = legendTop1 || 0;
		}
	}else{
		var visualMapType = haveValue(ochartOption, "visualMap.type", "string") || "piecewise";
		var visualMapShow = haveValue(ochartOption, "visualMap.show", "boolean");
		var visualMapHoverLink = haveValue(ochartOption, "visualMap.hoverLink", "boolean");	
		var visualMapInverse = haveValue(ochartOption, "visualMap.inverse", "boolean");	
		var visualMapItemHeight = haveValue(ochartOption, "visualMap.itemHeight", "number");
		var visualMapPrecision = haveValue(ochartOption, "visualMap.precision", "number") || 0;
		var visualMapItemWidth = haveValue(ochartOption, "visualMap.itemWidth", "number");
		visualMapItemWidth = visualMapItemWidth == null ? 20 : visualMapItemWidth;	
		var Padding = haveValue(ochartOption, "visualMap.padding", "number");
		Padding = Padding == null ? 20 : Padding;	
		var visualMapOrient = haveValue(ochartOption, "visualMap.orient", "string") || "vertical";
		var visualMapPlace = ochartOption.visualMapPlace || "common";
		var visualMapMin = haveValue(ochartOption, "visualMap.min", "number");
		var visualMapMax = haveValue(ochartOption, "visualMap.max", "number");
		var visualMapLeft = haveValue(ochartOption, "visualMap.left", "string");
		var visualMapLeft1 =  parseInt(visualMapLeft);
		var visualMapTop = haveValue(ochartOption, "visualMap.top", "string");
		var visualMapTop1 =  parseInt(visualMapTop);
		// 文本
		var visualMapTextStyleColor = haveValue(ochartOption, "visualMap.textStyle.color", "string") || haveValue(theme, "visualMap.textStyle.color", "string") ||"#333333";
		var visualMapTextStyleFontSize = haveValue(ochartOption, "visualMap.textStyle.fontSize", "number");
		visualMapTextStyleFontSize = visualMapTextStyleFontSize == null ? 12 : visualMapTextStyleFontSize;
		var visualMapBackgroundColor = haveValue(ochartOption, "visualMap.backgroundColor", "string") || haveValue(theme, "visualMap.backgroundColor", "string");
		var visualMapBorderWidth =  haveValue(ochartOption, "visualMap.borderWidth", "number") || 0;
		var visualMapBorderColor = haveValue(ochartOption, "visualMap.borderColor", "string") || haveValue(theme, "visualMap.borderColor", "string") || "#cccccc";
		var RangeType = haveValue(ochartOption, "visualMap.RangeType", "string") || "inRange";		
		athis.visualMapObj = {
			Show: visualMapShow == null ? true : visualMapShow,
			HoverLink: visualMapHoverLink == null ? true : visualMapHoverLink,
			Inverse: visualMapInverse == null ? false : visualMapInverse,
			Precision: visualMapPrecision,
			Precision1: visualMapPrecision,
			ItemWidth: visualMapItemWidth,
			ItemWidth1: visualMapItemWidth,
			ItemHeight: 14,
			ItemHeight1: 14, 
			Padding: Padding,
			Padding1: Padding,
			Orient: visualMapOrient,
			Place: visualMapPlace,
			Min: visualMapMin,
			Max: visualMapMax,
			ActiveNames: haveValue(ochartOption, "visualMap.ActiveNames", "string") || "",
			TextStyleColor: visualMapTextStyleColor == "transparent" ? "rgba(0,0,0,0)" : visualMapTextStyleColor,
			TextStyleFontSytle: haveValue(ochartOption, "visualMap.textStyle.fontStyle", "string") || "normal",
			TextStyleFontWeight: haveValue(ochartOption, "visualMap.textStyle.fontWeight", "string") || "normal",
			TextStyleFontFamily: haveValue(ochartOption, "visualMap.textStyle.fontFamily", "string") || "sans-serif",
			TextStyleFontSize: visualMapTextStyleFontSize,
			TextStyleFontSize1: visualMapTextStyleFontSize,
			BackgroundColor: visualMapBackgroundColor == "transparent" ? "rgba(0,0,0,0)" : visualMapBackgroundColor,
			BorderWidth: visualMapBorderWidth,
			BorderWidth1: visualMapBorderWidth,
			BorderColor: visualMapBorderColor == "transparent" ? "rgba(0,0,0,0)" : visualMapBorderColor,
			Align: haveValue(ochartOption, "visualMap.align", "string") || "auto",
			ItemHeightMax:100,
			selectedMode:"multiple",
			Calculable: false,
			Realtime: true,
			Left: 0,
			Left1: 0,
			Left2: "center",
			Top: 0,
			Top1: 0,
			Top2: "top",
			rangeList: [
				{
					name:"选中范围中",
					visualMapRange: "inRange"
				},
				{
					name:"选中范围外",
					visualMapRange: "outOfRange"
				}
			],
			visualMapSymbol: "inRange",
			visualMapSymbolSize: 10,
			visualMapSymbolSize1: 10,
			RangeColorList: [],
			visualMapRange: "",
			piecesList: [],
			piecesIndex: 1,
			visualMapPiecesMin: "",
			visualMapPiecesMax: "",
			visualMapPiecesSymbol: "",
			visualMapPiecesSymbolSize: 10,
			visualMapPiecesSymbolSize1: 10,
			visualMapPiecesSymbolColor: ""
		}
		if(visualMapType == "continuous"){
			$("#continuous").show();
			$("#piecewise").hide();
			$(".piecewiseSymbol").hide();
			$("#pieces").hide();
			// 连续
			var visualMapCalculable = haveValue(ochartOption, "visualMap.calculable", "boolean");
			Calculable = visualMapCalculable == null ? false : visualMapCalculable;
			var visualMapRealtime = haveValue(ochartOption, "visualMap.realtime", "boolean");
			Realtime = visualMapRealtime == null ? true : visualMapRealtime;
			if(visualMapOrient == "vertical"){
				athis.align1 = "left";
				athis.align2 = "right";
			}else{
				athis.align1 = "top";
				athis.align2 = "bottom";
			}
			var visualMapItemHeight = visualMapItemHeight == null ? 140 : visualMapItemHeight;
			athis.visualMapObj.ItemHeightMax = 200;
			athis.visualMapObj.ItemHeight = visualMapItemHeight;
			athis.visualMapObj.ItemHeight1 = visualMapItemHeight;
		}else{
			athis.align1 = "left";
			athis.align2 = "right";
			var piecesList = [];
			ochartOption.visualMap.pieces.forEach(function(item, i){
				piecesList.push({
					name: "分段"+(i+1)
				});
			});
			if(piecesList.length >0){
				$("#pieces").show();
				athis.visualMapObj.piecesList = piecesList;
				piecesFun(athis, ochartOption);
			}else{
				$("#pieces").hide();
			}
			$("#continuous").hide();
			$("#piecewise").show();
			$(".piecewiseSymbol").show();
			// 分段
			var visualMapItemHeight = visualMapItemHeight == null ? 14 : visualMapItemHeight;
			athis.visualMapObj.ItemHeightMax = 100;
			athis.visualMapObj.ItemHeight = visualMapItemHeight;
			athis.visualMapObj.ItemHeight1 = visualMapItemHeight;
			athis.visualMapObj.selectedMode = haveValue(ochartOption, "visualMap.selectedMode", "string") || "multiple";
		}
		// 组件位置
		if(visualMapPlace == "common"){
			athis.visualMapObj.Left2 =  visualMapLeft || "left";
			athis.visualMapObj.Top2 = visualMapTop || "bottom";
		}else{
			athis.visualMapObj.Left = visualMapLeft1 == null ? 0 : visualMapLeft1;
			athis.visualMapObj.Left1 = visualMapLeft1 == null ? 0 : visualMapLeft1;
			athis.visualMapObj.Top = visualMapTop1 || 0;
			athis.visualMapObj.Top1 = visualMapTop1 || 0;
		}
		// 组件选中与未选中范围
		rangeFun(athis, ochartOption)
	}	
}
// 视觉映射范围
function rangeFun(athis, ochartOption){
	var visualMapRange = haveValue(ochartOption, "visualMap.visualMapRange", "string") || "inRange";
	athis.visualMapObj.visualMapRange = visualMapRange;
	athis.visualMapObj.visualMapSymbol = haveValue(ochartOption, "visualMap."+visualMapRange+".symbol", "string") || "circle";
	var visualMapSymbolSize =  haveValue(ochartOption, "visualMap."+visualMapRange+".symbolSize", "number");
	visualMapSymbolSize = visualMapSymbolSize == null ? 10 : visualMapSymbolSize;
	athis.visualMapObj.visualMapSymbolSize = visualMapSymbolSize;
	athis.visualMapObj.visualMapSymbolSize1 = visualMapSymbolSize;
	athis.visualMapObj.visualMapPiecesSymbolColor = haveValue(ochartOption, "visualMap."+visualMapRange+".color", "string");
	athis.visualMapObj.RangeColorList = RangeColorFun(ochartOption, visualMapRange);
}
// 视觉映射分段
function piecesFun(athis, ochartOption){
	var piecesIndex = haveValue(ochartOption, "visualMap.piecesIndex", "number") || 0;
	athis.visualMapObj.piecesIndex = piecesIndex;
	athis.visualMapObj.visualMapPiecesMin = haveValue(ochartOption, "visualMap.pieces."+piecesIndex+".min", "number");
	athis.visualMapObj.visualMapPiecesMax = haveValue(ochartOption, "visualMap.pieces."+piecesIndex+".max", "number");
	athis.visualMapObj.visualMapPiecesSymbol = haveValue(ochartOption, "visualMap.pieces."+piecesIndex+".symbol", "string");
	var visualMapPiecesSymbolSize =  haveValue(ochartOption, "visualMap.pieces."+piecesIndex+".symbolSize", "number");
	visualMapPiecesSymbolSize = visualMapPiecesSymbolSize == null ? 10 : visualMapPiecesSymbolSize;
	athis.visualMapObj.visualMapPiecesSymbolSize = visualMapPiecesSymbolSize;
	athis.visualMapObj.visualMapPiecesSymbolSize1 = visualMapPiecesSymbolSize;
	athis.visualMapObj.visualMapPiecesSymbolColor = haveValue(ochartOption, "visualMap.pieces."+piecesIndex+".color", "string");
}
// 提示
function tooltip(athis, ochartOption){
	var tooltipShow = haveValue(ochartOption, "tooltip.show", "boolean");
	var tooltipShowContent = haveValue(ochartOption, "tooltip.showContent", "boolean");
	var tooltipAlwaysShowContent = haveValue(ochartOption, "tooltip.alwaysShowContent", "boolean") || false;
	var tooltipShowDelay = haveValue(ochartOption, "tooltip.showDelay", "number") || 0;
	var tooltipHideDelay = haveValue(ochartOption, "tooltip.hideDelay", "number");
	tooltipHideDelay = tooltipHideDelay == null ? 100 : tooltipHideDelay;
	var tooltipEnterable = haveValue(ochartOption, "tooltip.enterable", "boolean") || false;
	var tooltipConfine = haveValue(ochartOption, "tooltip.confine", "boolean") || false;
	var tooltipTransitionDuration = haveValue(ochartOption, "tooltip.transitionDuration", "number");
	tooltipTransitionDuration = tooltipTransitionDuration == null ? 0.4 : tooltipTransitionDuration;
	// 文本	
	var tooltiptextStyleColor = haveValue(ochartOption, "tooltip.textStyle.color", "string") || haveValue(theme, "tooltip.textStyle.color", "string") || "#ffffff";
	var tooltiptextStyleFontSize = haveValue(ochartOption, "tooltip.textStyle.fontSize", "number");
	tooltiptextStyleFontSize = tooltiptextStyleFontSize == null ? 14 : tooltiptextStyleFontSize;
	var tooltipBackgroundColor = haveValue(ochartOption, "tooltip.backgroundColor", "string") || haveValue(theme, "tooltip.backgroundColor", "string") || "rgba(50,50,50,0.7)";
	var tooltipBorderWidth = haveValue(ochartOption, "tooltip.borderWidth", "number") || 0;
	var tooltipBorderRadius = haveValue(ochartOption, "tooltip.BorderRadius", "number") || 0;
	var tooltipBorderColor = haveValue(ochartOption, "tooltip.borderColor", "string") || haveValue(theme, "tooltip.borderColor", "string") || "#333333";
	// 折叠 指示器
	var tooltipPointerSnap = haveValue(ochartOption, "tooltip.axisPointer.snap", "boolean")
	var tooltipPointerType = haveValue(ochartOption, "tooltip.axisPointer.type", "string") || "line";
	// 提示直线
	var lineActiveName = haveValue(ochartOption, "lineActiveName", "string") || "ordinary";
	var axisPointerlineStyleWidth = haveValue(ochartOption, "tooltip.axisPointer.lineStyle.width", "number");
	axisPointerlineStyleWidth = axisPointerlineStyleWidth == null ? 1 : axisPointerlineStyleWidth;
	var axisPointerlineStyleShadowBlur = haveValue(ochartOption, "tooltip.axisPointer.lineStyle.shadowBlur", "number") || 0;
	var axisPointerlineStyleShadowColor = haveValue(ochartOption, "tooltip.axisPointer.lineStyle.shadowColor", "string") || "#555555";
	var axisPointerlineStyleShadowOffsetX = haveValue(ochartOption, "tooltip.axisPointer.lineStyle.shadowOffsetX", "number") || 0;
	var axisPointerlineStyleShadowOffsetY = haveValue(ochartOption, "tooltip.axisPointer.lineStyle.shadowOffsetY", "number") || 0;
	// 提示十字准星
	var crossActiveName = haveValue(ochartOption, "crossActiveName", "string") || "ordinary";
	var axisPointercrossStyleWidth = haveValue(ochartOption, "tooltip.axisPointer.crossStyle.width", "number");
	axisPointercrossStyleWidth = axisPointercrossStyleWidth == null ? 1 : axisPointercrossStyleWidth;
	var axisPointercrossStyleShadowBlur = haveValue(ochartOption, "tooltip.axisPointer.crossStyle.shadowBlur", "number") || 0;
	var axisPointercrossStyleShadowColor = haveValue(ochartOption, "tooltip.axisPointer.crossStyle.shadowColor", "string") || haveValue(theme, "tooltip.axisPointer.crossStyle.shadowColor", "string") || "#555555";
	var axisPointercrossStyleShadowOffsetX = haveValue(ochartOption, "tooltip.axisPointer.crossStyle.shadowOffsetX", "number") || 0;
	var axisPointercrossStyleShadowOffsetY = haveValue(ochartOption, "tooltip.axisPointer.crossStyle.shadowOffsetY", "number") || 0;
	// 提示阴影
	var shadowActiveName = haveValue(ochartOption, "shadowActiveName", "string") || "ordinary";
	var axisPointershadowStyleShadowBlur = haveValue(ochartOption, "tooltip.axisPointer.shadowStyle.shadowBlur", "number") || 0;
	var axisPointershadowStyleShadowColor = haveValue(ochartOption, "tooltip.axisPointer.shadowStyle.shadowColor", "string") || haveValue(theme, "tooltip.axisPointer.shadowStyle.shadowColor", "string") || "#555555";
	var axisPointershadowStyleShadowOffsetX = haveValue(ochartOption, "tooltip.axisPointer.shadowStyle.shadowOffsetX", "number") || 0;
	var axisPointershadowStyleShadowOffsetY = haveValue(ochartOption, "tooltip.axisPointer.shadowStyle.shadowOffsetY", "number") || 0;
	// label
	var axisPointerlabelMargin = haveValue(ochartOption, "tooltip.axisPointer.label.margin", "number");
	axisPointerlabelMargin = axisPointerlabelMargin == null ? 3 : axisPointerlabelMargin;
	var axisPointerlabelBackgroundColor = haveValue(ochartOption, "tooltip.axisPointer.label.backgroundColor", "string") || haveValue(theme, "tooltip.axisPointer.lineStyle.color", "string");
	var axisPointerlabelBorderWidth = haveValue(ochartOption, "tooltip.axisPointer.label.borderWidth", "number") || 0;
	var axisPointerlabelBorderRadius = haveValue(ochartOption, "tooltip.axisPointer.label.borderRadius", "number") || 0;
	var axisPointerlabelBorderColor = haveValue(ochartOption, "tooltip.axisPointer.label.borderColor", "string") || haveValue(theme, "tooltip.axisPointer.label.borderColor", "string");
	var axisPointerlabelShadowBlur = haveValue(ochartOption, "tooltip.axisPointer.label.shadowBlur", "number") || 0;
	var axisPointerlabelShadowColor = haveValue(ochartOption, "tooltip.axisPointer.label.shadowColor", "string") || haveValue(theme, "tooltip.axisPointer.label.shadowColor", "string") || "#555555";
	var axisPointerlabelShadowOffsetX = haveValue(ochartOption, "tooltip.axisPointer.label.shadowOffsetX", "number") || 0;
	var axisPointerlabelShadowOffsetY = haveValue(ochartOption, "tooltip.axisPointer.label.shadowOffsetY", "number") || 0;
	// 文本折叠
	var axisPointerlabeltextStyleColor = haveValue(ochartOption, "tooltip.axisPointer.label.textStyle.color", "string") || haveValue(theme, "tooltip.axisPointer.label.textStyle.color", "string") || "#ffffff";
	var axisPointerlabeltextStyleFontSize = haveValue(ochartOption, "tooltip.axisPointer.label.textStyle.fontSize", "number");
	axisPointerlabeltextStyleFontSize = axisPointerlabeltextStyleFontSize == null ? 12 : axisPointerlabeltextStyleFontSize;
	athis.tooltipObj = {
		CrossStyle:false,
		LineStyle:false,
		ShadowStyle:false,
		Show: tooltipShow == null ? false : tooltipShow,
		Formatter: haveValue(ochartOption, "tooltip.formatter", "string") || "",
		Trigger: haveValue(ochartOption, "tooltip.trigger", "string") || "none",
		axisTrigger: haveValue(ochartOption, "tooltip.axisTrigger", "string") || "",
		ShowContent: tooltipShowContent == null ? true : tooltipShowContent,
		AlwaysShowContent: tooltipAlwaysShowContent,
		TriggerOn: haveValue(ochartOption, "tooltip.triggerOn", "string") || "mousemove|click",
		ShowDelay: tooltipShowDelay,
		ShowDelay1: tooltipShowDelay,
		HideDelay: tooltipHideDelay,
		HideDelay1: tooltipHideDelay,
		Enterable: tooltipEnterable,
		Confine: tooltipConfine,
		TransitionDuration: tooltipTransitionDuration,
		TransitionDuration1: tooltipTransitionDuration,
		ActiveNames: "",
		textStyleColor: tooltiptextStyleColor == "transparent" ? "rgba(0,0,0,0)" : tooltiptextStyleColor,
		textStyleFontSytle: haveValue(ochartOption, "tooltip.textStyle.fontStyle", "string") || "normal",
		textStyleFontWeight: haveValue(ochartOption, "tooltip.textStyle.fontWeight", "string") || "normal",
		textStyleFontFamily: haveValue(ochartOption, "tooltip.textStyle.fontFamily", "string") || "sans-serif",
		textStyleFontSize: tooltiptextStyleFontSize,
		textStyleFontSize1: tooltiptextStyleFontSize,
		BackgroundColor: tooltipBackgroundColor == "transparent" ? "rgba(0,0,0,0)" : tooltipBackgroundColor,
		BorderWidth: tooltipBorderWidth,
		BorderWidth1: tooltipBorderWidth,
		BorderRadius: tooltipBorderRadius,
		BorderRadius1: tooltipBorderRadius,
		BorderColor: tooltipBorderColor == "transparent" ? "rgba(0,0,0,0)" : tooltipBorderColor,
		PointerSnap: tooltipPointerSnap == null ? true : tooltipPointerSnap,
		PointerType: tooltipPointerType,
		AxisPointer: tooltipPointerType,
		// 直线
		lineActiveName: lineActiveName,
		lineStyleColor:"",
		gradationAxisPointerColor:"",
		gradationAxislineStyleColor:"",
		gradationLine:"linear",
		lineStyleWidth: axisPointerlineStyleWidth,
		lineStyleWidth1: axisPointerlineStyleWidth,
		lineStyleType: haveValue(ochartOption, "tooltip.axisPointer.lineStyle.type", "string") || "solid",
		lineStyleShadowBlur: axisPointerlineStyleShadowBlur,
		lineStyleShadowBlur1: axisPointerlineStyleShadowBlur,
		lineStyleShadowColor: axisPointerlineStyleShadowColor,
		lineStyleShadowOffsetX: axisPointerlineStyleShadowOffsetX,
		lineStyleShadowOffsetX1: axisPointerlineStyleShadowOffsetX,
		lineStyleShadowOffsetY: axisPointerlineStyleShadowOffsetY,
		lineStyleShadowOffsetY1: axisPointerlineStyleShadowOffsetY,
		// 十字
		crossActiveName:crossActiveName,
		crossStyleColor:"",
		gradationcrossPointerColor:"",
		gradationAxiscrossStyleColor:"",
		gradationCross:"linear",
		crossStyleWidth: axisPointercrossStyleWidth,
		crossStyleWidth1: axisPointercrossStyleWidth,
		crossStyleType: haveValue(ochartOption, "tooltip.axisPointer.crossStyle.type", "string") || "dashed",
		crossStyleShadowBlur: axisPointercrossStyleShadowBlur,
		crossStyleShadowBlur1: axisPointercrossStyleShadowBlur,
		crossStyleShadowColor: axisPointercrossStyleShadowColor == "transparent" ? "rgba(0,0,0,0)" : axisPointercrossStyleShadowColor,
		crossStyleShadowOffsetX: axisPointercrossStyleShadowOffsetX,
		crossStyleShadowOffsetX1: axisPointercrossStyleShadowOffsetX,
		crossStyleShadowOffsetY: axisPointercrossStyleShadowOffsetY,
		crossStyleShadowOffsetY1: axisPointercrossStyleShadowOffsetY,
		// 阴影
		shadowActiveName:shadowActiveName,
		shadowStyleColor:"",
		gradationshadowPointerColor:"",
		gradationAxisshadowStyleColor:"",
		gradationShadow:"linear",
		shadowStyleShadowBlur: axisPointershadowStyleShadowBlur,
		shadowStyleShadowBlur1: axisPointershadowStyleShadowBlur,
		shadowStyleShadowColor: axisPointershadowStyleShadowColor == "transparent" ? "rgba(0,0,0,0)" : axisPointershadowStyleShadowColor,
		shadowStyleShadowOffsetX: axisPointershadowStyleShadowOffsetX,
		shadowStyleShadowOffsetX1: axisPointershadowStyleShadowOffsetX,
		shadowStyleShadowOffsetY: axisPointershadowStyleShadowOffsetY,
		shadowStyleShadowOffsetY1: axisPointershadowStyleShadowOffsetY,
		// 标签
		labelMargin: axisPointerlabelMargin,
		labelMargin1: axisPointerlabelMargin,
		labeltextStyleColor: axisPointerlabeltextStyleColor == "transparent" ? "rgba(0,0,0,0)" : axisPointerlabeltextStyleColor,
		labeltextStyleFontSytle: haveValue(ochartOption, "tooltip.axisPointer.label.textStyle.fontStyle", "string") || "normal",
		labeltextStyleFontWeight: haveValue(ochartOption, "tooltip.axisPointer.label.textStyle.fontWeight", "string") || "normal",
		labeltextStyleFontFamily: haveValue(ochartOption, "tooltip.axisPointer.label.textStyle.fontFamily", "string") || "sans-serif",
		labeltextStyleFontSize: axisPointerlabeltextStyleFontSize,
		labeltextStyleFontSize1: axisPointerlabeltextStyleFontSize,	
		labelBackgroundColor: axisPointerlabelBackgroundColor == "transparent" ? "rgba(0,0,0,0)" : axisPointerlabelBackgroundColor,
		labelBorderWidth: axisPointerlabelBorderWidth,
		labelBorderWidth1: axisPointerlabelBorderWidth,
		labelBorderRadius: axisPointerlabelBorderRadius,
		labelBorderRadius1: axisPointerlabelBorderRadius,
		labelBorderColor: axisPointerlabelBorderColor == "transparent" ? "rgba(0,0,0,0)" : axisPointerlabelBorderColor,
		labelShadowBlur: axisPointerlabelShadowBlur,
		labelShadowBlur1: axisPointerlabelShadowBlur,
		labelShadowColor: axisPointerlabelShadowColor == "transparent" ? "rgba(0,0,0,0)" : axisPointerlabelShadowColor,
		labelShadowOffsetX: axisPointerlabelShadowOffsetX,
		labelShadowOffsetX1: axisPointerlabelShadowOffsetX,
		labelShadowOffsetY: axisPointerlabelShadowOffsetY,
		labelShadowOffsetY1: axisPointerlabelShadowOffsetY
	}
	if(lineActiveName == "ordinary"){
		var axisPointerlineStyleColor = haveValue(ochartOption, "tooltip.axisPointer.lineStyle.color", "string") || haveValue(theme, "tooltip.axisPointer.lineStyle.color", "string") || "#555555";
		athis.tooltipObj.lineStyleColor = axisPointerlineStyleColor == "transparent" ? "rgba(0,0,0,0)" : axisPointerlineStyleColor;
	}else{
		var gradationAxisPointerColor = haveValue(ochartOption, "tooltip.axisPointer.lineStyle.color", "object", 0, null, "color");
		athis.tooltipObj.gradationAxisPointerColor = gradationAxisPointerColor;
		var gradationAxislineStyleColor = haveValue(ochartOption, "tooltip.axisPointer.lineStyle.color", "object", 1, null, "color");
		athis.tooltipObj.gradationAxislineStyleColor = gradationAxislineStyleColor;
		athis.tooltipObj.gradationLine = haveValue(ochartOption, "tooltip.axisPointer.lineStyle.color", "object") || "linear";
	}
	if(crossActiveName == "ordinary"){
		var axisPointercrossStyleColor = haveValue(ochartOption, "tooltip.axisPointer.crossStyle.color", "string") || haveValue(theme, "tooltip.axisPointer.crossStyle.color", "string") || "#555555";
		athis.tooltipObj.crossStyleColor = axisPointercrossStyleColor == "transparent" ? "rgba(0,0,0,0)" : axisPointercrossStyleColor;
	}else{
		var gradationcrossPointerColor = haveValue(ochartOption, "tooltip.axisPointer.crossStyle.color", "object", 0, null, "color");
		athis.tooltipObj.gradationcrossPointerColor = gradationcrossPointerColor;
		var gradationAxiscrossStyleColor = haveValue(ochartOption, "tooltip.axisPointer.crossStyle.color", "object", 1, null, "color");
		athis.tooltipObj.gradationAxiscrossStyleColor = gradationAxiscrossStyleColor;
		athis.tooltipObj.gradationCross = haveValue(ochartOption, "tooltip.axisPointer.crossStyle.color", "object") || "linear";
	}
	if(shadowActiveName == "ordinary"){
		var axisPointershadowStyleColor = haveValue(ochartOption, "tooltip.axisPointer.shadowStyle.color", "string") || haveValue(theme, "tooltip.axisPointer.shadowStyle.color", "string") || "rgba(150,150,150,0.3)";
		athis.tooltipObj.shadowStyleColor = axisPointershadowStyleColor == "transparent" ? "rgba(0,0,0,0)" : axisPointershadowStyleColor;
	}else{
		var gradationshadowPointerColor = haveValue(ochartOption, "tooltip.axisPointer.shadowStyle.color", "object", 0, null, "color");
		athis.tooltipObj.gradationshadowPointerColor = gradationshadowPointerColor;
		var gradationAxisshadowStyleColor = haveValue(ochartOption, "tooltip.axisPointer.shadowStyle.color", "object", 1, null, "color");
		athis.tooltipObj.gradationAxisshadowStyleColor = gradationAxisshadowStyleColor;
		athis.tooltipObj.gradationShadow = haveValue(ochartOption, "tooltip.axisPointer.shadowStyle.color", "object") || "linear";
	}
	tooltipAxisPointer(athis, tooltipPointerType, ochartOption);
	athis.tooltipObj.pointer = haveValue(ochartOption, "tooltip.pointer", "string") || tooltipPointerType;
}
function tooltipAxisPointer(athis, val, bItom){
	athis.tooltipObj.CrossStyle = true;
	athis.tooltipObj.ShadowStyle = true;
	athis.tooltipObj.LineStyle = true;
	var axisPointerlabelShow = haveValue(bItom, "tooltip.axisPointer.label.show", "boolean",null, null, "switch");
	if(val == "cross"){
		athis.tooltipObj.LineStyle = false;
		athis.tooltipObj.CrossStyle = false;
		labelShow = axisPointerlabelShow == null ? true : axisPointerlabelShow;
	}else{
		if(val == "shadow"){
			athis.tooltipObj.ShadowStyle = false;
		}else{
			athis.tooltipObj.LineStyle = false;
		}
		labelShow = axisPointerlabelShow == null ? false : axisPointerlabelShow;
	}
}
// 系列
function seriesListArr(athis, ochartOption, oitem){
	var seriesList = [];
	var seriesIndex = parseInt(haveValue(ochartOption, "seriesIndex", "number")) || 0;
	ochartOption.series.forEach(function (item, i){
		seriesList.push({name:"系列"+(i+1)});
	});
	var chartType = oitem.chartType;
	var staticType = oitem.staticOption.staticType;
	var type = haveValue(ochartOption, "series."+seriesIndex+".type", "string");
	if(chartType == "text"){
		textSeriesFun(ochartOption, 0, athis, type);
	}else if(chartType == "table"){
		seriesList=[{name:"系列1"}];
		tableSeriesFun(ochartOption, 0, athis, type);
	}else{
		if(staticType != "heatmap"){
			seriesTypeHide();
			echartSeriesFun(ochartOption, seriesIndex, athis, type);
		}
	}
	athis.seriesObj.seriesList = seriesList;
	athis.seriesIndex = seriesIndex;
}
// text 系列
function textSeriesFun(ochartOption, i, athis, type){
	var textList = ["textStyle", "subtextStyle", "untextStyle"];
	textList.forEach(function(item){
		var name = haveValue(ochartOption, "series."+i+"."+item+".name", "string") || "";
		var exclusive = haveValue(ochartOption, "series."+i+"."+item+".exclusive", "boolean");
		var fontFamily = haveValue(ochartOption, "series."+i+"."+item+".fontFamily", "string") || "sans-serif";
		var color = haveValue(ochartOption, "series."+i+"."+item+".color", "string") || "";
		var fontSize = haveValue(ochartOption, "series."+i+"."+item+".fontSize", "number");
		fontSize = fontSize == null ? 18 : fontSize;
		var letterSpacing = haveValue(ochartOption, "series."+i+"."+item+".letterSpacing", "number") || 0;
		var fontStyle = haveValue(ochartOption, "series."+i+"."+item+".fontSytle", "string") || "normal";
		var fontWeight = haveValue(ochartOption, "series."+i+"."+item+".fontWeight", "string") || "normal";
		var top = haveValue(ochartOption, "series."+i+"."+item+".padding.top", "number") || 0;
		var bottom = haveValue(ochartOption, "series."+i+"."+item+".padding.bottom", "number") || 0;
		var left = haveValue(ochartOption, "series."+i+"."+item+".padding.left", "number") || 0;
		var right = haveValue(ochartOption, "series."+i+"."+item+".padding.right", "number") || 0;
		var backgroundColor = haveValue(ochartOption, "series."+i+"."+item+".backgroundColor", "string") || "";
		var borderWidth = haveValue(ochartOption, "series."+i+"."+item+".borderWidth", "number") || 0;
		var borderRadius = haveValue(ochartOption, "series."+i+"."+item+".borderRadius", "number") || 0;
		var borderColor = haveValue(ochartOption, "series."+i+"."+item+".borderColor", "string") || "";
		athis.seriesObj.text[item] = {
			name:name,
			exclusive: exclusive == null ? false : exclusive,
			fontFamily: fontFamily,
			color: color,
			fontSize: fontSize,
			fontSize1: fontSize,
			letterSpacing: letterSpacing,
			letterSpacing1: letterSpacing,
			fontStyle: fontStyle,
			fontWeight: fontWeight,
			padding:{
				top: top ,
				top1: top,
				bottom: bottom,
				bottom1: bottom,
				left: left,
				left1: left,
				right: right,
				right1: right,
			},
			backgroundColor: backgroundColor,
			borderWidth: borderWidth,
			borderWidth1: borderWidth,
			borderRadius: borderRadius,
			borderRadius1: borderRadius,
			borderColor: borderColor
		}
		athis.seriesObj.text.nameSelect = haveValue(ochartOption, "nameSelect", "string") || "subtextStyle";
	});
}
// table 系列
function tableSeriesFun(ochartOption, i, athis, type){
	var show = haveValue(ochartOption, "show", "boolean") || false;
	var interject = haveValue(ochartOption, "interject", "number");
	interject = interject == null ? 1 : interject
	var showNum = haveValue(ochartOption, "showNum", "number");
	showNum = showNum == null ? 10 : showNum;
	var runNum = haveValue(ochartOption, "runNum", "number");
	runNum = runNum == null ? 1 : runNum;
	var animate = haveValue(ochartOption, "animate", "number") || 0;
	var backgroundColor = haveValue(ochartOption, "backgroundColor", "string") || "";	
	var borderWidth = haveValue(ochartOption, "borderWidth", "number") || 0;
	var borderColor = haveValue(ochartOption, "borderColor", "string") || "";
	var borderStyle = haveValue(ochartOption, "borderStyle", "string") || "solid";
	var select = haveValue(ochartOption, "select", "string") || "";
	athis.seriesObj.table = {
		show: show,
		interject: interject,
		interject1: interject,
		showNum: showNum,
		runNum: runNum,
		animate: animate,
		animate1: animate,
		borderWidth: borderWidth,
		borderWidth1: borderWidth,
		borderColor: borderColor,
		borderStyle: borderStyle,
		select: select,
		header:{},
		idol:{},
		odd:{}
	}
	tableArrFun(athis, "header");
	tableArrFun(athis, "idol");
	tableArrFun(athis, "odd");
	function tableArrFun(athis, className) {
		var color = haveValue(ochartOption, className + ".color", "string") || themeSeriesFun(0);
		var fontFamily = haveValue(ochartOption, className + ".fontFamily", "string")|| "sans-serif";
		var fontSize = haveValue(ochartOption, className + ".fontSize", "number");
		fontSize = fontSize == null ? 14 : fontSize;
		var fontStyle = haveValue(ochartOption, className + ".fontStyle", "string")|| "normal";
		var fontWeight = haveValue(ochartOption, className + ".fontWeight", "string")|| "normal";
		var backgroundColor = haveValue(ochartOption, className + ".backgroundColor", "string")|| "";
		athis.seriesObj.table[className] = {
			color: color,
			fontFamily: fontFamily,
			fontSize: fontSize,
			fontSize1: fontSize,
			fontStyle: fontStyle,
			fontWeight: fontWeight,
			backgroundColor: backgroundColor
		}
	}
}
// echart 系列
function seriesTypeHide(){
	// seriesStyle
	$("#seriesLabel").show();
	$("#seriesLabelLine").hide();
	$("#tree").hide();
	$("#seriesItemStyle").show();
	$("#map").hide();
	$("#seriesItemStyleWordCloud").hide();
	$("#seriesLineStyle").show();
	$("#seriesGauge").hide();
	$("#seriesLeaves").hide();
	$("#seriesEdgeLabel").hide();
	// dataStyle
	$("#seriesDataLabel").show();
	$("#seriesDataLabelLine").hide();
	$("#seriesDataItemStyle").show();
	$("#dataMap").hide();
	// $("#seriesDataItemStyleMap").hide();
	$("#seriesDataItemStyleWordCloud").hide();
	$("#seriesDataLineStyle").hide();
	// seriesType
	$("#seriesCommonLine").hide();
	$("#seriesCommonLines").hide();
	$("#seriesCommonBar").hide();
	$("#seriesCommonPie").hide();
	$("#seriesCommonScatter").hide();
	$("#seriesCommonEffectScatter").hide();
	$("#seriesCommonTree").hide();
	$("#seriesCommonMap").hide();
	$("#seriesCommonFunnel").hide();
	$("#seriesCommonGauge").hide();
	$("#seriesCommonGraph").hide();
	$("#seriesCommonWordCloud").hide();
	// dataType
	$("#seriesDataStyle").hide();
	$("#links").hide();
	$("#categories").hide();
	// common
	$("#seriesCommonSymbol").hide();
	$("#seriesCommonlegendHoverLink").hide();
	$("#seriesCommonhoverAnimation").hide();
	$("#seriesCommonAxisIndex").hide();	
	// mark
	$("#seriesMarkPoint").show();
	$("#seriesMarkLine").show();
	$("#seriesMarkArea").show();
}
function echartSeriesFun(ochartOption, i, athis, type){
	switch (type){
		case "line":
			$("#seriesCommonLine").show();
			$("#seriesDataStyle").show();
			seriesLine(ochartOption, i, athis, type);
			break;
		case "bar":
			$("#seriesCommonBar").show();
			$("#seriesLineStyle").hide();
			seriesBar(ochartOption, i, athis, type);
			break;
		case "pie":
			$("#seriesCommonPie").show();
			$("#seriesLabelLine").show();
			$("#seriesDataLabelLine").show();
			$("#seriesLineStyle").hide();
			$("#seriesAreaStyle").hide();
			seriesPie(ochartOption, i, athis, type);
			break;
		case "scatter":
			$("#seriesLineStyle").hide();
			$("#seriesAreaStyle").hide();
			$("#seriesCommonScatter").show();
			$("#seriesDataStyle").show();
			seriesScatter(ochartOption, i, athis, type);
			break;
		case "effectScatter":
			$("#seriesLineStyle").hide();
			$("#seriesAreaStyle").hide();
			$("#seriesCommonEffectScatter").show();
			$("#seriesDataStyle").show();
			seriesEffectScatter(ochartOption, i, athis, type);
			break;
		case "lines":
			$("#seriesItemStyle").hide();
			$("#seriesAreaStyle").hide();
			$("#seriesDataLineStyle").show();
			$("#seriesDataItemStyle").hide();
			$("#seriesCommonLines").show();
			seriesLines(ochartOption, i, athis, type);
			break;
		case "radar":
			$("#seriesCommonRadar").show();
			seriesRadar(ochartOption, i, athis, type);
			break;
		case "tree":
			$("#seriesCommonTree").show();
			$("#seriesLeaves").show();
			$("#seriesDataStyle").show();
			$("#seriesItemStyle").hide();
			$("#seriesLineStyle").show();
			$("#seriesAreaStyle").hide();
			$("#tree").show();
			seriesTree(ochartOption, i, athis, type);
			break;
		case "map":
			$("#seriesLineStyle").hide();
			$("#seriesAreaStyle").hide();
			$("#seriesDataItemStyle").show();
			$("#seriesCommonMap").show();
			$("#seriesItemStyle").show();
			$("#map").show();
			$("#dataMap").show();
			seriesMap(ochartOption, i, athis, type);
			break;
		case "funnel":
			$("#seriesLineStyle").hide();
			$("#seriesAreaStyle").hide();
			$("#seriesCommonFunnel").show();
			$("#seriesLabelLine").show();
			$("#seriesDataLabelLine").show();
			seriesFunnel(ochartOption, i, athis, type);
			break;
		case "gauge":
			$("#seriesLabel").hide();
			$("#seriesLineStyle").hide();
			$("#seriesAreaStyle").hide();
			$("#seriesCommonGauge").show();
			$("#seriesGauge").show();
			seriesGauge(ochartOption, i, athis, type);
			break;
		case "graph":
			$("#seriesCommonGraph").show();
			$("#seriesEdgeLabel").show();
			$("#seriesDataStyle").show();
			$("#seriesAreaStyle").hide();
			seriesGraph(ochartOption, i, athis, type);
			categoriesListFun(ochartOption, i, type, athis);
			linksListFun(ochartOption, i, type, athis);
			break;
		case "wordCloud":
			$("#seriesCommonWordCloud").show();
			$("#seriesItemStyleWordCloud").show();
			$("#seriesLabel").hide();
			$("#seriesItemStyle").hide();
			$("#seriesLineStyle").hide();
			$("#seriesAreaStyle").hide();
			$("#seriesMarkPoint").hide();
			$("#seriesMarkLine").hide();
			$("#seriesMarkArea").hide();
			seriesWordCloud(ochartOption, i, athis, type);
			break;
		default:
			break;
	}
	zlevelFun(ochartOption, i, athis, type)
	var seriseStyle = haveValue(ochartOption, "series."+i+".seriseStyle", "string")|| "";
	athis.seriesObj.seriseStyle = seriseStyle;
	seriesCollapse(seriseStyle, ochartOption, i, athis, type);
	dataListFun(ochartOption, i, type, athis);
}
// 系列line
function seriesLine(ochartOption, i, athis, type) {
	var showSymbol = haveValue(ochartOption, "series."+i+".showSymbol", "boolean");
	showSymbol = showSymbol == null ? true : showSymbol;	
	var showAllSymbol = haveValue(ochartOption, "series."+i+".showAllSymbol", "boolean") || false;
	var connectNulls = haveValue(ochartOption, "series."+i+".connectNulls", "boolean") || false;
	var clipOverflow = haveValue(ochartOption, "series."+i+".clipOverflow", "boolean") || false;
	var smooth =  haveValue(ochartOption, "series."+i+".smooth", "boolean");
	smooth = smooth == null ? true : smooth;
	var smoothMonotone = haveValue(ochartOption, "series."+i+".smoothMonotone", "string");
	var step = haveValue(ochartOption, "series."+i+".step", "string") || false;
	var stack = haveValue(ochartOption, "series."+i+".stack", "string");
	athis.seriesObj.line = {
		type: type,
		showSymbol: showSymbol,
		showAllSymbol: showAllSymbol,
		connectNulls: connectNulls,
		clipOverflow: clipOverflow,
		smooth: smooth,
		smoothMonotone: smoothMonotone,
		step: step,
		stack: stack
	}
	symbolCommonFun(ochartOption, i, athis, type);
	silentCommonFun(ochartOption, i, athis, type);
	legendHoverLinkCommonFun(ochartOption, i, athis, type);
	hoverAnimationCommonFun(ochartOption, i, athis, type);
	axisIndexFun(ochartOption, i, athis, type);
}
// 系列bar
function seriesBar(ochartOption, i, athis, type) {
	var seriseStyle = haveValue(ochartOption, "series."+i+".seriseStyle", "string")|| "";
	var stack = haveValue(ochartOption, "series."+i+".stack", "string")|| "";
	var barGap = parseInt(haveValue(ochartOption, "series."+i+".barGap", "number"));
	barGap = barGap == 0 ? 0 : barGap || 30;	
	var barCategoryGap = parseInt(haveValue(ochartOption, "series."+i+".barCategoryGap", "number"));
	barCategoryGap = barCategoryGap == 0 ? 0 : barCategoryGap || 20;		
	athis.seriesObj.bar = {
		type: type,
		barGap: barGap,
		barGap1: barGap,
		barCategoryGap: barCategoryGap,
		barCategoryGap1: barCategoryGap,
		stack: stack
	}
	silentCommonFun(ochartOption, i, athis, type);
	legendHoverLinkCommonFun(ochartOption, i, athis, type);
	hoverAnimationCommonFun(ochartOption, i, athis, type);
	axisIndexFun(ochartOption, i, athis, type);
}
//系列pie
function seriesPie(ochartOption, i, athis, type) {
	var selectedMode = haveValue(ochartOption, "series."+i+".selectedMode", "string") || "false";
	var clockwise = haveValue(ochartOption, "series."+i+".clockwise", "boolean");
	clockwise = clockwise == null ? true : clockwise;
	var roseType = haveValue(ochartOption, "series."+i+".roseType", "boolean") || false;
	var hoverOffset = haveValue(ochartOption, "series."+i+".hoverOffset", "number");
	hoverOffset = hoverOffset == null ? 10 : hoverOffset;	
	var selectedOffset = haveValue(ochartOption, "series."+i+".selectedOffset", "number");
	selectedOffset = selectedOffset == null ? 10 : selectedOffset;	
	var startAngle = haveValue(ochartOption, "series."+i+".startAngle", "number");
	startAngle = startAngle == null ? 90 : startAngle;	
	var minAngle = haveValue(ochartOption, "series."+i+".minAngle", "number") || 0;
	var centerX = parseInt(haveValue(ochartOption, "series."+i+".center", "array", 0));
	var centerY = parseInt(haveValue(ochartOption, "series."+i+".center", "array", 1));
	centerX = centerX == 0 ? 0 : centerX || 50;	
	centerY = centerY == 0 ? 0 : centerY || 50;
	var radiusX = parseInt(haveValue(ochartOption, "series."+i+".radius", "array", 0));
	var radiusY = parseInt(haveValue(ochartOption, "series."+i+".radius", "array", 1));
	radiusX = radiusX == 0 ? 0 : radiusX || 50;	
	radiusY = radiusY == 0 ? 0 : radiusY || 50;
	athis.seriesObj.pie = {
		selectedMode: selectedMode,
		clockwise: clockwise == null ? true : clockwise,
		roseType: roseType,
		hoverOffset: hoverOffset,
		hoverOffset1: hoverOffset,
		selectedOffset: selectedOffset,
		selectedOffset1: selectedOffset,
		startAngle: startAngle,
		startAngle1: startAngle,
		minAngle: minAngle,
		minAngle1: minAngle,
		centerX: centerX,
		centerX1: centerX,
		centerY: centerY,
		centerY1: centerY,
		radiusX: radiusX,
		radiusX1: radiusX,
		radiusY: radiusY,
		radiusY1: radiusY,
	}
	silentCommonFun(ochartOption, i, athis, type);
	legendHoverLinkCommonFun(ochartOption, i, athis, type);
	hoverAnimationCommonFun(ochartOption, i, athis, type);
}
//系列scatter
function seriesScatter(ochartOption, i, athis, type) {
	var large = haveValue(ochartOption, "series."+i+".large", "boolean");
	var largeThreshold = haveValue(ochartOption, "series."+i+".largeThreshold", "number");
	largeThreshold = largeThreshold == null ? 2000 : largeThreshold;	
	athis.seriesObj.scatter ={
		large: large == null ? true : large,
		largeThreshold: largeThreshold,
		largeThreshold1: largeThreshold
	}
	symbolCommonFun(ochartOption, i, athis, type);
	silentCommonFun(ochartOption, i, athis, type);
	legendHoverLinkCommonFun(ochartOption, i, athis, type);
	hoverAnimationCommonFun(ochartOption, i, athis, type);
	axisIndexFun(ochartOption, i, athis, type);
}
//系列effectScatter
function seriesEffectScatter(ochartOption, i, athis, type) {
	var large = haveValue(ochartOption, "series."+i+".large", "boolean");
	var largeThreshold = haveValue(ochartOption, "series."+i+".largeThreshold", "number");
	largeThreshold = largeThreshold == null ? 2000 : largeThreshold;	
	// 特效
	var showEffectOn = haveValue(ochartOption, "series."+i+".showEffectOn", "string") || "render";
	var period = haveValue(ochartOption, "series."+i+".rippleEffect.period", "number");
	period = period == null ? 4 : period;	
	var scale = haveValue(ochartOption, "series."+i+".rippleEffect.scale", "number");
	scale = scale == null ? 2.5 : scale;	
	var brushType = haveValue(ochartOption, "series."+i+".rippleEffect.brushType", "string") || "fill";
	athis.seriesObj.effectScatter = {
		large: large == null ? true : large,
		largeThreshold: largeThreshold,
		largeThreshold1: largeThreshold,
		showEffectOn: showEffectOn,
		period: period,
		period1: period,
		scale: scale,
		scale1: scale,
		brushType: brushType
	}
	symbolCommonFun(ochartOption, i, athis, type);
	silentCommonFun(ochartOption, i, athis, type);
	legendHoverLinkCommonFun(ochartOption, i, athis, type);}
// 系列lines
function seriesLines(ochartOption, i, athis, type) {
	var symbol1 = haveValue(ochartOption, "series."+i+".symbol", "array", 0, null, "radio");
	var symbol2 = haveValue(ochartOption, "series."+i+".symbol", "array", 1, null, "radio");
	var symbolSize = haveValue(ochartOption, "series."+i+".symbolSize", "number");
	symbolSize = symbolSize == null ? 10: symbolSize;	
	var polyline = haveValue(ochartOption, "series."+i+".polyline", "boolean") || false;
	var large = haveValue(ochartOption, "series."+i+".large", "boolean") || false;
	var largeThreshold = haveValue(ochartOption, "series."+i+".largeThreshold", "number");
	largeThreshold = largeThreshold == null ? 2000 : largeThreshold;
	// 特效
	var effectShow = haveValue(ochartOption, "series."+i+".effect.show", "boolean") || false;
	var effectLoop = haveValue(ochartOption, "series."+i+".effect.loop", "boolean");
	effectLoop = effectLoop == null ? true : effectLoop;	
	var effectSymbol = haveValue(ochartOption, "series."+i+".effect.symbol", "string") || "circle";
	var effectSymbolSize = haveValue(ochartOption, "series."+i+".effect.symbolSize", "number");
	effectSymbolSize = effectSymbolSize == null ? 3 : effectSymbolSize;	
	var period = haveValue(ochartOption, "series."+i+".effect.period", "number");
	period = period == null ? 4 : period;	
	var constantSpeed = haveValue(ochartOption, "series."+i+".effect.constantSpeed", "number") || 0;
	var trailLength = haveValue(ochartOption, "series."+i+".effect.trailLength", "number");
	trailLength = trailLength == null ? 0.2 : trailLength;
	athis.seriesObj.lines = {
		symbol1: symbol1,
		symbol2: symbol2,
		symbolSize: symbolSize,
		symbolSize1: symbolSize,
		polyline:  polyline,
		large: large,
		largeThreshold: largeThreshold,
		largeThreshold1: largeThreshold,
		effectShow: effectShow,
		effectLoop: effectLoop,
		effectSymbol: effectSymbol,
		effectSymbolSize: effectSymbolSize,
		effectSymbolSize1: effectSymbolSize,
		period: period,
		period1: period,
		constantSpeed: constantSpeed,
		constantSpeed1: constantSpeed,
		trailLength: trailLength,
		trailLength1: trailLength,
	}
	silentCommonFun(ochartOption, i, athis, type);
}
//系列 radar
function seriesRadar(ochartOption, i, athis, type) {
	symbolCommonFun(ochartOption, i, athis, type);
	silentCommonFun(ochartOption, i, athis, type);
}
//系列 Tree
function seriesTree(ochartOption, i, athis, type) {
	var left = parseInt(haveValue(ochartOption, "series."+i+".left", "number"));
	left = left == 0 ? 0 : left || 12;
	var right = parseInt(haveValue(ochartOption, "series."+i+".right", "number"));
	right = right == 0 ? 0 : right || 12;
	var top = parseInt(haveValue(ochartOption, "series."+i+".top", "number"));
	top = top == 0 ? 0 : top || 12;
	var bottom = parseInt(haveValue(ochartOption, "series."+i+".bottom", "number"));
	bottom = bottom == 0 ? 0 : bottom || 12;
	var layout = haveValue(ochartOption, "series."+i+".layout", "string")|| "orthogonal";
	var orient = haveValue(ochartOption, "series."+i+".orient", "string")|| "horizontal";
	var expandAndCollapse = haveValue(ochartOption, "series."+i+".expandAndCollapse", "boolean");
	expandAndCollapse = expandAndCollapse == null ? true : expandAndCollapse;
	var initialTreeDepth = haveValue(ochartOption, "series."+i+".initialTreeDepth", "number");
	initialTreeDepth = initialTreeDepth == null ? 2 : initialTreeDepth;
	athis.seriesObj.tree = {
		left: left,
		left1: left,
		right: right,
		right1: right,
		top: top,
		top1: top,
		bottom: bottom,
		bottom1: bottom,
		layout: layout,
		orient: orient,
		expandAndCollapse: expandAndCollapse,
		initialTreeDepth: initialTreeDepth,
		initialTreeDepth1: initialTreeDepth
	}
	symbolCommonFun(ochartOption, i, athis, type);
}
// 系列 map
function seriesMap(ochartOption, i, athis, type) {
	athis.cityList = ochartOption.series[i].cityList || "";	
	var province = haveValue(ochartOption, "series."+i+".province", "string") || "";
	var city = haveValue(ochartOption, "series."+i+".city", "string") || "";
	var roam = haveValue(ochartOption, "series."+i+".roam", "boolean") || false;
	var showLegendSymbol = haveValue(ochartOption, "series."+i+".showLegendSymbol", "boolean");
	showLegendSymbol = showLegendSymbol == null ? true : showLegendSymbol;
	var mapCenter = haveValue(ochartOption, "series."+i+".center", "array", null) || "";
	var zoom = haveValue(ochartOption, "series."+i+".zoom", "number");
	zoom = zoom == null ? 1 : zoom;
	var selectedMode = haveValue(ochartOption, "series."+i+".selectedMode", "string") || "false";
	var mapValueCalculation = haveValue(ochartOption, "series."+i+".mapValueCalculation", "string") || "sum";
	var aspectScale = haveValue(ochartOption, "series."+i+".aspectScale", "number");
	aspectScale = aspectScale == null ? 0.75 : aspectScale;
	athis.seriesObj.map = {
		province: province,
		city: city,
		roam: roam,
		showLegendSymbol: showLegendSymbol,
		mapCenter: mapCenter,
		zoom: zoom,
		zoom1: zoom,
		selectedMode: selectedMode,
		mapValueCalculation: mapValueCalculation,
		aspectScale: aspectScale,
		aspectScale1: aspectScale,
	}
	silentCommonFun(ochartOption, i, athis, type);
}
//系列 funnel(漏斗)
function seriesFunnel(ochartOption, i, athis, type) {
	var gap = parseInt(haveValue(ochartOption, "series."+i+".gap", "number",null)) || 0;
	var min = haveValue(ochartOption, "series."+i+".min", "number");
	var max = haveValue(ochartOption, "series."+i+".max", "number");
	var minSize = parseInt(haveValue(ochartOption, "series."+i+".minSize", "number")) || 0;
	var maxSize = parseInt(haveValue(ochartOption, "series."+i+".maxSize", "number")) || null;
	maxSize = maxSize == 0 ? 0 : maxSize || 100;	
	var sort = haveValue(ochartOption, "series."+i+".sort", "string") || "descending";
	var funnelAlign = haveValue(ochartOption, "series."+i+".funnelAlign", "string") || "center";
	athis.seriesObj.funnel = {
		gap: gap,
		min: min,
		max: max,
		minSize: minSize,
		minSize1: minSize,
		maxSize: maxSize,
		maxSize1: maxSize,
		sort: sort,
		funnelAlign: funnelAlign
	}
	silentCommonFun(ochartOption, i, athis, type);
	legendHoverLinkCommonFun(ochartOption, i, athis, type);
}
//系列 gauge（仪表盘）
function seriesGauge(ochartOption, i, athis, type) {
	var clockwise = haveValue(ochartOption, "series."+i+".clockwise", "boolean");
	var min = haveValue(ochartOption, "series."+i+".min", "number") || 0;
	var max = haveValue(ochartOption, "series."+i+".max", "number");
	max = max == null ? 100 :max;	
	var splitNumber = haveValue(ochartOption, "series."+i+".splitNumber", "number");
	splitNumber = splitNumber == null ? 10 :splitNumber;	
	var radius = parseInt(haveValue(ochartOption, "series."+i+".radius", "number"));
	radius = radius == 0 ? 0 : radius || 50;		
	var centerX = parseInt(haveValue(ochartOption, "series."+i+".center", "array", 0));
	var centerY = parseInt(haveValue(ochartOption, "series."+i+".center", "array", 1));
	centerX = centerX == 0 ? 0 : centerX || 50;	
	centerY = centerY == 0 ? 0 : centerY || 50;
	var startAngle = haveValue(ochartOption, "series."+i+".startAngle", "number");
	startAngle = startAngle == null ? 225 :startAngle;	
	var endAngle = haveValue(ochartOption, "series."+i+".endAngle", "number");
	endAngle = endAngle == null ? -45 :endAngle;	
	var pointerShow = haveValue(ochartOption, "series."+i+".pointer.show", "boolean");
	pointerShow = pointerShow == null ? true : pointerShow;	
	var pointerLength = parseInt(haveValue(ochartOption, "series."+i+".pointer.length", "array", 1));
	pointerLength = pointerLength == 0 ? 0 : pointerLength || 80;
	var pointerWidth = haveValue(ochartOption, "series."+i+".pointer.width", "number");
	pointerWidth = pointerWidth == null ? 8 :pointerWidth;
	athis.seriesObj.gauge = {
		clockwise: clockwise == null ? true : clockwise,
		min: min,
		max: max,
		splitNumber: splitNumber,
		radius: radius,
		radius1: radius,
		centerX: centerX,
		centerX1: centerX,
		centerY: centerY,
		centerY1: centerY,
		startAngle: startAngle,
		startAngle1: startAngle,
		endAngle: endAngle,
		endAngle1: endAngle,
		pointerShow: pointerShow,
		pointerLength: pointerLength,
		pointerLength1: pointerLength,
		pointerWidth: pointerWidth,
		pointerWidth1: pointerWidth
	}
	// title
	function gaugeTitleFun(athis,ochartOption){
		var show = haveValue(ochartOption, "series."+i+".title.show", "boolean");
		var offsetCenterX = parseInt(haveValue(ochartOption, "series."+i+".title.offsetCenter", "array", 0));
		var offsetCenterY = parseInt(haveValue(ochartOption, "series."+i+".title.offsetCenter", "array", 1));
		offsetCenterX = offsetCenterX == 0 ? 0 : offsetCenterX || 0;
		offsetCenterY = offsetCenterY == 0 ? 0 : offsetCenterY || -40;
		var fontFamily = haveValue(ochartOption, "series."+i+".title.fontFamily", "string") || "sans-serif";
		var color = haveValue(ochartOption, "series."+i+".title.color", "string") || "#cccccc";
		var fontSize = haveValue(ochartOption, "series."+i+".title.fontSize", "number");
		fontSize = fontSize == null ? 15 : fontSize;	
		var fontStyle = haveValue(ochartOption, "series."+i+".title.fontStyle", "string") || "normal";
		var fontWeight = haveValue(ochartOption, "series."+i+".title.fontWeight", "string") || "normal";
		var padding = haveValue(ochartOption, "series."+i+".title.padding", "number") || 0;
		var backgroundColor = haveValue(ochartOption, "series."+i+".title.backgroundColor", "string");
		var borderWidth = haveValue(ochartOption, "series."+i+".title.borderWidth", "number") || 0;
		var borderRadius = haveValue(ochartOption, "series."+i+".title.borderRadius", "number") || 0;
		var borderColor = haveValue(ochartOption, "series."+i+".title.borderColor", "string");
		var shadowBlur = haveValue(ochartOption, "series."+i+".title.shadowBlur", "number") || 0;
		var shadowColor = haveValue(ochartOption, "series."+i+".title.shadowColor", "string");
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".title.shadowOffsetX", "number") || 0;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".title.shadowOffsetY", "number") || 0;
		var titleList=[{
			show:show == null ? true : show,
			offsetCenterX: offsetCenterX,
			offsetCenterX1: offsetCenterX,
			offsetCenterY: offsetCenterY,
			offsetCenterY1: offsetCenterY,
			fontFamily:fontFamily,
			color:color,
			fontSize: fontSize,
			fontSize1: fontSize,
			fontStyle:fontStyle,
			fontWeight:fontWeight,
			padding:padding,
			padding1:padding,
			backgroundColor:backgroundColor,
			borderWidth:borderWidth,
			borderWidth1:borderWidth,
			borderRadius:borderRadius,
			borderRadius1:borderRadius,
			borderColor:borderColor,
			shadowBlur:shadowBlur,
			shadowBlur1:shadowBlur,
			shadowColor:shadowColor,
			shadowOffsetX:shadowOffsetX,
			shadowOffsetX1:shadowOffsetX,
			shadowOffsetY:shadowOffsetY,
			shadowOffsetY1:shadowOffsetY,
		}];
		athis.seriesObj.titleList = titleList;		
	}
	gaugeTitleFun(athis,ochartOption);	
	// detail
	function gaugeDetailFun(athis,ochartOption){
		var show = haveValue(ochartOption, "series."+i+".detail.show", "boolean");
		var formatter = haveValue(ochartOption, "series."+i+".detail.formatter", "string") || "";
		var offsetCenterX = parseInt(haveValue(ochartOption, "series."+i+".detail.offsetCenter", "array", 0));
		var offsetCenterY = parseInt(haveValue(ochartOption, "series."+i+".detail.offsetCenter", "array", 1));
		offsetCenterX = offsetCenterX == 0 ? 0 : offsetCenterX || 0;
		offsetCenterY = offsetCenterY == 0 ? 0 : offsetCenterY || 40;
		var fontFamily = haveValue(ochartOption, "series."+i+".detail.fontFamily", "string") || "sans-serif";
		var color = haveValue(ochartOption, "series."+i+".detail.color", "string") || "";
		var fontSize = haveValue(ochartOption, "series."+i+".detail.fontSize", "number");
		fontSize = fontSize == null ? 15 : fontSize;
		var fontStyle = haveValue(ochartOption, "series."+i+".detail.fontStyle", "string") || "normal";
		var fontWeight = haveValue(ochartOption, "series."+i+".detail.fontWeight", "string") || "normal";
		var padding = haveValue(ochartOption, "series."+i+".detail.padding", "number") || 0;
		var backgroundColor = haveValue(ochartOption, "series."+i+".detail.backgroundColor", "string");
		var borderWidth = haveValue(ochartOption, "series."+i+".detail.borderWidth", "number") || 0;
		var borderRadius = haveValue(ochartOption, "series."+i+".detail.borderRadius", "number") || 0;
		var borderColor = haveValue(ochartOption, "series."+i+".detail.borderColor", "string");
		var shadowBlur = haveValue(ochartOption, "series."+i+".detail.shadowBlur", "number") || 0;
		var shadowColor = haveValue(ochartOption, "series."+i+".detail.shadowColor", "string");
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".detail.shadowOffsetX", "number") || 0;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".detail.shadowOffsetY", "number") || 0;
		var detailList=[{
			show:show == null ? true : show,
			formatter:formatter,
			offsetCenterX: offsetCenterX,
			offsetCenterX1: offsetCenterX,
			offsetCenterY: offsetCenterY,
			offsetCenterY1: offsetCenterY,
			fontFamily:fontFamily,
			color:color,
			fontSize: fontSize,
			fontSize1: fontSize,
			fontStyle:fontStyle,
			fontWeight:fontWeight,
			padding:padding,
			padding1:padding,
			backgroundColor:backgroundColor,
			borderWidth:borderWidth,
			borderWidth1:borderWidth,
			borderRadius:borderRadius,
			borderRadius1:borderRadius,
			borderColor:borderColor,
			shadowBlur:shadowBlur,
			shadowBlur1:shadowBlur,
			shadowColor:shadowColor,
			shadowOffsetX:shadowOffsetX,
			shadowOffsetX1:shadowOffsetX,
			shadowOffsetY:shadowOffsetY,
			shadowOffsetY1:shadowOffsetY
		}];
		athis.seriesObj.detailList = detailList;
	}
	gaugeDetailFun(athis,ochartOption);	
	// axisLine
	function gaugeAxisLineFun(athis,ochartOption){
		var show = haveValue(ochartOption, "series."+i+".axisLine.show", "boolean");
		var color = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.color", "array", 0, "gaugeAxisLine") || "#91c7ae";
		var color1 = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.color", "array", 1, "gaugeAxisLine") || "#63869e";
		var color2 = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.color", "array", 2, "gaugeAxisLine") || "#c23531";
		var length1 = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.color", "array", 0, "gaugeAxisLine1")*100;
		length1 = length1 == null ? 20 : length1;	
		var length2 = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.color", "array", 1, "gaugeAxisLine1")*100;
		length2 = length2 == null ? 80: length2;
		var width = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.width", "number");
		width = width == null ? 30 : width;
		var shadowBlur = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.shadowBlur", "number") || 0;
		var shadowColor = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.shadowColor", "string");
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.shadowOffsetX", "number") || 0;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".axisLine.lineStyle.shadowOffsetY", "number") || 0;
		var axisLineList = [{
			show:show == null ? true : show,
			color:color,
			color1:color1,
			color2:color2,
			length1:length1,
			length11:length1,
			length2:length2,
			length21:length2,
			width:width,
			width1:width,
			shadowBlur:shadowBlur,
			shadowBlur1:shadowBlur,
			shadowColor:shadowColor,
			shadowOffsetX:shadowOffsetX,
			shadowOffsetX1:shadowOffsetX,
			shadowOffsetY:shadowOffsetY,
			shadowOffsetY1:shadowOffsetY
		}];
		athis.seriesObj.axisLineList = axisLineList;
	}
	gaugeAxisLineFun(athis,ochartOption);
	// splitLine
	function gaugeSplitLineFun(athis,ochartOption){
		var show = haveValue(ochartOption, "series."+i+".splitLine.show", "boolean");
		var length = haveValue(ochartOption, "series."+i+".splitLine.length", "number");
		length = length == null ? 30 : length;	
		var width = haveValue(ochartOption, "series."+i+".splitLine.lineStyle.width", "number");
		width = width == null ? 1: width;
		var color = haveValue(ochartOption, "series."+i+".splitLine.lineStyle.color", "string") || "#eeeeee";
		var splitLineType = haveValue(ochartOption, "series."+i+".splitLine.lineStyle.type", "string") || "solid";
		var shadowBlur = haveValue(ochartOption, "series."+i+".splitLine.lineStyle.shadowBlur", "number") || 0;
		var shadowColor = haveValue(ochartOption, "series."+i+".splitLine.lineStyle.shadowColor", "string");
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".splitLine.lineStyle.shadowOffsetX", "number") || 0;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".splitLine.lineStyle.shadowOffsetY", "number") || 0;
		var splitLineList = [{
			show:show == null ? true : show,
			color:color,
			length:length,
			length1:length,
			width:width,
			width1:width,
			splitLineType:splitLineType,
			shadowBlur:shadowBlur,
			shadowBlur1:shadowBlur,
			shadowColor:shadowColor,
			shadowOffsetX:shadowOffsetX,
			shadowOffsetX1:shadowOffsetX,
			shadowOffsetY:shadowOffsetY,
			shadowOffsetY1:shadowOffsetY
		}];
		athis.seriesObj.splitLineList = splitLineList;
	}
	gaugeSplitLineFun(athis,ochartOption);
	// axisTick
	function gaugeAxisTickFun(athis,ochartOption){
		var show = haveValue(ochartOption, "series."+i+".axisTick.show", "boolean");
		show = show == null ? true : show;
		var splitNumber = haveValue(ochartOption, "series."+i+".axisTick..splitNumber", "number");
		splitNumber = splitNumber == null ? 5 : splitNumber;
		var length = haveValue(ochartOption, "series."+i+".axisTick..length", "number");
		length = length == null ? 8 : length;
		var width = haveValue(ochartOption, "series."+i+".axisTick.lineStyle.width", "number");
		width = width == null ? 1: width;	
		var color = haveValue(ochartOption, "series."+i+".axisTick.lineStyle.color", "string") || "#eeeeee";
		var axisTickType = haveValue(ochartOption, "series."+i+".axisTick.lineStyle.type", "string") || "solid";
		var shadowBlur = haveValue(ochartOption, "series."+i+".axisTick.lineStyle.shadowBlur", "number") || 0;
		var shadowColor = haveValue(ochartOption, "series."+i+".axisTick.lineStyle.shadowColor", "string");
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".axisTick.lineStyle.shadowOffsetX", "number") || 0;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".axisTick.lineStyle.shadowOffsetY", "number") || 0;
		var axisTickList = [{
			show:show,
			splitNumber:splitNumber,
			length:length,
			length1:length,
			width:width,
			width1:width,
			color:color,
			axisTickType:axisTickType,
			shadowBlur:shadowBlur,
			shadowBlur1:shadowBlur,
			shadowColor:shadowColor,
			shadowOffsetX:shadowOffsetX,
			shadowOffsetX1:shadowOffsetX,
			shadowOffsetY:shadowOffsetY,
			shadowOffsetY1:shadowOffsetY
		}];
		athis.seriesObj.axisTickList = axisTickList;
	}
	gaugeAxisTickFun(athis,ochartOption);
	// axisLabel
	function gaugeAxisLabelFun(athis,ochartOption){
		var show = haveValue(ochartOption, "series."+i+".axisLabel.show", "boolean");
		show = show == null ? true : show;	
		var formatter = haveValue(ochartOption, "series."+i+".axisLabel.formatter", "string") || "";
		var distance = haveValue(ochartOption, "series."+i+".axisLabel.distance", "number");
		distance = distance == null ? 5 :distance;	
		var fontFamily = haveValue(ochartOption, "series."+i+".axisLabel.fontFamily", "string") || "sans-serif";
		var color = haveValue(ochartOption, "series."+i+".axisLabel.color", "string") || "";
		var fontSize = haveValue(ochartOption, "series."+i+".axisLabel.fontSize", "number");
		fontSize = fontSize == null ? 12: fontSize;
		var fontStyle = haveValue(ochartOption, "series."+i+".axisLabel.fontStyle", "string") || "normal";
		var fontWeight = haveValue(ochartOption, "series."+i+".axisLabel.fontWeight", "string") || "normal";
		var padding = haveValue(ochartOption, "series."+i+".axisLabel.padding", "number") || 0;
		var backgroundColor = haveValue(ochartOption, "series."+i+".axisLabel.backgroundColor", "string");
		var borderWidth = haveValue(ochartOption, "series."+i+".axisLabel.borderWidth", "number") || 0;
		var borderRadius = haveValue(ochartOption, "series."+i+".axisLabel.borderRadius", "number") || 0;
		var borderColor = haveValue(ochartOption, "series."+i+".axisLabel.borderColor", "string");
		var shadowBlur = haveValue(ochartOption, "series."+i+".axisLabel.shadowBlur", "number") || 0;
		var shadowColor = haveValue(ochartOption, "series."+i+".axisLabel.shadowColor", "string");
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".axisLabel.shadowOffsetX", "number") || 0;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".axisLabel.shadowOffsetY", "number") || 0;
		var axisLabelList = [{
			show:show,
			formatter:formatter,
			distance: distance,
			distance1: distance,
			fontFamily:fontFamily,
			color:color,
			fontSize: fontSize,
			fontSize1: fontSize,
			fontStyle:fontStyle,
			fontWeight:fontWeight,
			padding:padding,
			padding1:padding,
			backgroundColor:backgroundColor,
			borderWidth:borderWidth,
			borderWidth1:borderWidth,
			borderRadius:borderRadius,
			borderRadius1:borderRadius,
			borderColor:borderColor,
			shadowBlur:shadowBlur,
			shadowBlur1:shadowBlur,
			shadowColor:shadowColor,
			shadowOffsetX:shadowOffsetX,
			shadowOffsetX1:shadowOffsetX,
			shadowOffsetY:shadowOffsetY,
			shadowOffsetY1:shadowOffsetY
		}];
		athis.seriesObj.axisLabelList = axisLabelList;
	}
	gaugeAxisLabelFun(athis,ochartOption);
	silentCommonFun(ochartOption, i, athis, type);
}
// 系列 graph（关系）
function seriesGraph(ochartOption, i, athis, type) {
	var layout = haveValue(ochartOption, "series."+i+".layout", "string")|| "none";
	var rotateLabel = haveValue(ochartOption, "series."+i+".circular.rotateLabel", "boolean") || false;
	var forceRepulsion = haveValue(ochartOption, "series."+i+".force.repulsion", "number");
	forceRepulsion = forceRepulsion == null ? 50 : forceRepulsion;	
	var forceGravity = haveValue(ochartOption, "series."+i+".force.gravity", "number");
	forceGravity = forceGravity == null ? 0.1 : forceGravity;	
	var forceEdgeLength = haveValue(ochartOption, "series."+i+".force.edgeLength", "number");
	forceEdgeLength = forceEdgeLength == null ? 30 : forceEdgeLength;
	var draggable = haveValue(ochartOption, "series."+i+".draggable", "boolean") || false;
	var focusNodeAdjacency = haveValue(ochartOption, "series."+i+".focusNodeAdjacency", "boolean") || false;
	var roam = haveValue(ochartOption, "series."+i+".roam", "boolean") || false;
	var nodeScaleRatio = haveValue(ochartOption, "series."+i+".nodeScaleRatio", "number");
	nodeScaleRatio = nodeScaleRatio == null ? 0.6 : nodeScaleRatio;	
	athis.seriesObj.graph = {
		layout: layout,
		rotateLabel: rotateLabel,
		forceRepulsion: forceRepulsion,
		forceGravity: forceGravity,
		forceEdgeLength: forceEdgeLength,
		draggable: draggable,
		focusNodeAdjacency: focusNodeAdjacency,
		roam: roam,
		nodeScaleRatio: nodeScaleRatio,
		nodeScaleRatio1: nodeScaleRatio
	}
	symbolCommonFun(ochartOption, i, athis, type);
	silentCommonFun(ochartOption, i, athis, type);
	legendHoverLinkCommonFun(ochartOption, i, athis, type);
	hoverAnimationCommonFun(ochartOption, i, athis, type);
}
// 系列 wordCloud
function seriesWordCloud(ochartOption, i, athis, type) {
	var centerX = parseInt(haveValue(ochartOption, "series."+i+".center", "array", 0));
	var centerY = parseInt(haveValue(ochartOption, "series."+i+".center", "array", 1));
	centerX = centerX == 0 ? 0 : centerX || 50;	
	centerY = centerY == 0 ? 0 : centerY || 50;
	var sizeX = parseInt(haveValue(ochartOption, "series."+i+".size", "array", 0));
	var sizeY = parseInt(haveValue(ochartOption, "series."+i+".size", "array", 1));
	sizeX = sizeX == 0 ? 0 : sizeX || 40;	
	sizeY = sizeY == 0 ? 0 :sizeY || 40;
	var enable = haveValue(ochartOption, "series."+i+".autoSize.enable", "boolean");
	enable = enable == null ? true : enable;	
	var minSize = haveValue(ochartOption, "series."+i+".autoSize.minSize", "number");
	minSize = minSize == null ? 12 : minSize;	
	athis.seriesObj.wordCloud = {
		centerX: centerX,
		centerX1: centerX,
		centerY: centerY,
		centerY1: centerY,
		sizeX: sizeX,
		sizeX1: sizeX,
		sizeY: sizeY,
		sizeY1: sizeY,
		enable: enable,
		minSize: minSize,
		minSize1: minSize
	}
	var WordItemStyleSelect = haveValue(ochartOption, "series."+i+".WordItemStyleSelect", "string")|| "normal";
	var WordItemStyleList = [{name:"普通",WordItemStyleSelect:"normal"},{name:"高亮(不设置则同普通)",WordItemStyleSelect:"emphasis"}];
	WordItemStyleList.forEach(function(item, a){
		var color = haveValue(ochartOption, "series."+i+".itemStyle."+ item.WordItemStyleSelect+".color", "string") || themeSeriesFun(i);
		item.color = color;
		var fontFamily = haveValue(ochartOption, "series."+i+".itemStyle."+ item.WordItemStyleSelect+".textStyle.fontFamily", "string") || "sans-serif";
		item.fontFamily = fontFamily;
		var fontSize = haveValue(ochartOption, "series."+i+".itemStyle."+ item.WordItemStyleSelect+".textStyle.fontSize", "number") || 12;
		item.fontSize = fontSize;
		item.fontSize1 = fontSize;
		var fontStyle = haveValue(ochartOption, "series."+i+".itemStyle."+ item.WordItemStyleSelect+".textStyle.fontStyle", "string") || "normal";
		item.fontStyle = fontStyle;
		var fontWeight = haveValue(ochartOption, "series."+i+".itemStyle."+ item.WordItemStyleSelect+".textStyle.fontWeight", "string") || "normal";
		item.fontWeight = fontWeight;
	});
	athis.seriesObj.WordItemStyleSelect = WordItemStyleSelect;
	athis.seriesObj.WordItemStyleList = WordItemStyleList;
}
// 共用 标志图形
function symbolCommonFun(ochartOption, i, athis, type) {
	$("#seriesCommonSymbol").show();
	var symbol = haveValue(ochartOption, "series."+i+".symbol", "string");
	var symbolSize = haveValue(ochartOption, "series."+i+".symbolSize", "number");
	var symbolRotate = haveValue(ochartOption, "series."+i+".symbolRotate", "number") || 0;
	var symbolType = haveValue(ochartOption, "series."+i+".symbolType", "string") || "common";
	athis.seriesObj.symbolType = symbolType;
	athis.seriesObj.symbol = symbol;
	athis.seriesObj.symbol1 = symbol;
	athis.seriesObj.symbolSize = symbolSize == null ? 10 : symbolSize;
	athis.seriesObj.symbolRotate = symbolRotate;
	athis.seriesObj.symbolRotate1 = symbolRotate;
}
// 共用 不触发鼠标事件
function silentCommonFun(ochartOption, i, athis, type){
	$("#seriesCommonSilent").show();
	var silent = haveValue(ochartOption, "series."+i+".silent", "boolean") || false;
	athis.seriesObj.silent = silent;
}
// 共用 鼠标移入图例高亮
function legendHoverLinkCommonFun(ochartOption, i, athis, type){
	$("#seriesCommonlegendHoverLink").show();
	var legendHoverLink = haveValue(ochartOption, "series."+i+".legendHoverLink", "boolean");
	athis.seriesObj.legendHoverLink = legendHoverLink == null ? true : legendHoverLink;
}
// 共用 鼠标移入提示动画
function hoverAnimationCommonFun(ochartOption, i, athis, type){
	$("#seriesCommonhoverAnimation").show();
	var hoverAnimation = haveValue(ochartOption, "series."+i+".hoverAnimation", "boolean");
	athis.seriesObj.hoverAnimation = hoverAnimation == null ? true : hoverAnimation;
}
// 共用 直角坐标轴选择
function axisIndexFun(ochartOption, i, athis, type){
	$("#seriesCommonAxisIndex").show();
	var xAxisIndex = haveValue(ochartOption, "series."+i+".xAxisIndex", "number") || 0;
	var yAxisIndex = haveValue(ochartOption, "series."+i+".yAxisIndex", "number") || 0;
	athis.seriesObj.xAxisIndex = xAxisIndex;
	athis.seriesObj.yAxisIndex = yAxisIndex;
}
// 共用 系列层级
function zlevelFun(ochartOption, i, athis, type){
	var zlevel = haveValue(ochartOption, "series."+i+".zlevel", "number") || 0;
	athis.seriesObj.zlevel = zlevel;
}
// 系列中折叠面板属性初始化
function seriesCollapse(val, ochartOption, i, athis, type) {
	switch (val){
		case "label":
			// label 标签
			labelFun(ochartOption, i, athis, type);
			break;
		 case "labelLine":
			// labelLine 标签引导线
			labelLineFun(ochartOption, i, athis);
			break;
		case "itemStyle":
			// itemStyle 拐点
			itemStyleFun(ochartOption, i, athis, type);
			break;
		case "lineStyle":
			// lineStyle 连线
			lineStyleFun(ochartOption, i, athis, type);
			break;
		case "areaStyle":
			// areaStyle 区域填充
			areaStyleFun(ochartOption, i, athis, type);
			break;
		case "leaves":
			// leaves 叶子节点
			leavesFun(ochartOption, i, athis, type);
			break;
		case "edgeLabel":
			// edgeLabel 标签
			edgeLabelFun(ochartOption, i, athis, type);
			break;
		case "markPoint":
			// markPoint 图表标注
			markPointFun(ochartOption, i, athis, type);
			break;
		case "markLine":
			// markLine 图表标线
			markLineFun(ochartOption, i, athis, type);
			break;
		case "markArea":
			// markLine 图表标线
			markAreaFun(ochartOption, i, athis, type);
			break;
		default:
			break;
	}
}
//label
function labelFun(ochartOption, i, athis, type) {
	var labelSelect = haveValue(ochartOption, "series."+i+".labelSelect", "string")|| "normal";
	var labelList = [{name:"普通",labelSelect:"normal"},{name:"高亮(不设置则同普通)",labelSelect:"emphasis"}];
	labelList.forEach(function (item, a) {
		var show = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".show", "boolean");
		item.show = show == null ? false : show;
		var formatter = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".formatter", "string");
		item.formatter = formatter;
		var distance = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".distance", "number") || 5;
		item.distance = distance;
		item.distance1 = distance;
		var rotate = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".rotate", "number") || 0;
		item.rotate = rotate;
		item.rotate1 = rotate;
		var fontFamily = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontFamily", "string") || "sans-serif";
		item.fontFamily = fontFamily;
		if(type == "map"){
			var position = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".position", "string")|| "bottom";
			var color = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".color", "string") || "#000000";
		}else{
			var position = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".position", "string")|| "top";
			var color = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".color", "string") || themeSeriesFun(i);
		}
		item.position = position;
		item.color = color;
		var fontSize = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontSize", "number") || 12;
		item.fontSize = fontSize;
		item.fontSize1 = fontSize;
		var fontStyle = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontStyle", "string") || "normal";
		item.fontStyle = fontStyle;
		var fontWeight = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontWeight", "string") || "normal";
		item.fontWeight = fontWeight;
		var padding =  haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".padding", "number") || 0;
		item.padding = padding;
		item.padding1 = padding;
		var backgroundColor = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".backgroundColor", "string");
		item.backgroundColor = backgroundColor;
		var borderWidth = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderRadius = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".borderRadius", "number") || 0;
		item.borderRadius = borderRadius;
		item.borderRadius1 = borderRadius;
		var borderColor = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	athis.seriesObj.labelSelect = labelSelect;
	athis.seriesObj.labelList = labelList;
}
// labelLine
function labelLineFun(ochartOption, i, athis, type){
	var labelLineSelect = haveValue(ochartOption, "series."+i+".labelLineSelect", "string")|| "normal";
	var labelLineList = [{name:"普通",labelLineSelect:"normal"},{name:"高亮(不设置则同普通)",labelLineSelect:"emphasis"}];
	labelLineList.forEach(function (item, a) {
		var show = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".show", "boolean");
		item.show = show == null ? true : show;
		var length = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".length", "number");
		length = length == null ? 10 : length;
		item.length = length;
		item.length1 = length;
		var length2 = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".length2", "number");
		length2 = length2 == null ? 5 : length2;
		item.length2 = length2;
		item.length21 = length2;
		var smooth = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".smooth", "boolean") || false;
		item.smooth = smooth;
		var lineStyleType = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.type", "string")|| "solid";
		item.lineStyleType = lineStyleType;
		var lineStyleWidth = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.width", "number");
		lineStyleWidth = lineStyleWidth == null ? 1 : lineStyleWidth;
		item.lineStyleWidth = lineStyleWidth;
		item.lineStyleWidth1 = lineStyleWidth;
		var lineStyleColorselected = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyleColorselected", "string") ||"ordinary";
		item.lineStyleColorselected = lineStyleColorselected;
		var lineStylecolor = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.color", "string")|| themeSeriesFun(i);
		item.lineStylecolor = lineStylecolor;
		var lineStylegradationColor = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.color", "object", 0, null, "color");
		item.lineStylegradationColor = lineStylegradationColor;
		var lineStylegradationColor1 = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.color", "object", 1, null, "color");
		item.lineStylegradationColor1 = lineStylegradationColor1;
		var lineStylegradationType = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.color", "object") || "linear";
		item.lineStylegradationType = lineStylegradationType;
		var lineStyleshadowBlur = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.shadowBlur", "number");
		lineStyleshadowBlur = lineStyleshadowBlur == null ? 10 : lineStyleshadowBlur;
		item.lineStyleshadowBlur = lineStyleshadowBlur;
		item.lineStyleshadowBlur1 = lineStyleshadowBlur;
		var lineStyleshadowColor = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.shadowColor", "string") || "rgba(0,0,0,0.5)";
		item.lineStyleshadowColor = lineStyleshadowColor;
		var lineStyleshadowOffsetX = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.shadowOffsetX", "number") || 0;
		item.lineStyleshadowOffsetX = lineStyleshadowOffsetX;
		item.lineStyleshadowOffsetX1 = lineStyleshadowOffsetX;
		var lineStyleshadowOffsetY = haveValue(ochartOption, "series."+i+".labelLine."+ item.labelLineSelect+".lineStyle.shadowOffsetY", "number") || 0;
		item.lineStyleshadowOffsetY = lineStyleshadowOffsetY;
		item.lineStyleshadowOffsetY1 = lineStyleshadowOffsetY;
	});
	athis.seriesObj.labelLineSelect = labelLineSelect;
	athis.seriesObj.labelLineList = labelLineList;
}
// itemStyle
function itemStyleFun(ochartOption, i, athis, type) {
	var itemStyleSelect = haveValue(ochartOption, "series."+i+".itemStyleSelect", "string")|| "normal";
	var itemStyleList = [{name:"普通",itemStyleSelect:"normal"},{name:"高亮(不设置则同普通)",itemStyleSelect:"emphasis"}];
	itemStyleList.forEach(function (item, a) {
		if(type == "map"){
			var itemStyleareaColor = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".itemStyleareaColor", "string")|| "ordinary";
			item.itemStyleareaColor = itemStyleareaColor;
			var areaColor = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".areaColor", "string")|| "#eeeeee";
			item.areaColor = areaColor;
			var areaGradationColor = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".areaColor", "object", 0, null, "color");
			item.areaGradationColor = areaGradationColor;
			var areaGradationColor1 = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".areaColor", "object", 1, null, "color");
			item.areaGradationColor1 = areaGradationColor1;
			var areaGradationType = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".areaColor", "object") || "linear";
			item.areaGradationType = areaGradationType;
		}
		var itemStyleColor = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".itemStyleColor", "string")|| "ordinary";
		item.itemStyleColor = itemStyleColor;
		var color = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".color", "string")|| themeSeriesFun(i);
		item.color = color;
		var gradationColor = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".color", "object", 0, null, "color");
		item.gradationColor = gradationColor;
		var gradationColor1 = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".color", "object", 1, null, "color");
		item.gradationColor1 = gradationColor1;
		var gradationType = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".color", "object") || "linear";
		item.gradationType = gradationType;
		var borderType = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".borderType", "string")|| "solid";
		item.borderType = borderType;
		var borderWidth = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".borderWidth", "number");
		borderWidth = borderWidth == null ? 1 : borderWidth;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderColor = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	athis.seriesObj.itemStyleSelect = itemStyleSelect;
	athis.seriesObj.itemStyleList = itemStyleList;
}
// lineStyle
function lineStyleFun(ochartOption, i, athis, type) {
	var lineStyleSelect =haveValue(ochartOption, "series."+i+".lineStyleSelect", "string") || "normal";
	if(type == "graph"){
		var lineStyleList = [{name:"普通",lineStyleSelect:"normal"},{name:"高亮(不设置则同普通)",lineStyleSelect:"emphasis"}];
	}else{
		var lineStyleList = [{name:"普通",lineStyleSelect:"normal"}];
	}
	lineStyleList.forEach(function(item, i){
		var lineStyleColorselected = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".lineStyleColor", "string")|| "ordinary";
		var lineStyleType = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".type", "string")|| "solid";
		var lineStyleWidth = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".width", "number");
		var curveness = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".curveness", "number");
		curveness = curveness == null ? 0.5 : curveness;
		if(type == "tree"){
			lineStyleWidth = lineStyleWidth == null ? 1.5 : lineStyleWidth;
			var lineStylecolor = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".color", "string") || "#cccccc";
		}else{
			lineStyleWidth = lineStyleWidth == null ? 2 : lineStyleWidth;
			var lineStylecolor = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".color", "string")|| themeSeriesFun(i);
		}
		var lineStylegradationColor = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".color", "object", 0, null, "color");
		var lineStylegradationColor1 = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".color", "object", 1, null, "color");
		var lineStylegradationType = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".color", "object") || "linear";
		var lineStyleshadowBlur = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".shadowBlur", "number") || 0;
		var lineStyleshadowColor = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".shadowColor", "string") || "rgba(0,0,0,0.5)";
		var lineStyleshadowOffsetX = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".shadowOffsetX", "number") || 0;
		var lineStyleshadowOffsetY = haveValue(ochartOption, "series."+i+".lineStyle."+item.lineStyleSelect+".shadowOffsetY", "number") || 0;
		item.lineStyleColorselected = lineStyleColorselected;
		item.lineStyleType = lineStyleType;
		item.lineStyleWidth = lineStyleWidth;
		item.lineStyleWidth1 = lineStyleWidth;
		item.curveness = curveness;
		item.curveness1 = curveness;
		item.lineStylecolor = lineStylecolor;
		item.lineStylegradationColor = lineStylegradationColor;
		item.lineStylegradationColor1 = lineStylegradationColor1;
		item.lineStylegradationType = lineStylegradationType;
		item.lineStyleshadowBlur = lineStyleshadowBlur;
		item.lineStyleshadowBlur1 = lineStyleshadowBlur;
		item.lineStyleshadowColor = lineStyleshadowColor;
		item.lineStyleshadowOffsetX = lineStyleshadowOffsetX;
		item.lineStyleshadowOffsetX1 = lineStyleshadowOffsetX;
		item.lineStyleshadowOffsetY = lineStyleshadowOffsetY;
		item.lineStyleshadowOffsetY1 = lineStyleshadowOffsetY;
	});
	athis.seriesObj.lineStyleSelect = lineStyleSelect;
	athis.seriesObj.lineStyleList = lineStyleList;
}
// areaStyle
function areaStyleFun(ochartOption, i, athis, type) {
	var areaStyleSelect = "normal";
	var areaStyleColorselected = haveValue(ochartOption, "series."+i+".areaStyle.normal.areaStyleColor", "string")|| "ordinary";
	var areaStylecolor = haveValue(ochartOption, "series."+i+".areaStyle.normal.color", "string");
	var areaStylegradationColor = haveValue(ochartOption, "series."+i+".areaStyle.normal.color", "object", 0, null, "color");
	var areaStylegradationColor1 = haveValue(ochartOption, "series."+i+".areaStyle.normal.color", "object", 1, null, "color");
	var areaStylegradationType = haveValue(ochartOption, "series."+i+".areaStyle.normal.color", "object") || "linear";
	var areaStyleshadowBlur = haveValue(ochartOption, "series."+i+".areaStyle.normal.shadowBlur", "number");
	areaStyleshadowBlur = areaStyleshadowBlur == null ? 10 : areaStyleshadowBlur;
	var areaStyleshadowColor = haveValue(ochartOption, "series."+i+".areaStyle.normal.shadowColor", "string") || "rgba(0,0,0,0.5)";
	var areaStyleshadowOffsetX = haveValue(ochartOption, "series."+i+".areaStyle.normal.shadowOffsetX", "number") || 0;
	var areaStyleshadowOffsetY = haveValue(ochartOption, "series."+i+".areaStyle.normal.shadowOffsetY", "number") || 0;
	var areaStyleList = [
		{
			name:"普通",
			areaStyleSelect:"normal",
			areaStyleColorselected: areaStyleColorselected,
			areaStylecolor:areaStylecolor,
			areaStylegradationColor:areaStylegradationColor,
			areaStyleshadowBlur: areaStyleshadowBlur,
			areaStyleshadowBlur1: areaStyleshadowBlur,
			areaStyleshadowColor: areaStyleshadowColor,
			areaStyleshadowOffsetX: areaStyleshadowOffsetX,
			areaStyleshadowOffsetX1: areaStyleshadowOffsetX,
			areaStyleshadowOffsetY: areaStyleshadowOffsetY,
			areaStyleshadowOffsetY1: areaStyleshadowOffsetY,
		}
	];
	athis.seriesObj.areaStyleSelect = areaStyleSelect;
	athis.seriesObj.areaStyleList = areaStyleList;
}
// leaves
function leavesFun(ochartOption, i, athis, type) {
	var seriseLeavesStyle =  haveValue(ochartOption, "series."+i+".seriseLeavesStyle", "string")|| "";
	var leavesList = {};
	var labelSelect = haveValue(ochartOption, "series."+i+".leaves.labelSelect", "string")|| "normal";
	var labelList = [{name:"普通",labelSelect:"normal"},{name:"高亮(不设置则同普通)",labelSelect:"emphasis"}];
	labelList.forEach(function (item, a) {
		var show = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".show", "boolean");
		item.show = show == null ? true : show;
		var position = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".position", "string")|| "top";
		item.position = position;
		var distance = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".distance", "number");
		distance = distance == null ? 5 : distance;
		item.distance = distance;
		item.distance1 = distance;
		var rotate = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".rotate", "number") || 0;
		item.rotate = rotate;
		item.rotate1 = rotate;
		var fontFamily = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".fontFamily", "string") || "sans-serif";
		item.fontFamily = fontFamily;
		var color = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".color", "string") || themeSeriesFun(i);
		item.color = color;
		var fontSize = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".fontSize", "number") || 12;
		item.fontSize = fontSize;
		item.fontSize1 = fontSize;
		var fontStyle = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".fontStyle", "string") || "normal";
		item.fontStyle = fontStyle;
		var fontWeight = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".fontWeight", "string") || "normal";
		item.fontWeight = fontWeight;
		var padding =  haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".padding", "number") || 0;
		item.padding = padding;
		item.padding1 = padding;
		var backgroundColor = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".backgroundColor", "string");
		item.backgroundColor = backgroundColor;
		var borderWidth = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderRadius = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".borderRadius", "number") || 0;
		item.borderRadius = borderRadius;
		item.borderRadius1 = borderRadius;
		var borderColor = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".leaves.label."+ item.labelSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	leavesList.labelSelect = labelSelect;
	leavesList.labelList = labelList;
	var itemStyleSelect = haveValue(ochartOption, "series."+i+".leaves.itemStyleSelect", "string")|| "normal";
	var itemStyleList = [{name:"普通",itemStyleSelect:"normal"},{name:"高亮(不设置则同普通)",itemStyleSelect:"emphasis"}];
	itemStyleList.forEach(function (item, a) {
		var leavesitemStyleColor = haveValue(ochartOption, "series."+i+".leaves.leavesItemStyleColor."+ item.itemStyleSelect+".itemStyleColor", "string")|| "ordinary";
		item.leavesitemStyleColor = leavesitemStyleColor;
		var color = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".color", "string")|| "#cccccc";
		item.color = color;
		var gradationColor = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".color", "object", 0, null, "color");
		item.gradationColor = gradationColor;
		var gradationColor1 = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".color", "object", 1, null, "color");
		item.gradationColor1 = gradationColor1;
		var gradationType = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".color", "object") || "linear";
		item.gradationType = gradationType;
		var borderType = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".borderType", "string")|| "solid";
		item.borderType = borderType;
		var borderWidth = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".borderWidth", "number");
		borderWidth = borderWidth == null ? 1 : borderWidth;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderColor = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".borderColor", "string") || "rgba(205,0,0,1)";
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".leaves.itemStyle."+ item.itemStyleSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	leavesList.itemStyleSelect = itemStyleSelect;
	leavesList.itemStyleList = itemStyleList;
	athis.seriesObj.leavesList = leavesList;
	athis.seriesObj.seriseLeavesStyle = seriseLeavesStyle;
}
// edgeLabel
function edgeLabelFun(ochartOption, i, athis, type){
	var edgeLabelSelect = haveValue(ochartOption, "series."+i+".edgeLabelSelect", "string")|| "normal";
	var edgeLabelList = [{name:"普通",edgeLabelSelect:"normal"},{name:"高亮(不设置则同普通)",edgeLabelSelect:"emphasis"}];
	edgeLabelList.forEach(function (item, a) {
		var show = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".show", "boolean");
		item.show = show == null ? false : show;
		var distance = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".distance", "number");
		distance = distance == null ? 5 : distance;
		item.distance = distance;
		item.distance1 = distance;
		var rotate = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".rotate", "number") || 0;
		item.rotate = rotate;
		item.rotate1 = rotate;
		var fontFamily = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".fontFamily", "string") || "sans-serif";
		item.fontFamily = fontFamily;
		var position = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".position", "string")|| "start";
		item.position = position;		
		var color = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".color", "string") || "";
		item.color = color;
		var fontSize = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".fontSize", "number") || 12;
		item.fontSize = fontSize;
		item.fontSize1 = fontSize;
		var fontStyle = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".fontStyle", "string") || "normal";
		item.fontStyle = fontStyle;
		var fontWeight = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".fontWeight", "string") || "normal";
		item.fontWeight = fontWeight;
		var padding =  haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".padding", "number") || 0;
		item.padding = padding;
		item.padding1 = padding;
		var backgroundColor = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".backgroundColor", "string");
		item.backgroundColor = backgroundColor;
		var borderWidth = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderRadius = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".borderRadius", "number") || 0;
		item.borderRadius = borderRadius;
		item.borderRadius1 = borderRadius;
		var borderColor = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".label."+ item.edgeLabelSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	athis.seriesObj.edgeLabelSelect = edgeLabelSelect;
	athis.seriesObj.edgeLabelList = edgeLabelList;
}
// markPoint
function markPointFun(ochartOption, i, athis, type) {
	var symbol = haveValue(ochartOption, "series."+i+".markPoint.symbol", "string") || "pin";
	var symbolSize = haveValue(ochartOption, "series."+i+".markPoint.symbolSize", "number");
	symbolSize = symbolSize == null ? 50 : symbolSize;
	var symbolRotate = haveValue(ochartOption, "series."+i+".markPoint.symbolRotate", "number") || 0;
	var silent = haveValue(ochartOption, "series."+i+".markPoint.silent", "boolean") || false;
	var select = haveValue(ochartOption, "series."+i+".markPoint.select", "string") || "";
	// markLabel 图表标注标签
	var marklabelSelect = haveValue(ochartOption, "series."+i+".markPoint.label.marklabelSelect", "string") || "normal";
	var marklabelList = [{name:"普通",marklabelSelect:"normal"},{name:"高亮(不设置则同普通)",marklabelSelect:"emphasis"}];
	marklabelList.forEach(function (item, i) {
		var marklabelShow = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".show", "boolean");
		item.marklabelShow = marklabelShow == null ? true : marklabelShow;
		var marklabelPosition = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".position", "string") || "inside";
		item.marklabelPosition = marklabelPosition;
		var marklabelDistance = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".distance", "number");
		marklabelDistance = marklabelDistance == null ? 5 : marklabelDistance;
		item.marklabelDistance = marklabelDistance;
		item.marklabelDistance1 = marklabelDistance;
		var marklabelRotate = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".rotate", "number") || 0;
		item.marklabelRotate = marklabelRotate;
		item.marklabelRotate1 = marklabelRotate;
		var marklabelFontFamily = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".fontFamily", "string") || "sans-serif";
		item.marklabelFontFamily = marklabelFontFamily;
		var marklabelColor = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".color", "string") || "#ffffff";
		item.marklabelColor = marklabelColor;
		var marklabelFontSize = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".fontSize", "number") || 12;
		item.marklabelFontSize = marklabelFontSize;
		item.marklabelFontSize1 = marklabelFontSize;
		var marklabelFontStyle = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".fontStyle", "string") || "normal";
		item.marklabelFontStyle = marklabelFontStyle;
		var marklabelFontWeight = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".fontWeight", "string") || "normal";
		item.marklabelFontWeight = marklabelFontWeight;
		var marklabelPadding = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".padding", "number") || 0;
		item.marklabelPadding = marklabelPadding;
		item.marklabelPadding1 = marklabelPadding;
		var marklabelBackgroundColor = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".backgroundColor", "string");
		item.marklabelBackgroundColor = marklabelBackgroundColor;
		var marklabelBorderWidth = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".borderWidth", "number") || 0;
		item.marklabelBorderWidth = marklabelBorderWidth;
		item.marklabelBorderWidth1 = marklabelBorderWidth;
		var marklabelBorderRadius = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".borderRadius", "number") || 0;
		item.marklabelBorderRadius = marklabelBorderRadius;
		item.marklabelBorderRadius1 = marklabelBorderRadius;
		var marklabelBorderColor = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".borderColor", "string");
		item.marklabelBorderColor = marklabelBorderColor;
		var marklabelShadowBlur = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".shadowBlur", "number") || 0;
		item.marklabelShadowBlur = marklabelShadowBlur;
		item.marklabelShadowBlur1 = marklabelShadowBlur;
		var marklabelShadowColor = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".shadowColor", "string");
		item.marklabelShadowColor = marklabelShadowColor;
		var marklabelShadowOffsetX = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".shadowOffsetX", "number") || 0;
		item.marklabelShadowOffsetX = marklabelShadowOffsetX;
		item.marklabelShadowOffsetX1 = marklabelShadowOffsetX;
		var marklabelShadowOffsetY = haveValue(ochartOption, "series."+i+".markPoint.label."+item.marklabelSelect+".shadowOffsetY", "number") || 0;
		item.marklabelShadowOffsetY = marklabelShadowOffsetY;
		item.marklabelShadowOffsetY1 = marklabelShadowOffsetY;
	});
	// markItemStyle 图表标注图形
	var markItemStyleSelect = haveValue(ochartOption, "series."+i+".markPoint.itemStyle.markItemStyleSelect", "string") || "normal";
	var markItemStyleList = [{name:"普通",markItemStyleSelect:"normal"},{name:"高亮(不设置则同普通)",markItemStyleSelect:"emphasis"}];
	markItemStyleList.forEach(function (item, i) {
		var itemStyleColor = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleList+".itemStyleColor", "string")|| "ordinary";
		item.itemStyleColor = itemStyleColor;
		var color = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".color", "string")|| themeSeriesFun(i);
		item.color = color;
		var gradationColor = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".color", "object", 0, null, "color");
		item.gradationColor = gradationColor;
		var gradationColor1 = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".color", "object", 1, null, "color");
		item.gradationColor1 = gradationColor1;
		var gradationType = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".color", "object") || "linear";
		item.gradationType = gradationType;
		var borderType = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".borderType", "string")|| "solid";
		item.borderType = borderType;
		var borderWidth = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderColor = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".shadowColor", "string") || "rgba(0,0,0,1)";
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".itemStyle."+ item.markPointItemStyleSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".markPoint.itemStyle."+ item.markPointItemStyleSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	var markPointList = {
		symbol:symbol,
		symbolSize:symbolSize,
		symbolSize1:symbolSize,
		symbolRotate:symbolRotate,
		symbolRotate1:symbolRotate,
		silent:silent,
		select:select,
		marklabelSelect:marklabelSelect,
		marklabelList:marklabelList,
		markItemStyleSelect:markItemStyleSelect,
		markItemStyleList:markItemStyleList
	};
	athis.seriesObj.markPointList = markPointList;
}
// markLine
function markLineFun(ochartOption, i, athis, type) {
	var symbol1 = haveValue(ochartOption, "series."+i+".markLine.symbol", "array", 0, null, "radio") || "circle";
	var symbol2 = haveValue(ochartOption, "series."+i+".markLine.symbol", "array", 1, null, "radio") || "arrow";
	var symbolSize = haveValue(ochartOption, "series."+i+".markLine.symbolSize", "number");
	symbolSize = symbolSize == null ? 4 : symbolSize;	
	var precision = haveValue(ochartOption, "series."+i+".markLine.precision", "number");
	precision = precision == null ? 2 : precision;	
	var silent = haveValue(ochartOption, "series."+i+".markLine.silent", "boolean") || false;
	var select = haveValue(ochartOption, "series."+i+".markLine.select", "string") || "";
	// markLabel 图表标线标签
	var marklabelSelect = haveValue(ochartOption, "series."+i+".markLine.label.marklabelSelect", "string") || "normal";
	var marklabelList = [{name:"普通",marklabelSelect:"normal"},{name:"高亮(不设置则同普通)",marklabelSelect:"emphasis"}];
	marklabelList.forEach(function (item, i) {
		var marklabelShow = haveValue(ochartOption, "series."+i+".markLine.label."+item.marklabelSelect+".show", "boolean");
		item.marklabelShow = marklabelShow == null ? true : marklabelShow;
		var marklabelPosition = haveValue(ochartOption, "series."+i+".markLine.label."+item.marklabelSelect+".position", "string") || "end";
		item.marklabelPosition = marklabelPosition;
	});
	// markLineStyle 图表标线线条
	var markLineStyleSelect = haveValue(ochartOption, "series."+i+".markLine.lineStyle.markLineStyleSelect", "string") || "normal";
	var markLineStyleList = [{name:"普通",markLineStyleSelect:"normal"},{name:"高亮(不设置则同普通)",markLineStyleSelect:"emphasis"}];
	markLineStyleList.forEach(function (item, i) {
		var lineStyleColor = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".lineStyleColor", "string")|| "ordinary";
		item.lineStyleColor = lineStyleColor;
		var color = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".color", "string")|| themeSeriesFun(i);
		item.color = color;
		var gradationColor = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".color", "object", 0, null, "color");
		item.gradationColor = gradationColor;
		var gradationColor1 = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".color", "object", 1, null, "color");
		item.gradationColor1 = gradationColor1;
		var gradationType = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".color", "object") || "linear";
		item.gradationType = gradationType;
		var type = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".borderType", "string")|| "dashed";
		item.type = type;
		var width = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".width", "number");
		width = width == null ? 1 : width;
		item.width = width;
		item.width1 = width;
		var shadowBlur = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".shadowColor", "string") || "rgba(0,0,0,1)";
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".lineStyle."+ item.markLineStyleSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".markLine.lineStyle."+ item.markLineStyleSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	var markLineList = {
		symbol1:symbol1,
		symbol2:symbol2,
		symbolSize:symbolSize,
		symbolSize1:symbolSize,
		precision:precision,
		precision1:precision,
		silent:silent,
		select:select,
		marklabelSelect:marklabelSelect,
		marklabelList:marklabelList,
		markLineStyleSelect:markLineStyleSelect,
		markLineStyleList:markLineStyleList
	};
	athis.seriesObj.markLineList = markLineList;
}
// markArea
function markAreaFun(ochartOption, i, athis, type) {
	var silent = haveValue(ochartOption, "series."+i+".markArea.silent", "boolean") || false;
	var select = haveValue(ochartOption, "series."+i+".markArea.select", "string") || "";
	// markLabel 图表标注标签
	var marklabelSelect = haveValue(ochartOption, "series."+i+".markArea.label.marklabelSelect", "string") || "normal";
	var marklabelList = [{name:"普通",marklabelSelect:"normal"},{name:"高亮(不设置则同普通)",marklabelSelect:"emphasis"}];
	marklabelList.forEach(function (item, i) {
		var marklabelShow = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".show", "boolean");
		item.marklabelShow = marklabelShow == null ? true : marklabelShow;
		var marklabelPosition = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".position", "string") || "inside";
		item.marklabelPosition = marklabelPosition;
		var marklabelDistance = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".distance", "number");
		marklabelDistance = marklabelDistance == null ? 5 : marklabelDistance;
		item.marklabelDistance = marklabelDistance;
		item.marklabelDistance1 = marklabelDistance;
		var marklabelRotate = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".rotate", "number") || 0;
		item.marklabelRotate = marklabelRotate;
		item.marklabelRotate1 = marklabelRotate;
		var marklabelFontFamily = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".fontFamily", "string") || "sans-serif";
		item.marklabelFontFamily = marklabelFontFamily;
		var marklabelColor = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".color", "string") || "#ffffff";
		item.marklabelColor = marklabelColor;
		var marklabelFontSize = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".fontSize", "number") || 12;
		item.marklabelFontSize = marklabelFontSize;
		item.marklabelFontSize1 = marklabelFontSize;
		var marklabelFontStyle = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".fontStyle", "string") || "normal";
		item.marklabelFontStyle = marklabelFontStyle;
		var marklabelFontWeight = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".fontWeight", "string") || "normal";
		item.marklabelFontWeight = marklabelFontWeight;
		var marklabelPadding = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".padding", "number") || 0;
		item.marklabelPadding = marklabelPadding;
		item.marklabelPadding1 = marklabelPadding;
		var marklabelBackgroundColor = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".backgroundColor", "string");
		item.marklabelBackgroundColor = marklabelBackgroundColor;
		var marklabelBorderWidth = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".borderWidth", "number") || 0;
		item.marklabelBorderWidth = marklabelBorderWidth;
		item.marklabelBorderWidth1 = marklabelBorderWidth;
		var marklabelBorderRadius = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".borderRadius", "number") || 0;
		item.marklabelBorderRadius = marklabelBorderRadius;
		item.marklabelBorderRadius1 = marklabelBorderRadius;
		var marklabelBorderColor = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".borderColor", "string");
		item.marklabelBorderColor = marklabelBorderColor;
		var marklabelShadowBlur = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".shadowBlur", "number") || 0;
		item.marklabelShadowBlur = marklabelShadowBlur;
		item.marklabelShadowBlur1 = marklabelShadowBlur;
		var marklabelShadowColor = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".shadowColor", "string");
		item.marklabelShadowColor = marklabelShadowColor;
		var marklabelShadowOffsetX = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".shadowOffsetX", "number") || 0;
		item.marklabelShadowOffsetX = marklabelShadowOffsetX;
		item.marklabelShadowOffsetX1 = marklabelShadowOffsetX;
		var marklabelShadowOffsetY = haveValue(ochartOption, "series."+i+".markArea.label."+item.marklabelSelect+".shadowOffsetY", "number") || 0;
		item.marklabelShadowOffsetY = marklabelShadowOffsetY;
		item.marklabelShadowOffsetY1 = marklabelShadowOffsetY;
	});
	// markItemStyle 图表标注图形
	var markItemStyleSelect = haveValue(ochartOption, "series."+i+".markArea.itemStyle.markItemStyleSelect", "string") || "normal";
	var markItemStyleList = [{name:"普通",markItemStyleSelect:"normal"},{name:"高亮(不设置则同普通)",markItemStyleSelect:"emphasis"}];
	markItemStyleList.forEach(function (item, i) {
		var itemStyleColor = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleList+".itemStyleColor", "string")|| "ordinary";
		item.itemStyleColor = itemStyleColor;
		var color = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".color", "string")|| themeSeriesFun(i);
		item.color = color;
		var gradationColor = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".color", "object", 0, null, "color");
		item.gradationColor = gradationColor;
		var gradationColor1 = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".color", "object", 1, null, "color");
		item.gradationColor1 = gradationColor1;
		var gradationType = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".color", "object") || "linear";
		item.gradationType = gradationType;
		var borderType = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".borderType", "string")|| "solid";
		item.borderType = borderType;
		var borderWidth = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderColor = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".shadowColor", "string") || "rgba(0,0,0,1)";
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".itemStyle."+ item.markAreaItemStyleSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".markArea.itemStyle."+ item.markAreaItemStyleSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	var markAreaList = {
		silent:silent,
		select:select,
		marklabelSelect:marklabelSelect,
		marklabelList:marklabelList,
		markItemStyleSelect:markItemStyleSelect,
		markItemStyleList:markItemStyleList
	};
	athis.seriesObj.markAreaList = markAreaList;
}
//data
function dataListFun(ochartOption, i, type, athis) {
	var data1 = [];
	var data2 = [];
	var seriesDataList = [];
	var seriesDataIndex = haveValue(ochartOption, "series."+i+".seriesDataIndex", "string") || 0;
	ochartOption.series[i].data.forEach(function (ditem, d) {
		seriesDataList.push({name: "元素"+(d+1)});
		if(typeof(ditem) != "object"){
			data1.push({value: ditem});
		}
		data2.push({});
	});
	athis.seriesObj.seriesDataObj.seriesDataList = seriesDataList;
	athis.seriesObj.seriesDataIndex = seriesDataIndex;
	seriesDataFun(ochartOption, i, seriesDataIndex, type, athis);
	canvasArray.forEach(function (item, a) {
		if(item.id == sxID){
			var chartOption = allOptions[a].staticOption.chartOption.series[i].data;
			if(chartOption == undefined){
				allOptions[a].staticOption.chartOption.series[i].data = data2;
				if(data1.length>0){
					allOptions[a].staticOption.dataOption.series[i].data = data1;
				}
			}
		}
	});
}
function seriesDataFun(ochartOption, i, d, type, athis){
	var seriseDtatStyle = haveValue(ochartOption, "series."+i+".data."+d+".seriseDtatStyle", "string")|| "";
	athis.seriesObj.seriesDataObj.seriseDtatStyle = seriseDtatStyle;
	
	if(type == "wordCloud"){
		$("#seriesDataLabel").hide();
		$("#seriesDataItemStyle").hide();
		$("#seriesDataItemStyleWordCloud").show();
		dataWordItemStyleFun(ochartOption, i, d, type, athis);
	}else{
		if (type == "line" || type == "scatter" || type == "effectScatter" || type == "radar" || type == "tree" || type == "graph"){
			dataStyleFun(ochartOption, i, d, type, athis)
		}
		dataLabelFun(ochartOption, i, d, type, athis);
		dataItemStyleFun(ochartOption, i, d, type, athis);
		if(type == "pie" || type == "funnel"){
			datalabelLineFun(ochartOption, i, d, type, athis);
		}else if(type == "lines"){
			datalineStyleFun(ochartOption, i, d, type, athis);
		}
	}
}
// data label
function dataLabelFun(ochartOption, i, d, type, athis) {
	athis.seriesObj.seriesDataObj.labelList = labelList;
	var labelSelect = haveValue(ochartOption, "series."+i+".data."+d+".labelSelect", "string")|| "normal";
	var labelList = [{name:"普通",labelSelect:"normal"},{name:"高亮(不设置则同普通)",labelSelect:"emphasis"}];
	labelList.forEach(function (item, a) {
		var show = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".show", "boolean") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".show", "boolean");
		item.show = show == null ? false : show;
		var position = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".position", "string")|| haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".position", "string");
		item.position = position;
		var distance = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".distance", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".distance", "number");
		distance = distance == null ? 5 : distance;
		item.distance = distance;
		item.distance1 = distance;
		var rotate = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".rotate", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".rotate", "number") ||0;
		item.rotate = rotate;
		item.rotate1 = rotate;
		var fontFamily = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".fontFamily", "string") ||  haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontFamily", "string") || "sans-serif";
		item.fontFamily = fontFamily;
		var color = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".color", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".color", "string") || themeSeriesFun(i);
		item.color = color;
		var fontSize = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".fontSize", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontSize", "number") || 12;
		item.fontSize = fontSize;
		item.fontSize1 = fontSize;
		var fontStyle = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".fontStyle", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontStyle", "string") || "normal";
		item.fontStyle = fontStyle;
		var fontWeight = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".fontWeight", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontWeight", "string") || "normal";
		item.fontWeight = fontWeight;
		var padding =  haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".padding", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".padding", "number") || 0;
		item.padding = padding;
		item.padding1 = padding;
		var backgroundColor = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".backgroundColor", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".backgroundColor", "string");
		item.backgroundColor = backgroundColor;
		var borderWidth = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".borderWidth", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderRadius = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".borderRadius", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".borderRadius", "number") || 0;
		item.borderRadius = borderRadius;
		item.borderRadius1 = borderRadius;
		var borderColor = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".shadowBlur", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".shadowColor", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".shadowOffsetX", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".data."+d+".label."+ item.labelSelect+".shadowOffsetY", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	athis.seriesObj.seriesDataObj.labelSelect = labelSelect;
	athis.seriesObj.seriesDataObj.labelList = labelList;
}
// data labelLine
function datalabelLineFun(ochartOption, i, d, type, athis) {
	var labelLineSelect = haveValue(ochartOption, "series."+i+".labelLineSelect", "string")|| "normal";
	var labelLineList = [{name:"普通",labelLineSelect:"normal"},{name:"高亮(不设置则同普通)",labelLineSelect:"emphasis"}];
	labelLineList.forEach(function (item, a) {
		if(type == "pie"){
			var num = 0;
			ochartOption.series[i].data.forEach(function (aitem, a) {
				var color = haveValue(aitem, "itemStyle."+ item.labelLineSelect+".lineStyle.color", "string");
				if(color != null){
					num++;
				}
				if(d == a){
					return;
				}
			});
			var themeColor =  themeSeriesFun(d-num);
		}else{
			var themeColor =  themeSeriesFun(i);
		}
		var show = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".show", "boolean");
		item.show = show == null ? true : show;
		var length = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".length", "number");
		length = length == null ? 10 : length;
		item.length = length;
		item.length1 = length;
		var length2 = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".length2", "number");
		length2 = length2 == null ? 5 : length2;
		item.length2 = length2;
		item.length21 = length2;
		var smooth = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".smooth", "boolean") || false;
		item.smooth = smooth;
		var lineStyleType = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.type", "string")|| "solid";
		item.lineStyleType = lineStyleType;
		var lineStyleWidth = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.width", "number");
		lineStyleWidth = lineStyleWidth == null ? 1 : lineStyleWidth;
		item.lineStyleWidth = lineStyleWidth;
		item.lineStyleWidth1 = lineStyleWidth;
		var lineStyleColorselected = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyleColorselected", "string") ||"ordinary";
		item.lineStyleColorselected = lineStyleColorselected;
		var lineStylecolor = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.color", "string")|| themeSeriesFun(i);
		item.lineStylecolor = lineStylecolor;
		item.lineStylecolor1 = lineStylecolor;
		var lineStylegradationColor = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.color", "object", 0, null, "color");
		item.lineStylegradationColor = lineStylegradationColor;
		var lineStylegradationColor1 = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.color", "object", 1, null, "color");
		item.lineStylegradationColor1 = lineStylegradationColor1;
		var lineStylegradationType = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.color", "object") || "linear";
		item.lineStylegradationType = lineStylegradationType;
		var lineStyleshadowBlur = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.shadowBlur", "number");
		lineStyleshadowBlur = lineStyleshadowBlur == null ? 10 : lineStyleshadowBlur;
		item.lineStyleshadowBlur = lineStyleshadowBlur;
		item.lineStyleshadowBlur1 = lineStyleshadowBlur;
		var lineStyleshadowColor = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.shadowColor", "string") || "rgba(0,0,0,0.5)";
		item.lineStyleshadowColor = lineStyleshadowColor;
		var lineStyleshadowOffsetX = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.shadowOffsetX", "number") || 0;
		item.lineStyleshadowOffsetX = lineStyleshadowOffsetX;
		item.lineStyleshadowOffsetX1 = lineStyleshadowOffsetX;
		var lineStyleshadowOffsetY = haveValue(ochartOption, "series."+i+".data."+d+".labelLine."+ item.labelLineSelect+".lineStyle.shadowOffsetY", "number") || 0;
		item.lineStyleshadowOffsetY = lineStyleshadowOffsetY;
		item.lineStyleshadowOffsetY1 = lineStyleshadowOffsetY;
	});
	athis.seriesObj.seriesDataObj.labelLineSelect = labelLineSelect;
	athis.seriesObj.seriesDataObj.labelLineList = labelLineList;
}
// data itemStyle
function dataItemStyleFun(ochartOption, i, d, type, athis) {
	var itemStyleSelect = haveValue(ochartOption, "series."+i+".data."+d+".itemStyleSelect", "string") || "normal";
	var itemStyleList = [{name:"普通",itemStyleSelect:"normal"},{name:"高亮(不设置则同普通)",itemStyleSelect:"emphasis"}];
	itemStyleList.forEach(function (item, a) {
		if(type == "pie"){
			var num = 0;
			ochartOption.series[i].data.forEach(function (aitem, a) {
				var color = haveValue(aitem, "itemStyle."+ item.itemStyleSelect+".color", "string");
				if(color != null){
					num++;
				}
				if(d == a){
					return;
				}
			});
			var themeColor =  themeSeriesFun(d-num);
		}else{
			var themeColor =  themeSeriesFun(i);
		}
		if(type == "map"){
			$(".map").show();
			var itemStyleareaColor = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".itemStyleareaColor", "string")|| "ordinary";
			item.itemStyleareaColor = itemStyleareaColor;
			var areaColor = haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".areaColor", "string")|| haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".areaColor", "string")|| "#eeeeee";
			item.areaColor = areaColor;
			var areaGradationColor = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".areaColor", "object", 0, null, "color");
			item.areaGradationColor = areaGradationColor;
			var areaGradationColor1 = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".areaColor", "object", 1, null, "color");
			item.areaGradationColor1 = areaGradationColor1;
			var areaGradationType = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".areaColor", "object") || "linear";
			item.areaGradationType = areaGradationType;
		}
		var itemStyleColor = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".itemStyleColor", "string")|| "ordinary";
		item.itemStyleColor = itemStyleColor;
		var color = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".color", "string") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".color", "string") || themeColor;
		item.color = color;
		var gradationColor = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".color", "object", 0, null, "color");
		item.gradationColor = gradationColor;
		var gradationColor1 = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".color", "object", 1, null, "color");
		item.gradationColor1 = gradationColor1;
		var gradationType = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".color", "object") || "linear";
		item.gradationType = gradationType;
		var borderType = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".borderType", "string")|| haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".borderType", "string")|| "solid";
		item.borderType = borderType;
		var borderWidth = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".borderWidth", "number") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderColor = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".shadowBlur", "number") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".shadowColor", "string") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".shadowOffsetX", "number") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.itemStyleSelect+".shadowOffsetY", "number") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	athis.seriesObj.seriesDataObj.itemStyleSelect = itemStyleSelect;
	athis.seriesObj.seriesDataObj.itemStyleList = itemStyleList;
}
// data WordCloud itemStyle
function dataWordItemStyleFun(ochartOption, i, d, type, athis) {
	var WordItemStyleSelect = haveValue(ochartOption, "series."+i+".data."+d+".WordItemStyleSelect", "string")|| "normal";
	var WordItemStyleList = [{name:"普通",WordItemStyleSelect:"normal"},{name:"高亮(不设置则同普通)",WordItemStyleSelect:"emphasis"}];
	WordItemStyleList.forEach(function(item, a){
		var color = haveValue(ochartOption, "series."+i+".data."+d+".itemStyle."+ item.WordItemStyleSelect+".color", "string") || themeSeriesFun(i);
		item.color = color;
	});
	athis.seriesObj.seriesDataObj.WordItemStyleSelect = WordItemStyleSelect;
	athis.seriesObj.seriesDataObj.WordItemStyleList = WordItemStyleList;
}
// data lineStyle
function datalineStyleFun(ochartOption, i, d, type, athis) {
	var lineStyleSelect = haveValue(ochartOption, "series."+i+".data."+d+".lineStyleSelect", "string") || "normal";
	if(type == "graph"){
		var lineStyleList = [{name:"普通",lineStyleSelect:"normal"},{name:"高亮(不设置则同普通)",lineStyleSelect:"emphasis"}];
	}else{
		var lineStyleList = [{name:"普通",lineStyleSelect:"normal"}];
	}
	lineStyleList.forEach(function(item, i){
		var lineStyleColorselected = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".lineStyleColor", "string")|| "ordinary";
		var lineStyleType = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".type", "string")|| "solid";
		var lineStyleWidth = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".borderWidth", "number");
		lineStyleWidth = lineStyleWidth == null ? 2 : lineStyleWidth;		
		var lineStylecolor = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".color", "string")|| themeSeriesFun(i);
		var lineStylegradationColor = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".color", "object", 0, null, "color");
		var lineStylegradationColor1 = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".color", "object", 1, null, "color");
		var lineStylegradationType = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".color", "object") || "linear";
		var lineStyleshadowBlur = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".shadowBlur", "number");
		lineStyleshadowBlur = lineStyleshadowBlur == null ? 10 : lineStyleshadowBlur;
		var lineStyleshadowColor = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".shadowColor", "string") || "rgba(0,0,0,0.5)";
		var lineStyleshadowOffsetX = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".shadowOffsetX", "number") || 0;
		var lineStyleshadowOffsetY = haveValue(ochartOption, "series."+i+".data."+d+".lineStyle."+item.lineStyleSelect+".shadowOffsetY", "number") || 0;
		item.lineStyleColorselected = lineStyleColorselected;
		item.lineStyleType = lineStyleType;
		item.lineStyleWidth = lineStyleWidth;
		item.lineStyleWidth1 = lineStyleWidth;
		item.lineStylecolor = lineStylecolor;
		item.lineStylegradationColor = lineStylegradationColor;
		item.lineStylegradationColor1 = lineStylegradationColor1;
		item.lineStylegradationType = lineStylegradationType;
		item.lineStyleshadowBlur = lineStyleshadowBlur;
		item.lineStyleshadowBlur1 = lineStyleshadowBlur;
		item.lineStyleshadowColor = lineStyleshadowColor;
		item.lineStyleshadowOffsetX = lineStyleshadowOffsetX;
		item.lineStyleshadowOffsetX1 = lineStyleshadowOffsetX;
		item.lineStyleshadowOffsetY = lineStyleshadowOffsetY;
		item.lineStyleshadowOffsetY1 = lineStyleshadowOffsetY;
	});
	athis.seriesObj.seriesDataObj.lineStyleSelect = lineStyleSelect;
	athis.seriesObj.seriesDataObj.lineStyleList = lineStyleList;
}
// data 其他
function dataStyleFun(ochartOption, i, d, type, athis){
	var symbolType = haveValue(ochartOption, "series."+i+".data."+d+".symbolType", "string") || "common";
	athis.seriesObj.seriesDataObj.symbolType = symbolType;
	var symbol = haveValue(ochartOption, "series."+i+".data."+d+".symbol", "string") || "";
	athis.seriesObj.seriesDataObj.symbol = symbol;
	var symbolSize = haveValue(ochartOption, "series."+i+".data."+d+".symbolSize", "number");
	athis.seriesObj.seriesDataObj.symbolSize = symbolSize;
	var symbolRotate = haveValue(ochartOption, "series."+i+".data."+d+".symbolRotate", "number") || haveValue(ochartOption, "series."+i+".symbolRotate", "number") || 0;
	athis.seriesObj.seriesDataObj.symbolRotate = symbolRotate;
	athis.seriesObj.seriesDataObj.symbolRotate1 = symbolRotate;
}
// categories
function categoriesListFun(ochartOption, i, type, athis) {
	var categories = ochartOption.series[i].categories;
	if(categories != undefined){
		$("#categories").show();
		var seriesCategoriesList = [];
		console.log(ochartOption.series[i].categories, 3608)
		var seriesCategoriesIndex = haveValue(ochartOption, "series."+i+".seriesCategoriesIndex", "string")|| 0;
		ochartOption.series[i].categories.forEach(function (ditem, d) {
			seriesCategoriesList.push({name: "类目"+(d+1)});
		});
		athis.seriesObj.seriesCategoriesList = seriesCategoriesList;
		athis.seriesObj.seriesCategoriesIndex = seriesCategoriesIndex;
		seriesCategoriesFun(ochartOption, i, seriesCategoriesIndex, type, athis);
	}
}
function seriesCategoriesFun(ochartOption, i, d, type, athis){
	var seriseCategoriesStyle = haveValue(ochartOption, "series."+i+".data."+d+".seriseCategoriesStyle", "string")|| "";
	athis.seriesObj.seriesDataObj.seriseCategoriesStyle = seriseCategoriesStyle;
	categoriesStyleFun(ochartOption, i, d, type, athis)
	categoriesLabelFun(ochartOption, i, d, type, athis);
	categoriesItemStyleFun(ochartOption, i, d, type, athis);
}
// categories 其他
function categoriesStyleFun(ochartOption, i, d, type, athis){
	var symbolType = haveValue(ochartOption, "series."+i+".categories."+d+".symbolType", "string") || "common";
	athis.seriesObj.seriesCategoriesObj.symbolType = symbolType;
	var symbol = haveValue(ochartOption, "series."+i+".categories."+d+".symbol", "string") || "";
	athis.seriesObj.seriesCategoriesObj.symbol = symbol;
	var symbolSize = haveValue(ochartOption, "series."+i+".categories."+d+".symbolSize", "number") || haveValue(ochartOption, "series."+i+".symbolSize", "number");
	athis.seriesObj.seriesCategoriesObj.symbolSize = symbolSize;
	var symbolRotate = haveValue(ochartOption, "series."+i+".categories."+d+".symbolRotate", "number") || haveValue(ochartOption, "series."+i+".symbolRotate", "number") || 0;
	athis.seriesObj.seriesCategoriesObj.symbolRotate = symbolRotate;
	athis.seriesObj.seriesCategoriesObj.symbolRotate1 = symbolRotate;
}
// categories label
function categoriesLabelFun(ochartOption, i, d, type, athis) {
	var labelSelect = haveValue(ochartOption, "series."+i+".categories."+d+".labelSelect", "string")|| "normal";
	var labelList = [{name:"普通",labelSelect:"normal"},{name:"高亮(不设置则同普通)",labelSelect:"emphasis"}];
	labelList.forEach(function (item, a) {
		var show = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".show", "boolean") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".show", "boolean");
		item.show = show == null ? false : show;
		var position = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".position", "string")|| haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".position", "string")|| "top";
		item.position = position;
		var distance = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".distance", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".distance", "number");
		distance = distance == null ? 5 : distance;
		item.distance = distance;
		item.distance1 = distance;
		var rotate = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".rotate", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".rotate", "number") ||0;
		item.rotate = rotate;
		item.rotate1 = rotate;
		var fontFamily = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".fontFamily", "string") ||  haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontFamily", "string") || "sans-serif";
		item.fontFamily = fontFamily;
		var color = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".color", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".color", "string") || themeSeriesFun(i);
		item.color = color;
		var fontSize = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".fontSize", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontSize", "number") || 12;
		item.fontSize = fontSize;
		item.fontSize1 = fontSize;
		var fontStyle = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".fontStyle", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontStyle", "string") || "normal";
		item.fontStyle = fontStyle;
		var fontWeight = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".fontWeight", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontWeight", "string") || "normal";
		item.fontWeight = fontWeight;
		var padding =  haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".padding", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".padding", "number") || 0;
		item.padding = padding;
		item.padding1 = padding;
		var backgroundColor = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".backgroundColor", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".backgroundColor", "string");
		item.backgroundColor = backgroundColor;
		var borderWidth = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".borderWidth", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderRadius = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".borderRadius", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".borderRadius", "number") || 0;
		item.borderRadius = borderRadius;
		item.borderRadius1 = borderRadius;
		var borderColor = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".shadowBlur", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".shadowColor", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".shadowOffsetX", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".categories."+d+".label."+ item.labelSelect+".shadowOffsetY", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	athis.seriesObj.seriesCategoriesObj.labelSelect = labelSelect;
	athis.seriesObj.seriesCategoriesObj.labelList = labelList;
}
// categories itemStyle
function categoriesItemStyleFun(ochartOption, i, d, type, athis) {
	var itemStyleSelect = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyleSelect", "string")|| "normal";
	var itemStyleList = [{name:"普通",itemStyleSelect:"normal"},{name:"高亮(不设置则同普通)",itemStyleSelect:"emphasis"}];
	var themeColor =  themeSeriesFun(i);
	itemStyleList.forEach(function (item, a) {
		var itemStyleColor = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".itemStyleColor", "string")|| "ordinary";
		item.itemStyleColor = itemStyleColor;
		var color = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".color", "string") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".color", "string") || themeColor;
		item.color = color;
		var gradationColor = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".color", "object", 0, null, "color");
		item.gradationColor = gradationColor;
		var gradationColor1 = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".color", "object", 1, null, "color");
		item.gradationColor1 = gradationColor1;
		var gradationType = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".color", "object") || "linear";
		item.gradationType = gradationType;
		var borderType = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".borderType", "string")|| haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".borderType", "string")|| "solid";
		item.borderType = borderType;
		var borderWidth = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".borderWidth", "number") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderColor = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".shadowBlur", "number") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".shadowColor", "string") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".shadowOffsetX", "number") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".categories."+d+".itemStyle."+ item.itemStyleSelect+".shadowOffsetY", "number") || haveValue(ochartOption, "series."+i+".itemStyle."+ item.itemStyleSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	athis.seriesObj.seriesCategoriesObj.itemStyleSelect = itemStyleSelect;
	athis.seriesObj.seriesCategoriesObj.itemStyleList = itemStyleList;
}
// links
function linksListFun(ochartOption, i, type, athis) {
	var links = ochartOption.series[i].links;
	if(links != undefined){
		$("#links").show();
		var seriesLinksList = [];
		var seriesLinksIndex = haveValue(ochartOption, "series."+i+".seriesLinksIndex", "string")|| 0;
		ochartOption.series[i].links.forEach(function (ditem, d) {
			seriesLinksList.push({name: "线条"+(d+1)});
		});
		seriesLinksFun(ochartOption, i, seriesLinksIndex, type, athis);
		athis.seriesObj.seriesLinksObj.seriesLinksList = seriesLinksList;
		athis.seriesObj.seriesLinksObj.seriesLinksIndex = seriesLinksIndex;
	}
}
function seriesLinksFun(ochartOption, i, d, type, athis){
	var seriseLinksStyle = haveValue(ochartOption, "series."+i+".links."+d+".seriseLinksStyle", "string")|| "";
	linksStyleFun(ochartOption, i, d, type, athis)
	linksLabelFun(ochartOption, i, d, type, athis);
	linksLineStyleFun(ochartOption, i, d, type, athis);
	athis.seriesObj.seriesLinksObj.seriseLinksStyle = seriseLinksStyle;	
}
// links 其他
function linksStyleFun(ochartOption, i, d, type, athis){
	var symbolType = haveValue(ochartOption, "series."+i+".categories."+d+".symbolType", "string") || "common";
	var symbol1 = haveValue(ochartOption, "series."+i+".links."+d+".symbol", "string");
	var symbol2 = haveValue(ochartOption, "series."+i+".links."+d+".symbol", "string");
	var symbolSize = haveValue(ochartOption, "series."+i+".links."+d+".symbolSize", "number") || haveValue(ochartOption, "series."+i+".symbolSize", "number");
	symbolSize = symbolSize == null ? 10 : symbolSize;	
	var symbolRotate = haveValue(ochartOption, "series."+i+".links."+d+".symbolRotate", "number") || haveValue(ochartOption, "series."+i+".symbolRotate", "number") || 0;
	athis.seriesObj.seriesLinksObj = {
		symbolType:symbolType,
		symbol1: symbol1,
		symbol2: symbol2,
		symbolSize: symbolSize,
		symbolRotate: symbolRotate,
		symbolRotate1: symbolRotate,
		labelList:[],
		lineStyleList:[]
	}
}
// links label
function linksLabelFun(ochartOption, i, d, type, athis) {
	var labelSelect = haveValue(ochartOption, "series."+i+".links."+d+".labelSelect", "string")|| "normal";
	var labelList = [{name:"普通",labelSelect:"normal"},{name:"高亮(不设置则同普通)",labelSelect:"emphasis"}];
	labelList.forEach(function (item, a) {
		var show = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".show", "boolean") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".show", "boolean") || false;
		item.show = show;
		var position = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".position", "string")|| haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".position", "string")|| "top";
		item.position = position;
		var distance = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".distance", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".distance", "number");
		distance = distance == null ? 5 : distance;
		item.distance = distance;
		item.distance1 = distance;
		var rotate = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".rotate", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".rotate", "number") ||0;
		item.rotate = rotate;
		item.rotate1 = rotate;
		var fontFamily = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".fontFamily", "string") ||  haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontFamily", "string") || "sans-serif";
		item.fontFamily = fontFamily;
		var color = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".color", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".color", "string") || themeSeriesFun(i);
		item.color = color;
		var fontSize = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".fontSize", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontSize", "number") || 12;
		item.fontSize = fontSize;
		item.fontSize1 = fontSize;
		var fontStyle = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".fontStyle", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontStyle", "string") || "normal";
		item.fontStyle = fontStyle;
		var fontWeight = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".fontWeight", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".fontWeight", "string") || "normal";
		item.fontWeight = fontWeight;
		var padding =  haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".padding", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".padding", "number") || 0;
		item.padding = padding;
		item.padding1 = padding;
		var backgroundColor = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".backgroundColor", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".backgroundColor", "string");
		item.backgroundColor = backgroundColor;
		var borderWidth = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".borderWidth", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".borderWidth", "number") || 0;
		item.borderWidth = borderWidth;
		item.borderWidth1 = borderWidth;
		var borderRadius = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".borderRadius", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".borderRadius", "number") || 0;
		item.borderRadius = borderRadius;
		item.borderRadius1 = borderRadius;
		var borderColor = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".borderColor", "string");
		item.borderColor = borderColor;
		var shadowBlur = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".shadowBlur", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowBlur", "number") || 0;
		item.shadowBlur = shadowBlur;
		item.shadowBlur1 = shadowBlur;
		var shadowColor = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".shadowColor", "string") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowColor", "string");
		item.shadowColor = shadowColor;
		var shadowOffsetX = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".shadowOffsetX", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowOffsetX", "number") || 0;
		item.shadowOffsetX = shadowOffsetX;
		item.shadowOffsetX1 = shadowOffsetX;
		var shadowOffsetY = haveValue(ochartOption, "series."+i+".links."+d+".label."+ item.labelSelect+".shadowOffsetY", "number") || haveValue(ochartOption, "series."+i+".label."+ item.labelSelect+".shadowOffsetY", "number") || 0;
		item.shadowOffsetY = shadowOffsetY;
		item.shadowOffsetY1 = shadowOffsetY;
	});
	athis.seriesObj.seriesLinksObj.labelSelect = labelSelect;
	athis.seriesObj.seriesLinksObj.labelList = labelList;
}
// links lineStyle
function linksLineStyleFun(ochartOption, i, d, type, athis) {
	var lineStyleSelect = haveValue(ochartOption, "series."+i+".links."+d+".lineStyleSelect", "string") || "normal";
	var lineStyleList = [{name:"普通",lineStyleSelect:"normal"},{name:"高亮(不设置则同普通)",lineStyleSelect:"emphasis"}];
	lineStyleList.forEach(function(item, i){
		var lineStyleColorselected = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".lineStyleColor", "string")|| "ordinary";
		var lineStyleType = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".type", "string")|| "solid";
		var lineStyleWidth = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".borderWidth", "number");
		lineStyleWidth = lineStyleWidth == null ? 2 : lineStyleWidth;		
		var lineStylecolor = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".color", "string")|| themeSeriesFun(i);
		var lineStylegradationColor = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".color", "object", 0, null, "color");
		var lineStylegradationColor1 = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".color", "object", 1, null, "color");
		var lineStylegradationType = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".color", "object") || "linear";
		var lineStyleshadowBlur = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".shadowBlur", "number");
		lineStyleshadowBlur = lineStyleshadowBlur == null ? 10 : lineStyleshadowBlur;	
		var lineStyleshadowColor = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".shadowColor", "string") || "rgba(0,0,0,0.5)";
		var lineStyleshadowOffsetX = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".shadowOffsetX", "number") || 0;
		var lineStyleshadowOffsetY = haveValue(ochartOption, "series."+i+".links."+d+".lineStyle."+item.lineStyleSelect+".shadowOffsetY", "number") || 0;
		item.lineStyleColorselected = lineStyleColorselected;
		item.lineStyleType = lineStyleType;
		item.lineStyleWidth = lineStyleWidth;
		item.lineStyleWidth1 = lineStyleWidth;
		item.lineStylecolor = lineStylecolor;
		item.lineStylegradationColor = lineStylegradationColor;
		item.lineStylegradationColor1 = lineStylegradationColor1;
		item.lineStylegradationType = lineStylegradationType;
		item.lineStyleshadowBlur = lineStyleshadowBlur;
		item.lineStyleshadowBlur1 = lineStyleshadowBlur;
		item.lineStyleshadowColor = lineStyleshadowColor;
		item.lineStyleshadowOffsetX = lineStyleshadowOffsetX;
		item.lineStyleshadowOffsetX1 = lineStyleshadowOffsetX;
		item.lineStyleshadowOffsetY = lineStyleshadowOffsetY;
		item.lineStyleshadowOffsetY1 = lineStyleshadowOffsetY;
	});
	athis.seriesObj.seriesLinksObj.lineStyleSelect = lineStyleSelect;
	athis.seriesObj.seriesLinksObj.lineStyleList = lineStyleList;
}