import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import {loginUser, reset} from '../features/auth/AuthSlice'
import Spinner  from '../components/Spinner'

function Login() {
    //Set Initial Form state
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const {email, password} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=>state.auth)

    //Watch for changes in state with useEffect
    useEffect(() => {

        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    },[user, isError, isSuccess, message, navigate, dispatch])


    //On Change of Input Field
    const onChange = (e)=> {
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    //On Submit Form
    const onSubmit = (e)=> {
        e.preventDefault()
        const userData = ({email, password})
        dispatch(loginUser(userData))
        // dispatch(reset())
    }

    if (isLoading) {
        return <Spinner />
    }

  return (
    <>
        <section className="heading">
            <h1><FaSignInAlt /> Login</h1>
            <p>Enter valid credentials to Login</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <input type="email" name="email" placeholder="Enter your email" id="email" className="form-control" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Enter a password" id="password" className="form-control" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Login" className="btn btn-block" />
                </div>
            </form>
        </section>
    </>
  )
}

export default Login