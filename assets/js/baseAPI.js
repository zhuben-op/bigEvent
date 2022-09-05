// 每次调用$.get()  $.post()  $.ajax() 的时候都会首先调用这个函数
// 在这个函数中我们可以拿到给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url

    // 同一为有权限的接口设置headers请求头
    if(options.url.indexOf('/my/')!==-1){
    options.headers={
        Authorization:localStorage.getItem('token')||''
    }
}
// 全局统一挂载complete回调函数
options.complete=function(res){
    // 如果服务器返回来的数据中检测到用户未登录,则跳出返回到登录页面
    if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失效!'){
        // 强制将token清空
        localStorage.removeItem('token')
        // 强制跳转到登录页面
        location.href='/大事件后台管理系统/login.html'
    }
}
})