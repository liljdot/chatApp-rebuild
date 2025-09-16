import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";
import { conversationsApi } from "../api/conversationsApi";

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: isAnyOf(authApi.endpoints.login.matchFulfilled, authApi.endpoints.login.matchFulfilled, authApi.endpoints.signup.matchFulfilled),
    effect: (_, listenerApi) => {
        listenerApi.dispatch(conversationsApi.util.resetApiState())
    }
})

export default listenerMiddleware