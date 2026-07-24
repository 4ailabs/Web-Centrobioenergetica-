// Único lugar donde vive el número de WhatsApp del instituto.
export const WHATSAPP_PHONE = '525579076626';

export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
