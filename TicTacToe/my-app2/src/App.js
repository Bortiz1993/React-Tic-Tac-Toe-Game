import {BrowserRouter} from 'react-router-dom';
import Header from './components/container/Header';
 import RoutesB from './components/container/RoutesB';
 import './index.css';

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <RoutesB/>

    </BrowserRouter>
  );
}

export default App;