const generateLuckyNumbers = (count) => {
  const result = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < count; i++) {
    let string = ''
    for (let j = 0; j < 6; j++) {
      string += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    result.push(string)
  }
  return result
}

const addDays = (days) => {
  const currentDate = new Date()
  const millisecondsPerDay = 24 * 60 * 60 * 1000
  const newTimestamp = currentDate.getTime() + days * millisecondsPerDay
  return newTimestamp
}

module.exports = { generateLuckyNumbers, addDays }