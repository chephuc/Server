const express = require('express');
const mysqldb = require('./db');
const connection = mysqldb.connection();

const cors = require('cors');
const bodyParser = require('body-parser');

var corsOptions = {
	origin: 'http://localhost:4200',
	//domain được phép gọi request mà server chấp nhận (vd: request đến từ http://localhost:4200  được server cho phép), 
	//giả sử node server là http://localhost:8000
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app = express();

app.use(cors(corsOptions))

app.use(bodyParser.json());

app.listen(8000, () => {
	console.log('Server started!');
});

// const getShoesList = async (seq, res) => {
//     try {
//         var sql = `select idShoes, ShoesName, ShoesColor, ShoesImg from sneakerfightclub.shoes`;

//         connection.query(sql, async (err, rows) => {
//             if (!err) {
//                 res.status(200).json(rows);
//             } else {
//                 console.log('Error while performing Query.');
//             }
//         });
//     } catch (e) {
//         res.json(e);
//     }
// }

var productlist = [
	{ id: '1', proimg: 'assets/images/h1.PNG', name: 'AIR JORDAN III', prodes: 'AIR TRAINER 1', price: '90$' },
	{ id: '2', proimg: 'assets/images/h2.PNG', name: 'AIR MAX DELUXE', prodes: 'LIFE OF THE PARTY', price: '190$' },
	{ id: '3', proimg: 'assets/images/h3.PNG', name: 'WMNS AIR JORDAN IV', prodes: 'FIRE RED', price: '290$' },
	{ id: '4', proimg: 'assets/images/h4.PNG', name: 'AIR JORDAN V', prodes: 'BLACK/UNIVERSITY RED', price: '390$' },
	{ id: '5', proimg: 'assets/images/h5.PNG', name: 'AIR FORCE 270 UTILITY', prodes: 'VOLT', price: '290$' },
	{ id: '6', proimg: 'assets/images/h6.PNG', name: 'AIR JORDAN XI', prodes: 'PLATINUM TINT', price: '190$' },
	{ id: '7', proimg: 'assets/images/h7.PNG', name: 'AIR MAX 95 PREMIUM', prodes: 'VOLT', price: '290$' },
	{ id: '8', proimg: 'assets/images/h8.PNG', name: 'WMNS AIR JORDAN I', prodes: 'UTILITY BLACK', price: '90$' },
];

//Get shoes list
app.route('/api/products').get((req, res) => {
	console.log('all products');

	var sql = `select idShoes, ShoesName, ShoesColor, ShoesImg, ShoesPrice from sneaker.shoes`;

	connection.query(sql, (err, rows) => {
		if (!err) {
			res.status(200).json(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});

app.route('/api/products/newreleases').get((req, res) => {
	console.log('all products new releases');

	var sql = `select idShoes, ShoesName, ShoesColor, ShoesImg, ShoesPrice from sneaker.shoes where idtype = 1 limit 8`;

	connection.query(sql, (err, rows) => {
		if (!err) {
			res.status(200).json(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});

app.route('/api/products/bestseller').get((req, res) => {
	console.log('all products bestseller');

	var sql = `select idShoes, ShoesName, ShoesColor, ShoesImg, ShoesPrice from sneaker.shoes where idtype = 2 limit 8`;

	connection.query(sql, (err, rows) => {
		if (!err) {
			res.status(200).json(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
});

app.route('/api/products/:id').get((req, res) => {

	var id = req.params.id;
	console.log(id)

	var sql = `select idShoes, ShoesName, ShoesColor, ShoesImg, ShoesPrice from sneaker.shoes where idShoes = '${id}'`;

	connection.query(sql, (err, data) => {
		if (!err) {
			res.status(200).json(data[0]);
		} else {
			console.log('Error while performing Query.');
		}
	});

	// var product = productlist.find(u => u.id == id);
	// if (product)
	// 	res.send(product)
	// else
	// 	res.send("Not found")
});

//Get category list
app.route('/api/category').get((req, res) => {
	console.log('all category');

	var sql = `select idcategory, CategoryName from sneaker.category`;

	connection.query(sql, (err, rows) => {
		if (!err) {
			res.status(200).json(rows);
		} else {
			console.log('Error while performing Query.');
		}
	});
})

//Get product list by category id
app.route('/api/category/:id').get((req, res) => {

	var id = req.params.id;
	console.log(id)

	var sql = `select idShoes, ShoesName, ShoesColor, ShoesImg, ShoesPrice from sneaker.shoes where idcategory = '${id}'`;

	connection.query(sql, (err, data) => {
		if (!err) {
			res.status(200).json(data);
		} else {
			console.log('Error while performing Query.');
		}
	});
});

var bestseller = [
	{ id: '1', proimg: 'assets/images/img1.jpeg', name: 'AIR FORCE I LOW', prodes: 'Red And While', price: '90$' },
	{ id: '2', proimg: 'assets/images/img2.jpeg', name: 'ULTRA BOOST', prodes: 'Multi Color', price: '180$' },
	{ id: '3', proimg: 'assets/images/img3.jpeg', name: 'AIR MAX 97', prodes: 'Deep Blue', price: '150$' },
	{ id: '4', proimg: 'assets/images/img4.jpeg', name: 'AIR MAX 270', prodes: 'Solar Red', price: '160$' },
	{ id: '5', proimg: 'assets/images/img5.jpeg', name: 'PROPHERE', prodes: 'While And Gray', price: '120$' },
	{ id: '6', proimg: 'assets/images/img6.jpeg', name: 'NMD R1', prodes: 'While And Gray', price: '140$' },
];

app.route('/api/bestseller').get((req, res) => {
	console.log('all products bestseller');
	res.send(
		bestseller
	);
});

app.route('/api/bestseller/:id').get((req, res) => {

	var id = req.params.id;
	console.log(id)
	var product = bestseller.find(u => u.id == id);
	if (product)
		res.send(product)
	else
		res.send("Not found")
});

app.route('/api/slider').get((req, res) => {
	console.log('all products slide');
	res.send([
		{ proimg: 'url(assets/images/bg2.jpg)', name: 'NMD HUMAN RACE', prodes: 'Best Color' },
		{ proimg: 'url(assets/images/bg3.jpg)', name: 'YEEZY 350', prodes: 'Kanye West Is The Best' },
	]);
})


//Account
app.route('/api/user/insert').post((req, res) => {

	console.log('insert user');
	console.log('user info:' + req.body);
	res.send(201, req.body);
});

app.route('/api/login').post((req, res) => {
	console.log('user login:' + req.body);
	res.send(202, req.body);
});

app.route('/api/insert/:name').get((req, res) => {
	const requestedCatName = req.params['name'];
	res.send({ name: requestedCatName });
});



