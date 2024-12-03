import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

let connexion;

async function createDatabase() {
    try {
        // Connexion sans spécifier de base de données
        connexion = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        // Nom de la base de données
        const databaseName = process.env.DB_NAME;

        // Création de la base de données
        await connexion.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\`;`);

        // Sélection de la base de données
        await connexion.query(`USE \`${databaseName}\`;`);

        // Création de la table Location
        await connexion.query(`
            CREATE TABLE IF NOT EXISTS Location (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cityName VARCHAR(255) NOT NULL,
                latitude VARCHAR(50) NOT NULL,
                longitude VARCHAR(50) NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `);

        // Création de la table Alert
        await connexion.query(`
            CREATE TABLE IF NOT EXISTS Alert (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                intensity ENUM('low', 'medium', 'high') NOT NULL,
                locationId INT NOT NULL,
                alertedUsers INT DEFAULT 0,
                alertDone BOOLEAN DEFAULT FALSE,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (locationId) REFERENCES Location(id)
            );
        `);
        // Création de la table Warning_Alert qui permettra aux gens de signaler des évenements liés aux intempéries.
        await connexion.query(`
            CREATE TABLE IF NOT EXISTS WarningAlert (
                id INT AUTO_INCREMENT PRIMARY KEY,
                description VARCHAR(255) NOT NULL,
                vote INT NOT NULL,
                locationId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (locationId) REFERENCES Location(id)
            );
        `);

        console.log(`Base de données '${databaseName}' créée avec succès !`);

    } catch (error) {
        console.error('Erreur lors de la création de la base de données :', error);
    }
}

createDatabase();

export default connexion;
