const express = require('express')
const router = express.Router()

const pool = require('../database')

// Añadir
router.get('/add',(req,res) => {
    res.render('links/add')
})
router.post('/add',async (req,res) => {
    const {title,url,description} = req.body
    const newLink = {
        title,
        url,
        description
    }
    await pool.query('insert into links set ?',[newLink])
    req.flash('success', 'Link saved')
    res.redirect('/links')
})

// Mostrar
router.get('/', async (req,res) => {
    const [links] = await pool.query('select * from links')
    res.render('links/list', {links})
})

// Eliminar
router.get('/delete/:id', async (req,res) => {
    const { id } = req.params
    await pool.query('delete from links where id = ?', [id])
    req.flash('success','Link Removed')
    res.redirect('/links')
})

// Actualizar
router.get('/edit/:id', async (req,res) => {
    const { id } = req.params
    const [link] = await pool.query('select * from links where id = ?',[id])
    res.render('links/edit', {link:link[0]})
})
router.post('/edit/:id', async (req,res) => {
    const { id } = req.params
    const {title, url, description} = req.body
    const newLink ={title, url, description}
    pool.query('update links set? where id = ?', [newLink, id])
    req.flash('success','Link Updated')
    res.redirect('/links')
})

module.exports = router