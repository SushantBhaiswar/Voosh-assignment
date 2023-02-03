const { default: mongoose } = require("mongoose");
const moment = require("moment")

const orderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    sub_total: {
        type: Number,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    createdAt: { type: String, default: moment().format("DD-MM-YYYY  h:mm:ss a") },
    updatedAt: { type: String, default: moment().format("DD-MM-YYYY  h:mm:ss a") }
})
module.exports = mongoose.model("Order", orderSchema)