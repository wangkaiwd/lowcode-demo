export interface EditorComponent {
	name: string;
	styles: React.CSSProperties;
}

export interface EditorStoreState {
	components: EditorComponent[];
	list: { name: string }[];
}

export interface EditorStoreAction {
	addComponent: (component: EditorComponent) => void;
}
