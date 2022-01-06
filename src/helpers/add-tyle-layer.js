export function addTileLayer(map) {
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWxkZW50ZTAiLCJhIjoiY2t5MXZ6YzR1MGFnZDJwbnlrMmtldXBmdyJ9.SLq3t_8tLqwdjgkei_Xrtg', {
        attribution: `Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://github.com/aldente0/IP-Address">Alexey</a>.`,
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
    }).addTo(map);
}