// Create React App reads REACT_APP_* values at build time.
// .env.development targets the local API; .env.production targets the deployed API.
const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default baseUrl;
