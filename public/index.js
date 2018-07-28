const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sizeInPx: 16 };

    const SpeechRecognition = webkitSpeechRecognition;
    const SpeechGrammarList = webkitSpeechGrammarList;
    const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;
    const colors = ['make', 'this', 'header', 'even', 'bigger', 'smaller', 'a', 'little'];
    const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;';
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = true;
    recognition.maxAlternatives = 1;
    recognition.onresult = event => {
      const last = event.results.length - 1;
      const color = event.results[last][0].transcript;
      console.log('Color: ' + color + '\nConfidence: ' + event.results[0][0].confidence);

      if (color.endsWith('bigger')) {
        this.setState({ sizeInPx: this.state.sizeInPx * 1.5 });
      } else {
        this.setState({ sizeInPx: this.state.sizeInPx / 1.5 });
      }
    };
    recognition.start();
  }

  render() {
    return (
      <h1
        style={{
          transition: '0.25s',
          transitionTimingFunction: 'ease-in',
          fontSize: this.state.sizeInPx + 'px',
        }}>
        hello
      </h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
