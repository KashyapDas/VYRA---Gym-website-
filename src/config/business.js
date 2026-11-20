export const business = {
  name: 'VYRA',

  // Country code + phone number.
  // Do not use +, spaces, brackets or hyphens.
  whatsappNumber: '916001700949',

  address: 'GS Road, Guwahati, Assam',

  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=GS+Road+Guwahati+Assam',

  // Replace these with your actual Instagram account.
  instagramHandle: '@your_actual_username',
  instagramUrl: 'https://instagram.com/your_actual_username',
}

export function getDisplayPhone(number) {
  if (/^91\d{10}$/.test(number)) {
    return `+91 ${number.slice(2, 7)} ${number.slice(7)}`
  }

  return `+${number}`
}