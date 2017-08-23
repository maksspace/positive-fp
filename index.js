const compose = (...fns) =>
	fns.reduce((f, g) => (...args) => f(g(...args)));
    
const makeObjectFieldMapper = f => item => f(item);
const sum = values => values.reduce((total, v) => v + total, 0);

const mapCartPrices = makeObjectFieldMapper(cart => cart.map(item => item.price));
const makeCurrencyConverter = name => converter => ({
	name,
    convert: v => converter(v)
});

// можно с оптимизировать создав функцию создающую этот мссив из настроек
const currencyConvertes = [
  makeCurrencyConverter('rubles')(v => v * 0.17),
  makeCurrencyConverter('euros')(v => v * 0.85),
  makeCurrencyConverter('dollars')(v => v * 1),
  makeCurrencyConverter('pounds')(v => v * 0.78),
  makeCurrencyConverter('yens')(v => v * 1.09),
];

const selectedCart = [
  { price: 20 },
  { price: 45 },
  { price: 67 },
  { price: 1305 }
];

const totalCartBuilder = converters => v => 
	 converters.reduce(total, cv => {...total, [cv.currency]: cv.convert(v)}, {});

const getAbstractTotal = compose(totalCartBuilder, sum, mapCartPrices);

console.log('total euro:', getAbstractTotal(selectedCart)(currencyConvertes))


