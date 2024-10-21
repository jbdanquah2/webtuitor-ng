import { Injectable } from '@angular/core';
import {firstValueFrom, Subject} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AuthService} from '../user/auth.service';

@Injectable()
export class HowtoService {

  howtos: any[] = [];

  constructor(private httpClient: HttpClient,
              private authService: AuthService) {

  }

  async createHowto(howto: any, file: File) {
    try {
      const formData = new FormData();

      formData.append('title', howto.title);
      formData.append('description', howto.description);
      formData.append('url', howto.url);
      formData.append('category', howto.category);
      formData.append('related', howto.related || 0);
      formData.append('content', howto.content);
      formData.append('tags', howto.tags);
      formData.append('totalTime', howto.totalTime);
      formData.append('user', this.authService.currentUser.id.toString());

      if (file) {
        formData.append('file', file);
      }

      console.log(':::FormData', formData);

      // Send the form data via POST request
      const response = await firstValueFrom(this.httpClient.post<any>(environment.api.createHowto, formData));

      if (response?.id) {
        console.log('Howto created successfully');
        return response;
      } else {
        console.log('Howto creation failed', response);
        return null;
      }
    } catch (error) {
      console.log('Howto creation failed', error);
      return null;
    }
  }

  async editHowto(id: any, howto: any, file: File) {

    console.log('Service Howto', howto);

    try {
      const formData = new FormData();

      formData.append('title', howto.title);
      formData.append('description', howto.description);
      formData.append('url', howto.url);
      formData.append('category', howto.category);
      formData.append('related', howto.related);
      formData.append('content', howto.content);
      formData.append('tags', howto.tags);
      formData.append('totalTime', howto.totalTime);
      formData.append('user', this.authService.currentUser.id.toString());

      if (file) {
        formData.append('file', file);
      }

      console.log(':::FormData', formData);

      // Send the form data via POST request
      const response = await firstValueFrom(this.httpClient.patch<any>(environment.api.editHowto + '/' + id, formData));

      if (response?.id) {
        console.log('Howto updated successfully');
        return response;
      } else {
        console.log('Howto update failed', response);
        return null;
      }
    } catch (error) {
      console.log('Howto update failed', error);
      return null;
    }
  }

  async deleteHowto(id: any) {
    try {
      const response = await firstValueFrom(this.httpClient.delete<any>(environment.api.deleteHowto + '/' + id));

      if (response?.affected == 1) {
        console.log('Howto deleted successfully');
        return response;
      } else {
        console.log('Howto deletion failed', response);
        return null;
      }
    } catch (error) {
      console.log('Howto deletion failed', error);
      return null;
    }
  }

  async getHowtos() {

    this.howtos = await firstValueFrom(this.httpClient.get<any>(environment.api.getHowtos));
      const subject = new Subject();

      return this.howtos;
  }

  async getHowto(id: number) {
      const howto =  await firstValueFrom(this.httpClient.get<any>(environment.api.getHowto + '/' + id));

      console.log('<><Howto', this.howtos);
      return howto;
  }

  async getRelatedHowto(id: number) {

    if (this.howtos.length === 0) {
      return await this.getHowto(id);
    }

    return this.howtos.find(howto => howto.id == +id);
  }

}

const Howtos = [
    {
        id: 1,
        link: 'how-to-create-your-api-with-nodejs-and-express',
        name: 'How to create your API with Nodejs and Express',
        related: 5,
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '20th Oct, 2020',
        created_by: 'Simons Gyabeng',
        totalTime: '2 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis?
        Illum maiores cum dolorum error sit odit.`,
        content:+ '',
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
        link: 'creating-your-first-webpage',
        name: 'Creating your first webpage',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '9th Sept, 2019',
        related: 1,
        created_by: 'Simons Gyabeng',
        totalTime: '4 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis?
        Illum maiores cum dolorum error sit odit.`,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                fringilla. Donec lacinia congue felis in faucibus`
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
        link: 'how-to-create-a-image-compressor-with-nodejs-and-express',
        name: 'How to create a image compressor with Nodejs and Express',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '10th Jan, 2020',
        related: 1,
        created_by: 'Simons Gyabeng',
        totalTime: '3.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis?
        Illum maiores cum dolorum error sit odit.`,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                fringilla. Donec lacinia congue felis in faucibus`
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
        link: 'how-to-grade-your-students-with-microsoft-excel',
        name: 'How to grade your students with Microsoft Excel',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '27th Jan, 2020',
        related: 8,
        created_by: 'Simons Gyabeng',
        totalTime: '2.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis?
     Illum maiores cum dolorum error sit odit.`,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                fringilla. Donec lacinia congue felis in faucibus`
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
        id: 5,
        link: 'consuming-rest-apis-webapp',
        name: 'consuming REST APIs - webapp',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '20th Oct, 2020',
        related: 3,
        created_by: 'Simons Gyabeng',
        totalTime: '2 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis?
        Illum maiores cum dolorum error sit odit.`,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                fringilla. Donec lacinia congue felis in faucibus`
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
        id: 6,
        link: 'building-a-javascript-develoment-environment',
        name: 'building a javascript develoment environment',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '9th Sept, 2019',
        related: 1,
        created_by: 'Simons Gyabeng',
        totalTime: '4 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis?
        Illum maiores cum dolorum error sit odit.`,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                fringilla. Donec lacinia congue felis in faucibus`
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
        link: 'angular-fundamentals-with-complete-project',
        name: 'angular fundamentals - with complete project',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '10th Jan, 2020',
        related: 2,
        created_by: 'Simons Gyabeng',
        totalTime: '3.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis?
        Illum maiores cum dolorum error sit odit.`,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                fringilla. Donec lacinia congue felis in faucibus`
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
        link: 'Step by Step guide to learning Microsoft Powerpoint',
        name: 'Step by Step guide to learning Microsoft Powerpoint',
        img: '../../../assets/img/undraw_developer_activity_bv83.svg',
        published: '27th Jan, 2020',
        related: 4,
        created_by: 'Simons Gyabeng',
        totalTime: '2.5 hours',
        description: `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, perspiciatis?
     Illum maiores cum dolorum error sit odit.`,
        content: '',
        comments: [
            {
                id: 1,
                image: '../../../assets/img/passport-2.jpg',
                name: 'Kofi Yeboah',
                comment: `Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
                Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate
                fringilla. Donec lacinia congue felis in faucibus`
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
