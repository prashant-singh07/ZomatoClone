import {configureStore} from '@reduxjs/toolkit';
import productsReducer from './productSlice';

export const store = configureStore({
  reducer: {
    //   posts: postsReducer,
    //   comments: commentsReducer,
    //   users: usersReducer,
    products: productsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
