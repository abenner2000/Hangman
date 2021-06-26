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

function updateDisplay(letter) {
  var counter = 0;
  for (var index = 0; index < wordlength; index++){
    if (display[index].toUpperCase() != display[index].toLowerCase()){
      counter++;
      continue;
    }
    else if (letter == chosenWord[index].toUpperCase()){
      display[index] = (letter)+' ';
    }
    else{
      display[index] = '_ ';
    }
  }
  ReactDOM.render(
    <WordField />,
    document.getElementById('WordField')
  );
}

function toCorrect(letter){
  ReactDOM.render(
    <GuessedBoxContainer />,
    document.getElementById('GBContainer')
  );
}

function toIncorrect(letter){
  ReactDOM.render(
    <GuessedBoxContainer />,
    document.getElementById('GBContainer')
  );
}

class LHS extends React.Component{
  render() {
    return(
      <div class = "LHS">
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
      <div class="WF" id="WordField">
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
    alert('Not in the word');
    // Function used to update drawing space of hangman
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
  render() {
    return(
      <div>
        <div class="WordBankTitle">
          <p class="headertext">
            Letter Bank:
          </p>
        </div>
        <div class="LetterBankContainer">
          <LetterBox letter='A'/>
          <LetterBox letter='B'/>
          <LetterBox letter='C'/>
          <LetterBox letter='D'/>
          <LetterBox letter='E'/>
          <LetterBox letter='F'/>
          <LetterBox letter='G'/>
          <LetterBox letter='H'/>
          <LetterBox letter='I'/>
          <LetterBox letter='J'/>
          <LetterBox letter='K'/>
          <LetterBox letter='L'/>
          <LetterBox letter='M'/>
          <LetterBox letter='N'/>
          <LetterBox letter='O'/>
          <LetterBox letter='P'/>
          <LetterBox letter='Q'/>
          <LetterBox letter='R'/>
          <LetterBox letter='S'/>
          <LetterBox letter='T'/>
          <LetterBox letter='U'/>
          <LetterBox letter='V'/>
          <LetterBox letter='W'/>
          <LetterBox letter='X'/>
          <LetterBox letter='Y'/>
          <LetterBox letter='Z'/>
        </div>
      </div>
    );
  }
}

class GuessedBoxContainer extends React.Component{
  render() {
    return(
      <div class="GuessBoxContainer" id="GBContainer">
        <GuessedBox value="Incorrect">
          <div id="incorrect">
          </div>
        </GuessedBox>
        <GuessedBox value="Correct">
          <div id="correct">
          </div>
        </GuessedBox>
      </div>
    );
  }
}

class GuessedBox extends React.Component{
  render() {
    return(
      <div class="GuessBox">
          <p class="GBText">
            {this.props.value} Letters:
          </p>
          <div id="WriteSpace">
          </div>
      </div>
    );
  }
}

class DrawingSpace extends React.Component{
  render() {
    return(
      <div class="DS">
        <p class="ManDrawing"> | | </p>
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

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
