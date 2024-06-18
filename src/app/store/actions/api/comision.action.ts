import { Comision } from "../../../entities/comision";

export class PostComisionAction {
    static type = "[Comision API] Post Comision";
    constructor(public comision:Comision){}
}

export class PutComisionAction {
    static type = "[Comision API] Put Comision";
    constructor(public comision:Comision){}
}

export class GetByIdComisionAction{
    static type = "[Comision API] Get by id Comision";
    constructor(public id:string){}
}