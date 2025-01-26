import { cn } from '@/lib/utils'

type ComponentGenericProps = {
  className?: string
  children: React.ReactNode
}

export function SideBar({ className, children }: ComponentGenericProps) {
  return (
    <aside
      className={cn([
        'md:w-[350px] block md:sticky top-0 md:h-screen',
        className,
      ])}
    >
      {children}
    </aside>
  )
}

export function SideBarContent({ className, children }: ComponentGenericProps) {
  return (
    <div className={cn(['flex h-full max-h-screen flex-col', className])}>
      {children}
    </div>
  )
}

export function SideBarHeader({ className, children }: ComponentGenericProps) {
  return (
    <div
      className={cn([
        'flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6',
        className,
      ])}
    >
      {children}
    </div>
  )
}

export function SideBarBody({ className, children }: ComponentGenericProps) {
  return <div className={cn(['flex-1 border-r', className])}>{children}</div>
}

export function SideBarItem({ className, children }: ComponentGenericProps) {
  return (
    <div
      className={cn([
        'text-sm font-normal py-4 px-4 border-b w-full flex',
        className,
      ])}
    >
      {children}
    </div>
  )
}

type SideBarItemTitleProps = {
  className?: string
  title: string
}

export function SideBarItemTitle({ className, title }: SideBarItemTitleProps) {
  return (
    <h3
      className={cn([
        'font-semibold text-xs mb-3 text-muted-foreground',
        className,
      ])}
    >
      {title}
    </h3>
  )
}
