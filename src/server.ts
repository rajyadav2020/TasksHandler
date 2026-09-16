import express from 'express'

const app = express();
import taskrouter from './routes/task.routes';
import logger from './middleware/logger.middleware';
// import errorHandler from './middleware/error.middleware';
import authrouter from './routes/auth.routes';
import errorHandler from './middleware/error.middleware.js';

app.use(express.json());
app.use(logger)

app.use('/tasks',taskrouter)
app.use('/api/auth',authrouter)
app.use(errorHandler)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});