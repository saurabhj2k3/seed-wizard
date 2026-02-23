
# 🧙‍♂️ Seed Wizard

[![npm version](https://img.shields.io/npm/v/seed-wizard.svg)](https://www.npmjs.com/package/seed-wizard)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Downloads](https://img.shields.io/npm/dm/seed-wizard.svg)](https://www.npmjs.com/package/seed-wizard)


> **Stop writing insert statements by hand.** Seed Wizard is a powerful, stretchable CLI tool for generating realistic dummy data for SQL and NoSQL databases — in seconds.


---

## ✨ Features

| Feature | Description |
|---|---|
| 🗄️ Multi-Database | Generate `.sql` for PostgreSQL/MySQL or `.json` for MongoDB/Firebase |
| 🇮🇳 Indian Locale | Built-in support for **+91 phone formats**, Indian cities, and addresses |
| 📊 Beautiful UX | Real-time **progress bars** and a colored dashboard in your terminal |
| 🧠 Type Smart | Auto-detects numbers vs. strings; handles SQL escaping (`O'Connor` → `'O''Connor'`) |
| 🔧 Stretchable Schema | Pass exactly the columns you need as CLI arguments — no config files |

---

## 📦 Installation

```bash
npm install -g seed-wizard
```

---

## 🛠️ Usage

### Show Help & Dashboard

```bash
seed-wizard --help
```

### Generate SQL (PostgreSQL / MySQL)

```bash
seed-wizard sql <table> "<columns>" <count>
```

**Example:**

```bash
seed-wizard sql users "name, age, phone, balance, city" 100
```

### Generate JSON (MongoDB / Firebase)

```bash
seed-wizard json <collection> "<columns>" <count>
```

**Example:**

```bash
seed-wizard json products "product, price, description, date" 50
```

---

## 🔑 Available Data Keywords

| Category | Keywords |
|---|---|
| 👤 Personal | `name`, `email`, `phone` *(+91)*, `age`, `gender`, `avatar` |
| 📍 Location | `city`, `address`, `country`, `zip` |
| 💼 Business | `balance`, `company`, `job`, `price`, `product` |
| ⚙️ System | `id`, `date`, `password`, `description`, `boolean` |

---

## 💡 Examples

**Banking / Fintech:**
```bash
seed-wizard sql customers "name, balance, age, phone" 500
```

**E-commerce Inventory:**
```bash
seed-wizard json inventory "product, price, description" 20
```

**User Profiles:**
```bash
seed-wizard sql profiles "name, email, age, city, gender, avatar" 200
```

---

## 🗂️ Output

- **SQL mode** → generates a `.sql` file with ready-to-run `INSERT` statements
- **JSON mode** → generates a `.json` file importable into MongoDB, Firebase, or any document store

---

## 📄 License

MIT © [Saurabh Jadhav](https://github.com/saurabhj2k3)

