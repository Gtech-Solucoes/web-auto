const normalize = (value?: string) => value?.trim() ?? ''

const normalizeMessage = (value?: string) =>
  normalize(value).replace(/\\n/g, '\n')

const buildWhatsAppUrl = (phone: string, message?: string) => {
  if (!phone) return ''

  const params = new URLSearchParams({ phone })

  if (message) {
    params.set('text', message)
  }

  return `https://api.whatsapp.com/send?${params.toString()}`
}

const accountName = normalize(process.env.NEXT_PUBLIC_ACCOUNT_NAME)
const siteTitle = normalize(process.env.NEXT_PUBLIC_SITE_TITLE)
const siteDescription = normalize(process.env.NEXT_PUBLIC_SITE_DESCRIPTION)
const listingTitle =
  normalize(process.env.NEXT_PUBLIC_LISTING_TITLE) || siteTitle
const listingDescription =
  normalize(process.env.NEXT_PUBLIC_LISTING_DESCRIPTION) || siteDescription
const whatsappPhone = normalize(process.env.NEXT_PUBLIC_WHATSAPP_PHONE)
const whatsappDisplay =
  normalize(process.env.NEXT_PUBLIC_WHATSAPP_DISPLAY) || whatsappPhone
const whatsappDefaultMessage = normalizeMessage(
  process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE,
)
const whatsappFinanceMessage = normalizeMessage(
  process.env.NEXT_PUBLIC_WHATSAPP_FINANCE_MESSAGE,
)

export const siteConfig = {
  accountName,
  siteTitle,
  siteDescription,
  listingTitle,
  listingDescription,
  siteUrl: normalize(process.env.NEXT_PUBLIC_SITE_URL),
  ogImage: normalize(process.env.NEXT_PUBLIC_OG_IMAGE),
  analyticsDomain: normalize(process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN),
  analyticsScriptUrl: normalize(process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT_URL),
  whatsappPhone,
  whatsappDisplay,
  whatsappDefaultMessage,
  whatsappFinanceMessage,
  whatsappIconUrl:
    normalize(process.env.NEXT_PUBLIC_WHATSAPP_ICON_URL) ||
    '/assets/whatsapp.svg',
  addressLine: normalize(process.env.NEXT_PUBLIC_ADDRESS_LINE),
  mapsUrl: normalize(process.env.NEXT_PUBLIC_MAPS_URL),
  contactEmail: normalize(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  instagramUrl: normalize(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  facebookUrl: normalize(process.env.NEXT_PUBLIC_FACEBOOK_URL),
}

export const siteLinks = {
  whatsappDefault: buildWhatsAppUrl(whatsappPhone, whatsappDefaultMessage),
  whatsappFinance: buildWhatsAppUrl(whatsappPhone, whatsappFinanceMessage),
}
