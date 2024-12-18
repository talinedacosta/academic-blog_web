# Tech Challenge - Academic Blog Web


**Tecnologias**

Este projeto utiliza as seguintes tecnologias:

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [MUI](https://mui.com/material-ui/)

**Pré-requisitos**

Antes de iniciar, certifique-se de ter as ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- Gerenciador de pacotes (npm ou yarn)
- API e banco, siga as instruções do projeto: https://github.com/talinedacosta/academic-blog_api 
- API rodando no endereço: http://localhost:3000

**Estrutura do projeto**
```bash
academic-blog_web/
│
├── .github
│   ├── workflows
├── /public
│
├── /src
│   ├── /components - Componentes reutilizáveis
│   ├── /services - Chamadas HTTP (ex: API)
│   ├── /contexts - Gerenciamento de estado
│   ├── /pages - Páginas principais da aplicação
│   ├── /routes - Configuração do React Router
│   ├── App.tsx - Componente principal
│   ├── main.tsx - Ponto de entrada
│   └── vite-env.d.ts
│    
├── .env
├── package.json
├── README.md
├── Dockerfile
├── docker-compose.yml
├── eslint.config.js
├── index.html
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── .gitignore
```

#### Executando projeto com a imagem talinedacosta/fiap_academic_blog_web
Para executar o projeto no Docker utilizando a imagem talinedacosta/fiap_academic_blog_web, é necessário criar o arquivo docker-compose.yml e executar o comando docker-compose up -d

Crie a pasta do projeto e o arquivo docker-compose.yml

```bash
  mkdir academic-blog_web
  cd academic-blog_web
  vim docker-compose.yml
```
Adicione as informações a seguir dentro do docker-compose.yml

```bash
  version: '3.8'

  services:
    app:
      image: talinedacosta/fiap_academic_blog_web:latest
      container_name: academic_blog_web
      ports:
        - "9100:80"
      restart: always
```

Rode o comando docker-compose up -d para baixar e rodar as imagens

```bash
  docker-compose up -d
```

A WEB estará rodando na porta http://localhost:9100.

#### Executando projeto localmente

Clone o projeto

```bash
  git clone https://github.com/talinedacosta/academic-blog_web.git
```

Entre no diretório do projeto

```bash
  cd academic-blog_web
```

Instale as dependências

```bash
  npm install
```
Inicie o servidor

```bash
  npm run dev
```


### **Rotas da Aplicação**

Abaixo estão listadas as principais rotas da aplicação:

| **Caminho (URL)**    | **Componente**      | **Descrição**                        |
|-----------------------|---------------------|--------------------------------------|
| `/`                   | `Home`        | Página principal da aplicação.       |
| `/login`              | `Login`            | Página para autenticação do usuário. |
| `/posts`              | `Posts`            | Página onde o usuário visualiza as postagens. |
| `/posts/:id`          | `Post`      | Página de detalhes de uma postagem específica. |
| `/admin`            | `Admin`          | Página para administração dos posts. |
| `/admin/create-post`           | `CreatePost`         | Página para criação de postagem.          |
| `/admin/edit-post`           | `EditPost`         | Página para edição de postagem.          |
| `/not-authorized`           | `NotAuthorized`         | Página de não autorizado.          |

### **Rotas Públicas vs Privadas**

Algumas rotas podem ser protegidas, acessíveis apenas se o usuário estiver autenticado e também com a função de professor (valor 1). Isso é tratado no componente `PrivateRoute`.

**Exemplo de Rotas Protegidas:**
```javascript
<Routes>
  <Route path="/posts" element={<Posts />} />
  <Route path="/admin" element={<PrivateRoute role={1}><Admin /></PrivateRoute>} />
</Routes>
```

### **Criando, editando e excluindo postagens**

Após rodar a API e banco através do projeto indicado, você terá um acesso de professor com as credenciais
- professor_luiza@fiap.com
- 123456

Acesse a rota de /login, depois a rota de /admin, através dessa página você poderá criar, editar e excluir postagens.