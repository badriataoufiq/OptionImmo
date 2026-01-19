import express from 'express';
import mysql from 'mysql2/promise';
import multer from 'multer';
import nodemailer from 'nodemailer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

console.log('inside server.js');
console.log(app);

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration de base
/*app.use(cors({
  origin: 'https://darkorchid-koala-619666.hostingersite.com',
  methods: ['GET', 'POST'],
  credentials: true
}));*/
app.use(cors());
app.use(express.json());
// Permet d'accéder aux photos via : https://ton-domaine.com/uploads/nom-photo.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 1. Configuration de la base de données MySQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// 2. Configuration du stockage des photos (Multer)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Les photos iront dans le dossier "uploads"
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// 3. Configuration de l'envoi d'email (Nodemailer)
// Utilise les paramètres SMTP fournis par Hostinger
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, 
  auth: {
    user: process.env.EMAIL_USER, // Ton email Hostinger (ex: contact@ton-domaine.com)
    pass: process.env.EMAIL_PASS  // Ton mot de passe email
  }
});

// 4. La Route API pour le formulaire de contact
app.post('/api/contact', upload.array('photos'), async (req, res) => {
  try {
    console.log('server.js - app.post start try');
    const { full_name, email, phone, asset_type, asset_location, asset_value, message, deadline } = req.body;
    
    // Récupérer les noms des fichiers téléchargés
    const photoUrls = req.files.map(file => `/uploads/${file.filename}`);
    console.log(`server.js - ${photoUrls}`);

    // Connexion et Insertion dans MySQL
    const connection = await mysql.createConnection(dbConfig);
    const sql = `
      INSERT INTO asset_inquiries 
      (full_name, email, phone, asset_type, asset_location, asset_value, message, deadline, photo_urls) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    console.log(`server.js - ${connection}`);
    console.log(`server.js - ${sql}`);
    await connection.execute(sql, [
      full_name, email, phone, asset_type, asset_location, asset_value, message, deadline, JSON.stringify(photoUrls)
    ]);
    await connection.end();

    // Envoi de l'email de confirmation
    /*const mailOptions = {
      from: `"Ton Site Immo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirmation de votre demande",
      text: `Bonjour ${full_name}, nous avons bien reçu votre demande pour un bien situé à ${asset_location}.`,
      html: `<h1>Merci pour votre message !</h1><p>Nous traiterons votre demande pour le bien (Type: ${asset_type}) sous peu.</p>`
    };

    await transporter.sendMail(mailOptions);*/

    res.status(200).json({ message: 'Succès !' });
  } catch (error) {
    console.error(error);
    console.log('server.js - catch error');
    res.status(500).json({ error: 'Erreur serveur lors du traitement' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});