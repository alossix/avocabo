type ErrorResponse = {
  message: string;
};

// Handle errors and return an error response object
export const handleFirebaseError = (error: unknown): ErrorResponse => {
  if (error instanceof Error) {
    if (error.message) {
      return { message: error.message };
    } else {
      return { message: UNKNOWN_ERROR };
    }
  } else {
    console.error("Unexpected error type:", error);
    return { message: UNKNOWN_ERROR };
  }
};

export const UNKNOWN_ERROR = "An unknown error occurred.";
