function fabricaclock() {
const clock = {        
    listaDeOuvintes: []
    ,
    intervalotempo:undefined ,
    Propagar: function propaga() {
        clock.intervalotempo = setInterval(clock.Auxiliapropagar,1000);
        
    },
    Auxiliapropagar: function auxiliapropagar() {
        for (const funcaoOuvinte of clock.listaDeOuvintes) {
            funcaoOuvinte();
        }
    },
    AdicionarOuvinte: function adiciona(ouvinte) {
        clock.listaDeOuvintes.push(ouvinte) ;
    }
};
return clock;
};
export default fabricaclock;