$(function(){
    var layer=layui.layer
    getUserInfo()
    $('#btnLogout').on('click',function(){
        //eg1
        layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
    //do something
    //    将token值清空
    localStorage.removeItem('token',) ;
    location.href='/大事件后台管理系统/login.html'
        // 关闭询问框
    layer.close(index);
  });
    })
})

function getUserInfo(){
    var layer=layui.layer
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
          if(res.status!==0){
            return layer.alert('获取用户信息失败!',{icon:5})
          }
        //   获取用户信息成功
        renderAvatar(res.data)
        },
        // 不论成功还是失败,都会调用complete函数
        
    })
}


// 渲染用户头像
function renderAvatar(user){
    // 渲染用户名字
    var name=user.nickname || user.username
    $('#welcome').html(`欢迎&nbsp;&nbsp ${name}`)

    // 按需渲染用户头像
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        // 渲染文本头像
        var first=name[0].toUpperCase()
        $('.text-avatar').html(`${first}`).show()
        $('.layui-nav-img').hide()
    }
}