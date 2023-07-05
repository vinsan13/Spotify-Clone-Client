import React from 'react'

import Feed from './components/Feed/Feed'
import Form from './components/Form/Form'


import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Feed />} />
                <Route path="/upload" element={<Form />} />
               
            </Routes>
        </BrowserRouter>
    )
}

export default App