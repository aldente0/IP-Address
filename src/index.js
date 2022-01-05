import "core-js/stable";
import "regenerator-runtime/runtime";
import {validateIpRequest} from "./helpers";

// глобалы
const btnSearch = document.querySelector('.search-bar__btn');
const input = document.querySelector('.search-bar__input');

// обработчики
btnSearch.addEventListener('click', handleClick);
input.addEventListener('keydown', handleKey);

// функции для обработчиков
function handleClick() {
    checkGetPrintInfo();
}

function handleKey(e) {
    if (e.key == 'Enter') {
        checkGetPrintInfo();
    }
}

function checkGetPrintInfo() {
    if (!validateIpRequest(input.value)) {
        alert('incorrect ip');
        return;
    }

    getInfoByIp(input.value)
        .then((ipInfo) => {
            printOnScreen(ipInfo);
        }
    )
}

// вывод данных на экран
function printOnScreen(ipInfo) {
    const ip = document.querySelector('#ip');
    ip.innerText = ipInfo.ip;

    const location = document.querySelector('#location');
    location.innerText = ipInfo.location.country + ', ' + ipInfo.location.region;

    const timezone = document.querySelector('#timezone');
    timezone.innerText = ipInfo.location.timezone;

    const isp = document.querySelector('#isp');
    isp.innerText = ipInfo.isp;
}


// запросы
async function getInfoByIp(ip) {
    try {
        const response = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_0PVNPb9DdC158qkQ8MQGFTYa7Tw1B&ipAddress=` + ip);
        const ipInfo = await response.json();

        return ipInfo;
    } catch(error) {
        console.error(error.message);
    }
}