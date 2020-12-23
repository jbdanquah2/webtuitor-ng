import { Injectable } from "@angular/core";

@Injectable() 
export class StringService {

    concatString(s,n) {
        var cut= s.indexOf(' ', n);
        if(cut== -1) return s;
        return s.substring(0, cut)+'...'
    }
    capitalizeFirstLetter(str) {
        return str.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
      }
}