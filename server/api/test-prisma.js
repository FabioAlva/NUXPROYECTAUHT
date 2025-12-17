
export default defineEventHandler(async (event) => {
  try {
    // Intenta conectar a la base de datos
    await prisma.$connect()
    
    // Cuenta los usuarios (o cualquier modelo que tengas)
    const userCount = await prisma.user.count()
    
    return {
      success: true,
      message: 'Prisma está funcionando correctamente',
      database: 'Conectado',
      userCount: userCount
    }
  } catch (error) {
    return {
      success: false,
      message: 'Error al conectar con Prisma',
      error: error.message
    }
  }
})