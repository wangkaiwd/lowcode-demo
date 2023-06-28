import Image from '@/components/Image/index.tsx';
import {Schema} from '@/types/schema.ts';
import {ImageProps} from 'antd';

export const imageSchema: Schema<ImageProps> = {
	name: '图片A',
	key: 'image',
	initialProps: {
		style: {
			position: 'absolute',
			width: 100
		},
	},
	type: Image
};
