export class Filter {
}


export class ComisionFilter{
    mostrarPlan:boolean = false;
}

export class PlanFilter{
    especialidadId:string= '';
    mostrarEspecialidad:boolean = false;
    incluirMaterias:boolean = false;
}

export class CursoFilter{
    planId:string = ''
    materiaId:string = ''
    comisionId:string = ''
    mostrarMateria:boolean = false
    mostrarComision:boolean = false
}

export class AlumnoFilter{
    incluirInscripciones:boolean = false;
}

export class MateriaFilter{
    alumnnoId:string = '';
    planId:string = '';
}

export class DocenteCursoFilter{
    cursoId:string = '';
}

export class DocenteFilter{
    planId:string=''
    cursoId:string=''
    incluirAsignaciones: boolean = false;
}
