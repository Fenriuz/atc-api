import { Meal } from 'src/api/meals/meals.schema';

export class Section {
  readonly displayName?: string;
  readonly description?: string;
  readonly meals?: Meal[];
}
