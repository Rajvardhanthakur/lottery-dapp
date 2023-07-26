const DAYSOFWEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHSOFYEAR = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const addressTruncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}


export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const dayOfWeek = DAYSOFWEEK[date.getDay()]
  const monthOfYear = MONTHSOFYEAR[date.getMonth()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()

  return `${dayOfWeek} ${monthOfYear} ${dayOfMonth}, ${year}`
}