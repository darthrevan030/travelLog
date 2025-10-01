export const fetchLogs = async () => {
    try {
        // Step 1: make request to backend
        const response = await fetch('http://localhost:1337/api/logs');
        // Step 2: Convert response data to json
        const data = await response.json();
        // Step 3: return data
        return data;

    } catch (error) {
        // Step 4: Error Handling
        console.error('Error fetching logs: ', error);
        throw error;
    } 
};