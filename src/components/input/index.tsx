import type { FieldValues, RegisterOptions, UseFormRegister } from "react-hook-form"

interface InputProps {
	type: string;
	placeholder: string;
	name: string;
  register: UseFormRegister<FieldValues>;
  error?: string;
  rules: RegisterOptions
}

export default function Input({type, placeholder, name, register, error, rules}: InputProps) {
  return(
		<div className="w-full border-1 rounded-md px-1 ">
			<input
			 className="p-2 w-full outline-none"
			 type={type}
			 placeholder={placeholder}
			{...register(name, rules)}
			id={name}
			/>
      {error && <p className="text-red-400 indent-1">{error}</p> }
		</div>
	)
}