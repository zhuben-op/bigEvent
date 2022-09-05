$(function(){
    var form=layui.form
    var layer=layui.layer
    
    form.verify({
        pwd:[/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],
        // 新旧密码不能相等
        samePwd:function(value){
            if(value===$('[name=oldPwd]').val()){
                {return '新旧密码不能相同'}
            }
        },
        // 校验两次密码是否一致
        repwd:function(value){
            // 通过形参拿到的是确认密码框中的内容,还需要拿到密码框中的内容,然后进行一次判断,判断出来的两次结果不同则return提示消息
           var pwd= $('.newPwd [name=newPwd]').val()
            if(pwd!==value) {return '两次密码不一致'}
        }
    })
          
            // 调用form.val()快速为表单赋

    // 重置表单
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        $('.layui-form')[0].reset()
    })

    // 提交按钮
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        // 发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    // 密码匹配不成功
                    return layer.alert(res.message,{icon:5})
                }
                // 修改信息成功
                layer.alert(res.message,{icon:1})
                // 重置表单
                $('.layui-form')[0].reset()
                console.log(res);
               
                
            }
        })
    })
})
