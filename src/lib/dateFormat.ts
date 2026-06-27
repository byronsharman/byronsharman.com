export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(date);
}
