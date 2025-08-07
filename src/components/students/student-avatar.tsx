import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface StudentAvatarProps {
  name: string
  avatar?: string
  size?: "sm" | "md" | "lg"
}

export function StudentAvatar({ name, avatar, size = "md" }: StudentAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  }

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Avatar className={sizeClasses[size]}>
      <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium">
        {getInitials(name)}
      </AvatarFallback>
    </Avatar>
  )
}
