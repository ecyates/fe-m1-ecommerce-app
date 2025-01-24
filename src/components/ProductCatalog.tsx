import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../features/cartSlice';
import { Badge, Card, Button, Row, Col, Alert, Spinner, Form, Container } from 'react-bootstrap';
import { fetchProducts } from '../features/productsSlice';
import { useEffect, useState } from 'react';
import { RootState } from '../store';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const fetchCategories = async (): Promise<string[]> => {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    return response.data;
}

const ProductCatalog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state:RootState)=>state.products.items);
    const productsStatus = useSelector((state:RootState)=>state.products.status);
    const error = useSelector((state:RootState)=>state.products.error);
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const { 
            data: categoryData, 
            isLoading: isLoadingCategories, 
            error: categoryError, 
        } = useQuery<string[]>({
            queryKey: ['categories'],
            queryFn: fetchCategories,
        });

    useEffect(()=>{
        if (productsStatus==='idle'){
            dispatch(fetchProducts());
        }
    },[productsStatus, dispatch, selectedCategory]);

    const handleAddToCart = (id:number) => {
        dispatch(addItem({id}));
    };

    return(
        <Container className='product-catalog p-3 rounded mt-3'>
            <h1 className='text-center mb-3'>Product Catalog</h1>            
            {((productsStatus==='loading'||(isLoadingCategories))&& <Spinner animation='border' role='status'><span className='visually-hidden'>Loading...</span></Spinner>)}
            {((productsStatus==='failed'||(categoryError))&& <Alert variant='danger'>{error}</Alert>)}
            <Form style={{width:'200px'}} className='mb-3'>
                <Form.Select onChange={(e)=>setSelectedCategory(e.target.value)} aria-label="Filter products by category">
                    <option value=''>Filter Products</option>
                    {categoryData?.map(category=>(
                    <option key={category} value={category}>{category}</option>
                    ))}
                </Form.Select>
            </Form>
            <Row xs={1} md={4} className='g-4'>
                {products.filter(product=>selectedCategory?product.category===selectedCategory:product===product).map(product=>(
                    <Col md={4} key={product.id}>
                    <Card>
                        <Card.Header>
                        <Card.Img variant="top" src={product.image} style={{height:'250px', objectFit:'contain'}}></Card.Img>

                        </Card.Header>
                        <Card.Body>
                            <Badge className="bg-secondary">{product.category}</Badge>
                            <div className='text-center mt-2'>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>${product.price.toFixed(2)}</Card.Text>
                            <Button variant="primary" onClick={()=>{handleAddToCart(product.id)}}>Add to Cart</Button>&nbsp;
                            <Button variant="secondary" onClick={()=>{navigate(`/product-detail/${product.id}`)}}>View Details</Button>
                            </div>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductCatalog;