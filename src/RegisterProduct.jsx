import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function RegisterProduct() {
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category_id, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [categories, setCategories] = useState([]);
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

  useEffect(() => {
    loadCategories();
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const product = {
      name,
      brand,
      category_id,
      price,
      photo,
      description,
    };

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    fetch('http://localhost:8080/registerproducts', fetchData)
      .then((res) => res.json())
      .then(handleRegistrationResponse)
      .catch(handleRegistrationError);
  };

  const handleRegistrationResponse = (result) => {
    if (result.error) {
      console.error(result.error);
      toast.error(result.error, getToastOptions());
    } else if (result.message) {
      console.log(result.message);
      toast.success(result.message, getToastOptions());
      clearForm();
    }
  };

  const handleRegistrationError = (error) => {
    console.error('Error en la solicitud', error);
    toast.error('Error en la solicitud', getToastOptions());
  };

  const clearForm = () => {
    setName('');
    setBrand('');
    setCategory('');
    setPrice(0);
    setPhoto('');
    setDescription('');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'category_id' && value !== '0') {
      setCategory(value);
    } else {
      setCategory('');
    }

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'brand':
        setBrand(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'photo':
        setPhoto(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }
  };

  const getToastOptions = () => {
    return {
      position: 'bottom-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    };
  };

  if (token !== '' && token !== null && userData && userData.rol_id === 1) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Nombre del Producto:
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                value={name}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputBrand" className="form-label">
                Marca:
              </label>
              <input
                type="text"
                className="form-control"
                name="brand"
                onChange={handleChange}
                value={brand}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputCategory" className="form-label">
                Categoría:
              </label>
              <select
                className="form-select"
                name="category_id"
                value={category_id}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Seleccione una categoría
                </option>
                {categories.map((category) => (
                  <option key={category.category_id} value={category.category_id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputPrice" className="form-label">
                Precio:
              </label>
              <input
                type="number"
                className="form-control"
                name="price"
                onChange={handleChange}
                value={price}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPhoto" className="form-label">
                URL de la Foto:
              </label>
              <input
                type="url"
                className="form-control"
                name="photo"
                onChange={handleChange}
                value={photo}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDescription" className="form-label">
                Descripción:
              </label>
              <textarea
                className="form-control"
                name="description"
                onChange={handleChange}
                value={description}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Cargar
            </button>
            <button type="button" className="btn btn-secondary" onClick={clearForm}>
              Limpiar
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <h2>Sin acceso</h2>
    );
  }
}
