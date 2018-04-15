/*$(function() {
    // 这个 模块为 输入按钮的时候 遮挡层的出现
    // 首先先动态创建一个遮挡层 
    let mask = $('<div class="mask"><div id="searchInfo" class=""></div></div>');
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

});*/
$(function() {
    // 次此页面为 搜索框 搜索参数的时候出现下拉菜单案例
    // 动态创建 类名为mask 的div  并且设置样式
    let mask = $('<div class="mask"><div id="searchInfo"></div></div>');
    mask.appendTo('body');
    mask.hide();

    // 发送axios 请求
    function searchAxios(param) {
        return axios.get('goods/qsearch', {
            params : {
                query : param
            }
        })
    }

    function renderData(tplId,selector,data) {
            let html = template(tplId, data.data);
                $(selector).html(html);
    }
    // 进行后续的 数据拉取
    function renderMask(params) {
        return new Promise(function(resolve, reject) {
            if(params.meta.status == 200) {
                renderData('searchTpl','#searchInfo',params);       
                resolve();
            }

        });
    }


        //  实现点击搜索的时候进行 历史记录的存储  
        //  大致 为 首先将用户点击时候的唯一的id 以及 唯一的名字  需要设置一个全局的函数 阻止默认事件跳转
        //  首先先判断有没有历史记录 有的话 利用数组的some方法 有历史记录的会返回true 进行 return true 后续遍历停止，并且 添加到历史中
        //  没有历史记录的话，则重新构建新的数组然后在进行 push 添加 即可
        
        ///
        window.showDetail = function(id, name) {
            // 将函数名挂载到 全局中 当点击的时候触发该效果  
            //  设定一个状态位 用来进行后续的遍历 判断
            let flag = false;
            var history = localStorage.getItem('searchHistory');
            // 判断存在 历史的情况和不存在历史的情况
                // localStorage.setItem('searchHistory',JSON.stringify(history));

                // location.href = "goods-detail.html?goods_id=" + id;
            if(history) {
                // 如果存在该历史记录 那么需要判断历史记录是否重复 用数组的some方法即可
                let historyInfo = JSON.parse(history);

                historyInfo.some(function(item) {
                    // 判断id 是否相等
                    if(item.goods_id == id) {
                        // 相等设置 状态位 并且停止循环
                        flag = true;
                        return true;
                    }
                       
               });
                                                     
            if(!flag) {
                // 如果没有重复的 那么需要进行存入操作
                 let obj = {
                        goods_id : id,
                        goods_name : name
                    }
                historyInfo.push(obj);
                localStorage.setItem('searchHistory', JSON.stringify(historyInfo));
            }
                // 不管重复记录还是没有重复都需要 进行页面的跳转
                     location.href = "goods-detail.html?goods_id=" + id;
                  
            } else {
                // 不存在 需要将 该数据写入到历史记录中 
                 let obj = {
                    goods_id : id,
                    goods_name : name
                }
                var arr = [];
                arr.push(obj);
                localStorage.setItem('searchHistory',JSON.stringify(arr));
            }
 
        }
    $('#search').on({
        'focus' : function() {
            // 当页面刷新的时候 当f文本框呢有focus 则 出现遮罩层
            mask.show();
            // 渲染历史记录到 mask遮挡层  需要定位光标的 时候直接出现 搜索过的历史记录
            let history = localStorage.getItem('searchHistory');
            console.log(history)
           if(history) {
                console.log(JSON.parse(history));
                 let html = template('searchTpl', JSON.parse(history));
                $('#searchInfo').html(html);
           }

        },
        'blur' : function() {
            setTimeout(function() {
                // 失去焦点进行隐藏 因为是同步任务当触发事件的时候，点击mask中的文件会使得 焦点消失所以需要异步，当input执行完后再消失
                mask.hide();
            },0);
        },
        'input' : function() {
             // 获取当前的 用户输入的value 值 然后发送请求进行 动态拉取数据
             let val = $(this).val();
             searchAxios(val)
             .then(renderMask)
             .catch(function() {
                $.toast('error');
             })
             
             // 点击详情页面
        }
    });
});


