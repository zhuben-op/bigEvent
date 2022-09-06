$(function(){
    var form=layui.form
    var layer=layui.layer
    initCate()
    // 初始化富文本编辑器
    initEditor()
     // 初始化文章分类的方法
     function initCate(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.alert('获取分类数据失败!')
                }
                // 调用模板引擎
                var htmlStr=template('tpl_cate',res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }
    // 1. 初始化图片裁剪器
     var $image = $('#image')
  
  // 2. 裁剪选项
     var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  // 3. 初始化裁剪区域
  $image.cropper(options)

//   选择封面的按钮
$('#btnChoseImg').on('click',function(){
    $('#coverFile').click()
})

// 点击照片实现切换放入的功能
$('#coverFile').on('change',function(e){
    // 获取用户保存的文件
    var filelist=e.target.files
    console.log(filelist);
    if(filelist.length===0){
        return layer.alert('请选择照片',{icon:1})
    }
    var filelist=e.target.files[0]
    var newImgURL = URL.createObjectURL(filelist)
    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域
  })

//   定义文章的发布状态,默认为发布状态
  var art_state='已发布'
  $('#btnSave2').on('click',function(){
    art_state='草稿'
  })

//   为表单绑定submit提交事件
$('#form-pub').on('submit',function(e){
    e.preventDefault()
    //1. 基于form表单,快速创建formdata对象
    var fd=new FormData($(this)[0])
    // 3.将发布状态存入fd表单
    fd.append('state',art_state)
   

    // 4.将裁减过的图片,输出为文件对象
    $image
  .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    fd.append('cover_img',blob)
    publicArticle(fd)
  })
   // 2.循环遍历并以简直对的方式打印出来
   fd.forEach(function(v,k){
    console.log(k,v);
})

})


// 定义发布文章的方法
function publicArticle(fd){
    $.ajax({
        method:'POST',
        url:'/my/article/add',
        data:fd,
        // 如果向服务器发送的是formData格式的数据,必须添加以下两个配置项
        contentType:false,
        processData:false,
        success:function(res){
            if(res.status!==0){
                return layer.alert('发布文章失败',{icon:5})
            }
            location.href='/大事件后台管理系统/article/article_list.html'
            layer.alert('发布文章成功!',{icon:1})
        }
    })
}
})