$(function(){
    $('#link_reg').on('click',function(){
        $('.login').hide()
        $('.regBox').show()
    })
    $('#link_login').on('click',function(){
        $('.regBox').hide()
        $('.login').show()
    })
    // 按下回车建进入登陆
    $('#form_login [name=password]').on('keyup',function(e){
        if(e.keyCode===13){
            $('#form_login').submit()
        }
    })
    

    // 从layui中获取对象
    var form=layui.form
    var layer=layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd:[/^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd:function(value){
            // 通过形参拿到的是确认密码框中的内容,还需要拿到密码框中的内容,然后进行一次判断,判断出来的两次结果不同则return提示消息
           var pwd= $('.regBox [name=password]').val()
            if(pwd!==value) {return '两次密码不一致'}
        }
    })


    // 注册提交操作
    $('#form_reg').on('submit',function(e){
        // 阻止默认提交操作
        e.preventDefault()
        var data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post(
            '/api/reguser',
            data,
            function(res){
                if(res.status!==0){
                  return layer.alert (res.message,{icon: 5});
                  
                }
                layer.alert('注册成功,请登录', {icon: 1});
                $('#link_login').click()
            })
        })
    

    // 登录提交操作
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        var data={username:$('#form_login [name=username]').val(),password:$('#form_login [name=password]').val()}
        $.ajax({
            url:'/api/login',
            method:'POST',
            // 快速获取表单中的数据
            // data:$(this).serialize(),
            data:data,
            success:function(res){
                if(res.status!==0){
                    return layer.alert ('登录失败!',{icon: 5});
                }
               layer.alert ('登录成功!',{icon: 1});
            //    将token值存入本地
               localStorage.setItem('token',res.token) ;
               location.href='/大事件后台管理系统/index.html'
            }
        })
    })
})