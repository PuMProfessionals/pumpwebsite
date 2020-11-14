

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1141px',  '1680px' ],
			large:    [ '981px',   '1140px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '321px',   '480px'  ],
			xxsmall:  [ null,      '320px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Scrolly.
		$('.scrolly').scrolly();

}
)(jQuery);

(function($) {

	const tbody = $("#table1 tbody")

	const data = [
		{
			Title: "STEM Fellowship",
			Author: "Shrinjay M",
			Location: "Toronto, ON",
			Description: "A Research Internship."
		},
		{
			Title: "OMS",
			Author: "Shrinjay M",

			Location: "Toronto, ON",
			Description: "Medical Conference"
		}
	]

	

	for (var i=0; i<data.length; i++)
	{
		var newRow = "<tr class='dataRow'><td>"+data[i].Title+"</td><td>"+data[i].Author+"</td><td>"+data[i].Location+"</td><td>"+data[i].Description+"</td></tr>"
		console.log(data[i])
		 $("#table1 tbody").append(newRow)
	}



}
)(jQuery);

