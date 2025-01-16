import React from "react";
import DateTimePicker from "react-native-ui-datepicker";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  Button,
  Input,
  Text,
  Select,
  SelectItem,
  IndexPath,
} from "@ui-kitten/components";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCustomerDropdown } from "@/api/customerApi";
import { getAllProductDropdown } from "@/api/productApi";
import { useMainStore } from "@/zustand/zustandProvider";
import { createTransaction, updateTransaction } from "@/api/transactionApi";
import { useRouter } from "expo-router";

export default function TransactionForm({
  defaultValues,
}: {
  defaultValues: any;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { type } = useMainStore((state) => state);
  console.log(type, "typer");

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
  const { data: customers, isLoading: isLoadingCustomers } = useQuery({
    queryKey: ["CUSTOMER_LIST"],
    queryFn: () => getAllCustomerDropdown(),
  });

  const { data: products, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["PRODUCT_LIST"],
    queryFn: () => getAllProductDropdown(),
  });

  const selectedProducts = watch("products") || [];

  const { mutate: createTransactionMutation, isPending: isPendingCreate } =
    useMutation({
      mutationFn: (val: any) => createTransaction(val),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["TRANSACTION"] });
        reset();
        router.push("/transaction");
      },
      onError: () => {
        console.log("Error creating product");
      },
    });
  const { mutate: updateTransactionMutation, isPending: isPendingUpdate } =
    useMutation({
      mutationFn: ({ id, val }: { id: number; val: any }) =>
        updateTransaction(id, val),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["TRANSACTION"] });
        reset();
        router.push("/transaction");
      },
      onError: () => {
        console.log("Error creating product");
      },
    });

  const isProductSelected = (productId: string, currentIndex: number) => {
    return selectedProducts.some(
      (product: any, index: any) =>
        product.product_id?.toString() === productId && index !== currentIndex
    );
  };

  const onSubmit = (data: any) => {
    const formattedData = {
      ...data,
      customer_id: Number(data.customer_id),
      products: data.products.map((product: any) => ({
        ...product,
        product_id: Number(product.product_id),
      })),
    };

    console.log(formattedData, "ini formated s");
    if (type === "update") {
      updateTransactionMutation({ id: data.id, val: formattedData });
    } else {
      createTransactionMutation(formattedData);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Tanggal */}
      <Text style={styles.label}>Tanggal</Text>
      <Controller
        control={control}
        name='date'
        render={({ field }) => (
          <Input
            style={styles.input}
            placeholder='YYYY-MM-DD'
            value={field.value || ""}
            onChangeText={field.onChange}
          />
        )}
      />

      {/* Customer */}
      <Text style={styles.label}>Customer</Text>
      <Controller
        control={control}
        name='customer_id'
        render={({ field }) => (
          <Select
            value={
              customers?.data?.find((c: any) => c.id === field.value)?.name ||
              "Pilih Customer"
            }
            selectedIndex={
              new IndexPath(
                customers?.data?.findIndex(
                  (c: any) => c.id.toString() === field.value
                )
              )
            }
            onSelect={(index) => {
              if (index instanceof IndexPath) {
                field.onChange(customers?.data[index.row]?.id);
              }
            }}
          >
            {isLoadingCustomers ? (
              <SelectItem title='Loading...' />
            ) : (
              customers?.data?.map((customer: any) => (
                <SelectItem key={customer.id} title={customer.name} />
              ))
            )}
          </Select>
        )}
      />

      <Text style={styles.label}>Produk</Text>
      {fields.map((field, index) => (
        <View key={field.id} style={styles.productRow}>
          <Controller
            control={control}
            name={`products.${index}.product_id`}
            render={({ field }) => {
              console.log(
                products?.find((p: any) => p.id === field.value)?.name ||
                  "Pilih Produk",
                "iniproductfield"
              );
              return (
                <Select
                  style={styles.productInput}
                  value={
                    products?.find((p: any) => p.id === field.value)?.name ||
                    "Pilih Produk"
                  }
                  selectedIndex={
                    new IndexPath(
                      products?.findIndex((p: any) => p.id === field.value)
                    )
                  }
                  onSelect={(index) => {
                    if (index instanceof IndexPath) {
                      field.onChange(products[index.row]?.id);
                    }
                  }}
                >
                  {isLoadingProducts ? (
                    <SelectItem title='Loading...' />
                  ) : (
                    products?.map((product: any) => (
                      <SelectItem
                        key={product.id}
                        title={product.name}
                        disabled={isProductSelected(
                          product.id.toString(),
                          index
                        )}
                      />
                    ))
                  )}
                </Select>
              );
            }}
          />
          <Controller
            control={control}
            name={`products.${index}.quantity`}
            render={({ field }) => (
              <Input
                style={styles.quantityInput}
                placeholder='Jumlah'
                keyboardType='numeric'
                value={field.value?.toString() || ""}
                onChangeText={(text) => field.onChange(Number(text) || 1)}
              />
            )}
          />
          <Button status='danger' size='small' onPress={() => remove(index)}>
            Hapus
          </Button>
        </View>
      ))}
      <Button
        style={styles.addButton}
        onPress={() =>
          append({
            product_id: undefined,
            quantity: 1,
          })
        }
      >
        Tambah Produk
      </Button>

      {/* Simpan */}
      <Button style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        Simpan Transaksi
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    marginBottom: 8,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 16,
  },
  productRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  productInput: {
    flex: 1,
    marginRight: 8,
  },
  quantityInput: {
    width: 80,
    marginRight: 8,
  },
  addButton: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 16,
  },
});
