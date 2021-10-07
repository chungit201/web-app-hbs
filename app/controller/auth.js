import User from '../model/user'
import jwt from 'jsonwebtoken'
 export const AuthController = {
    getAdmin: (req, res) => {
        res.render('admin/index')
    },
    getLogin: (req, res) => {
        res.render('login', { title: 'LoginPage' })
    },
    signup: async (req, res) => {
        const user = await new User(req.body);
        console.log(user);
        user.save((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'Khong them duoc email'
                })
            }
            user.salt = undefined;
            user.hashed_password = undefined;
            res.json(user);
        })
    },
    getUser: (req, res) => {
        User.find((err, user) => {
            console.log(user)
        })
    },
    login: async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        console.log(email);
        console.log(password);
        User.findOne({ email }, (error, user) => {
            if (error || !user) {
                return res.status(400).json({
                    error: 'Người dùng không tồn tại'
                })
            }

            if (!user.authenticate(password)) {
                return res.status(401).json({
                    error: 'Email và mật khẩu không khớp'
                })
            }
            // Tự động tạo ra một mã cùng với user và mã secret
            const token = req.session.AccessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            // persist the token as 't' in cookie with  
            res.redirect('/adminPage')
            console.log(token);
            // return response with user and token to frontend client
        })
    },
    logout: async(req, res) => {
        if (req.session.AccessToken){
            req.session.destroy(() => {
            });
        }
        res.redirect('albums');
    }



}



