var View = React.createClass({
    render: function () {
        return React.createElement('div', {id: 'content'});
    }
});

var Page = React.createClass({
    render: function () {
        return React.createElement('div', {className: 'view', id: this.props.id});
    }
});

var AccountBalance;

var TransactionLedger;
var TranasctionForm;
var Transaction;