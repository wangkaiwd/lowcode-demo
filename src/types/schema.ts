export interface Schema<T = any> {
  name: string;
  key: string;
  type: React.FC<any>;
  style?: React.CSSProperties;
  initialProps: T;
}
