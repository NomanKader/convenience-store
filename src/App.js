import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import DashboardPage from './pages/admin/dashboard/DashboardPage';
import CategoryPage from './pages/admin/category/CategoryPage';
import StockPage from './pages/admin/stock/StockPage';
import UserPage from './pages/admin/user/UserPage';
import SalePage from './pages/cashier/SalePage';
export default function App({history}) {
  return(
    <Router>
      <Switch>
      <Route exact path='/' component={LoginPage}/>        
        <Route exact path='/manager/dashboard' component={DashboardPage}/>
        <Route exact path='/manager/category' component={CategoryPage}/>
        <Route exact path='/manager/stock' component={StockPage}/>
        <Route exact path='/manager/user' component={UserPage}/>
        <Route exact path='/cashier/sale' component={SalePage}/>
      </Switch>
    </Router>
  )
}