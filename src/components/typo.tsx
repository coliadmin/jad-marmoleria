import {cn} from "@/lib/utils";

type TypoProps = {children: React.ReactNode; className?: string};

export function H1({children, className}: TypoProps) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>
      {children}
    </h1>
  );
}

export function H2({children, className, titleClassName}: TypoProps & {titleClassName?: string}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b border-foreground pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className,
      )}
    >
      <span className={cn(titleClassName)}>{children}</span>
    </h2>
  );
}

export function H3({children, className}: TypoProps) {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  );
}

export function H4({children, className}: TypoProps) {
  return (
    <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>
      {children}
    </h4>
  );
}

export function P({children, className}: TypoProps) {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>{children}</p>;
}

export function Blockquote({children, className}: TypoProps) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>{children}</blockquote>
  );
}

export function Lead({children, className}: TypoProps) {
  return <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>;
}

export function Large({children, className}: TypoProps) {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>;
}

export function Small({children, className}: TypoProps) {
  return <small className={cn("text-sm font-medium leading-none", className)}>{children}</small>;
}

export function Muted({children, className}: TypoProps) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>;
}

export function Highlight({children}: TypoProps) {
  return <span className="bg-amber-500/65 px-3 text-background">{children}</span>;
}
