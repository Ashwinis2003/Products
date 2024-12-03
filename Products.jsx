import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts } from "./slices/productSlice";

function Products({ test }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [inputSearch, setInputSearch] = useState('');
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    const prod = useSelector((state) => state.products.products);

    useEffect(() => {
        if (!token) {
            navigate('/');
        } else {
            dispatch(fetchProducts());
        }
    }, [token, navigate, dispatch]);

    const handleSearch = (e) => setInputSearch(e.target.value);

    const filteredProducts = prod.filter((each) =>
        each.title.toLowerCase().includes(inputSearch.toLowerCase())
    );

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleAddToCart = (productId) => {
        console.log(`Add to cart clicked for product ID: ${productId}`);
    };

    const handleBuyNow = (productId) => {
        console.log(`Buy now clicked for product ID: ${productId}`);
    };

    return (
        <div className="container">
            <div className="d-flex">
                <h1 className="text-center">Products</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>

            <div className="text-center my-5">
                <input
                    type="text"
                    placeholder="Enter the product title"
                    onChange={handleSearch}
                />
            </div>

            <div className="row">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <div key={product.id} className="col-xs-12 col-sm-12 col-md-4 col-lg-3 mb-4">
                            <div style={{ border: '1px solid #ccc', padding: '10px', textAlign: 'center' }}>
                                <Link to={`/products/${product.id}`}>
                                    <img
                                        src={product.image}
                                        style={{ width: '200px', height: '200px' }}
                                        alt={product.title}
                                    />
                                </Link>
                                <Link to={`/products/${product.id}`}>
                                    {product.title.length > 25
                                        ? `${product.title.substring(0, 25)}...`
                                        : product.title}
                                </Link>
                                <h3>${product.price}</h3>
                                <div
                                    style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}
                                >
                                    <button
                                        className="btn btn-warning"
                                        style={{ flex: '1', marginRight: '5px' }}
                                        onClick={() => handleAddToCart(product.id)}
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                        className="btn btn-success"
                                        style={{ flex: '1' }}
                                        onClick={() => handleBuyNow(product.id)}
                                    >
                                        Buy Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No products available</h1>
                )}
            </div>
        </div>
    );
}

export default Products;
