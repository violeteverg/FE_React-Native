/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "@/constants/Constant";

export async function getAllProduct(page: number = 1, search?: string) {
  try {
    const response = await axios.get(`${BASE_URL}/product`, {
      params: { page, search },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error: ${error.response?.status} - ${error.response?.statusText}`
      );
    } else {
      console.error(`Unexpected error: ${error?.message}`);
    }
    throw error;
  }
}

export async function createProduct(customerData: object) {
  try {
    const response = await axios.post(`${BASE_URL}/product`, customerData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error: ${error.response?.status} - ${error.response?.statusText}`
      );
    } else {
      console.error(`Unexpected error: ${error?.message}`);
    }
    throw error;
  }
}

export async function getProductById(productId: string | number) {
  try {
    const response = await axios.get(`${BASE_URL}/product/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error: ${error.response?.status} - ${error.response?.statusText}`
      );
    } else {
      console.error(`Unexpected error: ${error?.message}`);
    }
    throw error;
  }
}

export async function updateProduct(
  productId: string | number,
  updateData: object
) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/product/${productId}`,
      updateData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error: ${error.response?.status} - ${error.response?.statusText}`
      );
    } else {
      console.error(`Unexpected error: ${error?.message}`);
    }
    throw error;
  }
}

export async function removeProduct(productId: string | number) {
  try {
    const response = await axios.delete(`${BASE_URL}/product/${productId}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error: ${error.response?.status} - ${error.response?.statusText}`
      );
    } else {
      console.error(`Unexpected error: ${error?.message}`);
    }
    throw error;
  }
}

export async function getAllProductDropdown() {
  try {
    const response = await axios.get(`${BASE_URL}/products/listProduct`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data, "ini data");

    return response?.data?.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error(
        `Axios error: ${error.response?.status} - ${error.response?.statusText}`
      );
    } else {
      console.error(`Unexpected error: ${error?.message}`);
    }
    throw error;
  }
}
