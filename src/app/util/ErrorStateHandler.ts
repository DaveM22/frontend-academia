import { StateContext } from "@ngxs/store";

export class ErrorStateHandler{

    static handleError(error:any, ctx: StateContext<any>){
      switch(error.status){
        case 403:
          ctx.patchState({
            error:true,
            errorMessage:"No posee permisos suficientes para realizar esta acción"
          })
          break;
        case 0:
          ctx.patchState({
            error:true,
            errorMessage:"Hubo un error al conectarse al servidor"
          })
          break;
        case 500:
        ctx.patchState({
          error:true,
          errorMessage:"Hubo un error en el servidor. Contacte al adminsitrador"
        })
        break;

        default:
          ctx.patchState({
            error:true,
            errorMessage: error.error.error
          })
      }


      }

}
