const express = require('express');
const app = express();
const getInfo = require('./example.js');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

async function genryTest(req, res) {
  return await axios.get('https://nakup.itesco.cz/groceries/cs-CZ/products/2005115534103?_ga=2.116821062.1768574360.1611057345-807667080.1610894004')
      .then(res => {
        let info = res.data;
          const $ = cheerio.load(info);
            const siteHead = $('.controls')
              .children('.price-details--wrapper');
            const newer = siteHead.text();
        return newer;
      })
      .catch(err => console.log(err))
}


async function genryAlbert(req, res) {
  return await axios.get('https://www.albert.cz/')
      .then(res => {
        let info = res.data;
          const $ = cheerio.load(info);
            const siteHead = $('.grid')
              .children('.grid-unit.grid-1of3.hp-multibox')
              .find('#carousel-generic-multi')
              .find('.hp-multibox__item--body')
            const newer2 = siteHead.text();
        return newer2;
      })
      .catch(err => console.log(err))
}

app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/show', (req, res) => {
  Promise.all([genryTest(), genryAlbert()])
  .then(name => {
    console.log(typeof name[0], name[1]);
    return res.send(name[1]);
  });
  /*genryTest()
  .then(newer2 => {
    fs.writeFile('information.txt', newer2, 'utf-8', function(err) {
      if (err) throw err;
      console.log(newer2);
    })
    return res.send(newer2);
  })
  .catch(err => console.log(err))
*/
});

app.listen(8888, () => {
  let newEr = getInfo();
  console.log(newEr);
});
/*
async function genryTest(req, res) {
  return await axios.get('https://www.cbr-xml-daily.ru/latest.js')
  .then(res => {
    let info = res.data;
    console.log(info);
    //res.send('hello');
    return info;
  })
  .catch(err => console.log(err))
}

app.get('/', (req, res) => {
  genryTest()
  .then(info => {
    return res.json(info.rates);
  })
  .catch(err => console.log(err))
});

app.listen(8888, () => {
  let newEr = getInfo();
  console.log(newEr);
});
*/
