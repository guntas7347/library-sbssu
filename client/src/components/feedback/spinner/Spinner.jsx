import { Loader2 } from "lucide-react";

export default function Spinner({
  solo = false,
  size = 50,
  height = 100,
  color = "blue",
  message = "",
}) {
  return (
    <div
      style={{ height: size, margin: `${height}px 0` }}
      className="flex-center flex-col"
    >
      <Loader2
        className={`animate-spin text-${color}-400 self-center  
      ${!solo && "w-full"}`}
      />
      <span className="">{message}</span>
    </div>
  );
}
