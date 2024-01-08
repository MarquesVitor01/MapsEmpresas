import React, { useState, useContext } from "react";
import { Link, Navigate } from 'react-router-dom';
import '../Login/login.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../Context/auth.jsx";
import firebase from '../Config/firebase';
import 'firebase/auth';



function Login() {

    const auth = getAuth();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [sucesso, setSucesso] = useState('');
    const {setLogado} = useContext(AuthContext);

    function LoginUsuario() {

        signInWithEmailAndPassword(auth, email, senha)
            .then(function (firebaseUser) {
                localStorage.setItem("logado", "S");
                setLogado(true);
                setSucesso('S');     
            })
            .catch(function (error) {
                localStorage.setItem("logado", "N");
                setLogado(false);
                setSucesso('N');
            });
    }

    function alterarEmail(event) {
        setEmail(event.target.value);
    }

    function alterarSenha(event) {
        setSenha(event.target.value);
    }



    return <div className="d-flex align-items-centes text-center form-container ">
        <form className="form-signin formulari">
            <img className="mb-4 icon" src="../../../img/mps.jpg" alt="" height="" width="75"  />
            <h1 className="h3 mb-3 fw-normal">Login</h1>

            <div className="form-floating">
                <input onChange={alterarEmail} type="email" className="form-control" id="floatingInput" placeholder="E-mail" />
            </div>
            <div className="form-floating formulario1 ">
                <input onChange={alterarSenha} type="password" className="form-control" id="floatingPassword" placeholder="Senha" />
            </div>

            <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                <label className="form-check-label" for="flexCheckDefault">
                    Lembrar
                </label>
            </div>

            <button onClick={LoginUsuario} className="btn btn-primary w-100 py-2" type="button">Acessar</button>


            {sucesso === 'N' ?<div className="alert alert-danger mt-2" role="alert">Email ou senha inválida</div> : null}
            {sucesso === 'S' ?  <Navigate to='/app/home' /> : null}


            <div className="login-links mt-5">
                <Link to="/app/resetsenha" className="mx-3 text-light">Esqueci minha senha</Link>
                {/* <Link to="/app/novaconta" className="mx-3">Criar conta</Link> */}
            </div>
            <p className="mt-5 mb-3 text-body-secondary">&copy; Desenvolvido por Grupo Maps</p>
        </form>
    </div>
}
export default Login;