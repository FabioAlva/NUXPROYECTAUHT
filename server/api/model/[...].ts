import { enhance } from '@zenstackhq/runtime';
import { createEventHandler } from '@zenstackhq/server/nuxt';
import prisma from '../../utils/prisma'; 
import { auth } from '../../utils/auth'; // <--- 1. Importa tu instancia de auth (ajusta la ruta si está en otro lado)

export default createEventHandler({
    getPrisma: async (event) => {
        // 2. Obtiene los headers de la petición actual
        const headers = getRequestHeaders(event);

        // 3. Pide la sesión a Better-Auth usando los headers
        const sessionResult = await auth.api.getSession({
headers: headers as HeadersInit

});

        // 4. Crea el cliente mejorado
        return enhance(prisma, {
            // Si hay sesión, pasa el ID del usuario, si no, undefined (modo anónimo)
            user: sessionResult?.session.userId ? { id: sessionResult.session.userId } : undefined,
        });
    },
});