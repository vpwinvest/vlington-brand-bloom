import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { cn } from "@/lib/utils";

export function RatingForm({
  onSubmit,
  onCancel,
}: {
  onSubmit: (score: number, comment: string) => void;
  onCancel: () => void;
}) {
  const [score, setScore] = useState(5);
  const [comment, setComment] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => setScore(n)} className="p-0.5">
            <Star className={cn("h-6 w-6", n <= score ? "fill-horizon-500 text-horizon-500" : "text-ink-200")} />
          </button>
        ))}
      </div>
      <Textarea
        rows={3}
        placeholder="How did the mission go?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onSubmit(score, comment)}>
          Submit rating
        </Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
