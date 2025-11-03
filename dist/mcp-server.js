import fetch from 'node-fetch';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
const OPENWEATHER_API_KEY = 'af7041a7e3f6a7863aae18fedf491361';
async function main() {
    try {
        const server = new McpServer({
            name: 'weather',
            version: '1.0.0',
        });
        server.registerTool('fetch_weather', {
            description: 'Fetch current weather for a city using OpenWeather API',
            // ✅ fix: pass .shape instead of z.object(...)
            inputSchema: z.object({
                city: z.string().describe('City name to fetch weather for'),
            }).shape,
        }, async (args) => {
            const city = args.city.trim();
            if (!city) {
                return { content: [{ type: 'text', text: '❌ No city provided.' }] };
            }
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`;
                const res = await fetch(url);
                if (!res.ok) {
                    return {
                        content: [
                            { type: 'text', text: `❌ OpenWeather error: ${res.status} ${res.statusText}` },
                        ],
                    };
                }
                const data = await res.json();
                const output = `🌍 Weather in ${data.name}:
- 🌡 Temperature: ${data.main.temp}°C
- 🧣 Feels Like: ${data.main.feels_like}°C
- 🌦 Condition: ${data.weather[0].description}`;
                return { content: [{ type: 'text', text: output }] };
            }
            catch (err) {
                return { content: [{ type: 'text', text: `❌ Fetch error: ${String(err)}` }] };
            }
        });
        const transport = new StdioServerTransport();
        await server.connect(transport);
        console.log('✅ Weather MCP server started via STDIO');
    }
    catch (err) {
        console.error('❌ Failed to start Weather MCP server:', err);
        process.exit(1);
    }
}
main();
