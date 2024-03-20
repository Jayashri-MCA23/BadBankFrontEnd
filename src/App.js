import logo from './logo.svg';
import './App.css';
import Navbar from './navbar';
import Create from './create';
import Deposit from './deposit';
import Withdraw from './withdraw';
import Alldata from './alldata';
import Home from './home.js'
import {HashRouter,Routes,Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from './context';

function App() {
    return (<><div className='home'>
   <Navbar/>
   <UserContext.Provider value={{'users':[{name:'xyz',email:'xyz@gmail.com',password:'123',amount:100}]}}>
   <HashRouter> 
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/create" element={<Create />}></Route>
    <Route path="/deposit" element={<Deposit />}></Route> 
    <Route path="/withdraw" element={<Withdraw />}></Route>
    <Route path="/alldata" element={<Alldata />}></Route>   
    </Routes>
   </HashRouter>
   </UserContext.Provider>
   </div>
   </>
  );
}

export default App;
