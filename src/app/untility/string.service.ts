import { Injectable } from "@angular/core";

@Injectable() 
export class StringService {

    concatString(s,n) {
        var cut= s.indexOf(' ', n);
        if(cut== -1) return s;
        return s.substring(0, cut)+'...'
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
}