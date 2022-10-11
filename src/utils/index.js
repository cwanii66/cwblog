import dayjs from 'dayjs'

export const isDark = useDark()

export function formatDate(d) {
  const date = dayjs(d)
  if (date.year() === dayjs().year())
    return date.format('MMM D')
  return date.format('MMM D, YYYY')
}