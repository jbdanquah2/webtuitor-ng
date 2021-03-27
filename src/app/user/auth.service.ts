import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import { HttpClient } from "@angular/common/http";

@Injectable() 
export class AuthService {
    private getUrl = 'localhost:8080/api/auth/login/'
    currentUser:IUser
    isAuthenticated = false

    constructor(private httpClient: HttpClient) {

    }

    loginUser(userName: string, password:string) {
        this.httpClient.get(`${this.getUrl}/${userName}/${password}`).subscribe(response => console.log(response));
        
        
        
        this.currentUser = {
            id: 1,
            firstName: '',
            lastName: '',
            userName: userName,
            password: password,
            confirmPassword: password
        }
        this.checkAuthentication(true)
    }

    checkAuthentication(state) {
        this.isAuthenticated = state;
    }
    

    updateCurrentUser(firstName:string, lastName:string, userName:string, password:string){
        
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
        this.currentUser.userName = userName
        this.currentUser.password = password

    }
}