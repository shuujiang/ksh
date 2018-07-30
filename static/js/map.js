//将url转图片
function getStaticImgUrl(i){
	var URL_BASE = "http://api.map.baidu.com/staticimage";
	// http://api.map.baidu.com/panorama/v2?ak=59KkG4gGSwIzukAsZmfBsp6Y13j6D9LM&width=512&height=256&heading=185.63289711907487&pitch=16.355027027968912&location=120.187312,30.19618&fov=90&zoom=12
	var params = [];
	var width = $("#"+canvasArray[i].id).width(),
		height = $("#"+canvasArray[i].id).height();
	if(width && width>0){
		var w = parseInt(width);
		if(!isNaN(w)){
			params.push("width="+width);
		}
	}
	if(height && height>0){
		var h = parseInt(height);
		if(!isNaN(h)){
			params.push("height="+height);
		}
	}
	 var center = allOptions[i].staticOption.chartOption.center;
	 var c = center[0]+","+center[1];
	 params.push("center="+c);
	 var zoom = allOptions[i].staticOption.chartOption.zoom;
	 params.push("zoom="+zoom);
	 var marker = 0;
	 var len = allOptions[i].dataOption.series.length;
	 if(allOptions[i].dims !=null || allOptions[i].measures != null){
		allOptions[i].dataOption.series.forEach(function(item, i){
			if(i == len-1){
				marker +=item[0]+","+item[1];
			}else{
				marker +=item[0]+","+item[1]+"|";
			}
		})
	}
	 params.push("markers="+marker);
	 var mStyle = "l|l";
	 params.push("markerStyles="+mStyle);
	 URL_BASE + "?" + params.join("&");
	return URL_BASE + "?" + params.join("&");
}
