import {ComponentProps} from 'react';
import css from './componentContainer.module.less';
import cls from 'classnames';

interface ComponentContainerProps extends ComponentProps<'div'> {

}

const ComponentContainer = ({style, className, children}: ComponentContainerProps) => {
	return (
		<div
			className={cls(css.componentContainer, className)}
			style={style}
		>
			{children}
		</div>
	);
};

export default ComponentContainer;
