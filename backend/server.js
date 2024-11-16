const express = require("express");
const cors = require("cors");
const db = require("./database");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.post('/api/books', async (req, res) => {
    const { title, author, published_at } = req.body;

    const query = 'INSERT INTO books (title, author, published_at, created_at, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)';
    
    try {
        const [result] = await db.query(query, [title, author, published_at]);

        const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [result.id]);

        res.status(201).json({
            message: 'Book created successfully',
            data: rows[0]
        });
    } catch (err) {
        console.error('Error creating book:', err);
        res.status(500).json({ message: 'Error creating book' });
    }
});

app.get('/api/books', async (req, res) => {
    const query = 'SELECT * FROM books';
    try {
        const [results] = await db.query(query);
        res.status(200).json({ data: results });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Error fetching books' });
    }
});

app.get('/api/books/search', async (req, res) => {
    const { title, author } = req.query;
    
    if (!title && !author) {
        return res.status(400).json({ message: 'At least one search parameter (title or author) is required' });
    }

    let query = `SELECT * FROM books WHERE `;
    const conditions = [];
    const params = [];

    if (title) {
        conditions.push(`title LIKE ?`);
        params.push(`%${title}%`);
    }

    if (author) {
        conditions.push(`author LIKE ?`);
        params.push(`%${author}%`);
    }

    query += conditions.join(' OR ');

    try {
        const [results] = await db.query(query, params);

        if(results.length === 0){
            return res.status(404).json({message: 
                'nothing found'
            })
        }

        res.status(200).json({ data: results });
    } catch (err) {
        console.error('Error searching books:', err);
        res.status(500).json({ message: 'Error searching books' });
    }
});


app.put('/api/books/:id', async (req,res) => {
    const id = req.params.id
    const {title, author, published_at} = req.body

    const query = `UPDATE books 
        SET 
            title = ?, 
            author = ?, 
            published_at = ?, 
            updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?`

    try {
        const [result] = await db.query(query, [title, author, published_at, id]);

        if(result.affectedRows === 0){
            return res.status(404).json({message : 'Book not found'});
        }

        const [rows] = await db.query('SELECT * FROM books where id=?',[id]);

        res.status(200).json({
            message: "Book updated succesfully",
            data: rows[0]
        });
        
    } catch (err) {
        console.error('Error updating book: ', err);
        return res.status(500).json({message: "Error updating book"})
        
    }
});


app.delete('/api/books/:id', async (req,res) => {
    const id = req.params.id

    try {
        const [rows] = await db.query('SELECT id FROM books WHERE id=?',[id]);

        if(rows.length === 0){
            return res.status(404).json({message: "Book not found"})
        }

        const [result] = await db.query('DELETE FROM books WHERE id=?',[id])

        if(result.affectedRows === 0){
            return res.status(404).json({message: "Book not found"})
        }

        return res.status(200).json({message: "Book deleted successfully"})
        
    } catch (err) {
        console.error('Error deleting book: ',err)
        return res.status(500).json({message: "Error deleting book"})
        
    }
})

app.get('/api/books/:id', async (req,res) => {
    const id = req.params.id

    try {

        const [result] = await db.query('SELECT * FROM books WHERE id=?',[id])

        if(result.length === 0){
            return res.status(404).json({message
                : "Book not found"
            })
        }

        return res.json({
            data: result[0]
        })
        
    } catch (err) {
        
    }
})

 

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
