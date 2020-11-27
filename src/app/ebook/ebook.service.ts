import { Injectable } from "@angular/core";

@Injectable()
export class EbookService {
    getEbooks() {
        return Ebooks;
    }
}

const Ebooks = [
    {
        id: 1,
        name: 'JavaScript, the good parts',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '4th Aug, 2004',
        totalTime: '5 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        `,
        content: '',
        license:'free'
    },
    {
        id: 2,
        name: 'Basics of Vuejs',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '1th Sept, 2012',
        totalTime: '1.45 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        `,
        content: ''
    },
    {
        id: 3,
        name: 'Think and grow rich',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '9th Jun, 1990',
        totalTime: '4.5 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur  
        Illum maiores cum dolorum error sit odit.`,
        content: '',
        license:'free'
    },
    {
        id: 4,
        name: 'Starting a new online business',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '21st Mar, 2015',
        totalTime: '2.5 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    }


];