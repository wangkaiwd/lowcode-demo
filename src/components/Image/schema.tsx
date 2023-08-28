import Image from '@/components/Image/index.tsx';
import { Schema } from '@/types/schema.ts';
import { ImageProps } from 'antd';
import Config from './Config';

export const imageSchema: Schema<ImageProps> = {
  name: '图片A',
  key: 'Image',
  props: {
    config: {
      src: 'https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png'
    }
  },
  ConfigView: Config,
  type: Image
};

