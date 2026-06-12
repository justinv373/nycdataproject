let data, mapObj;

async function init(){
  let link = "shooting.json"
  info = await fetch(link);
  data = await info.json();
  
  let cards_output = get("cards_output");
  let build = "";
  for(let i = 0; i < data.length; i+=1) {
    let info = data[i];
    build += card(info);
  }
  cards_output.innerHTML = build;
}

function displayChart( data, id, type ){
  let chart = c3.generate({
    bindto: '#' + id,
    data: {
      columns: data,
      type:type
    }
  });
}