import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import MedicinePage from './containers/MedicinePage.jsx';
import FoodPage from './containers/FoodPage.jsx';
import HousePage from './containers/HousePage.jsx';
import TourPage from './containers/TourPage.jsx';
import NursePage from './containers/NursePage.jsx';
import CheckRequest from './containers/CheckRequest.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();

        // change the current URL to /
        replace('/');
      }
    },

    {
      path: '/medicine',
      component: MedicinePage
    },
    {
      path: '/house',
      component: HousePage
    },
    {
      path: '/request',
      component: CheckRequest
    },

    {
      path: '/tour',
      component: TourPage
    },
    {
      path: '/nurse',
      component: NursePage
    },
    {
      path: '/food',
      component: FoodPage
    }  
  ]
};

export default routes;
