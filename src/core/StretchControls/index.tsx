import css from './index.module.less';
import cls from 'classnames';

const StretchControls = () => {
  return (
    <div className={css.stretchDots}>
      <div className={cls(css.circle, css.topLeft)}></div>
      <div className={cls(css.square, css.top)}></div>
      <div className={cls(css.circle, css.topRight)}></div>
      <div className={cls(css.square, css.right)}></div>
      <div className={cls(css.circle, css.bottomRight)}></div>
      <div className={cls(css.square, css.bottom)}></div>
      <div className={cls(css.circle, css.bottomLeft)}></div>
      <div className={cls(css.square, css.left)}></div>
    </div>
  );
};

export default StretchControls;
