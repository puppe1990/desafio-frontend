const URL = 'https://api.github.com/users/puppe1990';
//instancia classe responsável ao consumo da api
const xhr = new XMLHttpRequest();
//define opções da requisição
xhr.open('GET', URL, true);
//envia requisição para a api
xhr.send();
//trata os dados de maneira assincrona 
xhr.onload = function(e) {
    //salva resposta da api em uma variavel
    //e transforma resposta em um JSON válido
    const res = JSON.parse(xhr.response);
    console.log(res);
}