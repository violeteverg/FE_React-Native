import React from "react";
import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
import { createCustomer, updateCustomer } from "@/api/customerApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useMainStore } from "@/zustand/zustandProvider";
import CustomSelect from "../customerSelect/CustomerSelect";
import { createProduct } from "@/api/productApi";

const product = ["ATK", "RT", "ELEKTRONIK", "MASAK"];

const ProductForm = ({
  defaultValues = {
    name: "",
    price: 0,
    category: "ATK",
  },
}: {
  defaultValues?: any;
}) => {
  const router = useRouter();
  const { type } = useMainStore((state) => state);

  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
  });

  const { mutate: createProductMutation } = useMutation({
    mutationFn: (val: any) => createProduct(val),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PRODUCT"] });
      reset();
      router.push("/product");
    },
    onError: () => {
      console.log("Error creating customer");
    },
  });

  const { mutate: updateCustomerMutation } = useMutation({
    mutationFn: ({ id, val }: { id: number; val: any }) =>
      updateCustomer(id, val),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CUSTOMER"] });
      reset();
      router.push("/customer");
    },
    onError: () => {
      console.log("Error updating customer");
    },
  });

  const onSubmit = (data: any) => {
    const productData = {
      name: data.name,
      price: data.price,
      category: data.category.toLowerCase(),
    };

    console.log(productData);
    if (type === "update") {
      console.log(productData);
      //   updateCustomerMutation({ id: data.customerId, val: customerData });
    } else {
      createProductMutation(productData);
    }
  };

  return (
    <Layout style={styles.container}>
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange, value } }) => (
          <Input
            label='Nama'
            placeholder='Masukkan nama'
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name='price'
        render={({ field: { onChange, value } }) => (
          <Input
            label='Price'
            placeholder='Masukkan harga'
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name='category'
        render={({ field: { onChange, value } }) => (
          <CustomSelect
            label='Category'
            options={product}
            value={value}
            onSelect={onChange}
          />
        )}
      />

      <Button onPress={handleSubmit(onSubmit)} style={styles.button}>
        Simpan Data
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    marginTop: 16,
  },
});

export default ProductForm;
