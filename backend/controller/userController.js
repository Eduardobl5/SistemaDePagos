import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const registerUSer = async (req, res) => {
    const {nombre, usuario, pass} = req.body
    try {
        const passHash = await bcrypt.hash(pass, 10)
        const user = await userModel.findOne({where: {usuario}})
        if (user) {
            res.status(400).json({message: "El usuario ya está en uso"})
        }
        await userModel.create({
            nombre,
            usuario,
            pass: passHash
        })
        res.status(201).json({message: "Usuario creado correctamente"})
    } catch (error) {
        console.error("Error al registrar usuario:", error);       
    }
}

export const login = async (req, res) => {
    const {usuario, pass} = req.body
    try {
        const user = await userModel.findOne({where: {usuario}})
        if(!user){
            res.status(404).json({message: "Usuario no encontrado"})
        }
        const isMatch = await bcrypt.compare(pass, user.pass)
        if (!isMatch) {
            res.status(400).json({message: "Contraseña incorrecta"})
        }
        const token = jwt.sign({id: user.id, usurio: user.usuario}, process.env.JWT_SECRET, {expiresIn: '1H'})
        res.status(200).json({message: "Login exitoso: ", token})
    } catch (error) {
        res.status(500).json({message: "Error al iniciar sesion"})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.findAll({
            attributes: {exclude: ['pass']}
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: "Error al traer usuarios"})
    }
}

export const getUserById = async (req, res) => {
    const {id} = req.params
    try {
        const user = await userModel.findByPk(id, {
            attributes: {exclude: ['pass']}
        })
        if (!user) {
            res.status(404).json({message: "Usuario no encontrado"})
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: "Error al buscar el usuario"})
    }
}


export const updateUser = async (req, res) => {
    const {id} = req.params
    const {nombre, usuario, pass} = req.body
    try {
        const user = await userModel.findByPk(id)
        if (!user) {
            res.status(404).json({message: "Usuario no encontrado"})
        }
        if(nombre) user.nombre = nombre;
        if(usuario) user.usuario = usuario;
        if (pass) {
            const passHash = await bcrypt.hash(pass, 10)
            user.pass = passHash
        }
        await user.save();
        res.status(201).json({message: "Usuario actualizado"})
    } catch (error) {
        res.status(500).json({message: "Error al actualizar el usurio"})
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        const user = await userModel.findByPk(id)
        if (!user) {
            res.status(404).json({message: "El usuario no existe"})
        }
        await user.destroy()
        res.status(200).json({message: "Usuario eliminado con exito"});
    } catch (error) {
        res.status(500).json({message: "Error al eliminar usuario"});
    }
}