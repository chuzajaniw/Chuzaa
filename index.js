
const { spawn } = require("child_process");
const axios = require("axios");
const logger = require("./utils/log");
const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const session = require('express-session');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

// Session configuration
app.use(session({
    secret: 'priyansh-bot-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' });

// Store for active bots
let activeBots = new Map();
let userDatabase = [];

// Load user database
function loadUserDatabase() {
    try {
        if (fs.existsSync('users.json')) {
            userDatabase = JSON.parse(fs.readFileSync('users.json', 'utf8'));
        }
    } catch (error) {
        logger("Error loading user database", "[ ERROR ]");
    }
}

// Save user database
function saveUserDatabase() {
    try {
        fs.writeFileSync('users.json', JSON.stringify(userDatabase, null, 2));
    } catch (error) {
        logger("Error saving user database", "[ ERROR ]");
    }
}

// Load initial data
loadUserDatabase();

// Authentication middleware
function requireAuth(req, res, next) {
    if (req.session.userId) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.get('/dashboard', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// API Routes
app.post('/api/register', async (req, res) => {
    const { username, password, email } = req.body;
    
    if (userDatabase.find(user => user.username === username)) {
        return res.json({ success: false, message: 'Username already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
        id: Date.now().toString(),
        username,
        password: hashedPassword,
        email,
        bots: [],
        createdAt: new Date().toISOString()
    };
    
    userDatabase.push(user);
    saveUserDatabase();
    
    res.json({ success: true, message: 'User registered successfully' });
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = userDatabase.find(u => u.username === username);
    
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.userId = user.id;
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

app.get('/api/user', requireAuth, (req, res) => {
    const user = userDatabase.find(u => u.id === req.session.userId);
    if (user) {
        res.json({ 
            success: true, 
            user: { 
                id: user.id, 
                username: user.username, 
                email: user.email,
                bots: user.bots || []
            } 
        });
    } else {
        res.json({ success: false, message: 'User not found' });
    }
});

app.post('/api/bot/create', requireAuth, upload.single('appstate'), (req, res) => {
    const { botName, prefix, adminId, botId } = req.body;
    const user = userDatabase.find(u => u.id === req.session.userId);
    
    if (!user) {
        return res.json({ success: false, message: 'User not found' });
    }
    
    if (!req.file) {
        return res.json({ success: false, message: 'Appstate file is required' });
    }
    
    const botConfig = {
        id: Date.now().toString(),
        name: botName,
        prefix,
        adminId,
        botId,
        appstatePath: req.file.path,
        status: 'stopped',
        createdAt: new Date().toISOString()
    };
    
    if (!user.bots) user.bots = [];
    user.bots.push(botConfig);
    saveUserDatabase();
    
    res.json({ success: true, message: 'Bot created successfully', bot: botConfig });
});

app.post('/api/bot/start/:botId', requireAuth, (req, res) => {
    const { botId } = req.params;
    const user = userDatabase.find(u => u.id === req.session.userId);
    const bot = user?.bots?.find(b => b.id === botId);
    
    if (!bot) {
        return res.json({ success: false, message: 'Bot not found' });
    }
    
    if (activeBots.has(botId)) {
        return res.json({ success: false, message: 'Bot is already running' });
    }
    
    try {
        startBot(bot, user.id);
        res.json({ success: true, message: 'Bot started successfully' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to start bot: ' + error.message });
    }
});

app.post('/api/bot/stop/:botId', requireAuth, (req, res) => {
    const { botId } = req.params;
    
    if (activeBots.has(botId)) {
        const botProcess = activeBots.get(botId);
        botProcess.kill();
        activeBots.delete(botId);
        
        // Update bot status in database
        const user = userDatabase.find(u => u.id === req.session.userId);
        const bot = user?.bots?.find(b => b.id === botId);
        if (bot) {
            bot.status = 'stopped';
            saveUserDatabase();
        }
        
        res.json({ success: true, message: 'Bot stopped successfully' });
    } else {
        res.json({ success: false, message: 'Bot is not running' });
    }
});

app.put('/api/bot/update/:botId', requireAuth, (req, res) => {
    const { botId } = req.params;
    const { prefix, adminId } = req.body;
    const user = userDatabase.find(u => u.id === req.session.userId);
    const bot = user?.bots?.find(b => b.id === botId);
    
    if (!bot) {
        return res.json({ success: false, message: 'Bot not found' });
    }
    
    bot.prefix = prefix;
    bot.adminId = adminId;
    saveUserDatabase();
    
    res.json({ success: true, message: 'Bot updated successfully' });
});

app.delete('/api/bot/delete/:botId', requireAuth, (req, res) => {
    const { botId } = req.params;
    const user = userDatabase.find(u => u.id === req.session.userId);
    
    if (!user || !user.bots) {
        return res.json({ success: false, message: 'User or bots not found' });
    }
    
    // Stop bot if running
    if (activeBots.has(botId)) {
        const botProcess = activeBots.get(botId);
        botProcess.kill();
        activeBots.delete(botId);
    }
    
    // Remove bot from user's bots
    user.bots = user.bots.filter(b => b.id !== botId);
    saveUserDatabase();
    
    res.json({ success: true, message: 'Bot deleted successfully' });
});

app.get('/api/commands', (req, res) => {
    try {
        const commandsPath = path.join(__dirname, 'Priyansh', 'commands');
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        
        const commands = commandFiles.map(file => {
            try {
                const command = require(path.join(commandsPath, file));
                return {
                    name: command.config?.name || file.replace('.js', ''),
                    description: command.config?.description || 'No description available',
                    category: command.config?.commandCategory || 'Uncategorized',
                    permissions: command.config?.hasPermssion || 0,
                    cooldown: command.config?.cooldowns || 0
                };
            } catch (error) {
                return {
                    name: file.replace('.js', ''),
                    description: 'Error loading command',
                    category: 'Error',
                    permissions: 0,
                    cooldown: 0
                };
            }
        });
        
        res.json({ success: true, commands });
    } catch (error) {
        res.json({ success: false, message: 'Failed to load commands' });
    }
});

function startBot(botConfig, userId) {
    const configPath = `config_${botConfig.id}.json`;
    
    // Create bot-specific config
    const baseConfig = JSON.parse(fs.readFileSync('config.json', 'utf8'));
    const botSpecificConfig = {
        ...baseConfig,
        PREFIX: botConfig.prefix,
        ADMINBOT: [botConfig.adminId],
        APPSTATEPATH: botConfig.appstatePath,
        BOTNAME: botConfig.name
    };
    
    fs.writeFileSync(configPath, JSON.stringify(botSpecificConfig, null, 2));
    
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "Priyansh.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true,
        env: {
            ...process.env,
            CONFIG_PATH: configPath,
            BOT_ID: botConfig.id
        }
    });
    
    activeBots.set(botConfig.id, child);
    
    // Update bot status
    const user = userDatabase.find(u => u.id === userId);
    const bot = user?.bots?.find(b => b.id === botConfig.id);
    if (bot) {
        bot.status = 'running';
        saveUserDatabase();
    }
    
    child.on("close", (codeExit) => {
        activeBots.delete(botConfig.id);
        if (bot) {
            bot.status = 'stopped';
            saveUserDatabase();
        }
        logger(`Bot ${botConfig.name} exited with code ${codeExit}`, "[ BOT ]");
    });
    
    child.on("error", (error) => {
        activeBots.delete(botConfig.id);
        if (bot) {
            bot.status = 'error';
            saveUserDatabase();
        }
        logger(`Bot ${botConfig.name} error: ${error.message}`, "[ BOT ERROR ]");
    });
}

// Start the server
app.listen(port, '0.0.0.0', () => {
    logger(`Multi-Bot Management Server is running on port ${port}...`, "[ Starting ]");
}).on('error', (err) => {
    if (err.code === 'EACCES') {
        logger(`Permission denied. Cannot bind to port ${port}.`, "[ Error ]");
    } else {
        logger(`Server error: ${err.message}`, "[ Error ]");
    }
});
