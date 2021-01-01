import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OperationTypeCode } from '../models/category.model';

@Component({
  selector: 'app-type-switcher',
  templateUrl: './type-switcher.component.html',
  styleUrls: ['./type-switcher.component.scss'],
})
export class TypeSwitcherComponent implements OnInit {
  @Input() selectedType: OperationTypeCode;
  @Output() changeSelectedType = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  selectType(type: OperationTypeCode, ev): void {
    this.changeSelectedType.emit(type);
  }
}
