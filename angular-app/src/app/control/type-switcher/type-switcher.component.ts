import { rendererTypeName } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OPERATION_TYPES } from '../data/type-switcher-data';
import { OperationType, OperationTypeCode } from '../models/category.model';

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
  types = OPERATION_TYPES;

  selectType(type: OperationTypeCode): void {
    this.changeSelectedType.emit(type);
  }
  getcolor(code: OperationType) {
    if (code.code == 'consumption' && this.selectedType == code.code) {
      return 'lightcoral';
    } else if (code.code == 'profit' && this.selectedType == code.code) {
      return '#01D9F2';
    } else {
      return '#AFBFCA';
    }
  }
}
