/* eslint-disable no-undef */

import express from 'express';
import cors from 'cors';

import db from './DB.js';

process.env.TZ = 'America/Sao_Paulo';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use(cors())

const server = app.listen(port, () => { console.log(`Running on ${port}`) });

app.post('/register', async (req, res) => {
    try {
        const data = req.body;
        await db('users').insert(data);
        res.status(201).json(data);
    } catch (error) {
        console.error("Error while saving data.");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.post('/login', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await db('users').where('username', username).andWhere('email', email).andWhere('password', password).first();
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ error: "Usuário não encontrado" });
        }
    } catch (error) {
        console.error("Error while saving data.");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

app.get('/launchs', async (req, res) => {
    try {
        const { month, year } = req.query;

        const launchs = await db('launchs').whereRaw("EXTRACT(MONTH FROM date) = ? AND EXTRACT(YEAR FROM date) = ?", [month, year]).orderBy('date', 'desc');

        const totalCreditValue = await db('launchs')
            .whereRaw("EXTRACT(MONTH FROM date) = ? AND EXTRACT(YEAR FROM date) = ?", [month, year])
            .sum('value as totalCredit')
            .where('type', 'credit')
            .first();

        const totalDebitValue = await db('launchs')
            .whereRaw("EXTRACT(MONTH FROM date) = ? AND EXTRACT(YEAR FROM date) = ?", [month, year])
            .sum('value as totalDebit')
            .where('type', 'debit')
            .first();

        res.status(200).json({
            launchs: launchs,
            totalCreditValue,
            totalDebitValue
        });
    } catch (error) {
        console.error("Error while getting data.");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/launch', async (req, res) => {
    try {
        const data = req.body;
        await db('launchs').insert(data);
        res.status(201).json(data);
    } catch (error) {
        console.error("Error while saving data.");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

process.on('SIGNINT', () => {
    server.close();
})