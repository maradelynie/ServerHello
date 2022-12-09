const	env	=	process.env.AMBIENT	||	'development';

module.exports	=	require(`./config/${env}.js`);