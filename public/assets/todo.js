$(document).ready(function(){
	console.log("AAAAAA");
	$('form').on('submit', function(){

		console.log('i am here')
		var item = $('form input');
		var todo = {item:item.val()};

		//send ajax post request to add the item
		$.ajax({
			type:'POST',
			url:'/todo',
			data:todo,
			success: function(data){
				console.log('successfully added item:', data)
				//location.reload();
			},
			error:function(err){
				console.log('Error on adding item:', err);
			}
		});
	});

	$('ul li').on('click', function(){
		var item = $(this).text().replace(/ /g, '-');

		//send ajax request for delete
		$.ajax({
			type:'DELETE',
			url:'/todo/'+ item,
			success:function(data){
				console.log('deleted item successfully');
				location.reload()
			},
			error:function(err){
				console.error('error while deleteing the item:', err)
			}
		})
	})

})	