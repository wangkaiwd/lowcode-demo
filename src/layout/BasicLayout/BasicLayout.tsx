import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './index.module.less'

const { Content } = Layout
const BasicLayout = () => {
  return (
    <Layout className={styles.basicLayout}>
      <Content>
        <Outlet/>
      </Content>
    </Layout>
  )
}

export default BasicLayout
