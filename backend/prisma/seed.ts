/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes
  await prisma.transaccion.deleteMany();
  await prisma.inversion.deleteMany();
  await prisma.activo.deleteMany();
  await prisma.hitoProyecto.deleteMany();
  await prisma.postulacion.deleteMany();
  await prisma.proyectoHabilidad.deleteMany();
  await prisma.usuarioHabilidad.deleteMany();
  await prisma.proyecto.deleteMany();
  await prisma.habilidad.deleteMany();
  await prisma.usuario.deleteMany();

  console.log('✨ Datos anteriores eliminados');

  // Crear usuarios de ejemplo
  const claveHasheada = await argon2.hash('Cumbre2024!', {
    type: argon2.argon2id,
    memoryCost: 65536,
    timeCost: 3,
    parallelism: 4,
  });

  const administrador = await prisma.usuario.create({
    data: {
      nombre: 'Admin',
      apellido: 'CUMBRE',
      correo: 'admin@cumbre.mendoza.gob.ar',
      clave: claveHasheada,
      tipoUsuario: 'ADMINISTRADOR',
      reputacion: 100,
    },
  });

  const estudiante = await prisma.usuario.create({
    data: {
      nombre: 'Juan',
      apellido: 'Pérez',
      correo: 'juan.perez@utn.edu.ar',
      clave: claveHasheada,
      legajoUtn: '45678',
      tipoUsuario: 'ESTUDIANTE',
      reputacion: 85,
    },
  });

  const empresa = await prisma.usuario.create({
    data: {
      nombre: 'María',
      apellido: 'González',
      correo: 'maria@empresa.com',
      clave: claveHasheada,
      tipoUsuario: 'EMPRESA',
      reputacion: 90,
    },
  });

  const inversor = await prisma.usuario.create({
    data: {
      nombre: 'Carlos',
      apellido: 'Martínez',
      correo: 'carlos@inversiones.com',
      clave: claveHasheada,
      tipoUsuario: 'INVERSOR',
      reputacion: 95,
    },
  });

  console.log('👥 Usuarios creados');

  // Crear habilidades
  const habilidades = await Promise.all([
    prisma.habilidad.create({
      data: {
        nombre: 'JavaScript',
        categoria: 'Programación',
        descripcion: 'Lenguaje de programación web',
      },
    }),
    prisma.habilidad.create({
      data: {
        nombre: 'TypeScript',
        categoria: 'Programación',
        descripcion: 'Superset tipado de JavaScript',
      },
    }),
    prisma.habilidad.create({
      data: {
        nombre: 'React',
        categoria: 'Frontend',
        descripcion: 'Librería de UI',
      },
    }),
    prisma.habilidad.create({
      data: {
        nombre: 'Node.js',
        categoria: 'Backend',
        descripcion: 'Runtime de JavaScript',
      },
    }),
    prisma.habilidad.create({
      data: {
        nombre: 'PostgreSQL',
        categoria: 'Base de Datos',
        descripcion: 'Sistema de base de datos relacional',
      },
    }),
  ]);

  console.log('🔧 Habilidades creadas');

  // Asignar habilidades al estudiante
  await Promise.all([
    prisma.usuarioHabilidad.create({
      data: {
        usuario_id: estudiante.id,
        habilidad_id: habilidades[0].id,
        nivel: 'AVANZADO',
        años_experiencia: 3,
      },
    }),
    prisma.usuarioHabilidad.create({
      data: {
        usuario_id: estudiante.id,
        habilidad_id: habilidades[1].id,
        nivel: 'INTERMEDIO',
        años_experiencia: 2,
      },
    }),
  ]);

  console.log('🎯 Habilidades asignadas');

  // Crear proyectos
  const proyecto1 = await prisma.proyecto.create({
    data: {
      titulo: 'Desarrollo de App de Turismo Mendoza',
      descripcion:
        'Necesitamos desarrollar una aplicación móvil para promover el turismo en Mendoza, con información de bodegas, hoteles y actividades.',
      requisitos: 'Experiencia en React Native, integración con APIs, diseño responsivo',
      presupuesto: 150000,
      estado: 'PUBLICADO',
      ubicacion: 'Mendoza',
      modalidad: 'Remoto',
      duracion_estimada: 90,
      creador_id: empresa.id,
      habilidades_requeridas: {
        create: [
          {
            habilidad_id: habilidades[2].id,
            nivel_requerido: 'AVANZADO',
          },
          {
            habilidad_id: habilidades[0].id,
            nivel_requerido: 'AVANZADO',
          },
        ],
      },
    },
  });

  const proyecto2 = await prisma.proyecto.create({
    data: {
      titulo: 'Sistema de Gestión Universitaria',
      descripcion:
        'Modernización del sistema de gestión académica de la UTN Mendoza con tecnologías actuales.',
      requisitos: 'Node.js, PostgreSQL, experiencia en sistemas educativos',
      presupuesto: 250000,
      estado: 'PUBLICADO',
      ubicacion: 'Mendoza',
      modalidad: 'Híbrido',
      duracion_estimada: 120,
      creador_id: administrador.id,
      habilidades_requeridas: {
        create: [
          {
            habilidad_id: habilidades[3].id,
            nivel_requerido: 'EXPERTO',
          },
          {
            habilidad_id: habilidades[4].id,
            nivel_requerido: 'AVANZADO',
          },
        ],
      },
    },
  });

  console.log('💼 Proyectos creados');

  // Crear postulación
  await prisma.postulacion.create({
    data: {
      proyecto_id: proyecto1.id,
      usuario_id: estudiante.id,
      propuesta:
        'Tengo 3 años de experiencia en React y JavaScript. He desarrollado aplicaciones similares para el sector turístico. Propongo un enfoque mobile-first con diseño intuitivo.',
      tarifa_propuesta: 140000,
      estado: 'PENDIENTE',
    },
  });

  console.log('📝 Postulaciones creadas');

  // Crear activos
  const activo1 = await prisma.activo.create({
    data: {
      nombre: 'Bodega Digital Tech Hub',
      descripcion:
        'Bodega histórica en Maipú convertida en hub tecnológico. Generará ingresos por alquileres y eventos.',
      tipo: 'INMUEBLE',
      valor_total: 5000000,
      valor_tokenizado: 2000000,
      precio_por_token: 10000,
      tokens_totales: 200,
      estado: 'DISPONIBLE',
      ubicacion: 'Maipú, Mendoza',
      rentabilidad_estimada: 12,
      plazo_meses: 24,
      creador_id: empresa.id,
    },
  });

  const activo2 = await prisma.activo.create({
    data: {
      nombre: 'Plataforma SaaS Agro-Tech',
      descripcion:
        'Software para gestión de fincas y viñedos con IA para predicción de cosechas.',
      tipo: 'PROYECTO_TECNOLOGICO',
      valor_total: 1500000,
      valor_tokenizado: 1000000,
      precio_por_token: 5000,
      tokens_totales: 200,
      estado: 'EN_FINANCIACION',
      ubicacion: 'Mendoza',
      rentabilidad_estimada: 25,
      plazo_meses: 18,
      creador_id: administrador.id,
    },
  });

  console.log('💎 Activos digitalizados');

  // Crear inversión
  await prisma.inversion.create({
    data: {
      activo_id: activo2.id,
      inversor_id: inversor.id,
      cantidad_tokens: 50,
      monto_invertido: 250000,
    },
  });

  // Actualizar tokens vendidos del activo
  await prisma.activo.update({
    where: { id: activo2.id },
    data: {
      tokens_vendidos: 50,
    },
  });

  console.log('💰 Inversiones creadas');

  // Crear transacción
  await prisma.transaccion.create({
    data: {
      tipo: 'INVERSION',
      estado: 'COMPLETADA',
      monto: 250000,
      descripcion: 'Inversión en Plataforma SaaS Agro-Tech',
      remitente_id: inversor.id,
      destinatario_id: administrador.id,
    },
  });

  console.log('💸 Transacciones creadas');

  console.log('\n✅ Seed completado exitosamente!\n');
  console.log('📧 Usuarios de prueba:');
  console.log('   Admin: admin@cumbre.mendoza.gob.ar');
  console.log('   Estudiante: juan.perez@utn.edu.ar');
  console.log('   Empresa: maria@empresa.com');
  console.log('   Inversor: carlos@inversiones.com');
  console.log('\n🔑 Contraseña para todos: Cumbre2024!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
