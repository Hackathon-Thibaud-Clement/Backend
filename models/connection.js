const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://admin:IUurD4jq3VJRAB9s@cluster0.sbev9wq.mongodb.net/'

mongoose.connect(connectionString, {connectTimeoutMS: 2000})
.then(() => console.log('Database connected'))
.catch (error => console.error(error));