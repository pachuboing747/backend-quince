const ManagerFactory = require('../dao/managers/manager.Mongo/factory.manager.js')

const userManager = ManagerFactory.getManagerInstance('users')

const create = async (req, res) => {
  const { body } =  req
  
  const created = await userManager.create(body)
  
  res.send(created)
}

function checkPermissions(req, res, next) {
  const usuarioActual = req.user;
  const productId = req.params.productId;

  if (usuarioActual.role === 'premium' && productId === usuarioActual.email) {
    next(); 
  } else if (usuarioActual.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
  }
}

const changeUserRole = async (req, res) => {
  const userId = req.params.uid; // Obten el ID del usuario a partir de los parámetros de la solicitud
  const newRole = req.body.role;

  if (req.isAuthenticated()) {
    try {
      const userToChange = await userManager.getById(userId);

      if (!userToChange) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }

      if (req.user.role === 'admin') {
        userToChange.role = newRole;

  
        await userToChange.save();

        return res.status(200).json({ message: 'Rol de usuario actualizado con éxito' });
      } else {
        return res.status(403).json({ message: 'No tienes permiso para realizar esta acción.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error al actualizar el rol de usuario' });
    }
  } else {
    return res.status(403).json({ message: 'No estás autenticado.' });
  }
};




module.exports = {
    create,
    checkPermissions,
    changeUserRole
}