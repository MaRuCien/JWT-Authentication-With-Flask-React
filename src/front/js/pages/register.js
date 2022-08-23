import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';



export const Register = () => {

    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const register = (event) => {
        event.preventDefault();
        actions.register(email, password);
        navigate('/login');
    };


    return (
        <div className='container mt-5 border border-5 border-info mt-5 mb-5 shadow-lg p-3 mb-5 bg-white rounded'>
            <h1 className='text-info'>Registrarse</h1>
            <form onSubmit={register} className='row g-3 needs-validation'>
                <div className='form-group col-md-5 mt-5'>
                    <input
                        value={email}
                        type='email'
                        className='form-control'
                        placeholder='Email'
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col-md-5 mt-5'>
                    <input
                        value={password}
                        type='password'
                        className='form-control'
                        placeholder='Contraseña'
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </div>
                <div className='mt-5 mb-3'>
                    <button type='submit' className=' btn btn-info'>
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
};

