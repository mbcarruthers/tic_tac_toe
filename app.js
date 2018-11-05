const squares = document.querySelectorAll(".square");
const outcome_container = document.querySelector(".outcome_container");
let outcome = false; // boolean value for if the game has been won | TODO: use value
let counter = 0;



// horizonal rows
const top_row =       document.querySelectorAll(".top");
const center_row =    document.querySelectorAll(".center");
const bottom_row =    document.querySelectorAll(".bottom");

// vertical columns
const left_column =   document.querySelectorAll(".left");
const right_column =  document.querySelectorAll(".right");
const middle_column = document.querySelectorAll(".middle");

// diagonal
const left_diagonal =  [squares[0],squares[4],squares[8]]; // downwards diagonal from the left
const right_diagonal = [squares[2],squares[4],squares[6]]; // upwards diagonal from the right


squares.forEach( function( square ) {
    square.addEventListener("click", square_clicked);
});

function check_rows( row_array ) {  // supposed to pass in an array of rows , returns a boolean value
    let x_counter = 0;
    let o_counter = 0;
    for(let i = 0;i < row_array.length;++i) {
        if(row_array[i].textContent === "X") {
            ++x_counter;
        } else if(row_array[i].textContent === "O") {
            ++o_counter;
        }
    }
    return x_counter === 3 || o_counter === 3 ? true : false;
}



// the big function where everything really goes into
function square_clicked( event ) {
    if( counter % 2 === 0 && event.target.textContent !== "O" ) {
         event.target.textContent = "X";
         ++counter;
    } else if( counter % 2 === 1 && event.target.textContent !== "X" )
    {
         event.target.textContent = "O";
         ++counter;
    }
    if( check_rows( top_row ) || check_rows( bottom_row ) || check_rows( center_row ) ) {
        set_outcome( counter );
        outcome = true;
        squares.forEach( function( square ) {
            square.removeEventListener("click", square_clicked );
        });
    } else if( check_rows( left_column ) || check_rows( right_column ) || check_rows( middle_column ) ) {
        set_outcome( counter );
        outcome = true;
        squares.forEach( function( square ) {
            square.removeEventListener("click", square_clicked );
        });
    } else if( check_rows( left_diagonal ) || check_rows( right_diagonal ) ) {
        set_outcome( counter );
        outcome = true;
        squares.forEach( function( square ) {
            square.removeEventListener("click", square_clicked );
        });
    }
    if(is_empty( squares ) === 0 )
    {
        outcome_container.innerHTML = "Draw!";
        outcome = true;
    }
    // if(outcome) {
    //      let board = document.querySelector("#board");
    //      board.addEventListener("click", function() {
    //          clear_game( squares );
    //      });
    //     counter = 0;
    //     outcome_container.innerHTML = "";
    //     outcome = false;
    // }


}


// temporary button until i can get the outcome/body/click event listener working correctly
function reset() {
    counter = 0;
    outcome_container.innerHTML = "";
    clear_game( squares );
    squares.forEach( function( square ) {
        square.addEventListener("click", square_clicked);
    });
}


function clear_game( square_array ) {
    square_array.forEach(function( square ) {
        square.textContent = "";
        outcome = false;
    })
}


function set_outcome( count ) {
    if(count % 2 !== 0) {
        outcome_container.innerHTML = "<h5>X has won the game!</h5>";
    }else {
        outcome_container.innerHTML = "<h5>O has won the game!</h5>";
    }

}


function is_empty( square_array ) { // when this function returns 0, on line 70, then it is determined that the game was a draw
    let count = 0;
    for(let i = 0; i < square_array.length;++i) { // the first time this loops it starts at eight because it loops when the user clicks
        if(square_array[i].textContent === "") {
            ++count;
        }
    }
    return count;
}