// Creation of points
class Points{
    constructor(x, y, r, g, b){
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;
      this.b = b;
    }

    show(){
      fill(this.r, this.g, this.b);
      ellipse(this.x, this.y, 20, 20);
    }
}


//Endpoints
const apiUrlForGet = "http://localhost:3000/points";
const apiUrlForPost = "http://localhost:3000/points";
const apiUrlForClear = "http://localhost:3000/clear"
  
// Function to fetch points from the server
async function fetchPoints() {
    try {
      const response = await fetch(apiUrlForGet);    
      if (!response.ok) {
        throw new Error(`HTTP error : Status: ${response.status}`);
      }    
      const points = await response.json();
      return points;
    } catch (error) {
      console.error('Error fetching points:', error);
      return [];
    }
  }

// Array to store points
  let points = []

// Setup function to initialize the canvas and fetch points
function setup() {
  const canvas = createCanvas(400, 400);
  canvas.id('myCanvas')

// Fetch points from the server
    fetchPoints().then(onServerPoints => {
      console.log('Fetched points:', onServerPoints.points);
      onServerPoints.points.forEach(eachPoint => {
        const {x,y,r,g,b} = eachPoint;
        points.push(new Item(x, y, r, g, b))
      });
    }).catch(error => {
      console.error('Error:', error);
    });
  }

// Draw function to display points on the canvas
function draw() {
  background(220);
  points.forEach(point=>{
    point.show();
  });
}

// Function to handle mouse click and add new points
function mousePressed(){
  const newPoint = new Point(mouseX, mouseY, random(255),random(255),random(255))
  points.push(newItem);

// Send a POST request to add the new point to the server
  postNewPoint(newPoint).then(responseData => {
    if (responseData) {
      console.log('Point posted successfully:', responseData);
    }
  }).catch(error => {
    console.error('Error:', error);
  }); 

}

// Function to send a POST request to add a new point to the server
async function postNewPoint(data) {
  try {
    
// Request for posting on server
    const response = await fetch( apiUrlForPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error : Status : ${response.status}`);
    }

    const responseData = await response.json();    
    
    return responseData;

  } catch (error) {
    console.error('Error posting point:', error);
    return null;
  }
}

// Function to clear the canvas and remove points from the server
async function clearCanvas() {
  try {
    const canvas = document.getElementById('myCanvas'); 
    const context = canvas.getContext('2d'); 

// Send a POST request to clear the canvas on the server
    const response = await fetch(apiUrlForClear, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: Status: ${response.status}`);
    }

// Clear the local points array and the canvas
    points = [];
    context.clearRect(0, 0, canvas.width, canvas.height);

  } catch (error) {
    console.error('Error clearing points:', error);
  }
}






