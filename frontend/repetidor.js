function fabricarepetidor() {
const repetidor = {        
    listaDeOuvintes: []
    ,
    Propagar: function propaga(event) {
        for (const funcaoOuvinte of repetidor.listaDeOuvintes) {
            const jogadorn = "jogador1";
            funcaoOuvinte(event.key,jogadorn); //jogadorn é o jogador do respectivo cliente
            console.log(event.key);

        }
    },
    AdicionarOuvinte: function adiciona(ouvinte) {
        repetidor.listaDeOuvintes.push(ouvinte) ;
    }
};
return repetidor;
};
module.exports = fabricarepetidor;