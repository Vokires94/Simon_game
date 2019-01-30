import React from 'react'

let arr = ['Yellowbutton', 'Redbutton', 'Bluebutton', 'Greenbutton'];

let arr2 = ['yellow', 'red', 'blue', 'green'];

var res_user = [];

var user_mas=[];

var tries = 0;

var points = 0;

var leg = 0;

let lose = false;

let level = 1;

let difficult = 0;

let next_level = 0;

function shadow_buttons() {
    for (let z = 0; z < 4; z++) {
                document.getElementsByClassName(arr[z])[0].disabled=true;
        }
    }

function paint_buttons() {
    for (let z = 0; z < 4; z++) {
        document.getElementsByClassName(arr[z])[0].style.background = arr2[z];
    }
}

setTimeout(shadow_buttons, 10);

const Button = ({ className, children, onClick, color }) => (
    <button
        className={className}
        onClick={onClick}
        style={{ backgroundColor: color }}
    >
        {children}
    </button>
);

const buttons = [
    {
        id: 'Yellowbutton',
        color: 'yellow',
    },
    {
        id: 'Redbutton',
        color: 'red',
    },
    {
        id: 'Bluebutton',
        color: 'blue',
    },
    {
        id: 'Greenbutton',
        color: 'green',
    },
];

class Buttons extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
        this.handleClick = this.handleClick.bind(this);
        this.handleStartBlink = this.handleStartBlink.bind(this);
    }


        handleClick(item) {


        paint_buttons();

        user_mas.push(item);

        console.log(user_mas);

        document.getElementsByClassName(item)[0].style.background = 'pink';

        tries++;

        if (tries === 5+next_level) {
            for (let i = 0; i <= 4+next_level; i++) {
                if (res_user[i] === user_mas[i]) points++;
                else {
                    document.getElementById ('message_user').textContent = 'Sorry, you wrong. You have completed ' + leg + ' leg';
                    lose = true; next_level=0; leg=0;
                    break;
                }
            }
            if(points === 5+next_level) leg++;

            if(!lose)document.getElementById ('message_user').textContent = 'You have completed ' + leg + ' leg';
            tries = 0;
            points= 0;

            paint_buttons();
            shadow_buttons();
            if(lose!==true) { next_level++; this.handleStartBlink(); }
            else {
                document.getElementById ('change_level').disabled = false;
                document.getElementById ('go_play').disabled = false;
            }
        }

    }

   handleLevelChange() {

         if(level === 1) {
            document.getElementById('change_level').textContent = 'Hard'; level=0; difficult=1500;
        } else {
             document.getElementById('change_level').textContent = 'Easy'; level=1; difficult=0;
         }
    }

    handleReset(){
        res_user = [];
        user_mas = [];
        tries = 0;
        points = 0;
        leg = 0;
        lose = false;
        level = 1;
        next_level = 0;
        paint_buttons();
        shadow_buttons();
        document.getElementById ('go_play').disabled = false;
        document.getElementById ('message_user').textContent = "Let's play.";
    }

    handleStartBlink() {
        console.log(next_level);
        lose=false;
        res_user = [];
        user_mas = [];
        document.getElementById ('change_level').disabled = true;
        document.getElementById ('reset_button').disabled = true;
       document.getElementById ('go_play').disabled = true;

        //console.log(Math.round(Math.random() * (4 - 1) + 1));

        var timer = setInterval(Rand_blink, 3000-difficult);

        setTimeout(function() {
            clearInterval(timer)}, 15000+next_level*3000-difficult*(5+next_level));

        setTimeout(() => {
            for (var i = 0; i < 4; i++) {
                document.getElementsByClassName(buttons[i].id)[0].disabled = false;
            }
            document.getElementById ('reset_button').disabled = false;
            document.getElementById ('message_user').textContent = 'Tip chosen buttons';
        }, 17000+next_level*3000-difficult*(5+next_level));



        function Rand_blink() {


            var rand = Math.floor(Math.random() * arr.length);

            console.log(arr[rand]);

            paint_buttons();

            var current = document.getElementsByClassName(arr[rand])[0].style.background;

            document.getElementsByClassName(arr[rand])[0].style.background = 'pink';



            setTimeout(function() {
                document.getElementsByClassName(arr[rand])[0].style.background = current;
            }, 2000-difficult);

            res_user.push(arr[rand]);

            console.log(res_user);
        }
    }

    render() {
        return (
            <div id="center" style={{ 'text-align': 'center' }}>
                {buttons.map(item => (
                    <Button

                        key={item.id}
                        className={item.id}
                        color={item.color}
                        onClick={() => this.handleClick(item.id)}
                    >{item.id}</Button>
                ))}
                <br />
                <br />
                <br />
                <br />
                <br />
                <span id='message_user'>Let's play.</span>
                <br />
                <br />
                <br />
                <br />
                <br />
                <button id='go_play' onClick={this.handleStartBlink}>Start</button>
                <button id='change_level' onClick={this.handleLevelChange}>Easy</button>
                <button id='reset_button' onClick={this.handleReset}>Reset</button>
            </div>
        );
    }
}

export default Buttons