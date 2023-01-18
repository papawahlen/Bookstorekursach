import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import CartScreen from "./Screens/CartScreen";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {LinkContainer} from 'react-router-bootstrap'
import {Nav, NavDropdown, Badge} from "react-bootstrap";
import {Store} from "./Store";
import {useContext} from "react";
import SigninScreen from "./Screens/SigninScreen";
import ShippingAddressScreen from "./Screens/ShippingAddressScreen";
import SignupScreen from "./Screens/SignupScreen";
import PaymentMethodScreen from "./Screens/PaymentMethodScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
import OrderHistoryScreen from "./Screens/OrderHistoryScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import ProtectedRoute from './Components/ProtectedRoute';
import DashboardScreen from './Screens/DashboardScreen';
import AdminRoute from './Components/AdminRoute';

function App() {
    const { state, dispatch: ctxDispatch } = useContext(Store);
    const { cart, userInfo } = state;

    const signoutHandler = () => {
        ctxDispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        localStorage.removeItem('shippingAddress');
        localStorage.removeItem('paymentMethod');
        window.location.href = '/signin';
    };

  return (
      <BrowserRouter>
    <div className="d-flex flex-column site-container">
        <ToastContainer position="bottom-center" limit={1} />
      <header>
          <Navbar bg="dark" variant="dark" expand="lg">
              <Container>
                  <LinkContainer to="/">
                      <Navbar.Brand>Bookstore</Navbar.Brand>
                  </LinkContainer>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto  w-100  justify-content-end">
                          <Link to="/cart" className="nav-link">
                              Кошик
                              {cart.cartItems.length > 0 && (
                                  <Badge pill bg="danger">
                                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                                  </Badge>
                              )}
                          </Link>
                          {userInfo ? (
                              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                                  <LinkContainer to="/profile">
                                      <NavDropdown.Item>Мій профіль</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to="/orderhistory">
                                      <NavDropdown.Item>Історія замовлень</NavDropdown.Item>
                                  </LinkContainer>
                                  <NavDropdown.Divider />
                                  <Link
                                      className="dropdown-item"
                                      to="#signout"
                                      onClick={signoutHandler}
                                  >
                                      Вийти
                                  </Link>
                              </NavDropdown>
                          ) : (
                              <Link className="nav-link" to="/signin">
                                  Увійти
                              </Link>
                          )}
                          {userInfo && userInfo.isAdmin && (
                              <NavDropdown title="Admin" id="admin-nav-dropdown">
                                  <LinkContainer to="/admin/dashboard">
                                      <NavDropdown.Item>Панель</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to="/admin/productlist">
                                      <NavDropdown.Item>Книги</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to="/admin/orderlist">
                                      <NavDropdown.Item>Замовлення</NavDropdown.Item>
                                  </LinkContainer>
                                  <LinkContainer to="/admin/userlist">
                                      <NavDropdown.Item>Користувачі</NavDropdown.Item>
                                  </LinkContainer>
                              </NavDropdown>
                          )}
                      </Nav>
                  </Navbar.Collapse>
              </Container>
           </Navbar>
      </header>
        <main>
            <Container className = "mt-3">
            <Routes>
                <Route path="/product/:slug" element={<ProductScreen/>}/>
                <Route path="/Cart" element={<CartScreen/>}/>
                <Route path="/signin" element={<SigninScreen/>}/>
                <Route path="/signup" element={<SignupScreen/>}/>
                <Route path="/shipping" element={<ShippingAddressScreen/>}/>
                <Route path="/payment" element={<PaymentMethodScreen/>}></Route>
                <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>}/>
                <Route path="/placeorder" element={<PlaceOrderScreen/>}></Route>
                <Route path="/order/:id" element={<ProtectedRoute><OrderScreen /></ProtectedRoute>}></Route>
                <Route path="/orderhistory" element={<ProtectedRoute><OrderHistoryScreen /></ProtectedRoute>}></Route>
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminRoute><DashboardScreen /></AdminRoute>}></Route>
                <Route path="/" element={<HomeScreen/>}/>
            </Routes>
            </Container>
        </main>
    </div>
      </BrowserRouter>
  );
}

export default App;
