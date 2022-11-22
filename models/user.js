const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please provide a Name..."],
        maxlength: [40, "Name should be under 40 characters..."],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Please provide a Name..."],
        maxlength: [40, "Name should be under 40 characters..."],
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please Enter email in correct format"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password should be atleast 6 characters..."],
        select: false // whenever you're going to select any model or any perticular user, and try to bring in the "password" field will not come there. In case you want to have the password field, you need to explicitly mention that time. 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// encrypt the Password before save, and this function is async because bcrypt can take time to convert it into a secured hashed password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    /**
    * if the password field is modified then only encryption is going to work otherwise not...
    */
    this.password = await bcrypt.hash(this.password, 10);
});

// validate the password with passed on user password
userSchema.methods.isValidPassword = async function (userSendedPassword) {
    return await bcrypt.compare(userSendedPassword, this.password);
};

// create and return a JWT
userSchema.methods.getJWT = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    });
};

// mongoose will take this schema and convert it into a model...
module.exports = mongoose.model("User", userSchema);