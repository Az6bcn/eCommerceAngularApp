import { Product } from './../Models/Product';
import { Component, OnInit, Input } from '@angular/core';
import { database } from 'firebase';

@Component({
  selector: 'app-bootstrap-card',
  templateUrl: './bootstrap-card.component.html',
  styleUrls: ['./bootstrap-card.component.css']
})
export class BootstrapCardComponent implements OnInit {

  @Input() data: Product;
  @Input() showButton: boolean;


  constructor() { }

  ngOnInit() {
  }

}
