import React, { Component } from 'react';
import s from './game-page.module.css';
import WordList from '../word-list/word-list';
import Preloader from '../preloader/preloader';
import GameModel from '../game-model/game-model';

export default class GamePage extends Component {
  constructor(props) {
    super(props);
    this.gameModel = this.props.gameModel;
    this.level = this.props.level;
    this.correctAnswers = [];
    this.incorrectAnswers = [];
    // this.soundSuccess = '../assets/audio/success.mp3';
    // this.soundFailure = '../assets/audio/failure.mp3';
    this.state = {
      isQuestion: true,
      currentWord: this.props.currentWord,
      answers: this.props.answers,
      isCorrectAnswer: true,
      answerId: null,
      result: null,
      preloader: true,
      soundOn: true,
    }
  }

  componentDidMount() {
    this.gameModel = new GameModel(this.level);
    this.gameModel.init().then((res) => {
      let [currentWord, answers] = res;
      this.setState({currentWord, answers, preloader: false});
      this.playWord();
    })
  }

  pass = () => {
    this.incorrectAnswers.push(this.state.currentWord);
    this.setState({isQuestion: false, isCorrectAnswer: false, answerId: undefined});
  }

  getAnswer = (event) => {    
    const { isQuestion, currentWord, soundOn } = this.state;

    if (!isQuestion) return;

    const answer = event.target.dataset.correct;
    if (answer === 'true') {
      this.correctAnswers.push(currentWord);      
    } else {
      this.incorrectAnswers.push(currentWord);
    }

    const id = event.target.id;

    this.setState({ isQuestion: false, isCorrectAnswer: answer, answerId: id });
  }

  nextWord = () => {
    this.setState({preloader: true})
    const newPageData = this.gameModel.nextTurn();
    if(!newPageData) {
      this.props.showStatistics(this.correctAnswers, this.incorrectAnswers);
      return;
    }

    newPageData.then(([currentWord, answers]) => {
      // const [currentWord, answers] = newPageData;
      this.setState({ isQuestion: true, currentWord, answers, preloader:false });
          
      this.playWord();  
      // this.gameModel.loadAnswerWords(5);
    }); 
  }

  playWord = () => {
    const { audio } = this.state.currentWord;
    this.audio = new Audio(`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${audio}`);
    this.audio.play();
  }

  switchSound = () => {
    this.setState(({soundOn: !this.state.soundOn}))
  }

  // playSound = (sound) => {    
  //   const audio = new Audio(sound);
  //   audio.play();
  // }

  render() {
    const { preloader } = this.state;
    
    if (!preloader) {
      const {isQuestion, answers, answerId, isCorrectAnswer, currentWord : {image, wordTranslate}, soundOn} = this.state;

      return (
        <div className = {s.page}>
          <button className={soundOn ? s.sound : `${s.sound} ${s.soundOff}`} onClick={this.switchSound} /*data-audio={``}*/ />
          <div className={s.gameWrapper}> 
            <div className={s.questionBoard}>
              <img className={isQuestion ? s.hidden : s.wordImg} src={`https://raw.githubusercontent.com/yrevtovich/rslang-data/master/${image}`} alt='word illustration'/>
              
              <div className={s.wordData}>
                <button className={isQuestion ? `${s.wordSound} ${s.wordSoundQuestion}` : s.wordSound} onClick={this.playWord}/>
                <p className={isQuestion ? s.hidden : s.translation}>{wordTranslate}</p>
              </div>
            </div>
  
            <WordList words={answers} callback={this.getAnswer} isQuestion={isQuestion} answer={isCorrectAnswer} answerId={answerId} /> 
            
            <button className={isQuestion ? s.pass : s.hidden} onClick={this.pass}>Pass</button>
            <button className={isQuestion ? s.hidden : s.next} onClick={this.nextWord}>Next word</button>
          </div>        
        </div>
      )
    }

    return <Preloader />
  }
  
}
