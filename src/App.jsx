import {Route,Redirect, Switch} from 'react-router-dom'
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import {ProductRoute,AuthRoute} from './Components/ProductRoute&APIs/index';
import NotFound from './Components/NotFound';

const App = () => (
  <Switch>
    {'<AuthRoute exact path="/login" component={Login} /> '}
    {'<AuthRoute exact path="/signup" component={Signup} /> '}
    <ProductRoute exact path="/" component={Home} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App;