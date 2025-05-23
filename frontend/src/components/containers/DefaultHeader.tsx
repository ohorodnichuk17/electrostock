import { Badge, Button, Image, Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, PoweroffOutlined, UserAddOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { logout } from "../../store/authentication/authentication.slice.ts";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Logo from "../../assets/logo.png";
import "./MyMenu.css"

const { Header } = Layout;

const DefaultHeader = () => {
   const dispatch = useAppDispatch();
   const location = useLocation();
   const { isSupplier } = useAppSelector(state => state.authentication);
   const { isLogin, user } = useAppSelector(state => state.authentication);
   const { cartItems } = useAppSelector(state => state.cart);

   const handleLogout = () => {
      dispatch(logout());
   };

   const menuItems = [
      { key: 'home', label: 'Home', path: '/' },
   ];

   console.log("isSupplier:", isSupplier, "user:", user);


   if (isSupplier) {
      menuItems.push({ key: 'warestore', label: 'Warehouse', path: '/warehouses' });
      menuItems.push({ key: 'component', label: 'Component', path: '/components' });
      menuItems.push({ key: 'order', label: 'Order', path: '/orders' });
   }

   return (
      <Header style={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'space-between',
         backgroundColor: '#C39964',
         padding: '0 24px',
      }}>
         <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '40px', flexShrink: 0 }}>
               <Image
                  src={Logo}
                  style={{
                     width: '100%',
                     height: 'auto',
                  }}
               />
            </div>
            <div
               className="demo-logo"
               style={{
                  marginLeft: '16px',
                  color: '#fff',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
               }}
            >
               Electro Stock
            </div>
         </div>

         <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname.substr(1)]}
            style={{
               flex: 1,
               minWidth: 0,
               backgroundColor: 'transparent',
               borderColor: 'transparent',
               color: '#fff',
            }}
            className="my-custom-menu"
         >
            {menuItems.map((item) => (
               <Menu.Item key={item.key}>
                  <Link
                     to={item.path}
                     style={{
                        color: 'inherit',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                     }}
                     onMouseEnter={(e) => (e.currentTarget.style.color = '#B88C56')}
                     onMouseLeave={(e) => (e.currentTarget.style.color = '#fff')}
                  >
                     {item.label}
                  </Link>
               </Menu.Item>
            ))}
         </Menu>

         {isLogin ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
               <Button
                  type="text"
                  style={{
                     color: '#fff',
                     display: 'flex',
                     alignItems: 'center',
                     border: 'none',
                  }}
               >
                  <UserOutlined style={{ marginRight: '4px', color: '#fff' }} />
                  {user?.name}
               </Button>
               <Button
                  type="primary"
                  icon={<PoweroffOutlined />}
                  onClick={handleLogout}
                  style={{
                     backgroundColor: '#B88C56',
                     borderColor: '#B88C56',
                     color: '#fff',
                  }}
               >
                  Logout
               </Button>
            </div>
         ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
               <Link to="/login" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Button
                     type="text"
                     style={{
                        backgroundColor: '#B88C56',
                        borderColor: '#B88C56',
                        color: '#fff',
                        transition: 'all 0.3s ease',
                     }}
                     icon={<UserOutlined />}
                     onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
                     onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                  >
                     Login
                  </Button>
               </Link>
               <Link to="/register" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Button
                     type="primary"
                     icon={<UserAddOutlined />}
                     style={{
                        backgroundColor: '#B88C56',
                        borderColor: '#B88C56',
                        color: '#fff',
                        transition: 'all 0.3s ease',
                     }}
                     onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.2)')}
                     onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(1)')}
                  >
                     Register
                  </Button>
               </Link>
            </div>
         )}
         <Link to="order/create">
            <Badge count={cartItems.length} overflowCount={99}>
               <Button type="text" icon={<ShoppingCartOutlined />} style={{ color: '#fff' }}>
                  Cart
               </Button>
            </Badge>
         </Link>
      </Header>
   );
};

export default DefaultHeader;
