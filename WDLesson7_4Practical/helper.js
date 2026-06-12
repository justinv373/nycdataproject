function get(id){
  return document.getElementById(id);
}

function showMap(lat, lon){
  let location = [lat,lon];
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
                 <p>${info.occur_time}</p>
                 <hr>
                 <p>${info.loc_of_occur_desc}</p>
                 <p>${info.location_desc}</p>
                 <hr>
                 ${mapButton}
              </div>`;
  return build;
}

function searchData() {
  let cards_output = document.getElementById("cards_output");
  let search = document.getElementById("search").value.toLowerCase();
  let result = document.getElementById("result");


  let build = "";
  let ct = 0;


  for (let i = 0; i < data.length; i++) {
    let info = data[i];


    let searchableText = `
      ${info.boro}
      ${info.occur_date}
      ${info.occur_time}
      ${info.loc_of_occur_desc}
      ${info.location_desc}
    `.toLowerCase();


    if (searchableText.includes(search)) {


      let mapButton = "";


      if(info.latitude && info.longitude){
        mapButton = `<input type="button" value="Map" onclick="showMap('${info.longitude}', '${info.latitude}')">`;
  }


      build += `
        <div class="card fitted">
          <h3>${info.boro}</h3>
          <hr>
          <p>${info.occur_date}</p>
          <p>${info.occur_time}</p>
          <hr>
          <p>${info.loc_of_occur_desc}</p>
          <p>${info.location_desc}</p>
          <hr>
          ${mapButton}
        </div>
      `;


      ct++;
    }
  }


  result.innerHTML = `${ct} Results found.`;
  cards_output.innerHTML = build;
}

let subdata;
function ByBorough(){
  let q = 0, bk = 0, bx = 0, m = 0, s = 0;
  
  for(let i = 0; i < data.length; i++){
    let info = data[i];
    if(info.boro == "QUEENS"){
      q++;
    }else if(info.boro == "MANHATTAN"){
      m++;
    }else if(info.boro == "BROOKLYN"){
      bk++;
    }else if(info.boro == "BRONX"){
      bx++;
    }else if(info.boro == "STATEN ISLAND"){
      s++;
    }
  }

  let chartData = [
    ["QUEENS",q],
    ["MANHATTAN",m],
    ["BROOKLYN", bk],
    ["BRONX", bx],
    ["STATEN ISLAND", s]
  ]
  
  let chartType = get("chartType").value;
  
  displayChart(chartData,"output_chart",chartType)
}