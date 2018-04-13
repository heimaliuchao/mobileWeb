  
  // 轮播图模块
$(function() {
   function renderData(id,selector,params) {

         let tpl = template(id, {list : params.data});
                     $(selector).html(tpl);
  }

  // 轮播图发送请求模块
  function swiperAxios() {
    return axios.get('home/swiperdata');
  }
  // 数据请求后 拉取数据 方法
  function swiperData(data) {
    return new Promise(function(resolve, reject){
      // 写入模板 这里需要处理下因为template 接收的名字为list 
       /*let tpl = template('swiperTpl', {list : data.data});

          $('.swiper-wrapper').html(tpl);*/

          renderData('swiperTpl','.swiper-wrapper',data);
           resolve();         
    }) 
      
  }
    function slideShow() {
     return new Swiper('.swiper-container', {
      // direction: 'vertical',
      // 不需要垂直 默认横向
      loop: true,    
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      }
    })
  }   

// -------------------------------------------------------------------
// 分类模块
 function catAxios() {
  return axios.get('home/catitems');
 }
 // 动态渲染数据
function renderCategories(data) {
  return new Promise(function(resolve, reject) {
       /* let tpl = template('categoriesTpl', {list : data.data});

          $('#menuInfo').html(tpl);*/
          renderData('categoriesTpl','#menuInfo',data);
           resolve();
          

  });
}
  $(document).on("pageInit", function(e,pageId,$page) {
    swiperAxios()
    .then(swiperData)
    .then(slideShow)
    .catch(function() {
      $.toast('error');
    });

    catAxios()
    .then(renderCategories)
    .catch(function() {
      $.toast('error');
    })



 });
  $.init();

});
