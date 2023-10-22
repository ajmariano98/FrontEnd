import React, { useEffect, useState } from 'react';
import logo from './logo.png';
import './NavBar.css';
import { Link, useNavigate } from 'react-router-dom';
//import Button from 'react-bootstrap/Button';

export default function NavBar()  {

  const navigate = useNavigate();

  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const t = sessionStorage.getItem('token');
    const userLogged = sessionStorage.getItem('userData');
    if (userLogged) {
      setUserData(JSON.parse(userLogged));
    }
    if (t !== token) {
      setToken(t);
    }
  }, [token]);


  function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userData');
    setToken('');
    navigate('/home');
  }

  
  if (token !== '' && token !== null && userData.rol_id === 1) {
    return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid" id="NavBar">
          <div className="container">
            <a className="navbar-brand" href="#"><img src={logo} alt="Logo" /></a>
            <button
              className="navbar-toggler bg-body-tertiary" // Cambié la clase aquí
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ height: '100%' }}>
                <li className="nav-item">
                  <Link to="/home" className="nav-link active" aria-current="page">Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">Productos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/listusers" className="nav-link">Usuarios</Link>
                </li>
                <li className="nav-item">
                  <Link to="/listproducts" className="nav-link">Lista de Productos</Link>
                </li>
                <li className="nav-item">
                  <Link to="/categories" className="nav-link">Categorías</Link>
                </li>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" aria-label="Search" placeholder='Buscar...' />
                  <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/account" className="nav-link">Cuenta</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>Cerrar sesión</button>
                </li>
                <li className="nav-item">
                <Link to="/cart" className="nav-link">Carrito</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </>
      );

    } else if (token !== '' && token !== null && userData.rol_id === 2) {
      return (
        <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid" id="NavBar">
        <div className="container">
          <a className="navbar-brand" href="#"><img src={logo} alt="Logo" /></a>
          <button
            className="navbar-toggler bg-body-tertiary" // Cambié la clase aquí
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ height: '100%' }}>
              <li className="nav-item">
                <Link to="/home" className="nav-link active" aria-current="page">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/products" className="nav-link">Productos</Link>
              </li>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" aria-label="Search" placeholder='Buscar...' />
                <button className="btn btn-outline-success" type="submit">Buscar</button>
              </form>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/account" className="nav-link">Cuenta</Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" onClick={logout}>Cerrar sesión</button>
              </li>
              <li className="nav-item">
              <Link to="/cart" className="nav-link">Carrito</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      </>
      );
    } else {
      return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary container-fluid">
          <div className="container">
            <a className="navbar-brand" href="#"><img src={logo} alt="Logo" /></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
              <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ height: '100%' }}>
                <li className="nav-item">
                  <Link to="/" className="nav-link active" aria-current="page">Inicio</Link>
                </li>
                <li className="nav-item">
                <Link to="/products" className="nav-link">Productos</Link>
                </li>
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" aria-label="Search" placeholder='Buscar...' />
                  <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
              </ul>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Ingresar</Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Registrarse</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        </>
      );
    }
  }
