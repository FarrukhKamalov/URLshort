const express = require("express");
const app = express()
const mongoose = require("mongoose")

require("dotenv").config()

mongoose.connect(`mongodb+srv://${process.env.Mongo_Db}:${process.env.Mongo_Db}@cluster0.yutrt.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    console.log("mongodb server")
}).catch(err=>{
    console.log(err)
});


app.set("view engine", "ejs")

app.use(express.urlencoded({extended:true}));
app.use(express.json())


app.use("/", require("./routers/render"))

app.listen(process.env.PORT || 4000, ()=>{
    console.log(`server :) ${process.env.PORT || 4000}`)
})