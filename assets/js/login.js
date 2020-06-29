$(function () {
    // 阻止 双击选取文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

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



    // 监听注册表单的提交事件
    $('#form-sign-in').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: 'http://ajax.frontend.itheima.net/api/reguser',
            data: {
                username: $('#form-sign-in [name=username]').val(),
                password: $('#form-sign-in [name=password]').val()
            },
            success: function (res) {
                if(res.status !== 0) return console.log(res.message);
                console.log('注册成功');
            }
        })

    })

})