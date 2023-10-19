import React, { Component } from 'react';

export class RegisterUser extends Component {

  constructor(props) {
    super(props);

    // Estado inicial del componente
    this.state = {
      username: '',
      email: '',
      password: '',
    };
  }

  // Manejar el envío del formulario
  handleSubmit = (event) => {
    event.preventDefault();

    // Recolecta los valores del formulario y realiza la acción de registro en tu backend
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      }
    };

    fetch('http://localhost:8080/users', fetchData)
      .then(res => res.json())
      .then(result => {
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

  // Manejar cambios en el campo "Nombre de Usuario"
  handleChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  // Manejar cambios en el campo "Correo Electrónico"
  handleChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  // Manejar cambios en el campo "Contraseña"
  handleChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <input
              type="username"
              className="form-control"
              id="inputUsername"
              aria-describedby="userHelp"
              minLength={4}
              placeholder='Nombre de Usuario'
              onChange={this.handleChangeUsername}
              value={this.state.username}
            />
            <div id="userHelp" className="form-text">
              Debe contener un mínimo de 4 caracteres.
            </div>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Dirección de correo electrónico"
              autoComplete='on'
              onChange={this.handleChangeEmail}
              value={this.state.email}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              aria-describedby="passwordHelp"
              id="inputPassword"
              minLength={4}
              placeholder='Contraseña'
              onChange={this.handleChangePassword}
              value={this.state.password}
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
}
