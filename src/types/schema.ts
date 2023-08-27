import { CSSProperties, FC } from 'react';

export interface Schema<T = any> {
  name: string;
  key: string;
  type: FC<any>;
  style?: CSSProperties;
  ConfigView?: FC<any>;
  wrapperStyle?: CSSProperties;
  props: {
    config?: Record<string, any>;
  } & T;
}
