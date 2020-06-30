$(function () {
    // 阻止 双击选取文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

    $('#form-log-in').hide()
    $('#form-sign-in').show()

    // 这是登录和注册的切换功能
    $('.log-in').on('click', function () {
        $('#form-log-in').hide().siblings('#form-sign-in').show()
    })
    $('.sign-in').on('click', function () {
        $('#form-sign-in').hide().siblings('#form-log-in').show()
    })



    // 自定义form表单的验证规则
    var form = layui.form
    form.verify({
        // 这是密码的验证规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],

        // 这是再次验证密码框(注册)
        repwd: function (v) {
            let pwd = $('#form-sign-in [name=password]').val()
            if (pwd !== v) return '两次输入的密码不一致'
        }
    })


    // 调用layui  内置对象
    var layer = layui.layer

    // 声明接收用来注册账号的  用户名
    var usname


    // 监听注册表单的提交事件
    $('#form-sign-in').on('submit', function (e) {
        e.preventDefault()
        usname = $('#form-sign-in [name=username]').val()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('#form-sign-in [name=username]').val(),
                password: $('#form-sign-in [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg('注册成功,快登录试试吧')
                $('.sign-in').click()
                $('#form-log-in [name=username]').val(usname)
            }
        })

    })



    // 监听登录表单的提交事件
    $('#form-log-in').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.msg(res.message)
                // console.log(res.token);

                // 将得到的关键  验证码  存储到本地
                localStorage.setItem('token', res.token)

                // 登录成功后跳转到后台首页
                location.href = '/组内-大事件/proj_01/index.html'
            }
        })
    })

})