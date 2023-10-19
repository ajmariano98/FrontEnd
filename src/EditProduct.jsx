import React, { useState, useEffect } from 'react';

export default function EditProduct({ product_id, onClose }) {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    // Carga el producto a editar desde el servidor utilizando product_id
    fetch(`http://localhost:8080/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        loadCategories();
      })
      .catch((error) => {
        console.error('Error al cargar el producto', error);
      });
  }, [product_id]);

  const updateProduct = () => {
    // Realiza una solicitud al servidor para actualizar el producto
    const updatedProduct = {
      name: product.name,
      brand: product.brand,
      category_id: product.category_id,
      price: parseFloat(product.price),
      photo: product.photo,
      description: product.description,
    };

    fetch(`http://localhost:8080/products/${product_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          // Muestra una notificación de éxito
          console.log('Producto actualizado exitosamente', data.message);
          // Cierra el modal de edición (puedes usar un callback para esto)
          onClose();
        } else if (data.error) {
          // Muestra una notificación de error
          console.error('Error al actualizar el producto', data.error);
        }
      });
  };

  return (
    <div>
      <h2>Editar Producto</h2>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          type="text"
          value={product.name}
          onChange={(event) => {
            // Actualiza el campo "name" en el estado product
            setProduct({ ...product, name: event.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label>Marca:</label>
        <input
          type="text"
          value={product.brand}
          onChange={(event) => {
            // Actualiza el campo "brand" en el estado product
            setProduct({ ...product, brand: event.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label>Categoría:</label>
        <select
          className="form-select"
          name="category_id"
          value={product.category_id}
          onChange={(event) => {
            // Actualiza el campo "category_id" en el estado product
            setProduct({ ...product, category_id: event.target.value });
          }}
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
      <div className="form-group">
        <label>Precio:</label>
        <input
          type="number"
          value={product.price}
          onChange={(event) => {
            // Actualiza el campo "price" en el estado product
            setProduct({ ...product, price: event.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label>Foto:</label>
        <input
          type="url"
          value={product.photo}
          onChange={(event) => {
            // Actualiza el campo "photo" en el estado product
            setProduct({ ...product, photo: event.target.value });
          }}
        />
      </div>
      <div className="form-group">
        <label>Descripción:</label>
        <input
          type="text"
          value={product.description}
          onChange={(event) => {
            // Actualiza el campo "description" en el estado product
            setProduct({ ...product, description: event.target.value });
          }}
        />
      </div>
      <button onClick={updateProduct}>Guardar</button>
    </div>
  );
}
