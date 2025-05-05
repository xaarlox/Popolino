import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


function Header() {
  return (
    <header>
      <Navbar bg="primary" variant="primary" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Popolino</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to='/cart'>
                <Nav.Link><i className='fas fa-shopping-cart'></i> Кошик</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/login'>
                <Nav.Link><i className='fas fa-user'></i> Увійти</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
