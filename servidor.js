const express = require("express");
const app = express();
const http = require("http");
const servidor = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(servidor);
var PORT = 3000;

app.use("/",express.static("frontend"))

app.get("/",(req,res) => {
    res.send("foi");
})
    const geratela = require("./frontend/tela.js");

    const interfacetela = geratela();

    const fabricajogo = require("./frontend/jogo.js") ;
        
    const jogo = fabricajogo(interfacetela);
        
    const fabricaregras = require('./frontend/regras.js');
        
    const fabricaclock = require('./frontend/clock.js');
        
    const clock1fps = fabricaclock(1000);
        
    const fabricadetectormovimento = require('./frontend/detectormovimento.js');

    const detectormovimento = fabricadetectormovimento();

    const regras = fabricaregras(jogo,detectormovimento,interfacetela);
        
        // observador de colisão é chamado quando a matriz posiçãojogadores é atualizada

    clock1fps.AdicionarOuvinte(jogo.funcoes.Gerarfruta);
    clock1fps.AdicionarOuvinte(regras.Terfome);

    clock1fps.Propagar();
        
    detectormovimento.AdicionarOuvinte(jogo.funcoes.Atualizaposicaojogadores);
    detectormovimento.AdicionarOuvinte(regras.Comerfruta);

io.on("connection",(socket) => {
    
    auxiliaEmissaoTela = () => {
        io.emit("inicio",interfacetela);
    }
    
    setTimeout(auxiliaEmissaoTela,100);

    jogo.funcoes.Gerarjogador(socket.id);
    
    console.log(`conexão bem sucedida com "${socket.id}"` );
    auxiliaEmissao = () => {
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