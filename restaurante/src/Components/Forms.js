import React, { useState } from 'react';
import Logo from '../assets/logo.jpg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Row,
  Col,
} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import './css/styleForm.css';

const Forms = () => {
  const [name, setName] = useState();
  const [msg, setMsg] = useState();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function cadastrar(e) {
    e.preventDefault();
    //http://localhost:3003/auth/register
    fetch('http://localhost:3003/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        if (json.error == 'Usuario ja existe') {
          notifyError(json.error);
        } else {
          notifySucces();
        }
      });
  }
  const notifyError = (msg) => toast.warning(msg);
  const notifySucces = () => toast.success('Usuario Cadastrado com sucesso ');

  return (
    <>
      <div className="formS">
        <form onSubmit={cadastrar}>
          <Row>
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <img src={Logo} alt="" />
              <h5>Cadastro De Usuario </h5>
              <FormGroup>
                <Label for="name">Nome</Label>
                <Input
                  type="text"
                  name={name}
                  id="name"
                  placeholder="Nome *"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name={email}
                  id="email"
                  placeholder="Email *"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <FormGroup>
                <Label for="password">Senha </Label>
                <Input
                  type="password"
                  name={password}
                  id="password"
                  placeholder="Senha *"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <Button color="success" block>
                Cadastrar
              </Button>
              <Button color="primary">Login</Button>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
};

export default Forms;
