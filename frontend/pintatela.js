function pintatela(contexto,jogo,jogadorn) {
                 
    contexto.clearRect(0,0,1400,800);

    for (const indicefruta in jogo.frutas) {
        const objeto = jogo.frutas[indicefruta];
        
        

        contexto.fillStyle = objeto.cor;
        contexto.fillRect(objeto.x ,objeto.y ,100 ,100);
        
    };
    
    for (const indicejogador in jogo.jogadores) {
        const objeto = jogo.jogadores[indicejogador];
    
    
        contexto.fillStyle = "pink";
        contexto.fillRect(objeto.x ,objeto.y ,100 ,100);
   
    };
    
    contexto.fillStyle = "black";
    contexto.fillRect(0, 800 , 1400,100 ); // barrra de fome
    contexto.fillStyle = "grey";
    contexto.fillRect(300, 800 ,jogo.jogadores[jogadorn].fome,100 ); // barrra de fome *temos um proberma

};
export default pintatela;