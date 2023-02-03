const UserModel = require("../models/userschema")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const ordermodel = require("../models/ordermodel")

//Register
module.exports = {
    Register: async (req, res) => {
        const { phone, password } = req.body
        try {
            const finduser = await UserModel.findOne({ phone })
            if (finduser)
                return res.status(400).send("Phone is already exists")

            let salt = await bcrypt.genSalt(10)
            let hashpass = await bcrypt.hash(password, salt)
            req.body.password = hashpass
            req.body.cpassword = hashpass
            let createdata = await UserModel.create(req.body)
            res.send(createdata)

        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    Login: async (req, res) => {
        const { phone, password } = req.body
        let finduser = await UserModel.findOne({ phone })
        if (!finduser) {
            return res.status(404).send("User Not Found check credentails")
        }

        if (finduser.blockedDate) {
            if (finduser.blockedDate >= new Date().toDateString())
                return res.status(400).send("User Blocked for 24-Hr")
        }

        let checkpass = await bcrypt.compare(password, finduser.password)
        if (!checkpass) {
            finduser.blocked++
            if (finduser.blocked >= 5) {
                let dat = new Date().toDateString()
                await UserModel.findOneAndUpdate({ _id: finduser._id },
                    { blockedDate: dat })
                return res.status(400).send("User Blocked for 24-Hr")
            }
            await UserModel.findOneAndUpdate({ _id: finduser._id }, { blocked: finduser.blocked })
            return res.status(400).send("Password is incorrect")
        }

        var token = jwt.sign({
            User_id: finduser._id
        }, "This-is-secret", { expiresIn: "1d" })

        finduser = await UserModel.findOneAndUpdate({ _id: finduser._id }, {
            blockedDate: null,
            blocked: 0
        })
        res.cookie("token", token, { httpOnly: true })
        res.status(200).send({ finduser, token })
    },

    gettoken: async (req, res) => {

        try {
            const ValiduserOne = await UserModel.findOne({ _id: req.decoded.User_id })
            if (ValiduserOne)
                res.status(201).send({ status: 201, ValiduserOne })
        } catch (err) {
            res.status(401).send({ status: 401, err })
        }

    },
    logout: (req, res) => {
        res.clearCookie("token");
        req.cookies["token"] = "";
        return res.status(200).json({ message: "Successfully Logged Out" });
    }
}