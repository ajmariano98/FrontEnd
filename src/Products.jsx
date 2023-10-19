import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import EditProduct from './EditProduct';

export default function Products() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); // Establece un valor predeterminado aquí
  const [productsList, setProductsList] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);
  const [modal, setModal] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState([]);

  const loadCategories = () => {
    fetch('http://localhost:8080/categorieslist')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Error al cargar las categorías', error);
      });
  };

  const loadProducts = () => {
    let url = 'http://localhost:8080/productslist';
    if (selectedCategory !== "") {
      url += `/category/${selectedCategory}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProductsList(data);
      })
      .catch((error) => {
        console.error('Error al cargar los productos', error);
      });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
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
  }, [token]);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const formatAsCurrency = (value) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(value).replace('ARS', '');
  };

  const editProduct = (product_id) => {
    setEditingProductId(product_id);
    setModal(true);
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
            loadProducts();
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
    }
  };

  const addToCart = (product_id) => {
    // Reemplaza 'userId' con la forma correcta de obtener el ID del usuario de userData.

    fetch('http://localhost:8080/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('token'),
      },
      body: JSON.stringify({ user_id: userData.user_id, product_id: product_id, quantity: 1 }) // Asumiendo que la cantidad es 1 por defecto.
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


  if (token !== '' && token !== null && userData && userData.rol_id === 1) {
    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h2>Filtrar por Categoría</h2>
              <select
                value={selectedCategory} // Aquí deberías tener `selectedCategory`
                onChange={(e) => handleCategoryChange(e.target.value)} // Actualiza la función de cambio
              >
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-9">
              <h2>Productos</h2>
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
                      <td>{categories.find((c) => c.category_id === product.category_id)?.category_name}</td>
                      <td>{formatAsCurrency(product.price)}</td>
                      <td>{product.description}</td>
                      <td>
                        <button
                          className="btn btn-primary material-symbols-outlined"
                          onClick={() => editProduct(product.product_id)}
                        >
                          edit
                        </button>
                        <button
                          className="btn btn-danger material-symbols-outlined"
                          onClick={() => deleteProduct(product.product_id)}
                        >
                          delete
                        </button>
                        <button
                          className="btn btn-success material-symbols-outlined"
                          onClick={() => addToCart(product.product_id)}
                        >
                          add_shopping_cart
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
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <h2>Filtrar por Categoría</h2>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">Todas</option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-9">
              <h2>Productos</h2>
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
                      <td>
                        {categories.find((c) => c.category_id === product.category_id)?.category_name}
                      </td>
                      <td>{formatAsCurrency(product.price)}</td>
                      <td>{product.description}</td>
                      <td>
                        <button
                          className="btn btn-success"
                          onClick={() => addToCart(product.product_id)}
                        >
                          Agregar al Carrito
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}