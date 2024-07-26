<h1 align="center">Contabilidade Eficiente</h1>

<div>

  ## Linguagens Utilizadas:
    
  ###### PostgreSQL, Knex.js, Express.js, Docker, Tailwind CSS, JavaScript, TypeScript, React.js
  
</div>

## Descrição do projeto

A aplicação “Contabilidade Eficiente” é uma solução que visa simplificar a gestão financeira e contábil. Ela oferece funcionalidades essenciais, como cadastro de usuários, login, logout, listagem e registro de lançamentos, além da possibilidade de filtrar e excluir esses lançamentos.

O projeto utiliza uma variedade de tecnologias. Essas ferramentas trabalham em conjunto para criar uma experiência eficiente e amigável para os usuários.

## Funcionalidades

<ul>
  <li>Adaptação automática para sistemas modo claro ou escuro</li>
  <li>Cadastro de usuário</li>
  <li>Login de usuário</li>
  <li>Logout de usuário</li>
  <li>Listagem de lançamentos</li>
  <li>Filtragem de lançamentos</li>
  <li>Registro de lançamentos</li>
  <li>Exclusão de lançamentos</li>
</ul>

## Instruções de inicialização

### ▶ Acesse a aplicação <a href="https://scoder-tech-challenge.onrender.com">*aqui*</a>

<br>

<details>
  
  <summary>🐋 Para executar via Docker:</summary>

  <br>

  Requisitos:
  
  `Docker`

  > Certifique-se de não ter alterado o arquivo .env
  
  Para iniciar a aplicação: dentro do diretório, execute no terminal:
  ```
  docker compose up -d
  ```
  
  Para interromper a aplicação: dentro do diretório, execute no terminal:
  ```
  docker compose stop
  ```

  <br>

</details>

<details>
  
  <summary>👨🏻‍💻 Para executar localmente:</summary>

  <br>

  Requisitos:
  
  `PostgreSQL` `Node.js`
  
  Altere os valores no arquivo .env:
  ```javascript
  VITE_API="http://localhost:3000"
  PGHOST="localhost"
  PGDATABASE= /* SUA BASE DE DADOS VAZIA */
  PGUSER= /* NOME DE SEU USUÁRIO DO BANCO DE DADOS */
  PGPASSWORD= /* SENHA DO SEU USUÁRIO DO BANCO DE DADOS */
  ```
  Para iniciar a aplicação, execute no terminal:
  ```
  npm i && npm run start
  ```
  
  Para fechar a aplicação, selecione o terminal e pressione as teclas:
  > Ctrl + C, em seguida s para confirmar

  <br>

</details>

## Créditos

- ###### Logo por <a href="https://copilot.microsoft.com">*Microsoft Copilot*</a>

- ###### Banco de Dados e Server Deploy por <a href="https://render.com">*Render*</a>

- ###### Layout de tabela por <a href="https://www.youtube.com/watch?v=S4MhQ6peq8A">*cdruc*</a>

- ###### Padrão de fundo por <a href="https://hillmann.cc/tailwindcss-bg-patterns/">*thillmann*</a>

## Instruções de uso

```
Para realizar o login:
```
> Necessário cadastro prévio, insira suas credenciais

```
Para se desconectar:
```
> Clique no botão "Sair", localizado na parte superior direita

```
Para registrar novo lançamento:
```
> Clique no botão "Registrar", acima da lista de lançamentos, preencha o formulário que abrirá e confirme

```
Para cancelar novo lançamento:
```
> Clique para fora do formulário

```
Para excluir lançamento:
```
> Clique no sinal de menos(-) do respectivo lançamento e clique novamente para confirmar

```
Para cancelar exclusão de lançamento:
```
> A exclusão será cancelada após 3 segundos sem confirmação da mesma

```
Para buscar lançamento:
```
> Altere a seleção de ano ou mês acima da lista de lançamentos

<br>

<div aling="center">

  ![image](https://github.com/user-attachments/assets/afbe8b03-9bc2-498a-8999-c9122c71a556)

</div>
