import { RootState, SAVE_APP_FLUX, useAppDispatch, useAppSelector } from '../../state';
import { modalComponentStyles } from '../../utils'
import { ModalData } from '../../interface'
import ReactModal from 'react-modal'
import { isUndefined } from 'lodash'
import { Button } from 'antd'
import './Modal.css'

const modalSelector = document.getElementById('loadModal');
ReactModal.setAppElement(modalSelector);

const Modal = (props: ModalData) => {
  const { modalData } = useAppSelector((state: RootState) => state.app.appFluxContext)
  const dispatch = useAppDispatch()
  const {
    children,
    footerComponent,
    headerComponent,
    noFooter,
    noHeader,
    onAccept
  } = props

  const closeModal = () => dispatch(SAVE_APP_FLUX({ modalData: { ...modalData, active: false } }))

  return (
    <ReactModal
      isOpen={modalData.active}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={false}
      style={{...modalComponentStyles}}
    >
      {isUndefined(headerComponent) && !noHeader ? (
        <header className='headerModal'>
          <span className='modalTitle'>{modalData.title}</span>
          <button type='button' className='modalCloseTab' onClick={closeModal}>
            <span>&times;</span>
          </button>
        </header>
        ) : headerComponent
      }
      <div className='bodyModal'>
        {children}  
      </div>
      {isUndefined(footerComponent) && !noFooter ? (
        <footer className='footerModal'>
          <Button
            type='default'
            onClick={closeModal}
          >{modalData.backButtonLabel ?? 'Cancelar'}</Button>
          <Button
            type='primary'
            htmlType='button'
            onClick={onAccept}
            disabled={isUndefined(onAccept)}
          >{modalData.acceptButtonLabel ?? 'Aceptar'}</Button>
        </footer>
        ) : footerComponent
      }
    </ReactModal>
  )
}

export default Modal;