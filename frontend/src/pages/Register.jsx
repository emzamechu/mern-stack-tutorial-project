import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'

function Register() {
    //Set Initial Form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const {name, email, password, password2} = formData

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
    }

  return (
    <>
        <section className="heading">
            <h1><FaUser /> Register</h1>
            <p>Please create an account!</p>
        </section>
        <section className="form">
            <form onSubmit={onSubmit} >
                <div className="form-group">
                    <input type="text" name="name" placeholder="Enter your name" id="name" className="form-control" value={name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="email" name="email" placeholder="Enter your email" id="email" className="form-control" value={email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" name="password" placeholder="Enter a password" id="password" className="form-control" value={password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="password" name="password2" placeholder="Confirm password" id="password2" className="form-control" value={password2} onChange={onChange} />
                </div>
                <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-block" />
                </div>
            </form>
        </section>
    </>
  )
}

export default Register