var App = React.createClass({
    getInitialState: function () {
        return {accounts: accounts, activePageId: defaultActivePageId};
    },
    render: function () {
        return (
            React.createElement('div', null,
                [
                    React.createElement(AccountOverview, {id: "accounts", accounts: this.props.accounts, activePageId: this.props.activePageId}),
                    this.props.accounts.map(function (account, key) {
                        return (
                            React.createElement(Account, {
                                key: key,
                                id: account.name,
                                name: account.name,
                                balance: account.balance,
                                transactions: account.transactions
                            })
                        )
                    })
                ]
            )
        );
    }
});

var AccountOverview = React.createClass({
    isActivePage: function () {
        return store.getState().activePageId == this.props.id ? ' active' : '';
    },
    render: function () {
        return (
            React.createElement('div', {className: 'page'+this.isActivePage(), id: this.props.id},
                React.createElement('table', null,
                    [
                        React.createElement('thead', null,
                            [
                                React.createElement('th', null, 'Account'),
                                React.createElement('th', null, 'Balance')
                            ]
                        ),
                        React.createElement('tbody', null,
                            this.props.accounts.map(function (account, i) {
                                return React.createElement('tr', {key: i},
                                    [
                                        React.createElement('td', null,
                                            React.createElement('a', {href: "#/"+account.name}, account.name)
                                        ),
                                        React.createElement('td', null, account.balance)
                                    ]
                                );
                            })
                        )
                    ]
                )
            )
        );
    }
});

var Account = React.createClass({
    isActivePage: function () {
        return store.getState().activePageId == this.props.id ? ' active' : '';
    },
    handleTransactionSubmit: function (transaction) {
    // calculate balance
        transaction.balance = parseFloat(this.props.balance) + parseFloat(transaction.amount);
    
    // update state
        store.dispatch(addTransaction(transaction, transaction.balance, this.props.name));
    },
    render: function () {
        return (
            React.createElement('div', {className: 'page'+this.isActivePage(), id: this.props.name},
                [
                    React.createElement('h1', null, this.props.name),
                    React.createElement('div', null, this.props.balance),
                    React.createElement(TranasctionForm, {onTransactionSubmit: this.handleTransactionSubmit}),
                    React.createElement(TransactionLedger, {balance: this.props.balance, transactions: this.props.transactions})
                ]
            )
        );
    }
});

var TransactionLedger = React.createClass({
    render: function () {
        return (
            React.createElement('table', {id: 'ledger'},
                [
                    React.createElement('thead', null,
                        React.createElement('tr', null,
                            [
                                React.createElement('th', null, 'Date'),
                                React.createElement('th', null, 'Description'),
                                React.createElement('th', null, 'Amount'),
                                React.createElement('th', null, 'Balance')
                            ]
                        )
                    ),
                    React.createElement('tbody', null,
                        this.props.transactions.map(function (transaction, key) {
                            return (
                                React.createElement(Transaction, {
                                    key: key,
                                    date: transaction.date,
                                    amount: transaction.amount,
                                    description: transaction.description,
                                    balance: transaction.balance
                                })
                            );
                        })
                    )
                ]
            )
        );
    }
});

var Transaction = React.createClass({
    render: function () {
        return (
            React.createElement('tr', {className: 'transaction'},
                [
                    React.createElement('td', null, this.props.date),
                    React.createElement('td', null, this.props.description),
                    React.createElement('td', null, this.props.amount),
                    React.createElement('td', null, this.props.balance)
                ]
            )   
        )
    }
});

var TranasctionForm = React.createClass({
    timestampToDate: function (timestamp) {
        var date = new Date(timestamp);
        
        return date.toDateString
    },
    submitHandler: function (e) {
        e.preventDefault();
        
    // prep transaction object
        var transaction = {
            amount: $(this.refs.type).val() + $(this.refs.amount).val(),
            description: $(this.refs.description).val(),
            date: Date.now()
        }

    // pass off to parent
        this.props.onTransactionSubmit(transaction);
        
    // reset form
        e.target.reset();
    },
    render: function () {
        return (
            React.createElement('form', {onSubmit: this.submitHandler},
                [
                    React.createElement('label', null, 'Transaction type'),
                    React.createElement('select', {ref: 'type'},
                        [
                            React.createElement('option', {value: ''}, 'Deposit'),
                            React.createElement('option', {value: '-'}, 'Withdrawal')
                        ]
                    ),
                    React.createElement('label', null, 'Transaction amount'),
                    React.createElement('input', {placeholder: '10.00', type: 'number', ref: 'amount'}),
                    React.createElement('label', null, 'Transaction description'),
                    React.createElement('input', {placeholder: 'Enter description here', ref: 'description'}, this.props.description),
                    React.createElement('input', {type: 'submit', value: 'submit'})
                ]
            )
        )
    }
});