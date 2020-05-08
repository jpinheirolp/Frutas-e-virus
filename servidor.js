const express = require("express");
const app = express();
const http = require("http");
const servidor = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(servidor);
var PORT = 3000;

app.use("/",express.static("frentend"))

app.get("/",(req,res) => {
    res.send("foi");
})

io.on("connection",(socket) => {
    console.log("conexão bem sucedida")
}); 



servidor.listen(PORT,() => {
    console.log("ta ouvindo");
});