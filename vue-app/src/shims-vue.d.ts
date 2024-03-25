declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


import '@tanstack/vue-table'
declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    title: string
  }
}