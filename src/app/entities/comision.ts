import { Plan } from "./plan";

export class Comision {
    public _id:string = '';
    public anioEspecialidad:number = 0;
    public descripcion:string = '';
    public plan!:Plan
}

export class ComisionDto{
    public _id:string = '';
    public anioEspecialidad:number = 0;
    public descripcion:string = '';
    public planId:string = '';
}

