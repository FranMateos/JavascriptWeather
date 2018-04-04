class DatosTiempo{
    
    constructor(fecha, fecha_segundos, descripcion, tmin, tmax, humedad, presion, viento, dir_viento, imagen){
        this.fecha = fecha;
        this.fecha_segundos = fecha_segundos;
        this.descripcion = descripcion;
        this.tmin = tmin;
        this.tmax = tmax;
        this.humedad = humedad;
        this.presion = presion;
        this.viento = viento;
        this.dir_viento = dir_viento;
        this.imagen = imagen;
    }
    getDia(){
        return this.fecha.split("-")[2].toString().split(",")[0].toString();
    }
    getMes(){
        return this.fecha.split("-")[1];
    }
    getAnyo(){
        return split("-", this.fecha)[0];
    }
    getNombreDia(){
        var d = new Date(this.fecha_segundos * 1000);
        return d.toLocaleString(navigator.language, {weekday: "long"});
    }
    getNombreMes(){
        var d = new Date(this.fecha_segundos * 1000);
        return d.toLocaleString(navigator.language, {month: "long"});
    }
    getDirViento(){
        var dir = this.dir_viento;
        var res = "";
        if(dir == 0){
            res = 'N';
        }else if(dir>=0 && dir<90){
            res = 'NE';
        }else if (dir==90) {
            res = 'E';
        }else if (dir>90 && dir<180) {
            res = 'SE';
        }else if (dir==180) {
            res = 'S';
        }else if (dir>180 && dir<270) {
            res = 'SO';
        }else if (dir==270) {
            res = 'O';
        }else if (dir>270 && dir<360) {
            res = 'NO';
        }
        return res;
    }
}
