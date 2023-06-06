import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/logo-purple.png';
import { cnpj } from 'cpf-cnpj-validator';
import InputMask from 'react-input-mask';
import { Input } from 'reactstrap';
import cep from 'cep-promise';
import '../../pages/SignUp/style.css';

export default function AccountSetup(props) {

 const [category] = useState('');
 const [cnpjValido, setCnpjValido] = useState(true);
 const [cepValido, setCepValido] = useState(true);

 const go = (e) => {

    e.preventDefault();
    if (

        values.name.trim() === '' ||
        values.companyName.trim() === '' ||
        values.cnpj.trim() === '' ||
        values.adress.trim() === ''

    ) {

    alert('Preencha todos os campos!');

 return;

 }
    if (!cnpj.isValid(values.cnpj)) {
        setCnpjValido(false);
    } else {
        setCnpjValido(true);
        props.nextStep();
    }

    if (!cep.isValid(values.cep)) {
        setCepValido(false);
    } else {

        setCepValido(true);
        inputChange('category', category);
        props.nextStep();

    }

    };

    const history = useHistory();
    function handleSubmit() {}

    function handleLogin() {
        history.push('/SignupC');
    }

    function handleHome() {
        history.push('/');
    }

    const { values, inputChange } = props;

    return (

        <div className='form-content-right'>
            <form onSubmit={handleSubmit} className='form-signup '>

                <div className='header-logo-img' onClick={handleHome}>
                    
                    <h1 className='title-form' 
                    style={{marginLeft: '25%', fontSize: '42px', marginBottom: '15%', marginTop: '10%'
                }}>Cadastro</h1>
                </div>

                <div className='form-inputs'>

                    <input
                        className='form-input'
                        type='text'
                        name='username'
                        placeholder='Nome'
                        onChange={(e) => inputChange('name', e.target.value)}
                        value={values.name}
                    />

                </div>

                <div className='form-inputs'>
                    <input
                        className='form-input'
                        type='text'
                        name='empresa_nome'
                        placeholder='Nome da empresa'
                        onChange={(e) => inputChange('companyName', e.target.value)}
                        value={values.companyName}
                    />
                </div>

                <div className='form-inputs'>

                    <InputMask
                        className='form-input'
                        mask='99.999.999/9999-99'
                        type='text'
                        name='cnpj'
                        placeholder='CNPJ'
                        onChange={(e) => inputChange('cnpj', e.target.value.replace(/[./-]/g, ''))}
                        value={values.cnpj}
                    />

                    {!cnpjValido && <p>CNPJ inválido</p>}

                </div>

                <div className='form-inputs'>

                    <InputMask
                        className='form-input'
                        mask='99999-999'
                        type='text'
                        name='endereco'
                        placeholder='CEP'
                        onChange={(e) => inputChange('adress', e.target.value.replace(/\D/g, ''))}
                        value={values.adress}
                    />

                    {!cepValido && <p>CEP inválido</p>}

                </div>

                <div className='form-inputs'>

                    <select
                        id='exampleSelect'
                        name='select'
                        className='form-input'
                        placeholder='Categoria'
                        onChange={(e) => inputChange('category', e.target.value)}
                        value={values.category}
                    >

                        <option value='Moda'>Moda</option>
                        <option value='Alimentos'>Alimentos</option>
                        <option value='Tecnologia'>Tecnologia</option>
                        <option value='Estética'>Estética</option>
                        <option value='Outro'>Outro</option>

                    </select>

                </div>

                <button className='form-input-btn' onClick={go}>Próximo</button>
                <span className='form-input-login'>
                    Quer se cadastrar como cliente? Cadastro <a onClick={handleLogin}>aqui</a>
                </span>
            </form>
        </div>
    )
}