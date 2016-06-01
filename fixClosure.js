console.log("Start of the fix closure script");

// what to fix:
// for (var i = 0; i < 5; i++) {
//   setTimeout(function() { console.log(i); }, i * 1000 );
// }


for (var i = 0; i < 5; i++) {
	setTimeout(function(x) {
		console.log(x);
	}(i), i * 100);
}
