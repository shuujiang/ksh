/**
 * Created by 海洋 on 2015/10/30.
 */
var dropdown = {

    init : function () {
        dropdown.click();
    },

    click : function () {
    	//编辑窗
        $(document).on("click", "#edit-ul.dropdown li", function (e) {
           if(!$(this).hasClass("on")){//判断一级标题是否有on class,
               $(this).parent().find('.on').removeClass('on');
               $(this).addClass("on").find('li:first').addClass('on');
              //存在三级则展示三级
               if( $(this).find('li:first').find('li:first')){
            	   //排除其他ul
            	   if(!$(this).find('ul').hasClass("dropdown-menu")){
            		   $(this).find('li:first').find('li:first').addClass('on');
            	   }
               }
               //设置三级与二级同高
        	   $('#edit-ul.dropdown li.on > ul ul li.on').css({
                   "top":-$('#edit-ul.dropdown li.on > ul li.on').position().top,
                   "height":$('#edit-ul.dropdown li.on > ul ').height()
               });
            }
        });
      //参数设置
        $(document).on("click", "#edit-ul1.dropdown li", function (e) {
            if(!$(this).hasClass("on")){
                $(this).parent().find('.on').removeClass('on');
                $(this).addClass("on").find('li:first').addClass('on');
//               $(this).find('li:first').css("color",'#d34d2e');
               //存在三级则展示三级
                if( $(this).find('li:first').find('li:first')){
             	   //排除其他ul
             	   if(!$(this).find('ul').hasClass("dropdown-menu")){
             		   $(this).find('li:first').find('li:first').addClass('on');
             	   }
                }
                //设置三级与二级同高
         	   $('#edit-ul1.dropdown li.on > ul ul li.on').css({
                    "top":-$('#edit-ul1.dropdown li.on > ul li.on').position().top,
                    "height":$('#edit-ul1.dropdown li.on > ul ').height(),
                    "overflow-y":'auto'
                });
             }
         });
    }
};

$(document).ready(function () {
    dropdown.init();
    
//  $('.dropdown li a').each(function(i){
//  	$('ul.dropdown li.on a').eq(i).css('color','black')
//  	$('ul.dropdown li.on a').eq(i).click(function(){
//  		$(this).css("color",'#d34d2e');
//  	})
//  });
    
//  $('ul.dropdown li a').click(function(){
//  	$('ul.dropdown li a').each(function(i){
//  		$('ul.dropdown li a').css('color','black');
//	  	})	
//	  	$(this).css("color",'#d34d2e');
//  })
});



