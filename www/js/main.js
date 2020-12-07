$( document ).ready(function(){
	

	if ($('body').attr('data') == 'requires-login' && window.localStorage.getItem('userID') == 0) {
		window.location='login.html'
	} else if($('body').attr('data') == 'no-login' && window.localStorage.getItem('userID') > 0) {
		window.location='summary.html';
	}

	var tasks = ['123','521','911'];

	for(var t of tasks) {
		var temp = taskDOM.clone();
		temp.find('#title').text(t);
		temp.find('#desc').text(t);
		temp.find('#datetime').text(t);
		$('.tasks-field').append(temp);
	}
});

$('.task button').click(() => {
	var taskName = $('.task').find('input[name="name"]').val();
	var taskDescription = $('.task').find('input[name="description"]').val();
	var date = new Date($('.task').find('input[name="date"]').val()).toLocaleString();
	addNewTask(taskName,taskDescription,date);
});

var taskDOM = $(`<div class="card-body">
            <h4 class="card-title" id="title"></h4>
            <p class="card-text" id="desc"></p>
            <p><i class="fa fa-clock-o"></i> <i id="datetime"></i></p>
            <a class="btn btn-primary" type="button">Edit</a>
            <a class="btn btn-success" type="button">Mark as finished</a>
        </div>`);