## Descrição de Como Rodar o Programa


### Passos para Configurar o Docker e o Redis: 

* Instalar corretamente o Docker.
* Utilizar o seguinte comando para baixar o Redis e iniciar um conteiner a partir dele:
`docker run -p 6379:6379 --name redis-nosql -d redis`
* (Opcional) Entrar na linha de comando do Redis em execução com a finalidade de rodar comandos:
`docker exec -it redis-nosql redis-cli` 

### Passos para Rodar o App: 

* Descompactar a Pasta.
* Ir nas pastas internas 'producer' e 'consumer' e executar o seguinte comando em ambas:
`npm i`
* Rodar o comando `nodemon app.js` em ambas as pastas.
* Após o passo anterior, o Consumidor estará rodando em `http://localhost:3000/`e o Produtor em `http://localhost:3001/`.
