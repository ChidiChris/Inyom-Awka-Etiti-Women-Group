import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 lg:mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-4 h-1 w-16 lg:w-20 bg-secondary rounded-full",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
