import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../../../uploads')));
app.use(routes);

app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));