const jwt = require("jsonwebtoken")
const UserModel = require("../models/userschema")
module.exports = {
    authenticate: async (req, res, next) => {
        try {
            const cookies = req.headers.cookie;
            if (!cookies)
                return res.status(401).send({ status: 401, message: "Unauthorized person" })
            const token = cookies.split("=")[1]

            jwt.verify(token, "This-is-secret", (err, decode) => {
                if (err)
                    return res.status(401).send({ status: 401, message: "Unauthorized no token provide" })
                else
                    req.decoded = decode

            })

            let validateUser = await UserModel.findOne({ _id: req.decoded.User_id })
            if (!validateUser)
                return res.status(403).send("Not authenticated")
            next()
        } catch (error) {
            res.status(500).json({ status: 500, message: error.message })
        }
    }
}