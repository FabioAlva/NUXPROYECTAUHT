import { auth } from "../../utils/auth"; // path to your auth file

// Configuracion del manejador de BettherAuth

/* 
1.- Captura los eventos provenientes de nuxt 
2.- Con toWebRequest transforma en un solicitud estandar Http 
3.- y se lo envia a Betther Auth
*/
export default defineEventHandler((event) => {
    return auth.handler(toWebRequest(event));
});