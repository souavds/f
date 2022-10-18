export default function (value: string): number {
  const matches = value.match(/\/(\d+)\/$/)
  return matches ? Number(matches[1]) : -1
}
