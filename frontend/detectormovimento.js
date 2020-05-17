function fabricadetectormovimento() {
    const detectormovimento = {
        listaDeOuvintes : [],
        Propagar : function(jogadorn,arg1,arg2) {
            for(const funcaoOuvinte of detectormovimento.listaDeOuvintes) {
                funcaoOuvinte(jogadorn,arg1,arg2);
            }
        },
        AdicionarOuvinte : function(ouvinte){
            
            detectormovimento.listaDeOuvintes.push(ouvinte);
        }
    };
    return detectormovimento;
};
module.exports = fabricadetectormovimento;