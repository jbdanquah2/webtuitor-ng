import { Injectable } from "@angular/core";

@Injectable() 
export class HowtoService {
    getHowtos() {
        return Howtos;
    }
    getHowto(id:number) {      
        return Howtos.find(howto => howto.id == id)
    }
}

const Howtos = [
    {
        id: 1,
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
        name: 'How to grade your students with Microsoft Excel',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '27th Jan, 2020',
        totalTime: '2.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    }


];