console.log("Hello Matrix")

let token
let song

async function getToken() {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${btoa(clientId + ':' + clientSecret)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  if (res.ok) {
    const data = await res.json()
    return data.access_token
  }
}

(async () => {
  token = await getToken()
  console.log(token,'token in fun')
})()

console.log(token,'1')
getSongApiCall('Ooh La La', 'Faces')

async function getSongApiCall(track, artist) {
  // let token = await getToken()
  console.log(token,2)
  
  const res = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist`, {
    method: "Get",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      'Content-Type': 'application/json'
    }
  })
  if (res.ok) {
    const data = await res.json()
    return data.tracks.items[0].preview_url
  }
}

const imgs = document.getElementsByTagName('img')
for (const image of imgs) {
  image.addEventListener('click', async () => {
    const [track, artist] = image.alt.split(' - ')
    const songUrl = await getSongApiCall(track, artist)
    if (song) {
      stopSong()
    }
    playSong(songUrl)
  })
}

function playSong(url) {
  song = new Audio(url)
  song.volume = .5
  song.play()
}

function stopSong() {
  song.pause()
}

// const button = document.querySelector('#stp-btn')
// button.addEventListener('click',()=>stopSong())
