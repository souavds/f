export default function extractNumber(value: string): number {
  const num = value.replace(/\D/g, '')
  return num ? parseInt(num, 10) : -1
}
