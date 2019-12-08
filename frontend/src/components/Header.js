import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Header() {
  // set active item to url pathname after the '/' except for home
  const path = window.location.pathname === '/' ? 'home' : 
  window.location.pathname.substring(1).toLowerCase();
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name)

    return (
      <Menu pointing secondary color="violet">
        <Menu.Item header>Posts</Menu.Item>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link} to="/"
        />
        <Menu.Menu position='right'>
            <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link} to="/register"
            />
            <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link} to="/login"
            />
        </Menu.Menu>
      </Menu>
    )
}

export default Header;