import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Person } from '../model/person';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    
    person: any[] ;

    people: Person[];
    
    constructor(public http:Http) { }
   
    ngOnInit() { }


    ngAfterContentInit() {
        this.getData();
    }

    getData() {
        this.getConfig()
        .subscribe(data => { 
            this.people = [
                ...data
            ]
        });
    }

    getConfig() {
        return this.http.get('http://localhost:3000/api/')
        .map(data => data.json());
    }

    onDelete(person): void {
        this.http
            .post('http://localhost:3000/api/delete', person)
            .subscribe(data => {
                if (data.status == 200) {
                    this.getData();
                }
            });
    }
}
