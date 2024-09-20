

# Instruções para Configuração e Execução da Aplicação

Bem-vindo ao Sonho & Arte! Este guia irá ajudá-lo a configurar e executar a aplicação localmente, garantindo que todas as dependências e configurações estejam corretas.

## Pré-requisitos

Antes de começar, verifique se você possui as seguintes ferramentas instaladas:

- **Node.js** (versão recomendada: 14.x ou superior)
- **npm** (geralmente vem com o Node.js)
- **MySQL** (certifique-se de que está instalado e configurado)

## Passos para Configuração

### 1. Instalação de Dependências

1. **Navegue até os diretórios:**
   Abra seu terminal e acesse as pastas `client` e `server` usando os comandos:

   ```bash
   cd client
   ```

   Em seguida, para voltar ao diretório principal e acessar o servidor:

   ```bash
   cd ../server
   ```

2. **Instale as dependências:**
   Execute o seguinte comando em cada diretório para instalar as dependências necessárias:

   - No diretório `client`:
     ```bash
     npm install
     ```

   - No diretório `server`:
     ```bash
     npm install
     ```

### 2. Configuração do Banco de Dados

1. **Verifique o MySQL:**
   Assegure-se de que o MySQL esteja instalado, configurado e em execução em sua máquina. Caso não tenha o MySQL, você pode baixá-lo [aqui](https://dev.mysql.com/downloads/mysql/).

2. **Configure o ambiente de desenvolvimento:**
   Instale as extensões e plugins necessários em seu editor (como o MySQL Workbench) para interagir com o MySQL.

### 3. Configuração do Arquivo `.env`

1. **Crie o arquivo `.env`:**
   Na pasta `server`, crie um arquivo chamado `.env` na raiz do diretório.

2. **Adicione a configuração da porta:**
   Insira a seguinte linha no arquivo `.env`:

   ```plaintext
   PORT=3000
   ```

   Isso define a porta padrão para o servidor backend.

### 4. Inicialização dos Servidores

1. **Abra dois terminais:**
   - Um terminal para a pasta `client`.
   - Outro terminal para a pasta `server`.

### 5. Comandos de Inicialização

1. **Para o frontend:**
   No terminal da pasta `client`, execute:

   ```bash
   npm run dev
   ```

   Isso iniciará o servidor de desenvolvimento para o frontend.

2. **Para o backend:**
   No terminal da pasta `server`, execute:

   ```bash
   npm start
   ```

   Isso iniciará o servidor backend.

### 6. Visualização da Aplicação

1. **Acesse a aplicação:**
   Após iniciar ambos os servidores, você pode visualizar a aplicação através do link exibido no terminal da pasta `client`.

2. **Verifique as portas:**
   Certifique-se de usar as portas corretas configuradas nos scripts de inicialização:

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3000` (ou a porta especificada no seu arquivo `.env`).

## Considerações Finais

Seguindo esses passos, você estará pronto para desenvolver e visualizar sua aplicação localmente, garantindo que todas as configurações e dependências estejam corretamente configuradas. 
