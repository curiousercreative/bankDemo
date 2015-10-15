var App = React.createClass({
    getInitialState: function () {
        return {accounts: accounts, activePageId: defaultActivePageId};
    },
    render: function () {
        return (
            React.createElement('div', null,
                [
                    React.createElement(AccountOverview, {id: "accounts", accounts: this.state.accounts, activePageId: this.state.activePageId}),
                    this.state.accounts.map(function (account, key) {
                        return (
                            React.createElement(Account, {
                                key: key,
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
    render: function () {
        return (
            React.createElement('div', {className: 'page'+this.isActivePage(), id: this.props.name},
                [
                    React.createElement('h1', null, this.props.name),
                    React.createElement('div', null, this.props.balance),
                    React.createElement(TransactionLedger, {balance: this.props.balance, transactions: this.props.transactions}),
                    React.createElement(TranasctionForm)
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
    render: function () {
        return (
            React.createElement('form', null,
                [
                    React.createElement('label', null, 'Transaction type'),
                    React.createElement('select', null,
                        [
                            React.createElement('option', {selected: true, disabled: true}, 'Select'),
                            React.createElement('option', {value: 'deposit'}, 'Deposit'),
                            React.createElement('option', {value: 'withdrawal'}, 'Withdrawal')
                        ]
                    ),
                    React.createElement('label', null, 'Transaction amount'),
                    React.createElement('input', {placeholder: '10.00', type: 'number'}),
                    React.createElement('label', null, 'Transaction description'),
                    React.createElement('input', {placeholder: 'Enter description here'}, this.props.description)
                ]
            )
        )
    }
});