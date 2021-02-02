import 'dotenv/config';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const jwtLifetime = process.env.JWT_LIFETIME;
const jwtAlgorithm = process.env.JWT_ALGORITHM

export const JwtService = {
    /**
     * Método que recibe el payload y el secreto,
     * y nos devuelve el token
     */
    sign: (user) => jwt.sign({sub: user.id}, secret, {
                        algorithm: jwtAlgorithm,
                        expiresIn: jwtLifetime
                    })
    
    ,
    /**
     * Método que recibe el token y verifica si es válido
     * o no
     */
    verify: (token) => jwt.verify(token, secret)
    
}
