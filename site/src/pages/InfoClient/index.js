import React, { useEffect, useState, } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import asset from '../../assets/bg_lista.png';
import logo from '../../assets/logo.png';
import { useLocation } from "react-router-dom";
import { Accordion } from 'react-bootstrap';
import { IoMdLogOut } from 'react-icons/io';
import 'react-dom'
import chat from '../../assets/chat.png'
import './style.css';
import HomePage from '../HomePage/index';
import logoImg from '../../assets/elite_logo.png';
import photoCompany from '../../assets/company_photo.png';
import iconEdit from '../../assets/edit.png';

import InfoGroup1 from '../../components/InfoClient/group1';
import InfoGroup2 from '../../components/InfoClient/group2';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { IoIosArrowBack } from 'react-icons/io';
import './style.css'



export default function Info(){

  const history = useHistory();

  const [empresa, setEmpresa] = useState(null);

  //const location = useLocation();
   useEffect(() => {
      var empresaJSON = localStorage.getItem('@empresa');

      setEmpresa(JSON.parse(empresaJSON));


   }, []);

  async function handleLogOut(){
      await localStorage.removeItem('@token');
      await localStorage.removeItem('@empresa');
      history.push('/');
  }

  function handleEdit(){
      history.push('/updateEmpresa');
  }
  const handleGoBack = () => {
      history.goBack();
    };
const handleChat = () =>{
  history.push('/chatEmpresa');
}
if(empresa) {
  return (
    <div>

      <div id='list-container' style={{backgroundColor: 'transparent', zIndex: '10000'}}>

        <img id='bg' src={asset} />

        <div className='header'>
            <img id='logo' src={logo} />
            <h3 style={{color: '#fff', position:'absolute', left: '0', marginLeft: '13%', marginBottom: '2%', marginTop: '1%'}}>GIVE</h3>
            

            <div id='miniMenu'>
                <a className="menu-link" id='logout' onClick={handleLogOut}>LOGOUT</a>
            </div>
        </div>
        </div>
        
      <div  id='containerA'>
      
      <div id='containerAdmin'>
      <div id='left' style={{zIndex: '2'}}>
      <div className="owner-info" style={{marginLeft: "70px"}}>
                        <img 
                            className="company-photo" 
                            src={'http://localhost:8080' + '/' + empresa.foto_perfil} 
                            alt="empresa" 
                            style={{width:"130px", marginLeft: "-20%", borderRadius: "50%", marginBottom: "50px"}}
                            
                        />
                        <p style={{color: 'black'}}>{empresa.nome_empresa}</p>
                        <p style={{color: 'black'}} className="owner-name">{empresa.nome_dono}</p>
                    </div>
      <Nav id='navLeft' defaultActiveKey="/home" className="flex-column" style={{width:'80%'}}>
      <Nav.Link onClick={handleChat} eventKey="link-3" style={{color: '#111111'}}>
      <FontAwesomeIcon icon={faUserCircle} style={{marginRight:'5%'}}/>
        Chat</Nav.Link>

      <Nav.Link  onClick={handleEdit} eventKey="link-1" style={{color: '#111111'}}>
      <FontAwesomeIcon icon={faChartBar} style={{marginRight:'5%'}}/>
      Editar</Nav.Link>

    </Nav>
      </div>
      <div id='right'>
      <div id='space' style={{zIndex: '-10000', height: '98px', width: '200%', backgroundColor: '#F0F2F5', marginTop: '-8%', marginLeft: '-15.4%'}}></div>
      <p><FontAwesomeIcon icon={faCog} style={{marginRight:'1%'}}/>
        Microempresa /Informações Cadastradas</p>
      

      <Accordion defaultActiveKey="0" style={{marginBottom:'5%'}}>
      <div className='accordionDiv'>
      <Accordion.Item style={{width: '900px'}} eventKey="0">
        <Accordion.Header>Informações pessoais</Accordion.Header>
        <Accordion.Body>
        <Table id='userTable' striped>
          <thead>
            <tr>
              
              <th>Nome</th>
              <th>Nome Dono</th>
              <th>CNPJ</th>
              
              <th>CEP</th>
            </tr>
          </thead>
          <tbody>
            
                <tr key={empresa.id}>
                 
                  <td>{empresa.nome_empresa}</td>
                  <td>{empresa.nome_dono}</td>
                  <td>{empresa.cnpj}</td>
                  <td>{empresa.cep}</td>
                  
                </tr>
             
          </tbody>
        </Table>
        </Accordion.Body>
      </Accordion.Item>
      </div>
      <div style={{marginBottom:'5%'}}></div>
      <div className='accordionDiv'>
      <Accordion.Item style={{width: '100%'}} eventKey="1">
        <Accordion.Header>Informações de Contato</Accordion.Header>
        <Accordion.Body>
        <Table id='userTable' striped>
              <thead>
                <tr>
                  <th>Telefone</th>
                  <th>Instagram</th>
                  <th>Facebook</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                
                    <tr>
                        <td>{empresa.telefone}</td>
                      <td>{empresa.instagram}</td>
                      <td>{empresa.facebook}</td>
                      <td>{empresa.descricao}</td>
                  
                    </tr>
                
              </tbody>
            </Table>
        </Accordion.Body>
      </Accordion.Item>
      </div>
    </Accordion>
      
      
        </div>
        </div>
        </div>
      </div>
  );
  }else {
    return (
        <HomePage />
    )
}
};
