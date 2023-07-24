const express = require('express');
const app = express();

// Endpoint to transfer money
app.post('/transfer', (req, res) => {
  try {
   
    const transactionSuccessful = performMoneyTransfer(req.body.amount, req.body.senderAccount, req.body.receiverAccount);

    if (transactionSuccessful) {
      res.status(200).json({ message: 'Money transfer successful!' });
    } else {
      res.status(500).json({ message: 'Money transfer failed. Please try again later.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred during the money transfer.' });
  }
});

function performMoneyTransfer(amount, senderAccount, receiverAccount) {
  // Simplified implementation for demo purposes.
  // In a real system, this would involve communication with external banking systems.
  // Assume the transfer is successful for demonstration.   
  return true;
}

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
