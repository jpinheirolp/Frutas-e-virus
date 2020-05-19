function pintatela(contexto,jogo,jogadorn,dimensoes,unidadecomprimento) {
                 
    contexto.clearRect(0,0,dimensoes.largura,dimensoes.altura);

    for (const indicefruta in jogo.frutas) {
        const objeto = jogo.frutas[indicefruta];

        contexto.fillStyle = objeto.cor;
        contexto.fillRect(objeto.x * unidadecomprimento ,objeto.y * unidadecomprimento , unidadecomprimento , unidadecomprimento);
        
    };
    
    for (const indicejogador in jogo.jogadores) {
        const objeto = jogo.jogadores[indicejogador];
    
    
        contexto.fillStyle = "pink";
        contexto.fillRect(objeto.x * unidadecomprimento ,objeto.y * unidadecomprimento , unidadecomprimento , unidadecomprimento);
   
    };
    
    contexto.fillStyle = "black";
    contexto.fillRect(0, 800 , dimensoes.largura,100 ); // barrra de fome
    contexto.fillStyle = "grey";
    if(jogo.jogadores[jogadorn]){
    contexto.fillRect(300, 800 ,jogo.jogadores[jogadorn].fome,100 ); // barrra de fome *temos um proberma
    }
};
export default pintatela;