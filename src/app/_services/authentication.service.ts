﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>('http://localhost:4000/authenticate', { username, password })
            .pipe(map(user => {
                console.log(user)
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        console.log( this.currentUserSubject.value)
        // remove user from local storage to log user out
        var username=this.currentUserSubject.value.username
        return this.http.post<any>('http://localhost:4000/signout', {username})
            .pipe(map(user => {
       console.log(user)
       if(user){
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
       }
        
            }))
    }
}