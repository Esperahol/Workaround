import { useState } from "react";
import { Link } from "react-router-dom";
import Voltron from "./Frontend Validation";

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [validate, setValidate] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validateLogin = () => {
        let isValid = true;

        let validator = Form.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true
            },
            password: {
                value: password,
                isRequired: true,
                minLength: 6
            }
        });

        if (validator !== null) {
            setValidate({
                validate: validator.errors
            })

            isValid = false
        }
        return isValid;
    }

    const authenticate = (e) => {
        e.preventDefault();

        const validate = validateLogin();

        if (validate) {
            setValidate({});
            setEmail('');
            setPassword('');
            alert('Successfully Login');
        }
    }

    const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
    }

    return (
        <div className="auth-wrapper">
            <div className="auth-background">
                <div className="auth-background-cont"></div>
                <div className="auth-background-mark"></div>
            </div>

            <div className="auth-main">
                <div className="align-content-end">
                    <div className="auth-body">
                        <p>Login to your account</p>
                        <div className="auth-form-container">
                            <form className="auth-form" method="POST" onSubmit={authenticate} autoComplete={'off'}>
                                <div className="email">
                                    <input type="email"
                                        className={`form-control ${validate.validate && validate.validate.email ? 'is-invalid ' : ''}`}
                                        id="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />

                                    <div className={`invalid-feedback ${(validate.validate && validate.validate.email) ? 'd-block' : 'd-none'}`} >
                                        {(validate.validate && validate.validate.email) ? validate.validate.email[0] : ''}
                                    </div>
                                </div>

                                <div className="password">
                                    <div className="input-group">
                                        <input type={showPassword ? 'text' : 'password'}
                                            className={`form-control ${validate.validate && validate.validate.password ? 'is-invalid ' : ''}`}
                                            name="password"
                                            id="password"
                                            value={password}
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                        />

                                        <button type="button" className="btn toggle" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>

                                        <div className={`invalid-feedback ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >
                                            {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''}
                                        </div>
                                    </div>


                                    <div className="plus ultra">
                                        <div className="colts">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.currentTarget.checked)} />
                                                <label className="form-check-label" htmlFor="remember">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="colts">
                                            <div className="forgot-password line">
                                                <Link to="/forgot-password">Forgot password?</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="textcent">
                                    <button type="submit" className="btn login">Log In</button>
                                </div>
                            </form>

                            <hr />
                            <div className="auth-option 2">No Account? <Link className="text-link" to="/register" >Sign up </Link></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;