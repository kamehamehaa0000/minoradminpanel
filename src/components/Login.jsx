import React, { useContext, useState } from 'react'
import loginModalContext from './contexts/loginModal.context.js'
import TextInput from './Shared/TextInput.jsx'
import { makeUnauthenticatedPOSTrequest } from '../utilities/apiCall.js'
import { dotStream } from 'ldrs'
import { NavLink, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import registrationModelContext from './contexts/registerationModal.context.js'
dotStream.register()

const Login = () => {
  const { isOpen, setIsOpen } = useContext(loginModalContext)
  const { isOpenReg, setIsOpenReg } = useContext(registrationModelContext)
  const [cookie, setCookie, removeCookie] = useCookies(['authToken'])
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    let response
    try {
      setLoading(true)
      response = await makeUnauthenticatedPOSTrequest('/admin/login', {
        email,
        password,
      })
      console.log(response)
      const userData = response.data.data //user and token object
      if (response.data.success == true) {
        const expirationDate = new Date()
        expirationDate.setDate(expirationDate.getDate() + 7) //expires in 7 days from current date
        setCookie('authToken', userData.token, {
          path: '/',
          expires: expirationDate,
        })
        const userDets = JSON.stringify(response.data.data.user)
        setCookie('details', userDets, {
          path: '/',
          expires: expirationDate,
        })
        setLoading(false)
        alert('Login Successfull!!')
        setIsOpen(false)
      }
    } catch (error) {
      console.log(error)
      if (error.response && !error.response.data.success) {
        alert('Login Failed')
      } else {
        console.error('Unexpected error during login:')
      }
      setLoading(false)
    }
  }

  const loadingAnimation = (
    <>
      <div className="flex flex-col m-4  rounded-md ">
        <l-dot-stream size="80" speed="3" color="black" />
      </div>
    </>
  )
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50">
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-70"
            onClick={() => setIsOpen(!isOpen)}
          ></div>
          <div className="relative w-5/6 lg:w-1/2  bg-white rounded-xl z-10">
            {loading ? (
              <div className="flex justify-center mt-4">{loadingAnimation}</div>
            ) : (
              <div className="w-full flex justify-center rounded-xl">
                <div className="w-0 max-h-1/2 sm:w-1/2 overflow-hidden ">
                  <img
                    src="https://s3-alpha-sig.figma.com/img/1cae/86d0/b6e90b941d039dcda57160b3b3698f2f?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LwCwS-3WlZvixsxKqo5MEY85gPdPKmJxAzhJoYeQ7sKbYih-t7pLIqgqUDxPsLGEY6gll8ILATfhgfQUs9Hz3I4-FktD8P40IbuJD3sFBkewckOheJ2TmNF2Nw1n~tlniV1FngvPrj7SZ0fpCUx17PZY8UBC-27cjcqR~r9XIhmMLfzwbnp35V8qgs7R70E5SDQHavTcU3pjuv80ZKBQDgZvamoN6ISlAEM3CHI-hpT3sofBzSWtrpFe612cQIBJAaZSJ5SbPTC3LNXFjE1Fe~lehUSMerlR9cJGKuI90UkbDUJppWrxEtNjU5RDfshuy~oRWrxbHh5z0hPllFTJ1g__"
                    alt=""
                    className="rounded-s-md w-full h-full "
                  />
                </div>
                <div className="flex-grow flex flex-col items-start justify-center p-4 md:p-8">
                  <TextInput
                    label={'Email address'}
                    placeholder={'Email address'}
                    type={'text'}
                    value={email}
                    onChange={setEmail}
                  />

                  <TextInput
                    label={'Password'}
                    placeholder={'Password'}
                    type="password"
                    value={password}
                    onChange={setPassword}
                  />
                  <button
                    onClick={handleLogin}
                    className="relative mx-2 my-4 w-1/2 px-4 py-2 rounded-full bg-black isolation-auto z-10 border-2 border-black before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-500 text-white before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700"
                  >
                    Login
                  </button>

                  <div>
                    <h1>Don't have an account ?</h1>
                    <button
                      onClick={() => {
                        setIsOpen(false)
                        setIsOpenReg(true)
                        console.log(isOpenReg)
                      }}
                      className="hover:underline text-blue-500"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default Login
