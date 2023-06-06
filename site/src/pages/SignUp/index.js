import React from 'react';
import FormSignup from '../../components/MultiStepForm/Form';
import {Link, useHistory} from 'react-router-dom';
import Menu from '../../components/Menu/index';

import logoImg from '../../assets/elite_logo.png';
import loginImg from '../../assets/phone-svg.png';
import './style.css';

export default function FormSignUp(){
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


