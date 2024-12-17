export interface OrderBy<T> {
  by: keyof T;
  direction: 'ASC' | 'DESC';
}