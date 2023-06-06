const express = require('express');
const router = express.Router();

const db = require('../db');

router.get('/lista', async (req, res) => {
    try {
      const [results, metadata] = await db.sequelize.query("SELECT id, nome_empresa, cnpj, cep, categoria, telefone, whatsapp, email, site, instagram, facebook, descricao, foto_perfil from microempresas");
      const [resultsClient, metadataClient] = await db.sequelize.query("SELECT id, name, lastname, email from clientes");
      
      const totalUsuarios = results.length + resultsClient.length;
      const totalMicroempresa = results.length;
      const totalClientes = resultsClient.length;

      res.json({"Relatório": "Usuários Cadastrados",
                "Microempresas": results,
                "Clientes:" : resultsClient,
                "Total Clientes cadastrados: ": totalClientes,
                "Total Microempresas cadastradas: ": totalMicroempresa,
            "Total de Usuários Cadastrados: " : totalUsuarios});
    } catch (error) {
      res.json({ message: 'Erro ao obter as empresas' });
    }
  });
// Rota DELETE para excluir uma microempresa pelo ID
  router.delete('/microempresa/:id', async (req, res) =>{
    const id = req.params.id;

    try{
        const result = await db.sequelize.query('DELETE FROM microempresas WHERE id = :id', {
            replacements: {id: id},
        });

        if(result[0].affectedRows > 0){
            res.json({message: 'Microempresa excluída com sucesso'});
        } else{
            res.status(404).json({message: "Microempresa não encontrada"});
        }
    } catch(error){
        res.status(500).json({message: 'Erro ao excluir a microempresa', error: error.message});
    }
  });

  //Rota DELETE para excluir clientes pelo ID

  router.delete('/cliente/:id', async(req, res) =>{
    const id = req.params.id;

    try{
        const result = await db.sequelize.query("DELETE FROM clientes WHERE id = :id",{
            replacements: {id: id},
        });
        if(result[0].affectedRows > 0){
            res.json({message: 'Cliente excluído com sucesso'});
        }else {
            res.status(404).json({message: 'Cliente não encontrado'})
        }
    }catch(error){
        res.status(500).json({message: 'Erro ao excluir cliente', error: error.message});
    }
  });

module.exports = router