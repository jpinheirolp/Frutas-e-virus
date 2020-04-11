const jogo = {
    posicaojogadores: {}, //matriz esparça que diz onde há jogadores
    jogadores: {},       
    posicaofrutas: {},
    frutas: {},
    numeracao: {
        numerojogadores : 0,
        numerofrutas: 0,
    },
    funcoes: {               
        Atualizaposicaojogadores : function(jogadorn,x0,y0) { //x e y antes da mudança
            const auxiliar = jogo.jogadores[jogadorn];
            const x = auxiliar.x;
            const y = auxiliar.y;
            delete jogo.posicaojogadores[`x${x0}y${y0}`];
            jogo.posicaojogadores[`x${x}y${y}`] = jogadorn;
            
        },
        Gerarjogador : function(nomejogador) {                    
            if(nomejogador === undefined) {
                nomejogador = `jogador${jogo.numeracao.numerojogadores + 1}`;                       
            }
            console.log(nomejogador)
            if(jogo.jogadores[nomejogador]) {
                throw Error("esse nome já existe, ecolha outro seu cabeça de alpaca");                       
            }
            jogo.numeracao.numerojogadores += 1;
            const d = {x:Math.random() * 1300, 
                       y:Math.random() * 700};   
            
            d.x -= d.x%100;
            d.y -= d.y%100;
            const fome = 800;
            const resultado = {                        
                x: d.x,
                y: d.y,
                fome: fome ,
            };
            Object.defineProperty(jogo.jogadores, nomejogador,{value: resultado,enumerable:true, configurable:true});
            //regras.Movimentar("ArrowDown",nomejogador) // para registrar em posicaojogadores
        },
        Gerarfruta : function() { 
            
            const diconario = [ "yellow","red","purple","blue","green"];
            if(Object.keys(jogo.frutas).length  < 20){  //se o tamanho do objeto jogo.frutas for < 20 adicione uma fruta a ele.
                jogo.numeracao.numerofrutas += 1;
                const d = {x:Math.random() * 1300, 
                           y:Math.random() * 700};                           

                d.x -= d.x%100;
                d.y -= d.y%100;
                const n = Math.floor(Math.random() * diconario.length);
                
                const cor =  diconario[n];//usei o resultado aleatório y % x para escolher a cor da fruta ramdomicamente.
                
                
                resultado = {                        
                    x: d.x,
                    y: d.y,
                    cor: cor ,
                    
                };
                if(jogo.posicaofrutas[`x${x}y${y}`] || jogo.posicaojogadores[`x${x}y${y}`] ) {
                    jogo.funcoes.Gerarfruta();
                }
                else {
                    jogo.posicaofrutas[`x${x}y${y}`] = `fruta${jogo.numeracao.numerofrutas}`;
                    Object.defineProperty(jogo.frutas, `fruta${jogo.numeracao.numerofrutas}`,{value: resultado, enumerable:true, configurable:true});
                }
                
            };
        },
        
    } 
};

export default jogo;