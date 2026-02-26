export function generateWhatsAppLink(phone: string, message: string): string {
  const cleanPhone = phone.replace(/[+\s\-()]/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encoded}`;
}

export function buildMessage(template: string, name: string): string {
  return template.replace(/\{\{name\}\}/g, name);
}
