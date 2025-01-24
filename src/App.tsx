import HomePage from './components/HomePage';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';
import { Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import ProductDetails from './components/ProductDetails';

function App() {
  // const {isLoading} = useAuth0();

  // if(isLoading) return(<div>Loading...</div>);

  return (
    <>
      <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/view-cart' element={<ShoppingCart/>}/>
          <Route path='/product-detail/:id' element={<ProductDetails/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
    </>
  )
}

export default App
