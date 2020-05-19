function Geratela() {
    const tela = {largura : 70, altura : 40} ; //    1301/ 701
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