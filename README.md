## Projet-Groupomania

Application web - Réseau social d'entreprise

### Objectif:

Créer un compte utilisateur  
Permettre la publication de messages gifs et de les commenter  
Compte Admin pour la modération des messages et des commentaires

#### Logiciels utilisés :
Node.js, Express.js, Mysql, Sequelize, Vue.js…

Vérifier dans les fichiers package.json que vous avez les logiciels requis installés sur votre ordinateur.

### Instructions pour créer la base de donnée de Groupomania :

Suivre les étapes dans cet ordre :

#### Dans Vscode :

- Installer node_modules dans le terminal de chaque dossier Backend et frontend2 :
npm install

- Dans le fichier .env :
Ajouter le nom (NAME_DB) et le mot de pass (PASS_DB) de votre base de donnée puis les autres paramètres ci-dessous, et créer un numéro token (SECRET_TOKEN) :

NAME_DB = ""  
PASS_DB = ""  
USERNAME_DB = "root"  
DIALECT_DB = "mysql"  
HOST_DB = "localhost"  
SECRET_TOKEN = ""

- Dans le dossier config puis fichier config.json :
Ajouter le nom et le mot de passe de votre base de donnée dans la partie development database et password.

- Créer un dossier images dans le dossier Backend

#### Dans un terminal mysql :

Connecter-vous à Mysql , créer le nom de votre base de donnée.

CREATE DATABASE database_name;  
USE database_name;

#### Dans Vscode :

Dans les trois fichiers migrations :

Mettre en commentaires toutes les références 
( car les références bloquent la migration des fichiers vers mysql) .

- Ouvrir un terminal dans le dossier Backend et appliquer la ligne de commande  : 
sequelize db:migrate
  
(=> les trois tables, Users, Gifs, Comments, vont être enregistrées dans votre base de donnée dans Mysql)

- Puis dé-commenter les références des fichiers migrations que vous avez modifier au début.

#### Dans le terminal Mysql :

Vérifier si les trois tables ont bien été enregistrées avec les commandes:

DESCRIBE Users;  
DESCRIBE Gifs;  
DESCRIBE Comments;  

Créer les références dans Mysql :

-  Ajouter une key à la table Users pour la colonne gifId: 

ALTER TABLE Users MODIFY COLUMN gifId int, ADD key(gifId);  

Ajouter des key aux tables Gifs et Comments :

Vérifier d’abord s’il y a des constraints dans les tables avec la requête suivante en 
remplaçant le database_name par le nom de votre base de donnée :   

SELECT * FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS WHERE `table_schema` LIKE 'database_name' AND `constraint_type` = 'FOREIGN KEY';

Table Gifs, colonne userId:

Si une key pour gifs existe déjà, faire les requêtes suivantes :

ALTER TABLE Gifs DROP FOREIGN KEY `foreignkey_name`;   

ALTER TABLE Gifs ADD CONSTRAINT `fk_gifs` FOREIGN KEY Users (id) ON DELETE cascade;

Si aucune key :

ALTER TABLE Gifs ADD CONSTRAINT `fk_gifs` FOREIGN KEY(userId) REFERENCES Users (id) ON DELETE cascade;

Table Comments, colonnes userId et gifId :

Ajouter les deux key suivantes :

ALTER TABLE Comments ADD CONSTRAINT `fk_comments1` FOREIGN KEY(userId) REFERENCES Users (id) ON DELETE cascade;

ALTER TABLE Comments ADD CONSTRAINT `fk_comments2` FOREIGN KEY(gifId) REFERENCES Gifs(id) ON DELETE cascade;

#### Dans Vscode :

Dans le terminal Backend, appliquer la commande suivante :

nodemon server

Dans le terminal frontend2, appliquer la commande suivante:  

npm run serve

ouvrir le lien http://localhost:8080/ dans votre navigateur


#### Dans l’appli : 

S’inscrire en tant qu’admin.

#### Dans le terminal mysql :

Ajouter un admin :

UPDATE Users SET isAdmin=1 WHERE id=1;

Vérifier avec :  

SELECT username, email, isAdmin FROM Users;


Votre appli web est prête !
