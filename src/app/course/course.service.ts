import { Injectable } from "@angular/core";

@Injectable()
export class CourseService {
    getCourses() {
        return Courses;
    }
    getCourse(link:string) {      
        return Courses.find(course => course.link == link)
    }
}

const Courses = [
    {
        id: 1,
        link: 'angular-2',
        name: 'Angular 2',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '20th Oct, 2020',
        totalTime: '2 hours',
        description: `In this series, you'll learn how to use React Native to create page layouts commonly 
        used in mobile apps. The layouts you'll be creating won't be functional—instead, the main focus of 
        this series is to get your hands dirty in laying out content in your React Native apps`,
        created_by:'yjbdanquah',
        level:'Beginner',
        tags:'web develpment, web design, angular, frameworks, javascript, javascript frameworks',
        related:'Angular Routes',
        content: `Getting Started

        In this tutorial, we will use the Expo CLI. Expo is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript or TypeScript codebase. 
        
        Expo is the easiest and fastest way to build React Native apps. The official Expo get started guide contains detailed instructions on how to download and configure Expo CLI for the major operating systems.
        
        Create a new project
        1
            
        expo init LoginLayout
        
        You will be prompted to choose the type of project to initialize. Choose Managed workflow and blank. Wait a few seconds for Expo to install the project files and change the directory into the new project.
        1
            
        cd LoginLayout
        
        The project structure should look like this. `
    },
    {
        id: 2,
        link: 'vuejs',
        name: 'Vuejs',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '9th Sept, 2019',
        totalTime: '4 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 3,
        link: 'react-native-basis',
        name: 'React Native',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '10th Jan, 2020',
        totalTime: '3.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 4,
        link: 'nodejs-basis',
        name: 'Node.Js',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '27th Jan, 2020',
        totalTime: '2.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 1,
        link: 'getting-started-with-angular-6',
        name: 'Getting started with Angular 6',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '20th Oct, 2020',
        totalTime: '2 hours',
        description: `In this series, you'll learn how to use React Native to create page layouts commonly 
        used in mobile apps. The layouts you'll be creating won't be functional—instead, the main focus of 
        this series is to get your hands dirty in laying out content in your React Native apps`,
        created_by:'yjbdanquah',
        level:'Beginner',
        tags:'web develpment, web design, angular, frameworks, javascript, javascript frameworks',
        related:'Angular Routes',
        content: `Getting Started

        In this tutorial, we will use the Expo CLI. Expo is a set of tools and services built around React Native and native platforms that help you develop, build, deploy, and quickly iterate on iOS, Android, and web apps from the same JavaScript or TypeScript codebase. 
        
        Expo is the easiest and fastest way to build React Native apps. The official Expo get started guide contains detailed instructions on how to download and configure Expo CLI for the major operating systems.
        
        Create a new project
        1
            
        expo init LoginLayout
        
        You will be prompted to choose the type of project to initialize. Choose Managed workflow and blank. Wait a few seconds for Expo to install the project files and change the directory into the new project.
        1
            
        cd LoginLayout
        
        The project structure should look like this. `
    },
    {
        id: 2,
        link: 'javaScript-es6-sis',
        name: 'JavaScript ES6 Basis',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '9th Sept, 2019',
        totalTime: '4 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 3,
        link: 'all-about-java-8',
        name: 'All About Java 8',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '10th Jan, 2020',
        totalTime: '3.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        Illum maiores cum dolorum error sit odit.`,
        content: ''
    },
    {
        id: 4,
        link: 'working-express-nodejs-and-mongoDb',
        name: 'Working Express Nodejs and MongoDb',
        img: '../../../assets/img/undraw_coding_6mjf.svg',
        published: '27th Jan, 2020',
        totalTime: '2.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
     Illum maiores cum dolorum error sit odit.`,
        content: ''
    }

];