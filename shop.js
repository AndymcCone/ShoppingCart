let cart = []; //contains {id: product_id, amount: amount_of_those}

function findProduct(id) {
	for (let product of products) {
		if (product.id == id) {
			return product;
		}
	}
}

function updateCart() {
	let price = 0; //total price counter
	let text = "<table border='1'><tr><th>Product<th>Price<th>Amount<th>Remove";
	for (let p of cart) {
		let product = findProduct(p.id);
		text += `<tr><td>${product.name}<td>${product.price / 100}`;
		text += `<td>${p.amount}`;
		text += `<td><input type='button' value='Remove' onclick='remove("${p.id}")'>`;
		price += product.price * p.amount;
	}
	text += '</table>';
	document.getElementById('cart').innerHTML = text;
	document.getElementById('price').innerHTML = price / 100;
}

function buy(id) {
	let found = false;
	for (let p of cart) {
		if (p.id == id) {
			p.amount++; //increase amount by 1 if product is found in cart.
			found = true;
		}
	}
	if (!found) {
		// if not found, add to cart
		cart.push({ id: id, amount: 1 });
	}
	updateCart();
}

function remove(id) {
	for (let p of cart) {
		if (p.id == id && p.amount > 1) {
			p.amount -= 1;
		} else if (p.id == id && p.amount == 1) {
			cart = cart.filter((x) => x !== p);
		}
		updateCart();
	}
}

function buildInventoryList() {
	let text = "<table border = '1'><tr><th>Product<th>Price<th>Add to cart";
	for (let product of products) {
		text +=
			`<tr><td>${product.name}` +
			`<td>${product.price / 100} euros ` +
			`<td style="text-align: center;"><input type='button' value='Add'` +
			`onclick='buy("${product.id}")'>`;
	}
	text += '</table>';
	document.getElementById('inventory').innerHTML = text;
}

buildInventoryList();
