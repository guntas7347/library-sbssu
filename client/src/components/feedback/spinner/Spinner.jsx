import { Loader2 } from "lucide-react";

export default function Spinner({
  solo = false,
  size = 50,
  height = 0,
  color = "blue",
}) {
  return (
    <Loader2
      style={{ height: size, margin: `${height}px 0` }}
      className={`animate-spin text-${color}-400 self-center  
      ${!solo && "w-full"}`}
    />
  );
}
