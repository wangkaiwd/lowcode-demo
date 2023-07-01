import Title from '@/components/Title/index.tsx';
import {Schema} from '@/types/schema.ts';
import {TitleProps} from '@/components/Title/types.ts';

export const titleSchema: Schema<TitleProps> = {
	name: '标题',
	key: 'title',
	initialProps: {
		children: '文本',
	},
	type: Title
};
