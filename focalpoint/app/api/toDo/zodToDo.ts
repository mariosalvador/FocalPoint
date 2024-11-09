import { z } from "zod";



export const zodToDo = z.object({
  nameToDo: z.string({
    description: "Tarefa Correspondente",
    invalid_type_error: "Tipo de dados para o campo Tarefa inválido!",
    required_error: "O Campo Tarefa é obrigatório",
  })
    .min(1, { message: "O Campo Tarefa precisa estar preenchido" }),
    createAt : z.coerce.date(),
    finishedAt: z.coerce.date(),
})