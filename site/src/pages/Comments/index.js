import React, { useEffect, useState, } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import asset from '../../assets/bg_lista.png';
import logo from '../../assets/logo.png';
import avatar from '../../assets/avatar.png';
import logoFav from '../../assets/logoCompany.png';
import iconSearch from '../../assets/search.png';
import HeartButton from '../../components/HeartButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import './index.css';
const Comments = (props) => {
   
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [nameCompany, setNameCompany] = useState(props.location.state.company.nome_empresa);
  const [photo, setPhoto] = useState(props.location.state.company.foto_perfil);
  const [nomeDono, setNomeDono] = useState(props.location.state.company.nome_dono);
  const history = useState();
 
  useEffect(() =>{
    var commentC = localStorage.getItem('@comment');
    setComments(JSON.parse(commentC))
  })

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim() !== '') {
      setComments([...comments, comment]);
      
      localStorage.setItem('@comment', JSON.stringify(comments));
      setComment('');
    }
  };

  function handleSearch(){
      
  }
  const handleCompany = ()=>{
    history.push('/listCompany')
  }
  
  async function handleLogOut(){
    await localStorage.removeItem('@token');
    await localStorage.removeItem('@cliente');
    history.push('/');
}
  return (
    <div className='comment-form '>
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
                            src={'http://localhost:8080' + '/' + photo} 
                            alt="empresa" 
                            style={{width:"130px", marginLeft: "-20%", borderRadius: "50%", marginBottom: "50px"}}
                            
                        />
                        <p style={{color: 'black'}}>{nameCompany}</p>
                        <p style={{color: 'black'}} className="owner-name">{nomeDono}</p>
                    </div>
      <Nav id='navLeft' defaultActiveKey="/home" className="flex-column" style={{width:'80%'}}>
      <Nav.Link onClick={handleCompany} eventKey="link-3" style={{color: '#111111'}}>
      <FontAwesomeIcon icon={faUserCircle} style={{marginRight:'5%'}}/>
        Empresas</Nav.Link>


    </Nav>
      </div>
<div id='right'>
<div id='space' style={{zIndex: '-10000', height: '98px', width: '200%', backgroundColor: '#F0F2F5', marginTop: '-9%', marginLeft: '-15.4%'}}></div>

<h5 id='tittleComments' style={{
  marginLeft: '5%', marginTop: '2%', color: '#6c6c6c', fontWeight: 'bold',
  
}}>Comentários sobre {nameCompany}</h5>
  <hr style={{width: '90%', height:'2px', marginLeft: '5%'}}/>
  <div id='commentsPart' className='commentsDone'>
    
    <ul className='comment-list'>
   
      {comments.map((comment, index) => (
        <div className='commentsUser' style={{display: 'flex'}}>
          <img src={avatar} />
          <div>
          <h6><em><strong>Seu comentário</strong></em></h6>
            <h5>@Nome Usuário</h5>
            <li className='comment-item' key={index}>{comment}</li>
          </div>
           <HeartButton/>
           <hr></hr>
        </div>
        
      ))}
    </ul>
        
  </div>
  <form id='formComments' onSubmit={handleSubmit}>
    <div id='commentsPart'>
      <img src={avatar} />
      <input
      className='comment-input'
      type="text"
      value={comment}
      onChange={handleChange}
      style={{width: '800px'}}
      placeholder="Digite seu comentário..."
    />
    </div>
    
    <button className='comment-button' type="submit">Enviar</button>
  </form>

   </div>
  </div>
</div>
  
</div>

  );
};

export default Comments;


