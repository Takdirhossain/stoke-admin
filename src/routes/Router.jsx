import AdminLayout from '@/layouts/AdminLayout';
import Customer from '@/pages/admin/customer/Customer';
import Dashboard from '@/pages/admin/Dashboard/Dashboard';
import Details from '@/pages/admin/details/Details';
import Inactive from '@/pages/admin/inactive/Inactive';
import Items from '@/pages/admin/Items/Items';
import AddSale from '@/pages/admin/sale/components/AddSale';
import EditSale from '@/pages/admin/sale/components/EditSale';
import Sale from '@/pages/admin/sale/Sale';
import AddStoke from '@/pages/admin/stoke/components/AddStoke';
import EditStoke from '@/pages/admin/stoke/components/EditStoke';
import Stoke from '@/pages/admin/stoke/Stoke';
import Collection from '@/pages/collection/Collection';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Login/Login';
import { createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,

  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "admin",
    element:<AdminLayout/>,
    children:[
      {
        path:"dashboard",
        element:<Dashboard/>
      },
      {
        path:"customers",
        element:<Customer/>
      },
      {
        path:"customer/:id",
        element:<Details/>
      },
      {
        path:"stoke",
        element:<Stoke/>
      },
      {
        path:"stoke/add",
        element:<AddStoke/>
      },
      {
        path:"stoke/:id",
        element:<EditStoke/>
      },
      {
        path:"sale",
        element:<Sale/>
      },
      {
        path:"sale/add",
        element:<AddSale/>
      },
      {
        path:"sale/:id",
        element:<EditSale/>
      },
      {
        path:"collection",
        element:<Collection/>
      },
      {
        path:"inactive",
        element:<Inactive/>
      },
      {
        path:"items",
        element:<Items/>
      }
    ]
  }
]);
export default router;
