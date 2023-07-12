function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
function isOwner(req,res,next){
    return 0;
}
function goHome(req,res,next){
    if (req.user) {
        res.redirect('/');
    }else{
        next();
    }
}

module.exports = {
    loggedIn,
    goHome

}
