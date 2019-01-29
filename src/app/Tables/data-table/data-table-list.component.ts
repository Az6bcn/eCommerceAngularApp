import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table-list',
  templateUrl: './data-table-list.component.html',
  styleUrls: ['./data-table-list.component.css']
})
export class DataTableListComponent implements OnInit {
@Input() DataList: [];



  constructor() { }

  ngOnInit() {
    // console.log('Datatable input...', this.DataList);
  }


}
