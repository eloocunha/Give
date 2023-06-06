import React, { useEffect, useState, } from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faChartBar, faCog, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import Accordion from 'react-bootstrap/Accordion';
import asset from '../../assets/bg_lista.png';
import logo from '../../assets/logo.png';
import iconSearch from '../../assets/search.png';
import logoFav from '../../assets/logoCompany.png';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './index.css'
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  Cell
} from "recharts";

const Admin = () => {
  const [companies, setCompanies] = useState();
  const [categoryText, setCategoryText] = useState('');
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalEmpresa, setTotalEmpresa] = useState(0);
  const [totalModa, setTotalModa] = useState(0);
  const [totalAlimento, setTotalAlimento] = useState(0);
  const [totalTec, setTotalTec] = useState(0);
  const [totalEste, setTotalEste] = useState(0);
  const [totalOutro, setTotalOutro] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const history = useHistory();
  const data = [
    { name: "Microempresas", users: totalEmpresa },
    { name: "Clientes", users: totalClients },
    { name: "Total", users: totalUsuarios },
  ];

  const categoria = [
    { name: "Moda", users: totalModa },
    { name: "Alimentos", users: totalAlimento },
    { name: "Tecnologia", users: totalTec },
    { name: "Estética", users: totalEste },
    { name: "Outro", users: totalOutro },
  ];


  useEffect(() => {
    fetch('http://localhost:8080/admin/lista')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setTotalUsuarios(data["Total de Usuários Cadastrados: "]);
        setTotalClients(data["Total Clientes cadastrados: "]);
        setTotalEmpresa(data["Total Microempresas cadastradas: "]);

        const microempresas = data["Microempresas"];
        const moda = microempresas.filter(emp => emp.categoria === 'Moda').length;
        const alimento = microempresas.filter(emp => emp.categoria === 'Alimentos').length;
        const tec = microempresas.filter(emp => emp.categoria === 'Tecnologia').length;
        const este = microempresas.filter(emp => emp.categoria === 'Estética').length;
        const outro = microempresas.filter(emp => emp.categoria === 'Outro').length;

        setTotalModa(moda);
        setTotalAlimento(alimento);
        setTotalTec(tec);
        setTotalEste(este);
        setTotalOutro(outro);


      })
      .catch(error => console.log('Erro ao obter os usuários:', error));
  }, []);

  const COLORS = {
    Moda: '#4F396C',
    Alimentos: '#6A5FA8',
    Tecnologia: '#6367AE',
    Estética: '#4687C6',
    Outro: '#1A305B',
  };
  const handleDeleteCliente = async (id) => {
    setDeletingUserId(id);
    setShowModal(true);
  };

  const handleDeleteEmp = async (id) => {
    setDeletingUserId(id);
    setShowModal2(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setShowModal2(false);
    setDeletingUserId(null);
  };
    

  const handleConfirmDeleteEmp = async id => {
    try {
      const response = await fetch(`http://localhost:8080/admin/microempresa/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Microempresa deleted successfully
        // Update the users state to reflect the changes
        setUsers(prevUsers => ({
          ...prevUsers,
          Microempresas: prevUsers.Microempresas.filter(user => user.id !== id),
        }));
        setTotalUsuarios(prevTotal => prevTotal - 1);

        console.log('Microempresa deleted successfully');
      } else if (response.status === 404) {
        // Microempresa not found
        console.log('Microempresa not found');
      } else {
        // Other error occurred
        console.log('Error deleting microempresa');
      }
    } catch (error) {
      console.log('Error deleting microempresa:', error);
    }

    
  };
  const handleConfirmDelete = async ()=> {
    try {
      const response = await fetch(`http://localhost:8080/admin/cliente/${deletingUserId}`, {
        method: 'DELETE',
      });

      if (response.status === 200) {
        // Microempresa deleted successfully
        // Update the users state to reflect the changes
        setUsers(prevUsers => ({
          ...prevUsers,
          Clientes: prevUsers.Clientes.filter(user => user.id !== deletingUserId),
        }));
        setTotalUsuarios(prevTotal => prevTotal - 1);

        console.log('Cliente deleted successfully');
 
      } else if (response.status === 404) {
        // Microempresa not found
        console.log('Cliente not found');
      } else {
        // Other error occurred
        console.log('Error deleting Cliente');
      }
    } catch (error) {
      console.log('Error deleting cliente:', error);
    }  
   
    
    
  };

  

  const procurarEmpresas = async () => {
    await fetch('http://localhost:8080/empresas/lista/' + categoryText + '/' + searchText, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setCompanies(data);
        const nomesEDescricoes = data.map((empresa) => ({
          nome_empresa: empresa.nome_empresa,
          descricao: empresa.descricao
        }));
        console.log(nomesEDescricoes);
      });
  };
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearchInputKeyPress = (event) => {
    if (event.key === "Enter") {
      procurarEmpresas();
    }
  };
  async function handleLogOut() {
    await localStorage.removeItem('@token');
    await localStorage.removeItem('@cliente');
    history.push('/');
  }

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
        {showModal && (
        <div className="modal show">
          <Modal.Dialog style={{width: '1000px'}}>
            <Modal.Header >
              <Modal.Title>Excluir usuário</Modal.Title>
            </Modal.Header>

            <Modal.Body >
              <p>Certeza que deseja excluir esse usuário?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
              <Button variant="primary" onClick={handleConfirmDelete}>Excluir</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
       {showModal2 && (
        <div className="modal show">
          <Modal.Dialog style={{width: '1000px'}}>
            <Modal.Header >
              <Modal.Title>Excluir Microempresa</Modal.Title>
            </Modal.Header>

            <Modal.Body >
              <p>Certeza que deseja excluir esse usuário?</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
              <Button variant="primary" onClick={handleConfirmDeleteEmp}>Excluir</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}
      <div  id='containerA'>
      
      <div id='containerAdmin'>
      <div id='left' style={{zIndex: '2'}}>
      
      <Nav id='navLeft' defaultActiveKey="/home" className="flex-column" style={{width:'80%'}}>
      <Nav.Link href="/home" style={{color: '#111111'}}>
      <FontAwesomeIcon icon={faUser} style={{marginRight:'5%'}}/>
      Usuários</Nav.Link>

      <Nav.Link eventKey="link-1" style={{color: '#111111'}}>
      <FontAwesomeIcon icon={faChartBar} style={{marginRight:'5%'}}/>
      Gráficos</Nav.Link>

      <Nav.Link eventKey="link-3" style={{color: '#111111'}}>
      <FontAwesomeIcon icon={faUserCircle} style={{marginRight:'5%'}}/>
        Perfil</Nav.Link>

    </Nav>
      </div>
      <div id='right'>
      <div id='space' style={{zIndex: '-10000', height: '98px', width: '200%', backgroundColor: '#F0F2F5', marginTop: '-9%', marginLeft: '-15.4%'}}></div>
      <p><FontAwesomeIcon icon={faCog} style={{marginRight:'1%'}}/>
        Admin / Usuários do sistema</p>
      

      <Accordion defaultActiveKey="0" style={{marginBottom:'5%'}}>
      <div className='accordionDiv'>
      <Accordion.Item style={{width: '100%'}} eventKey="0">
        <Accordion.Header>Microempresas</Accordion.Header>
        <Accordion.Body>
        <Table id='userTable' striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>CNPJ</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users["Microempresas"] &&
              users["Microempresas"].map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{user.nome_empresa}</td>
                  <td>{user.cnpj}</td>
                  <td>{user.categoria}</td>
                  <td>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDeleteEmp(user.id)}
                    >
                      Excluir
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        </Accordion.Body>
      </Accordion.Item>
      </div>
      <div style={{marginBottom:'5%'}}></div>
      <div className='accordionDiv'>
      <Accordion.Item style={{width: '100%'}} eventKey="1">
        <Accordion.Header>Clientes</Accordion.Header>
        <Accordion.Body>
        <Table id='userTable' striped>
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users["Clientes:"] &&
                  users["Clientes:"].map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDeleteCliente(user.id)}
                    >
                      Excluir
                    </a>
                  </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
        </Accordion.Body>
      </Accordion.Item>
      </div>
    </Accordion>
      
      <p>Gráficos</p>
      <div className="App">
        <div className='graphic'>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="users"
            isAnimationActive={false}
            data={categoria}
            cx={200}
            cy={200}
            outerRadius={80}
            label
          >
            {categoria.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <p style={{marginTop: '-10%', marginBottom: '20%', color: '#6A5FA8'}}><strong>Quantidade de empresas por categoria</strong></p>
        </div>
        
        <div className='graphic'>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 40,
            left: 40,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
        <p style={{color: '#6A5FA8'}}><strong>Quantidade de usuários</strong></p>
        </div>
        </div>
        </div>
        </div>
        </div>
      </div>
  );
};
export default Admin;
