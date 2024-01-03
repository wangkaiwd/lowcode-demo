import styles from './index.module.less'

interface TextProps {
  value: string;
}

const Text = (props: TextProps) => {
  const { value } = props
  return (
    <div className={styles.text}>
      {value}
    </div>
  )
}

export default Text
