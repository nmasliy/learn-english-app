export function shuffleArray(arr) {
  const shuffledArr = arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return shuffledArr
}

export function getRandomNumbersInRange(count, range) {
  let m = {}
  let a = []

  for (let i = 0; i < count; ++i) {
    let r = Math.floor(Math.random() * (range - i))
    a.push((r in m ? m[r] : r) + 1)
    let l = range - i - 1
    m[r] = l in m ? m[l] : l
  }
  return a
}

export function fillArayByIndexes(arr, indexes) {
  const filledArr = []

  for (let i = 0; i < indexes.length; i++) {
    filledArr.push(arr[indexes[i]])
  }

  return filledArr
}

export function getRandomElementsFromArray(elements, count) {
  const randomIndexes = getRandomNumbersInRange(count, elements.length)
  const filledArray = fillArayByIndexes(elements, randomIndexes)

  return filledArray
}