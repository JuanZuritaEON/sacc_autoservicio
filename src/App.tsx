import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { SAVE_ERRORS, useAppDispatch, useAppSelector } from "./state";
import Container from "./containers/Container";
import { GlobalMessage } from "./components";
import 'react-toastify/dist/ReactToastify.css'
import { Labels } from "./interface";

const App = () => {
  const { errors } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()

  useEffect(() => {
    errors.forEach(({ active, code, message, url }) => {
      if (active) {
        const componentMessage = () => <GlobalMessage>
          <span>Error en servicio: "{url}"</span>
          <span>{Labels.ERROR_CODE}: "{code === 0 ? '000' : code}"</span>
          <span>- {message} -</span>
        </GlobalMessage>
        toast['error'](componentMessage, {
          position: "top-right",
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "colored",
          autoClose: 7500,
        })
      }
    })
    if (errors.length > 1) dispatch(SAVE_ERRORS([{
      url: '',
      code: 0,
      message: '',
      active: false,
    }]))
  }, [errors, dispatch])

  return (
    <>
      <ToastContainer style={{
        width: 'fit-content',
        padding: '1.25rem',
        textAlign: 'justify',
        marginLeft: '0.5rem',
        lineHeight: '1.5'
      }} />
      <Container />
    </>
  )
}

export default App
