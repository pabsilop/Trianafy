import 'dotenv/config';
import{User, userRepository} from '../models/users';
import bcrypt from 'bcryptjs';
import {JwtService } from '../services/jwt';
const AuthController = {
 
    register: async(req, res, next) =>{
        let usuarioNuevo = await userRepository.create(new User({
            username:req.body.username, 
            email: req.body.email,
            fullname: req.body.fullname,
            password: bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS))}));

        res.status(201).json({
            id: usuarioNuevo.id,
            username: usuarioNuevo.username,
            email: usuarioNuevo.email
        });
        
    },
        login: async (req,res, next) =>{
            const token = await JwtService.sing(req.user);
            res.status(201).json({
                user: req.user,
                token: toke
            });
        }
    }
    export{
        AuthController
    }
