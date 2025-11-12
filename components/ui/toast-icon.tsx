import type React from "react"

export function ToastIcon({
  type = "default",
  ...props
}: { type?: "success" | "error" | "warning" | "info" | "default" } & React.SVGProps<SVGSVGElement>) {
  const colors = {
    success: "#4CAF50",
    error: "#D32F2F",
    warning: "#FFA726",
    info: "#1976D2",
    default: "#666666",
  }

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="10" cy="10" r="9" stroke={colors[type]} strokeWidth="2" />
    </svg>
  )
}
