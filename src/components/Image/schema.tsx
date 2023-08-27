import Image from '@/components/Image/index.tsx';
import { Schema } from '@/types/schema.ts';
import { ImageProps } from 'antd';
import Config from './Config';

export const imageSchema: Schema<ImageProps> = {
  name: '图片A',
  key: 'Image',
  props: {},
  ConfigView: Config,
  type: Image
};

