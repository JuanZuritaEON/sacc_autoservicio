import { SubTabsProps } from '../../interface'
import { Button, Typography } from 'antd'
import RenderIcon from '../RenderIcon';
import './SubTabs.css'

const { Text } = Typography;

const SubTabs = <T,> (props: SubTabsProps<T>) => {
  const { subTabActual, setTab, tabs, classNames = '' } = props
  return (
    <div className={`tabContent ${classNames}`}>
      {
        tabs.map((tab, index) => (
          <Button
            key={tab.name+index}
            onClick={() => setTab(tab.id)}
          >
            <Text>{tab.name}</Text>
            {tab.icon && <RenderIcon icon={tab.icon} />}
          </Button>
        ))
      }
    </div>
  )
}

export default SubTabs