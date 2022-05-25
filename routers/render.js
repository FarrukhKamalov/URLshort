const express = require("express");
const router = express.Router()
const shortUrl = require("../models/shortUrl");

router.get("/", async(req,res)=>{
    try{
        const shortUrls = await shortUrl.find()
        console.log(shortUrls)
        res.render("index", {short: shortUrls})
    }catch(err){
        console.log(err);
    }
})


router.post("/", async(req,res)=>{
    try{
        await shortUrl.create({full: req.body.url})
        res.redirect("/");
    }catch(err){
        console.log(err)
    }
})

router.get("/:id", async(req,res)=>{
    try {
        const shortUrlID = await shortUrl.findOne({short: req.params.id})
        if(shortUrlID == null){
           return res.sendStatus(404)
        }

        shortUrlID.clicks++
        shortUrlID.save()
        console.log(shortUrlID.short)
        res.redirect(shortUrlID.full)
    } catch (error) {
        res.send(error)
    }
})
module.exports = router