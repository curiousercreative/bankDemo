/*
$(window).on('hashchange', function (e) {
    
});
*/

var accounts = [
    {
        name: 'checking',
        balance: 4223,
        transactions: [
            {
                date: 1444859294893,
                description: 'wings and beer',
                amount: '-18.85'
            },
            {
                date: 1445859294893,
                description: 'paycheck',
                amount: '2118.85'
            },
            {
                date: 1448859294893,
                description: 'movie ticket',
                amount: '-14'
            },
            {
                date: 1444859274893,
                description: 'karaoke',
                amount: '-12'
            }
        ]
    },
    {
        name: 'savings',
        balance: 15244,
        transactions: [
            {
                date: 1444859294893,
                description: 'wings and beer',
                amount: '-18.85'
            },
            {
                date: 1445859294893,
                description: 'paycheck',
                amount: '2118.85'
            },
            {
                date: 1448859294893,
                description: 'movie ticket',
                amount: '-14'
            },
            {
                date: 1444859274893,
                description: 'karaoke',
                amount: '-12'
            }
        ]
    }
];

window.onload = function () {
    ReactDOM.render(
        React.createElement(App),
        document.getElementById('content')
    );   
}