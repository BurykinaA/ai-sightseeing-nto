import React, { useContext } from 'react';
import '../App.css';
import {Navigate, Routes, Route} from 'react-router-dom';
import { privateRoutes } from './routes';

const AppRouted = () => {
    // var isAuth= false
    // const {isAuth}=useContext(AuthContext)
    
    return (
        // isAuth!=null?
        <Routes>
            {/* {console.log('aut', isAuth)} */}
            {/* <Route path="/" element={<StartPage />} />
            <Route path="/:id" element={<Project />} /> */}
            {privateRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={<route.component/>} exact={true} />
            ))}
            <Route
                path="*"
                element={<Navigate to="/" replace />}
            />
            
            
           
        </Routes>
        // :
        // <Routes>
        //     {/* <Route path="/" element={<StartPage />} />
        //     <Route path="/:id" element={<Project />} /> */}
           
        //     {publicRoutes.map((route) => (
        //         <Route key={route.path} path={route.path} element={<route.component/>} exact={true} />
        //     ))}
        //      <Route
        //         path="*"
        //         element={<Navigate to="/" replace />}
        //     />
        // </Routes>
        

    );
};

export default AppRouted;
