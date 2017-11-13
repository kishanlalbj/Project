import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';

@Injectable()
export class CsvgeneratorService {

  constructor(private http:Http) { }

  downloadFile(data){

    let csvContent ="";
    data.forEach(function(rowArray){
       let row = rowArray.join(",");
       csvContent += row + "\n";
    }); 

    let blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
    dwldLink.setAttribute("target", "_blank");
}
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", "generated.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
}

}
