import React, { useState } from 'react';

export default function RegisterUser() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // Recolecta los valores del formulario y realiza la acción de registro en tu backend
    const userToRegister = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(userToRegister),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:8080/users', fetchData)
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          // La respuesta contiene un error
          console.error(result.error);
          alert(result.error);
        } else if (result.message) {
          // La solicitud fue exitosa
          console.log(result);
          alert(result.message);
        }
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
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
            name="username"
            onChange={handleChange}
            value={user.username}
            required
          />
          <div id="userHelp" className="form-text">
            Debe contener un mínimo de 4 caracteres.
          </div>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Dirección de correo electrónico"
            autoComplete="on"
            name="email"
            onChange={handleChange}
            value={user.email}
            required
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
            name="password"
            onChange={handleChange}
            value={user.password}
            required
          />
          <div id="passwordHelp" className="form-text">
            Debe contener un mínimo de 4 caracteres.
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
          <button type="reset" className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
