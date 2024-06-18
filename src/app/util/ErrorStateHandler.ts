import { StateContext } from "@ngxs/store";

export class ErrorStateHandler{

    static handleError(error:any, ctx: StateContext<any>){
        if(error.status === 0){
          ctx.patchState({
            error:true,
            errorMessage:"Hubo un error al conectarse al servidor"
          })
        }
        if(error.status === 500){
          ctx.patchState({
            error:true,
            errorMessage:"Hubo un error en el servidor. Contacte al adminsitrador"
          })
        }
      }

}
