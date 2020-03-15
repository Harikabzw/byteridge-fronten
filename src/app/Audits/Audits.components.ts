import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'Audits.component.html' ,styleUrls:['Audits.component.css']})
export class AuditsComponent implements OnInit, OnDestroy {
    currentUser: any;
    currentUserSubscription: Subscription;
    users: User[] = [];
    audits: any;
first=0;
    auditsCount: any;
    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUserSubscription = this.authenticationService.currentUser.subscribe((user:any) => {
            this.currentUser = user;
        });
    }

    ngOnInit() {
        console.log("audit",this.currentUser.role)
        this.loadAllUsers({page:1,limit:6,role:this.currentUser.role});
    }

    ngOnDestroy() {
        // unsubscribe to ensure no memory leaks
        this.currentUserSubscription.unsubscribe();
    }

    deleteUser(id: number) {
        this.userService.delete(id).pipe(first()).subscribe(() => {
            this.loadAllUsers({page:1,limit:6,role:this.currentUser.role});
        });
    }

    private loadAllUsers(data) {
        console.log(data);
        this.userService.getAudits(data).pipe(first()).subscribe((audits:any) => {
            console.log(audits)
            this.audits = audits||audits!=null?audits.audits:[];
            this.auditsCount=audits||audits!=null?audits.totalAudits:0
        });
    }
    setPage(event){
       // this.loader=true
        console.log(event)
        this.loadAllUsers({page:event.page+1,limit:6,role:this.currentUser.role})
      }
}