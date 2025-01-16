/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { BASE_URL } from "@/constants/Constant";

export async function getAllTransaction(page: number = 1, search?: string) {
  try {
    const response = await axios.get(`${BASE_URL}/transaction`, {
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

export async function createTransaction(customerData: object) {
  try {
    const response = await axios.post(`${BASE_URL}/transaction`, customerData, {
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

export async function getTransactionById(transactionId: number) {
  try {
    const response = await axios.get(
      `${BASE_URL}/transaction/${transactionId}`,
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

export async function updateTransaction(
  transactionId: number,
  updateData: object
) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/transaction/${transactionId}`,
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

export async function removeTransaction(transactionId: number) {
  try {
    const response = await axios.delete(
      `${BASE_URL}/transaction/${transactionId}`,
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
