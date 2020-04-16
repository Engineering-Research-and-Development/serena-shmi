
## How to run SHMI locally

#### Prerequisites

- nodeJS 10+
- npm 6+

#### Steps
1. Customize development configuration of shmi microservices under

```/shmi-xxx/config/index.js```

2. Install serena-shmi modules

```sh
  $ npm install
```

3. Install modules of shmi-mdinterface, shmi-webserver and shmi-dashboard

```sh
  $ npm run install
```

4. Run all services

```sh
  $ npm run start
```

## How to run SHMI on docker

#### Prerequisites

- docker
- docker-compose
- *nodeJS 10+
- *npm 6+

\* only required to build shmi-dashboard on your host machine

#### Steps

1. Customize configuration in docker-compose.yml

2. Customize shmi-dashboard environment by editing ".env" file inside shmi-dashboard folder. More precisely in .env file:

```
VUE_APP_WEB_SERVER_HOST=PLACEHOLDER_IP_ADDRESS_SHMI_WEBSERVER_PLACEHOLDER
VUE_APP_WEB_SERVER_PORT=PLACEHOLDER_PORT_SHMI_WEBSERVER_PLACEHOLDER
```
- _{PLACEHOLDER_IP_ADDRESS_SHMI_WEBSERVER_PLACEHOLDER} must be replaced with ip address of the server hosting shmi_webserver_
- _{PLACEHOLDER_PORT_SHMI_WEBSERVER_PLACEHOLDER} must be replaced with port of the server hosting shmi_webserver_


N.B You can also replace both the placeholder at runtime if you need to.

2. Build your shmi-dashboard in production mode by moving inside ```/shmi-dashboard``` and running

```sh
  $ npm run build
```
3. Copy content of ```dist``` folder, created after build, to upper level folder ```shmi-dashboard-dist```

3. Clear previous installations by running:

```sh
$ clearEnv.sh
```

4. Finally run docker-compose

```sh
\# docker-compose up
```

## Authors
* Salvatore Andolina (SynArea Consultants s.r.l)
* Manfredi Pistone (ENGINEERING - ingegneria informatica s.p.a)
