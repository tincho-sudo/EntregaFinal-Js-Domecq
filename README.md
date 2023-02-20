# EntregaFinal-Js-Domecq

Cliente/API (server), un quiz game bastante simple que incorpora leaderboard por base de datos (se utilizo mongodb, que sera necesario si se desesa ver la leaderboard y/o participar en ella).

Se debe crear la coleccion "Leaderboard" y obviamente modificar el archivo dotEnv con la URI de mongo.

Configuraciones posibles:

  Cantidad de preguntas. Se pueden añadir preguntas el JSON dentro de '/api/questions.json' , aunque si bien apareceran en el cuestionario, no tendran respuestas extras porque las deje hardcodeadas por una cuestion de tiempo, asi que solo se veria la pregunta añadida y la respuesta correcta.

  Puerto. Se encuentra el puerto seteado en el archivo dotEnv, al cual toma como priodidad, pero como seguridad tambien se aplica en 2do nivel el asignado a process.env y por ultimo un 3000 seteado.

  URI MongoDB. Se modifica en el archivo dotEnv para conectar con la base de datos de mongo.
