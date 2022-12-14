const	cluster	=	require('cluster');
const	os	=	require('os');
const	CPUS	=	os.cpus();

if	(cluster.isMaster)	{
		CPUS.forEach(()	=>	cluster.fork());
		cluster.on('listening',	worker	=>	{
				console.log(`Cluster	${worker.process.pid}	conectado`);
		});
		cluster.on('disconnect',	worker	=>	{
				console.log(`Cluster	${worker.process.pid}	desconectado`);
		});
		cluster.on('exit',	worker	=>	{
				console.log(`Cluster	${worker.process.pid}	saiu	do	ar`);
				cluster.fork();
		});
}	else	{
		require('./index.js');
}