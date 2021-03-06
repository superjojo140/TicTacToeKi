var a = [-1, -1, -1, -1, -1, -1, -1, -1, -1];

function userTurn(num) {
    if (a[num] == -1) {
        
        setField(num, 0); //Zug des Spielers
        
        if (whoIsWinning(a) < 0) { //noch nicht fertig
            
            setField(bestTurn(a, 1), 1); //Zug des Gegners
            
        }
        if (whoIsWinning(a) == 0) {
            alert("Du hast gewonnen");
            resetGame();
        }
        else
        if (whoIsWinning(a) == 1) { //fertig
            alert("Verloren");
            resetGame();
        }
        else
        if (whoIsWinning(a) == 2) { //fertig
            alert("Unentschieden");
            resetGame();
        }
    }
    else {
        alert("In dieses Feld kann nicht gesetzt werden");
    }
}

function setField(feld, wert) {
    var id = "cell" + feld;
    a[feld] = wert;
    if (wert == 0) {
        document.getElementById(id).innerHTML = "X";
    }
    if (wert == 1) {
        document.getElementById(id).innerHTML = "O";
    }
}

function whoIsWinning(array) {
    var win = -1;
    //Prüfen ob jemand gewonnen hat
    //Horizontal
    if (array[0] == array[1] && array[2] == array[1] && array[0] != -1) {
        win = array[0];
    }
    if (array[3] == array[4] && array[4] == array[5] && array[3] != -1) {
        win = array[3];
    }
    if (array[6] == array[7] && array[7] == array[8] && array[6] != -1) {
        win = array[6];
    }
    //Vertical
    if (array[0] == array[3] && array[3] == array[6] && array[0] != -1) {
        win = array[0];
    }
    if (array[1] == array[4] && array[4] == array[7] && array[1] != -1) {
        win = array[1];
    }
    if (array[2] == array[5] && array[5] == array[8] && array[2] != -1) {
        win = array[2];
    }
    //Diagonal
    if (array[0] == array[4] && array[4] == array[8] && array[0] != -1) {
        win = array[0];
    }
    if (array[6] == array[4] && array[2] == array[4] && array[6] != -1) {
        win = array[6];
    }
    if (win == 0 || win == 1) { //Falls bereits jemand gewonnen hat
        return win;
    }
    else {
        for (var i = 0; i < 9; i++) {
            if (array[i] == -1) {
                return -1;
            } //Noch nicht fertig
        }
        return 2; //Unentschieden
    }
}

function bestTurn(array, player) {
    if (player = 0) {
        var opponent = 1;
    }
    else if (player = 1) {
        var opponent = 0;
    }
    else alert("Fehlerhafter Spieler");
    //Prüfen ob Sieg in diesem zug möglich
    for (var i = 0; i < 9; i++) {
        if (array[i] == -1) {
            var copyArray = array.slice();
            copyArray[i] = player;
            if (whoIsWinning(copyArray) == player) {
                return i;
            }
        }
    }
    //Prüfen, ob Sieg des Gegners möglich
    for (var i = 0; i < 9; i++) {
        if (array[i] == -1) {
            var copyArray = array.slice();
            copyArray[i] = opponent;
            if (whoIsWinning(copyArray) == opponent) {
                return i;
            }
        }
    }
    //Ansonsten bestes Alternativfeld rekursiv ermitteln
    var werte = [0,0,0,0,0,0,0,0,0];
    for (var i = 0; i < 9; i++) {
        if (array[i] == -1) {
            var copyArray = array.slice();
            copyArray[i] = player; //Setze in das zu testende Feld
            copyArray[bestTurn(copyArray, opponent)] = opponent; //Lasse den Gegner einen optimalen Zug machen
            werte[bestTurn(copyArray, player)]++; //Die Lösung am ermittelten index wird +1 mal empfohlen
        }
    }
    //Finde herraus, welcher Wert am häufigsten empfohlen wird
    
    //feld das noch nicht besetzt ist
    highest = 0;
    for (var j=0; j<9; j++){
        if (array[j] == -1){
            var highestId = j;
        }
    }
    
    for (var i = 0; i < 9; i++) {
        if (werte[i] > highest) {
            highest = werte[i];
            highestId = i;
        }
    }
    return highestId;
}


function resetGame() {
    for (var i = 0; i < 9; i++) {
        document.getElementById("cell" + i).innerHTML = "";
    }
    a = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
}