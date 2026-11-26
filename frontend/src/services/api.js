export async function predictFraud(formData) {
  const mlFields = { ...formData };
  
  // Format age to integer if needed
  if (mlFields.age) {
    mlFields.age = parseInt(mlFields.age, 10);
  }

  try {
    const response = await fetch('http://localhost:8080/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mlFields)
    });

    if (!response.ok) {
      let errorDetail = "Prediction service is currently unavailable. Please try again later.";
      try {
        const errData = await response.json();
        if (errData && errData.detail) {
          errorDetail = errData.detail;
        }
      } catch (e) {
        // ignore
      }
      throw new Error(errorDetail);
    }

    const resultData = await response.json();
    
    const result = {
      ...resultData,          // includes claimId, probability, riskLevel, prediction from backend
      date: new Date().toISOString()
    };
    
    const history = JSON.parse(localStorage.getItem('predictionHistory') || '[]');
    history.unshift(result);
    localStorage.setItem('predictionHistory', JSON.stringify(history));
    
    return result;
  } catch (error) {
    if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
      throw new Error("Unable to connect to the prediction service. Please try again.");
    }
    throw error;
  }
}

