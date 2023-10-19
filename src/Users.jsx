import React, { Component } from 'react';

export class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userslist: [] // array que va a contener la lista de usuarios
        }; 
    }

    // Se ejecuta después de que el componente se monta
    componentDidMount() {
        // Realiza una solicitud para obtener la lista de usuarios
        fetch("http://localhost:8080/userslist")
            .then(res => res.json()) // la respuesta pasa a res y se lee como json
            .then(result => { // result toma lo que consiguió res para trabajarlo
                console.log(result);
                // Actualiza el estado con la lista de usuarios
                this.setState({
                    userslist: result 
                });
            });
    }

    render() {
        // Mapea los usuarios en el estado para mostrarlos en la interfaz
        const show = this.state.userslist.map((userlist, index) => {
            return (
                <div className='row' key={index}>
                    <div className='col'>
                        <strong>ID: </strong><span>{userlist.user_id}</span><br />
                        <strong>Nombre de Usuario: </strong><span>{userlist.username}</span><br />
                        <strong>Contraseña: </strong><span>{userlist.password}</span><br />
                        <strong>Correo Electrónico: </strong><span>{userlist.email}</span><br />
                        <strong>Rol: </strong><span>{userlist.rol_name}</span><br />
                        <hr />
                    </div>
                </div>
            );
        });

        return (
            <>
                <div className='container'>
                    {show}
                </div>
            </>
        );
    }
}

