import { IOption } from 'ng-select';

export class Category implements IOption {
name: string;
value: string;
label: string;

/**
 *
 */
constructor(label: string, value: string) {
  this.label = label;
  this.value = value;
}
}
