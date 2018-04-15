  
  // 轮播图模块
$(function() {
 /*  function renderData(id,selector,params) {

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
        
      },
      autoplay : true
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
       /!* let tpl = template('categoriesTpl', {list : data.data});

          $('#menuInfo').html(tpl);*!/
          renderData('categoriesTpl','#menuInfo',data);
           resolve();
  });
}


// -----------------------------------------------------------


// 商品
function menuAxios() {
  return axios.get('home/goodslist');
}
function renderMenu(params) {
  return new Promise(function(resolve, reject) {

      let tpl = template('menuTpl', params.data);

          $('#listInfo').html(tpl); 
           resolve();

  });
}*/

 // 此页面为主页面 主要分三个部分  轮播图动态数据  主菜单页面  分类页面
    function swiperAxios() {
        return axios.get('home/swiperdata');

    }
     // 拉取数据模块
    function renderData(tplId, params, selector) {
        let tpl = template(tplId,{list : params.data});
        $(selector).html(tpl);
    }
    function swiperData(params) {
        return new Promise(function(resolve, reject) {
            if(params.meta.status ==200) {
                renderData('swiperTpl',params,'.swiper-wrapper');
                resolve();
            }
        })
    }
    // 显示轮播
    function slideShow() {
        return new Swiper('.swiper-container', {
            // direction: 'vertical',
            // 不需要垂直 默认横向
            loop: true,
            // 如果需要分页器
            pagination: {
                el: '.swiper-pagination',

            },
            autoplay : true
        })
    }


// ----------------------------------------------------
    // 分类模块
    function catAxios() {
        return axios.get('home/catitems');
    }
    function renderCategories(params) {
        return new Promise(function(resolve,reject) {
            renderData('categoriesTpl',params,'#menuInfo');
            resolve();
        })
    }
// ===================================================
    // 下面产品列表
    function menuAxios() {
        return axios.get('home/goodslist');
    }
    function renderMenu(params) {
        return new Promise(function(resolve, reject) {
            let tpl = template('menuTpl',params.data);
            $('#listInfo').html(tpl);
            resolve();
        })
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
    });
    // 商品详情
    menuAxios()
    .then(renderMenu)
    .catch(function() {
      $.toast('error');
    });
 });
  $.init();

});
