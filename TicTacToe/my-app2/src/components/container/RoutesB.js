import { Routes, Route} from "react-router-dom";
import AIGame from './../pages/AIGame';
import NoMatch from './../pages/ErrorPage';

//Need to figure out why the NoMatch component?

function RoutesB (){
    return(
        <Routes>
        {/* <Route exact path ="/" element={<Portfolio />} */}
         <Route exact path="/" element={<AIGame/>}/>
         <Route path="*" element={<NoMatch/>}/>
        </Routes>
    
    
    );
}

export default RoutesB;