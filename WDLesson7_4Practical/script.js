let data;
async function init(){
  
  let link = "shootings.json"
  info = await fetch(link);
  data = await info.json();
  
  let output = document.getElementById("output");
  let build = "";

  function showMap(lat, lon){

  let location = [lat, lon];

  if(!mapObj){
      mapObj = L.map("map");
  } 
  let map = mapObj.setView(location, 14);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  let marker = L.marker(location).addTo(map);
}


function card( shoot ){ 

  let location = [shoot.longitude, shoot.latitude];

  let mapButton = "";
  if(shoot.longitude && shoot.latitude){
    mapButton = `<input type="button" onclick="showMap( ${location} )" value="Map">`
  }
    let shoot = data[i];
    build += `<div class="fitted card">
                 <h3>${shoot.boro}</h3>
                 <hr>
                 <p>${shoot.occur_date}</p>
                 <p>${shoot.occus_time}</p>
                 <hr>
                 <p>${shoot.loc_of_occur_desc}</p>
                 <p>${shoot.location_desc}</p>
                 <hr>
                 ${mapButton}
              </div>`    
  }
  output.innerHTML = build;
}