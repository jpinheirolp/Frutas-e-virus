const express = require("express");
const app = express();
var PORT = 3000;

app.use("/",express.static("frentend"))

app.get("/",(req,res) => {
    res.send("foi");
})

app.listen(PORT,() => {
    console.log("ta ouvindo");
});