import { enhance } from '@zenstackhq/runtime';
import { createEventHandler } from '@zenstackhq/server/nuxt';
import prisma from '../../utils/prisma'; 
import { auth } from '../../utils/auth'; 



/* Configuracion de la Api de zentack 
* 1.- Debemos importar el prisma que crea el SingelTon (Configuracion de prisma en el Server).
* 2.- Debemos importar el auth que configuramos para betther auth  (Configuracion de betther auth en el Server).

* 3.- En el createEvent Handler , el cual crea un enpoint de API que intercepta  las peticiones HTTP (GET, POST , PUT) dirigidas a nuestros modelos de prisma (Carpeta Models).
*   3.1 .- Captura ese evento y obtiene los headers(Lugar donde estan el nevegador , cookies , etc)
*   3.2 .-  En auth.get.Seccion se obtiene la session y verificamos que la cookie sea valida
*   3.3 .-  Ahora en enchance prisma el cual envuelve a prisma inyecta el objeto user para evaluar si cumple con las politicas de seguridad
*   3.4- Por el momento solo le paso el UserId   (Se puede añadir demas campos como rol por ejemplo)
*/




export default createEventHandler({
    getPrisma: async (event) => {
        const headers = getRequestHeaders(event);

        const sessionResult = await auth.api.getSession({
            headers: headers as HeadersInit
            });
        return enhance(prisma, {
            user: sessionResult?.session.userId ? { id: sessionResult.session.userId
// role: sessionResult.user.role

             } : undefined,
        });
    },
});