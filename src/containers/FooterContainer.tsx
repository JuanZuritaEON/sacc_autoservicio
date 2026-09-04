import { FC } from 'react';
import { Button } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { ArrowLeftOutlined, ArrowRightOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { RootState, useAppSelector } from '../state';
import { footerStyle } from '../utils';


const FooterContainer: FC<{
  changeStep: (step: number) => void
  sendStepInfo: (step: number) => void
}> = ({ changeStep, sendStepInfo }) => {
  const { currentStep, percentage } = useAppSelector((state: RootState) => state.app.appFluxContext)

  const renderPreviousButton = () => {
    if (currentStep > 0) {
      return (
        <>
        <Button
          style={{marginRight: 'auto'}}
          type='default'
          size='large'
          icon={<ArrowLeftOutlined />}
          iconPlacement={'start'}
          onClick={() => changeStep(currentStep - 1)}
        >
          Regresar
        </Button>
        {/* Aun pendiente de implementar */}
{/*           <Button ghost danger type="primary" size='large' variant='outlined' icon={<CloseCircleOutlined />} iconPlacement={'end'}>
          Cancelar
        </Button> */}
      </>
      )
    }
    return null;
  }

  return (
    <Footer style={footerStyle}>
      {
        currentStep === 4 ? null : (
          <>
            {renderPreviousButton()}
            <Button
              disabled={percentage !== 100}
              type="primary"
              size='large'
              icon={<ArrowRightOutlined />}
              iconPlacement={'end'}
              onClick={() =>sendStepInfo(currentStep)}
            >
              Siguiente
            </Button>
          </>
          )
      }
    </Footer>
  )
}

export default FooterContainer