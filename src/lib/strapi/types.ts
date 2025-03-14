export interface ImageFiltered {
  name: string;
  url: string;
  hash: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface DataCommon {
  id: string;
  documentId: string;
}

export interface DataOptionals {
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: string;
}

export type Image = DataCommon & ImageFiltered;

export type Data<T> = DataCommon & T & DataOptionals;

export type Meta = {
  pagination?: Pagination;
};

export type Error = {
  status: number;
};

export type QueryResponse<T> = Promise<{
  data: Data<T>;
  meta: Meta;
}>;

export type ErrorResponse = Promise<{
  data: null;
  error: Error;
}>;

export interface Api<T> {
  get: () => QueryResponse<T[]>;
  fetch: (id: string) => Promise<Data<T> | null>;
}

export interface CategoryCommons {
  nombre: string;
}

export interface CategoryIcon extends JSX.Element {
  className?: string;
}
