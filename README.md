## Projeto Store Manager
Foi desenvolvida uma API para emular o desempenho de uma loja, com a finalidade de armazenar informações sobre produtos e vendas. Para possibilitar essa funcionalidade, implementou-se o CRUD nas rotas /sales e /products. Além disso, utilizou-se a Arquitetura MSC (Model, Service e Controller) para criar as rotas e estabelecer a comunicação com o banco de dados. A fim de garantir a qualidade do sistema, testes foram criados para as camadas MSC, utilizando a ferramenta Mocha.

## Tecnologias
* Node.js
* Docker
* docker-compose
* SQL
* Mocha

## Instalando Dependências
Clone o repositório do GitHub

```javascript
 git clone git@github.com:victorhdoliveira/store-manager.git
```

### Com Docker
> Backend

1. Rode os serviços node e db com o seguinte comando: 
```bash
docker-compose up -d
``` 

2. Abra o terminal interativo do container: 
```bash
docker exec -it store_manager bash
``` 

3. Instale as dependências dentro do container: 
```bash
npm install
``` 
4. Execute a aplicação: 
```bash
npm start
``` 
> Testes

5. Dentro do terminal do container:
```bash
npm test
``` 
6. Para rodar os testes unitários:
```bash
npm test:mocha
``` 

:warning: Atenção: O git dentro do container não vem configurado com suas credenciais;

### Sem Docker

Instale as dependências
```bash
npm install
```

Para executar os testes:
```bash
npm test
``` 
Para rodar os testes unitários:
```bash
npm test:mocha
``` 
