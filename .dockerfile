# Usando a imagem oficial do Node.js 22 como base
FROM node:22 AS build

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando o package.json e o package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instalando as dependências da aplicação
RUN npm install --production

# Copiando o código da aplicação
COPY . .

# Compilando a aplicação NestJS
RUN npm run build

# Usando a imagem do Node.js 22 novamente para rodar a aplicação
FROM node:22 AS production

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando apenas os arquivos necessários para o ambiente de produção
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules

# Definindo a variável de ambiente
ENV NODE_ENV=production

# Expondo a porta em que a aplicação irá rodar
EXPOSE 3030

# Comando para rodar a aplicação
CMD ["node", "dist/main"]
