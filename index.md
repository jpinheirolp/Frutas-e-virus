<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        #tela{
            border: 1px solid #000;
            
        }
    </style>
</head>
<body style="background-color: #2eb4a9d0;">
   
    <canvas id="tela" width = "1400" height = "900" > </canvas>

    <script >              
        
        const tela = document.getElementById("tela");
        const contexto = tela.getContext("2d");

        //import jogo from './jogo.js' ;
        /*
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
                    auxiliar = jogo.jogadores[jogadorn];
                    x = auxiliar.x;
                    y = auxiliar.y;
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
                    x = Math.random() * 1400;
                    y = Math.random() * 700;
                    x -= x%100;
                    y -= y%100;
                    fome = 800;
                    resultado = {                        
                        x: x,
                        y: y,
                        fome: fome ,
                        status: `${x},${y},${fome}`
                    };
                    Object.defineProperty(jogo.jogadores, nomejogador,{value: resultado,enumerable:true, configurable:true});
                    regras.Movimentar("ArrowDown",nomejogador) // para registrar em posicaojogadores
                },
                Gerarfruta : function() { 
                    
                    diconario = [ "yellow","red","purple","blue","green"];
                    if(Object.keys(jogo.frutas).length  < 20){  //se o tamanho do objeto jogo.frutas for < 20 adicione uma fruta a ele.
                        jogo.numeracao.numerofrutas += 1;
                        x = Math.random() * 1400;
                        y = Math.random() * 800;                         

                        x -= x%100;
                        y -= y%100;
                        n = Math.floor(Math.random() * diconario.length);
                        
                        cor =  diconario[n];//usei o resultado aleatório y % x para escolher a cor da fruta ramdomicamente.
                        
                        
                        resultado = {                        
                            x: x,
                            y: y,
                            cor: cor ,
                            //status: `${x},${y},${cor}`
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
        */
        const regras = {
            
            Terfome: function () {
                for(nomejogador in jogo.jogadores) {
                    const auxiliar = jogo.jogadores[nomejogador];
                    if (auxiliar.fome > 0) {
                        auxiliar.fome -= 100;
                    
                    };
                }
            },
            Movimentar: function(direcao,jogadorn) {
                const auxiliar = jogo.jogadores[jogadorn] 
                const Y = auxiliar.y;
                const X = auxiliar.x;
                const auxiliamovimentar = {
                    ArrowDown: function a() {
                        if(Y < 700 && !(jogo.posicaojogadores[`x${X}y${Y+100}`])) {
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
                        if(X < 1300 && !(jogo.posicaojogadores[`x${X+100}y${Y}`])){
                            auxiliar.x += 100; 
                            detectormovimento.Propagar(jogadorn, X , Y)
                        }
                    },
                    ArrowLeft: function d() {
                        if(X > 0 && !(jogo.posicaojogadores[`x${X-100}y${Y}`])){
                            auxiliar.x -= 100; 
                            detectormovimento.Propagar(jogadorn, X , Y)
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
        
        const repetidor = {        
            listaDeOuvintes: []
            ,
            Propagar: function propaga(event) {
                for (funcaoOuvinte of repetidor.listaDeOuvintes) {
                    const jogadorn = "jogador1";
                    funcaoOuvinte(event.key,jogadorn); //jogadorn é o jogador do respectivo cliente
                    console.log(event.key);

                }
            },
            AdicionarOuvinte: function adiciona(ouvinte) {
                repetidor.listaDeOuvintes.push(ouvinte) ;
            }
        };
        
        document.addEventListener("keydown", repetidor.Propagar);
        
        const clock = {        
            listaDeOuvintes: []
            ,
            intervalotempo:undefined ,
            Propagar: function propaga() {
                clock.intervalotempo = setInterval(clock.Auxiliapropagar,1000);
                
            },
            Auxiliapropagar: function auxiliapropagar() {
                for (funcaoOuvinte of clock.listaDeOuvintes) {
                    funcaoOuvinte();
                }
            },
            AdicionarOuvinte: function adiciona(ouvinte) {
                clock.listaDeOuvintes.push(ouvinte) ;
            }
        };
        
        const detectormovimento = {
            listaDeOuvintes : [],
            Propagar : function(jogadorn,arg1,arg2) {
                for(funcaoOuvinte of detectormovimento.listaDeOuvintes) {
                    funcaoOuvinte(jogadorn,arg1,arg2);
                }
            },
            AdicionarOuvinte : function(ouvinte){
                
                detectormovimento.listaDeOuvintes.push(ouvinte);
            }
        };
        // observador de colisão é chamado quando a matriz posiçãojogadores é atualizada
        jogo.funcoes.Gerarjogador("jogador1");

        clock.AdicionarOuvinte(jogo.funcoes.Gerarfruta);
        clock.AdicionarOuvinte(regras.Terfome);

        clock.Propagar();
        
        repetidor.AdicionarOuvinte(regras.Movimentar);
        
        detectormovimento.AdicionarOuvinte(jogo.funcoes.Atualizaposicaojogadores);
        detectormovimento.AdicionarOuvinte(regras.Comerfruta);

        loop(); 


        function loop() {
                 
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
                contexto.fillRect(300, 800 ,jogo.jogadores.jogador1.fome,100 ); // barrra de fome

            requestAnimationFrame(loop) ;  
        };
        
        


        
    </script>
</body>
</html>