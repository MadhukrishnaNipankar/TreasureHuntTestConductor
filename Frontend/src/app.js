import {Routes,Route} from 'react-router-dom'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminHome from './pages/Admin/Home'
import Home from './pages/Home'
import Instruction from './pages/Instruction'
import Test from './pages/Test'
import NotFound from './components/notfound'
import LeaderBoard from './components/leaderbord'
const App=()=>{
  
return(
    <>
  <Routes>   
    <Route  path="/" Component={Home}></Route>
    <Route  path="/instruction" Component={Instruction}></Route>
    <Route  path="/test" Component={Test}></Route>
    <Route  path="/admin-login" Component={AdminLogin}></Route>
    <Route  path="/dashboard" Component={AdminHome}></Route>
    <Route path="/leaderboard" Component={LeaderBoard}></Route>
    <Route  path="*" Component={NotFound}/>
  </Routes>
    </>
)

}

export default App