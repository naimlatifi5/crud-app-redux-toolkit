import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './userPost/index'
import CreatePost from './userPost/createPost'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/createPost" element={<CreatePost />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
