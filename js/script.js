// import DatosTiempo from './DatosTiempo.js';
(function () {
    listado = new Array();
    getLocation();
})();

$(document).ready(function () {
    $("#share-buttons").hide();
    $("#share").click(function () {
        $("#share-buttons").toggle(1000);
    });
});

function gettingJSON(url) {
    $.getJSON(url, function (json) {
        mostrarTexto(json);
    });
}

function getLocation() {
    var url = "";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=a1368d1644fb7446515b0584bbe3c729&units=metric&lang=es`;
            gettingJSON(url);
        });
    } else {
        url = "http://api.openweathermap.org/data/2.5/forecast?q=Madrid,es&appid=a1368d1644fb7446515b0584bbe3c729&units=metric";
        gettingJSON(url);
    }
}

function conexion(ciudad) {
    alert("Hola");
    var data = null;
    var requestURL = "http://api.openweathermap.org/data/2.5/forecast?q="
            + ciudad + ",es&appid=a1368d1644fb7446515b0584bbe3c729";
    // 
    var request = new XMLHttpRequest();
    request.open('GET', requestURL, true);
    // request.responseType = "json";
    request.onload = function () {
        data = JSON.parse(this.response);
        alert("Data vale: " + data);
        if (request.status >= 200 && request.status < 400) {
            mostrarTexto(response['list'].toString());
        } else {
            // reject(status);
            console.log("Entra en el else");
        }
    }
    request.send();
}

function mostrarTexto(data) {
    var lista = data.list;
    var sum = 0;
    for (var i = 0, max = lista.length; i < max; i += 8) {
        var date = data.list[i].dt_txt.toString().split(" ").toString();
        var dateSeconds = data.list[i].dt;
        var descripcion = data.list[i].weather[0].description;
        var tmin = data.list[i].main.temp_min;
        var tmax = data.list[i].main.temp_max;
        var hum = data.list[i].main.humidity;
        var pres = data.list[i].main.pressure;
        var viento = data.list[i].wind.speed;
        var dir_viento = data.list[i].wind.deg;
        var imagen = data.list[i].weather[0].icon;
        var tiempo = new DatosTiempo(date, dateSeconds, descripcion, tmin, tmax, hum, pres, viento, dir_viento, imagen);
        rellenarListado(tiempo, sum);
        sum++;
    }
}

function rellenarListado(tiempo, ele) {
    if (tiempo instanceof  DatosTiempo) {
        var res = document.getElementById("resultado");
        var li = document.createElement("li");
        var pa = document.createElement("a");
        li.textContent = tiempo.getNombreDia() + ", " + tiempo.getDia() + " de " + tiempo.getNombreMes()
                + " - " + tiempo.descripcion + " - " + tiempo.tmin + "/" + tiempo.tmax;
        pa.href = "#";
        li.id = ele;
        li.onclick = saberPulsado;
        pa.appendChild(li);
        res.appendChild(pa);
        listado.push(tiempo);
    }

}

function saberPulsado(event) {
    var pulsado = event.target.id;
    console.log("Está pulsado: " + pulsado);
    cargarDatos(pulsado);
}

function cargarDatos(numero) {
    var tiempo = listado[numero];
    document.getElementById("imagen").src = "http://openweathermap.org/img/w/" + tiempo.imagen + ".png";
    var ul = document.getElementById("seleccionado");
    ul.innerHTML = "";
    var lis = [];
    lis[0] = document.createElement("li");
    lis[0].textContent = tiempo.getNombreDia() + ", " + tiempo.getDia() + " de " + tiempo.getNombreMes();
    lis[1] = document.createElement("li");
    lis[1].textContent = "Máxima " + tiempo.tmax + "º";
    lis[2] = document.createElement("li");
    lis[2].textContent = "Mínima " + tiempo.tmin + "º";
    lis[3] = document.createElement("li");
    lis[3].textContent = "Humedad: " + tiempo.humedad + " %";
    lis[4] = document.createElement("li");
    lis[4].textContent = "Viento: " + tiempo.viento + " " + tiempo.getDirViento();
    lis[5] = document.createElement("li");
    lis[5].textContent = "Presión: " + tiempo.presion + " hPa";
    lis[6] = document.createElement("li");
    lis[6].textContent = tiempo.descripcion;
    for (var i = 0; i < lis.length; i++) {
        ul.appendChild(lis[i]);
    }
}




