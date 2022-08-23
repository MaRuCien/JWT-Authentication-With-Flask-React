import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';


export const Login = () => {

    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    async function login(event) {
        event.preventDefault();
        const response = await fetch(process.env.BACKEND_URL + '/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        if (!response.ok) throw Error('There was a problem in the login request');

        if (response.status === 401) {
            throw 'Invalid credentials';
        } else if (response.status === 400) {
            throw 'Invalid email or password';
        }
        const data = await response.json();
        // save your token in the localStorage
        //also you should set your user into the store using the setStore function
        localStorage.setItem('token', data.token);
        actions.getToken(data.token);

        navigate('/protected');
    }


    return (
        <div className='container w-25 mt-5'>
            <h1 className='text-info text-center'>Login</h1>
            <form onSubmit={login} className='container shadow-lg p-3 mb-5 bg-white rounded  mt-5'>
                <div className='form-group col mt-4'>
                    <input
                        value={email}
                        type='email'
                        className='form-control'
                        placeholder='email'
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col mt-4'>
                    <input
                        value={password}
                        type='password'
                        className='form-control'
                        placeholder='contraseña'
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='mt-3 btn btn-info'>
                    Login
                </button>
            </form>
        </div>
    );
};


