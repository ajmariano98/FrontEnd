import React, { Component } from 'react';

export class RegisterProduct extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      brand: '',
      category_id: '', // Valor por defecto, inicializado en ''
      price: 0,
      photo: '',
      description: '',
      categories: [] // Lista de categorías
    };
  }

  componentDidMount() {
    this.loadCategories(); // Cargar la lista de categorías al montar el componente
  }

  // Cargar la lista de categorías desde el servidor
  loadCategories() {
    fetch('http://localhost:8080/categorieslist')
      .then((res) => res.json())
      .then((data) => {
        this.setState({ categories: data });
      });
  }

  // Manejar el envío del formulario
  handleSubmit = (event) => {
    event.preventDefault();

    // Recolecta los valores del formulario y realiza la acción de registro en tu backend
    const product = {
      name: this.state.name,
      brand: this.state.brand,
      category_id: this.state.category_id,
      price: this.state.price,
      photo: this.state.photo,
      description: this.state.description,
    };

    let fetchData = {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    fetch('http://localhost:8080/registerproducts', fetchData)
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          // La respuesta contiene un error
          console.error(result.error);
          alert(result.error);
        } else if (result.message) {
          // La solicitud fue exitosa
          console.log(result.message);
          alert(result.message);
        }

        
      })
      .catch(error => {
        // Manejar errores en la solicitud
        console.error(error);
        alert('Error en la solicitud');
      });
  };

  // Manejar cambios en los campos del formulario
  handleChange = (event) => {
    const { name, value } = event.target;

    // Si se ha seleccionado una categoría distinta de "Ninguna", elimina la opción "Ninguna"
    if (name === 'category_id' && value !== '0') {
      const select = event.target;
      const ningunaOption = select.querySelector('option[value="0"]');
      if (ningunaOption) {
        select.removeChild(ningunaOption);
      }

    }

    this.setState({ [name]: value });
  };

   // Limpiar el formulario
   clearForm() {
    this.setState({
      name: '',
      brand: '',
      category_id: '', // Restaurar al valor por defecto ('')
      price: 0,
      photo: '',
      description: '',
    });
  }

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <form onSubmit={this.handleSubmit}>
          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Nombre del Producto:
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={this.handleChange}
                value={this.state.name}
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
                onChange={this.handleChange}
                value={this.state.brand}
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
                value={this.state.category_id}
                onChange={this.handleChange}
                required
              >
                <option value="" disabled>
                  Seleccione una categoría
                </option>
                {this.state.categories.map((category) => (
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
                onChange={this.handleChange}
                value={this.state.price}
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
                onChange={this.handleChange}
                value={this.state.photo}
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
                onChange={this.handleChange}
                value={this.state.description}
                required
              />
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">
              Cargar
            </button>
            <button type="button" className="btn btn-secondary" onClick={this.clearForm.bind(this)}>
              Limpiar
            </button>
          </div>
        </form>
      </div>
    );
  }
}
