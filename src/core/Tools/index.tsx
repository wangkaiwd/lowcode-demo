import { Button, Space } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'

const Tools = () => {
  return (
    <Space>
      <Button type="primary" size={'small'} icon={<ArrowLeftOutlined/>}>
        后退
      </Button>
      <Button type="primary" size={'small'} icon={<ArrowRightOutlined/>}>
        前进
      </Button>
    </Space>
  )
}

export default Tools
