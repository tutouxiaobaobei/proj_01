//每次发起网络请求前会调用这个函数
$.ajaxPrefilter(function (options) {
    console.log(options);
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
})