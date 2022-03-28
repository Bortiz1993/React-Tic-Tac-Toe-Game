import { Routes, Route } from "react-router-dom";
import Home from '../pages/Home';
// import Contact from '../pages/Contact';
import AIGame from '../pages/AIGame.js';
// import NoMatch from '../pages/NoMatch';

function RoutesB (){
    return(
    <main>
    <div>
        <Routes>
        <Route exact path ="/" element={<Home />}/>
        <Route path="AIGame/*" element={<AIGame/>}/>
        </Routes>
        </div>
    </main>
    );
}

export default RoutesB;