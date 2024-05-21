import { cn } from '@/lib/utils'

type ComponentGenericProps = {
  className?: string
  children: React.ReactNode
}

export function Dashboard({ className, children }: ComponentGenericProps) {
  return (
    <div
      className={cn([
        'grid min-h-screen w-full md:grid-cols-[280px_1fr]',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function DashboardContent({
  className,
  children,
}: ComponentGenericProps) {
  return <div className={cn(['flex flex-col', className])}>{children}</div>
}

export function DashboardHeader({
  className,
  children,
}: ComponentGenericProps) {
  return (
    <div
      className={cn([
        'flex h-14 items-center sm:justify-between gap-4 border-b px-4 lg:h-[60px] lg:px-6',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function DashboardTopFilter({
  className,
  children,
}: ComponentGenericProps) {
  return (
    <div
      className={cn(
        'w-full justify-end flex h-14 items-center gap-4 border-b px-4 lg:px-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function DashboardMain({ className, children }: ComponentGenericProps) {
  return (
    <main
      className={cn(
        'flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40',
        className,
      )}
    >
      {children}
    </main>
  )
}
