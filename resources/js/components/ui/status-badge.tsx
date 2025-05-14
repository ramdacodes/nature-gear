import { cn } from "@/lib/utils"

interface BadgeProps {
  variant?: "default" | "info" | "warning" | "success" | "danger"
  label: string
}

const badgeVariants = {
  default: {
    bg: "bg-gray-600/10 dark:bg-gray-700/20 hover:bg-gray-600/20",
    text: "text-gray-600 dark:text-gray-300 border-gray-600/60",
    dot: "bg-gray-600 dark:bg-gray-400",
  },
  info: {
    bg: "bg-blue-600/10 dark:bg-blue-700/20 hover:bg-blue-600/20",
    text: "text-blue-600 dark:text-blue-300 border-blue-600/60",
    dot: "bg-blue-600 dark:bg-blue-400",
  },
  warning: {
    bg: "bg-amber-600/10 dark:bg-amber-700/20 hover:bg-amber-600/20",
    text: "text-amber-600 dark:text-amber-300 border-amber-600/60",
    dot: "bg-amber-600 dark:bg-amber-400",
  },
  success: {
    bg: "bg-emerald-600/10 dark:bg-emerald-700/20 hover:bg-emerald-600/20",
    text: "text-emerald-600 dark:text-emerald-300 border-emerald-600/60",
    dot: "bg-emerald-600 dark:bg-emerald-400",
  },
  danger: {
    bg: "bg-red-600/10 dark:bg-red-700/20 hover:bg-red-600/20",
    text: "text-red-600 dark:text-red-300 border-red-600/60",
    dot: "bg-red-600 dark:bg-red-400",
  },
}

export function StatusBadge({ variant = "default", label }: BadgeProps) {
  const variantBadge = badgeVariants[variant] || badgeVariants.default

  const formattedLabel = label
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-0.5 text-xs font-medium shadow-none transition-colors duration-200",
        variantBadge.bg,
        variantBadge.text
      )}>
      <div className={cn("h-1.5 w-1.5 rounded-full", variantBadge.dot)} />
      {formattedLabel}
    </div>
  )
}