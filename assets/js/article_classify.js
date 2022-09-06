$(function(){
    var layer=layui.layer
    var form=layui.form

// 把获取到的数据映射到页面上
    getArticle()
    // 定义获取数据的函数
    function getArticle(){
    $.ajax({
        method:'GET',
        url:'/my/article/cates',
        success:function(res){
            if(res.status!==0){
                return layer.alert(res.message,{icon:1})
            }
            // 渲染模板引擎
            // console.log(res);
           var htmlStr= template('tpl_table',res)
        //    向tbody填充数据
        $('#tbd').html(htmlStr)
        }
    })
}
        var indexAdd=null
        // 添加分类按钮的操作
        $('#btnAdd').on('click',function(){
           indexAdd= layer.open({
                // 指定为页面层,如果不指定则默认为0,信息层
                type:1,
                title: '添加文章分类',
                // 设置宽高
                area:['500px','300px'],
                content: $('#diagAdd').html()
              });     
                
        })
      
    // #通过代理的方式,绑定body代理到#form-add身上
    $('body').on('submit','#form-add',function(e){
        // console.log('ok');
        // 阻止默认提交事件
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.alert('新增分类失败!',{icon:5})
                    
                }
                // 新增分类成功之后重新获取列表
                
                getArticle()
                layer.alert('新增分类成功!',{icon:1})
                layer.close(indexAdd)
            },
           
        })
    })
    var indexEdit=null
    // 通过代理的形式为编辑按钮绑定事件
    $('#tbd').on('click','.btn-edit',function(e){
        // e.preventDefault()
    //    弹出修改信息的层
        indexEdit= layer.open({
        // 指定为页面层,如果不指定则默认为0,信息层
        type:1,
        title: '修改文章分类',
        // 设置宽高
        area:['500px','300px'],
        content: $('#diagEdit').html()
      })
    //   获取点击行对应的id
      var id=$(this).attr('data-id')
    //   发起对应分类的数据
    $.ajax({
        method:'GET',
        url:'/my/article/cates/'+id,
        success:function(res){
            console.log(res);
            form.val('form-edit',res.data)
        }
    })
    })

    // 通过代理的形式为编辑按钮绑定submit事件
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.alert(res.message,{icon:5})
                }
                layer.alert('更新分类数据成功!',{icon:1})
                layer.close(indexEdit)
                getArticle()
            }
        })
    })

   
    // 通过代理的形式为删除按钮绑定click事件
    $('#tbd').on('click','.btn-del',function(e){
        // e.preventDefault()
    //   获取点击行对应的id
      var id=$(this).attr('data-id')
    //   确定是否删除
    layer.confirm('确认是否删除?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            method:'GET',
            url:'/my/article/deletecate/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.alert('删除分类失败!',{icon:5})
                }
                layer.alert('删除分类成功!',{icon:1})
                layer.close(index);
                getArticle()
            }
        })
      });
    //   发起对应分类的数据
    
    })
})