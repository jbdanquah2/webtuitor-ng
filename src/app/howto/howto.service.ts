import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable() 
export class HowtoService {
    getHowtos() {
        let subject = new Subject()
        setTimeout(() => {
            subject.next(Howtos);
            subject.complete();
        },100)
        return subject;
    }
    getHowto(link:string) {      
        return Howtos.find(howto => howto.link == link)
    }
    getRelatedHowto(id:number) {      
        return Howtos.find(howto => howto.id == id)
    }
}

const Howtos = [
    {
        id: 1,
        link: 'how-to-create-your-api-with-nodejs-and-express',
        name: 'How to create your API with Nodejs and Express',
        related:5,
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '20th Oct, 2020',
        created_by: 'Simons Gyabeng',
        totalTime: '2 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 2,
        link: 'creating-your-first-webpage',
        name: 'Creating your first webpage',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '9th Sept, 2019',
        created_by: 'Simons Gyabeng',
        totalTime: '4 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 3,
        link: 'how-to-create-a-image-compressor-with-nodejs-and-express',
        name: 'How to create a image compressor with Nodejs and Express',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '10th Jan, 2020',
        created_by: 'Simons Gyabeng',
        totalTime: '3.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 4,
        link: 'how-to-grade-your-students-with-microsoft-excel',
        name: 'How to grade your students with Microsoft Excel',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '27th Jan, 2020',
        created_by: 'Simons Gyabeng',
        totalTime: '2.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 5,
        link: 'consuming-rest-apis-webapp',
        name: 'consuming REST APIs - webapp',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '20th Oct, 2020',
        created_by: 'Simons Gyabeng',
        totalTime: '2 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 6,
        link: 'building-a-javascript-develoment-environment',
        name: 'building a javascript develoment environment',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '9th Sept, 2019',
        created_by: 'Simons Gyabeng',
        totalTime: '4 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 7,
        link: 'angular-fundamentals-with-complete-project',
        name: 'angular fundamentals - with complete project',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '10th Jan, 2020',
        created_by: 'Simons Gyabeng',
        totalTime: '3.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 8,
        link: 'Step by Step guide to learning Microsoft Powerpoint',
        name: 'Step by Step guide to learning Microsoft Powerpoint',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '27th Jan, 2020',
        created_by: 'Simons Gyabeng',
        totalTime: '2.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    }
];