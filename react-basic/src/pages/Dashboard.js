/*
  Ini halaman dashboard, sebenernya gak sehat cara setstate kayak gini, harusnya pake useReducer
  karena tiap setState itu komponennya rerender (ngefek ke performa nanti). 
  Cuman karena biar simpel ya gini dulu aja gpp (useReducer agak mbingungi)

  Disini pas baru render component, fungsi didalam useEffect kepanggil, dia ngefetch API dari API-nya
  Studio Ghibli (disclaimer: aku bukan wibu). Fetchnya pake axios biar gampang, terus render sesuai
  kondisi state film / error / loading pake inline conditional.
*/

import React from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  Jumbotron,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { logout } from "utils/auth";
import axios from "axios";
import { GET_FILMS } from "constants/urls";
import image from '../images/bawah.png';

const Dashboard = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [film, setFilm] = React.useState();

  React.useEffect(() => {
    axios
      .get(GET_FILMS)
      .then((res) => {
        setLoading(false);
        setFilm(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.warn(err);
      });
    return () => {};
  }, []);

  const _onLogout = () => {
    logout();
    history.replace("/");
  };

  return (
    <div>
      <Navbar fixed="top" bg="white" variant="light" expand="md" >
        <Container>
          <Link to="/">
            <Navbar.Brand className="benjol-brand">BENJOL | <i> Bengkel Jadi Online</i></Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto benjol-brand">
              <Nav.Link href="/services" className="nav-link-custom" >Services</Nav.Link>
              <Nav.Link href="/aboutus" className="nav-link-custom" active>About Us</Nav.Link>
              <Nav.Link href="/ourpartnerts" className="nav-link-custom">Our Partnerts</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div style={{ paddingLeft: 0, paddingRight: 0, paddingBottom:0}}>
          <img style={{ paddingLeft: 0, paddingRight: 0, paddingBottom:0}} className="bottom_image img-fluid" src= {image} alt=""/>  
      </div>
      <Jumbotron>
        <Container>
          <h1>Dashboard</h1>
          <p>
            Jadi ini ceritanya halaman yang cuma bisa diliat kalo udah login
          </p>
        </Container>
      </Jumbotron>
      <Container>
        {loading ? (
          <Row>
            <Col>
              <Spinner
                animation="border"
                variant="primary"
                className="d-flex justify-content-center ml-auto mr-auto"
              >
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        ) : film ? (
          film
            .reduce(function (accumulator, currentValue, currentIndex, array) {
              if (currentIndex % 4 === 0)
                accumulator.push(array.slice(currentIndex, currentIndex + 4));
              return accumulator;
            }, [])
            .map((p) => {
              return (
                <Row className="mb-4">
                  {p.map((value) => {
                    return (
                      <Col>
                        <h5>{value.title}</h5>
                        <p>{value.description}</p>
                      </Col>
                    );
                  })}
                </Row>
              );
            })
        ) : (
          error && <Alert variant="danger">Error bang</Alert>
        )}
      </Container>
    </div>
  );
};

export default Dashboard;
