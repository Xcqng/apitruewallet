const axios = require("axios");
const express = require("express");
const app = express()
var isoDateString = new Date().toISOString();
app.get("/api/:v/:n",(req,res)=>{
var v = req.params.v
var m = req.params.n
var option = {
url:"https://gift.truemoney.com/campaign/vouchers/"+v+"/redeem",
method:"POST",
headers: {'Content-Type': 'application/json'},
data: {mobile: m}
};
axios(option).then((ress)=>{
var status = ress.data.status
var text = ress.data.data.voucher.detail
var object = ress.data.data.my_ticket
var full_name = object.full_name
var mobile = object.mobile
var amout = object.amount_baht
var name = ress.data.data.owner_profile
var names = Object.values(name)
var data = {
status:status,
name:full_name,
mobile:mobile,
amout:amout,
names:names,
text:text,
time:isoDateString
}
res.json(data)
console.log("ชื่อผู้รับ:",data.name,"เบอร์ผู้รับ:",data.mobile,"จำนวน:",data.amout+"บาท"+"คำอวยพร:",data.text,"ซองของ:",data.names[0],"เวลา:",data.time)
}).catch((err)=>{
var fail = {status:"ERROR",code:"error",message:"ลิ้งของคุณไม่ถูกต้อง"}
res.status(400).json(fail)
})


})
app.use("/",(req,res,nuxt)=>{
res.status(404).send("ERROR 404 !");
})
app.listen(5000,()=>{console.log("Starting Server")})

