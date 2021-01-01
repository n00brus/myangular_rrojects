import { Category } from '../models/category.model';
export const allCategories: Category[] = [
  {
    idCategory: 1,
    type: 'consumption',
    name: 'Бензин',
    selected: false,
  },
  {
    idCategory: 2,
    type: 'consumption',
    name: 'Еда',
    selected: false,
  },
  {
    idCategory: 3,
    type: 'consumption',
    name: 'Интернет',
    selected: false,
  },
  {
    idCategory: 4,
    type: 'profit',
    name: 'Зарплата',
    selected: false,
  },
  {
    idCategory: 5,
    type: 'profit',
    name: 'Зарплата 2',
    selected: false,
  },
  {
    idCategory: 6,
    type: 'profit',
    name: 'Премия',
    selected: false,
  },
];
