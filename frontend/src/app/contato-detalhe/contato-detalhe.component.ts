import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient } from '@angular/common/http';
import { Person } from '../model/person';

@Component({
  selector: 'app-contato-detalhe',
  templateUrl: './contato-detalhe.component.html',
  styleUrls: ['./contato-detalhe.component.css']
})
export class ContatoDetalheComponent implements OnInit {

    id: String;
    scription: Subscription;
    person: Person;

    constructor(private route:ActivatedRoute,public http:HttpClient, private router: Router ) { }

    ngOnInit() {
        this.scription =  this.route.params.subscribe((params: any) => {
            this.id = params['id'];
            this.getData();
        });
    }

    ngOnDestroy() {
        this.scription.unsubscribe();
    }

    getData() {
        this.getConfig().subscribe(data => {
            this.person = { 
                ...data 
            }
        });
    }

    getConfig() {
        return this.http.get<Person>('http://localhost:3000/api/search?id=' + this.id);
    }

    onSend() {
        this.http
        .post('http://localhost:3000/api/edit', this.person)
        .subscribe(data => {
            if (data['success'] == true) {
                this.router.navigate(['/list']);
            }
        });
    }

    onClear(): void {
        this.router.navigate(['/list']);
    }
}
