import React, { useContext, useEffect, useState } from 'react';
import { Navbar, NavDropdown, Form, Button, Nav, FormControl } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ProductContext from '../../useContext/ProductContext';

const Header = () => {
    const [dropdown, setDropdown] = useState([]);
    const [search, setSearch] = useState('');
    const Product = useContext(ProductContext);
    let history = useHistory();
    useEffect(() => {
        axios.get(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            .then((res) => {
                const data = res.data.meals;
                setDropdown(data)
            })
    }, [])
    const handleClick = (v) => {
        history.push(`/categories/${v}`);
    }

    const handleClickSearch = () => {
        history.push(`/search/${search}`)
    }

    const handleChange = (e) => {
        setSearch(e)
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/basket/">Basket ({Product.product.length})</Nav.Link>
                    <NavDropdown title="Categories" id="basic-nav-dropdown">
                        {
                            dropdown.map((v, i) => {
                                return (
                                    <NavDropdown.Item key={i} onClick={() => {handleClick(v.strArea)}} value={v.strArea}>{v.strArea}</NavDropdown.Item>
                                )
                            })
                        }
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl onChange={(e) => {handleChange(e.target.value)}} type="text" placeholder="Search" className="mr-sm-2" />
                    <Button onClick={() => handleClickSearch()} variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header