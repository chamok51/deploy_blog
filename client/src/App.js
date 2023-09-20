import { useContext } from 'react'
import TopBar from './componente/topbar/TopBar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import PostDetails from './pages/postDeatails/PostDetails'
import Register from './pages/register/Register'
import Settings from './pages/settings/Settings'
import Write from './pages/write/Write'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Context } from './context/Context'

function App() {
  const { user } = useContext(Context)
  return (
    <>
      <BrowserRouter>
        <TopBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/postdetails/:id' element={<PostDetails />} />
          <Route path='/login' element={user ? <Home /> : <Login />} />
          <Route path='/register' element={user ? <Home /> : <Register />} />
          <Route path='/write' element={user ? <Write /> : <Login />} />
          <Route path='/settings' element={user ? <Settings /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
