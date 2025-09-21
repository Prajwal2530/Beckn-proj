const express = require('express');
const router = express.Router();
const axios = require('axios');
const { signBecknRequest } = require('../controllers/beckn.controller');
const { mapCompetencies } = require('../utils/competencyMapper');

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
  const signature = signBecknRequest(searchIntent); // Use Ed25519 signing
  try {
    const lookupResponse = await axios.post(`${process.env.BECKN_REGISTRY_URL}/onest/lookup`, {
      country: "IND",
      type: "BPP"
    });
    console.log('Full lookup response:', JSON.stringify(lookupResponse.data, null, 2));
    const bppUrl = lookupResponse.data.subscribers?.[0]?.subscriber_url || lookupResponse.data?.[0]?.subscriber_url;

    if (!bppUrl) {
      return res.status(404).json({ error: "No BPP URL found in response" });
    }

    const response = await axios.post(`${bppUrl}/search`, searchIntent, {
      headers: { 
        Authorization: `Signature ${signature}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('ONEST error:', error.response?.data || error.message);
    if (error.response?.status === 503) {
      const mockData = [{ skill: req.body.skill, nsqf_level: 5 }]; // Use req.body.skill directly
      const mappedData = mapCompetencies(mockData, 5);
      res.status(200).json({
        ack: true,
        message: `Search for ${req.body.skill} (ONEST unavailable, mock data)`,
        signature,
        mock_data: { skill: req.body.skill, nsqf_level: 5 },
        mapped_data: mappedData
      });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.post('/on_search', (req, res) => {
  console.log('Received callback:', req.body);
  res.status(200).json({ ack: true });
});

module.exports = router;