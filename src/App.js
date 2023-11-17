
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login/Login';
import PaymentCollection from './Users/PaymentCollection';
import Sidebar from './Nav/SideBar';
import { Toaster } from 'react-hot-toast';
import UpcomingPayment from './Users/UpcomingPayment';
import UserForm from './Users/UserForm';
import PhotoUpload from './Users/PhotoUpload';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/users' element={<Sidebar/>}/>
    <Route path='/add' element={<UserForm/>}/>
    <Route path="/products/:id" element={<PaymentCollection/>} />
    <Route path="/userphoto" element={<PhotoUpload/>} />
     </Routes>
     <Toaster
  position="top-right"
  reverseOrder={false}
/>
     </BrowserRouter>
    </div>
  );
}

export default App;
