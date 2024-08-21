import { PlanDto } from "../../../dtos/plan.dto";
import { PlanFilter } from "../../../entities/filter";
import { Plan } from "../../../entities/plan";

export class GetPlanAction{
    static type = "[Plan API] List planes";
    constructor(public filter:PlanFilter){}
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
    constructor(public id:string, public filter:PlanFilter){}
}

export class GetByIdPlanForCursoAction{
    static type = "[Plan API] Get by id plan with materias and comisiones";
    constructor(public id:string){}
}

export class GetPlanesByEspecialidad{
    static type = "[Plan API] Get planes by especialidad";
    constructor(public idEspecialidad:string){}
}

export class ClearPlanes{
    static type = "[Plan API] Clear planes locally";
}

export class GenerateReport {
    static type = "[Plan API] Generate report plan";
    constructor(public id:string){}
}

