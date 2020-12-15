const { Router } = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const crypto = require('crypto');

const adapter = new FileSync('public/db.jsdb');
const db = low(adapter);
function generateId() {
	return crypto.randomBytes(16).toString('hex');
}

// Set some defaults (required if your JSON file is empty)
db.defaults({ tools: [], projects: [], skills: [], posts: [] }).write();

const router = Router();

router.get('/tools', (req, res) => {
	res.json(db.get('tools'));
});

router.post('/tools', (req, res) => {
	req.body.id = generateId();
	db.get('tools').push(req.body).write();
	res.json(req.body);
});

router.get('/projects', (req, res) => {
	res.json(db.get('projects'));
});

router.post('/projects', (req, res) => {
	req.body.id = generateId();
	db.get('projects').push(req.body).write();
	res.json(req.body);
});

router.get('/skills', (req, res) => {
	res.json(db.get('skills'));
});

router.post('/skills', (req, res) => {
	req.body.id = generateId();
	db.get('skills').push(req.body).write();
	res.json(req.body);
});

router.get('/posts', (req, res) => {
	res.json(db.get('posts'));
});

router.post('/posts', (req, res) => {
	req.body.id = generateId();
	db.get('posts').push(req.body).write();
	res.json(req.body);
});
module.exports = router;
