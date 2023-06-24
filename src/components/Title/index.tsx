import {HTMLAttributes} from 'react';
import css from './index.module.less';
import cls from 'classnames';

type Level = 1 | 2 | 3 | 4 | 5 | 6

interface TitleProps extends HTMLAttributes<HTMLDivElement> {
	level?: Level;
}

const Title = (
	{
		children,
		className,
		level = 3
	}: TitleProps
) => {
	return (
		<div className={cls(css.title, className, css[`level${level}`])}>
			{children}
		</div>
	);
};

export default Title;
