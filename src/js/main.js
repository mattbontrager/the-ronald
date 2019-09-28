import '../css/screen.css';

const quoteElem = document.querySelector('.quote');

const f = async () => {
	try {
		const endpoint = new URL('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
		const res = await fetch(endpoint);
		const quotes = await res.json();
		return quotes.length ? quotes[0] : null;
	} catch (err) {
		console.error('fetch error: ', err);
		throw new Error(err);
	}
};

const init = async () => {
	try {
		const quote = await f();
		quoteElem.textContent = `${quote} – Ron Swanson`;
	} catch (err) {
		console.error('💩‼️ failed to get quote: ', err);
		quoteElem.textContent = '😩 The Ronald is sad.';
		return err;
	}
};

if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
	init();
} else {
	document.addEventListener('DOMContentLoaded', init);
}
