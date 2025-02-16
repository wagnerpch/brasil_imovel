# POC: Replit - Node.JS e React.Ts

[![Static Badge](https://img.shields.io/badge/license-GNU-green)](https://github.com/wagnerpch/brasil_imovel/blob/main/LICENSE)

Projeto teste do Replit.com

# Sobre o projeto

Aplicação desenvolvida 99,9% pelo Replit.com. O restante foi configuração de GOOGLE_MAPS_API_KEY no site do Google (https://console.cloud.google.com/), para colocar no arquivo local ".env-development" (não incluído no repositório por segurança).

# Tecnologias utilizadas

Este projeto utiliza um stack moderno para desenvolvimento web com React, Vite e TypeScript, acompanhado de várias bibliotecas para estilização, gerenciamento de estado, autenticação e integração com banco de dados:

- Frontend: React (com React Hook Form, Tanstack React Query, Framer Motion, Recharts, Radix UI e MUI) para criação da interface e interatividade. Tailwind CSS, com plugins, cuida da estilização responsiva.
- Backend: Express, com suporte a sessões (express-session, connect-pg-simple, memorystore) e autenticação via Passport (local strategy).
- Banco de dados: Drizzle ORM (com drizzle-zod para validação) para modelagem e consultas, integrado com um banco Postgres (neondatabase/serverless).
- Ferramentas de build: Vite, TypeScript e Esbuild para um ambiente de desenvolvimento rápido e moderno.
- Testes e validação: Zod para validação de esquemas e tratamento de erros.
- Mapas: @react-google-maps/api para integração com Google Maps.
- Outros: WebSockets com "ws" e gerenciamento de estado com Tanstack React Query.

# Como executar o projeto

## Back end

Pré-requisitos: Node.Js (https://nodejs.org/en)

```bash
# clonar repositório
git clone https://github.com/wagnerpch/brasil_imovel

# acesse a pasta raiz do projeto
cd brasil_imovel

# instalar o projeto
cd npm i

# crier o arquivo .env.development
adicione a credencial do google maps

# executar o projeto
cd npm run dev
```

# Autores
Aline Aparecida Pereira Chequeleiro - https://www.linkedin.com/in/alineapchequeleiro/
Wagner Pereira Chequeleiro - https://www.linkedin.com/in/wagnerpch/
