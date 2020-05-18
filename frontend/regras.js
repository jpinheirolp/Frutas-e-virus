//mudei
function fabricaregras(jogo,detectormovimento,interfacetela) {
const larguratela = interfacetela.RetornaLargura();
const alturatela = interfacetela.RetornaAltura();
const regras = {
            
    Terfome: function () {
        for(const nomejogador in jogo.jogadores) {
            const auxiliar = jogo.jogadores[nomejogador];
            if (auxiliar.fome > 0) {
                auxiliar.fome -= 100;
            }
            else {
            jogo.funcoes.Deletajogador(nomejogador);
            };
        };
    },
    Movimentar: function(direcao,jogadorn) {
        if(!jogo.jogadores[jogadorn]) {
            return 0;
        }
        const auxiliar = jogo.jogadores[jogadorn] 
        const Y = auxiliar.y;
        const X = auxiliar.x;
        const auxiliamovimentar = {
            ArrowDown: function a() {
                if(Y < (alturatela - 1) && !(jogo.posicaojogadores[`x${X}y${Y+100}`])) {
                    auxiliar.y += 100; 
                    detectormovimento.Propagar(jogadorn, X, Y)
                }
            },
            ArrowUp: function b() {
                if(Y > 0 && !(jogo.posicaojogadores[`x${X}y${Y-100}`])){
                    auxiliar.y -= 100; 
                    detectormovimento.Propagar(jogadorn, X , Y )
                }
            },
            ArrowRight: function c() {
                if(X < (larguratela - 1) && !(jogo.posicaojogadores[`x${X+100}y${Y}`])){
                    auxiliar.x += 100; 
                    detectormovimento.Propagar(jogadorn, X , Y)
                }
            },
            ArrowLeft: function d() {
                if(X > 0 && !(jogo.posicaojogadores[`x${X-100}y${Y}`])){
                    auxiliar.x -= 100; 
                    detectormovimento.Propagar(jogadorn, X , Y);
                }
            }
        }

        const func = auxiliamovimentar[direcao]; 
        if (direcao in auxiliamovimentar) {
            func();
        }
    },
    
    // tentar impedir q surja uma fruta em cima da outra e passar diretamente X e Y para amenizar bug
   
    Comerfruta: function(jogadorn) {           // fazer duas tabelas hash, uma pra fruta outra pra jogadores        
            const auxiliar = jogo.jogadores[jogadorn] 
            const Y = auxiliar.y; 
            const X = auxiliar.x;
             
             if ( jogo.posicaofrutas[`x${X}y${Y}`] ) {                       
                const frutan = jogo.posicaofrutas[`x${X}y${Y}`];                       
                delete jogo.frutas[frutan];             
                if (auxiliar["fome"] < 800) {
                    auxiliar["fome"] += 100;
            
                };
                delete jogo.posicaofrutas[`x${X}y${Y}`];
            }
        },
    
    Executar: function () {
        
        receptor.Movimentar();
    }
}
return regras;
}
module.exports = fabricaregras;