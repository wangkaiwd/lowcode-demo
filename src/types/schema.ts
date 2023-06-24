interface EditorComponentProps {
	style: React.CSSProperties;
}

export interface Schema<T = any> {
	name: string;
	key: string;
	type: React.FC<EditorComponentProps>;
	initialProps: T;
}
