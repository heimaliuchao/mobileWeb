$(function() {
    // 这个 模块为 输入按钮的时候 遮挡层的出现
    // 首先先动态创建一个遮挡层 
    let mask = $('<div class="mask"><div id="searchInfo"></div></div>');
    mask.appendTo('body');
    mask.hide();

    // 给 输入框注册  获取焦点事件 失去焦点事件 以及input事件
    // 获取 输入 的value值
    
    function searchAxios(param) {
        return axios.get('goods/qsearch', {
            params : {
                query : param
            }
        })
    }
    function renderMask(data) {
        return new Promise(function(resolve, reject) {
            console.log(data);
            let tpl = template('searchTpl',data.data);
            $('#searchInfo').html(tpl);
            resolve();
        })
    }
    $('#search').on({
        'focus' : function() {
            mask.show();  
        },
        'blur' : function() {
            setTimeout(function() {
                mask.hide();
            },0);
        },
        'input' : function() {
            let param = $('#search').val();    
            // input 事件 输入的时候发送axios 请求 进行数据的拉取
            searchAxios(param)
            .then(renderMask)
            .catch(function() {
                $.toast('error');
            })
        }
    })

});