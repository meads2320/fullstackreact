import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
   mixins: [PureRenderMixin],
  render: function() {
    return <h3 className="winner">
      Projected Winner of the AAC is {this.props.winner}!
    </h3>;
  }
})