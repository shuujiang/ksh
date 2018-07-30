//上传格式为视频
var video_extensions ='mp4,avi';  
var video_mimeTypes ='video/mp4';  
//上传格式为音频
var audio_extensions ='mp3';
var audio_mimeTypes ='audio/*';
//上传格式为图片
var img_extensions ='gif,jpg,jpeg,bmp,png';
var img_mimeTypes ='image/jpg,image/jpeg,image/png,image/gif,image/bmp';


//audio/*,application/*
// uoloadBigFile(uploadUrl,'#picker',video_extensions,video_mimeTypes);
function uoloadBigFile(uploadUrl,addUpload,extensions,mimeTypes, type,fileType){
	$(function () {
        $list = $('#'+ type + ' .uploader-list');
        // $list = $('.uploader-list');
        var flie_count = 0;
        var uploader = WebUploader.create({
            //设置选完文件后是否自动上传
            auto: false,
            //swf文件路径
            swf: 'webuploader/Uploader.swf',
            // 文件接收服务端。
            server:uploadUrl+"?fileType="+fileType,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: addUpload,
            chunked: true, //开启分块上传
            chunkSize: 10 * 1024 * 1024,
            chunkRetry: 3,//网络问题上传失败后重试次数
            threads: 1, //上传并发数
            //fileNumLimit :1,
            fileSizeLimit: 2000 * 1024 * 1024,//最大2GB
            fileSingleSizeLimit: 2000 * 1024 * 1024,
            resize: false,//不压缩
            //选择文件类型
            accept: {
                title: '',
                extensions:extensions ,
                mimeTypes: mimeTypes
            }
        });
        var upLoading = false;
        // 当有文件被添加进队列的时候
        uploader.on('fileQueued', function (file) {
            $list.append('<div id="' + file.id + '" class="item"></div>');
            $("#"+type+" .StopBtn").html("暂停上传").attr("status", "suspend");
            //删除要上传的文件
            //每次添加文件都给btn-delete绑定删除方法
            $(".btn-delete").click(function () {
                //console.log($(this).attr("fileId"));//拿到文件id
                uploader.removeFile(uploader.getFile($(this).attr("fileId"), true));
                $(this).parent().parent().fadeOut();//视觉上消失了
                $(this).parent().parent().remove();//DOM上删除了
            });
            //uploader.options.formData.guid = WebUploader.guid();//每个文件都附带一个guid，以在服务端确定哪些文件块本来是一个
            //console.info("guid= "+WebUploader.guid());
            //md5计算
            uploader.md5File(file)
                .progress(function(percentage) {
                    console.log('Percentage:', percentage);
                })
                // 完成
                .then(function (fileMd5) { // 完成
                    var end = +new Date();
                    console.log("before-send-file  preupload: file.size="+file.size+" file.md5="+fileMd5);
                    file.wholeMd5 = fileMd5;//获取到了md5
                    uploader.upload();
                });
        });
        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function (file, percentage) {
            // $(".uploader-list").show();
            var $li = $('#' + file.id).show(),
            $percent = $li.find('.progress .progress-bar');
            upLoading = true;            
            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<div class="showJD"><div class="progress">' + 
                '<div class="ProcessWD progress-bar" style="background:#f0ad4e;">' +  
                '<span class="fileProcess"></span>' +  
                '</div></div></div>').appendTo($li).find('.progress-bar');  
            } 
            $('#' + file.id + " .fileProcess").text(Math.round(percentage * 100) + '%');  
            $('#' + file.id + " .ProcessWD").css('width', percentage * 100 + '%');   
        });
        //发送前填充数据
        uploader.on( 'uploadBeforeSend', function( block, data ) {
            // block为分块数据。

            // file为分块对应的file对象。
            var file = block.file;
            var fileMd5 = file.wholeMd5;
            // 修改data可以控制发送哪些携带数据。

            console.info("fileName= "+file.name+" fileMd5= "+fileMd5+" fileId= "+file.id);
            console.info("input file= "+ flie_count);
            // 将存在file对象中的md5数据携带发送过去。
            data.md5value = fileMd5;//md5
            data.fileName_ = $("#s_"+file.id).val();
            console.log("fileName_: "+data.fileName_);
            // 删除其他数据
            // delete data.key;
            if(block.chunks>1){ //文件大于chunksize 分片上传
                data.isChunked = true;
                console.info("data.isChunked= "+data.isChunked);
            }else{
                data.isChunked = false;
                console.info("data.isChunked="+data.isChunked);
            }

        });
        uploader.on('uploadSuccess', function (file) {
            $('#' + file.id).remove();//上传完删除进度条
        });
        uploader.on('uploadError', function (file) {
            // $('#' + file.id).find('p.state').text('上传出错');
            //上传出错后进度条变红
            $('#' + file.id).find(".progress").find(".progress-bar").attr("class", "progress-bar progress-bar-danger");
            //添加重试按钮
            //为了防止重复添加重试按钮，做一个判断
            //var retrybutton = $('#' + file.id).find(".btn-retry");
            //$('#' + file.id)
            if ($('#' + file.id).find(".btn-retry").length < 1) {
                var btn = $('<button type="button" fileid="' + file.id + '" class="btn btn-success btn-retry"><span class="glyphicon glyphicon-refresh"></span></button>');
                $('#' + file.id).find(".info").append(btn);//.find(".btn-danger")
            }
            $(".btn-retry").click(function () {
                //console.log($(this).attr("fileId"));//拿到文件id
                uploader.retry(uploader.getFile($(this).attr("fileId")));
            });
        });
        uploader.on('uploadComplete', function (file) {//上传完成后回调
            // $('#' + file.id).fadeOut();//上传完删除进度条
            //$('#' + file.id + 'btn').fadeOut('slow')//上传完后删除"删除"按钮
        });
        uploader.on('uploadFinished', function () {
            //上传完后的回调方法
            upLoading = false;
            top.layer.alert("所有文件上传完毕");
            $('#fileList').children().remove();
            if(type == "iamge"){
                selContent.imgInitialValue();
            }else if(type == "video"){
                selContent.videoInitialValue();
            }else{
                selContent.audioInitialValue();
            }
            //提交表单
        });
        // $("#UploadBtn").click(function () {
        //     uploader.upload();//上传
        // });
        $("#"+type+" .StopBtn").click(function () {
            var StopBtn = $(this);
            if(upLoading){
                var status = StopBtn.attr("status");
                if (status == "suspend") {
                    console.log("当前按钮是暂停，即将变为继续");
                    $(this).html("继续上传");
                    $(this).attr("status", "continuous");
                    console.log("当前所有文件==="+uploader.getFiles());
                    console.log("=============暂停上传==============");
                    uploader.stop(true);
                    console.log("=============所有当前暂停的文件=============");
                    console.log(uploader.getFiles("interrupt"));
                } else {
                    console.log("当前按钮是继续，即将变为暂停");
                    $(this).html("暂停上传");
                    $(this).attr("status", "suspend");
                    console.log("===============所有当前暂停的文件==============");
                    console.log(uploader.getFiles("interrupt"));
                    uploader.upload(uploader.getFiles("interrupt"));
                }
            }
        });
        uploader.on('uploadAccept', function (file, response) {
            if (response._raw === '{"error":true}') {
                return false;
            }
        });
    });
} 
