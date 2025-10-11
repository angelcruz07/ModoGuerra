import type { UseFormRegister } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  type?: string;
  register: UseFormRegister<any>;
  validation?: object;
  error?: string;
  className?: string;
  inputStyle?: string;
  props?: any;
  required?: boolean;
}

export const Input = ({
  label,
  name,
  type = "text",
  register,
  validation = {},
  error,
  className = "",
  inputStyle = "",
  required = true,
  ...props
}: Props) => {
  return (
    <div className={`flex flex-col text-white ${className}`}>
      {label && <span className="mb-3 md:text-xl">{label}</span>}

      <input
        type={type}
        required={required}
        className={`outline-secondary bg-accent border-accet rounded-md border p-2 outline ${inputStyle} ${error ? "border-red-500" : ""}`}
        {...props}
        {...register(name, validation)}
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};
