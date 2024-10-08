document.addEventListener('DOMContentLoaded', () => {


	// toggle passwords
	document.getElementById('show').addEventListener('click', () => {
		const show = document.querySelector('#show');
		const password = document.querySelector('#password');
		const confirmPassword = document.querySelector('#confirmpassword');

		if (show.checked) {
			password.setAttribute('type', 'text');
			confirmpassword.setAttribute('type', 'text');
		} else {
			password.setAttribute('type', 'password');
			confirmpassword.setAttribute('type', 'password');
		}
	});

	// submit user data
	document.getElementById('register').addEventListener('submit', (event) => {
		event.preventDefault();

		const form = event.target;
		const formData = new FormData(form);

		let headers = {
			'X-CSRFToken': form.csrf_token.value
		}

		fetch('/register', {
			headers: headers,
			method: 'POST',
			body: formData
		})
		.then(response => {
			if (!response.ok) {
				throw new Error(response.statusText);
			} else {
				return response.json();
			}
		})
		.then(data => {
			if (data.errors) {
				document.querySelectorAll('.error').forEach((error) => {
					error.textContent = '';
				});

				for (let field in data.errors) {
					let errorMessage = data.errors[field].join(', ');
					let errorElement = document.querySelector(`#${field}-error`);
					errorElement.textContent = errorMessage;

					setTimeout(() => {
						errorElement.textContent = '';
					}, 3000);
				}
			} else if (data.error) {
				let errorContainer = document.querySelector('.alert');
				let errorElement = document.querySelector('.alert p');
				errorElement.textContent = '';
				errorElement.textContent = data.error;
				errorContainer.classList.add('alert-danger');

				setTimeout(() => {
					errorContainer.classList.remove('alert-danger');
					errorElement.textContent = '';
				}, 5000);
			} else {
				let messageContainer = document.querySelector('.alert');
				let messageElement = document.querySelector('.alert p');
				messageElement.textContent = '';
				messageElement.textContent = data.success;
				messageContainer.classList.add('alert-success');

				setTimeout(() => {
					messageContainer.classList.remove('alert-success');
					messageElement.textContent = '';
					window.location.href = '/login';
				}, 2000);
			}
		})
		.catch(error => {
			console.error('Error' + error.message);
		});
	});
});

