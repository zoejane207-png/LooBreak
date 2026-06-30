// import { Badge } from "@/components/ui/badge" once shadcn installed

export default function ScoreBadge({ data }) {
  return (
    <div data-testid="score-badge">
      <p>Come back tomorrow!</p>
      <p>
        {data.score}/{data.totalQuestions}
      </p>
    </div>
  );
}
