class APICallManager {
    constructor(maxCallsPerMinute) {
      this.maxCallsPerMinute = maxCallsPerMinute;
      this.calls = [];
    }
  
    async call_me(input) {
      
      while (this.calls.length >= this.maxCallsPerMinute) {
        
        await new Promise((resolve) => setTimeout(resolve, 1000));
        this.updateBucket();
      }
  
      
      const response = await this.makeAPICall(input);
      this.calls.push(Date.now());
  
      return response;
    }
  
    updateBucket() {
      // Remove the calls from the bucket that are older than one minute
      const currentTime = Date.now();
      this.calls = this.calls.filter((timestamp) => currentTime - timestamp < 60000);
    }
  
    async makeAPICall(input) {
     
      const response = await fetch('https://api.example.com/call_me', {
        method: 'POST',
        body: JSON.stringify({ input }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      return data;
  
     
      return `Response for input: ${input}`;
    }
  }
  
  //  usage:
  const apiManager = new APICallManager(15);
  
  async function makeAPIRequests() {
    for (let i = 1; i <= 20; i++) {
      try {
        const response = await apiManager.call_me(`Input ${i}`);
        console.log(response);
      } catch (error) {
        console.log('API call failed:', error);
      }
    }
  }
  
  makeAPIRequests();
  