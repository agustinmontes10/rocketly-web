// Configuración central de contacto y CTAs.
// El número de WhatsApp se toma de la variable de entorno NEXT_PUBLIC_WHATSAPP_NUMBER.
// Mientras no esté definida, se usa un placeholder (completá .env.local antes de publicar).

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '549XXXXXXXXXX';

export const CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? 'contact.rocketly@gmail.com';

// Mensaje pre-cargado por defecto para los CTAs de WhatsApp.
export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola, quiero saber más sobre cómo Rocketly puede ayudar a mi empresa.';

/**
 * Construye un link a wa.me con un mensaje pre-cargado.
 * @param message Texto que se autocompleta en el chat. Si se omite, usa el mensaje por defecto.
 */
export function whatsappLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
