document.addEventListener("DOMContentLoaded", () => {
    const maleDiv = document.querySelector(".male");
    const femaleDiv = document.querySelector(".female");
    const checkButton = document.querySelector("button");
    const res1 = document.querySelector("#bmi");
    const res2 = document.querySelector("#category");
    const nameDiv = document.querySelector("#name");
    const con2 = document.querySelector("#con2");
  
    con2.style.display = "none";
  
    maleDiv.addEventListener("click", () => {
      maleDiv.classList.add("selected");
      femaleDiv.classList.remove("selected");
    });
  
    femaleDiv.addEventListener("click", () => {
      femaleDiv.classList.add("selected");
      maleDiv.classList.remove("selected");
    });
  
    const heightUnitSelect = document.getElementById("height-unit");
    const heightInput = document.getElementById("userheight");
  
    function updatePlaceholder() {
      if (heightUnitSelect.value === "ft-in") {
        heightInput.placeholder = "e.g., 5' 10\"";
      } else {
        heightInput.placeholder = "Enter your height";
      }
    }
  
    updatePlaceholder();
  
    heightUnitSelect.addEventListener("change", updatePlaceholder);
  
    checkButton.addEventListener("click", () => {
      const name = (document.getElementById("username")).value;
      const age = (document.getElementById("usernage")).value;
      const heightInputValue = (document.getElementById("userheight")).value;
      const heightUnit = (document.getElementById("height-unit")).value;
      const weight = (document.getElementById("userweight")).value;
      const weightUnit = (document.getElementById("weight-unit")).value;
  
      if (name && age && heightInputValue && weight) {
        let heightInMeters = 0;
        let weightInKg = 0;
  
        if (heightUnit === "cm") {
          heightInMeters = parseFloat(heightInputValue) / 100;
        } else if (heightUnit === "m") {
          heightInMeters = parseFloat(heightInputValue);
        } else if (heightUnit === "ft-in") {
          const ftInchesMatch = heightInputValue.match(/^(\d+)'(\d+)"/);
          if (ftInchesMatch) {
            const feet = parseInt(ftInchesMatch[1].trim());
            const inches = parseInt(ftInchesMatch[2].trim());
            heightInMeters = (feet * 0.3048) + (inches * 0.0254);
          } else {
            res1.textContent = "Invalid feet and inches format. Use X' Y\".";
            res2.textContent = "";
            con2.style.display = "none";
            return;
          }
        }
  
        if (weightUnit === "kg") {
          weightInKg = parseFloat(weight);
        } else if (weightUnit === "lbs") {
          weightInKg = parseFloat(weight) * 0.453592;
        }
  
        const bmi = (weightInKg / (heightInMeters * heightInMeters)).toFixed(2);
        let category = "";
  
        if (parseFloat(bmi) < 18.5) {
          category = "Underweight";
        } else if (parseFloat(bmi) >= 18.5 && parseFloat(bmi) < 24.9) {
          category = "Normal weight";
        } else if (parseFloat(bmi) >= 25 && parseFloat(bmi) < 29.9) {
          category = "Overweight";
        } else {
          category = "Obese";
        }
  
        nameDiv.textContent = `${name}`;
  
        res1.textContent = `${bmi}`;
        res2.textContent = `${category}`;
  
        con2.style.display = "block";
      } else {
        res1.textContent = "Please fill all fields";
        res2.textContent = "";
  
        con2.style.display = "none";
      }
    });
  });
  