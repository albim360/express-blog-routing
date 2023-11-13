const fs = require('fs');
const path = require('path');
const posts = require('../db'); 

// Funzione per la lista dei post
function index(req, res) {
  const postList = posts.map((post) => {
    return `<li>
    <img src="/imgs/posts/${post.image}"
    style="max-height: 100px; max-width: 200px;">
    <a href="/posts/${post.slug}">${post.title}</a>
    </li>`;
  });

  const html = `<ul>${postList.join('')}</ul>`;
  res.send(html);
}

// Funzione per visualizzare un post tramite slug
function show(req, res) {
  const slug = req.params.slug;
  const post = posts.find((post) => post.slug === slug);

  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post non trovato' });
  }
}

// Funzione per la creazione di un nuovo post
function create(req, res) {
  if (req.accepts('html')) {
    res.send('<h1>Creazione nuovo post</h1>');
  } else {
    res.status(406).send('Formato non accettato');
  }
}

// Funzione per il download dell'immagine del post
function download(req, res) {
  const slug = req.params.slug;
  const post = posts.find((post) => post.slug === slug);

  if (post) {
    const imageFilePath = path.join(__dirname, '../public/imgs/posts', post.image);
    res.download(imageFilePath, post.image);
  } else {
    res.status(404).json({ message: 'Post non trovato' });
  }
}

module.exports = {
  index,
  show,
  create,
  download,
};
