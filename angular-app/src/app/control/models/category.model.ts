export type OperationTypeCode = 'profit' | 'consumption';

export interface Category {
  idCategory: number;
  type: OperationTypeCode;
  name: string;
  selected: boolean;
}
