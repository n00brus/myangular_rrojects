export type OperationTypeCode = 'profit' | 'consumption';

export interface Category {
  id: number;
  type: OperationTypeCode;
  name: string;
}
