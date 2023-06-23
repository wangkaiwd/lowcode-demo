export interface EditorComponent {
	name: string;
	styles: React.CSSProperties;
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
