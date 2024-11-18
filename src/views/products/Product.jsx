import { useState } from 'react';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.js';

function Product({ product, onClose, refreshProducts }) {
  const [formData, setFormData] = useState(
    product || {
      name: '',
      description: '',
      price: '',
      size: '',
      vegetarian: false,
      image: '',
    }
  );

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (product) {
        const productRef = doc(db, 'products', product.id);
        await updateDoc(productRef, formData);
        console.log('Producto actualizado correctamente');
      } else {
        await addDoc(collection(db, 'products'), formData);
        console.log('Producto agregado correctamente');
      }
      refreshProducts();
      onClose();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">
            {product ? 'Editar Producto' : 'Agregar Producto'}
          </p>
          <button className="delete" aria-label="close" onClick={onClose}></button>
        </header>
        <section className="modal-card-body">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label className="label">Nombre</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Descripción</label>
              <div className="control">
                <textarea
                  className="textarea"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="field">
              <label className="label">Precio</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Tamaño</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={formData.size}
                  onChange={(e) => handleChange('size', e.target.value)}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Vegetariano</label>
              <div className="control">
                <label className="checkbox">
                  <input
                    type="checkbox"
                    checked={formData.vegetarian}
                    onChange={(e) => handleChange('vegetarian', e.target.checked)}
                  />
                  Es vegetariano
                </label>
              </div>
            </div>
            <div className="field">
              <label className="label">Imagen</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleChange('image', e.target.value)}
                />
              </div>
            </div>
            <button className="button is-primary" type="submit">
              Guardar
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Product;
