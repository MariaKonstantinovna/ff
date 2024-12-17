class ApiUtil {
    constructor(config) {
        this.baseUrl = config.baseUrl || '';
        this.headers = config.headers || {};
        this.cache = new Map();
    }

    async get(endpoint) {
        const cacheKey = `${this.baseUrl}${endpoint}`;
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: this.headers,
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        
        const data = await response.json();
        this.cache.set(cacheKey, data);
        return data;
    }

    async post(endpoint, body) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: {
                ...this.headers,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        
        return await response.json();
    }
}

module.exports = ApiUtil;

const ApiUtil = require('api-util');

const ApiUtil = require('api-util');
const config = require('./config.json');

const api = new ApiUtil(config);

async function fetchData() {
    try {
        const data = await api.get('/data');
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

fetchData();
