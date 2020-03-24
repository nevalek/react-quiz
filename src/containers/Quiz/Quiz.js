import React, {Component} from 'react';
import './Quiz.css';
import QService from '../../service/questions-service';
import Question from "../../components/Question";
import Loader from "../../components/Loader";
import Level from "../../components/Level";
import RightAnswers from "../../components/RightAnswers";


export default class extends Component {
    state = {
        good: 0,
        error: 0,
        question: null,
        answers: [],
        answer: null,
        loading: true,
        rightAnswer: null,
        level: 4,
        rightAnswers: []
    };
    test = new QService();

    shuffle(arr) {
        let j, temp;
        for (let i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }

    outAnswers = (q, a) => {
        const answers = this.state.rightAnswers;
      if(answers.length === 5){
          answers.pop();
          answers.unshift({'q':q, 'a': a})
      }else {
          answers.unshift({'q':q, 'a': a})
      }
      this.setState({
          rightAnswers: answers
      });
    };

    componentDidMount() {
        this.newQuestion();
    }

    newQuestion =()=>{
        this.test
            .getQuestion(this.state.level)
            .then(data => {
                this.setState({
                    question: data.question,
                    rightAnswer: data.answers[0],
                    answers: this.shuffle(data.answers),
                    answer: null,
                    loading: false
                })
            });
    };

    onAnswerClickHandler = index =>{
        const rightIndex = this.state.answers.findIndex((item)=> {
            return item === this.state.rightAnswer;
        });
        const timeout = window.setInterval(()=>{
            this.setState({
                loading: true
            });
            this.newQuestion();
            this.outAnswers(this.state.question, this.state.rightAnswer)
            window.clearInterval(timeout);
        }, 1500);
        if(index === rightIndex){
            this.setState({
                answer: {[index]: 'good'},
                good: this.state.good + 1,
            });
        }else {
            this.setState({
                answer: {[index]: 'error'},
                error: this.state.error + 1,
            });
        }

    };

    onLevels = lvl => {
        this.setState({
            level: lvl,
            loading: true
        }, ()=>{
            this.newQuestion();
        });

    };

    render() {
        return (
            <React.Fragment>

                <Level
                    onLevels={this.onLevels}
                />
                <div className="quiz">
                {
                    this.state.loading
                    ? <Loader/>
                    : <Question
                            text={this.state.question}
                            answers={this.state.answers}
                            onAnswerClick={this.onAnswerClickHandler}
                            answer={this.state.answer}
                            rightAnswer={this.state.rightAnswer}
                        />
                }
                </div>
                {
                    this.state.rightAnswers.length === 0
                        ? null
                        :
                        <RightAnswers
                            answers={this.state.rightAnswers}
                        />


                }
            </React.Fragment>
        )
    }
}