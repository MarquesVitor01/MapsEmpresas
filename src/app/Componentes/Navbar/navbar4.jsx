import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import '../Navbar/navbar.css';
import { AuthContext } from '../../Context/auth';

function Navbar4() {
    const [loading, setLoading] = useState(true);
    const { setLogado } = useContext(AuthContext);
    const auth = getAuth();
    const navigate = useNavigate();
    const [isAdmUser, setIsAdmUser] = useState(false);

    /* eslint-disable no-unused-vars */
    const Logout = () => {
        setLogado(false);
        localStorage.removeItem("logado");
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('ID do usuário:', user.uid);
                setLogado(true);

                // Verificar se o usuário é um administrador
                setIsAdmUser(user.uid === 'xVCyJZJSEGhd0tk7YZem4dLVI8E2' || user.uid === '3UbiYQZwJShtQl86KXNu0xyWPnx1');
            } else {
                console.log('Nenhum usuário autenticado.');
                setLogado(false);
            }
        });

        return () => unsubscribe();
    }, [auth, setLogado]);

    useEffect(() => {
        // Recuperar os clientes do localStorage ao carregar a página
        const storedClientes = localStorage.getItem('clientes');

        if (storedClientes) {
            setLoading(false);
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light ">
            <div className="container-fluid">
                <a className="navbar-brand" href="/app/marketingmapsempresas">
                    <img
                        src="../../../img/mps.jpg"
                        width="85"
                        height="80"
                        alt=""
                    />
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Alterna navegação"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse  d-lg-flex justify-content-end"
                    id="navbarNavDropdown"
                >
                    <ul className="navbar-nav active">
                        <li className="nav-item ">
                            <Link to="https://app2.pontomais.com.br/login" className="nav-link text-success" aria-current="page">
                                <b><i className="fa-solid fa-clock icon-hora"></i> Ponto Mais</b>
                            </Link>
                        </li>
                        <li className="nav-item bar"> | </li>
                        {isAdmUser && (
                            <>
                                <li className="nav-item ">
                                    <Link to="/app/home" className="nav-link text-primary" aria-current="page">
                                        <b><i class="fa-solid fa-rotate-right"></i> Voltar</b>
                                    </Link>
                                </li>
                                <li className="nav-item bar"> | </li>
                            </>
                        )}
                        <li className="nav-item">
                            <Link
                                to="/app"
                                onClick={Logout}
                                className="nav-link text-danger"
                                aria-current="page"
                            >
                                <b>Sair</b>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar4;