import { Routes, Route} from "react-router-dom";
// import Portfolio from '../pages/Portfolio';
// import Contact from '../pages/Contact';
import AIGame from '../pages/AIGame.js';
import NoMatch from '../pages/NoMatch.js';

//Need to figure out why the NoMatch component?

function RoutesB (){
    return(
    
        <Routes>
        {/* <Route exact path ="/" element={<Portfolio />} */}
        <Route path="AIGame/*" element={<AIGame/>}/>
        <Route path="*" element={<NoMatch/>}/>
        </Routes>
    
    
    );
}

export default RoutesB;