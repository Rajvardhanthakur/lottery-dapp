const generateLotteries = (n) => {
  const lotteries = []

  for (let i = 0; i < n; i++) {
    const id = i.toString()
    const title = `Lottery ${id}`
    const desc = `This lottery no is ${i} `;
    const owner = generateRandomEthereumAddress()
    const price = getRandomFloat(0.01, 0.1).toFixed(2)
    const ticketPrice = getRandomFloat(0.01, 0.1).toFixed(2)
    const image = `https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/800px-Spotify_App_Logo.svg.png?20210620075506`
    const createdAt = getRandomTimestamp(
      new Date('23-02-02').getTime(),
      new Date('23-04-02').getTime()
    )
    const drawsAt = getRandomTimestamp(
      new Date('23-02-02').getTime(),
      new Date('23-04-02').getTime()
    )
    const expiresIn = getRandomInt(7, 30)
    const expiresAt = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).getTime()
    const participants = getRandomInt(10, 100)
    const draw = false

    lotteries.push({
      id,
      title,
      desc,
      owner,
      price,
      ticketPrice,
      image,
      createdAt,
      expiresAt,
      drawsAt,
      participants,
      draw
    })
  }

  return lotteries
}

const generateRandomEthereumAddress = () => {
  const hexChars = "0123456789abcdeghijkl"
  let address = "0x"

  for (let i = 0; i < 40; i++) {
    address += hexChars.charAt(Math.floor(Math.random() * hexChars.length))
  }

  return address;
}

const getRandomFloat = (max, min) => {
  return Math.random() * (max - min) + min
}

const getRandomTimestamp = (startDate, endDate) => {
  return Math.floor(Math.random() * (startDate - endDate + 1) + endDate)
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { generateLotteries }