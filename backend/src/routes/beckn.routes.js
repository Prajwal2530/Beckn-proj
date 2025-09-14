const express = require('express');
const router = express.Router();
const axios = require('axios');
const crypto = require('crypto');

const signMessage = (data) => {
  const privateKey = process.env.BECKN_PRIVATE_KEY;
  const sign = crypto.createSign('SHA256');
  sign.write(JSON.stringify(data));
  sign.end();
  return sign.sign(privateKey, 'base64');
};

router.post('/search', async (req, res) => {
  console.log('Search hit:', req.body.skill);
  const searchIntent = {
    context: {
      domain: 'onest:skills',
      action: 'search',
      bap_id: process.env.BECKN_SUBSCRIBER_ID,
      bap_uri: `http://localhost:${process.env.PORT}/api/beckn`
    },
    message: { intent: { item: { descriptor: { name: req.body.skill } } } }
  };
  const signature = signMessage(searchIntent);
  try {
    // Mock for now, skip real sandbox call
    console.log('Mock search response');
    res.status(200).json({ ack: true, message: 'Search for ' + req.body.skill });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/on_search', (req, res) => {
  console.log('Received callback:', req.body);
  res.status(200).json({ ack: true });
});

module.exports = router;