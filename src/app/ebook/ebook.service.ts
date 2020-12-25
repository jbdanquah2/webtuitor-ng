import { Injectable } from "@angular/core";

@Injectable()
export class EbookService {
    getEbooks() {
        return Ebooks;
    }
    getEbook(link:string) {      
        return Ebooks.find(ebook => ebook.link == link)
    }
}

const Ebooks = [
    {
        id: 1,
        link: 'javascript-the-good-parts',
        name: 'JavaScript the good parts',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '4th Aug, 2004',
        recommended: 3,
        totalTime: '5 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        `,
        content: '',
        license:'free',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`,
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            }
        ]
    },
    {
        id: 2,
        link: 'basics-of-vuejs',
        name: 'Basics of Vuejs',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '1th Sept, 2012',
        recommended: 1,
        totalTime: '1.45 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        `,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`,
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            }
        ]

    },
    {
        id: 3,
        link: 'think-and-grow-rich',
        name: 'Think and grow rich',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '9th Jun, 1990',
        recommended: 4,
        totalTime: '4.5 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur  
        Illum maiores cum dolorum error sit odit.`,
        content: '',
        license:'free',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`,
                
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            }
        ]

    },
    {
        id: 4,
        link: 'starting-a-new-online-business',
        name: 'Starting a new online business',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '21st Mar, 2015',
        recommended: 3,
        totalTime: '2.5 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur 
     Illum maiores cum dolorum error sit odit.`,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`,
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    },
                   
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
           
        ]

    },
    {
        id: 5,
        link: 'working-with-a-bad-boss',
        name: 'Working with a bad Boss',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '4th Aug, 2004',
        recommended: 3,
        totalTime: '5 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        `,
        content: '',
        license:'free',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`,
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
           
        ]

    },
    {
        id: 6,
        link: 'how-to-success-in-software-engineering-career',
        name: 'How to Success in Software Engineering Career',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '1th Sept, 2012',
        recommended: 5,
        totalTime: '1.45 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis? 
        `,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`,
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    },
                    {
                        id: 2,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Sarah Osei',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    }
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            }
        ]

    },
    {
        id: 7,
        link: 'the-man-that-lived-again',
        name: 'The man that lived again',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '9th Jun, 1990',
        recommended: 3,
        totalTime: '4.5 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur  
        Illum maiores cum dolorum error sit odit.`,
        content: '',
        license:'free',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`,
                subcomments: [
                    
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            }
        ]

    },
    {
        id: 8,
        link: 'growing-your-business-mind',
        name: 'Growing your business mind',
        img: '../../../assets/img/undraw_reading_0re1.svg',
        published: '21st Mar, 2015',
        recommended: 3,
        totalTime: '2.5 hours read',
        description: `Lorem ipsum, dolor sit amet consectetur 
     Illum maiores cum dolorum error sit odit.`,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`,
                subcomments: [
                    {
                        id: 1,
                        image: '../../../assets/img/passport-2.jpg',
                        name: 'Kwame Boateng',
                        comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                        Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                        fringilla. Donec lacinia congue felis in faucibus`
                    },
                ]
            },
            {
                id: 2,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kwame Boateng',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 3,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Sarah Osei',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            },
            {
                id: 4,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Enoch Duah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. 
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate 
                fringilla. Donec lacinia congue felis in faucibus`
            }
        ]

    }



];