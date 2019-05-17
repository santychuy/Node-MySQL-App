const {Router} = require('express');
const router = Router();

//DB
const pool = require('../db');

router.get('/', async(req, res) => {
    const query = 'SELECT * FROM links'
    const links = await pool.query(query);
    res.render('links/list', {links})
});

router.get('/add', (req, res) =>{
    res.render('../views/links/add.hbs');
});

router.post('/add', async (req, res) =>{
    const { title, url, description } = req.body;
    const queryInsert = 'INSERT INTO links set ?';
    const newLink = {
        title,
        url,
        description
    };
    await pool.query(queryInsert, [newLink]);
    req.flash('success', 'Link agregado!');
    res.redirect('/links');
});

router.get('/delete/:id', async(req, res) => {
    const {id} = req.params;
    const query = 'DELETE FROM links WHERE ID = ?';
    await pool.query(query, [id]);
    res.redirect('/links');
});

router.get('/edit/:id', async(req, res) =>{
    const {id} = req.params;
    const query = 'SELECT * FROM links WHERE ID = ?';
    const link = await pool.query(query, [id]);
    console.log(link);
    res.render('links/edit', {link: link[0]});
});

router.post('/edit/:id', async(req, res) => {
    const {id} = req.params;
    const {title, url, description} = req.body;
    const query = 'UPDATE links set ? WHERE ID = ?';
    const newLink = {
        title,
        url,
        description
    };
    await pool.query(query, [newLink, id]);
    res.redirect('/links');
});

module.exports = router;