function openDialogUploader(title, url, width, height, target, o) {
	if (navigator.userAgent.match(/(iPone|iPod|Android|iso)/i)) { // 如果是移动端，就使用自适应大小弹窗
		width = 'auto';
		height = 'auto';
	} else { // 如果是PC端，根据用户设置的width和height显示
		if (width && $(top.window).width() < width.replace('px', '')) {
			width = ($(top.window).width() - 20) + 'px';
		}
		if (height && $(top.window).height() < height.replace('px', '')) {
			height = ($(top.window).height() - 20) + 'px';
		}
	}
	
	var option = {
		type : 2,
		area : [ width, height ],
		title : title,
		maxmin : true, // 开启最大化最小化按钮
		content : url,
		btn : [],
		yes : function(index, layero) {

		},
		cancel : function(index) {
		},
		success : function(layero, index) {
			var iframeWin = layero.find('iframe')[0]; // 得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
			iframeWin.contentWindow.index = index;
			iframeWin.contentWindow.addImg = imgclick;
		}
	};
	option = $.extend({}, option, o);
	top.layer.open(option);
}
$(function() {
	$(".monter").hover(function() {
		$(this).animate({
			right : '-60px'
		});
	}, function() {
		$(this).animate({
			right : '-285px'
		});
	});
});
function setBack(title, url, width, height, target, o) {
	if (navigator.userAgent.match(/(iPone|iPod|Android|iso)/i)) { // 如果是移动端，就使用自适应大小弹窗
		width = 'auto';
		height = 'auto';
	} else { // 如果是PC端，根据用户设置的width和height显示
		if (width && $(top.window).width() < width.replace('px', '')) {
			width = ($(top.window).width() - 20) + 'px';
		}
		if (height && $(top.window).height() < height.replace('px', '')) {
			height = ($(top.window).height() - 20) + 'px';
		}
	}

	var option = {
		type : 2,
		area : [ width, height ],
		title : title,
		maxmin : true, // 开启最大化最小化按钮
		content : url,
		btn : [],
		yes : function(index, layero) {

		},
		cancel : function(index) {
		},
		success : function(layero, index) {
			var iframeWin = layero.find('iframe')[0]; // 得到iframe页的窗口对象，执行iframe页的方法：iframeWin.method();
			iframeWin.contentWindow.index = index;
			iframeWin.contentWindow.addImg = addImg;
		}
	};
	option = $.extend({}, option, o);
	top.layer.open(option);
}

function setBackground() {
	setBack("上传图片", "http://172.16.70.59:8080/hlQD/page/qd/images/userRefImage/list", "800px", "500px",
			" ", typeof (option) == "undefined" ? {} : option);
}
$('.cancel').click(function(){
	
	top.layer.confirm("确认关闭吗？", {icon: 3, title:'系统提示'}, function(index){
		window.close();
	    top.layer.close(index);
	});
});