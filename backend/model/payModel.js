import { DataTypes } from "sequelize";
import db from "../database/db.js";

const payModel = db.define("pagos", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre: {type: DataTypes.STRING, allowNull: false},
    descripcion: {type: DataTypes.STRING}, 
    monto: {type: DataTypes.FLOAT},
    userId: {type: DataTypes.INTEGER, allowNull: false}
})

export default payModel;