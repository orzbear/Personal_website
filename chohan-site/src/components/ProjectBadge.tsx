export default function ProjectBadge({ children }:{children: React.ReactNode}) {
  return (
    <span className="inline-block text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
      {children}
    </span>
  )
}
