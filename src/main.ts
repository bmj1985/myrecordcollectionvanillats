import './style.css'
// import { classical, jazz, fifties, sixties } from './computedProperties.ts'
const app = document.querySelector<HTMLDivElement>('#app')!
import data from './data.ts'

const fifties = localStorage.getItem('fifties') ? JSON.parse(localStorage.getItem('fifties')): []

function list(array: Array) {
  return array.map((item, index, array) => {
    return `<div class="thumbnail"><img src="${item.basic_information.cover_image}"</div><div class="artist">${item.basic_information.artists[0].name}</div><div class="album">${item.basic_information.title}</div>`
  })}

  const fiftiesList = list(fifties)




app.innerHTML = `
  <h2>Classical</h2>
`


app.innerHTML = `
  <h2>Classical</h2>
  <div class="list-wrapper">${fiftiesList}</div>
  <h2>Jazz</h2>
  <div class="list-wrapper">${fiftiesList}</div>
`
