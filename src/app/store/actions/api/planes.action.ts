import { PlanDto } from "../../../dtos/plan.dto";
import { Plan } from "../../../entities/plan";

export class GetPlanAction{
    static type = "[Plan API] List planes";
}

export class GetPlanByIdWithMateriasAction {
    static type = "[Plan API] List of materias by plan";
    constructor(public id:string){}
}

export class PostPlanAction {
    static type = "[Plan API] Post plan";
    constructor(public plan:PlanDto){}
}

export class PutPlanAction{
    static type = "[Plan API] Put plan";
    constructor(public plan:PlanDto){}
}

export class DeletePlanAction{
    static type = "[Plan API] Delete plan";
    constructor(public id:string){}
}

export class GetByIdPlanAction{
    static type = "[Plan API] Get by id plan";
    constructor(public id:string){}
}

