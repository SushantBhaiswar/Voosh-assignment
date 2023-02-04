const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const Router = require("./route")
const cors = require("cors")
const Cookiparser = require("cookie-parser")
const SERVER_URI = require("../Voosh-assignment/client/src/components/config/keys")

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://Sushant_Bhaiswar_30:WBYUu1bCYmxmZUmg@cluster0.jui41on.mongodb.net/sample-db?retryWrites=true&w=majority")
    .then(() => {
        console.log("mongodb is connected")
    })
    .catch((err) => {
        console.log(err.message);
    })
app.use(Cookiparser())
app.use(cors({ credentials: true, origin: SERVER_URI.SERVER_URI }));
app.use(express.json())
app.use("/", Router)
if (process.env.NODE_ENV == 'production') {
    const path = require('path')
    app.use(express.static(path.join(__dirname, "../client/build")));

    app.get("*", function (_, res) {
        res.sendFile(
            path.join(__dirname, "../client/build/index.html"),
            function (err) {
                if (err) {
                    res.status(500).send(err)
                }
            }
        )
    })
}
app.listen(3001, () => {
    console.log("Express app is running on port 3001");
})