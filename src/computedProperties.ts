import { classicalRawData, jazzRawData, fiftiesRawData, sixtiesRawData, seventiesRawData, eightiesRawData, ninetiesRawData, aughtsRawData, twentyTensRawData, twentyTwentiesRawData } from './data.ts'
import { compareAsc } from 'date-fns'

async function appendReleaseDateToRelease(params: Array) {
  params.forEach(record => {
    let dateString = record.notes.filter(note => note.field_id === 6)[0].value
    let dateStringArray = dateString.split("/")
    let releaseDate = {"original_release_date":new Date(dateStringArray[2], dateStringArray[1]-1, dateStringArray[0], 12) }
    Object.assign(record.basic_information, releaseDate)

  })
}

function sortReleases(array: Array) {
  let sortedReleases = array.sort((a,b) => compareAsc(a.basic_information.original_release_date, b.basic_information.original_release_date))
  return sortedReleases
}

async function cleanUpAndSort(array: Array) {
  await appendReleaseDateToRelease(array)
  return sortReleases(array)
}


const classical: Array = await cleanUpAndSort(classicalRawData)
const jazz: Array = await cleanUpAndSort(jazzRawData)
const fifties: Array  = await cleanUpAndSort(fiftiesRawData)
const sixties: Array = await cleanUpAndSort(sixtiesRawData)
const seventies: Array = await cleanUpAndSort(seventiesRawData)
const eighties: Array = await cleanUpAndSort(eightiesRawData)
const nineties: Array = await cleanUpAndSort(ninetiesRawData)
const aughts: Array = await cleanUpAndSort(aughtsRawData)
const twentyTens: Array = await cleanUpAndSort(twentyTensRawData)
const twentyTwenties: Array = await cleanUpAndSort(twentyTwentiesRawData)

export {
  classical,
  jazz,
  fifties,
  sixties,
  seventies,
  eighties,
  nineties,
  aughts,
  twentyTens,
  twentyTwenties
}