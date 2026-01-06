import express from 'express';
import cors from 'cors';
import becasRoutes from './routes/becas.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    const allowed = [
      'http://localhost:4200',
      'https://becauv-production.up.railway.app',
      'https://becauv-production-393b.up.railway.app',
    ];

    const isRailway = /^https:\/\/becauv-production(-[a-z0-9]+)?\.up\.railway\.app$/.test(origin);

    if (allowed.includes(origin) || isRailway) return callback(null, true);
    return callback(new Error('Not allowed by CORS: ' + origin));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', becasRoutes);

app.get('/test', (req, res) => res.json({ message: 'Server is running' }));

export { app, PORT };
