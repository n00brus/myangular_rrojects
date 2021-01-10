export type OperationTypeCode = 'profit' | 'consumption';
export interface OperationType {
  code: OperationTypeCode;
  title: string;
  // color: string;
}

export interface Category {
  id: number;
  type: OperationTypeCode;
  name: string;
}
