import SEO from "@/components/SEO";
import heroImage from "@/assets/hero-gym.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

// Mock data para o MVP
const alunos = [
  { id: 1, nome: "João Silva", presencas: ["2025-08-10", "2025-08-12", "2025-08-13"], aniversario: "1995-08-22" },
  { id: 2, nome: "Maria Souza", presencas: ["2025-08-11", "2025-08-14"], aniversario: "1990-08-15" },
  { id: 3, nome: "Pedro Santos", presencas: ["2025-08-12", "2025-08-13", "2025-08-15", "2025-08-16"], aniversario: "1989-09-02" },
];

function presencasNestaSemana(datas: string[]) {
  const now = new Date();
  const start = new Date(now);
  const day = now.getDay();
  const diffToMonday = (day + 6) % 7; // segunda = 0
  start.setDate(now.getDate() - diffToMonday);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 7);
  return datas.filter((d) => {
    const dt = new Date(d);
    return dt >= start && dt < end;
  }).length;
}

function aniversariantesDoMes() {
  const now = new Date();
  const mes = now.getMonth();
  const dia = now.getDate();
  return alunos
    .map((a) => ({
      ...a,
      diaMes: new Date(a.aniversario).getDate(),
      mes: new Date(a.aniversario).getMonth(),
    }))
    .filter((a) => a.mes === mes && a.diaMes >= dia)
    .sort((a, b) => a.diaMes - b.diaMes);
}

const Index = () => {
  const alertas = alunos
    .map((a) => ({ nome: a.nome, semana: presencasNestaSemana(a.presencas) }))
    .filter((a) => a.semana >= 3);

  const aniversarios = aniversariantesDoMes();

  return (
    <main>
      <SEO
        title="Sistema de gestão para academias | GymFlow"
        description="Gerencie turmas, presenças, aniversários e mensalidades. Alertas automáticos de frequência semanal."
      />

      <section className="container mx-auto grid md:grid-cols-2 gap-8 pt-10 md:pt-12">
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Sistema de gestão para academias
          </h1>
          <p className="text-lg text-muted-foreground">
            Organize turmas, permita alunos em múltiplas turmas, registre presenças e receba alertas quando treinar 3x na semana. Controle de aniversários e mensalidades incluídos.
          </p>
          <div className="flex gap-3">
            <Button asChild variant="hero" size="lg">
              <Link to="/presencas">Registrar presença</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/alunos">Cadastrar aluno</Link>
            </Button>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl card-elevated">
          <img
            src={heroImage}
            alt="Banner de academia com treinador usando tablet para gerenciar turmas e presenças"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      <section className="container mx-auto grid md:grid-cols-2 gap-6 mt-12 mb-16">
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Alertas da semana (3+ treinos)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alertas.length === 0 ? (
              <p className="text-muted-foreground">Sem alertas por enquanto.</p>
            ) : (
              alertas.map((a) => (
                <div key={a.nome} className="flex items-center justify-between">
                  <span>{a.nome}</span>
                  <Badge>{a.semana}x</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Aniversariantes do mês</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {aniversarios.length === 0 ? (
              <p className="text-muted-foreground">Nenhum próximo aniversário este mês.</p>
            ) : (
              aniversarios.map((a) => (
                <div key={a.id} className="flex items-center justify-between">
                  <span>{a.nome}</span>
                  <Badge variant="secondary">{String(a.diaMes).padStart(2, '0')}/{String(new Date(a.aniversario).getMonth()+1).padStart(2, '0')}</Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
};

export default Index;
