const cookieToken = (user, res) => {
    const token = user.getJWT();
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_TIME * 24 * 60 * 60 * 1000),
        httpOnly: true // This flag has used so that, only the server can manipulate cookies.
    }

    user.password = undefined;
    res.status(201).cookie('token', token, options).json({
        success: true,
        token,
        user
    });
};


module.exports = cookieToken;
