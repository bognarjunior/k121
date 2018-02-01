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
        this.http
        .get('http://localhost:3000/api/raffle')
        .subscribe(data => {
            if (data['status'] == 200) {
                this.router.navigate(['/list']);
            }
        });
    }

}
