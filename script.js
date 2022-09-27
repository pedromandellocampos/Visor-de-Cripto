const btc = document.querySelector(".btc");
const eth = document.querySelector(".eth");
const ltc = document.querySelector(".ltc");

const higherPriceDiv = document.querySelector(".higher-price");
const higherPrice = document.querySelector(".higher-price p");
const volDiv = document.querySelector(".vol");
const vol = document.querySelector(".vol p");
const highestOfferPriceDiv = document.querySelector(".highest-offer-price");
const highestOfferPrice = document.querySelector(".highest-offer-price p");

const ImageCircle = document.querySelector(".container-coin-img");
const imagemCripto = document.querySelector(".container-coin-img img");

const criptoName = document.querySelector("h1");

const listItens = document.querySelectorAll("li");

let volPrice = 0;
let highPricePrice = 0;
let numberHighestOfferPrice = 0;

const precos = [volPrice, highPricePrice, numberHighestOfferPrice];
let valorAtual = btc;

let atualizarPrecos;

//remove the class selected
function removeColored(arrayOfItens) {
	for (let item of arrayOfItens) {
		item.classList.remove(`ETH`);
		item.classList.remove(`BTC`);
		item.classList.remove(`LTC`);
	}
}

function removeSelected() {
	ImageCircle.classList.remove(`ETH`);
	ImageCircle.classList.remove(`BTC`);
	ImageCircle.classList.remove(`LTC`);
}

function printName(moedaEscolhida) {
	criptoName.textContent = moedaEscolhida.dataset.name;
}

listItens.forEach((elemento) => {
	elemento.addEventListener("click", () => {
		generateFirst(elemento);
		changeImage(elemento);
	});
});

function changeImage(elemento) {
	console.log(elemento);
	removeSelected();
	imagemCripto.src = `./assets/${elemento.dataset.coin}.svg`;
	ImageCircle.classList.add(`${elemento.dataset.coin}`);
}

function piscarBackground(numberVolume, numberhighPrice, numberHighestOffer) {
	for (let preco of precos) {
		if (numberHighestOfferPrice < numberHighestOffer) {
			highestOfferPriceDiv.style.backgroundColor = "#18661186";
		} else if (numberHighestOfferPrice > numberHighestOffer) {
			highestOfferPriceDiv.style.backgroundColor = "#c2030386";
		}

		console.log(volPrice);
		if (volPrice < numberVolume) {
			volDiv.style.backgroundColor = "#18661186";
		} else if (volPrice > numberVolume) {
			volDiv.style.backgroundColor = "#c2030386";
		}

		if (highPricePrice < numberhighPrice) {
			higherPriceDiv.style.backgroundColor = "#18661186";
		} else if (highPricePrice > numberhighPrice) {
			higherPriceDiv.style.backgroundColor = "#c2030386";
		}
	}

	console.log(numberHighestOfferPrice);
	console.log(numberHighestOffer);
	console.log(numberHighestOfferPrice < numberHighestOffer);

	volPrice = numberVolume;
	highPricePrice = numberhighPrice;
	numberHighestOfferPrice = numberHighestOffer;

	setTimeout(() => {
		volDiv.style.background = "white";
		higherPriceDiv.style.background = "white";
		highestOfferPriceDiv.style.background = "white";
	}, 500);
}

function generateFirst(item) {
	removeColored(listItens);

	printName(item);
	//clearInterval(atualizarPrecos);
	valorAtual = item;

	item.classList.add(`${item.dataset.coin}`);

	const promisseRecieved = fetch(
		`https://www.mercadobitcoin.net/api/${item.dataset.coin}/ticker/`
	);

	promisseRecieved.then((package) => {
		packageReceived = package.json();

		packageReceived.then((body) => {
			const { vol: volumeDiario, high, buy } = body.ticker;
			vol.textContent = `R$  ${Number(
				Number(volumeDiario).toFixed(2)
			).toLocaleString("de-DE", { minimumFractionDigits: 2 })}`;
			console.log(Number(high).toFixed(2));
			higherPrice.textContent = `R$ ${Number(
				Number(high).toFixed(2)
			).toLocaleString("de-DE", { minimumFractionDigits: 2 })}`;
			highestOfferPrice.textContent = `R$ ${Number(
				Number(buy).toFixed(2)
			).toLocaleString("de-DE", { minimumFractionDigits: 2 })}`;
			piscarBackground(
				Number(Number(volumeDiario).toFixed(2)),
				Number(Number(high).toFixed(2)),
				Number(Number(buy).toFixed(2))
			);
		});
	});
}

changeImage(btc);
atualizarPrecos = setInterval(() => {
	generateFirst(valorAtual);
}, 2000);
