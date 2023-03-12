import { setAppError } from "@/store/slices/authSlice";
import { Dispatch } from "@reduxjs/toolkit";

type ErrorResponse = {
  message: string;
};

// Handle errors and return an error response object
export const handleFirebaseError = (
  error: unknown,
  dispatch: Dispatch
): ErrorResponse => {
  if (error instanceof Error) {
    if (error.message) {
      dispatch(setAppError(error.message));
      return { message: error.message };
    } else {
      return { message: "An unknown error occurred." };
    }
  } else {
    console.error("Unexpected error type:", error);
    return { message: "An unknown error occurred." };
  }
};
