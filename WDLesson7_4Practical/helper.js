function get(id){
  return document.getElementById(id);
}

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

function card( info ){ 

  let location = [info.longitude, info.latitude];
  let mapButton = "";
  if(info.latitude && info.longitude){
    mapButton = `<input type="button" onclick="showMap( ${location} )" value="Map">`
  }

  let build = `<div class="card fitted">
                 <h3>${info.boro}</h3>
                 <hr>
                 <p>${info.occur_date}</p>
                 <p>${info.occus_time}</p>
                 <hr>
                 <p>${info.loc_of_occur_desc}</p>
                 <p>${info.location_desc}</p>
                 <hr>
                 ${mapButton}
              </div>`;
  return build;
}