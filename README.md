# Text Analyzer Tool
A Text Analyzer Tool application

## Tech Stack
- Nestjs
- EJS
- Bootstrap
- Keycloak
- Mysql
- Docker
- Typescript

## Todo
- [x] Setup configuration service
- [x] Setup Logging service
- [x] Setup Global Exception Filter
- [x] Setup class validator
- [x] Setup swagger docs
- [x] Setup ORM and DB connection
- [ ] Setup db seeding
- [ ] Setup Temporary Basic SPA using Nestjs and ejs
- [ ] Setup Separate Frontend
- [x] Unit Test for controller and services

## Project setup

```bash
$ yarn install
```

### change .env values as needed
```bash
cp .env-example .env
```

### Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

### Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Run using docker
```bash
docker compose up
```
Goto `http:localhost:5000/frontend` and you will be redirected to keycloak login page.

### Create login users
- create a user in keycloak wsd realm and set password
- copy sub id from keycloak user
- create a user in mysql users table and add sub to sso_id column for reference

### OPENAPI docs
to use api you can visit swagger docs from here `http:localhost:5000/openapi`
