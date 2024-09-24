import {Route,Redirect, Switch} from 'react-router-dom'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import {ProductRoute,AuthRoute} from './Components/ProductRoute&APIs/index';
import NotFound from './Components/NotFound';
import ForgotPassword from './Components/ForgotPassword';
import DelNotes from './Components/DelNotes';
import ArchNotes from './Components/ArchNotes';


const App = () => (
  <Switch>
    <AuthRoute exact path="/login" component={Login} /> 
    <AuthRoute exact path="/signup" component={Signup} /> 
    <AuthRoute exact path="/forgotemail" component={ForgotPassword} />
    <ProductRoute exact path="/" component={Home} />
    <ProductRoute exact path="/archnotes" component={ArchNotes} />
    <ProductRoute exact path="/delnotes" component={DelNotes} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App;