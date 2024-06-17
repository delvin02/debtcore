declare module '*.vue' {
	import { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

declare module 'vuex' {
	export * from 'vuex/types/index.d.ts'
	export * from 'vuex/types/helpers.d.ts'
	export * from 'vuex/types/logger.d.ts'
	export * from 'vuex/types/vue.d.ts'
}

import '@tanstack/vue-table'
declare module '@tanstack/vue-table' {
	interface ColumnMeta<TData extends RowData, TValue> {
		title: string
	}


	// For image files
declare module '*.png' {
  const content: string;
  export default content;
}

// You can add more declarations for other file types as needed
declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}
}
