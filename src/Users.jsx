import React, { useState, useEffect } from 'react';

export default function Users() {
  const [userslist, setUsersList] = useState([]);

  useEffect(() => {
    // Realiza una solicitud para obtener la lista de usuarios al montar el componente
    fetch("http://localhost:8080/userslist")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUsersList(result);
      });
  }, []);

  return (
    <div className='container'>
      {userslist.map((userlist, index) => (
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
      ))}
    </div>
  );
}
