import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import axios from 'axios';
import BasketScreen from './screens/BasketScreen';
import SignInScreen from './screens/SignInScreen';
import PostageScreen from './screens/PostageScreen';
import SignUpScreen from './screens/SignUpScreen';
import PaymentMethodScreen from './screens/paymentScreen';
import SearchScreen from './screens/SearchScreen';
import SearchBox from './components/SearchBox';
import UserProfileScreen from './screens/UserProfileScreen';
import AdminScreen from './screens/AdminScreen';
import EditProductScreen from './screens/EditProductScreen';
import AddProductScreen from './screens/AddProductScreen';
import CreateOrderScreen from './screens/CreateOrderScreen';
import CompleteOrderScreen from './screens/CompleteOrderScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { basket, userInfo } = state;
  const { product } = state;

  //Remove items when signout has occured
  const signoutHandler = () => {
    ctxDispatch({ type: 'user_signout' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('paymentMethod');
  };

  return (
    <BrowserRouter>
      {/* using react bootstrap to style the elements within container */}
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar
            className="color-nav"
            varient="light"
            style={{
              backgroundSize: '0',
              backgroundColor: '#4bacb8',
              color: '#ffffff',
            }}
          >
            <Container>
              <SearchBox />
              <LinkContainer className="navbar-brand mx-auto" to="/">
                <Navbar.Brand>Shopping Project</Navbar.Brand>
              </LinkContainer>
              <Nav className="mr-auto">
                <Link to="/basket" className="nav-link">
                  Basket
                  {basket.basketItems.length > 0 && (
                    <Badge pill bg="danger">
                      {basket.basketItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown
                    className="navbar-nav w-100"
                    title={userInfo.name}
                    id="basic-nav-dropdown"
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/basket/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen />} />
              <Route path="/basket" element={<BasketScreen />} />
              <Route path="/basket/signin" element={<SignInScreen />} />
              <Route path="/signup" element={<SignUpScreen />} />
              <Route path="/postage" element={<PostageScreen />}></Route>
              <Route path="/profile" element={<UserProfileScreen />}></Route>
              <Route path="/payment" element={<PaymentMethodScreen />}></Route>
              <Route path="/admin" element={<AdminScreen />}></Route>
              <Route path="/placeorder" element={<CreateOrderScreen />}></Route>
              <Route path="/addProduct" element={<AddProductScreen />}></Route>
              <Route
                path="/completeOrder"
                element={<CompleteOrderScreen />}
              ></Route>
              <Route path="/search" element={<SearchScreen />}></Route>
              <Route
                path="/admin/product/:slug"
                element={<EditProductScreen />}
              ></Route>
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">Louis Symons 21713170</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
