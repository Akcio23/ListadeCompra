// Importa o módulo Express para criar o servidor web (se não tiver, usar o npn install express)
const express = require('express');
// Cria uma instância do aplicativo Express
const app = express();
// Define a porta do servidor (3001 neste caso, pode escolher qualquer outra)
const port = 3001;
// Analisa o corpo (body) das requisições HTTP em formato JSON
app.use(express.json());
// Servir arquivos estáticos (como HTML, CSS, imagens) a partir do diretório atual
app.use(express.static(__dirname));
// Vetor que simula um BD
let listaDeCompras = [];

// Rota GET todos os itens
app.get('/itens', (req, res) => {
    // formato json
    res.json(listaDeCompras);
});

// Rota POST novo item
app.post('/itens', (req, res) => {
    // Obtém os dados 
    let id = Math.floor(Math.random() * 20)
    const novoItem = req.body;
    const obj = {
        name: novoItem.nome,
        id
    }
    // Adiciona o novo item à lista (metodo push)
    listaDeCompras.push(obj);
    // Envia o novo item criado 
    res.status(201).json(listaDeCompras);
});

// Rota DELETE para remover um item
app.delete('/itens/:id', (req, res) => {
    // Extrai o índice do item da URL e converte para número inteiro
     const {id} = req.params
     listaDeCompras.map((item) => {
         if(item.id === parseInt(id)){
             listaDeCompras.pop(item.id);
         }
     })
        res.sendStatus(204);
});

// Inicia o servidor na porta especificada
app.listen(port, () => {
    // mensagem no CMD indicando o funcionamento
    console.log(`Servidor rodando em http://localhost:${port}`);
});