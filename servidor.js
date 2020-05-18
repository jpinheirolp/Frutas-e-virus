import express from "express";
//const express = require("express");
const app = express();
import http from "http";
//const http = require("http");
const servidor = http.createServer(app);

import socketio from "socket.io";
//const socketio = require("socket.io");
const io = socketio(servidor);
var PORT = 3000;

app.use("/",express.static("frontend"))

app.get("/",(req,res) => {
    res.send("foi");
})
    // const geratela = require("./frontend/tela.js");
    import geratela from "./frontend/tela.mjs";

    const interfacetela = geratela();

    import  fabricajogo from "./frontend/jogo.js";
    //const fabricajogo = require("./frontend/jogo.js") ;
        
    const jogo = fabricajogo(interfacetela);

    import  fabricaregras from "./frontend/regras.js";
    //const fabricaregras = require('./frontend/regras.js');

    import  fabricaclock from "./frontend/clock.js";        
    //const fabricaclock = require('./frontend/clock.js');
        
    const clock1fps = fabricaclock(1000);

    import  fabricadetectormovimento from "./frontend/detectormovimento.js";       
    //const fabricadetectormovimento = require('./frontend/detectormovimento.js');

    const detectormovimento = fabricadetectormovimento();

    const regras = fabricaregras(jogo,detectormovimento,interfacetela);
        
        // observador de colisão é chamado quando a matriz posiçãojogadores é atualizada

    clock1fps.AdicionarOuvinte(jogo.funcoes.Gerarfruta);
    clock1fps.AdicionarOuvinte(regras.Terfome);

    clock1fps.Propagar();
        
    detectormovimento.AdicionarOuvinte(jogo.funcoes.Atualizaposicaojogadores);
    detectormovimento.AdicionarOuvinte(regras.Comerfruta);

io.on("connection",(socket) => {
    
    jogo.funcoes.Gerarjogador(socket.id);
    
    console.log(`conexão bem sucedida com "${socket.id}"` );
    const auxiliaEmissao = () => {
        io.emit("jogatina",jogo);
    }
    setInterval(auxiliaEmissao,25);
    socket.on("jogatina", (tecla) => {
        regras.Movimentar(tecla,socket.id);
    })
    socket.on("disconnect", () => {
        console.log("usuário nos deixou {8( ");
    })
}); 



servidor.listen(PORT,() => {
    console.log("ta ouvindo");
});