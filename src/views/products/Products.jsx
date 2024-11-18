import { useState, useEffect } from 'react';
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase.js';
import Product from './Product';

function Products() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };

    fetchProducts();
  }, []);

  const openModal = (product = null) => {
    setSelectedProduct(product); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const deleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts((prev) => prev.filter((product) => product.id !== id));
      console.log('Producto eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  return (
    <div>
      <h1 className="title hast-text-centered">Gestión de productos</h1>
      <button className="button is-info is-small is-primary" onClick={() => openModal()}>
        Agregar Producto
      </button>

      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Tamaño</th>
            <th>Vegetariano</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.size}</td>
              <td>{product.vegetarian ? 'Sí' : 'No'}</td>
              <td>
                <button
                  className="button is-info is-small"
                  onClick={() => openModal(product)}
                >
                  Editar
                </button>
                <button
                  className="button is-danger is-small ml-3"
                  onClick={() => deleteProduct(product.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <Product
          product={selectedProduct}
          onClose={closeModal}
          refreshProducts={() => {
            const fetchProducts = async () => {
              const querySnapshot = await getDocs(collection(db, 'products'));
              const productsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setProducts(productsList);
            };
            fetchProducts();
          }}
        />
      )}
    </div>
  );
}

export {Products};
