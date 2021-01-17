import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable()
export class MentorService {
    
    url = 'https://api.github.com/users';
    newMentors: any;
    getMentors() {
        let subject = new Subject()
        fetch(this.url)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        subject.next(data);
                        subject.complete();
                        console.log('John',data);
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
                
            });

        return subject;
    }
    getMentor(login: string) {
        let subject = new Subject()
        console.log('heer: '+ login + ' love');
        
        fetch(`${this.url}/${login}`)
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    response.json().then(function (data) {
                        subject.next(data);
                        subject.complete();
                        // console.log('Johnny boy',data);
                        // return data
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });

        return subject;
        // return Mentors.find(mentor => mentor.id == id)
    }
}


const Mentors = [
    {
        id: 1,
        link: 'emmanuel-osei-mensah',
        name: 'Emmanuel Osei Mensah',
        img: '../../../assets/img/passport-1.jpg',
        field: 'Web frontend engineering',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 2,
        link: 'john-akwasi-wusu',
        name: 'john akwasi wusu',
        img: '../../../assets/img/passport-2.jpg',
        field: 'full stack developer - web',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 3,
        link: 'jeffery-arthur',
        name: 'jeffery-arthur',
        img: '../../../assets/img/passport-1.jpg',
        field: 'DevOps',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 4,
        link: 'frank-duah-simons',
        name: 'frank duah simons',
        img: '../../../assets/img/passport-2.jpg',
        field: 'Cloud Engineering',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 5,
        link: 'steve-jones',
        name: 'Steve Jones',
        img: '../../../assets/img/passport-1.jpg',
        field: 'software engineering',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 6,
        link: 'mark-zurkerberg',
        name: 'mark zurkerberg',
        img: '../../../assets/img/passport-2.jpg',
        field: 'facebook expert :)',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 7,
        link: 'ernestina-danquah-boateng',
        name: 'ernestina d. boateng',
        img: '../../../assets/img/passport-1.jpg',
        field: 'career counseling',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 8,
        link: 'bismark-arthur',
        name: 'bismark arthur',
        img: '../../../assets/img/passport-2.jpg',
        field: 'machine learning',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    }
];