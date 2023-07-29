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

const generateLottery = (id) => {
  const image = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Spotify_App_Logo.svg/800px-Spotify_App_Logo.svg.png?20210620075506"
  const expiresIn = getRandomInt(7, 30)
  const expiresAt = new Date(Date.now() + expiresIn * 24 * 60 * 50 * 1000).getTime()

  return {
    id,
    title: `Lottery ${id}`,
    desc: `This is the ${id} lottery`,
    owner: generateRandomEthereumAddress(),
    price: getRandomFloat(10, 100).toFixed(2),
    ticketPrice: getRandomFloat(0.01, 0.1).toFixed(2),
    image,
    drawsAt: getRandomTimestamp(
      new Date('23-02-02').getTime(),
      new Date('23-04-02').getTime()
    ),
    createdAt: getRandomTimestamp(
      new Date('23-02-02').getTime(),
      new Date('23-04-02').getTime()
    ),
    expiresAt,
    participants: getRandomInt(10, 100),
    draw: false
  }
}

const generateLotteryParticipants = (count) => {
  const participants = [];
  const accounts = [
    "0x1C43SDFDS4RDFGJS54TTDF56E6W2DFER",
    "0x2C43SDFDS4RDFGJS54TTDF56E6W2DFER",
    "0x3C43SDFDS4RDFGJS54TTDF56E6W2DFER",
    "0x4C43SDFDS4RDFGJS54TTDF56E6W2DFER",
    "0x5C43SDFDS4RDFGJS54TTDF56E6W2DFER",
    "0x6C43SDFDS4RDFGJS54TTDF56E6W2DFER",
    "0x7C43SDFDS4RDFGJS54TTDF56E6W2DFER",
    "0x8C43SDFDS4RDFGJS54TTDF56E6W2DFER",
    "0x9C43SDFDS4RDFGJS54TTDF56E6W2DFER",
    "0x0C43SDFDS4RDFGJS54TTDF56E6W2DFER",
  ]

  for (let i = 0; i < count; i++) {
    const participant = {
      account: accounts[Math.floor(Math.random() * accounts.length)],
      lotteryNumber: Math.random().toString(36).substring(2, 8),
      paid: false
    }
    participants.push(participant)
  }

  return participants
}


const generateRandomEthereumAddress = () => {
  const hexChars = "0123456789abcdeghijkl"
  let address = "0x"

  for (let i = 0; i < 40; i++) {
    address += hexChars.charAt(Math.floor(Math.random() * hexChars.length))
  }

  return address;
}

const getPurchaseNumbers = (count) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz0123456789";
  const result = []
  for (let i = 0; i < count; i++) {
    let string = '';
    for (let j = 0; j < 6; j++) {
      string += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    result.push(string)
  }
  return result;
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

export { generateLotteries, generateLottery, generateLotteryParticipants, getPurchaseNumbers }