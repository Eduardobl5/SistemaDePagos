import payModel from "../model/payModel.js";

export const createPay = async (req, res) => {
    const {nombre, descripcion, monto, userId} = req.body
    try {
        const pay = await payModel.create({nombre, descripcion, monto, userId})
        res.status(200).json({message: "Pago creado correctamente", pay})
    } catch (error) {
        res.status(500).json({message: "Error al crear el pago", error})
    }
}

export const getPays = async (req, res) => {
    try {
        const pays = await payModel.findAll()
        if (!pays) {
            res.status(404).json({message: "No se encontraron pagos"})
        }
        res.status(200).json(pays)
    } catch (error) {
        res.status(500).json({message: "Error al traer los pagos"})
    }
}

export const getPayById = async (req, res) => {
    const {id} = req.params
    try {
        const pay = await payModel.findByPk(id)
        if (!pay) {
            res.status(404).json({message: "No se encontró el pago"})
        }
        res.status(200).json(pay)
    } catch (error) {
        res.status(500).json({message: "Error al traer el pago"})
    }
}

export const updatePay = async (req, res) => {
    const {id} = req.params
    const {nombre, descripcion, monto, userId} = req.body
    try {
        const pay = await payModel.findByPk(id)
        if (!pay) {
            res.status(404).json({message: "No se encontró el pago"})
        }
        if(nombre) pay.nombre = nombre;
        if(descripcion) pay.descripcion = descripcion;
        if(monto) pay.monto = monto;
        if(userId) pay.userId = userId; 
        await pay.save();
        res.status(201).json({message: "Pago actualizado correctamente", pay})
    } catch (error) {
        res.status(500).json({message: "Error al actualizar usuario"})
    }
}

export const deletePay = async (req, res) => {
    const {id} = req.params
    try {
        const pay = payModel.findByPk(id)
        if (!pay) {
            res.status(404).json({message: "No se encontro el pago"})
        }
        await pay.destroy()
        res.status(200).json({message: "El pago se eliminó con exito"})
    } catch (error) {
        res.status(500).json({message: "Error al eliminar el pago"})
    }
}

export const getPaysByUser = async (req, res) => {
    try {
        console.log("Token autorizado", req.user);
        const pays = await payModel.findAll({
            where: {userId: req.user.id}
        })
        res.status(200).json(pays)
    } catch (error) {
        res.status(500).json({message: "Error al traer los pagos del usuario"})
    }
}