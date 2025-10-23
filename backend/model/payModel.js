import { DataTypes } from "sequelize";
import db from "../database/db";


const payModel = db.define("pagos", {
    nombre: {type: DataTypes.STRING, allowNull: false},
    descripcion: {type: DataTypes.STRING}, 
    monto: {type: DataTypes.FLOAT},
    userId: {type: DataTypes.INTEGER, allowNull: false}
})

export default payModel;