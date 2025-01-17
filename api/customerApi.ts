/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "@/constants/Constant";
console.log(BASE_URL, "ini url");

export async function getAllCustomer(
  page: number = 1,

  search?: string
) {
  try {
    const response = await axios.get(`${BASE_URL}/customer`, {
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

export async function createCustomer(customerData: object) {
  try {
    const response = await axios.post(`${BASE_URL}/customer`, customerData, {
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

export async function getCustomerById(customerId: string | number) {
  try {
    const response = await axios.get(`${BASE_URL}/customer/${customerId}`, {
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

export async function updateCustomer(
  customerId: string | number,
  updateData: object
) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/customer/${customerId}`,
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

export async function getAllCustomerDropdown() {
  try {
    const response = await axios.get(`${BASE_URL}/customers/listCustomer`, {
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

export async function removetCustomer(customerId: string | number) {
  try {
    const response = await axios.delete(`${BASE_URL}/customer/${customerId}`, {
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
