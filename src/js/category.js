// 此模块为 分类页面状态的动态渲染
 $(function() {
     // 首先是获取当前的页面的数据
     function categoriesAxios(param) {
         return new axios.get('categories');
     }
     // 动态获取数据模块
     function catRender(params) {
         return new Promise(function(resolve, reject) {
             if(params.meta.status == 200) {
                 // 成功 获取数据
                 // 现在进行动态创建数据
                let html = template('applianceTpl', params.data);
                $('.layout-con').html(html);
                // 需要进行点击的时候渲染右侧数据
                $('.layout-con').on('click','.items', function() {
                    // 我们需要将这每一行的索引值进行 填充，所以必须获取index
                    catRightRender.call(this,params.data);
                    $('.layout-con .cur').removeClass('cur');
                    $(this).addClass('cur');
                });
                
                  $('.layout-con .items').eq(0).addClass('cur');
                 resolve(params.data);
             }

         });
     }
     // 设置默认的第一个为选中状态
     
    // ------- -----------------------------------
     // 现在进行 商品模块的渲染
     function catRightRender(params) {


       // 我们现在 需要接受到参数后进项模板字符串的拼接
       // 获取索引  因为我们需要当前的索引来进行数据的对应渲染 然后给显示出来
       let index = $(this).index();

        index = index === -1? 0 : index;

       let currentData =params[index] && params[index].children;

         return new Promise(function (resolve,reject){
                 let html = template('appTpl', {
                    baseUrl : imgUrl.url,
                    data : currentData
                 });
                 $('#rightContentInfo').html(html);
                 // 需要渲染完后 // 因为不是a连接 所以跳转的时候需要进行 将类为good 的 div 进行location跳转
                 $('.shangpin').on('click','.good', function() {
                        console.log(1);
                        let val = $(this).attr('data-cid');
                        location.href = 'goods-list.html?cid=' + val;

                     });

                    resolve();
         })

     }

  $(document).on("pageInit", function(e,pageId,$page) {
    // 先提示显示效果 提示正在加载效果
    $.showPreloader('正在加载');
    // 调用接口
     categoriesAxios()
         .then(catRender)
         .then(catRightRender)
         .catch(function() {
            $.toast('error');
         })
         .finally(function() {
            // 无论成功还是失败都会调用该方法
            $.hidePreloader('已完成');
         })
     });

  $.init();
    

    // 我们发现当我们点击分类进入的时候默认的是大家电的 选项 所以我们需要将其显示即可
 });