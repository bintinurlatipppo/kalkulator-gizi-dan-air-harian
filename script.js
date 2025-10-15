document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Mengambil nilai dari input
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const activityFactor = parseFloat(document.getElementById('activity').value);

    // Validasi input
    if (isNaN(age) || isNaN(weight) || age <= 0 || weight <= 0) {
        alert("Mohon masukkan umur dan berat badan yang valid.");
        return;
    }

    // --- Perhitungan Kebutuhan Kalori (Menggunakan Rumus Harris-Benedict) ---
    // Ini adalah BMR (Basal Metabolic Rate) sederhana, untuk pria dan wanita disatukan untuk kemudahan
    const bmr = 10 * weight + 6.25 * 150 - 5 * age + 5; // Tinggi badan diasumsikan 150cm
    const calories = Math.round(bmr * activityFactor);

    // --- Perhitungan Kebutuhan Air ---
    const water = Math.round(weight * 30); // Aturan umum: 30 ml per kg berat badan

    // Menampilkan hasil
    document.getElementById('calorieResult').textContent = `${calories} kkal`;
    document.getElementById('waterResult').textContent = `${water} ml (sekitar ${Math.ceil(water / 250)} gelas)`;
    
    // Menampilkan saran menu makanan
    generateMealPlan(calories);

    // Menampilkan blok hasil
    document.getElementById('result').style.display = 'block';
});

function generateMealPlan(totalCalories) {
    const mealPlanContainer = document.getElementById('mealPlan');
    mealPlanContainer.innerHTML = ''; // Kosongkan container sebelum diisi

    // Proporsi makronutrien (contoh)
    const breakfastCalories = Math.round(totalCalories * 0.25);
    const lunchCalories = Math.round(totalCalories * 0.35);
    const dinnerCalories = Math.round(totalCalories * 0.25);
    const snacksCalories = Math.round(totalCalories * 0.15);

    const mealPlan = {
        "Sarapan": `Roti gandum (2 lembar) dengan telur rebus (1 butir) dan setengah buah alpukat. (~${breakfastCalories} kkal)`,
        "Makan Siang": `Nasi merah (1 porsi), dada ayam panggang (100g), tumis brokoli dan wortel. (~${lunchCalories} kkal)`,
        "Makan Malam": `Ikan salmon panggang (100g), ubi jalar rebus, dan salad sayuran hijau. (~${dinnerCalories} kkal)`,
        "Cemilan": `Satu buah apel dan segenggam kacang almond. (~${snacksCalories} kkal)`
    };

    for (const meal in mealPlan) {
        const mealItem = document.createElement('div');
        mealItem.className = 'meal-plan-item';
        mealItem.innerHTML = `<h4>${meal}</h4><p>${mealPlan[meal]}</p>`;
        mealPlanContainer.appendChild(mealItem);
    }
}
