const ordermodel = require("../models/ordermodel")
const userModel = require("../models/userschema")

module.exports = {
    addorder: async (req, res) => {
        try {
            const finduser = await userModel.findById(req.decoded.User_id)
            req.body.phone_number = finduser.phone
            req.body.user_id = finduser._id

            console.log(req.body);
            let a = await ordermodel.create(req.body)
            console.log(a);
            res.status(200).send("Order created successfully !")

        } catch (error) {
            res.status(500).send(error.message)

        }
    },
    getorder: async (req, res) => {
        try {
            
            const finduser = await ordermodel.find({ user_id: req.params.id })
            const total = await ordermodel.aggregate([
                {
                    $match: { user_id: req.params.id }
                },
                {
                    $group: {
                        _id: "$user_id",
                        total: { $sum: "$sub_total" }
                    }
                }
            ])
            console.log(total);
            (total.length > 0) ?
                res.status(200).send({ finduser, total: total[0].total }) :
                res.status(200).send({ finduser, total: 0 })
        } catch (error) {
            console.log(error.message);
            res.status(500).send(error.message)

        }
    }
}