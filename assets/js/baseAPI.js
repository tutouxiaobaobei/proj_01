$(function () {

    // 这个函数是每次JQ在调用 $.ajax / get / post 
    // 请求的时候都会去偷偷调用的函数
    $.ajaxPrefilter(function (options) {
        // 这是请求的根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url

        // 这是请求时发送的  权限接口
        // 但是要做判断,因为不是所有的请求都要带  权限接口
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token')
            }
        }


        //设置一个全局配置  如果请求失败(没有借口权限)  就强制跳转页面
        options.complete = function (res) {
            // 这个函数  不管请求失败与否  都会执行

            // 然后就去判断  请求后的数据里面  是否成功
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                // 先强制清空 本地缓存的 token 值
                localStorage.removeItem('token')

                // 再让页面直接跳转到 登录页面 login.html
                location.href = '/组内-大事件/proj_01/login.html'

            }
        }
    })
})