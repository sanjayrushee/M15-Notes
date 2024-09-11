import { Route, Redirect } from 'react-router-dom';
import Cookie from 'js-cookie';

const ProductRoute = props => {
  const jsToken = Cookie.get('jwtToken')
  if (jsToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

const AuthRoute = ({ component: Component, ...rest }) => {
    const jsToken = Cookie.get('jwtToken');
    return (
      <Route
        {...rest}
        render={(props) =>
          jsToken ? <Redirect to="/" /> : <Component {...props} />
        }
      />
    );
  };
export  {ProductRoute,AuthRoute}