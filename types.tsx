import { Query } from "material-table"

export interface DataCtrl extends EditableCtrl {
  tableQuery: Query<any>
  query: string // gql query
}

export interface ServiceProps {
  query: string // gql query
  variables?: object
  operationName?: any
  url?: string
  prefix?: string
  headers?: any
}

export interface EditableCtrl {
  SchemaName: string
}

export interface ListQuery {
  SchemaName: string
  page: number
  pageSize: number
}

export interface InsertQuery<RowData> {
  SchemaName: string
  newData: RowData
}

export interface UpdateQuery<RowData> {
  SchemaName: string
  oldData: RowData
  newData: RowData
}

export interface DeleteQuery<RowData> {
  SchemaName: string
  oldData: RowData
}
