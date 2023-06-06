import React, { useState, useEffect } from 'react';
import './index.css';
import { useHistory } from 'react-router-dom';
import asset from '../../assets/bg_lista.png';
import logo from '../../assets/logo.png';
import iconSearch from '../../assets/search.png';
import logoFav from '../../assets/logoCompany.png';
import chat from '../../assets/chat.png';
import HeartButton from '../../components/HeartButton';
import RatingStars from '../../components/RatingStart';
import { IoLogoInstagram } from 'react-icons/io';
import { FaFacebookF } from 'react-icons/fa';
import axios from "axios";

function ListCompany() {
    const [category, setCategory] = useState('');
    const history = useHistory();
    const [client, setClient] = useState();
    const [categoryText, setCategoryText] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [token, setToken] = useState();
    const [favoriteCompanies, setFavoriteCompanies] = useState([]);
    const [likes, setLikes] = useState(0);

    var clientId = '';
    var companyId = '';

    const [companies, setCompanies] = useState([
        {
            id: 1,
            nome_empresa: "Lotus",
            cnpj: "16105747000144",
            cep: "02450300",
            categoria: "Moda",
            telefone: "(11) 111",
            whatsapp: "(11) 1111-1",
            email: "alice@gmail.com",
            site: "Lotus",
            instagram: "aa",
            facebook: "aa",
            descricao: "aa",
            foto_perfil: logoFav
        },
        {
            id: 5,
            nome_empresa: "Rocket Joias",
            cnpj: "74568998785565",
            cep: "01235400",
            categoria: "Moda",
            telefone: "11978566",
            whatsapp: "11978566213",
            email: "rocketenterprise@gmail.com",
            site: "Rocket.com.br",
            instagram: "@Rocket",
            facebook: "Rocket Joias",
            descricao: "AA",
            foto_perfil: logoFav
        }
    ]);
    const handleSearchInputChange = (event) => {
        setSearchText(event.target.value);
    };
    const handleSearchInputKeyPress = (event) => {
        if (event.key === "Enter") {
            procurarEmpresas();
        }
    };

    const loadFavoriteCompanies = () => {
        const storedCompanies = JSON.parse(localStorage.getItem('@empresaFav')) || [];
        setFavoriteCompanies(storedCompanies);
    };
    useEffect(() => {
        loadFavoriteCompanies();
    }, []);

    useEffect(() => {
        var token = localStorage.getItem('@token')
        var clientJSON = localStorage.getItem('@cliente'); 

        setClient(JSON.parse(clientJSON));
        setToken(token);

        // Simulando uma requisição assíncrona para buscar a listagem de empresas
        const fetchCompanies = async () => {
            try {
                // Aqui você pode fazer uma chamada à API ou buscar os dados de alguma outra forma
                // Vou simular uma resposta com dados fictícios
                const url = category === '' ? 'http://localhost:8080/empresas/lista' : `http://localhost:8080/empresas/lista/${category}`;
                const response = await fetch(url);
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCompanies();
    }, [category]);


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

    const filteredCompanies = companies.filter((company) => company.nome_empresa.includes(searchText));

    const openCompanyModal = (company, e) => {
        e.preventDefault();
        setSelectedCompany(company);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        console.log('Close modal called' + isModalOpen);
        setIsModalOpen(false);
    };

    const handleCategory = (category, event) => {
        event.preventDefault()
        setCategory(category);
        setCategoryText(category);
    };

    function handleComments(company) {
        history.push({pathname: '/comments', state: {company: company}});
    }

    function handleSearch(name) {

    }

    function handlePerfil() {
        history.push('/clientHome');
    }


    async function handleLogOut() {
        await localStorage.removeItem('@token');
        await localStorage.removeItem('@cliente');
        history.push('/');
    }

    const [showDiv, setShowDiv] = useState(false);

    const handleButtonClick = (id) => {
        clientId = client.id; // Substitua pelo valor correto do ID do cliente
        companyId = id;
       
        const data = {
            clienteId: clientId,
            microempresaId: companyId,
        };


        fetch('http://localhost:8080/favoritos/atribuicao', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(result => {
                //console.log(result); // Resultado da resposta da rota

                console.log(result); 
            })
            .catch(error => {
                console.error('Erro:', error);
            });

        console.log(data)
        carregarFav();
        setShowDiv(true);
       
    };


    const carregarFav = async () => {
        await fetch('http://localhost:8080/favoritos/consulta/' + clientId + '/' + companyId, {
          method: 'get',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'x-access-token': token
          }
        })
        .then(response => response.json())
        .then(async data => {
          if (data.favoritado) {
            const favoritedCompanies = companies.filter(company => company.id === companyId);
            const isAlreadyFavorited = favoriteCompanies.find(company => company.id === companyId);
            if (!isAlreadyFavorited) {
                const favoritedCompanies = companies.filter(company => company.id === companyId);
                setFavoriteCompanies(prevCompanies => [...prevCompanies, ...favoritedCompanies]);
            }else{
                var storedCompanies = JSON.parse(localStorage.getItem('@empresaFav')) || [];
                setFavoriteCompanies(storedCompanies);
              }
          }
        });
        
      }

      const handleDivClick = (companyId) => {
        // Lógica para o clique na div
        console.log('Clicou na div');
        handleButtonClick(companyId);
        // Disparar o evento de clique no HeartButton
        const heartButton = document.getElementById(`heartButton-${companyId}`);
        if (heartButton) {
          heartButton.click();
        }
      };

      useEffect(() => {
        localStorage.setItem("@empresaFav", JSON.stringify(favoriteCompanies));
        console.log(favoriteCompanies)
      }, [favoriteCompanies]);
      const [username, setUsername] = useState();
      const [secret, setSecret] = useState();
      const [email, setEmail] = useState();
      const [first_name, setFirstName] = useState();
      const [last_name, setLastName] = useState();
      
      const handleChat = async (e) =>{
        history.push('/chat');
      }

    return (
        <div id='body'>
            <div id='list-container' >

                <img id='bg' src={asset} />

                <div className='header'>
                    <img id='logo' src={logo} />
                    <div class="input-field">
                        <img src={iconSearch} />
                        <input
                            type="text"
                            placeholder="Pesquise o nome da empresa aqui"
                            value={searchText}
                            onChange={handleSearchInputChange}
                            onKeyPress={handleSearchInputKeyPress}
                        />

                    </div>

                    <div id='miniMenu'>
                        <a className="menu-link" onClick={handlePerfil}>PERFIL</a>
                        <a className="menu-link" id='logout' onClick={handleLogOut}>LOGOUT</a>
                    </div>
                </div>
                {selectedCompany && isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <a id="btnCloseModal" onClick={closeModal}>
                                X
                            </a>
                            <div id="containerDetailInfo" className="companyListInfo">
                                <div id="companyInfoModal">
                                    <div id="infoModal">
                                        <img id="logoList" src={'http://localhost:8080' + '/' + selectedCompany.foto_perfil} alt="Logo" />
                                        <div className="infoList">
                                            <h5>{selectedCompany.nome_empresa}</h5>
                                            <p>{selectedCompany.descricao}</p>
                                        </div>
                                    </div>
                                    <div id="stars">
                                        <RatingStars />
                                    </div>
                                    <div className="companyAval">
                                        <div>
                                            <a onClick={() => handleComments(selectedCompany)} className="aval" id="comments">
                                                <img src={chat} alt="Chat" />
                                                
                                            </a>
                                        </div>
                                        <div>
                                            <a onClick={handleChat} className="aval" id="comments">
                                                <p>Chat</p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="detailInfo">
                                    <div id="infoModal">
                                        <div className="infoList">
                                            <h5>EMAIL</h5>
                                            <p>{selectedCompany.email}</p>
                                        </div>
                                    </div>
                                    <div id="infoModal">
                                        <div className="infoList">
                                            <h5>TELEFONE</h5>
                                            <p>{selectedCompany.telefone}</p>
                                        </div>
                                    </div>
                                    <div id="infoModal">
                                        <div className="infoList">
                                            <h5>CATEGORIA</h5>
                                            <p>{selectedCompany.categoria}</p>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div id="infoModal">
                                        <div className="infoList">
                                            <h5>REDES SOCIAIS</h5>
                                            <div id="iconRedes">
                                                <a style={{ cursor: "pointer" }} onClick={handleSearch}>
                                                    <IoLogoInstagram size={30} />
                                                </a>
                                                <a style={{ cursor: "pointer" }} onClick={handleSearch}>
                                                    <FaFacebookF size={20} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <h3 id='tittle-empresa'>EMPRESAS DE {category.toUpperCase()}</h3>

                <div id='optionsCompany'>
                    <a onClick={(event) => handleCategory('', event)} className="menu-link option" href=''>TODAS</a>
                    <a onClick={(event) => handleCategory('Moda', event)} className="menu-link option" href=''>MODA</a>
                    <a onClick={(event) => handleCategory('Alimentos', event)} className="menu-link option" id='logout' href="">ALIMENTOS</a>
                    <a onClick={(event) => handleCategory('Tecnologia', event)} className="menu-link option" href=''>TECNOLOGIA</a>
                    <a onClick={(event) => handleCategory('Estética', event)} className="menu-link option" id='logout' href="">ESTÉTICA</a>
                    <a onClick={(event) => handleCategory('Consertos', event)} className="menu-link option" href=''>CONSERTOS</a>
                    <a onClick={(event) => handleCategory('Outro', event)} className="menu-link option" id='logout' href="">OUTRO</a>
                </div>



                <div id='companyList'>
                    <div className='companyItem'>

                    {filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company) => {
                            const updatedCompany = {
                            ...company,
                            likes: 0, // Adicione a propriedade likes com o valor inicial de 0
                            };

                            return (
                            <div className="companyListInfo" key={updatedCompany.id}>
                                <img style={{ borderRadius: '15px' }} id="logoList" src={'http://localhost:8080' + '/' + updatedCompany.foto_perfil} alt="Logo" />

                                <div className="infoList">
                                <h5>{updatedCompany.nome_empresa}</h5>
                                <p>{updatedCompany.descricao}</p>
                                </div>

                                <div className="companyAval">
                                <div>
                                    <a onClick={handleComments} className="aval" id="comments">
                                    <img src={chat} alt="Chat" />
                                    <p>0</p>
                                    </a>
                                </div>

                                <div onClick={() => handleDivClick(updatedCompany.id)} id="likes" className="aval">
                                <HeartButton companyId={updatedCompany.id} onClick={handleButtonClick} />
                                </div>

                                <a onClick={(e) => openCompanyModal(updatedCompany, e)} id="openDetail" href="">
                                    VER
                                </a>
                                </div>
                            </div>
                            );
                        })
                        ) : (
                        // Caso não haja empresas para exibir
                        <p>Nenhuma empresa encontrada.</p>
                        )}
                    </div>

                    <div id='companyFav'>
                        <div className='headerFav'>
                            <h5>EMPRESAS
                                FAVORITAS</h5>
                            <a className="menu-link option" href=''>VER TODAS</a>
                        </div>

                        <div className='listFav'>
                            {favoriteCompanies.map(company => (
                                <div key={company.id} className='companyFavItem'>
                                    <img id='logoFav' src={'http://localhost:8080' + '/' + company.foto_perfil} alt="Logo" />

                                    <div className='companyFavInfo'>
                                        <h5>{company.nome_empresa}</h5>
                                        <p>{company.descricao}</p>
                                    </div>
                                    
                                </div>
                                
                            ))}
                            
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default ListCompany;