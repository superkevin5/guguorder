// var express = require('express');
// var router = express.Router();
// var firebase = require('firebase');
// var db = firebase.database();
// var ref = db.ref();
//
// router.get('/', function(req, res, next) {
//
//
// 	var genreRef = ref.child('genres');
// 	genreRef.orderByKey().once('value').then(function (snapshot) {
//
// 		var data = [];
// 		snapshot.forEach(function (childSnapshot) {
//
// 			var key = childSnapshot.key;
// 			var childData = childSnapshot.val();
// 			data.push({
// 				id: key,
// 				name: childData.name
// 			});
// 		});
// 		res.render('genres/index', {genres: data});
// 		//res.render('albums/add', {genres: data});
// 	});
//
// });
//
//
// router.get('/add', function(req, res, next) {
// 	res.render('genres/add');
// });
// router.post('/add', function(req, res, next) {
//
// 	var genre = {
// 		name:req.body.name
// 	};
// 	var genreRef = ref.child('genres');
// 	genreRef.push().set(genre);
// 	req.flash('success_msg','Genre Saved');
// 	res.redirect('/genres');
//
// });
//
// router.get('/edit/:id', function(req, res, next) {
// 	var id = req.params.id;
// 	ref.child('genres').child(id).once('value',function(snapshot){
// 		var genre = snapshot.val();
// 		res.render('genres/edit', {genre: genre, id: id});
// 	});
// });
//
// router.post('/edit/:id', function(req, res, next) {
// 	var id = req.params.id;
// 	var name = req.body.name;
// 	ref.child('genres').child(id).update({
// 		name: name
// 	});
//
// 	res.redirect('/genres');
// });
//
// router.delete('/delete/:id', function(req, res, next) {
// 	var id = req.params.id;
// 	var genreRef = ref.child('genres').child(id);
// 	genreRef.remove();
// 	req.flash('success_msg','Genre Deleted');
// 	res.send(200);
// });
//
//
// module.exports = router;
