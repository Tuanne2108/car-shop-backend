const userService = require("../services/UserService");

class UserController {
    async createUser(req, res) {
        try {
            const {name, email, password, confirmedPassword, phone} = req.body
            let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let isCheckedMail = mailformat.test(email) 
            if(!name || !email || !password || !confirmedPassword || !phone){
                return res.status(200).json({
                    status:'ERR',
                    message: 'The input is required'
                })
            }else if(!isCheckedMail){
                return res.status(200).json({
                    status:'ERR',
                    message: 'The email is invalid'
                })
            }else if(password !== confirmedPassword){
                return res.status(200).json({
                    status:'ERR',
                    message: 'The confirmed password should equal to password'
                })
            }
            console.log('isCheckedMail', isCheckedMail)
            const response = await userService.createUser(req.body)
            return res.status(200).json(response)
        } catch (error) {
            return res.status(404).json({
                message: error,
            });
        }
    }

}

module.exports = new UserController();
