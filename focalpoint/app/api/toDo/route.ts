import { NextResponse } from "next/server";
import { zodToDo } from "./zodToDo";
import { getPrismaClient } from "../database";

const client = getPrismaClient()

export async function POST(request : Request){
  try {
    const data = zodToDo.parse(await request.json());
    
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
    const tasks = await client.toDo.findMany(); 
    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: `Erro ao buscar tarefas: ${errorMessage}` }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { nameToDo } = await request.json();

    if (!nameToDo) {
      return NextResponse.json({ message: 'Nome da tarefa não fornecido.' }, { status: 400 });
    }

    const deletedTask = await client.toDo.delete({
      where: {
        nameToDo: nameToDo,
      },
    });

    if (deletedTask) {
      return NextResponse.json({ message: 'Tarefa deletada com sucesso.' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Tarefa não encontrada.' }, { status: 404 });
    }
  } catch (error) {
    const errorMessage = (error as Error).message;
    return NextResponse.json({ message: `Erro ao deletar tarefa: ${errorMessage}` }, { status: 500 });
  }
}