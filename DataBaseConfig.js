import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createDatabase() {
    try {
        // Connexion sans spécifier de base de données
        const connexion = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        // Nom de la base de données
        const databaseName = process.env.DB_NAME;

        // Création de la base de données
        await connexion.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);

        await connexion.query(`Use ${databaseName};`);

        // Création des tables
        await connexion.query(`CREATE TABLE IF NOT EXISTS Location (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cityName VARCHAR(255) NOT NULL,
    latitude VARCHAR(50) NOT NULL,
    longitude VARCHAR(50) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`
    )
        await connexion.query(`CREATE TABLE IF NOT EXISTS User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(50) NOT NULL,
    currentLocationId INT NOT NULL,
    subscribedToMail BOOLEAN DEFAULT false,
    subscribedToPhone BOOLEAN DEFAULT false,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (currentLocationId) REFERENCES Location(id)
    );`
    )
        await connexion.query(`CREATE TABLE IF NOT EXISTS Alert (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    intensity ENUM('low', 'medium', 'high') NOT NULL,
    locationId INT NOT NULL,
    alertedUsers INT DEFAULT 0,
    alertDone BOOLEAN DEFAULT FALSE,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (locationId) REFERENCES Location(id)
    );`
    )
        await connexion.query(`CREATE TABLE IF NOT EXISTS User_Alert (
    id INT AUTO_INCREMENT PRIMARY KEY,
    UserId INT NOT NULL,
    AlertId INT NOT NULL,
    NotidiedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (UserId) REFERENCES User(id),
    FOREIGN KEY (AlertId) REFERENCES Alert(id)
    );`
    )
        console.log(`Base de données '${databaseName}' créée avec succès !`);

    } catch (error) {
        console.error('Erreur lors de la création de la base de données :', error);
    }
}

createDatabase();
