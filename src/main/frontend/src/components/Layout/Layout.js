import {Fragment} from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import AuthenticationService from '../../AuthenticationService';


const Layout = (props) => {
    const userLinks = (
        <Nav className="me-auto">
            <Nav.Link as={Link} to="/register">Zarejestruj się</Nav.Link>
            <Nav.Link as={Link} to="/user_account">Moje Dane</Nav.Link>
            <Nav.Link as={Link} to="/rooms">Zarezerwuj</Nav.Link>
            <Nav.Link as={Link} to="/login">Zaloguj sie</Nav.Link>
            <Nav.Link as={Link} to="/my_reservations">Moje Rezerwacje</Nav.Link>
            <Nav.Link href="/login" onClick={() => AuthenticationService.logout()}>Wyloguj się</Nav.Link>
        </Nav>
    );

    const adminLinks = (
        <Nav className="me-auto">
            <Nav.Link as={Link} to="/login">Zaloguj się</Nav.Link>
            <Nav.Link as={Link} to="/reservations_admin">Rezerwacje</Nav.Link>
            <Nav.Link as={Link} to="/add_room">Dodaj pokój</Nav.Link>
            <Nav.Link as={Link} to="/rooms_admin">Pokoje admin</Nav.Link>
            <Nav.Link href="/login" onClick={() => AuthenticationService.logout()}>Wyloguj się</Nav.Link>
            <Nav.Link as={Link} to="/user_account">Moje Dane</Nav.Link>
            <Nav.Link as={Link} to="/add_admin">Dodaj admina</Nav.Link>
        </Nav>
    );

    return(
        <Fragment>
              <Navbar bg="dark" variant="dark">
                    {props.isUser ? userLinks : adminLinks}
            </Navbar>
            <main>
                {props.children}
            </main>
        </Fragment>
    );
}

export default Layout;