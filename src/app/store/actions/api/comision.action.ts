import {  ComisionDto } from "../../../entities/comision";
import { ComisionFilter } from "../../../entities/filter";

export class GetComision{
    static type = "[Comision API] Get Comision";
    constructor(public filter:ComisionFilter){}
}

export class PostComisionAction {
    static type = "[Comision API] Post Comision";
    constructor(public comision:ComisionDto){}
}

export class PutComisionAction {
    static type = "[Comision API] Put Comision";
    constructor(public comision:ComisionDto){}
}

export class GetByIdComisionAction{
    static type = "[Comision API] Get by id Comision";
    constructor(public id:string){}
}