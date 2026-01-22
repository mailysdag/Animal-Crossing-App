const API_KEY = "b6797120-6f82-4b63-af92-ce7c87edca97";
const BASE_URL = "https://api.nookipedia.com";

const headers = {
    "X-API-KEY": API_KEY,
    "Accept-Version": "1.0.0"
};

export async function getAllVillagers() {
    const url = `${BASE_URL}/villagers?game=nh&nhdetails=true`;
    try {
        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error(`Erreur: ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erreur API:", error);
        return [];
    }
}

export async function getVillagerByName(name) {
    const url = `${BASE_URL}/villagers?name=${name}&game=nh&nhdetails=true`;
    try {
        const response = await fetch(url, { headers });
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error("Erreur Détail:", error);
        return null;
    }
}