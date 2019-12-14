import React, { useContext, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth';

function Header() {
  const context = useContext(AuthContext);
  // set active item to url pathname after the '/' except for home
  const path = window.location.pathname === '/' ? 'home' : 
  window.location.pathname.substring(1).toLowerCase();
  const [activeItem, setActiveItem] = useState(path);

  const onClick = (e, { name }) => setActiveItem(name)

  const menu = context.user ? (
    <Menu pointing secondary color="violet">
      <Menu.Item header>Website</Menu.Item>
      <Menu.Item
        name={context.user.username}
        active
        as={Link} to="/"
      />
      <Menu.Menu position='right'>
          <Menu.Item
          name='logout'
          onClick={context.logout}
          />
      </Menu.Menu>
    </Menu>) : (
    <Menu pointing secondary color="violet">
      <Menu.Item header>Website</Menu.Item>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={onClick}
        as={Link} to="/"
      />
      <Menu.Menu position='right'>
          <Menu.Item
          name='register'
          active={activeItem === 'register'}
          onClick={onClick}
          as={Link} to="/register"
          />
          <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={onClick}
          as={Link} to="/login"
          />
      </Menu.Menu>
    </Menu>
  )
  return menu;
}

export default Header;