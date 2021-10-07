export const authJwt = {
    verifyToken: (req, res, next) => {
        const AccessToken = req.session.AccessToken;
        console.log(AccessToken);
        if(!AccessToken){
            res.render('page-info/page-404');
        
        }
        next();
    }
}
