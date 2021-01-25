import './App.css';
import "antd/dist/antd.css";
import "./index.css";
import { Tabs } from 'antd';
import { UserOutlined, ShoppingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Customers from './pages/Customers';
import Products from './pages/Products';
import Orders from './pages/Orders';

const { TabPane } = Tabs;

function App() {
  return (
    <div className="App">
      <Tabs defaultActiveKey="1" centered>
        <TabPane
          tab={
            <span>
              <UserOutlined /> Customers
        </span>}
          key="1">
          <Customers />
        </TabPane>
        <TabPane
          tab={
            <span>
              <ShoppingOutlined /> Products
        </span>}
          key="2">
          <Products />
        </TabPane>
        <TabPane
          tab={
            <span>
              <ShoppingCartOutlined /> Orders
        </span>}
          key="3">
          <Orders />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default App;
