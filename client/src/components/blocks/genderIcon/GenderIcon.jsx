import { Mars, Venus } from "lucide-react";

const GenderIcon = ({ gender = "male", className = "size-5" }) => {
  return (
    <div>
      {gender === "male" ? (
        <Mars className={`${className} text-blue-400`} />
      ) : (
        <Venus className={`${className} text-pink-400`} />
      )}
    </div>
  );
};

export default GenderIcon;
