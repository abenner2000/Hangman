import { render } from '@testing-library/react';
import React from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

var words = ['Flame', 'Andrew', 'Banana'];
var random = Math.floor(Math.random() * 3);
var chosenWord = words[random];
var wordlength = chosenWord.length;
var display = []
for (var index = 0; index < wordlength; index++){
  display[index] = '_ ';
}

var manCounter = 0;
var man = [
  ['__|__',<br />,'|'],
  ['__|__',<br />,'|',<br />,'0'],
  ['__|__',<br />,'|',<br />,'0',<br />,'|'],
  ['__|__',<br />,'|',<br />,'0',<br />,'/|'],
  ['__|__',<br />,'|',<br />,'0',<br />,'/|\\'],
  ['__|__',<br />,'|',<br />,'0',<br />,'/|\\',<br />,'|'],
  ['__|__',<br />,'|',<br />,'0',<br />,'/|\\',<br />,'|',<br />,'/'],
  ['__|__',<br />,'|',<br />,'0',<br />,'/|\\',<br />,'|',<br />,'/\\'],
];

var incBoxCounter = 0;
var incBox = [];

var cBoxCounter = 0;
var cBox = [];


function chooseDisplay(code) {
  if (code == "inc"){
    return incBox;
  }
  else{
    return cBox;
  }
}

function updateDisplay(letter) {
  var winCounter = 0;
  for (var index = 0; index < wordlength; index++){
    if (display[index].toUpperCase() != display[index].toLowerCase()){
      winCounter++;
      continue;
    }
    else if (letter == chosenWord[index].toUpperCase()){
      display[index] = (letter)+' ';
      winCounter++;
    }
    else{
      display[index] = '_ ';
    }
  }
  ReactDOM.render(
    <Board />,
    document.getElementById('root')
  );
  if (winCounter == wordlength) {
    alert('You won, the word was: ' + chosenWord);
    window.location.reload();
  }
}

function toCorrect(letter){
  if (cBox.includes(letter)){
    alert('You guessed this letter already');
    return;
  }
  cBox[cBoxCounter] = letter;
  cBoxCounter++;
  ReactDOM.render(
    <Board />,
    document.getElementById('root')
  );
}

function toIncorrect(letter){
  if (incBox.includes(letter)){
    alert('You guessed this letter already');
    return;
  }
  incBox[incBoxCounter] = letter;
  incBoxCounter++;
  ReactDOM.render(
    <Board />,
    document.getElementById('root')
  );
  if (incBoxCounter > 6) {
    alert('Game over the word was: ' + chosenWord);
    window.location.reload();
  }
}

function drawMan(letter){
  if (incBox.includes(letter)){
    return;
  }
  manCounter++;
  ReactDOM.render(
    <Board />,
    document.getElementById('root')
  );
}

class LHS extends React.Component{
  render() {
    return(
      <div class = "LHS" id="LHS">
        <WordField />
        <DrawingSpace />
        <GuessedBoxContainer />
      </div>
    );
  }
}

class RHS extends React.Component{
  render() {
    return(
      <div class = "RHS">
        <WordBank />
      </div>
    );
  }
}

class WordField extends React.Component{
  render() {
    return(
      <div class="WF">
        <p class="GuessField">{display}</p>
      </div>
    )
  }
}

class LetterBox extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    for (var i = 0; i < wordlength; i++){
      if ((this.props.letter) == chosenWord[i].toUpperCase()) {
        updateDisplay(this.props.letter);
        toCorrect(this.props.letter);
        return;
      }
      else{
        continue;
      }
    }
    drawMan(this.props.letter);
    toIncorrect(this.props.letter);
    return;
  }
  render() {
    return(
      <div class="LetterBox" onClick={this.handleClick}>
        <p> {this.props.letter} </p>
      </div>
    );
  }
}

class WordBank extends React.Component{
  myClick() {
    alert("Click the letters to guess. You get 7 attempts!");
  }
  render() {
    return(
      <div>
        <div class="WordBankTitle">
          <p class="headertext">
            Letter Bank:
          </p>
        </div>
        <div class="LetterBankContainer">
          <LetterBox letter='A' id="A"/>
          <LetterBox letter='B' id="B"/>
          <LetterBox letter='C' id="C"/>
          <LetterBox letter='D' id="D"/>
          <LetterBox letter='E' id="E"/>
          <LetterBox letter='F' id="F"/>
          <LetterBox letter='G' id="G"/>
          <LetterBox letter='H' id="H"/>
          <LetterBox letter='I' id="I"/>
          <LetterBox letter='J' id="J"/>
          <LetterBox letter='K' id="K"/>
          <LetterBox letter='L' id="L"/>
          <LetterBox letter='M' id="M"/>
          <LetterBox letter='N' id="N"/>
          <LetterBox letter='O' id="O"/>
          <LetterBox letter='P' id="P"/>
          <LetterBox letter='Q' id="Q"/>
          <LetterBox letter='R' id="R"/>
          <LetterBox letter='S' id="S"/>
          <LetterBox letter='T' id="T"/>
          <LetterBox letter='U' id="U"/>
          <LetterBox letter='V' id="V"/>
          <LetterBox letter='W' id="W"/>
          <LetterBox letter='X' id="X"/>
          <LetterBox letter='Y' id="Y"/>
          <LetterBox letter='Z' id="Z"/>
        </div>
        <p class="WordBankInfoBox" onClick={this.myClick}>
            Rules
        </p>
      </div>
    );
  }
}

class GuessedBoxContainer extends React.Component{
  render() {
    return(
      <div class="GuessBoxContainer" id="GBContainer">
        <GuessedBox value="Incorrect" code="inc" />
        <GuessedBox value="Correct" code="c" />
      </div>
    );
  }
}

class GuessedBox extends React.Component{
  render() {
    var Choice = chooseDisplay(this.props.code);
    return(
      <div class="GuessBox">
          <p class="GBText">
            {this.props.value} Letters:
          </p>
          <div class="LetterStorage">
            {Choice}
          </div>
      </div>
    );
  }
}

class DrawingSpace extends React.Component{
  render() {
    return(
      <div class="DS">
        <div class="ManDrawing">
          <p>
            {man[manCounter]}
          </p>
        </div>
      </div>
    );
  }
}

class Board extends React.Component{
  render() {
    return(
      <div>
        <LHS />
        <RHS />
      </div>
    );
  }
}

class Options extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    alert(this.props.difficulty+' difficulty words generated');
    if(this.props.difficulty == "Easy"){
      words = ['Hot', 'Hit', 'Banana','Egg', 'Ball', 'Happy'];
    }
    else if(this.props.difficulty == "Medium"){
      words = ['Money', 'David', 'Park','About','Suck','Flame'];
    }
    else if(this.props.difficulty == "Hard"){
      words = ['Absurd','Syndrome','Subway','Gossip','Galaxy','Funny'];
    }
    random = Math.floor(Math.random() * 6);
    chosenWord = words[random];
    wordlength = chosenWord.length;
    display = []
    for (var index = 0; index < wordlength; index++){
      display[index] = '_ ';
    }
    ReactDOM.render(
      <Board />,
      document.getElementById('root')
    );
  }
  render() {
    return(
      <div class="OptionMenu" onClick={this.handleClick}>
        {this.props.difficulty} Mode
      </div>
    );
  }
}

class StartMenu extends React.Component{
  render() {
    return(
      <div class="StartMenu">
        <Options difficulty="Easy" />
        <Options difficulty="Medium" />
        <Options difficulty="Hard" />
      </div>
    );
  }
}

class Header extends React.Component{
  render() {
    return(
      <div class="GameTitle">
        HANGMAN Challenge
      </div>
    );
  }
}

class Signature extends React.Component{
  render() {
    return(
      <div class="Signature">
        Developed By: Andrew Benner
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <Header />
    <StartMenu />
    <Signature />
  </div>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
