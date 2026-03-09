interface SummaryBoxProps {
  summary: string;
}

export default function SummaryBox({ summary }: SummaryBoxProps) {
  return (
    <div className="rounded-lg border-l-4 border-l-[var(--color-primary)] bg-[var(--color-primary-light)] p-5">
      <p className="text-[var(--color-ink)] text-base leading-relaxed">
        {summary}
      </p>
    </div>
  );
}
