import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const productsCollection = collection(db, "products");
                const productsSnapshot = await getDocs(productsCollection);

                const productsList = productsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                
                setProducts(productsList);
            } catch (error) {
                console.log("Error al cargar los productos " + error);
            }
        };
        getProducts();
    }, []);

    return (
        <div className="container p-5">
            <h1 className="title hast-text-centered">Menú de la pizzería</h1>
            <div className="columns is-multiline">
                {products.map(product => (
                        <div className="column is-one-quarter" key={product.id}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={product.image} alt={product.name} />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="media">
                                        <div className="media-content">
                                            <p className="title is-4">{product.name}</p>
                                            <p className="subtitle is-6">${product.price}</p>
                                            <p>{product.description}</p>
                                            <p><strong>Tamaño:</strong>{product.size}</p>
                                            <p>{product.vegetarian ? "Vegetariano" : "No Vegetariano"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}

export {Home};
