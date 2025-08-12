import React from "react";
import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const mockTurmas = [
  { id: 1, nome: "Funcional", horario: "Seg/Qua/Sex 07:00", vagas: 20, inscritos: 12 },
  { id: 2, nome: "Cross", horario: "Ter/Qui 19:00", vagas: 15, inscritos: 15 },
  { id: 3, nome: "Yoga", horario: "Sáb 09:00", vagas: 25, inscritos: 8 },
];

const turmaSchema = z.object({
  nome: z.string().min(1, "Informe o nome"),
  horario: z.string().min(1, "Informe o horário"),
  vagas: z.coerce.number().int().positive("Vagas deve ser maior que 0"),
});

type Turma = (typeof mockTurmas)[number];

type TurmaForm = z.infer<typeof turmaSchema>;

const Classes = () => {
  const [turmas, setTurmas] = React.useState<Turma[]>(mockTurmas);
  const [open, setOpen] = React.useState(false);

  const form = useForm<TurmaForm>({
    resolver: zodResolver(turmaSchema),
    defaultValues: { nome: "", horario: "", vagas: 10 },
  });

  const onSubmit = (data: TurmaForm) => {
    const nova: Turma = {
      id: Date.now(),
      nome: data.nome,
      horario: data.horario,
      vagas: data.vagas,
      inscritos: 0,
    };
    setTurmas((prev) => [nova, ...prev]);
    setOpen(false);
    form.reset();
    toast({ title: "Turma criada", description: `${data.nome} adicionada com sucesso.` });
  };

  const removerTurma = (id: number) => {
    setTurmas((prev) => prev.filter((t) => t.id !== id));
    toast({ title: "Turma removida", description: "A turma foi excluída." });
  };

  return (
    <main className="container mx-auto py-8">
      <SEO title="Turmas | Sistema de academia" description="Crie e gerencie turmas e horários." />

      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Turmas</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="default">Nova turma</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar turma</DialogTitle>
              <DialogDescription>Preencha os dados para cadastrar uma nova turma.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex.: Funcional" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="horario"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex.: Seg/Qua/Sex 07:00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="vagas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vagas</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} placeholder="Ex.: 20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Salvar</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </header>

      {turmas.length === 0 ? (
        <p className="text-muted-foreground">Nenhuma turma cadastrada.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {turmas.map((t) => (
            <Card key={t.id} className="card-elevated">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t.nome}</span>
                  <Badge variant={t.inscritos >= t.vagas ? "destructive" : "secondary"}>
                    {t.inscritos}/{t.vagas}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{t.horario}</p>
                <div className="mt-4">
                  <Button variant="destructive" size="sm" onClick={() => removerTurma(t.id)}>
                    Remover
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
};

export default Classes;
