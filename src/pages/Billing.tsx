import SEO from "@/components/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const alunos = [
  { id: 1, nome: "João Silva", status: "Em dia", vencimento: "10/09/2025" },
  { id: 2, nome: "Maria Souza", status: "Atrasado", vencimento: "05/08/2025" },
  { id: 3, nome: "Pedro Santos", status: "Em dia", vencimento: "02/09/2025" },
];

const Billing = () => {
  return (
    <main className="container mx-auto py-8">
      <SEO title="Cobranças | Sistema de academia" description="Controle de mensalidades: status e vencimentos." />
      <h1 className="text-3xl font-bold mb-6">Cobranças</h1>

      <Card className="card-elevated">
        <CardHeader>
          <CardTitle>Status de mensalidades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vencimento</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alunos.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.nome}</TableCell>
                  <TableCell>
                    <Badge variant={a.status === "Em dia" ? "secondary" : "destructive"}>{a.status}</Badge>
                  </TableCell>
                  <TableCell>{a.vencimento}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default Billing;
