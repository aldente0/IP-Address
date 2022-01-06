import "core-js/stable";
import "regenerator-runtime/runtime";

import 'leaflet/dist/leaflet.css';
import L from'leaflet';

import {addTileLayer, validateIpRequest, addOffset} from "./helpers";

import icon from '../images/icon-location.svg';

// глобалы
const btnSearch = document.querySelector('.search-bar__btn');
const input = document.querySelector('.search-bar__input');

const markerIcon = L.icon ({
    iconUrl: icon,
    iconSize: [30, 40],
});

const mapArea = document.querySelector('.map');
const map = L.map(mapArea, {
    center: [51.505, -0.09],
    zoom: 13,/* 
    paddingTopLeft: [40, 0], */
});

addTileLayer(map);
L.marker([51.505, -0.09], {icon: markerIcon}).addTo(map);

btnSearch.addEventListener('click', handleClick);
input.addEventListener('keydown', handleKey);

function handleClick() {
    getInfo();
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getInfo();
    }
}

function getInfo() {
    if (!validateIpRequest(input.value)) {
        alert('incorrect ip');
        return;
    }

    getAddress(input.value)
        .then(printInfoOnScreen)
}

function printInfoOnScreen(ipInfo) {
    const ip = document.querySelector('#ip');
    ip.innerText = ipInfo.ip;

    const location = document.querySelector('#location');
    location.innerText = ipInfo.location.country + ' ' + ipInfo.location.region + ' ' + ipInfo.location.city;

    const timezone = document.querySelector('#timezone');
    timezone.innerText = ipInfo.location.timezone;

    const isp = document.querySelector('#isp');
    isp.innerText = ipInfo.isp;

    map.setView([ipInfo.location.lat, ipInfo.location.lng]);
    L.marker([ipInfo.location.lat, ipInfo.location.lng], {icon: markerIcon}).addTo(map);

    if (window.matchMedia("(max-width: 1023px)").matches) {
        addOffset(map);
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    getAddress('123.43.4.32')
        .then(printInfoOnScreen);
});

async function getAddress(ip) {
    const response = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_0PVNPb9DdC158qkQ8MQGFTYa7Tw1B&ipAddress=` + ip);
    
    return await response.json();
}