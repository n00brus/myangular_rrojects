import { OperationTypeCode } from './category.model';
// export interface Operation {
//   type: OperationTypeCode;
//   category: string;
//   value: number;
//   description: string;
// }
export interface Operation {
  id: number;
  idCategory: number;
  value: number;
  description: string;
}
