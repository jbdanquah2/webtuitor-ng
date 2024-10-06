import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {jwtDecode} from 'jwt-decode';
import {environment} from '../../environments/environment';

interface LoginResponse {
  message: string
  status: number
  access_token: string
}
@Injectable()
export class AuthService {

    milliSecondsInADay : number = 24 * 60 * 60 * 1000;

    isSecure = true;

    allowedDays = 30;

    expires = new Date(Date.now() + this.allowedDays * this.milliSecondsInADay);

    currentUser:IUser

    isAuthenticated = false;

    jwtToken: string;

    constructor(
      private httpClient: HttpClient
    ) {

    }

    async createUser(formValues: any) {

      const {name, email, password} = formValues;

      try {

        const body = {
          name: name,
          email: email,
          password: password,
          role: 'student'
        }

        const user = await firstValueFrom(this.httpClient.post<any>(environment.api.createUser, body))

        if (user?.id) {
          console.log('User created successfully');

          return await this.loginUser(email, password);

        } else {
          console.log('User creation failed', user);

          return null;
        }

      } catch (error) {

        console.log('Error creating user', error);

        return null;
      }
    }

    async loginUser(email: string, password:string) {

     try {

       const body = {
         email: email,
         password: password
       }

       const login = await firstValueFrom(this.httpClient.post<LoginResponse>(environment.api.login, body))

       if (login?.status === 200) {

         console.log('Login successful; access_token::', login.access_token)

         const decodedToken: any = jwtDecode(login.access_token);

         this.currentUser = {
           id: decodedToken.id,
           name: decodedToken.name,
           email: decodedToken.email,
         }

         this.setAuthentication(true);

         this.jwtToken = login.access_token;

         return login.access_token;

       } else {

         console.log('Login failed');

         this.setAuthentication(false);

         return null
       }

     } catch (error) {

        console.log('Error logging in user', error);

        return null;
     }
    }

    setAuthentication(state) {
        this.isAuthenticated = state;
    }


    async updateCurrentUser(name: string, userName:string, password:string, access_token: string) {

      this.jwtToken = access_token;

      console.log('#jwt', this.jwtToken)

      try {

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.jwtToken}`,
          'Content-Type': 'application/json'
        })

        this.currentUser.name = name
        this.currentUser.email = userName
        this.currentUser.password = password || this.currentUser.password

        const update = await firstValueFrom(
          this.httpClient.patch<any>(
            `${environment.api.updateUser}/${this.currentUser.id}`,
            this.currentUser,
         {headers}
      ))

        if (update?.id) {
          console.log('User updated successfully');

          return await this.loginUser(this.currentUser.email, password);
        } else {
          console.log('User update failed', update);
          return null;
        }

      } catch (error) {

        console.log('Error updating user profile', error);

        return null;

      }

    }
}
