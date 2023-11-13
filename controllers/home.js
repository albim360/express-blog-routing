const express = require('express');
const fs = require('fs');
const path = require('path');

function index(req, res) {
  res.send(`<h1>Benvenuti nel mio sito di ricette</h1> <br> <a href="/posts">Vai alla lista dei post</a>`);
}

module.exports = {
  index,
};
