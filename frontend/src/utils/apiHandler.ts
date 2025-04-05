// ==========================
// handleApiRequest function
// ==========================
export const handleApiRequest = async <T>(
  apiFunction: () => Promise<T>, // The API function to execute
  errorMesage: string, // The generic error message to display if no specific error is available
  showAlert: boolean = false, // Whether to show an alert in case of an error (default: false)
): Promise<T | undefined> => {
  try {
    // Try to execute the API function
    return await apiFunction(); // Return the resolved value if the API call succeeds
  } catch (err: any) {
    // If an error occurs during the API call
    if (err.response && err.response.data && err.response.data.detail) {
      // If the error contains a response and a detailed message in the 'detail' field
      const errorDetails = err.response.data.detail;

      // Show an alert with the specific error details if showAlert is true
      if (showAlert) {
        alert(errorDetails); // Show the specific error message returned from the API
      }
    } else {
      // If no specific error details are found in the response
      // Show a generic error message if showAlert is true
      if (showAlert) {
        alert(errorMesage); // Show the generic error message
      }
    }
    throw err; // Re-throw the error to ensure it's handled appropriately in the calling function
  }
};
