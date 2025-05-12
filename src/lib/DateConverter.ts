import dayjs from "dayjs"

function isNumeric(value: number): boolean
{
  return typeof value === "number" && !isNaN(value) && isFinite(value)
}

export function dateConv(str: string): string
{
  const date = dayjs(str).valueOf()
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