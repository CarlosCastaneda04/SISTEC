const db = require("../models"); // Importamos todos los modelos desde index.js

const insertarDatosIniciales = async () => {
  try {
    // 1. Insertar áreas
    const area1 = await db.Area.create({ nombre: 'Área de Mantenimiento' });
    const area2 = await db.Area.create({ nombre: 'Área de Atención al Cliente' });

    // 2. Insertar usuarios
    const usuario1 = await db.Usuario.create({
      nombre: 'Juan',
      apellido: 'Pérez',
      telefono: '123456789',
      correo: 'juan.perez@example.com',
      password: 'password123',
      id_area: area1.id,
      rol_id: 1,  // Aquí puedes ajustar el rol
    });
    const usuario2 = await db.Usuario.create({
      nombre: 'Maria',
      apellido: 'Lopez',
      telefono: '987654321',
      correo: 'maria.lopez@example.com',
      password: 'password456',
      id_area: area2.id,
      rol_id: 2,  // Aquí puedes ajustar el rol
    });

    console.log("Datos de áreas y usuarios insertados.");

    // 3. Insertar solicitudes (5 por cada día desde 1 de enero hasta 12 de abril)
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-04-12');

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      for (let j = 0; j < 5; j++) {
        await db.Solicitud.create({
          id_usuario: usuario1.id,  // Usando el primer usuario
          fecha_creacion: new Date(date),
          estado: 'pendiente',
          descripcion: `Solicitud de mantenimiento para el ${date.toISOString().split('T')[0]}-${j+1}`,
          id_area: area1.id,  // Usando el área de mantenimiento
        });
      }
    }

    console.log("Solicitudes insertadas.");

    // 4. Insertar asignaciones
    const solicitud1 = await db.Solicitud.findOne({ where: { id: 1 } });
    await db.Asignacion.create({
      id_solicitud: solicitud1.id,
      id_tecnico: usuario1.id,  // Usando el primer usuario
      fecha_asignacion: new Date(),
      fecha_fin: new Date(),
      notas: 'Asignación realizada',
    });
    console.log("Asignaciones insertadas.");

    // 5. Insertar componentes
    await db.Componente.create({
      nombre: 'Componente 1',
      descripcion: 'Descripción del componente 1',
      existencias: 100,
      cod_producto_especifico: 1001,
      estado: 'activo',
      categoria: 'Mantenimiento',
    });
    console.log("Componentes insertados.");

    // 6. Insertar lotes y proveedores si es necesario
    const proveedor1 = await db.Proveedor.create({
      nombre: 'Proveedor A',
      direccion: 'Calle Falsa 123',
      id_tributario: 'RTN123456',
      telefono: '123456789',
      nombre_responsable: 'Carlos Gómez',
    });

    const loteProveedor1 = await db.LoteProveedor.create({
      id_proveedor: proveedor1.id,
      precio_lote: 1500,
      fecha: new Date(),
    });

    const lote1 = await db.Lote.create({
      id_componente: 1,
      id_compra: loteProveedor1.id,
      precio_unitario: 100,
      cantidad: 50,
    });

    console.log("Lotes y proveedores insertados.");

  } catch (error) {
    console.error("Error al insertar los datos iniciales:", error);
  }
};

module.exports = insertarDatosIniciales;

