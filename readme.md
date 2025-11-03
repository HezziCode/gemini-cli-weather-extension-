# 🌤️ Gemini CLI Extension — Weather Reporter


## 🚀 Installation & Usage

**To install this Gemini CLI extension, run:**
```
gemini extension install https://github.com/HezziCode/gemini-cli-weather-extension-.git
```

**After installation, restart your Gemini CLI and use:**
``` 
/fetch_weather Karachi
```

## ✅ Example Output:
```
🌤️ Karachi: 32°C, Sunny
```
## 🔹 What This Extension Does
This Gemini CLI extension gives you **real-time weather updates** for any city — right inside your terminal!  
Just type a simple command, and it’ll fetch live weather data from the Weather API.

---

## 🔹 Example Usage

```
/fetch_weather Karachi
```
**Output:**

```
🌤️ Karachi: 29°C, Partly Cloudy
```

## 🔹 Folder Structure

```
~/.gemini/extensions/weather-extension/
 ├── gemini-extension.json
 ├── package.json
 ├── tsconfig.json
 ├── src/
 │    └── server.ts
 └── README.md
```

## 🔹 How It Works

| File                    | Purpose                                                        |
| ----------------------- | -------------------------------------------------------------- |
| `gemini-extension.json` | Defines the extension name, version, and entry point           |
| `server.ts`             | Handles the `/fetch_weather` command and calls the Weather API |
| `package.json`          | Lists dependencies like `node-fetch` or `axios`                |
| `tsconfig.json`         | TypeScript config file (for build setup)                       |



