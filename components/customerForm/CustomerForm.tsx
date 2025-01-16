import React from "react";
import { View, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Input, Button, Layout, Text } from "@ui-kitten/components";
import { createCustomer, updateCustomer } from "@/api/customerApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useMainStore } from "@/zustand/zustandProvider";
import CustomSelect from "../customerSelect/CustomerSelect";

const genders = ["pria", "wanita"];

const CustomerForm = ({
  defaultValues = {
    name: "",
    address: "",
    gender: "pria",
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

  const { mutate: createCustomerMutation } = useMutation({
    mutationFn: (val: any) => createCustomer(val),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CUSTOMER"] });
      reset();
      router.push("/customer");
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
    const customerData = {
      name: data.name,
      address: data.address,
      gender: data.gender.toLowerCase(),
    };

    if (type === "update") {
      updateCustomerMutation({ id: data.customerId, val: customerData });
    } else {
      createCustomerMutation(customerData);
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
        name='address'
        render={({ field: { onChange, value } }) => (
          <Input
            label='Alamat'
            placeholder='Masukkan alamat'
            value={value}
            onChangeText={onChange}
            style={styles.input}
          />
        )}
      />

      <Controller
        control={control}
        name='gender'
        render={({ field: { onChange, value } }) => (
          <CustomSelect
            label='Jenis Kelamin'
            options={genders}
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

export default CustomerForm;
