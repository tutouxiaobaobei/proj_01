$(function () {

    // 这个函数是每次JQ在调用 $.ajax / get / post 
    // 请求的时候都会去偷偷调用的函数
    $.ajaxPrefilter(function (options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url
    })
})