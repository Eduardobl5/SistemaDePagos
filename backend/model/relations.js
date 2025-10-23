import userModel from "./userModel.js";
import payModel from "./payModel.js";

// Un usuario puede tener muchos pagos
userModel.hasMany(payModel, {
  foreignKey: "userId",
  sourceKey: "id"
});

// Un pago pertenece a un usuario
payModel.belongsTo(userModel, {
  foreignKey: "userId",
  targetKey: "id"
});

