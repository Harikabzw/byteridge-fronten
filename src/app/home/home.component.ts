﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' ,styleUrls:['home.component.css']})
export class HomeComponent implements OnInit, OnDestroy {
    currentUser: User;
    currentUserSubscription: Subscription;
    users: User[] = [];

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService,private router:Router
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
      
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }
    logout() {
        this.authenticationService.logout().subscribe((res:any)=>{
            console.log(res)
           
                this.router.navigate(['login']);
        
           
        })
      
     //   this.router.navigate(['/login']);

    }
   
}