import { Link } from "react-router-dom";
import incorrect from "../../assets/loobreak-incorrect.svg";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">404</h1>
      <img src={incorrect} alt="LooBreak incorrect poo emoji" data-testid="incorrect-emoji" className="h-10"/>
      <p>Sorry, we cannot find that page.</p>

      <Link
        to="/"
        className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
      >
        Return Home
      </Link>
    </main>
  );
}