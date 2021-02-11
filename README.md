# auth-access-services

![docker-compose](https://github.com/mauriciocordeiro/auth-access-services/workflows/docker-compose/badge.svg)
 
Sistema de autorização baseado em microsserviços. Deve automatizar as seguintes funcionalidades: 

* (1) [gerenciamento de contas de acesso](service-crud/), 

* (2) [controle de entrada e saída](service-auth/) e 

* (3) [consulta a log de acessos](service-log/)

* (+) [_frontend_](service-front/)


## Arquitetura

![](docs/diagram.png)


## Execução

Para executar, é necessário ter o `docker` e o `docker-compose` instalados.

Execute:

```
docker-compose up -d --build
```

## Acesso

### _Frontend_

[localhost:3000](http://localhost:3000)


### _CRUD_

[localhost:5001](http://localhost:5001)


### _Auth_

[localhost:5002](http://localhost:5002)


### _Log_

[localhost:5003](http://localhost:5003)
