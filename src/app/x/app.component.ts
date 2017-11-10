import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';

import {Http, Response} from '@angular/http';

import {Subject} from 'rxjs/Rx';

import {Observable} from 'rxjs/Observable';
// import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import 'rxjs/add/operator/map';

class Person {
  id: number;
  firstName: string;
  lastName: string;
}

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild(DataTableDirective)
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  codigo: string;
  firstName: string;

  persons: Person[] = [];

  private searchTerms = new Subject<string>();

  dtTrigger: Subject<Person> = new Subject();

  constructor(private http: Http) {
  }


  ngOnInit(): void {

    const _self = this;

    this.dtOptions = {
      dom: 'lrtip',
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: false,
      serverSide: false,
      // ajax: {
      //   url: 'https://l-lin.github.io/angular-datatables/data/data.json',
      //   data: function datos(data: any) {
      //
      //     data.codigo = _self.codigo;
      //     data.firstName = _self.firstName;
      //
      //
      //     for (let i = 0; i < data.columns.length; i++) {
      //       const column = data.columns[i];
      //       column.searchRegex = column.search.regex;
      //       column.searchValue = column.search.value;
      //       delete(column.search);
      //     }
      //   },
      //   complete: function () {
      //   }
      // },
      initComplete: function () {
      },
      // columns: [{
      //   title: 'ID',
      //   data: 'id'
      // }, {
      //   title: 'First name',
      //   data: 'firstName'
      // }, {
      //   title: 'Last name',
      //   data: 'lastName'
      // }]
    };

    this.http.get('https://l-lin.github.io/angular-datatables/data/data.json')
      .map(this.extractData)
      .subscribe(persons => {
        this.persons = persons;
        // Calling the DT trigger to manually render the table
        this.dtTrigger.next();
      });

    this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term =>
        Promise.resolve(term))
      .subscribe(val => {
        this.codigo = val;
        this.search();
      }, error => {
        console.log(error);
        return null;
      });

  }


  private extractData(res: Response) {
    const body = res.json();
    return body.data || {};
  }

  search2(term: string): void {
    this.searchTerms.next(term);
  }

  search(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });

  }

  ngAfterViewInit(): void {

    // this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
    //   dtInstance.columns().every(function () {
    //     const that = this;
    //     $('input', this.header()).on('keyup change', function () {
    //       if (that.search() !== this['value']) {
    //         that.search(this['value']).draw();
    //       }
    //     });
    //   });
    // });

  }
}
