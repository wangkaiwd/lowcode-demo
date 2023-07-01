import {Image as AntdImage, ImageProps} from 'antd';

const Image = (props: ImageProps) => {
	return (
		<AntdImage
			src={'https://w7.pngwing.com/pngs/79/518/png-transparent-js-react-js-logo-react-react-native-logos-icon-thumbnail.png'}
			{...props}
			preview={false}
		/>
	);
};

export default Image;
