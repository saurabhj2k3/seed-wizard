#!/usr/bin/env node
const { generateSQL, generateJSON } = require('../index.js');
const chalk = require('chalk');

const args = process.argv.slice(2);

// Dashboard / Help Menu Function
function showHelp() {
    console.log(chalk.bold.magenta('\n' + '═'.repeat(60)));
    console.log(chalk.bold.white('  🧙‍♂️ SEED WIZARD - THE ULTIMATE DATA GENERATOR'));
    console.log(chalk.bold.magenta('═'.repeat(60)));
    
    console.log(chalk.bold.cyan('\n🚀 QUICK START:'));
    console.log(chalk.white('  seed-wizard <format> <filename> <columns> <count>'));
    
    console.log(chalk.yellow('\n📂 SUPPORTED FORMATS:'));
    console.log(chalk.white('  sql  ') + chalk.gray('➜ Perfect for PostgreSQL, MySQL, Supabase'));
    console.log(chalk.white('  json ') + chalk.gray('➜ Perfect for MongoDB, Firebase, Frontend Mocks'));

    console.log(chalk.yellow('\n✨ AVAILABLE DATA KEYWORDS:'));
    console.log(chalk.white('  👤 ') + chalk.bold('Personal: ') + chalk.white('name, email, phone, age, gender, avatar'));
    console.log(chalk.white('  📍 ') + chalk.bold('Location: ') + chalk.white('city, address, country, zip'));
    console.log(chalk.white('  💰 ') + chalk.bold('Business: ') + chalk.white('balance, company, job, price, product'));
    console.log(chalk.white('  ⚙️  ') + chalk.bold('System:   ') + chalk.white('id, date, password, description'));

    console.log(chalk.bold.cyan('\n📝 REAL-WORLD EXAMPLES:'));
    console.log(chalk.white('  1. Create 50 Bank Customers (SQL):'));
    console.log(chalk.green('     seed-wizard sql customers "name, balance, city, phone" 50'));
    
    console.log(chalk.white('\n  2. Create 20 E-commerce Products (JSON):'));
    console.log(chalk.green('     seed-wizard json products "product, price, description" 20'));

    console.log(chalk.white('\n  3. Create Social Media Profiles (JSON):'));
    console.log(chalk.green('     seed-wizard json profiles "name, avatar, age, gender" 100'));

    console.log(chalk.bold.magenta('\n' + '═'.repeat(60) + '\n'));
    process.exit(0);
}

// Logic to handle commands
if (args.includes('--help') || args.includes('-h') || args.length < 3) {
    showHelp();
}

const [format, name, columns, count] = args;
const columnsArray = columns.split(/[ ,]+/).filter(Boolean);
const totalRecords = count ? parseInt(count) : 10;

if (format.toLowerCase() === 'sql') {
    generateSQL(name, columnsArray, totalRecords);
} else if (format.toLowerCase() === 'json') {
    generateJSON(name, columnsArray, totalRecords);
} else {
    console.log(chalk.bold.red('\n❌ Error: Unknown format "' + format + '"'));
    showHelp();
}