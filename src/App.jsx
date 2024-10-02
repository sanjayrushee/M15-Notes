import React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';
import DelNotes from './Components/DelNotes';
import ArchNotes from './Components/ArchNotes';
import NotFound from './Components/NotFound';
import { ProductRoute, AuthRoute } from './Components/ProductRoute&APIs/index';

const App = () => (
  <>
    {/* Helmet for SEO */}
    <Helmet>
      <title>M15 Notes - Take and Organize Notes</title>
      <meta name="description" content="M15 Notes helps you easily take, organize, and manage your notes." />
      <meta name="keywords" content="notes, M15 Notes, productivity, organization, note-taking app" />
      
      {/* Open Graph Meta Tags for social media sharing */}
      <meta property="og:title" content="M15 Notes - Organize Your Ideas" />
      <meta property="og:description" content="A simple and effective note-taking app to organize your ideas." />
      <meta property="og:url" content="https://m15notes.sanjayrushee.live" />
      <meta property="og:image" content="https://m15notes.sanjayrushee.live/og-image.png" />
      <meta property="og:type" content="website" />

      {/* Twitter Card Meta Tags for better Twitter sharing */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="M15 Notes - Organize Your Ideas" />
      <meta name="twitter:description" content="A simple and effective note-taking app to organize your ideas." />
      <meta name="twitter:image" content="https://m15notes.sanjayrushee.live/og-image.png" />

      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "M15 Notes",
            "url": "https://m15notes.sanjayrushee.live",
            "description": "M15 Notes helps you easily take, organize, and manage your notes.",
            "applicationCategory": "Productivity",
            "operatingSystem": "Web",
            "image": "https://m15notes.sanjayrushee.live/og-image.png"
          }
        `}
      </script>
    </Helmet>

    {/* Routes */}
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
  </>
);

export default App;
