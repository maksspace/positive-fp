const compose = (...fns) =>
	fns.reduce((f, g) => (...args) => f(g(...args)));
    
const makeObjectFieldMapper = f => item => f(item);
const sum = values => values.reduce((total, v) => v + total, 0);

const mapCartPrices = makeObjectFieldMapper(cart => cart.map(item => item.price));
const makeCurrencyConverter = currency => k => ({
	currency,
    convert: v => v * k
});

const currenciesRates = [
	{ name: 'rubles',  rate: 59.06  },
 	{ name: 'euros',   rate: 0.85   },
 	{ name: 'dollars', rate: 1      },
 	{ name: 'pounds',  rate: 0.78   },
 	{ name: 'yens',    rate: 109.07 }
];

const selectedCart = [
	{ price: 20 },
	{ price: 45 },
	{ price: 67 },
	{ price: 1305 }
];

const currencyConvertes = currenciesRates.map(
	cr => makeCurrencyConverter(cr.name)(cr.rate)
);

const totalCartBuilder = converters => v => 
	converters.reduce((total, cv) => ({
		...total,
        	[cv.currency]: cv.convert(v)	
	}), 
{});
	 
const getAbstractTotal = compose(totalCartBuilder(currencyConvertes), sum, mapCartPrices);
console.log('total:', getAbstractTotal(selectedCart))

