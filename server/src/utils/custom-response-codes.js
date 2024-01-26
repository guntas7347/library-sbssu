const crs = {
  STU201CNS: (payload = null) => {
    return {
      status: "STU201CNS",
      message: "Student created successfully.",
      payload,
    };
  },
  CONFL409CNS: (payload = null) => {
    return {
      status: "CONFL409CNS",
      message: "Roll number already exists.",
      payload,
    };
  },
  MONGO422CNS: (payload = null) => {
    return {
      status: "MONGO422CNS",
      message: "Validation failed. Please check your input.",
      payload,
    };
  },
  SERR500CNS: (payload = null) => {
    return {
      status: "SERR500CNS",
      message: "Internal Server Error",
      payload,
    };
  },
};

module.exports = crs;
