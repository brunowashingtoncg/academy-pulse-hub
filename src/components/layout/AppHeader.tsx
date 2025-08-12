import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", label: "Dashboard" },
  { to: "/alunos", label: "Alunos" },
  { to: "/turmas", label: "Turmas" },
  { to: "/presencas", label: "Presenças" },
  { to: "/cobrancas", label: "Cobranças" },
];

export const AppHeader = () => {
  return (
    <header className="w-full border-b bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-7 rounded-md hero-gradient" />
          <span className={cn("font-bold text-lg bg-clip-text text-transparent hero-gradient")}>GymFlow</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Button key={item.to} asChild variant="ghost">
              <NavLink
                to={item.to}
                className={({ isActive }) => cn(
                  "px-3",
                  isActive ? "text-foreground" : "text-foreground/70"
                )}
              >
                {item.label}
              </NavLink>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="hero" size="sm">
            <Link to="/alunos">Cadastrar aluno</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
