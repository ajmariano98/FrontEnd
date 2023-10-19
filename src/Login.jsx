import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
 

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const credentials = {
      username,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const responseData = await response.json();
  const { token, datos } = responseData;
  sessionStorage.setItem('token', token);

  // Almacenar los datos del usuario en sessionStorage
  sessionStorage.setItem('userData', JSON.stringify(datos));


        toast.success("Inicio de sesión exitoso", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        
         setTimeout(() => {
        window.location.replace('/home');
        }, 1000); // Agregar un pequeño retraso para asegurarse de que la redirección ocurra antes de mostrar la notificación
        
      } else {
        // Manejar errores de autenticación, como credenciales incorrectas
        console.error('Error de inicio de sesión');
        toast.error('El nombre de usuario o la contraseña son incorrectos', {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      toast.error('Error de inicio de sesión', {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="username"
            className="form-control"
            id="inputUsername"
            aria-describedby="userHelp"
            minLength={4}
            placeholder="Nombre de Usuario"
            onChange={handleChangeUsername}
            value={username}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            aria-describedby="passwordHelp"
            id="inputPassword"
            minLength={4}
            placeholder="Contraseña"
            onChange={handleChangePassword}
            value={password}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
