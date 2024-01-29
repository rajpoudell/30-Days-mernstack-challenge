
import './App.css';

import { Route,Routes } from 'react-router-dom';
import { Home } from './Home';
import { Service } from './Service';
import { Layout } from './Layout';
import { Nomatch } from './Nomatch';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element = {<Layout/>}>
          <Route index element= {<Home/>}/>
          <Route path='/service' element= {<Service/>}/>

          <Route path='*' element= {<Nomatch/>}/>
        
        </Route>
        
      </Routes>
     
    </div>
  );
}

export default App;



