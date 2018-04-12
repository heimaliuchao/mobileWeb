  
  // 轮播图模块
$(function() {

    function slideShow() {
     return new Swiper ('.swiper-container', {
      // direction: 'vertical',
      // 不需要垂直 默认横向
      loop: true,    
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      }
    })
  }   


   $(document).on("pageInit", function(e,pageId,$page) {
    slideShow();
 });
  $.init();

});
