import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import PostBook from "./pages/PostBook"
import GetBook from "./pages/GetBook"
import DeleteBook from "./pages/DeleteBook"
import PutBook from "./pages/PutBook"
const App = () => {
  return (
    <Routes>
      <Route path = '/' element = {Home}/>
      <Route path = '/books/get' element = {<GetBook/>}/>
      <Route path = '/books/post' element = {<PostBook/>}/>
      <Route path = '/books/put' element = {<PutBook/>}/>
      <Route path = '/books/delete' element = {<DeleteBook/>}/>
    </Routes>
  )
}

export default App