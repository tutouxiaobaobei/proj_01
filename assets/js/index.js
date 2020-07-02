$(function () {

    //用户登录到 index 首页时直接调用 拿到用户数据
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            headers: {
                Authorization: localStorage.getItem('token')
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                // 调用渲染头像 函数
                renderAvatar(res.data)
            },
            // complete: function (res) {
            //     // 这个函数  不管请求失败与否  都会执行
                
            //     // 然后就去判断  请求后的数据里面  是否成功
            //     console.log(res);
            //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         // 先强制清空 本地缓存的 token 值
            //         localStorage.removeItem('token')

            //         // 再让页面直接跳转到 登录页面 login.html
            //         location.href = '/组内-大事件/proj_01/login.html'
            //     }
            // }
        })
    }


    // 渲染用户头像
    function renderAvatar(data) {
        // 这是渲染  左侧导航栏  的用户头像旁边的 欢迎文本
        let uname = data.nickname || data.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + uname)

        // 渲染用户头像
        if (data.user_pic !== null) {
            $('.layui-nav-img').attr('src', data.user_pic).show()
            $('.text-avatar').hide()
        } else {
            let username = uname[0].toUpperCase()
            $('.text-avatar').show().html(username)
            $('.layui-nav-img').hide()
        }
    }


    // 实现退出 功能效果
    $('#btn-login').on('click', function () {
        // 这是layui  里面的询问框
        layer.confirm('确定是否退出?', { icon: 3, title: '提示' }, function (index) {
            // 这是清空本地存储
            localStorage.removeItem('token')

            // 然后再跳转到 login 页面(因为已经退出了嘛)
            location.href = '/组内-大事件/proj_01/login.html'

            // 这是 layui 自带的不用管
            layer.close(index);
        });

    })
})