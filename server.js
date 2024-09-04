const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Import data models for clothing and shoes
let clothingData = require('./models/clothing');
let shoesData = require('./models/shoes');

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for Homepage
app.get('/', (req, res) => {
    res.redirect('/home'); // Redirect '/' to '/home'
});

app.get('/home', (req, res) => {
    res.render('Fashion', {
        clothing: clothingData,
        shoes: shoesData
    });
});

// Route for Clothing Item Details
app.get('/fashion/clothing/:id', (req, res) => {
    const clothingItem = clothingData.find(item => item.id === parseInt(req.params.id));
    if (clothingItem) {
        res.render('ClothingDetails', { item: clothingItem });
    } else {
        res.status(404).send('Item not found');
    }
});

// Route for Shoes Item Details
app.get('/fashion/shoes/:id', (req, res) => {
    const shoeItem = shoesData.find(shoe => shoe.id === parseInt(req.params.id));
    if (shoeItem) {
        res.render('ShoeDetails', { shoe: shoeItem });
    } else {
        res.status(404).send('Item not found');
    }
});

// Route to Like a Clothing Item
app.post('/fashion/clothing/:id/like', (req, res) => {
    const clothingItem = clothingData.find(item => item.id === parseInt(req.params.id));
    if (clothingItem) {
        clothingItem.likes = (clothingItem.likes || 0) + 1;
        res.json({ likes: clothingItem.likes });
    } else {
        res.status(404).send('Item not found');
    }
});

// Route to Like a Shoes Item
app.post('/fashion/shoes/:id/like', (req, res) => {
    const shoeItem = shoesData.find(shoe => shoe.id === parseInt(req.params.id));
    if (shoeItem) {
        shoeItem.likes = (shoeItem.likes || 0) + 1;
        res.json({ likes: shoeItem.likes });
    } else {
        res.status(404).send('Item not found');
    }
});

// Route to Add a Comment to a Clothing Item
app.post('/fashion/clothing/:id/comments', (req, res) => {
    const clothingItem = clothingData.find(item => item.id === parseInt(req.params.id));
    if (clothingItem) {
        clothingItem.comments = clothingItem.comments || [];
        clothingItem.comments.push(req.body.comment);
        res.json({ comments: clothingItem.comments });
    } else {
        res.status(404).send('Item not found');
    }
});

// Route to Add a Comment to a Shoes Item
app.post('/fashion/shoes/:id/comments', (req, res) => {
    const shoeItem = shoesData.find(shoe => shoe.id === parseInt(req.params.id));
    if (shoeItem) {
        shoeItem.comments = shoeItem.comments || [];
        shoeItem.comments.push(req.body.comment);
        res.json({ comments: shoeItem.comments });
    } else {
        res.status(404).send('Item not found');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});
