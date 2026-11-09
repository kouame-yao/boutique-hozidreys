export default function FormField({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block text-sm font-medium text-[#302724]">
      <span className="mb-2 block">{label}</span>
      {children}
      {error && (
        <span role="alert" className="mt-1 block text-sm text-[#b05d54]">
          {error}
        </span>
      )}
    </label>
  )
}
