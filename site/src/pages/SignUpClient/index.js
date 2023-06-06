import React from 'react';
import FormSignup from '../../components/ClientForm/Form';
import Menu from '../../components/Menu';
import './index.css';
import logoImg from '../../assets/elite_logo.png';
export default function SignUpClient(){
  return (
    
    <div className='bg-form'>
    <div id='headerS' className="header" style={{marginTop: '-0.5%'}}>
                        <img src= {logoImg} alt="Elite" />
                        <Menu/>
                    </div>
    <div className='form-container'>
          
            <FormSignup />
            
            <div className='form-content-left'>
          
            </div>
          
</div>
  </div>
  );
};


