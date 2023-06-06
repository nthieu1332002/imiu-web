import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const customerAnswerApi = createApi({
  reducerPath: "customerAnswerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API + "customeranswer",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  tagTypes: ["CustomerAnswer"],
  endpoints: (builder) => ({
    createAnswer: builder.mutation({
      query: (data) => ({
        url: "/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useCreateAnswerMutation } = customerAnswerApi;