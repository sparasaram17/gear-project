import { Navbar, Nav, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

const REPO_URL = 'https://github.com/CS571-S26/p10'

export default function NavBar() {
  const location = useLocation()
  const isActive = (path) => (location.pathname === path ? 'active' : '')

  return (
    <Navbar as="nav" bg="primary" variant="dark" expand="md" className="navbar-main">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mechanical Gear Simulator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" aria-label="Toggle navigation menu" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto" role="navigation" aria-label="Primary">
            <Nav.Link as={Link} to="/" className={isActive('/')} aria-current={location.pathname === '/' ? 'page' : undefined}>
              Simulator
            </Nav.Link>
            <Nav.Link as={Link} to="/learn" className={isActive('/learn')} aria-current={location.pathname === '/learn' ? 'page' : undefined}>
              Terminology
            </Nav.Link>
            <Nav.Link as={Link} to="/about" className={isActive('/about')} aria-current={location.pathname === '/about' ? 'page' : undefined}>
              About
            </Nav.Link>
            <Nav.Link
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View source code on GitHub (opens in new tab)"
            >
              GitHub
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
