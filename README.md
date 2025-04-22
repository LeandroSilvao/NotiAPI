<p align="center">
    <img src="./src/assets/logo.png" width="200" alt="NotiAPI Logo" />
</p>

## NotiAPI - Central de Notificações Unificadas

NotiAPI é um serviço SaaS que facilita o envio de notificações em vários canais (email, SMS, WhatsApp, Telegram, Slack, etc.) a partir de uma única API. Ela centraliza e simplifica o envio de notificações, otimizando a integração com diversos serviços de comunicação.

---

## Funcionalidades em Desenvolvimento/Futuras

- **Envio Multicanal de Notificações**: Envio de notificações via email, SMS, WhatsApp, Telegram e outros, com uma única requisição.
- **Templates Dinâmicos**: Criação e reutilização de templates de notificações com placeholders.
- **Webhook para Respostas**: Receba notificações de respostas ou falhas no envio das mensagens.
- **Logs de Entrega**: Acompanhamento do status de entrega das notificações (enviado, falha, entregue).
- **Gerenciamento de Usuários**: Cada usuário pode definir preferências para canais e horários de envio.

---

## Instalação

```bash
$ npm install
```

## Inicie a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```