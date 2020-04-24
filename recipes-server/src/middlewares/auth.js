import jwt from 'jwt-simple'

export default (req, res, next) => {

    if (!req.headers.authorization) {
        return res
            .status(403)
            .send( { message: 'No autenticado' })
    }

    const token = req.headers.authorization.split(' ')[1]
    const payload = jwt.decode(token, req.app.locals.config.TOKEN)

    req.user = payload.email

    next()

}