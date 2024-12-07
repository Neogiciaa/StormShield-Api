### **StormShield - Orange Hackaton**

## Description
StormShield is a web application made to display weather datas and detect eventually alerts to prevent and avoid them.
Saving lives is our objective, that's why we focused on analysing weather datas to be prepared for the worse !

## Installation
First step will be to install project dependencies with:

```bash
npm install
```

After this, you will need to start a MariaDB or Mysql environment in local(you can use Docker to externalize it if wanted) first.
After this, you will need to use following command to create required database :

```bash
node DatabadeConfig.js
```

We recommend you to use a database manager like Datagrip from Jetbrain's suit for an easier configuration !
Once your database and user ready to use, clone this project and go ahead in .env.example file.
Rename this file to .env and put your credentials in it to be able to use StormShield.

## Start project
To start the backend project, run:

```bash
node index.js
```
After this, everything will be good, and you can now follow frontend readme to be able to use your application.

## Features
In StormShield, you will be able to:
- See weather datas for current day next four ones
- See if we detected some alerts (wind, rain, heat...)
- Report an incident (blocked road...)
- See if you ran in/out a danger zone

## Authors
STAMP team - Passionated Web developers that code with ♥

Stéphen Chevalier - Théo Piron - Antoine Stoykov - Mohamed Berrabah - Pierre Willemart
