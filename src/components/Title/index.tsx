import css from './index.module.less';
import cls from 'classnames';
import { TitleProps } from '@/components/Title/types.ts';
import Text from '../Text';

const Title = (
  {
    children,
    className,
    level = 3,
    style
  }: TitleProps
) => {
  return (
    <div className={cls(css.title, className, css[`level${level}`])} style={style}>
      <Text value={children}/>
    </div>
  );
};

export default Title;
