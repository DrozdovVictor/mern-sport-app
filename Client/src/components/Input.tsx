import type { InputHTMLAttributes } from "react"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
}

function Input({ id, label, error, ...rest }: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 mb-1 block"
      >
        {label}
      </label>
      <input
        id={id}
        className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        {...rest}
      />
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  )
}

export default Input
