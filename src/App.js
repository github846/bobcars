import './index.css';
import Navbar from './Component/Layout/NavBar';
import Footer from './Component/Layout/Footer';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import NewCar from './Pages/NewCar';
import SearchCar from './Pages/SearchCar';
import AllCars from './Pages/AllCars';
import NewClient from './Pages/NewClient';
import SearchClient from './Pages/SearchClient';
import AllClients from './Pages/AllClients';
import NewContract from './Pages/NewContract';
import SearchContract from './Pages/SearchContract';
import AllContracts from './Pages/AllContracts';
import NewInvoice from './Pages/NewInvoice';
import SearchInvoice from './Pages/SearchInvoice';
import AllInvoices from './Pages/AllInvoices';
import NewOption from './Pages/NewOption';
import SearchOption from './Pages/SearchOption';
import AllOptions from './Pages/AllOptions';
import About from './Pages/About';
import Error404 from './Pages/Error404';

function App() {
  return (
    <div class="my_body">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cars' element={<AllCars />}></Route>
        <Route path='/newcar' element={<NewCar />}></Route>
        <Route path='/searchcar' element={<SearchCar />}></Route>
        <Route path='/clients' element={<AllClients />}></Route>
        <Route path='/newclient' element={<NewClient />}></Route>
        <Route path='/searchclient' element={<SearchClient />}></Route>
        <Route path='/contracts' element={<AllContracts />}></Route>
        <Route path='/newcontract' element={<NewContract />}></Route>
        <Route path='/searchcontract' element={<SearchContract />}></Route>
        <Route path='/invoices' element={<AllInvoices />}></Route>
        <Route path='/newinvoice' element={<NewInvoice />}></Route>
        <Route path='/searchinvoice' element={<SearchInvoice />}></Route>
        <Route path='/options' element={<AllOptions />}></Route>
        <Route path='/newoption' element={<NewOption />}></Route>
        <Route path='/searchoption' element={<SearchOption />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
      <Footer />
    </div>
    
  );
}

export default App;
