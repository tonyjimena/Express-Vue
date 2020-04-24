import express from 'express'
import config from './config'
import router from './router'
import db from './database'

let _server

const server = {
  start() {
    const app = express()

    return db.connect()
      .then(() => {
        
        config(app)
        router(app)

        const port = app.locals.config.PORT
        const host = app.locals.config.HOST
        _server = app.listen(port, () => {

          console.log(`Server opened listen on http://${host}:${port}`)
        })
        return _server
      })
  },
  close() {
    _server.close()
  }
}

export default server

if (!module.parent) {
  server.start()
}

process.on('unhandledRejection', (err, p) => {
  console.log('Custom Error: An unhandledRejection occurred')
  console.log(`Custom Error: Rejection: ${err}`)
})
