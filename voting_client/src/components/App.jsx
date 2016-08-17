import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('South Florida', 'Houston');
const tally = Map({'South Florida': 5, 'Houston': 4});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally
    });
  }
});