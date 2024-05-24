export interface SelectList {
	id?: number
	value?: string
	label?: string
}

export interface GenericSelectListModel {
	is_loading: boolean
	is_open: boolean
	data: SelectList[]
}
