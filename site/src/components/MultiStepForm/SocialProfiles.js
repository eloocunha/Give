import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/logo-purple.png';
import { Input } from 'reactstrap';
import InputMask from 'react-input-mask';
import { isEmail } from 'validator';
import '../../pages/SignUp/style.css';

export default function SocialProfiles(props) {
  const [emailValido, setEmailValido] = useState(true);

  const go = (e) => {
    e.preventDefault();

    if (
      values.phone.trim() === '' ||
      values.email.trim() === '' ||
      values.password.trim() === ''

    ) {
      alert('Preencha todos os campos obrigatórios!');
      return;

    }
    props.nextStep();

  };

  const back = (e) => {
    e.preventDefault();
    props.prevStep();

  };

  const history = useHistory();

  function handleSubmit() { }

  function handleLogin() {
    history.push('/login');
  }

  const { values, inputChange } = props;

  return (

    <div className='form-content-right'>
      <form onSubmit={handleSubmit} className='form-signup '>

      <div className='header-logo-img'>
                    
                    <h1 className='title-form' 
                    style={{marginLeft: '25%', fontSize: '42px', marginBottom: '15%', marginTop: '10%'
                }}>Cadastro</h1>
                </div>

        <div className='form-inputs'>

          <InputMask
            className='form-input'
            mask='(99) 99999-9999'
            type='text'
            name='phone'
            placeholder='Telefone'
            onChange={(e) => inputChange('phone', e.target.value.replace(/\D/g, ''))}
            value={values.phone}
            required // Campo obrigatório

          />

        </div>

        <div className='form-inputs'>

          <input
            className='form-input'
            type='email'
            name='email'
            placeholder='E-mail'
            onChange={(e) => {
              const email = e.target.value;
              inputChange('email', email);
              setEmailValido(isEmail(email));

            }}

            value={values.email}
            required // Campo obrigatório
          />
          {!emailValido && <p>E-mail inválido</p>}

        </div>

        <div className='form-inputs'>

          <InputMask
            className='form-input'
            mask='(99) 99999-9999'
            type='text'
            name='whatsapp'
            placeholder='WhatApp(Opcional)'
            onChange={(e) => inputChange('whatsapp', e.target.value.replace(/\D/g, ''))}
            value={values.whatsapp}

          />

        </div>

        <div className='form-inputs'>

          <input
            className='form-input'
            type='text'
            name='site'
            placeholder='Site(Opcional)'
            onChange={(e) => inputChange('site', e.target.value)}
            value={values.site}

          />

          <Input
            id='examplePassword'
            name='password'
            placeholder='Senha'
            type='password'
            onChange={(e) => inputChange('password', e.target.value)}
            value={values.password}
            required // Campo obrigatório

          />

        </div>
        <div className='buttonsForm'>

          <button onClick={back}>Voltar</button>
          <button onClick={go}>Próximo</button>

        </div>

      </form>

    </div>

  );

}