$(function() {
    // 此模块为 加载详情页面
    // 需要添加 请求的id参数 
    let id = imgUrl.cid('goods_id');
    function detailAxios() {
        return axios.get('goods/detail', {
            params : {
                goods_id : id
            }
        });
    }

    // 现在进行动态的渲染 数据
    function renderDetail(params) {
        return new Promise(function(resolve,reject) {
            // 获取到数据 
            if(params.meta.status == 200) {
                let html = template('swiperTpl', params.data.pics);
                $('.swiper-container').html(html);
                new Swiper('.swiper-container', {
                // direction: 'vertical',
                // 不需要垂直 默认横向
                loop: true,
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',

                },
                autoplay : true
            });

                // 现在渲染 下面参数的描述部分
                    
                let goodInfo = template('goodInfo', params.data);
                $('#baseInfo').html(goodInfo);

                // 渲染静态图片参数详情展示页面 
                
                $('#good_introduce').html(params.data.goods_introduce);
                
                // 渲染 数据 右边选项卡的内容
                let paramInfo = template('paramTpl', params.data.attrs);
                $('#good_attrs').html(paramInfo);
            }
            resolve();
             
        });


    }


     $(document).on("pageInit", function(e,pageId,$page) {
        detailAxios()
        .then(renderDetail)
        .catch(function(){
            $.toast('error');
        } )

     });
     $.init();






});