import mongoose from 'mongoose'
import { config } from 'dotenv'

const SETTINGS = config()

class Database  {
    constructor() {
        this.conn = false
    }

    connection() {
        return this.conn
    }

    connect() {
        const host = `${SETTINGS.parsed.DB_PROTOCOL}://${SETTINGS.parsed.DB_URL}:${SETTINGS.parsed.DB_PORT}/${SETTINGS.parsed.DB_NAME}`
    
        return new Promise(resolve => {
            mongoose.set('debug', SETTINGS.parsed.DB_DEBUG)
            mongoose.Promise = global.Promise

            this.conn = mongoose.createConnection(
                host,
                { poolSize: SETTINGS.parsed.DB_POOLSIZE }
            )

            this.conn.on('error', err => {
                console.log('mongo error', err)
                return process.exit
            })

            this.conn.on('connected', () => {
                console.log('mongo Conectado')
                resolve()
            })
        })
    }

}

const instance = new Database()

export default instance