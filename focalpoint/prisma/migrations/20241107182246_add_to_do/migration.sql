-- CreateTable
CREATE TABLE "ToDo" (
    "id" TEXT NOT NULL,
    "nameToDo" TEXT NOT NULL,
    "description" TEXT,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ToDo_nameToDo_key" ON "ToDo"("nameToDo");
