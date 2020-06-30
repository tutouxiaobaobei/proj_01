$(function () {
    // 点击切换到注册的盒子
    $('#link_reg').on('click', function () {
        $('.login_box').hide();
        $('.reg_box').show();
    })
    // 点击切换到登录的盒子
    $('#link_login').on('click', function () {
        $('.reg_box').hide();
        $('.login_box').show();
    })

    //用户名验证
    //字母开头，6到16位字母和数字和下划线组合
    //var userNameReg = /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/
    //密码验证
    //字母开头，6到18位字母和数字和下划线组合
    //var pwdReg = /^[a-zA-Z]\w{5,17}$/

    //从layui获取form对象
    var form = layui.form;
    //获取layer对象
    var layer = layui.layer;
    form.verify({
         username : [
            /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
            '用户名必须字母开头，5到16位字母和数字和下划线组合'
         ],
         pwd : [
            /^[a-zA-Z]\w{5,17}$/,
            '密码必须字母开头，6到18位字母和数字和下划线组合'
         ],
         //校验两次密码是否一致
         //value是确认密码中的内容
         confirmPwd : function (value) {    
            if( $('#reg_pwd').val() !== value){
                return '两次密码不一致'
            }
         }
    })
    
    //监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method : 'POST',
            url : '/api/reguser',
            data : {
                username : $('#reg_username').val(),
                password : $('#reg_pwd').val()
            },
            success : function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('注册成功,请登录')
                $('#link_login').click();
            }
        })
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method : 'POST',
            url : '/api/login',
            //serialize()得到的是查询字符串
            data : $(this).serialize(),
            success : function (res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg('登录成功')
                localStorage.setItem('token', res.token);
                setTimeout(function () {
                     //跳转后台主页
                    location.href = './index.html'
                },1000)
            }
        })
    })
})