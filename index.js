const gameTable = document.querySelector("#GameTable")
const gameTableTr = gameTable.querySelector("tbody").querySelector("tr")

const grid = document.querySelector(".grid");
const imagesDiv = document.querySelector("#CurrentElementImageDiv");
const currentElementTable = document.querySelector("#CurrentElementTable");
const currentElementTimeP = document.querySelector("#CurrentElementTimeP");

const rotateButton = document.querySelector("#RotateButton");
const flipButton = document.querySelector("#FlipButton")

const timeUnitP = document.querySelector("#TimeUnit");
const totalScoreP = document.querySelector("#TotalScoreP");

const missionPointsP = document.querySelector(".MissionPointsP");
const mission1P = document.querySelector("#Mission1P");
var mission1Point = 0
const m1Checked = "M1Checked"

const mission2P = document.querySelector("#Mission2P");
var mission2Point = 0
const m2Checked = "M2Checked"

const mission3P = document.querySelector("#Mission3P");
var mission3Point = 0
const m3Checked = "M3Checked"

const mission4P = document.querySelector("#Mission4P");
var mission4Point = 0
const m4Checked = "M4Checked"

var mountainPoint = 0;
const mountainChecked = "MountainChecked"

const elapsedTimeP = document.querySelector("#ElapsedTimeP");
const springP = document.querySelector("#SpringP");
const summerP = document.querySelector("#SummerP");
const autumnP = document.querySelector("#AutumnP");
const winterP = document.querySelector("#WinterP");
const currentSeasonP = document.querySelector("#CurrentSeasonP")

const endGameDiv = document.querySelector("#EndGame");
const totalPointsP = document.querySelector("#TotalPointsP");
const mission1FinalP = document.querySelector("#Mission1FinalP")
const mission2FinalP = document.querySelector("#Mission2FinalP")
const mission3FinalP = document.querySelector("#Mission3FinalP")
const mission4FinalP = document.querySelector("#Mission4FinalP")

Array.from(gameTable.rows).forEach((row) => {
    Array.from(row.cells).forEach((cell) => {
        cell.style.backgroundImage = 'url("assets/tiles/base_tile.png")';
    });
});

gameTable.rows[1].cells[1].style.backgroundImage = `url("assets/tiles/mountain_tile.png")`
gameTable.rows[1].cells[1].classList.add("occupied");

gameTable.rows[3].cells[8].style.backgroundImage = `url("assets/tiles/mountain_tile.png")`
gameTable.rows[3].cells[8].classList.add("occupied");

gameTable.rows[5].cells[3].style.backgroundImage = `url("assets/tiles/mountain_tile.png")`
gameTable.rows[5].cells[3].classList.add("occupied");

gameTable.rows[8].cells[9].style.backgroundImage = `url("assets/tiles/mountain_tile.png")`
gameTable.rows[8].cells[9].classList.add("occupied");

gameTable.rows[9].cells[5].style.backgroundImage = `url("assets/tiles/mountain_tile.png")`
gameTable.rows[9].cells[5].classList.add("occupied");

const imagesData = [
    'url("assets/tiles/forest_tile.png")',
    'url("assets/tiles/plains_tile.png")',
    'url("assets/tiles/village_tile.png")',
    'url("assets/tiles/water_tile.png")'
]

const imageForms = [
    {
        time: 2,
        shape: [[1,1,1],
                [0,0,0],
                [0,0,0]],
    },

    {
        time: 1,
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
    },

    {
        time: 2,
        shape: [[1,1,1],
                [0,0,1],
                [0,0,0]],
    },

    {
        time: 2,
        shape: [[1,1,1],
                [0,1,0],
                [0,0,0]],
    },

    {
        time: 1,
        shape: [[1,1,0],
                [1,0,0],
                [0,0,0]],
    },

    {
        time: 1,
        shape: [[1,1,1],
                [1,1,0],
                [0,0,0]],
    },

    {
        time: 1,
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
    },

    {
        time: 2,
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
    },

    {
        time: 2,
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
    },

    {
        time: 2,
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
    },

    {
        time: 2,
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
    },
  ];

var seasonTimeElapse = 1;
var seasonsIndex = 0;
const seasons = [
    {
        season: "Spring",
        points: 0
    },

    {
        season: "Summer",
        points: 0
    },

    {
        season: "Autumn",
        points: 0
    },

    {
        season: "Winter",
        points: 0
    }
]

var imageGrids = []
const shapes = imageForms.map(image => image.shape);

function createImageGrid() {
    shapes.forEach(shape => {
        const grid = document.createElement('div');
        grid.style.display = 'grid';

        shape.forEach(s => {
            const rowDiv = document.createElement('div')
            s.forEach(cell => {
            const cellElem = document.createElement('div');
            cellElem.className = cell ? 'image' : 'empty';
            rowDiv.appendChild(cellElem);
            });

            grid.appendChild(rowDiv)
        });

        imageGrids.push(grid);
    })
}

function addImageToImageGrid() {
    var randomImageGridIndex = Math.floor(Math.random() * imageGrids.length);
    var childDivs = imageGrids[randomImageGridIndex].children
    
    var randomImageDataIndex = Math.floor(Math.random() * imagesData.length);
    //console.log(randomImageGridIndex + " " + randomImageDataIndex);
    for (var i = 0; i < childDivs.length; i++) {
        const innerChild = childDivs[i].children
        
        for (var j = 0; j < innerChild.length; j++)
        {
            if (innerChild[j].className == "image") {
                currentElementTable.rows[i].cells[j].style.background = ""

                currentElementTable.rows[i].cells[j].style.backgroundImage = imagesData[randomImageDataIndex]

                if (currentElementTable.rows[i].cells[j].className == "empty")
                    currentElementTable.rows[i].cells[j].classList.remove("empty")

                currentElementTable.rows[i].cells[j].classList.add("image")
            }
            
            else {
                currentElementTable.rows[i].cells[j].style.background = ""

                if (currentElementTable.rows[i].cells[j].className == "image")
                    currentElementTable.rows[i].cells[j].classList.remove("image")

                currentElementTable.rows[i].cells[j].style.background = "white"

                currentElementTable.rows[i].cells[j].classList.add("empty")
            }
        }
    }
    
    var currentIndexes = [randomImageGridIndex, randomImageDataIndex]
    
    setShapeTime(currentIndexes[0])
    findAndLogAnchorImage();
    //console.log(currentIndexes);
    return currentIndexes
}

var timeUnit = 0;

function setShapeTime(currentIndex) {
    for (var i = 0; i < shapes.length; i++)
    {
        if (i == currentIndex)
        {
            timeUnit = imageForms[i].time;
            currentElementTimeP.textContent = timeUnit + "🕑"
        }
    }
}

let anchorCell = null;
function findAndLogAnchorImage() {
    const rows = currentElementTable.rows;

    for (let i = 0; i < rows.length; i++)
    {
        const cells = rows[i].cells;

        for (let j = 0; j < cells.length; j++)
        {
            if (cells[j].classList.contains("image"))
            {
                anchorCell = cells[j];
                //console.log("Anchor Image:", anchorCell);

                return;
            }
        }
    }
}

function rotate() {
    {
        var currentImageGridIndex = currentIndexes[0]
        var currentImageDataIndex = currentIndexes[1]
    
        const length = shapes[currentImageGridIndex].length;
        const rotatedMatrix = Array.from({ length: length }, () => Array(length).fill(0));
        
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                rotatedMatrix[j][length - 1 - i] = shapes[currentImageGridIndex][i][j];
            }
        }
        
        shapes[currentImageGridIndex] = rotatedMatrix
        
        const cell = new Array(length)
    
        for (var i = 0; i < length; i++)
            cell[i] = new Array(length);
    
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                cell[i][j] = currentElementTable.rows[i].cells[j];
    
                if (rotatedMatrix[i][j] === 1) {
                    cell[i][j].style.backgroundImage = imagesData[currentImageDataIndex];
                    //console.log(currentImageDataIndex + " " + currentImageGridIndex);
                    cell[i][j].classList.remove("empty")
                    cell[i][j].classList.add("image")
    
                    cell[i][j].style.backgroundSize = "contain"
                    cell[i][j].style.backgroundRepeat = "no-repeat"
                } else {
                    cell[i][j].style.background = "white";
    
                    cell[i][j].classList.remove("image")
                    cell[i][j].classList.add("empty")
                }
            }
        }
        
        findAndLogAnchorImage();
    }
}

function flip()
{
    {
        var currentImageGridIndex = currentIndexes[0];
        var currentImageDataIndex = currentIndexes[1];
    
        const length = shapes[currentImageGridIndex].length;
        const flippedMatrix = Array.from({ length: length }, () => Array(length).fill(0));
    
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                flippedMatrix[i][length - 1 - j] = shapes[currentImageGridIndex][i][j];
            }
        }
    
        shapes[currentImageGridIndex] = flippedMatrix;
        const cell = new Array(length)
    
        for (var i = 0; i < length; i++)
            cell[i] = new Array(length);
    
        for (let i = 0; i < length; i++) {
            for (let j = 0; j < length; j++) {
                cell[i][j] = currentElementTable.rows[i].cells[j];
                if (flippedMatrix[i][j] === 1) {
                    cell[i][j].style.backgroundImage = imagesData[currentImageDataIndex];
                    
                    cell[i][j].classList.remove("empty")
                    cell[i][j].classList.add("image")
    
                    cell[i][j].style.backgroundSize = "contain";
                    cell[i][j].style.backgroundRepeat = "no-repeat";
                } else {
                    cell[i][j].style.background = "white";
    
                    cell[i][j].classList.remove("image")
                    cell[i][j].classList.add("empty")
                }
            }
        }
    
        findAndLogAnchorImage()
    }
}

var score = 0
var timeLeft = 28;

totalScoreP.textContent = "Total Score: " + score
timeUnitP.textContent = "Time Unit Left: " + timeLeft
currentSeasonP.textContent = "Current Season: " + seasons[seasonsIndex].season;

function onClick(e)
{
    if (e.target.tagName === "TD")
    {
        // Anchor mouse cursor later

        var rowIndex = e.target.parentElement.rowIndex;
        const cellIndex = Array.from(e.target.parentElement.cells).indexOf(e.target);
        
        var row = e.target.parentElement;

        var i = rowIndex
        var canBePlaced = true

        while (i < rowIndex + 3)
        {
            for (var j = cellIndex; j < cellIndex + 3; j++)
            {
                if (j <= 10)
                {
                    if (row.cells[j].classList.contains("occupied") && currentElementTable.tBodies[0].rows[i - rowIndex].cells[j -cellIndex].className == "image")
                        canBePlaced = false
                }
            }
            
            if (row.className == "end")
            {
                rowIndex = i - 3
                //console.log("W");
                break;
            }
            //console.log("S");
            row = row.nextElementSibling
            i++
        }

        if (!canBePlaced)
            return

        var row = e.target.parentElement;

        for (var i = 0; i < 3; i++)
        {
            var tdIndex = cellIndex
            
            for (var j = 0; j < 3; j++)
            {
                if (tdIndex <= 10)
                {
                    //console.log(e.target.className);
                    //console.log(currentElementTable.tBodies[0].rows[i].cells[j]);
                    if (currentElementTable.tBodies[0].rows[i].cells[j].className == "image" && !e.target.classList.contains("end"))
                    {
                        const backgroundImage = currentElementTable.tBodies[0].rows[i].cells[j].style.backgroundImage;
                        //console.log(tdIndex + " " + row);
                        row.cells[tdIndex].style.backgroundImage = backgroundImage;
                        row.cells[tdIndex].classList.add("occupied");

                        //console.log(row.cells[tdIndex]);
                    }

                    tdIndex++
                }
            }
            
            if (row.classList.contains("end"))
                break;

            row = row.nextElementSibling;
        }

        i = rowIndex;
        var row = e.target.parentElement;
        
        row = e.target.parentElement;

        timeLeft -= timeUnit;
        timeUnitP.textContent = "Time Unit Left: " + timeLeft

        if (seasonsIndex == 0)
        {
            checkMission1(rowIndex, cellIndex, row);
            checkMission2(rowIndex, cellIndex, row);
            //console.log("AB");
        }

        if (seasonsIndex == 1)
        {
            checkMission2(rowIndex, cellIndex, row);
            //checkMission3(rowIndex, cellIndex, row);
            //console.log("BC");
        }

        if (seasonsIndex == 2)
        {
            //checkMission3(rowIndex, cellIndex, row);
            checkMission4(rowIndex, cellIndex, row, e.target);
            console.log("CD");
        }

        if (seasonsIndex == 3)
        {
            checkMission4(rowIndex, cellIndex, row, e.target);
            checkMission1(rowIndex, cellIndex, row);
            //console.log("DA");
        }

        mountainMission()

        nextSeason()

        //console.log(timeLeft);
        if (timeLeft <= 0)
            finalScore()

        seasonTimeElapse++;

        if (seasonTimeElapse > 7)
            seasonTimeElapse = 0;

        elapsedTimeP.textContent = "Elapsed Time In Current Season: " + seasonTimeElapse + "/7"
        currentIndexes = addImageToImageGrid();
    }
}

function checkMission1(rowIndex, cellIndex, row) {
    var i = rowIndex;

    while (i < rowIndex + 3)
    {
        for (var j = cellIndex; j < cellIndex + 3; j++)
        {
            if (j >= 11)
                break;

            if (row.cells[j].style.backgroundImage == imagesData[0])
            {
                if (i == 0 || i == 10)
                {
                    if (row.cells[j].classList.contains("occupied"))
                    {
                        const thisMisionPoint = 1

                        mission1Point += thisMisionPoint;

                        mission1P.textContent = "(" + mission1Point + " Points)"

                        row.cells[j].classList.add(m1Checked);
                    }
                }

                if (j == 10 && i != 0)
                {
                    if (row.cells[j].classList.contains("occupied"))
                    {
                        const thisMisionPoint = 1

                        mission1Point += thisMisionPoint;

                        mission1P.textContent = "(" + mission1Point + " Points)"
                        row.cells[j].classList.add(m1Checked);
                    }
                }

                if (j == 0 && i != 0)
                {
                    console.log(i);
                    if (row.cells[j].classList.contains("occupied"))
                    {
                        const thisMisionPoint = 1

                        mission1Point += thisMisionPoint;

                        mission1P.textContent = "(" + mission1Point + " Points)"
                        
                        row.cells[j].classList.add(m1Checked);
                    }
                }
            }
        }
        
        if (row.className == "end")
        {
            rowIndex = i
            break;
        }

        row = row.nextElementSibling
        i++
    }
}

function checkMission2(rowIndex, cellIndex, row) {
    var i = rowIndex;

    while (i < rowIndex + 3)
    {
        for (var j = cellIndex; j < cellIndex + 3; j++)
        {
            if (j <= 10)
            {
                if (row.cells[j].classList.contains("occupied") && row.cells[j].style.backgroundImage == imagesData[0])
                {
                    if (j >= 2 && !row.cells[j].classList.contains(m2Checked) && !row.cells[j-1].classList.contains(m2Checked) && !row.cells[j-2].classList.contains(m2Checked) && row.cells[j-1].style.backgroundImage == imagesData[0] && row.cells[j-2].style.backgroundImage == imagesData[0])
                    {
                        const thisMisionPoint = 4

                        mission2Point += thisMisionPoint;

                        mission2P.textContent = "(" + mission2Point + " Points)"

                        row.cells[j-2].classList.add(m2Checked)
                        row.cells[j-1].classList.add(m2Checked)
                        row.cells[j].classList.add(m2Checked)
                    }

                    else if ( j >= 1 && j <= 9 && !row.cells[j].classList.contains(m2Checked) && !row.cells[j-1].classList.contains(m2Checked) && !row.cells[j+1].classList.contains(m2Checked) && row.cells[j-1].style.backgroundImage == imagesData[0] && row.cells[j+1].style.backgroundImage == imagesData[0])
                    {
                        const thisMisionPoint = 4

                        mission2Point += thisMisionPoint;

                        mission2P.textContent = "(" + mission2Point + " Points)"

                        row.cells[j+1].classList.add(m2Checked)
                        row.cells[j-1].classList.add(m2Checked)
                        row.cells[j].classList.add(m2Checked)
                    }

                    else if (j <= 8 && !row.cells[j].classList.contains(m2Checked) && !row.cells[j+1].classList.contains(m2Checked) && !row.cells[j+2].classList.contains(m2Checked) && row.cells[j+1].style.backgroundImage == imagesData[0] && row.cells[j+2].style.backgroundImage == imagesData[0])
                    {
                        const thisMisionPoint = 4

                        mission2Point += thisMisionPoint;

                        mission2P.textContent = "(" + mission2Point + " Points)"

                        row.cells[j+2].classList.add(m2Checked)
                        row.cells[j+1].classList.add(m2Checked)
                        row.cells[j].classList.add(m2Checked)
                    }
                }
            }
        }
        
        if (row.className == "end")
        {
            rowIndex = i
            break;
        }
        
        row = row.nextElementSibling
        i++
    }
}

function checkMission3(rowIndex, cellIndex, row) {
    
}

function checkMission4(rowIndex, cellIndex, row, td) {
    var i = rowIndex;

    while (i < rowIndex + 3)
    {
        var counter = 0;

        for (var j = 0; j < 11; j++)
        {
            if (!row.cells[j].classList.contains("occupied"))
            {
                break;
            }

            if (row.cells[j].classList.contains("occupied"))
            {
                //console.log(row.cells[j]);
                counter++;
                
                if (counter == 11)
                {
                    const thisMisionPoint = 6

                    mission4Point += thisMisionPoint;

                    mission4P.textContent = "(" + mission4Point + " Points)"

                    counter = 0;
                    
                    //console.log(row.cells[j]);
                    //row2.cells[j+1].classList.add(m4Checked)
                }
            }
        }
        
        if (row.className == "end")
        {
            rowIndex = i
            break;
        }

        row = row.nextElementSibling
        i++
    }

    var j = cellIndex
    while (j < cellIndex + 3)
    {
        if (j >= 11)
            break;

        var counter = 0;

        for (var i = 0; i < 11; i++)
        {
            var row2 = gameTable.rows[i]
            //console.log(row2.cells[j]);
            
            //console.log("---------------");
            if (!row2.cells[j].classList.contains("occupied"))
            {
                break;
            }
            
            if (row2.cells[j].classList.contains("occupied"))
            {
                counter++;
                //console.log(counter);
                if (counter == 11)
                {
                    const thisMisionPoint = 6

                    mission4Point += thisMisionPoint;

                    mission4P.textContent = "(" + mission4Point + " Points)"

                    counter = 0;
                    
                    //row2.cells[j+1].classList.add(m4Checked)
                }
            }
            
            

            row2 = row2.nextElementSibling
        }

        j++
    }
}

var prevRow = []
function mountainMission()
{
    row = gameTable.querySelector("tr")

    for (var i = 0; i < 11; i++)
    {
        var nextRow = row.nextElementSibling

        for (var j = 0; j < 11; j++)
        {
            if (row.cells[j].style.backgroundImage == `url("assets/tiles/mountain_tile.png")` && !row.cells[j].classList.contains("MountainChecked"))
            {
                if (row.cells[j-1].classList.contains("occupied") && row.cells[j+1].classList.contains("occupied") && prevRow.cells[j].classList.contains("occupied") && nextRow.cells[j].classList.contains("occupied"))
                {
                    mountainPoint += 1
                    row.cells[j].classList.add(mountainChecked)

                    console.log(row.cells[j]);
                }
            }
        }
        
        prevRow = row
        row = row.nextElementSibling;
    }
}

var finalM1 = 0
var finalM2 = 0
var finalM3 = 0
var finalM4 = 0
var finalMountain = 0

function finalScore()
{
    endGameDiv.style.display = "block"

    score = finalM1 + finalM2 + finalM3 + finalM4 + finalMountain
    totalScoreP.textContent = "Total Score: " + score
    
    mission1FinalP.textContent = finalM1 + " Points";
    mission2FinalP.textContent = finalM2 + " Points";
    mission3FinalP.textContent = finalM3 + " Points";
    mission4FinalP.textContent = finalM4 + " Points";

    totalPointsP.textContent = "Total Points: " + score
}

function nextSeason() {
    if (seasonTimeElapse >= 7 || timeLeft <= 0)
    {
        if (seasonsIndex == 0)
        {
            finalM1 += mission1Point
            finalM2 += mission2Point;
            finalMountain += mountainPoint;

            score = finalM1 + finalM2 + finalMountain;
            seasons[seasonsIndex].points = score;
            
            totalScoreP.textContent = "Total Score: " + seasons[seasonsIndex].points

            mission1Point = 0;
            mission2Point = 0
            mountainPoint = 0
            
            springP.innerHTML = `Spring:<br>${seasons[seasonsIndex].points} Points</br>`
        }

        if (seasonsIndex == 1)
        {
            finalM2 += mission2Point
            finalM3 += mission3Point;
            finalMountain += mountainPoint;

            score = finalM2 + finalM3 + finalMountain
            seasons[seasonsIndex].points = score;

            totalScoreP.textContent = "Total Score: " + seasons[seasonsIndex].points

            mission2Point = 0;
            mission3Point = 0
            mountainPoint = 0

            summerP.innerHTML = `Summer:<br>${seasons[seasonsIndex].points} Points</br>`
        }

        if (seasonsIndex == 2)
        {
            finalM3 += mission3Point
            finalM4 += mission4Point;
            finalMountain += mountainPoint;

            score = finalM3 + finalM4 + finalMountain
            seasons[seasonsIndex].points = score;

            totalScoreP.textContent = "Total Score: " + seasons[seasonsIndex].points

            mission3Point = 0;
            mission4Point = 0
            mountainPoint = 0;

            autumnP.innerHTML = `Autumn:<br>${seasons[seasonsIndex].points} Points</br>`
        }

        if (seasonsIndex == 3)
        {
            finalM4 += mission4Point
            finalM1 += mission1Point;
            finalMountain += mountainPoint;

            score = finalM4 + finalM1 + finalMountain
            seasons[seasonsIndex].points = score;

            totalScoreP.textContent = "Total Score: " + seasons[seasonsIndex].points

            mission4Point = 0;
            mission1Point = 0
            mountainPoint = 0

            winterP.innerHTML = `Winter:<br>${seasons[seasonsIndex].points} Points</br>`
        }
    
        seasonsIndex++;
        seasonTimeElapse = 0;

        elapsedTimeP.textContent = "Elapsed Time In Current Season: " + seasonTimeElapse + "/7"
        currentSeasonP.textContent = "Current Season: " + seasons[seasonsIndex].season;
    }
}

createImageGrid();
var currentIndexes = addImageToImageGrid();

rotateButton.addEventListener('click', rotate)
flipButton.addEventListener('click', flip)
gameTable.addEventListener("click", onClick);