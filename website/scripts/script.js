// * IMPORTANT: All Variables that will be submitted are initialized here

var teamsLoaded = false; // have the teams been loaded from the functions
var teamSelected = null; // What team the client selected

var wasPresent = null; // terrible name --> for the question about whether or not the team came to the match

var crossedAuto = false;
var startingLevel = 0;
var climbLevel = 0;
var problem = false; // did the robot break ?

//cargoship and rocket values are modified in the HTML
var cargoShipHP = 0;
var cargoShipCargo = 0;


var rocket1LvlHP = 0;
var rocket1LvlCargo = 0;

var rocket2LvlHP = 0;
var rocket2LvlCargo = 0;

var rocket3LvlHP = 0;
var rocket3LvlCargo = 0;


var droppedCargo = 0;
var droppedHP = 0;

// defence

var defended = false;
var defenseBot = false;


function removeObject(location, type, lvl) {
    switch (location) {
        case "rocket":
            switch (lvl) {
                case 1:
                    switch (type) {
                        case "HP":
                            if (rocket1LvlHP > 0) {
                                rocket1LvlHP--;
                                console.log(rocket1LvlHP)
                                document.getElementById('RocketLvl1HPCounterText').innerText = rocket1LvlHP;
                            }
                            break;
                        case "cargo":
                            if (rocket1LvlCargo > 0) {
                                rocket1LvlCargo--;
                                console.log(rocket1LvlCargo)
                                document.getElementById('RocketLvl1CargoCounterText').innerText = rocket1LvlCargo;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 2:
                    switch (type) {
                        case "HP":
                            if (rocket2LvlHP > 0) {
                                rocket2LvlHP--;
                                console.log(rocket2LvlHP)
                                document.getElementById('RocketLvl2HPCounterText').innerText = rocket2LvlHP;
                            }
                            break;
                        case "cargo":
                            if (rocket2LvlCargo > 0) {
                                rocket2LvlCargo--;
                                console.log(rocket2LvlCargo)
                                document.getElementById('RocketLvl2CargoCounterText').innerText = rocket2LvlCargo;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 3:
                    switch (type) {
                        case "HP":
                            if (rocket3LvlHP > 0) {
                                rocket3LvlHP--;
                                console.log(rocket3LvlHP)
                                document.getElementById('RocketLvl3HPCounterText').innerText = rocket3LvlHP;
                            }
                            break;
                        case "cargo":
                            if (rocket3LvlCargo > 0) {
                                rocket3LvlCargo--;
                                console.log(rocket3LvlCargo)
                                document.getElementById('RocketLvl3CargoCounterText').innerText = rocket3LvlCargo;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            break;

        case "cargoship":
            switch (type) {
                case "HP":
                    if (cargoShipHP > 0) {
                        cargoShipHP--;
                        console.log(cargoShipHP)
                        document.getElementById('CargoshipHPCounterText').innerText = cargoShipHP;
                    }
                    break;
                case "cargo":
                    if (cargoShipCargo > 0) {
                        cargoShipCargo--;
                        console.log(cargoShipCargo)
                        document.getElementById('CargoshipCargoCounterText').innerText = cargoShipCargo;
                    }
                    break;
                default:
                    break;
            }
            break;

        default:
            break;
    }
}

function addObject(location, type, lvl) {
    switch (location) {
        case "rocket":
            switch (lvl) {
                case 1:
                    switch (type) {
                        case "HP":
                            if (rocket1LvlHP < 4) { // * client-side security
                                rocket1LvlHP++;
                                console.log(rocket1LvlHP)
                                document.getElementById('RocketLvl1HPCounterText').innerText = rocket1LvlHP;
                            }
                            break;
                        case "cargo":
                            if (rocket1LvlCargo < 4) {
                                rocket1LvlCargo++;
                                console.log(rocket1LvlCargo)
                                document.getElementById('RocketLvl1CargoCounterText').innerText = rocket1LvlCargo;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 2:
                    switch (type) {
                        case "HP":
                            if (rocket2LvlHP < 4) {
                                rocket2LvlHP++;
                                console.log(rocket2LvlHP)
                                document.getElementById('RocketLvl2HPCounterText').innerText = rocket2LvlHP;
                            }
                            break;
                        case "cargo":
                            if (rocket2LvlCargo < 4) {
                                rocket2LvlCargo++;
                                console.log(rocket2LvlCargo)
                                document.getElementById('RocketLvl2CargoCounterText').innerText = rocket2LvlCargo;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                case 3:
                    switch (type) {
                        case "HP":
                            if (rocket3LvlHP < 4) {
                                rocket3LvlHP++;
                                console.log(rocket3LvlHP)
                                document.getElementById('RocketLvl3HPCounterText').innerText = rocket3LvlHP;
                            }
                            break;
                        case "cargo":
                            if (rocket3LvlCargo < 4) {
                                rocket3LvlCargo++;
                                console.log(rocket3LvlCargo)
                                document.getElementById('RocketLvl3CargoCounterText').innerText = rocket3LvlCargo;
                            }
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
            break;

        case "cargoship":
            switch (type) {
                case "HP":
                    if (cargoShipHP < 8) {
                        cargoShipHP++;
                        console.log(cargoShipHP)
                        document.getElementById('CargoshipHPCounterText').innerText = cargoShipHP;
                    }
                    break;
                case "cargo":
                    if (cargoShipCargo < 8) {
                        cargoShipCargo++;
                        console.log(cargoShipCargo)
                        document.getElementById('CargoshipCargoCounterText').innerText = cargoShipCargo;
                    }
                    break;
                default:
                    break;
            }
            break;

        default:
            break;
    }
}

const selectedColor = '#0DCB0A';
const unselectedColor = '#888888';
const redColor = '#fd3f35';
const blueColor = '#1876d6';


function selectStartingLevel(level) {
    startingLevel = level;

    if (level == 1) {
        document.getElementById('q1l1').style.backgroundColor = selectedColor;
        document.getElementById('q1l2').style.backgroundColor = unselectedColor;
    } else {
        document.getElementById('q1l1').style.backgroundColor = unselectedColor;
        document.getElementById('q1l2').style.backgroundColor = selectedColor;
    }
}

function selectAttendance(value) {
    wasPresent = value;

    if (value) {
        document.getElementById('q0a1').style.backgroundColor = selectedColor;
        document.getElementById('q0a2').style.backgroundColor = unselectedColor;
        document.getElementById('mainQ').style.display = 'block'
        document.getElementById('dropCounterContainer').style.display = 'flex'
        document.getElementById('submitButton').style.display = 'block'

    } else if (!value) {
        document.getElementById('q0a2').style.backgroundColor = selectedColor;
        document.getElementById('q0a1').style.backgroundColor = unselectedColor;
        document.getElementById('mainQ').style.display = 'none'
        document.getElementById('dropCounterContainer').style.display = 'none'

        crossedAuto = false;
        startingLevel = 0;
        climbLevel = 0;
        problem = false; // did the robot break ?

        //cargoship and rocket values are modified in the HTML
        cargoShipHP = 0;
        cargoShipCargo = 0;

        rocket1LvlHP = 0;
        rocket1LvlCargo = 0;

        rocket2LvlHP = 0;
        rocket2LvlCargo = 0;

        rocket3LvlHP = 0;
        rocket3LvlCargo = 0;


        droppedCargo = 0;
        droppedHP = 0;

        document.getElementById('submitButton').style.display = 'block'
    }
}

function selectAutoLine(value) {
    crossedAuto = value;

    if (value) {
        document.getElementById('q2Yes').style.backgroundColor = selectedColor;
        document.getElementById('q2No').style.backgroundColor = unselectedColor;
    } else {
        document.getElementById('q2Yes').style.backgroundColor = unselectedColor;
        document.getElementById('q2No').style.backgroundColor = selectedColor;
    }
}

function selectProblem(value) {
    problem = value;

    if (value) {
        document.getElementById('qBreakYes').style.backgroundColor = selectedColor;
        document.getElementById('qBreakNo').style.backgroundColor = unselectedColor;
    } else {
        document.getElementById('qBreakYes').style.backgroundColor = unselectedColor;
        document.getElementById('qBreakNo').style.backgroundColor = selectedColor;
    }
}

function selectClimbLevel(level) {
    climbLevel = level;

    if (level == 1) {
        document.getElementById('qClimbLevel0').style.backgroundColor = unselectedColor;
        document.getElementById('qClimbLevel1').style.backgroundColor = selectedColor;
        document.getElementById('qClimbLevel2').style.backgroundColor = unselectedColor;
        document.getElementById('qClimbLevel3').style.backgroundColor = unselectedColor;
    } else if (level == 2) {
        document.getElementById('qClimbLevel0').style.backgroundColor = unselectedColor;
        document.getElementById('qClimbLevel1').style.backgroundColor = unselectedColor;
        document.getElementById('qClimbLevel2').style.backgroundColor = selectedColor;
        document.getElementById('qClimbLevel3').style.backgroundColor = unselectedColor;
    } else if (level == 3) {
        document.getElementById('qClimbLevel0').style.backgroundColor = unselectedColor;
        document.getElementById('qClimbLevel1').style.backgroundColor = unselectedColor;
        document.getElementById('qClimbLevel2').style.backgroundColor = unselectedColor;
        document.getElementById('qClimbLevel3').style.backgroundColor = selectedColor;
    } else {
        document.getElementById('qClimbLevel0').style.backgroundColor = selectedColor;
        document.getElementById('qClimbLevel1').style.backgroundColor = unselectedColor;
        document.getElementById('qClimbLevel2').style.backgroundColor = unselectedColor;
        document.getElementById('qClimbLevel3').style.backgroundColor = unselectedColor;
    }
}

function updateDefended(bool) {
    defended = bool;

    if (defended) {
        document.getElementById('qDefended1').style.backgroundColor = selectedColor;
        document.getElementById('qDefended2').style.backgroundColor = unselectedColor;
    } else {
        document.getElementById('qDefended1').style.backgroundColor = unselectedColor;
        document.getElementById('qDefended2').style.backgroundColor = selectedColor;
    }
}

function isDefenseBot(bool) {
    defenseBot = bool;

    if (defenseBot) {
        document.getElementById('qDefenseBot1').style.backgroundColor = selectedColor;
        document.getElementById('qDefenseBot2').style.backgroundColor = unselectedColor;
    } else {
        document.getElementById('qDefenseBot1').style.backgroundColor = unselectedColor;
        document.getElementById('qDefenseBot2').style.backgroundColor = selectedColor;
    }
}

function updateDropCounters(counter) {
    document.getElementById("dropCargoCounterText").innerText = droppedCargo;
    document.getElementById("dropHPCounterText").innerText = droppedHP;
}

function addHpDropped() {
    console.log("hatch dropped");
    droppedHP += 1;
    updateDropCounters()
}

function addCargoDropped() {
    console.log("cargo Dropped");
    droppedCargo += 1;
    updateDropCounters()
}

function cancelDrop(object) {
    if (object == 'HP' && droppedHP > 0) {
        droppedHP--;
    } else if (object == 'cargo' && droppedCargo > 0) {
        droppedCargo--;
    }
    updateDropCounters();
}

function updateSelection(number) {
    // i will recode this - Victor
    resetButtons();
    if (number <= 3) {
        //blue
        document.getElementById("blueTeam" + number).style.backgroundColor =
            selectedColor;
        teamSelected = Number(
            document.getElementById("blueTeam" + number).innerHTML
        );

    } else if (number > 3 && number <= 6) {
        //red
        number -= 3;
        document.getElementById("redTeam" + number).style.backgroundColor =
            selectedColor;
        teamSelected = Number(
            document.getElementById("redTeam" + number).innerHTML
        );
    } else {
        alert("Invalid selection"); //invalid
    }

    // uid = firebase.auth().currentUser.uid;
}

function resetButtons() {
    teamSelected = null;
    for (let i = 1; i < 4; i++) {
        document.getElementById("blueTeam" + i).style.backgroundColor =
            "#1876D6";
    }
    for (let i = 1; i < 4; i++) {
        document.getElementById("redTeam" + i).style.backgroundColor =
            "#FD3F35";
    }
}

var timeBeginning = 0;
// var matchTime = 170000; //170 seconds = 150 seconds game + 20 curtesy seconds
function getTimeInMatch() {
    var now = new Date();
    return ((now.getTime() - timeBeginning.getTime()) / 1000);
}