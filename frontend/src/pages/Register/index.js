import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import { NotifyToastContainer } from './styles';
import Container from '../../components/Container';
import Content from '../../components/Content';
import AuthRedirect from '../../components/AuthRedirect';
import Button from '../../components/Button';
import Section from '../../components/Section';
import { Input, Form } from '../../components/Form';

import logoImg from '../../assets/images/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUF] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('/ongs', data);

      setName('');
      setEmail('');
      setWhatsapp('');
      setCity('');
      setUF('');

      toast.success(
        <NotifyToastContainer>
          <div>
            <p>Cadastrado com sucesso!</p>
            <p>
              Anote seu ID: <span>{response.data.id}</span>
            </p>
          </div>
          <Button
            onClick={() => {
              toast.dismiss();
              history.push('/');
            }}
          >
            Ir para página de login
          </Button>
        </NotifyToastContainer>,
        {
          closeOnClick: false,
          closeButton: false,
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
          className: 'toast-background toast-not-clickable',
        }
      );
    } catch (err) {
      toast.error('Falha no registro, tente novamente.', {
        className: 'toast-background',
      });
    }
  }

  return (
    <Container>
      <Content>
        <Section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG
          </p>

          <AuthRedirect.Link to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Já tenho cadastro
          </AuthRedirect.Link>
        </Section>
        <Form onSubmit={handleRegister}>
          <Input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div>
            <Input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <Input
              placeholder="UF"
              value={uf}
              onChange={e => setUF(e.target.value)}
            />
          </div>

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
}
