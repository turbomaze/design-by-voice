const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sizeInPx: 24, pSizeInPx: 16 };

    const SpeechRecognition = webkitSpeechRecognition;
    const SpeechGrammarList = webkitSpeechGrammarList;
    const SpeechRecognitionEvent = webkitSpeechRecognitionEvent;
    const colors = [
      'make',
      'this',
      'header',
      'paragraph',
      'even',
      'bigger',
      'smaller',
      'a',
      'little',
    ];
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

      const bigger = color.endsWith('bigger');
      const multiplier = bigger ? 1.5 : 1 / 1.5;
      if (color.indexOf('paragraph') === -1) {
        this.setState({ pSizeInPx: this.state.pSizeInPx * multiplier });
      } else {
        this.setState({ sizeInPx: this.state.sizeInPx * multiplier });
      }
    };
    recognition.start();
  }

  render() {
    return (
      <div>
        <h1
          style={{
            transition: '0.25s',
            transitionTimingFunction: 'ease-in',
            fontSize: this.state.sizeInPx + 'px',
          }}>
          Header 1
        </h1>
        <p style={{ fontSize: this.state.pSizeInPx + 'px' }}>This is Paragraph 1</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
