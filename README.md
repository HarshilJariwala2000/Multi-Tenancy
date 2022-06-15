<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Technical Structure
Following is in detail structure of our application to achieve multi-Tenancy in our application
![image](https://user-images.githubusercontent.com/101394330/173832127-17fb4084-cd5f-4929-8ca2-20a5b8d43c25.png)

Here we add Tenant-ID in Request headers to identify which Database is to be connected. It then searches this Tenant-ID into Master Database. When it is found, our application fetches all of connection data related to database and dynamically connects to that particular Database in runtime and displays the information in Response.

## Working
Our application is always connected to Master Database. The schema of our Master Database is shown here, along with some example data. The "databasename" parameter will be used to specify the client database to connect to.
![image](https://user-images.githubusercontent.com/101394330/173833303-47729286-8871-4d40-a39d-9eb894270ee3.png)

The data from the Client Database is retrieved using a Backend API. In this API we pass the “databasename” as the “Tenant-ID” in the Header of the Request. Let's say we wish to get into Client1's database. As demonstrated below, we'll pass "tenantid:client1" in the request's header.
Our application will find, which document have “databasename” value equal to “client1”, and connect to Client1's database. The Client1 database will have several collections. We will also have to send “collectionName” in the Request to perform operations on that particular collection.

## API's
GET/findAll API, we will send TenantId in Headers and collectionName in params
![image](https://user-images.githubusercontent.com/101394330/173833482-d0d0cf8d-69a0-476b-88a1-2d23dbcb7f12.png)

POST/insertMany API, we will sendTenantId in Headers collectionName & data to be inserted in Body
![image](https://user-images.githubusercontent.com/101394330/173833544-074677ee-25ff-4b63-a711-1c59237bc1ac.png)
![image](https://user-images.githubusercontent.com/101394330/173833568-261fa667-5987-44ce-815c-2d728b4b6ef4.png)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).