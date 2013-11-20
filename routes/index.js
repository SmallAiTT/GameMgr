
/*
 * GET home page.
 */
module.exports = function(app){
    app.get('/', checkLogin);
    app.get("/", function(req, res){
        res.render('index', { title: 'GameMgr' });
    });


    app.get('/user', checkLogin);
    app.get("/user", function(req, res){
        res.render('user', {
            success : "success",
            "error" : "error",
            users : [],
            title: 'GameMgr'
        });
    });

    app.get("/login", function(req, res){
        res.render("login", {title : "GameMgr"})
    });
    app.post("/login", function(req, res){
        req.session.user = {name : req.body.name};
        res.redirect('/user');//登陆成功后跳转到主页
    });

    function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录!');
            res.redirect('/login');
        }
        next();
    }

    function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录!');
            res.redirect('back');//返回之前的页面
        }
        next();
    }
};