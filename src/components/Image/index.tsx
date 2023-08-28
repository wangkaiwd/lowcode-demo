import { Image as AntdImage } from 'antd';

interface ImageConfig {
  src: string;
}

interface ImageProps {
  config: ImageConfig;
}

const Image = (props: ImageProps) => {
  const { config } = props;
  return (
    <AntdImage
      src={config.src}
      width={'100%'}
      height={'100%'}
      preview={false}
    />
  );
};

export default Image;
