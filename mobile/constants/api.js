//const API_URL = "http://localhost:5001/api";
//const backendUrl = BACKEND_URL || "http://10.0.2.2:5001"; // from Android simulator 10.0.2.2 should be used to get to host's machine localhost
let backendUrl = process.env.EXPO_PUBLIC_BACKEND_URL || "http://10.0.2.2:5001";
//backendUrl = "https://fintracker-backend-nodejs-deploy.onrender.com"
export const API_URL = `${backendUrl}/api`;