const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");

exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "firstName, lastName, email and password are required..!!"
            });
        }
        const user = await User.create({ firstName, lastName, email, password, });
        cookieToken(user, res);
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Please check the implementation in signup controller..!!"
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // check for presence of email and password
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password"
            });
        }

        // get user from DB
        const user = await User.findOne({ email }).select("+password");

        // if user not found in DB
        if (!user) {
            return res.status(400).json({
                message: "Email or password does not match or not exist"
            });
        }

        // match the password
        const isPasswordCorrect = await user.isValidPassword(password);

        // if password does not match
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Email or password does not match or not exist"
            });
        }

        // if all goes good and we send the token
        cookieToken(user, res);
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Please check the implementation in login controller..!!"
        });
    }
};

exports.logout = async (req, res) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        });
        res.status(200).json({
            success: true,
            message: "Logout Success"
        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success: false,
            message: "Please check the implementation in logout controller..!!"
        });
    }
};