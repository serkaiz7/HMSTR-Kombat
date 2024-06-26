const companies = [];
const HMSTR_TO_USD = 0.719141;
const HMSTR_TO_PHP = 42.16;

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-250px';
    } else {
        sidebar.style.left = '0';
    }
}

function hideSidebar() {
    document.getElementById('sidebar').style.left = '-250px';
}

function addCompany() {
    const name = document.getElementById('companyName').value;
    const coinPrice = parseFloat(document.getElementById('coinPrice').value);
    const profitPerHour = parseFloat(document.getElementById('profitPerHour').value);

    if (name && !isNaN(coinPrice) && !isNaN(profitPerHour)) {
        const company = { name, coinPrice, profitPerHour };
        companies.push(company);
        updateCompanyList();
        clearInputs();
    }
}

function updateCompanyList() {
    const companyList = document.getElementById('companyList');
    companyList.innerHTML = '';
    companies.forEach(company => {
        const li = document.createElement('li');
        li.textContent = `${company.name}: Coin Price = $${company.coinPrice}, Profit/Hour = $${company.profitPerHour}`;
        companyList.appendChild(li);
    });
}

function clearInputs() {
    document.getElementById('companyName').value = '';
    document.getElementById('coinPrice').value = '';
    document.getElementById('profitPerHour').value = '';
}

function calculateBestInvestment() {
    if (companies.length === 0) {
        alert('No companies added.');
        return;
    }

    let bestCompany = null;
    let bestEfficiency = 0;
    const efficiencies = [];

    companies.forEach(company => {
        const efficiency = company.profitPerHour / company.coinPrice;
        efficiencies.push(efficiency);
        if (efficiency > bestEfficiency) {
            bestEfficiency = efficiency;
            bestCompany = company;
        }
    });

    const result = document.getElementById('result');
    if (bestCompany) {
        result.textContent = `Best company to invest in: ${bestCompany.name} with efficiency of ${bestEfficiency}`;

        const percentageDifferences = efficiencies.map(efficiency => ((efficiency / bestEfficiency) * 100).toFixed(2));
        displayChart(percentageDifferences);
    }
}

function displayChart(data) {
    const ctx = document.getElementById('profitChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: companies.map(company => company.name),
            datasets: [{
                label: 'Profit Efficiency (%)',
                data: data,
                backgroundColor: 'rgba(255, 111, 97, 0.6)',
                borderColor: 'rgba(255, 111, 97, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function showSettings() {
    document.getElementById('settings').style.display = 'flex';
}

function hideSettings() {
    document.getElementById('settings').style.display = 'none';
}

function changeTheme() {
    const theme = document.getElementById('themeSelector').value;
    document.body.className = theme + '-theme';
    document.querySelector('main').className = theme + '-theme';
}

function calculateHMSTR() {
    const hmstrAmount = parseFloat(document.getElementById('hmstrAmount').value);
    if (isNaN(hmstrAmount)) {
        alert('Please enter a valid HMSTR amount.');
        return;
    }

    const usdValue = (hmstrAmount * HMSTR_TO_USD).toFixed(2);
    const phpValue = (hmstrAmount * HMSTR_TO_PHP).toFixed(2);

    const resultDiv = document.getElementById('hmstrResult');
    resultDiv.innerHTML = `
        <p>HMSTR coins ${hmstrAmount}.</p>
        <p>Value in USD: $${usdValue}</p>
        <p>Value in PHP: ₱${phpValue}</p>
        
    `;
}

document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    if (!sidebar.contains(event.target) && !event.target.classList.contains('menu-btn')) {
        hideSidebar();
    }
});
