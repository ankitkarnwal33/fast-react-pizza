import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { getAddress } from '../../services/apiGeocoding';

const intialState = {
  username: '',
  position: {},
  status: 'idle',
  address: "",
  error: ""
}

const userSlice = createSlice({
  name: "user",


  initialState: intialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAddress.pending, (state, action) => {
      state.status = "loading"
    })
      .addCase(fetchUserAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle"

      }).addCase(fetchUserAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message
      })
  }
})

export const fetchUserAddress = createAsyncThunk("user/fetchAddress", async function (): any {
  // 1) We get the user's geolocation position
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
  const addressObj = await getAddress(position);
  const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

  // 3) Then we return an object with the data that we are interested in
  return { position, address };
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;