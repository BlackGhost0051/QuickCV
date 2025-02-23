import fs from "fs";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";
import PasswordService from "./password.service";


class DatabaseService {
    private db: Database | null = null;
    private databasePath: string = "./lib/database";
    private passwordService: PasswordService;

    constructor() {
        this.passwordService = new PasswordService();
    }

    async connect(){
        try{
            if(!fs.existsSync(this.databasePath)){
                fs.mkdirSync(this.databasePath, { recursive: true});
            }

            this.db = await open({
                filename: `${this.databasePath}/database.db`,
                driver: sqlite3.Database
            });

            await this.db.exec(`
                CREATE TABLE IF NOT EXISTS users (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  login TEXT NOT NULL,
                  password TEXT NOT NULL,
                  isAdmin INTEGER DEFAULT 0
                );
            `); // email | profile info
        } catch (error){
            console.error("Error connecting to the database:", error);
        }
    }




    async addUser(login: string, password: string){
        try{
            const hashedPassword = await this.passwordService.hashPassword(password);

            const result = await this.db?.run(
                `INSERT INTO users (login, password) VALUES (?, ?)`, [login, hashedPassword]
            );

            console.log('User added:', result);
        } catch (error){
            console.error("Error adding user:", error);
        }
    }

    async getUserByLogin(login: string){
        try{
            const user = await this.db?.get(
                `SELECT * FROM users WHERE login = ?`, [login]
            );

            return user || null;
        } catch (error){
            console.error("Error fetching user by login:", error);
            throw error;
        }
    }

    async updateUser(login: string, password: string){
        try {
            const hashedPassword = await this.passwordService.hashPassword(password);

            const result = await this.db?.run(
                `UPDATE users SET password = ? WHERE login = ?`, [hashedPassword, login]
            );

            console.log('User updated:', result);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    }

    async deleteUser(login: string){
        try{
            const result = await this.db?.run(
                `DELETE FROM users WHERE login = ?`, [login]
            );

            console.log('User deleted:', result);
        } catch (error){
            console.error("Error deleting user:", error);
        }
    }

    async isAdmin(login: string): Promise<boolean>{
        try{
            const result = await this.db?.get(
                `SELECT * FROM users WHERE login = ? AND isAdmin = 1`, [login]
            );

            return !!result;
        } catch (error) {
            console.error("Error checking admin status:", error);
            return false;
        }
    }
}

export default DatabaseService;