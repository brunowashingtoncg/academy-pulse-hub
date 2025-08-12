import React from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

const mockAlunos = [
  { id: 1, nome: "João Silva", turmas: ["Funcional", "Cross"], status: "Ativo" },
  { id: 2, nome: "Maria Souza", turmas: ["Yoga"], status: "Inativo" },
  { id: 3, nome: "Pedro Santos", turmas: ["Cross"], status: "Ativo" },
];

const Students = () => {
  const [alunos, setAlunos] = React.useState(mockAlunos);

  const excluirAluno = (id: number) => {
    setAlunos((prev) => prev.filter((a) => a.id !== id));
    toast({ title: "Aluno excluído", description: "O registro foi removido." });
  };

  return (
    <main className="container mx-auto py-8">
      <SEO title="Alunos | Sistema de academia" description="Gerencie alunos, turmas e status de matrícula." />
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Alunos</h1>
        <Button onClick={() => toast({ title: "Cadastro de aluno", description: "Conecte o Supabase para salvar os dados." })} variant="hero">
          Novo aluno
        </Button>
      </header>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Lista de alunos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Turmas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunos.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.nome}</TableCell>
                  <TableCell className="space-x-1">
                    {a.turmas.map((t) => (
                      <Badge key={t} variant="secondary">
                        {t}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge variant={a.status === "Ativo" ? "secondary" : "destructive"}>{a.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">Excluir</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Excluir aluno</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir "{a.nome}"? Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction onClick={() => excluirAluno(a.id)}>Excluir</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default Students;

