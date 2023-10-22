import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function ListUsers() {
  const [listUsers, setlistUsers] = useState([]);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
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

  const loadListUsers = () => {
    fetch("http://localhost:8080/userslist")
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setlistUsers(result);
      })
      .catch((error) => {
        console.error('Error al cargar los usuarios', error);
      });
  }


  useEffect(() => {
    loadListUsers();
  }, []);

  const handleEditUser = (user_id) => {
    // Agrega la lógica para editar el usuario con el ID userId
    // Puedes navegar a una página de edición o mostrar un formulario de edición aquí
  };

  const handleDeleteUser = (user_id) => {
    // Muestra el modal de confirmación antes de borrar el usuario
    setModalDeleteUser(true);
    setSelectedUserId(user_id);
  };

  const closeModalDeleteUser = () => {
    setModalDeleteUser(false);
    setSelectedUserId(null);
  };

  const deleteSelectedUser = () => {
    if (selectedUserId) {
      console.log(`Borrando usuario con ID: ${selectedUserId}`);
      fetch(`http://localhost:8080/listusers/${selectedUserId}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.success(data.message, {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            loadListUsers();
            closeModalDeleteUser(); // Cierra el modal después de borrar
          } else if (data.error) {
            toast.warn(data.error, {
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
        });
    }
  };
  

  if (token !== '' && token !== null && userData && userData.rol_id === 1) {
  return (
    <>
      <div className="container">
        {listUsers.map((userlist, index) => (
          <div className="row" key={index}>
            <div className="col">
              <strong>ID: </strong>
              <span>{userlist.user_id}</span>
              <br />
              <strong>Nombre de Usuario: </strong>
              <span>{userlist.username}</span>
              <br />
              <strong>Correo Electrónico: </strong>
              <span>{userlist.email}</span>
              <br />
              <strong>Rol: </strong>
              <span>{userlist.rol_name}</span>
              <br />
              <button
                className="btn btn-primary material-symbols-outlined"
                onClick={() => handleEditUser(userlist.user_id)}
              >
                edit
              </button>
              <button
                className="btn btn-danger material-symbols-outlined"
                onClick={() => handleDeleteUser(userlist.user_id)}
              >
                delete
              </button>
              <hr />
            </div>
          </div>
        ))}
      </div>

      <Modal show={modalDeleteUser} onHide={closeModalDeleteUser}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title>Confirmación de eliminación</Modal.Title>
        <Modal.Body>¿Seguro que deseas eliminar el usuario?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteSelectedUser}>
            Confirmar
          </Button>
          <Button variant="primary" onClick={closeModalDeleteUser}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
} else {
  return (
    <>
    <h2>Acceso denegado</h2>
    </>
  )
}
}