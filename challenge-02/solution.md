# My Solution

Note that multiple solutions exist, as the challenge was based solely on the provided code without additional context.

How I would approach it:

- Clarify with the developers if the whole URL needs to be dynamic. If not: Hardcode as much of the URL as possible, and validate the remaining part appropriately (e.g., say the only attacker-controlled part is an ID, then you could validate it to be alphanumeric using a regex like ^[𝐚-𝐳𝐀-𝐙𝟎-𝟗]{𝟏,𝟑𝟎}$

- If it needs to be dynamic, ask the developers what pages they want the app to send requests to. Based on this, recommend the devs implement an allow-list for these domains
