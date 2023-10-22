import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import EditProduct from './EditProduct';

export default function ListProducts() {
  const [productsList, setProductsList] = useState([]);
  const [categories, setCategories] = useState({});
  const [productToDelete, setProductToDelete] = useState(null);
  const [modal, setModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);

  const loadProducts = () => {
    fetch('http://localhost:8080/productslist')
      .then((res) => res.json())
      .then((data) => {
        setProductsList(data);
      })
      .catch((error) => {
        console.error('Error al cargar los productos', error);
      });
  };

  const loadCategories = () => {
    fetch('http://localhost:8080/categorieslist')
      .then((res) => res.json())
      .then((data) => {
        const categoriesMap = {};
        data.forEach((category) => {
          categoriesMap[category.category_id] = category.category_name;
        });
        setCategories(categoriesMap);
      })
      .catch((error) => {
        console.error('Error al cargar las categorías', error);
      });
  };



  useEffect(() => {
    const t = sessionStorage.getItem('token');
    const userLogged = sessionStorage.getItem('userData');
    if (userLogged) {
      setUserData(JSON.parse(userLogged));
    }
    if (t !== token) {
      setToken(t);
    }
    loadCategories();
    loadProducts();
  }, [token]);

  const formatAsCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value).replace('ARS', '');
  };

  const editProduct = (product_id) => {
    setEditingProductId(product_id);
    setModal(true); // Abre el modal para editar
  };

  const closeModal = () => {
    setModal(false);
    setEditingProductId(null);
    loadProducts();
  };

  const deleteProduct = (product_id) => {
    setProductToDelete(product_id);
    setModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      fetch(`http://localhost:8080/products/${productToDelete}`, {
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
            closeModal();
            loadProducts();
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
        <div className="row">
          <div className="col-6">
            <h2>Lista de Productos</h2>
          </div>
          <div className="col-6">
            <Link className="btn btn-primary" to="/registerproduct">
              <h2>Cargar Producto</h2>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Foto</th>
                  <th>Nombre</th>
                  <th>Marca</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productsList.map((product) => (
                  <tr key={product.product_id}>
                    <td>{product.product_id}</td>
                    <td>
                      <img
                        src={product.photo}
                        alt={product.name}
                        style={{ maxWidth: '100px' }}
                      />
                    </td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{categories[product.category_id]}</td>
                    <td>{formatAsCurrency(product.price)}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => editProduct(product.product_id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteProduct(product.product_id)}
                      >
                        Borrar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal show={modal} onHide={closeModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Title>Confirmación de eliminación</Modal.Title>
        <Modal.Body>¿Seguro que deseas eliminar el producto?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={confirmDelete}>
            Confirmar
          </Button>
          <Button variant="primary" onClick={closeModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      {editingProductId && (
        <Modal show={modal} onHide={closeModal}>
          <Modal.Body>
            <EditProduct product_id={editingProductId} onClose={closeModal} />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
} else {
  return (
    <>
      <h1>Acceso denegado</h1>
    </>
    );
}
}