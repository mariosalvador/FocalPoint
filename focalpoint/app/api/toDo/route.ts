import { NextResponse } from "next/server";
import { zodToDo } from "./zodToDo";
import { getPrismaClient } from "../database";

const client = getPrismaClient()

export async function POST(request : Request){
  try {
    const data = zodToDo.parse(await request.json());
    
    // const res = await client.classe.create({ data });
    const res = await client.toDo.create({
      data
    })

    return NextResponse.json(
      { message: "Tarefa Cadastrada com sucesso", data: res },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = (error as Error).message;

    const formattedError = `Erro: ${errorMessage}`;

    return NextResponse.json({ message: formattedError }, { status: 400 });
  }
}

export async function GET() {
  try {
    const tasks = await client.toDo.findMany(); // Busca todas as tarefas
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: `Erro ao buscar tarefas: ${errorMessage}` }, { status: 500 });
  }
}
