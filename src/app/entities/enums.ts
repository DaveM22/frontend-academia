export enum Condicion{
    APROBADO = "APROBADO",
    REGULAR = "REGULAR",
    INSCRIPTO = "INSCRIPTO",
    LIBRE = "LIBRE"
}

export enum Cargo{
    TEORIA = "TEORIA",
    PRACTICA = "PRACTICA"
}

export enum RolesUsuario{
    Administrador = "Administrador",
    Alumno = "Alumno",
    Docente = "Docente"
}

export const CondicionList = Object.entries(Condicion).map(([key, value]) => ({ label: key, value }));
