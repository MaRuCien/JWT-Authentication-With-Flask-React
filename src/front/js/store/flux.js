const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: {
				'email': '',
				'token': ''
			},
			token: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + '/api/hello')
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log('Error loading message from backend', error)
				}
			},
			register: async (email, password) => {
				const opts = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						'email': email,
						'password': password
					})
				};
				await fetch(process.env.BACKEND_URL + '/api/register', opts)
					.then(response => response.json())
					.then((data) => {
						console.log(data);
					})
					.catch((error) => {
						console.error(error);
					})
			},
			getToken: () => {
				const token = localStorage.getItem('token');
				if (token && token != '' && token != undefined)
					setStore({ token: token })
			},
			logout: () => {
				const token = localStorage.removeItem('token');
				setStore({ token: null })
			},
		}
	};
};

export default getState;
