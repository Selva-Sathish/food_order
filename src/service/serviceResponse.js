export const ServiceResponse = {
  success(data = null, message = "Success") {
    return {
      success: true,
      message,
      data,
    };
  },

  fail(message = "Failed", status = 400, error = null) {
    return {
      success: false,
      message,
      status,
      error,
    };
  }
};
