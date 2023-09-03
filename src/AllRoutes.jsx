import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./components/Home"
import App from './App';

export default function AllRoutes(){

    return(
        <>

            <div>

                <Router>
                    <Routes>
                        <Route path="/" element={<App />}></Route>
                        <Route path="/home" element={<Home/>}></Route>
                    </Routes>
                </Router>

            </div>

        </>
    )

}