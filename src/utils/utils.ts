export function capitalize(text?: string) {
  if (!text) {
    return ''
  }

  text = text.toLocaleLowerCase()

  return String(text).charAt(0).toUpperCase() + String(text).slice(1)
}

export function booleanToHuman(value?: boolean): string {
  return value ? 'Sim' : 'Não'
}
