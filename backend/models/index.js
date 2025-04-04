const Sequelize = require("sequelize");
const sequelize = require("../config/database");

// Objeto contenedor
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importar todos los modelos
db.Usuario = require("./usuario")(sequelize, Sequelize);
db.Area = require("./area")(sequelize, Sequelize);
db.Solicitud = require("./solicitud")(sequelize, Sequelize);
db.Asignacion = require("./asignaciones")(sequelize, Sequelize);
db.Diagnostico = require("./diagnostico")(sequelize, Sequelize);
db.Componente = require("./componentes")(sequelize, Sequelize);
db.UsoComponentes = require("./uso_componentes")(sequelize, Sequelize);
db.MovimientoInventario = require("./movimientos_inventario")(
  sequelize,
  Sequelize
);
db.Lote = require("./lote")(sequelize, Sequelize);
db.LoteProveedor = require("./lote_proveedor")(sequelize, Sequelize);
db.Proveedor = require("./proveedor")(sequelize, Sequelize);

// Exportar todo
module.exports = db;
