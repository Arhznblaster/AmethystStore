# External Data Server for Roblox

Hey! This project is a Node.js server paired with a Roblox ModuleScript, letting you store and manage player data outside of Roblox. If you've ever wanted more flexibility or control over your game's data — like checking or tweaking it through a website — this could be the solution.

## Quick notes:
- You won't be given support if you fail to follow this tutorial and complain about why the code isn't working.

---

## Why Use This?
- **Simple Setup:** No complex steps here, just follow along and you'll be ready in no time.
- **Secure:** AmethystStore uses API-keys to make sure nobody except you can access the DataStores.
- **Optimized:** Everything is asychronous, nothing is non-optimized here.
- **Inspired by ProfileStore:** Features metadata, data locking, and other handy methods.

---

## Getting Started
**Requirements:**
- Node.js installed.
- A hosting option (like Render or Railway) or run it locally.
- Basic Roblox scripting knowledge.

### Quick Setup:
1. **Clone the Repo:**
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```
2. **Install Dependencies:**
   ```bash
   npm install express dotenv
   ```
3. **Set Environment Variables:** Create a `.env` file:
   ```env
   API_KEY=SuperSecureKey
   PORT=3000
   ```
4. **Start the Server:**
   ```bash
   node server.js
   ```
   It runs on `http://localhost:3000`. Make sure to secure your API key!

---

## Connecting to Roblox
- Place the **ExternalDataModule** in `ReplicatedStorage`.
- Configure the API endpoint and key in the module.
- Quick example:

```lua
local DataModule = require(game:GetService("ReplicatedStorage").ExternalDataModule)
local playerData = DataModule.getData("123456")
print(playerData)
```

---

## Quick heads-up
- Do NOT share your API key, this could lead to exploiters abusing AmethystStore and editing data without you knowing.
- Never use anything except HTML if you actually deploy this.
- Rate-limit everything here to make sure no one can abuse this system.

---

## Hosting Options
- **Free and Simple:** Railway, Render (great for small projects!)
- **Paid and Reliable:** DigitalOcean, AWS Lightsail.

---

## License
This project is released under the [Unlicense](https://unlicense.org/). That means it's public domain — do what you want with it, just don't blame me if something breaks!
