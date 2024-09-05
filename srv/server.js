const cds = require('@sap/cds');
const generatePDF = require('./pdfGenerator');
const bodyParser = require('body-parser');

cds.on('bootstrap', (app) => {
    app.use(bodyParser.json()); // Parse JSON bodies

    app.post('/PDF', async (req, res) => {
        try {
            const pdfBuffer = await generatePDF(req.body);
            
            res.setHeader('Content-Type', 'application/pdf');
            res.send(pdfBuffer);
        } catch (err) {
            console.error("Error generating PDF:", err);
            res.status(500).send("Error generating PDF");
        }
    });
});

module.exports = cds.server;
