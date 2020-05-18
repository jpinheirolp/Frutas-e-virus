function Geratela() {
    const tela = {largura : 1301, altura : 701} ; //    70/40 
    const Interfacetela = {
        AlteraAltura : function alteraaltura(valor) {
        tela.altura = valor;
        },
        AlteraLargura : function alteralargura(valor) {
        tela.largura = valor;
        },
        RetornaAltura : function retornaaltura() { return tela.altura },
        RetornaLargura : function retornalargura() { return tela.largura },
    }
    return Interfacetela;
}

export default Geratela;

//module.exports = Geratela;