import { CSSProperties, FC } from 'react';

export interface Schema<T = any> {
  name: string;
  key: string;
  type: FC<any>;
  ConfigView?: FC<any>;
  wrapperStyle?: CSSProperties;
  props: {
    config?: Record<string, any>;
  } & T;
}
