let suicideConfidenceData = 0.75; // Example data (75%)
let stressLevelData = 0.6; // Example data (60%)

// Function to update Suicide Confidence Level
function updateSuicideConfidence() {
    // Generate random data between 0 and 1
    suicideConfidenceData = Math.random();
    // Update the progress bar and value
    d3.select("#suicide-confidence")
        .style("width", (suicideConfidenceData * 100) + "%");
    d3.select("#confidence-value")
        .text(Math.round(suicideConfidenceData * 100) + "%");
}

// Function to update Stress Levels
function updateStressLevel() {
    // Generate random data between 0 and 1
    stressLevelData = Math.random();
    // Update the progress bar and value
    d3.select("#stress-level")
        .style("width", (stressLevelData * 100) + "%");
    d3.select("#stress-value")
        .text(Math.round(stressLevelData * 100) + "%");
}

// Function to update all components with new data
function updateAll() {
    updateSuicideConfidence();
    updateStressLevel();
    // Add more update functions if needed for other components
}

// Initial data update
updateAll();

setInterval(updateAll,3000);

// Example initial pie chart data
let stressData = [
    { category: "Low Stress", value: 35 },
    { category: "Medium Stress", value: 45 },
    { category: "High Stress", value: 20 }
];

// Create a pie chart
const width = 300;
const height = 300;
const radius = Math.min(width, height) / 2;

const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

const color = d3.scaleOrdinal()
    .domain(stressData.map(d => d.category))
    .range(["#6b486b", "#a05d56", "#d0743c"]);

const pie = d3.pie()
    .sort(null)
    .value(d => d.value);

const path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

function updatePieChart() {
    // Update the pie chart with new random data
    stressData = stressData.map((d) => {
        d.value = Math.random() * 100;
        return d;
    });

    // Redraw the pie chart
    const paths = svg.selectAll("path")
        .data(pie(stressData));

    paths.enter()
        .append("path")
        .merge(paths)
        .transition()
        .duration(1000)
        .attr("d", path)
        .attr("fill", d => color(d.data.category));

    // Update the text labels in the pie chart
    const labels = svg.selectAll("text")
        .data(pie(stressData));

    labels.enter()
        .append("text")
        .merge(labels)
        .transition()
        .duration(1000)
        .attr("transform", (d) => `translate(${path.centroid(d)})`)
        .attr("dy", "0.35em")
        .text((d) => `${d.data.category} - ${Math.round(d.data.value)}%`);
}

// Initial pie chart setup
updatePieChart();

// Periodically update pie chart data every 5 seconds (simulated)
setInterval(updatePieChart, 5000);


// Function to generate random sleep data
function generateRandomSleepData() {
    const data = [];
    const numDataPoints = 30; // Number of data points for the line chart
    for (let i = 0; i < numDataPoints; i++) {
        data.push({
            time: new Date(Date.now() - (numDataPoints - i) * 24 * 60 * 60 * 1000), // Simulated time data
            value: Math.random() * 10 + 5, // Simulated sleep pattern data (fluctuating peaks)
        });
    }
    return data;
}

// Create a line chart for sleep patterns
const sleepData = generateRandomSleepData();

const margin = { top: 20, right: 20, bottom: 40, left: 40 };
const widt = 300 - margin.left - margin.right;
const heigh = 200 - margin.top - margin.bottom;

const x = d3.scaleTime().range([0, widt]);
const y = d3.scaleLinear().range([heigh, 0]);

const line = d3.line()
    .x(d => x(d.time))
    .y(d => y(d.value));

const svgSleep = d3.select("#sleep-line-chart")
    .append("svg")
    .attr("width", widt + margin.left + margin.right)
    .attr("height", heigh+ margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Set domains for x and y scales
x.domain(d3.extent(sleepData, d => d.time));
y.domain([0, d3.max(sleepData, d => d.value)]);

// Append the line path
svgSleep.append("path")
    .data([sleepData])
    .attr("class", "line")
    .attr("d", line);

// Append the x and y axis
svgSleep.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x));

svgSleep.append("g")
    .attr("class", "y-axis")
    .call(d3.axisLeft(y));

// Periodically update sleep data and redraw the line chart
function updateSleepData() {
    const newSleepData = generateRandomSleepData();

    // Update the x and y domains
    x.domain(d3.extent(newSleepData, d => d.time));
    y.domain([0, d3.max(newSleepData, d => d.value)]);

    // Update the line path
    svgSleep.select(".line")
        .transition()
        .duration(1000)
        .attr("d", line(newSleepData));

    // Update the x and y axis
    svgSleep.select(".x-axis")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(x));

    svgSleep.select(".y-axis")
        .transition()
        .duration(1000)
        .call(d3.axisLeft(y));
}

// Initial sleep data update
updateSleepData();

// Periodically update sleep data and redraw the line chart every 5 seconds (simulated)
setInterval(updateSleepData, 5000);

