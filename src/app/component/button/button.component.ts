import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() btnName: string;
  @Input() className: string;
  @Input() btnColor: string = 'white';
  @Output() btnClick = new EventEmitter();
  isLoading: boolean;

  constructor() {
    this.isLoading = false;
  }

  ngOnInit(): void {}

  onClick() {
    this.btnClick.emit();
  }
}
