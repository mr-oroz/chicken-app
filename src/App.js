import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Header from './components/Header/Header';
import CategoriesComponent from './components/Header/CategoreisComponent';
import ProductsComponent from './pages/ProductsComponent';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import { Container } from 'react-bootstrap';
import MenuDropdownComponent from './pages/MenuCategories/MenuDropdownComponent';
import SearchProductComponent from './pages/SearchProductComponent';
import ProductContext from './useContext/ProductContext';
import Basket from './pages/Basket/Basket';

const App = () => {

  const [product, setProduct] = useState(JSON.parse(localStorage.getItem('key') || '[]'));
  const toggleClick = (v) => { product.includes(v) ? removeClick(v) : addClick(v) }
  const removeClick = (v) => { setProduct(product.filter(g => g !== v)) }
  const addClick = (v) => setProduct([...product, v]);

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(product))
  }, [product])

  return (
    <ProductContext.Provider value={{
      product,
      setProduct,
      toggleClick,
      removeClick,
    }}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Container>
              <Route path='/' exact >
                <CategoriesComponent />
              </Route>
              <Route path='/area/:menu' exact>
                <ProductsComponent />
              </Route>
              <Route path='/details/:id' exact>
                <ProductDetails />
              </Route>
              <Route path='/categories/:menu' exact>
                <MenuDropdownComponent />
              </Route>
              <Route path='/search/:name' exact>
                <SearchProductComponent />
              </Route>
              <Route path='/basket/' exact>
                <Basket/>
              </Route>
            </Container>
          </Switch>
        </div>
      </Router>
    </ProductContext.Provider>
  );
}

export default App;
