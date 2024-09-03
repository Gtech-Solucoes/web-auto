'use client'

import * as React from 'react'

import clsx from 'clsx'
import { Command as CommandPrimitive } from 'cmdk'
import { Command, CommandGroup, CommandItem } from '@/components/ui/command'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

type DataItem = Record<'value' | 'label', string>

export function Autocomplete({
  placeholder = 'Select an item',
  parentClassName,
  data,
}: {
  placeholder?: string
  parentClassName?: string
  data: DataItem[]
}) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')
  const router = useRouter()

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            return
          }
        }
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    [],
  )

  return (
    <div className={clsx(parentClassName, 'grid w-full items-center')}>
      <Command
        onKeyDown={handleKeyDown}
        className="overflow-visible bg-transparent"
      >
        <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <div className="flex gap-1 flex-wrap items-center">
            <Search className=" h-4 w-4 text-muted-foreground" />
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
        </div>
        <div className="relative mt-2">
          {open && data.length > 0 ? (
            <div className="absolute w-full top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {data.map((framework) => {
                  return (
                    <CommandItem
                      key={framework.value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        router.push('/comprar/carros')
                        setInputValue('')
                      }}
                    >
                      {framework.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </div>
      </Command>
    </div>
  )
}
