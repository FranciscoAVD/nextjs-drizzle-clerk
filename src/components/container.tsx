import { cn } from "@/lib/utils";

interface ContainerProps extends React.ComponentProps<"div"> {}

export function Container({
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        "container mx-auto px-4 sm:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
