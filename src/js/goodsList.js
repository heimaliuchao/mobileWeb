// 进行动态 数据获取

$(function() {
        function listAxios() {
    return axios.get('goods/search'); 
}

function renderList(param) {
    return new Promise(function(resolve, reject) {
        //  获取数据模块
       
        if(param.meta.status == 200) {
            // 进行 数据渲染 
            let html = template('listTpl', param.data);
            $('#listInfo').html(html);
            resolve();
        }

    });

}

  $(document).on("pageInit", function(e,pageId,$page) {
    listAxios()
    .then(renderList)
    .catch(function(){
        $.toast('error');
    })

  });
      $.init();

});