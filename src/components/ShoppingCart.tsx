// ShoppingCart.tsx
import { useDispatch, useSelector } from "react-redux";
import { Container, Button, Spinner, Alert, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { addItem, removeItem, checkout } from "../features/cartSlice";
import { useEffect, useState } from 'react';
import { RootState } from '../store';
import { fetchProducts } from "../features/productsSlice";
import { useNavigate } from "react-router-dom";

const ShoppingCart: React.FC = () => {
    const dispatch = useDispatch();
    const cart = useSelector((state:RootState)=> state.cart);
    const products = useSelector((state:RootState)=>state.products.items);
    const productsStatus = useSelector((state:RootState)=>state.products.status);
    const error = useSelector((state:RootState)=>state.products.error);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const getProduct = (id:number) => {
        const product = products.find((product)=>product.id===id);
        return product || { title: 'Unknown Product', description: '', category: '', price: 0, image: ''};
    }

    useEffect(()=>{
        updateTotalAmount();
        if(productsStatus === 'idle'){
            dispatch(fetchProducts());
        }
    }, [productsStatus, dispatch, cart.products]);

    const updateTotalAmount = () => {
        let amount = 0;
        Object.entries(cart.products).map(([id, quantity])=>{
            amount+=quantity*getProduct(parseInt(id)).price;
        });
        setTotalAmount(amount);
    }

    const handleAddItem = (id:number) => {
        dispatch(addItem({id}));
    }

    const handleRemoveItem = (id:number) => {
        dispatch(removeItem({id}));
    }
    const handleCheckout = () => {
        dispatch(checkout());
    }

    return(
        <Container className="mt-5 shopping-bag p-5 rounded">
            <h1 className='text-center mb-3'>Shopping Bag</h1>
            {(productsStatus==='loading'&& <Spinner animation='border' role='status'><span className='visually-hidden'>Loading...</span></Spinner>)}
            {(productsStatus==='failed'&& <Alert variant='danger'>{error}</Alert>)}
            <Table striped hover className="rounded">
                <tbody>
                {Object.entries(cart.products).map(([id, quantity]) => (
                    <tr key={id} className='align-middle'>
                        <td><img 
                            src={getProduct(parseInt(id)).image} 
                            alt={getProduct(parseInt(id)).title} 
                            style={{width:'50px', marginRight:'10px'}}/></td>
                        <td><a href={`/product-detail/${id}`}>{getProduct(parseInt(id)).title}</a></td> 
                        <td>${getProduct(parseInt(id)).price.toFixed(2)}</td>
                        <td>
                        <Table bordered style={{width:'100px'}} className='m-0'>
                            <tbody>
                            <tr>
                                <td><button className='customButton' onClick={() => handleRemoveItem(parseInt(id))}>-</button></td>
                                <td>{quantity}</td>
                                <td><button className='customButton' onClick={() => handleAddItem(parseInt(id))}>+</button></td>
                            </tr>
                            </tbody>
                        </Table>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td></td>
                    <td className='text-end'>Totals:</td>
                    <td className='text-center'>${totalAmount.toFixed(2)}</td>
                    <td className='text-center'>{cart.totalItems} items</td>
                </tr>
                <tr>

                </tr>
                </tbody>
            </Table>
            
            <div className='text-end'>
            <Button className='btn btn-primary' onClick={()=>{handleCheckout()}}>Check Out</Button>
            <Link to="/home"><Button className="ms-2 btn btn-secondary">Keep Shopping</Button></Link>
            </div>
        </Container>
    );
};

export default ShoppingCart;