// 每次调用$.get() $.post()  $.ajax()的时候会先调用ajaxPrefilter这个函数
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
    console.log(options.url);
})