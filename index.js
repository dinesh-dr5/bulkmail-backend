const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const nodemailer = require("nodemailer")

const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://dinesh:123@cluster0.3omtqcp.mongodb.net/passkey?appName=Cluster0").then(() => console.log("DB connect")
).catch(() => console.log("DB not connect"))

var passkey = mongoose.model("passkey", {}, "bulkmail")



app.listen(100, function () {
    console.log("sever started")
})


passkey.find().then(function (data) {

    const transporter = nodemailer.createTransport({

        service: "gmail",

        auth: {
            user: data[0].toJSON().user,
            pass: data[0].toJSON().pass,
        },
    })

    app.post("/sendmail", function (req, res) {

        var msg = req.body.msg

        var emaillist = req.body.emaillist

        var subject = req.query.sbj
        



        const sending = new Promise(async function (resolve, reject) {

            try {
                for (var i = 0; i < emaillist.length; i++) {

                    await transporter.sendMail({
                        from: data[0].toJSON().user,
                        to: emaillist[i],
                        subject: subject,
                        text: msg
                    })
                    resolve("Successfully")
                }
            }

            catch (error) {
                reject("failed")
            }

        })

        sending.then(function () {
            res.send(true)
        }).catch(function () {
            res.send(false)
        })
    })


})






