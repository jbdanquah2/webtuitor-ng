import { Injectable } from "@angular/core";
import { IUser } from "./user.model";

@Injectable() 
export class AuthService {
    currentUser:IUser
    isAuthenticated = false
    loginUser(userName: string, password:string) {
        console.log('from authService: ',userName);
        
        this.currentUser = {
            id: 1,
            firstName: '',
            lastName: '',
            userName: userName,
            password: password,
            confirmPassword: password

        }
        this.checkAuthentication()
    }

    checkAuthentication() {
        this.isAuthenticated = true;
    }
    

    updateCurrentUser(firstName:string, lastName:string, userName:string, password:string){
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
        this.currentUser.userName = userName
        this.currentUser.password = password

    }
}