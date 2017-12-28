import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import MedicinePage from './containers/MedicinePage.jsx';
import FoodPage from './containers/FoodPage.jsx';
import HousePage from './containers/HousePage.jsx';
import TourPage from './containers/TourPage.jsx';
import CheckMedicalRequest from './containers/CheckMedicalRequest.jsx';
import CheckHouseRequest from './containers/CheckHouseRequest.jsx';
import CheckTourRequest from './containers/CheckTourRequest.jsx';
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
      path: '/medicalrequest',
      component: CheckMedicalRequest
    },

    {
      path: '/house',
      component: HousePage
    },
    {
      path: '/houserequest',
      component: CheckHouseRequest
    },

    {
      path: '/tour',
      component: TourPage
    },
    {
      path: '/tourrequest',
      component: CheckTourRequest
    }

  ]
};

export default routes;
