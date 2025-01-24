import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { addItem } from "../features/cartSlice";
import { fetchProducts } from '../features/productsSlice';


const ProductDetails: React.FC = () => {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({title: '', description: '', category: '', price: 0, image: ''});
    const { id } = useParams();
    const navigate = useNavigate();
    const products = useSelector((state:RootState)=>state.products.items);
    const productsStatus = useSelector((state:RootState)=>state.products.status);
    const error = useSelector((state:RootState)=>state.products.error);

    const getProduct = (id:number) => {
        const p = products.find((product)=>product.id===id);
        setProduct(p || { title: 'Unknown Product', description: '', category: '', price: 0, image: ''});
        //return product || { title: 'Unknown Product', description: '', category: '', price: 0, image: ''};
    }

    useEffect(()=>{
        getProduct(Number(id));
        if (productsStatus==='idle'){
            dispatch(fetchProducts());
        }
    },[id, productsStatus, dispatch]);

    const handleAddToCart = (id:number) => {
            dispatch(addItem({id}));
    };

    return (
        <Container className="product-detail p-3 rounded mt-3 text-center">
            {productsStatus === 'loading' && (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
            {productsStatus === 'failed' && <Alert variant="danger">{error}</Alert>}
            {productsStatus === 'succeeded' && product?.image ? (
                <>
                    <img
                        src={product.image}
                        className="card-img-top rounded"
                        alt={`${product.title} Image`}
                        style={{height:'300px', width:'auto'}}
                    />
                    <h1>{product.title}</h1>
                    <p className='lead'>Price: ${product.price.toFixed(2)}</p>
                    <p className="mt-3">{product.description || 'No description available.'}</p>
                    <Button variant="primary" onClick={() => handleAddToCart(Number(id))}>
                        Add to Cart
                    </Button>
                    &nbsp;
                    <Link to="/home">
                        <Button className="ms-2 btn btn-secondary">Keep Shopping</Button>
                    </Link>
                </>
            ) : (
                productsStatus === 'succeeded' && <h1>Product not found.</h1>
            )}
        </Container>
    );    

}

export default ProductDetails;