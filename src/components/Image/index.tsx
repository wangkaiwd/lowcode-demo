import { Image as AntdImage, ImageProps } from 'antd';

const Image = (props: ImageProps) => {
  console.log('props', props);
  return (
    <AntdImage
      src={'https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png'}
      width={'100%'}
      height={'100%'}
      {...props}
      preview={false}
    />
  );
};

export default Image;
