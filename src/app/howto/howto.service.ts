import { Injectable } from "@angular/core";

@Injectable() 
export class HowtoService {
    getHowtos() {
        return Howtos;
    }
    getHowto(link:string) {      
        return Howtos.find(howto => howto.link == link)
    }
}

const Howtos = [
    {
        id: 1,
        link: 'how-to-create-your-api-with-nodejs-and-express',
        name: 'How to create your API with Nodejs and Express',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '20th Oct, 2020',
        totalTime: '2 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 2,
        link: 'creating-your-first-webpage',
        name: 'Creating your first webpage',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '9th Sept, 2019',
        totalTime: '4 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 3,
        link: 'how-to-create-a-image-compressor-with-nodejs-and-express',
        name: 'How to create a image compressor with Nodejs and Express',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '10th Jan, 2020',
        totalTime: '3.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 4,
        link: 'how-to-grade-your-students-with-microsoft-excel',
        name: 'How to grade your students with Microsoft Excel',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '27th Jan, 2020',
        totalTime: '2.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    }


];