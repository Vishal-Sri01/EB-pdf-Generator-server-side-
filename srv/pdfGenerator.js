const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

async function generatePDF(employeeData) {
    if (!employeeData) {
        throw new Error('No employee data provided');
    }

    const templatePath = path.resolve(__dirname, 'templates', 'template.html');
    const cssPath = path.resolve(__dirname, 'templates', 'styles.css');

    let template = fs.readFileSync(templatePath, 'utf8');
    const css = fs.readFileSync(cssPath, 'utf8'); // Read the CSS file

    // Compile the Handlebars template
    const compiledTemplate = handlebars.compile(template);

    // Prepare the data
    const data = {
        ...employeeData
    };

    // Generate HTML with data
    let htmlContent = compiledTemplate(data);
    htmlContent = htmlContent.replace('</head>', `<style>${css}</style></head>`); // Inject CSS

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true
    });

    await browser.close();

    return pdfBuffer;
}

module.exports = generatePDF;
