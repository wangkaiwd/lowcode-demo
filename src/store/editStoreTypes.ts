export interface EditorComponent {
	name: string;
	style: React.CSSProperties;
}

export interface ListItem {
	group: string;
	elements: { name: string }[];
}

export interface EditorStoreState {
	components: EditorComponent[];
	list: ListItem[];
}

export interface EditorStoreAction {
	addComponent: (component: EditorComponent) => void;
}
