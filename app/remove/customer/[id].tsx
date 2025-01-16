import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Layout, Text } from "@ui-kitten/components";
import { useRouter } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { removetCustomer } from "@/api/customerApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ConfirmDeleteScreen = () => {
  const { id, customerName } = useLocalSearchParams<{
    id: string;
    customerName: string;
  }>();
  const queryClient = useQueryClient();

  const router = useRouter();

  const { mutate: removeCustomerMutation } = useMutation({
    mutationFn: (id: any) => removetCustomer(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CUSTOMER"] });
      router.push("/customer");
    },
    onError: () => {
      console.log("Error creating customer");
    },
  });

  const handleDelete = () => {
    removeCustomerMutation(id);
  };

  const handleCancel = () => {
    router.push("/customer");
  };

  return (
    <Layout style={styles.container}>
      <Text category='h5' style={styles.header}>
        Confirm Deletion
      </Text>
      <Text style={styles.message}>
        Are you sure you want to delete{" "}
        <Text style={styles.bold}>{customerName}</Text>?
      </Text>
      <View style={styles.buttonContainer}>
        <Button status='basic' onPress={handleCancel} style={styles.button}>
          Cancel
        </Button>
        <Button status='danger' onPress={handleDelete} style={styles.button}>
          Delete
        </Button>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 16,
  },
  message: {
    textAlign: "center",
    marginBottom: 24,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: 300,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default ConfirmDeleteScreen;
