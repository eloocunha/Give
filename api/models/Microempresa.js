const db = require('../db');

const Microempresa = db.sequelize.define('microempresas', {
	id: {
		type: db.Sequelize.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true
	},
	nome_dono: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	nome_empresa: {
        type: db.Sequelize.STRING,
		allowNull: false,
        },
	cnpj: {
        type: db.Sequelize.STRING(14),
		allowNull: true,
		unique: true
        },
	cep: {
        type: db.Sequelize.STRING(10),
		allowNull: false,
        },
        categoria: {
        type: db.Sequelize.STRING,
		allowNull: false
        },
	telefone: {
		type: db.Sequelize.STRING(14),
		allowNull: true,
	},
	whatsapp: {
		type: db.Sequelize.STRING(14),
		allowNull: false,
	},
	email: {
		type: db.Sequelize.STRING,
		allowNull: true,
		unique: true
	},
	site: {
		type: db.Sequelize.STRING,
		allowNull: true,
	},
	instagram: {
		type: db.Sequelize.STRING,
		allowNull: true,
	},
	facebook: {
		type: db.Sequelize.STRING,
		allowNull: true,
	},
	descricao: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	senha: {
		type: db.Sequelize.STRING,
		allowNull: false
	},
	foto_perfil: {
		type: db.Sequelize.STRING,
		allowNull: false
	}
})

//Microempresa.sync({force: true});

module.exports = Microempresa;
