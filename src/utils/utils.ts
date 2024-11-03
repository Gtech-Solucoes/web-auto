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

export function slugify(value?: string) {
  console.log('value', value)
  if (!value) return null

  return value.trim().replace(/\s+/g, '-').toLowerCase()
}

export function unSlugify(value?: string) {
  if (!value) return null

  return value.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
}
