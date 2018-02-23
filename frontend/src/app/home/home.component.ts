import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(public http:Http, private router: Router) { }

    ngOnInit() {
    }

    onRaffle() {
        let promise = new Promise((resolve, reject) => {
            this.http
                .get('http://localhost:3000/api/raffle')
                .toPromise()
                .then(
                    res => { // Success
                        this.router.navigate(['/list']);
                        resolve();
                    },
                    msg => { // Error
                        reject(msg);
                    })
        });
        
        /* .subscribe(data => {
            if (data['status'] == 200) {
                this.router.navigate(['/list']);
            }
        }); */
    }

}
