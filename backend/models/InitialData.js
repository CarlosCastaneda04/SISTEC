const db = require("../models"); // Importamos todos los modelos desde index.js

const insertarDatosIniciales = async () => {
  try {
    // 1. Insertar áreas
    const area1 = await db.Area.create({ nombre: 'Área de Mantenimiento' });
    const area2 = await db.Area.create({ nombre: 'Área de Atención al Cliente' });
    const area3 = await db.Area.create({ nombre: 'Área Técnica' });

    console.log("Áreas insertadas.");

    // 2. Insertar proveedores con más detalles realistas
    const proveedores = [
      { nombre: 'Proveedor A', direccion: 'Calle Falsa 123, San Salvador', telefono: '123456789', responsable: 'Carlos Gómez' },
      { nombre: 'Proveedor B', direccion: 'Calle Real 456, Santa Tecla', telefono: '987654321', responsable: 'Marta Hernández' },
      { nombre: 'Proveedor C', direccion: 'Avenida Central 789, Soyapango', telefono: '112233445', responsable: 'Ricardo Soto' },
      { nombre: 'Proveedor D', direccion: 'Calle 5, La Libertad', telefono: '223344556', responsable: 'Ana Rodríguez' },
      { nombre: 'Proveedor E', direccion: 'Calle Nueva 123, Antiguo Cuscatlán', telefono: '334455667', responsable: 'Luis Fernández' }
    ];

    // Crear proveedores
    const proveedoresInsertados = [];
    for (let i = 0; i < proveedores.length; i++) {
      const proveedor = await db.Proveedor.create({
        nombre: proveedores[i].nombre,
        direccion: proveedores[i].direccion,
        id_tributario: `RTN${Math.floor(Math.random() * 1000000)}`,
        telefono: proveedores[i].telefono,
        nombre_responsable: proveedores[i].responsable,
      });
      proveedoresInsertados.push(proveedor);
    }

    console.log("Proveedores insertados.");

    // 3. Insertar componentes (7 tipos)
    const componentes = [
      { nombre: 'Procesador', descripcion: 'Procesador Intel i7 de 10ª generación', categoria: 'Componentes', cod_producto_especifico: 1001 },
      { nombre: 'Memoria RAM', descripcion: 'Memoria DDR4 de 16GB para computadoras de oficina', categoria: 'Componentes', cod_producto_especifico: 1002 },
      { nombre: 'Disco Duro', descripcion: 'Disco SSD de 1TB de alta velocidad', categoria: 'Componentes', cod_producto_especifico: 1003 },
      { nombre: 'Tarjeta Gráfica', descripcion: 'RTX 3060, ideal para gamers y diseñadores gráficos', categoria: 'Componentes', cod_producto_especifico: 1004 },
      { nombre: 'Placa Madre', descripcion: 'Placa madre ATX compatible con procesadores AMD', categoria: 'Componentes', cod_producto_especifico: 1005 },
      { nombre: 'Fuente de Poder', descripcion: 'Fuente de poder 750W para sistemas de alto rendimiento', categoria: 'Componentes', cod_producto_especifico: 1006 },
      { nombre: 'Refrigeración', descripcion: 'Sistema de refrigeración líquida para mantener la CPU fría', categoria: 'Componentes', cod_producto_especifico: 1007 }
    ];

    // Crear componentes
    for (let componente of componentes) {
      await db.Componente.create({
        nombre: componente.nombre,
        descripcion: componente.descripcion,
        existencias: 150,
        cod_producto_especifico: componente.cod_producto_especifico,
        estado: 'activo',
        categoria: componente.categoria
      });
    }

    console.log("Componentes insertados.");

    // 4. Insertar compras y lotes para cada mes (enero a abril)
    const meses = ['enero', 'febrero', 'marzo', 'abril'];
    for (let i = 0; i < meses.length; i++) {
      for (let j = 0; j < 2; j++) { // Dos compras por mes
        const loteProveedor = await db.LoteProveedor.create({
          id_proveedor: proveedoresInsertados[j % proveedoresInsertados.length].id, // Alternando proveedores
          precio_lote: Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500, // Precio entre 1500 y 2000
          fecha: new Date(`2025-${i + 1}-01`), // Fecha de compra al inicio del mes
        });

        // Crear lotes para cada componente
        for (let k = 0; k < componentes.length; k++) {
          await db.Lote.create({
            id_componente: k + 1, // Usar los IDs de los componentes insertados
            id_compra: loteProveedor.id,
            precio_unitario: Math.floor(Math.random() * (100 - 70 + 1)) + 70, // Precio unitario entre 70 y 100
            cantidad: 150, // Cada compra tiene 150 unidades de cada componente
          });
        }
      }
    }

    console.log("Lotes y compras insertados.");

    // 5. Insertar usuarios (20 usuarios con nombres más realistas)
    const usuarios = [
      { nombre: 'Juan', apellido: 'Pérez', correo: 'juan.perez@example.com', telefono: '123456789' },
      { nombre: 'Maria', apellido: 'Lopez', correo: 'maria.lopez@example.com', telefono: '987654321' },
      { nombre: 'Pedro', apellido: 'Sánchez', correo: 'pedro.sanchez@example.com', telefono: '112233445' },
      { nombre: 'Ana', apellido: 'Rodríguez', correo: 'ana.rodriguez@example.com', telefono: '223344556' },
      { nombre: 'Carlos', apellido: 'Gómez', correo: 'carlos.gomez@example.com', telefono: '334455667' },
      { nombre: 'Laura', apellido: 'Martínez', correo: 'laura.martinez@example.com', telefono: '445566778' },
      { nombre: 'Miguel', apellido: 'Hernández', correo: 'miguel.hernandez@example.com', telefono: '556677889' },
      { nombre: 'Roberto', apellido: 'Díaz', correo: 'roberto.diaz@example.com', telefono: '667788990' },
      { nombre: 'Clara', apellido: 'Gutiérrez', correo: 'clara.gutierrez@example.com', telefono: '778899001' },
      { nombre: 'Gabriel', apellido: 'Ramírez', correo: 'gabriel.ramirez@example.com', telefono: '889900112' },
      { nombre: 'Isabel', apellido: 'Fernández', correo: 'isabel.fernandez@example.com', telefono: '990011223' },
      { nombre: 'José', apellido: 'García', correo: 'jose.garcia@example.com', telefono: '101122334' },
      { nombre: 'Elena', apellido: 'Lozano', correo: 'elena.lozano@example.com', telefono: '112233445' },
      { nombre: 'José Luis', apellido: 'Martínez', correo: 'jose.luis.martinez@example.com', telefono: '123445566' },
      { nombre: 'Sofía', apellido: 'Vargas', correo: 'sofia.vargas@example.com', telefono: '234556677' },
      { nombre: 'Lucía', apellido: 'Paredes', correo: 'lucia.paredes@example.com', telefono: '345667788' },
      { nombre: 'Fernando', apellido: 'Jiménez', correo: 'fernando.jimenez@example.com', telefono: '456778899' },
      { nombre: 'Raquel', apellido: 'Castro', correo: 'raquel.castro@example.com', telefono: '567889900' },
      { nombre: 'Manuel', apellido: 'Ruiz', correo: 'manuel.ruiz@example.com', telefono: '678990011' }
    ];

    const usuariosInsertados = [];
    for (let usuario of usuarios) {
      const usuarioInsertado = await db.Usuario.create({
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        telefono: usuario.telefono,
        correo: usuario.correo,
        password: 'password123',
        id_area: area1.id,
        rol_id: 1, // Asignar un rol por defecto (ajustar si es necesario)
      });
      usuariosInsertados.push(usuarioInsertado);
    }

    console.log("Usuarios insertados.");

    // 6. Insertar solicitudes más variadas y realistas (relacionadas con los componentes)
    const startDate = new Date('2025-01-01');
    const endDate = new Date('2025-04-12');
    const problemas = {
      'Procesador': ['Problema con el procesador, requiere actualización de drivers', 'Procesador no responde al encender el PC'],
      'Memoria RAM': ['Falta de memoria RAM, el sistema se congela constantemente', 'La memoria RAM está dañada, se necesita reemplazo'],
      'Disco Duro': ['El disco duro hace ruidos extraños, se requiere análisis', 'El disco duro está fallando y necesita reemplazo'],
      'Tarjeta Gráfica': ['Problema con la tarjeta gráfica, no muestra imagen', 'La tarjeta gráfica se sobrecalienta, necesita revisión'],
      'Placa Madre': ['La placa madre está fallando, el PC no enciende', 'Problema con la placa madre, se requieren nuevos componentes'],
      'Fuente de Poder': ['La fuente de poder no proporciona suficiente energía', 'La fuente de poder está defectuosa, requiere reemplazo'],
      'Refrigeración': ['El sistema de refrigeración no está funcionando correctamente', 'El sistema de refrigeración se bloqueó, necesita limpieza y reparación']
    };

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      for (let j = 0; j < 5; j++) {
        const usuario = usuariosInsertados[Math.floor(Math.random() * usuariosInsertados.length)]; // Selección aleatoria de usuario
        const componente = componentes[Math.floor(Math.random() * componentes.length)];
        const descripcion = problemas[componente.nombre][Math.floor(Math.random() * 2)];

        await db.Solicitud.create({
          id_usuario: usuario.id,  // Usando un usuario aleatorio
          fecha_creacion: new Date(date),
          estado: 'pendiente',
          descripcion: descripcion,
          id_area: area1.id,  // Usando el área de mantenimiento
        });
      }
    }

    console.log("Solicitudes insertadas.");

  } catch (error) {
    console.error("Error al insertar los datos iniciales:", error);
  }
};

module.exports = insertarDatosIniciales;
