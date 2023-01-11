// SIDEBAR TOGGLE //

document.addEventListener('DOMContentLoaded', function(){
    var sidebarOpen = false;
    var sidebar = document.getElementById("sidebar");
    
    function openSidebar() {
        if(sidebarOpen) {
            sidebar.classList.add("sidebar-responsive");
            sidebarOpen = true;
        }
    }
    
    function closeSiderbar() {
        if(sidebarOpen) {
            sidebar.classList.remove("sidebar-responsive");
            sidebarOpen = false
        }
    } 
    init()
})

// GET DATA FUNCTION //
async function getData(){
    var url = 'https://jsfge6apa6.execute-api.us-east-1.amazonaws.com/api'
    const response = await fetch(url)
    const data = await response.json()
}

// INVOKING FUNCTIONS //

async function init(){
    const data = await getData()
    salesbyAge(data)
    totalOrders(data)
    console.log(data)

}

// DATA PARSING FOR TOTAL ORDERS //

function totalOrders(data){
    const orders = data.total_sold_brushes
    document.getElementById("name").textContent = orders
}

// DATA PARSING FOR SALES BY AGE //

function salesbyAge(data){
    const ages = data.ages
    const ageGroup = groupAges(ages)
    const ageKeys = Object.keys(ageGroup)

    const width = window.innerWidth/2
    const height = window.innerHeight

    var svg = d3.select('svg')
              .attr('width', width + 60 + 30)
              .attr('height', height + 30 + 70)
              .append('g')
              .attr('transform', 'translate(60,30)')

    let x = d3.scaleBand().range([0,width]).domain(ageKeys).padding(0,4)
    let y = d3.scaleLinear().domain([0,d3.max(ageKeys,(d)=>ageGroup[d])]).range([height,0])

    svg.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat((d,i)=>{
        if(i === 0){
            return `0 - ${d}`
        } else {
            return `${String(parseInt(d)-10)} - ${d}`
        }
    }))

    svg.append('g')
    .call(d3.axisLeft(y))

    svg.selectAll('Bars')
    .data(ageKeys)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d)=>x(d))
    .attr('y', (d)=>y(ageGroup[d]))
    .attr('width', x.bandwidth())
    .attr('height', (d)=>height-y(ageGroup[d]))
    

}

// FUNCTION CREATED TO GROUP AGES //

function groupAges(ages){
    const groupAge = {}
    let salesCount = 0
    for (i in ages){
        salesCount += ages[i]
        if (i % 10 === 0){
            groupAge[i] = salesCount
            salesCount = 0
            continue
        }
    }
    return groupAge
}