$(function(){
    var layer=layui.layer
    var form=layui.form
    var laypage=layui.laypage

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat=function(date){
        const dt=new Date(date)
    
    var y=parSet(dt.getFullYear())
    var m=parSet(dt.getMonth()+1)
    var d=parSet(dt.getDate())
    var hh=parSet(dt.getHours())
    var mm=parSet(dt.getMinutes())
    // var ss=dt.getSeconds()

    return y+'-'+m+'-'+d+''+hh+':'+mm
}
// 定义是否超过十分钟是否需要在时间前面加上0
    function parSet(res){
       return res>9?res:'0'+res
    }
    // 定义查询的参数对象,将来请求数据的时候,需要将请求参数对象提交到服务器
    var q={
        pagenum:1, //页码值,默认请求第一页的数据
        pagesize:2,//每页显示几条数据,默认显示两条
        cate_id:'',//文章分页的id
        state:''//文章的发布状态
    }
    getTable()
    // 初始化分类数据
    initCate()
    // 获取文章列表的方法
    function getTable(){
        $.ajax({
            method:'GET',
            url:'/my/article/list',
            data:q,
            success:function(res){
                if(res.status!==0){
                    return layer.alert('获取文章列表失败',{icon:5})
                }
            // 获取文章列表成功时,使用模板引擎渲染页面数据
            console.log(res);
            var htmlStr=template('tpl_list',res)
            // 向tbody渲染数据
            $('#tbd').html(htmlStr)
            renderPage(res.total)
            }
        })
    }

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

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        var cate_id=$('[name=cate_id]').val()
        var state=$('[name=state]').val()
        q.cate_id=cate_id
        q.state=state

        // 重新渲染表格的数据
        getTable()
    })

    // 定义渲染分页的方法
    function renderPage(res){
         //执行一个laypage来配置分页数据
            laypage.render({
             elem: 'pageBox', //分页容器
             count: res ,//数据总数，从服务端得到
             limit:q.pagesize,//每页显示
            curr:q.pagenum,//默认被选中的分页
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            // 分页发生切换的时候触发jump
            jump: function(obj,first){
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                q.pagenum=obj.curr
                // 把最新的条目数复制到q这个查询参数对象属性中
                q.pagesize=obj.limit
                // 重新调用页面数据,根据最新的q获取最新的数据列表
                if(!first){
                getTable()
                }
            }
                
  });
    }
    $('#tbd').on('click','.btn-edit',function(){
       console.log('ok');
        location.href='/大事件后台管理系统/article/article_pub.html'
        //   发起对应分类的数据
        var id=$(this).attr('data-id')
    $.ajax({
        method:'GET',
        url:'/my/article/'+id,
        success:function(res){
            console.log(res);
            form.val('form-edit',res.data)
        }
    })
        

    })

 

     // 通过代理的形式为删除按钮绑定click事件
     $('#tbd').on('click','.btn-del',function(){
        // e.preventDefault()
    //   获取点击行对应的id
      var id=$(this).attr('data-id')
    //   确定是否删除
    layer.confirm('确认是否删除?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            method:'GET',
            url:'/my/article/delete/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.alert('删除分类失败!',{icon:5})
                }
                layer.alert('删除分类成功!',{icon:1})
                layer.close(index);
                getTable()
            }
        })
      });
    //   发起对应分类的数据
    
    })
})