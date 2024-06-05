function calculateTip() {
    // Get input values
    let textBill = parseFloat(document.getElementById("textBill").value);
    let textTip = parseFloat(document.getElementById("textTip").value);
    let textPerson = parseInt(document.getElementById("textPerson").value);
  
    // Perform the calculation
    let tipAsNum = 1 + textTip / 100;
    let calcPayment = (textBill / textPerson) * tipAsNum;
    let finalAmount = calcPayment.toFixed(2);
  
    // Display the result
    document.getElementById("textTotal").innerHTML = "Final Amount: €" + finalAmount;
  }
  