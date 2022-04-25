import { Routes, Route} from "react-router-dom";
import AIGame from './../pages/AIGame';
import NoMatch from './../pages/ErrorPage';

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