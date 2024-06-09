fetch('https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=BRL&apikey=0OKF9138NXQ92QXV')
    .then(response => response.json())
    .then(data => {
        const dates = Object.keys(data['Time Series FX (Daily)']); // Obtenha as datas
        const values = Object.values(data['Time Series FX (Daily)']).map(item => parseFloat(item['4. close'])); // Obtenha os preços de fechamento e converta-os para números
        
        // Crie o gráfico usando os dados obtidos
        const ctx = document.getElementById('meuGrafico').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates.reverse(), // Inverter as datas para exibir na ordem cronológica correta
                datasets: [{
                    label: 'USD/BRL',
                    data: values.reverse(), // Inverter os preços para corresponder às datas
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error('Erro ao obter dados:', error);
    });