// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options);
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 统一为有权限的接口,设置 headers 请求头
    // indexOf('/my/')判断字符串中是否含有/my/ 返回索引号,没有就是-1
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 全局调用 complete 回调函数
    options.complete = function (res) {
        console.log(res, '``````');
        // 在 complete 回调函数中,可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status !== 0 && res.responseJSON.message !== '获取用户基本信息成功!') {
            // 强制清空 token 
            localStorage.removeItem('token')
            // 强制跳转到登录页面
            location.href = '/login.html'
        }
    }
})