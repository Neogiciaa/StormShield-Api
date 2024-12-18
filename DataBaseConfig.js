import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createDatabase() {
    let connexion;
    try {
        // Connexion sans spécifier de base de données
        connexion = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            port: process.env.DB_PORT,
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
                intensity VARCHAR(255) NOT NULL,
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
                vote INT NOT NULL DEFAULT 0,
                locationId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deletedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (locationId) REFERENCES Location(id)
            );
        `);

        console.log(`Base de données '${databaseName}' créée avec succès !`);
        return connexion;

    } catch (error) {
        console.error('Erreur lors de la création de la base de données :', error);
    }
}

const connexion = await createDatabase();

export default connexion;
