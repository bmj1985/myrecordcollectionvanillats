import { compareAsc } from 'date-fns'
const accessToken: String = import.meta.env.VITE_PERSONAL_ACCESS_TOKEN
const discogsUrl: String = "https://api.discogs.com/users/themidnightpreacher/collection/folders"
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
myHeaders.append("User-Agent", "PostmanDiscogs/1.0");
myHeaders.append("Authorization", accessToken);
myHeaders.append("Cookie", "__cf_bm=p8peAdbZ2c0RncAL6iEAG5BZ3PmVyoGligb0xDsv0cA-1655002180-0-AR1JYSY2hZb40DoBIASfSgnaNU76459IiV1HJ4zSw3O82SQZEBDXnJ+4TmICWi4NZy8kAgaHeEY8oReIhb9/feI=");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};


const folderNames: Array<Object> =  [{"name": "Classical", "output": "classical", "url": "", "releases": {}}, {"name": "Jazz", "output": "jazz", "url": "", "releases": {}}, {"name": "1950s", "output": "fifties", "url": "", "releases": {}}, {"name": "1960s", "output": "sixties", "url": "", "releases": {}}, {"name": "1970s", "output": "seventies", "url": "", "releases": {}}, {"name": "1980s", "output": "eighties", "url": "", "releases": {}}, {"name": "1990s", "output": "nineties", "url": "", "releases": {}}, {"name": "2000s", "output": "aughts", "url": "", "releases": {}}, {"name": "2010s", "output": "twentyTens", "url": "", "releases": {}}, {"name": "2020s", "output": "twentyTwenties", "url": "", "releases": {}}, {"name": "All", "output": "allRecords", "url": "", "releases": {}}, {"name": "45s", "output": "fortyFives", "url": "", "releases": {}}]

const folders = await fetch(discogsUrl, requestOptions)
  .then(response => response.json())
  .then((result) => {
    localStorage.setItem('folders', JSON.stringify(result.folders))
    return result.folders


  })
  .catch(error => console.log('error', error));


  function getFolderReleaseUrls(array, params) {
    return `${array.filter(folder => params === folder.name)[0].resource_url}/releases`
  }


  function appendReleaseDateToRelease(params: Array) {
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

  function cleanUpAndSort(array: Array) {
    appendReleaseDateToRelease(array)
    return sortReleases(array)
  }

 async function fetchData() {
   folderNames.map(folderName => {
    let promise = new Promise((resolve, reject) => {
      console.log("FOLDER NAME:", folderName.name, typeof folderName.name)
      let array = localStorage.getItem('folders') ? JSON.parse(localStorage.getItem('folders')) : folders
      console.log("ARRAY", array)
      let url = getFolderReleaseUrls(array, folderName.name)
      fetch(url, requestOptions).then(response => 
        response.json())
      .then(result => {
        let releases = cleanUpAndSort(result.releases)
        localStorage.setItem(folderName.output, JSON.stringify(releases))
        folderName.releases = releases
        console.log("RESULT", folderName.output, releases)
      })
      .catch(error => console.log("error:", error))
    
    });
    return promise
   })}



export default {
 folderNames
}