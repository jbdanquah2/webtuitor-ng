import { Injectable } from "@angular/core";

@Injectable()
export class CourseService {
    getCourses() {
        return Courses;
    }
}

const Courses = [
    {
        id: 1,
        name: 'Angular 2',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '20th Oct, 2020',
        totalTime: '2 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 2,
        name: 'Vuejs',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '9th Sept, 2019',
        totalTime: '4 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 3,
        name: 'React Native',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '10th Jan, 2020',
        totalTime: '3.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 4,
        name: 'Node.Js',
        img: '../../../assets/img/undraw_laravel_and_vue_59tp.svg',
        published: '27th Jan, 2020',
        totalTime: '2.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    }


];