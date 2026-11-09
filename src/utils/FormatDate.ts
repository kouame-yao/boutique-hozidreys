export function formatDate(date: Date | string): string {
  return new Date(date)
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })
    .replace(',', '-')
}
