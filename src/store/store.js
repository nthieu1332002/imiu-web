import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from '@reduxjs/toolkit/query'
import { userApi } from "./services/userApi.js";
import { authApi } from "./services/authApi.js";
import authSlice from "./authSlice.js";
import { questionApi } from "./services/questionApi.js";
import { customerAnswerApi } from "./services/customerAnswerApi.js";
import { paymentApi } from "./services/paymentApi.js";
import { subscriptionApi } from "./services/subscriptionApi.js";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [questionApi.reducerPath]: questionApi.reducer,
    [customerAnswerApi.reducerPath]: customerAnswerApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      authApi.middleware,
      questionApi.middleware,
      customerAnswerApi.middleware,
      paymentApi.middleware,
      subscriptionApi.middleware
    ),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
