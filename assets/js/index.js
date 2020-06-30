$(function () {
    getUserInfo();
    var layer = layui.layer;
    $('#btnLoginOut').on('click', function () {
        layer.confirm('确认要退出吗?', {icon: 3, title:'提示'}, function(index){
            localStorage.removeItem('token')
            location.href = './login.html'
            layer.close(index);
        });
    })
})
//获取用户信息
function getUserInfo() {
    $.ajax({
        method : 'GET',
        url : '/my/userinfo',
        success : function (res) {
            if(res.status !== 0) return layui.layer.msg('获取用户信息失败')
            //调用渲染头像的函数
            renderAvatar(res.data)
        }
    })
}
//用户信息渲染到页面
function renderAvatar(user) {
    //获取用户名称
    var name = user.nickname || user.username;
    //设置欢迎文本
    $('#welcome').text(`欢迎&nbsp;&nbsp;&nbsp;${user.username}`)
    //有头像显示头像，没有显示文本头像
    if(user.user_pic !== null) {
        $('.layui-nav-img')
        .attr('src',user.user_pic)
        .show()
        $('.font_avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.font_avatar')
        .text(first)
        .show();
    }
}