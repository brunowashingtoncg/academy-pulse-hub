import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockTurmas = [
  { id: 1, nome: "Funcional", horario: "Seg/Qua/Sex 07:00", vagas: 20, inscritos: 12 },
  { id: 2, nome: "Cross", horario: "Ter/Qui 19:00", vagas: 15, inscritos: 15 },
  { id: 3, nome: "Yoga", horario: "Sáb 09:00", vagas: 25, inscritos: 8 },
];

const Classes = () => {
  return (
    <main className="container mx-auto py-8">
      <SEO title="Turmas | Sistema de academia" description="Crie e gerencie turmas e horários." />
      <h1 className="text-3xl font-bold mb-6">Turmas</h1>
      <div className="grid gap-6 md:grid-cols-3">
        {mockTurmas.map((t) => (
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
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Classes;
