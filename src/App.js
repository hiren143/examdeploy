import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import { Route, Switch } from 'react-router-dom';
import AdminLogin from './adminComponent/AdminLogin';
import Homepage from './adminComponent/Homepage';
import NavbarAdmin from './adminComponent/NavbarAdmin'
import Showuser from './adminComponent/Showuser';
import Question from './adminComponent/Question';
import  Pagenotfound from './adminComponent/Pagenotfound';
import studentNavbar from './adminComponent/studentNavbar';
import Exam from './adminComponent/exam';
import Studentlogin from './adminComponent/studentlogin';
import GuardedRoute from './GuardedRoute';
import GuardedRouteStudent from './GuardedRouteStudent';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="/adminlogin" component={AdminLogin} />
      <Route exact path="/studentlogin" component={Studentlogin} />
      <GuardedRouteStudent exact path="/studentNavbar" component={studentNavbar} auth ={localStorage.getItem("Student_Login")} />
      
      <GuardedRouteStudent exact path="/exam" component={Exam} auth ={localStorage.getItem("Student_Login")} />
      <GuardedRoute exact path="/navbaradmin" component={NavbarAdmin} auth ={localStorage.getItem("Login")} />
      <GuardedRoute exact path="/showuser" component={Showuser}  auth ={localStorage.getItem("Login")}/>
      <GuardedRoute exact path="/question" component={Question} auth ={localStorage.getItem("Login")} />
      <Route path="*" component={Pagenotfound} /> 
    </Switch>
  );
}

export default App;
