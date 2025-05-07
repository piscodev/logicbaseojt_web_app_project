
function isNumeric(value: number): boolean
{
  return typeof value === "number" && !isNaN(value) && isFinite(value)
}

export function dateConv(date: number): string
{
  return isNumeric(date)
    ? new Date(date).toLocaleString("en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "numeric",
        hour12: true
      })
    : ""
}