const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User');
const { getLoanOffers } = require('./util/loanOffers');
const financialInfo = require('./models/FinancialInfo');
const { calculateCIBILScore } = require('./util/cibilscorecalculator');
const cors = require('cors');


const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { createFinancialInfoFromFile } = require('./util/parseFinancialData');
const fs = require('fs').promises;

const app = express();
app.use(cors());









app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));






mongoose.connect('mongodb://localhost:27017/bank').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});






// app.get('/login', (req, res) => {
//   res.render('login.ejs');
// });

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);


    const user = await User.findOne({ user: username }).populate('financialInfo');
    if (!user) {
      return res.status(400).send('Invalid username or password');
    }

    if (password !== user.password) {
      return res.status(400).send('Invalid username or password');
    }

    res.status(200).json({ success: true, message: 'Login successful!' });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('Server Error');
  }
});

app.get('/dashboard/:username', async (req, res) => {
  const { username } = req.params;


  try {
    // Find user by username and populate financialInfo
    const user = await User.findOne({ user: username }).populate('financialInfo');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Get the user's financial informatio

    let financialInfo = user.financialInfo.toObject();
    if (financialInfo.loanHistory instanceof Map) {
      financialInfo.loanHistory = Object.fromEntries(financialInfo.loanHistory);
    }
    
    // Calculate the CIBIL score based on financial data
    const cibilScore = calculateCIBILScore(financialInfo).toFixed(2);
    
    // Fetch loan offers based on financial profile and CIBIL score
    const loanOffers = await getLoanOffers(financialInfo, cibilScore);

    // Send the response with financial info, CIBIL score, and loan offers
    res.status(200).json({
      success: true,
      financialInfo,
      cibilScore,
      loanOffers,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});



  
// app.get('/register',(req,res)=>{
//     res.render('register.ejs')
// })



// app.post('/register', upload.single('file'), async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const filepath = req.file.path;

//     // Use the function to create financial info from the uploaded file
//     const financialInfoDoc = await createFinancialInfoFromFile(filepath);

//     // Here you can insert user data (assuming you already have a User model setup)
//     const userDoc = new User({
//       user: username,
//       password: password,
//       financialInfo: financialInfoDoc._id, // Link to the financialInfo document
//     });
//     await userDoc.save();

//     // Remove the uploaded file after processing
//     await fs.unlink(filepath);

//     // res.status(200).send('Registration successful');
//     res.status(200).json({ message: 'Registration successful' });
//   } catch (error) {
//     console.error('Error during registration:', error);
//     res.status(500).send('Server error');
//   }
// });


app.post('/register', upload.single('file'), async (req, res) => {
  try {
    console.log('File:', req.file);
    console.log('Body:', req.body);

    const { username, password } = req.body;

    if (!req.file) {
      return res.status(400).send('File upload failed');
    }

    const filepath = req.file.path;

    const financialInfoDoc = await createFinancialInfoFromFile(filepath);
    const userDoc = new User({
      user: username,
      password: password,
      financialInfo: financialInfoDoc._id,
    });
    await userDoc.save();

    await fs.unlink(filepath);
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Server error');
  }
});





app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
