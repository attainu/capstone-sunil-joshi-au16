import './App.css';
import {BrowserRouter as Router , Route} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './Screens/HomeScreen'
import ProductScreen from './Screens/ProductScreen'
import CartScreen from './Screens/CartScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen  from './Screens/RegisterScreen'
import ProfileScreen from './Screens/ProfileScreen.jsx'
import ShippingScreen from './Screens/ShippingScreen'
import PaymentScreen from './Screens/PaymentScreen'
import PlaceOrderScreen from './Screens/PlaceorderScreen'
import OrderScreen from './Screens/OrderScreen'
import UserlistScreen  from './Screens/UserlistScreen'
import UserEditScreen from './Screens/UserEditScreen'
import ProductListScreen from './Screens/ProductListScreen'
import ProductEditScreen from './Screens/ProductEditScreen'
import AllorderListScreen from './Screens/AllorderListScreen'

const App=() => {
  return (
    <Router>
      <Header/>
      <main style={{marginTop :'7rem'}} className='py-3'>
        <Container> 
      
            <Route  path='/admin/user/:id/edit' component = {UserEditScreen} exact /> 
            <Route  path='/order/:id?' component = {OrderScreen} exact /> 
            <Route  path='/placeorder' component = {PlaceOrderScreen} exact /> 
            <Route  path='/payment' component = {PaymentScreen} exact /> 
            <Route  path='/shipping' component = {ShippingScreen} exact /> 
            <Route  path='/register' component = {RegisterScreen} exact />
            <Route  path='/login' component = {LoginScreen} exact />
            <Route  path='/product/:id' component ={ProductScreen}  />
            <Route  path ='/cart/:id?' component={CartScreen}/>   
            <Route  path='/' component = {HomeScreen} exact />
            <Route  path='/admin/userlist' component = {UserlistScreen} exact /> 
            <Route  path='/admin/productlist' component = {ProductListScreen} exact /> 
            <Route  path='/admin/productlist/:pageNumber' component = {ProductListScreen} exact /> 
            <Route  path='/admin/orderlist' component = {AllorderListScreen} exact /> 
            <Route  path='/admin/product/:id/edit' component = {ProductEditScreen} exact /> 
            <Route  path='/profile' component = {ProfileScreen} exact />    
            <Route  path='/search/:keyword' component = {HomeScreen} exact />
            <Route  path='/page/:pageNumber' component = {HomeScreen} exact />
            <Route  path='/search/:keyword/page/:pageNumber' component = {HomeScreen} exact />


        </Container>
      </main>
      <Footer/>
    </Router>
  );
}

export default App;
