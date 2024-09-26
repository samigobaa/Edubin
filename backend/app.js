const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const session = require('express-session');
const multer = require('multer');
const path = require('path');

// Connexion à MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/EdubinDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Configuration de bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuration de session
const secretKey = "sami@89";
app.use(session({
    secret: secretKey,
    resave: false,
    saveUninitialized: true
}));

const cors = require('cors');
app.use(cors());

// Configuration de Multer pour le stockage des fichiers
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'application/pdf': 'pdf'
};

const storage = multer.diskStorage({
    // Destination of files
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        if (isValid) {
            cb(null, 'backend/uploads'); // Destination folder
        } else {
            cb(new Error('Invalid file type'), false); // Error handling
        }
    },
    // Filename
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + extension); // Corrected filename format
    }
});

const upload = multer({ storage: storage });

// Configuration de la sécurité
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-With, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

// Chemin statique pour les fichiers
app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));

// Import des modèles
const User = require('./models/user');
const Cour = require('./models/cour');
const Note = require('./models/notes');

// Route pour l'inscription des utilisateurs
app.post("/api/users/signup", upload.single('userFile'), async (req, res) => {
    try {
        console.log("Here into signup", req.body);

        // Vérifier que le mot de passe est fourni
        if (!req.body.password) {
            return res.status(400).json({ message: "Password is required" });
        }

        // Hachage du mot de passe
        const cryptedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = cryptedPassword;

        // Gestion du fichier uploadé
        if (req.file) {
            req.body.userFile = `http://localhost:3000/uploads/${req.file.filename}`;
        }

        // Création de l'utilisateur
        const user = new User(req.body);
        await user.save();
        res.json({ message: "Signup Successful" });
    } catch (err) {
        res.status(500).json({ message: "Error during signup", error: err });
    }
});

// Route pour obtenir un utilisateur par ID
app.get("/api/users/:id", async (req, res) => {
    try {
        console.log("Here into BL : Get user By ID", req.params.id);
        const user = await User.findById(req.params.id);
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Error fetching user", error: err });
    }
});

// Route pour supprimer un utilisateur
app.delete("/api/users/:id", async (req, res) => {
    try {
        console.log("Here into delete", req.params.id);
        const deleteResponse = await User.deleteOne({ _id: req.params.id });
        if (deleteResponse.deletedCount === 1) {
            res.json({ message: "Success" });
        } else {
            res.json({ message: "Error" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting user", error: err });
    }
});

// Route pour supprimer un cours
app.delete("/api/cours/:id", async (req, res) => {
    try {
        console.log("Here into delete", req.params.id);
        const deleteResponse = await Cour.deleteOne({ _id: req.params.id });
        if (deleteResponse.deletedCount === 1) {
            res.json({ message: "Success" });
        } else {
            res.json({ message: "Error" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error deleting course", error: err });
    }
});

// Route pour la connexion des utilisateurs
app.post("/api/users/login", async (req, res) => {
    try {
        console.log("Here into BL: Login", req.body);
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.json({ message: "Check Your Email" });
        }

        // Comparaison du mot de passe
        const passwordResult = await bcrypt.compare(req.body.password, user.password);
        if (!passwordResult) {
            return res.json({ message: "Check Your Password" });
        }

        // Création du token JWT
        const userToSend = {
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            tel: user.tel,
            id: user._id,
            avatar: user.avatar
        };
        const token = jwt.sign(userToSend, secretKey, { expiresIn: "1h" });
        res.json({ message: "Welcome", user: token });
    } catch (err) {
        res.status(500).json({ message: "Error during login", error: err });
    }
});

// Route pour obtenir tous les utilisateurs

app.get("/api/users", (req, res) => {
    User.find().then((users) => {
        console.log("Here tous les users", users);
        res.json({ message: users });
    });
});

// Route pour ajouter un utilisateur
app.post("/api/users", async (req, res) => {
    try {
        console.log("Here into BL: Add user", req.body);
        const user = new User(req.body);
        await user.save();
        res.json({ message: "User added" });
    } catch (err) {
        res.status(500).json({ message: "Error adding user", error: err });
    }
});

// Route pour ajouter un cours
app.post("/api/cours", async (req, res) => {
    try {
        console.log("Here into BL: Add course", req.body);
        const cour = new Cour(req.body);
        await cour.save();
        res.json({ message: "Course added" });
    } catch (err) {
        res.status(500).json({ message: "Error adding course", error: err });
    }
});

// Route pour obtenir tous les cours
app.get("/api/cours", (req, res) => {
    Cour.find().then((cours) => {
        console.log("Here tous les cours", cours);
        res.json({ message: cours });
    });
});
// Route pour ajouter une note
app.post("/api/notes", async (req, res) => {
    try {
        const { studentId, studentNote } = req.body;

        if (!studentId || !studentNote) {
            return res.status(400).json({ message: "Student ID and note are required" });
        }

        const note = new Note({
            studentId, // Utilise l'ID de l'étudiant
            studentNote
        });

        await note.save();
        res.json({ message: "Note added successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error adding note", error: err });
    }
});


// Route pour obtenir les notes d'un étudiant
app.get("/api/notes/:studentId", async (req, res) => {
    try {
        // Récupère les notes pour un étudiant spécifique
        const notes = await Note.find({ studentId: req.params.studentId }).populate('teacherId courseId');
        res.json({ notes });
    } catch (err) {
        res.status(500).json({ message: "Error fetching notes", error: err });
    }
});
module.exports = app;
