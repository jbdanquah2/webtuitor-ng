import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable() 
export class MentorService {
    getMentors() {
        let subject = new Subject()
        setTimeout(() => {
            subject.next(Mentors);
            subject.complete();
        },100)
        return subject; 
    }
}


const Mentors = [
    {
        id: 1,
        link: 'emmanuel-osei-mensah',
        name: 'Emmanuel Osei Mensah',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        field: 'Web front-end engineering',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 2,
        link: 'john-akwasi-wusu',
        name: 'john akwasi wusu',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        field: 'full stack developer - web',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 3,
        link: 'jeffery-arthur',
        name: 'jeffery-arthur',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        field: 'DevOps',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 4,
        link: 'frank-duah-simons',
        name: 'frank duah simons',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        field: 'Cloud Engineering',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 5,
        link: 'steve-jones',
        name: 'Steve Jones',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        field: 'software engineering',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 6,
        link: 'mark-zurkerberg',
        name: 'mark zurkerberg',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        field: 'facebook expert :)',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 7,
        link: 'ernestina-danquah-boateng',
        name: 'ernestina d. boateng',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        field: 'career counseling',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 8,
        link: 'bismark-arthur',
        name: 'bismark arthur',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        field: 'machine learning',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    }
];