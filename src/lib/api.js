import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
});

export const api = async (
  endpoint,
  method = "GET",
  body = undefined
) => {

  try {

    // ✅ check FormData
    const isFormData = body instanceof FormData;

    const res = await apiClient({
      url: endpoint,
      method,
      data: body || undefined,

      headers: isFormData
        ? {}
        : {
          "Content-Type": "application/json",
        },

    });

    return res.data;

  } catch (error) {

    console.log(error.response?.data);

    throw new Error(
      error.response?.data?.message ||
      "Something went wrong"
    );
  }
};

export default apiClient;