import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// class Form extends Component {
//   state = {
//     code: ''
//   };

//   handleChange = newCode => {
//     // console.log(code);

//     if (newCode !== this.state.code) {
//       this.setState({
//         code: newCode
//       });
//     }
//   };

//   render() {
//     console.log('/** ----------------------------');
//     console.log(this.state);
//     console.log('------------------------------ */');

//     return (
//       <div>
//         <App render={code => this.handleChange(code)} />
//       </div>
//     );
//   }
// }

// export default Form;

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Form />, document.getElementById('root'));
