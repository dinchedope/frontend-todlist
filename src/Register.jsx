import './Register.css';
function Register(){
    return(
        <div className="login">
            <h2>Register</h2>
            <p>email</p>
            <input type="text" name="input" />
            <p>Username</p>
            <input type="text" name="input" />
            <p>password</p>
            <input type="text" name="input" />
            <input className='buttonOk' type="button" value="ok"/>
        </div>
    )
}

export default Register;