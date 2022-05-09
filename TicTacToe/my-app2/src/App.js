// import { height } from '@mui/system';
import {BrowserRouter} from 'react-router-dom';
import Header from './components/container/Header';
 import RoutesB from './components/container/RoutesB';
//  import './index.css';
import './style/styles.css';
import './style/game.css';
import './style/board.css';

function App() {
  return (
    <BrowserRouter>
    <main>
    <Header/>
    <RoutesB/>
    </main>

    </BrowserRouter>
  );
}

export default App;