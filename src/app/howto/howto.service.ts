import { Injectable } from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {HttpClient} from '@angular/common/http';
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
      howto.related ? formData.append('related', howto.related) : 0;
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

