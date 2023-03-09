type ErrorResponse = {
  message: string;
};

// Handle errors and return an error response object
export const handleFirebaseError = (error: unknown): ErrorResponse => {
  if (error instanceof Error) {
    if (error.message) {
      return { message: error.message };
    } else {
      return { message: "An unknown error occurred." };
    }
  } else {
    console.error("Unexpected error type:", error);
    return { message: "An unknown error occurred." };
  }
};
