import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import Container from '../../components/Container';
import Content from '../../components/Content';
import AuthRedirect from '../../components/AuthRedirect';
import Button from '../../components/Button';
import Section from '../../components/Section';
import { Input, Textarea, Form } from '../../components/Form';

import logoImg from '../../assets/images/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const history = useHistory();

  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post(
        '/incidents/new',
        { data },
        { headers: { Authorization: ongId } }
      );

      history.push('/profile');
    } catch (err) {
      toast.error('Erro ao cadastrar caso.', {
        className: 'toast-background',
      });
    }
  }

  return (
    <Container>
      <Content>
        <Section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <AuthRedirect.Link to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar
          </AuthRedirect.Link>
        </Section>
        <Form onSubmit={handleNewIncident}>
          <Input
            placeholder="Título do caso"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
          />
          <Textarea
            placeholder="Descrição"
            value={description}
            onChange={e => {
              setDescription(e.target.value);
            }}
          />
          <Input
            placeholder="Valor em reais"
            value={value}
            onChange={e => {
              setValue(e.target.value);
            }}
          />

          <Button type="submit">Cadastrar</Button>
        </Form>
      </Content>
    </Container>
  );
}
