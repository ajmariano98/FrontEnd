import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal } from 'react-bootstrap';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [modal, setModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
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

  const closeModal = () => {
    setModal(false);
    setIdToDelete(null);
  };

  const showModal = (category_id) => {
    setModal(true);
    setIdToDelete(category_id);
  };

  const loadCategories = () => {
    const parametros = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      },
    };

    fetch('http://localhost:8080/categorieslist', parametros)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error al cargar las categorías', error);
      });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const deleteCategory = () => {
    if (idToDelete) {
      fetch(`http://localhost:8080/categories/${idToDelete}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            toast.success(data.message, {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
            closeModal();
            loadCategories();
          } else if (data.error) {
            toast.error(data.error, {
              position: 'bottom-center',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'colored',
            });
          }
        });
    }
  };

  const createCategory = () => {
    const newCategory = { category_name: newCategoryName };
    fetch('http://localhost:8080/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setNewCategoryName('');
          loadCategories();
        } else if (data.error) {
          toast.warn(data.error, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
      });
  };

  const editCategory = (category_id) => {
    const categoryToEdit = categories.find((category) => category.category_id === category_id);
    setCategoryName(categoryToEdit.category_name);
    setEditingCategory(category_id);
  };

  const saveCategory = (category_id, updatedName) => {
    const updatedCategory = { category_id: category_id, category_name: updatedName };

    fetch(`http://localhost:8080/categories/${category_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCategory),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          toast.success(data.message, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          loadCategories();
        } else if (data.error) {
          toast.warn(data.error, {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
      });

    setEditingCategory(null);
  };

  if (token !== '' && token !== null && userData && userData.rol_id === 1) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="d-inline">Crear una Categoría</h2>
              <form className="form-inline d-inline ml-3">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={newCategoryName}
                    onChange={(event) => setNewCategoryName(event.target.value)}
                    placeholder="Nombre de categoría"
                  />
                </div>
                <button className="btn btn-primary ml-2" onClick={createCategory}>
                  Crear Categoría
                </button>
              </form>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col-md-12">
              <h2>Lista de Categorías</h2>
              <table className="table table-hover table-hover table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.category_id}>
                      <td>{category.category_id}</td>
                      <td>
                        {editingCategory === category.category_id ? (
                          <input
                            type="text"
                            value={categoryName}
                            onChange={(event) => setCategoryName(event.target.value)}
                          />
                        ) : (
                          category.category_name
                        )}
                      </td>
                      <td>
                        {editingCategory === category.category_id ? (
                          <button
                            className="btn btn-success material-symbols-outlined"
                            title="Guardar"
                            onClick={() => saveCategory(category.category_id, categoryName)}
                          >
                            save
                          </button>
                        ) : (
                          <button
                            className="btn btn-primary material-symbols-outlined"
                            title="Editar"
                            onClick={() => editCategory(category.category_id)}
                          >
                            edit
                          </button>
                        )}
                        <button
                          className="btn btn-danger material-symbols-outlined"
                          title="Borrar"
                          onClick={() => showModal(category.category_id)}
                        >
                          delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Modal show={modal} onHide={closeModal}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Title>Confirmación de eliminación</Modal.Title>
            <Modal.Body>¿Seguro que deseas eliminar la categoría?</Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={deleteCategory}>
                Confirmar
              </Button>
              <Button variant="primary" onClick={closeModal}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2>Sin acceso</h2>
      </>
    );
  }
}
