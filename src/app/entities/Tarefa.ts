import { Prioridade } from "./Prioridade";

export interface Tarefa{
    id?: number,
    objetivo: string,
    idCriador?: number,
    idResponsavel?: number,
    idLista: number,
    tagPrioridade?: Prioridade | null,
    prazo?: string,
    dataCriacao?: string,
    dataAlteracao?: string
}