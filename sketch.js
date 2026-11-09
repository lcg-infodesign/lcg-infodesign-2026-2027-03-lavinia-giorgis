let data;
let totalDeaths = 0;
let nationalities = [];
let counts = {};
 
//margine grafico
let margin = 20;
 
// Larghezza del rettangolo del grafico
let rectWidth = 500;
 
async function setup() 
{
  createCanvas(windowWidth, windowHeight);
 
  
  data = await loadTable("everest.csv", ",", "header");
 
  //conto quante morti ci sono per nazionalità scorre ogni riga del dataset
  for (let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++) 
  {
    let nationality = data.getString(rowNumber, "Nationality");
 
    if (nationality === "") 
    {
      nationality = "Unknown";
    }
 
    if (counts[nationality]) 
    {
      counts[nationality]++;
    } else 
    {
      counts[nationality] = 1;
    }
 
    totalDeaths++;
  }
 
  // estrae nomi nazionalita
  nationalities = Object.keys(counts);
  nationalities.sort((a, b) => counts[b] - counts[a]);
}
 
function draw() 
{background(10, 20, 50);
 
  // Titolo e sottotitolo
  noStroke();
  fill(245);
  textSize(34);
  text("Le vittime dell’Everest ", 40, 60);
  text(" 1921–2023", 30, 100);
  textSize(15);
  fill(245);
  text("Decessi totali sull’Everest, suddivisi per nazionalità", 40, 120);
 
  // yPos tiene conto dove disegnare il prossimo riquadro
  let xPos = (width - rectWidth) / 2;
  let yPos = height - margin;
  let label = "";
 
  stroke(18);
 
  //rughe per ogni nazionalita
  for (let i = 0; i < nationalities.length; i++) 
  {
    let nationality = nationalities[i];
    let count = counts[nationality];
 
    let layerHeight = map(count, 0, totalDeaths, 0, height - 2 * margin);
    yPos -= layerHeight;
 
    // il puntatore dentro il riquadro allora poi dopo coloro
    let isHovered =
      mouseX >= xPos &&
      mouseX <= xPos + rectWidth &&
      mouseY >= yPos &&
      mouseY <= yPos + layerHeight;
 
    if (isHovered) 
    {
      // Evidenzio il paese
      fill(255);
      stroke(255);
      strokeWeight(2);
      label = nationality + ": " + count;
    } else 
    {
      //sfumatura
      let t = map(i, 0, nationalities.length - 1, 0, 1);
      fill(lerpColor(color(150, 20, 30), color(255, 150, 150), t));
      stroke(10, 20, 50)
      strokeWeight(1);
    }
 
    rect(xPos, yPos, rectWidth, layerHeight);
  }
 
  // nazionalità scritta
  if (label != "") 
  {
    noStroke();
    textSize(14);
 
    fill(0);
    rect(mouseX + 8, mouseY, textWidth(label) + 12, 24);
 
    fill(255);
    text(label, mouseX + 14, mouseY + 17);
  }
}
 
 
function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
}