var zlevel = 1;
var inputVal = document.getElementById('inputValue')

const updateMap = () => {
    fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                latMap = element.countryInfo.lat;
                longMap = element.countryInfo.long;
                cases = element.cases
                if(cases < 100000){
                    col = 'lime'
                }
                else if(cases < 1000000){
                    col = 'green'
                }else if(cases < 10000000){
                    col = 'red'
                }else{
                    col = 'black'
                }
                console.log(element)
                // Set marker options.
                const marker = new mapboxgl.Marker({
                    color: col,
                    draggable: false,
                    scale: 0.6,
                    title: "Hello"
                }).setLngLat([longMap, latMap])
                    .addTo(map);
                
                const minPopup = new mapboxgl.Popup()
                minPopup.setHTML(`<div class = "popup"><h5>${element.country}</h5><p>Cases: ${element.cases}</p><p>Active: ${element.active}</p></div>`)
                marker.setPopup(minPopup)
            })
        })
}
updateMap();
const zoomIn = () => {
    map.flyTo({zoom: ++zlevel});
}

const zoomOut = () => {
    map.flyTo({zoom: --zlevel});
}

const recenter = ()=>{
    zlevel = 1;
    map.flyTo({center: [0, 38.907] , zoom : zlevel})
}

const searchCountry = () => {
    fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
            data.forEach(element =>{
                if(element.country.toLowerCase() == inputVal.value.toLowerCase()){
                    zlevel = 3
                    map.flyTo({center: [element.countryInfo.long , element.countryInfo.lat] , zoom : zlevel})
                }
            })
        })
}
