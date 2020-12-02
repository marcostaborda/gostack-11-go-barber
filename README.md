## :older_man:  GoBarber  :rocket:

Aplicação direcionada para uso de barbeiros, onde é possível fazer o agendamento e acompanhar a agenda de horários. Ela foi desevolvida em 3 tipos de aplicações.
Utilizei as tecnologias: 

- Node.js
- React JS
- React Native
- TypeScript
- Mongodb
- Postgres
- TypeOrm
- Cache com Redis
- RateLimiter
- AWS SES Email e Fake mail com Etheral
- AWS S3 Storage

###  Rodando a aplicação:

Para rodar a aplicação tem que fazer um git clone do repositório, abrir cada repositório e rodar `yarn` para instalar as dependências.

1. Configurar o banco de dados do backend, criando o arquivo [ormconfig.json](https://typeorm.io/#/using-ormconfig) na pasta raiz do projeto.
2. Rodar as migrations comando `yarn typeorm migration:run`.
3. Renomear o arquivo .env.example para .env e configurar as variáveis de ambiente.
3. Deixar rodando o servidor `yarn dev:server`.
4. Para rodar a versão web, tem que entrar na pasta web e rodar o comando `yarn start`. 
5. Para rodar a versão mobile(app), tem que entrar na pasta app e rodar o comando `yarn start`.

### Requisitos: 

- Manter o [back-end](https://github.com/marcostaborda/gostack-11-go-barber/tree/master/backend) rodando.

### Funcionalidades da aplicação

- Acompanhamento da Agenda.
- Marcar um agendamento na versão mobile.
- Envio de e-mail.
- Troca de foto do perfil.

### Testes

Para este projeto foi realizado testes com jest, para todos os serviços que as rotas consomem no back-end da API.


## :memo: Licença

Esse projeto está sob a licença MIT.

---

Espero que goste 💜 by Taborda :wave: duvidas entrar em contato por [e-mail](marcos.tabordamail@gmail.com).

Desenvolvido por Marcos Taborda
