$(function(){
    var form=layui.form
    var layer=layui.layer
    
    form.verify({
        nickname:function(value){
            if(value<=6){
                return '正确的昵称昵称长度在1~6个字符之间'
            }
        }
    })
    initUserInfo()
// 初始化用户的基本信息
function initUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
               return layer.alert(res.message,{icon:5})
            }
            console.log(res);
            // 调用form.val()快速为表单赋值
            form.val('formUserInfo',res.data)
        }
    })
}

    // 重置表单
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })

    // 提交按钮
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.alert(res.message,{icon:5})
                }
                // 修改信息成功
                layer.alert(res.message,{icon:1})
                console.log(res);

                // 调用父页面的方法,渲染修改之后的头像和文本
                window.parent.getUserInfo()
                initUserInfo()
            }
        })
    })
})
