#!/usr/bin/env node
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const chalk = require('chalk');
const cliProgress = require('cli-progress');

/**
 * Data Library: The "Stretchable" Core
 * Add any new keywords here to expand the wizard's knowledge.
 */
function getFakerData(type) {
    const map = {
        // Personal Info
        name: () => faker.person.fullName(),
        email: () => faker.internet.email(),
        phone: () => faker.helpers.fromRegExp('+91 [6-9][0-9]{9}'), // Indian Mobile Format
        age: () => faker.number.int({ min: 18, max: 75 }),
        gender: () => faker.person.sex(),
        avatar: () => faker.image.avatar(),
        
        // Location
        city: () => faker.location.city(),
        address: () => faker.location.streetAddress(),
        country: () => faker.location.country(),
        zip: () => faker.location.zipCode(),
        
        // Business & Finance
        balance: () => faker.finance.amount(),
        company: () => faker.company.name(),
        job: () => faker.person.jobTitle(),
        price: () => faker.commerce.price(),
        product: () => faker.commerce.productName(),
        
        // Tech & System
        id: () => faker.string.uuid(),
        date: () => faker.date.recent().toISOString(),
        description: () => faker.commerce.productDescription(),
        password: () => faker.internet.password(),
        boolean: () => faker.datatype.boolean()
    };
    
    // Fallback: If type isn't found, return a random word
    return map[type] ? map[type]() : faker.word.sample();
}

/**
 * SQL Generator with Progress Bar and Type Safety
 */
function generateSQL(tableName, columnsArray, count) {
    const bar = new cliProgress.SingleBar({
        format: chalk.magenta('SQL Generation') + ' |' + chalk.magenta('{bar}') + '| {percentage}% || {value}/{total} Rows',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });

    bar.start(count, 0);
    let sql = `-- Seed data generated for table: ${tableName}\n`;
    
    for (let i = 0; i < count; i++) {
        const columns = columnsArray.join(', ');
        const values = columnsArray.map(col => {
            let data = getFakerData(col);
            
            // Handle SQL Data Types
            // Numbers (age, balance, price) should NOT have quotes
            const isNumber = !isNaN(data) && typeof data !== 'boolean' && col !== 'phone';
            
            if (typeof data === 'string') {
                data = data.replace(/'/g, "''"); // Escape single quotes for SQL
                return isNumber ? data : `'${data}'`;
            }
            return data;
        }).join(', ');
        
        sql += `INSERT INTO ${tableName} (${columns}) VALUES (${values});\n`;
        bar.update(i + 1);
    }

    bar.stop();
    fs.writeFileSync(`${tableName}.sql`, sql);
    console.log(chalk.green(`\n✔ Success! File "${tableName}.sql" created with ${count} records.`));
}

/**
 * JSON Generator with Progress Bar
 */
function generateJSON(collectionName, columnsArray, count) {
    const bar = new cliProgress.SingleBar({
        format: chalk.cyan('JSON Generation') + ' |' + chalk.cyan('{bar}') + '| {percentage}% || {value}/{total} Objects',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true
    });

    bar.start(count, 0);
    const data = [];

    for (let i = 0; i < count; i++) {
        const doc = {};
        columnsArray.forEach(col => {
            let val = getFakerData(col);
            
            // Clean numeric strings for JSON objects
            if (['balance', 'price', 'age'].includes(col)) {
                val = parseFloat(val);
            }
            doc[col] = val;
        });
        data.push(doc);
        bar.update(i + 1);
    }

    bar.stop();
    fs.writeFileSync(`${collectionName}.json`, JSON.stringify(data, null, 2));
    console.log(chalk.blue(`\n✔ Success! File "${collectionName}.json" created with ${count} objects.`));
}

module.exports = { generateSQL, generateJSON };