import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/home/Home';
import Profile from './components/profile/Profile';
import Issues from './components/issues/Issues';
import Layout from './components/Layout';
import Rating from './components/Rating/Rating';

function App() {

  return (
    <div className='w-full '>
      <Routes>
        <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='profile' element={<Profile />} />
            <Route path='vote' element={<Issues />} />
            <Route path='rate/:userAddr' element={<Rating />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
