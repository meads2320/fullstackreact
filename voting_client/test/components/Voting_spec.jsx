import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';
import {List} from 'immutable';

describe('Voting', () => {

    it('renders a pair of buttons', () => {
        const component = renderIntoDocument(
            <Voting pair={["South Florida", "Houston"]} />
        );

        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].textContent).to.equal('South Florida');
        expect(buttons[1].textContent).to.equal('Houston');

    });

    it('invokes callback when a button is clicked', () => {
        let votedWith;
        const vote = (entry) => votedWith = entry;

        const component = renderIntoDocument(
            <Voting pair={["South Florida", "Houston"]}
                    vote={vote}/>
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        Simulate.click(buttons[0]);

        expect(votedWith).to.equal('South Florida');
    });

    it('disables buttons when user has voted', () => {
        const component = renderIntoDocument(
        <Voting pair={["South Florida", "Houston"]}
                hasVoted="South Florida" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons.length).to.equal(2);
        expect(buttons[0].hasAttribute('disabled')).to.equal(true);
        expect(buttons[1].hasAttribute('disabled')).to.equal(true);
    });

    it('adds label to the voted entry', () => {
        const component = renderIntoDocument(
            <Voting pair={["South Florida", "Houston"]}
                hasVoted="South Florida" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

        expect(buttons[0].textContent).to.contain('Voted');
    });

    it('renders just the winner when there is one', () => {
        const component = renderIntoDocument(
        <Voting winner="South Florida" />
        );
        const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
        expect(buttons.length).to.equal(0);

        const winner = ReactDOM.findDOMNode(component.refs.winner);
        expect(winner).to.be.ok;
        expect(winner.textContent).to.contain('South Florida');
    });

    it('renders as a pure component', () => {
        const pair = ["South Florida", "Houston"];
        const container = document.createElement('div');
        let component = ReactDOM.render(
        <Voting pair={pair} />,
        container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('South Florida');

        pair[0] = 'UCF';
        component = ReactDOM.render(
        <Voting pair={pair} />,
        container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('South Florida');
    });

    it('does update DOM when prop changes', () => {
        const pair = List.of("South Florida", "Houston");
        const container = document.createElement('div');
        let component = ReactDOM.render(
        <Voting pair={pair} />,
        container
        );

        let firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('South Florida');

        const newPair = pair.set(0, 'UCF');
        component = ReactDOM.render(
        <Voting pair={newPair} />,
        container
        );
        firstButton = scryRenderedDOMComponentsWithTag(component, 'button')[0];
        expect(firstButton.textContent).to.equal('UCF');
  });

});