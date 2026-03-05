import dayjs from 'dayjs'

export const useFormat = () => {
  const formatDate = (date: string | Date) => {
    return dayjs(date).format('MMM D, YYYY')
  }

  const formatDateTime = (date: string | Date) => {
    return dayjs(date).format('MMM D, YYYY h:mm A')
  }

  const formatISO = (date: string | Date) => {
    return dayjs(date).format('YYYY-MM-DD')
  }

  return {
    formatDate,
    formatDateTime,
    formatISO,
  }
}