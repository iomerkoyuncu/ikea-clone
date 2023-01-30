const upload = require('../middlewares/upload');
const express = require('express');
const router = express.Router();

router.post('/upload', upload.single("file"), (req, res) => {

  if (req.file === undefined) {
    return res.status(400).send({ message: "Please upload a file!" });
  }

  const imgUrl = `http://localhost:3001/uploads/${req.file.filename}`


  res.status(200).send(imgUrl);

});

module.exports = router;

