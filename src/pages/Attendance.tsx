import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const alunos = ["João Silva", "Maria Souza", "Pedro Santos"];
const turmas = ["Funcional", "Cross", "Yoga"];

const Attendance = () => {
  const [aluno, setAluno] = useState<string | undefined>();
  const [turma, setTurma] = useState<string | undefined>();

  const registrar = () => {
    if (!aluno || !turma) {
      toast({ title: "Preencha os campos", description: "Selecione o aluno e a turma." });
      return;
    }
    toast({
      title: "Presença registrada",
      description: `${aluno} marcado em ${turma}. Conecte o Supabase para salvar permanentemente.`,
    });
    setAluno(undefined);
    setTurma(undefined);
  };

  return (
    <main className="container mx-auto py-8">
      <SEO title="Presenças | Sistema de academia" description="Registre presenças por aluno e turma." />
      <h1 className="text-3xl font-bold mb-6">Presenças</h1>

      <Card className="max-w-xl card-elevated">
        <CardHeader>
          <CardTitle>Registrar presença</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label>Aluno</Label>
            <Select value={aluno} onValueChange={setAluno}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um aluno" />
              </SelectTrigger>
              <SelectContent>
                {alunos.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Turma</Label>
            <Select value={turma} onValueChange={setTurma}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma turma" />
              </SelectTrigger>
              <SelectContent>
                {turmas.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button onClick={registrar} variant="hero">Registrar</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Attendance;
