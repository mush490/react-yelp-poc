export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, api) => {
    const res = await api.get('/users');

    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch,getState,api) => {
    const res = await api.get('/current_user');
   
    dispatch({
        type: FETCH_CURRENT_USER,
        payload: res
    });
};

export const FETCH_ADMINS = 'fetch_admins';
export const fetchAdmins = () => async (dispatch,getState,api) => {
    const res = await api.get('/admins');
    dispatch({
        type: FETCH_ADMINS,
        payload: res
    });
};

export const SEARCH_RESTAURANTS = 'search_restaurants';
export const searchRestaurants = () => async (dispatch,getState,api) => {
    const res = await api.get('/search?term=test');
    console.log(res);
    dispatch({
        type: SEARCH_RESTAURANTS,
        payload: res
    });
};

export const RANDOM_RESTAURANT = 'random_restaurant';
export const randomRestaurant = (term,latitude,longitude) => async (dispatch,getState,api) => {
    const res = await api.get('/search?latitude='+latitude+'&longitude='+longitude + (term ? '&term=' + term: ''));
    const random = res.data.businesses[Math.floor(Math.random() * res.data.businesses.length)];
    console.log(random);
    dispatch({
        type: RANDOM_RESTAURANT,
        payload: random
    });
};

export const GET_LOCATION = 'get_location';
export const getLocation = () => async (dispatch) => {
    
  const geolocation = navigator.geolocation;
  
  const location = await new Promise((resolve, reject) => {
    if (!geolocation) {
      reject(new Error('Not Supported'));
    }
    geolocation.getCurrentPosition((position) => {
      resolve(position);
    }, () => {
      reject (new Error('Permission denied'));
    });
  });

  dispatch({
    type: GET_LOCATION,
    payload: location
});
};