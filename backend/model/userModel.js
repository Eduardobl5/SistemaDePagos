import { DataTypes } from "sequelize";
import db from "../database/db.js";


const userModel = db.define('usuarios', {
    nombre: {type: DataTypes.STRING, allowNull: false},
    usuario: {type: DataTypes.STRING, allowNull: false, unique: true},
    pass: {type: DataTypes.STRING, allowNull:false}
},{
    timestamps: false
})

export default userModel;