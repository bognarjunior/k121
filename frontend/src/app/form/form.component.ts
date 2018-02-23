import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { Http } from '@angular/http';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent implements OnInit {

    constructor(public http:Http, private router: Router) { }
    
    person = new Person();
    
    ngOnInit() {
    }

    onSend(): void {
        
        this.http
            .post('http://localhost:3000/api/new', this.person)
            .subscribe(data => {
                if (data['status'] == 200) {
                    this.router.navigate(['/list']);
                }
            });
    }

    onClear(): void{
        this.person.name = undefined;
        this.person.email = undefined;
    }
}
