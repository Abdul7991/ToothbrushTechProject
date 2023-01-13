// SIDEBAR TOGGLE //

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
            sidebarOpen = false;
        }
    }
    
    init()

// GET DATA FUNCTION //

async function getData(){
    var url = 'https://jsfge6apa6.execute-api.us-east-1.amazonaws.com/api'
    const response = await fetch(url)
    const data = await response.json()
    return data
}

// INVOKING FUNCTIONS //

async function init(){
    const data = await getData()
    totalOrders(data)
    createPieChart(data.type_total)
    createBarChartMonthly(data.orders_by_month)
    createBarChartDaily(data.orders_by_day)
    createBarChartAge(data)
    Delivered(data)
    Unsuccessful(data)
    inTransit(data)
    dispatch(data)
    orderReceived(data)
    orderConfirmed(data)
}

// DATA PARSING FOR TOTAL ORDERS //

function totalOrders(data){
    const orders = data.total_sold_brushes
    document.getElementById("name").textContent = orders
}

// DATA PARSING FOR DELIVERY STATUS //

function Delivered(data){
    const delivered = data.delivery_status.Delivered
    document.getElementById("delivered").textContent = delivered
}
function Unsuccessful(data){
    const unsuccessful = data.delivery_status.Unsuccessful
    document.getElementById("unsuccessful").textContent = unsuccessful
}
function inTransit(data){
    const inTransit = data.delivery_status['In Transit']
    document.getElementById("inTransit").textContent = inTransit
}

// DATA PARSING FOR DISPATCH STATUS //

function dispatch(data){
    const dispatch = data.dispatch_status.Dispatched
    document.getElementById("dispatch").textContent = dispatch
}
function orderReceived(data){
    const receieved = data.dispatch_status['Order Received']
    document.getElementById("received").textContent = receieved
}
function orderConfirmed(data){
    const confirmed = data.dispatch_status['Order Confirmed']
    document.getElementById("confirmed").textContent = confirmed
}

// ----- CHARTS ----- //

function createPieChart(data) {
    const keys = Object.keys(data)
    // PIE CHART //
var pieChartOptions = {
    series: [data['Toothbrush 2000'], data['Toothbrush 4000']],
    chart: {
    width: 450,
    type: 'donut',
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270
    }
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    type: 'gradient',
  },
  legend: {
    labels:{
        colors:['white']
    },
    formatter: function(val, opts) {
      return keys[opts.seriesIndex] + " - " + opts.w.globals.series[opts.seriesIndex]
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var pieChart = new ApexCharts(document.querySelector("#pie-chart"), pieChartOptions);
        pieChart.render();

}

function createBarChartMonthly(data) {
    var barChartMonthly = {
        series: [{
        name: 'Orders Per Month',
        data: [data['01'],data['02'],data['03'],data['04'],data['05'],data['06'],data['07'],data['08'],data['09'],data['10'],data['11'],data['12']]
      }],
        chart: {
        type: 'bar',
        height: 300
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: false,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
            style:{
                colors: 'white',
            }
        },
      },
      yaxis: {
        labels:{
            style:{
                colors:['white'],
            }
        },
        title: {
          text: 'Orders',
          style:{
            color:'white',
          }
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      }
      };

      var monthlybarchart = new ApexCharts(document.querySelector("#monthlybar-chart"), barChartMonthly);
        monthlybarchart.render();
}

function createBarChartDaily(data) {
    var barChartDaily = {
        series: [{
        name: 'Orders Per Month',
        data: [data['01'],data['02'],data['03'],data['04'],data['05'],data['06'],data['07'],data['08'],data['09'],data['10'],data['11'],data['12'],data['13'],data['14'],data['15'],data['16'],data['17'],data['18'],data['19'],data['20'],data['21'],data['22'],data['23'],data['24'],data['25'],data['26'],data['27'],data['28'],data['29'],data['30'],data['31']]
      }],
        chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: false,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['1st','2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd','24th','25th','26th','27th','28th','29th','30th','31st'],
        labels: {
            style:{
                colors: 'white',
            }
        },
      },
      yaxis: {
        labels:{
            style:{
                colors:['white'],
            }
        },
        title: {
          text: 'Orders',
          style:{
            color:'white',
          }
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      }
      };

      var dailybarchart = new ApexCharts(document.querySelector("#dailybar-chart"), barChartDaily);
        dailybarchart.render();
}

function createBarChartAge(data) {
    const ages = data.ages
    const ageGroup = groupAges(ages)
    
    var barChartAge = {
        series: [{
        name: 'Sales by Age',
        data: [ageGroup['10'],ageGroup['20'],ageGroup['30'],ageGroup['40'],ageGroup['50'],ageGroup['60'],ageGroup['70']] 
      }],
      chart: {
        type: 'bar',
        height: 300
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: false,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['0-10','10-20', '20-30', '30-40', '40-50', '50-60', '60-70'],
        labels: {
            style:{
                colors: 'white',
            }
        },
      },
      yaxis: {
        labels:{
            style:{
                colors:['white'],
            }
        },
        title: {
          text: 'Sales by age',
          style:{
            color:'white',
          }
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val
          }
        }
      }
      };

      var dailybarage = new ApexCharts(document.querySelector("#barchart-age"), barChartAge);
        dailybarage.render();
    
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
            continue;
        }
    }
    return groupAge
}