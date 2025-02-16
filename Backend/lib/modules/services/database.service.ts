import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";


class DatabaseService {
    private db: Database | null = null;

    constructor() {}

    async connect(){
        try{
            this.db = await open({
                filename: './test-database.db',
                driver: sqlite3.Database
            });

            await this.db.exec(`
                CREATE TABLE IF NOT EXISTS users (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  login TEXT NOT NULL,
                  password TEXT NOT NULL,
                  isAdmin INTEGER DEFAULT 0
                );
            `);
        } catch (error){
            console.error("Error connecting to the database:", error);
        }
    }




    async addUser(){

    }

    async getUserByLogin(login: string){

    }

    async deleteUser(login: string){

    }

    async changePassword(login: string){

    }

}

export default DatabaseService;