import { getCustomerById } from "@/api/customerApi";
import CustomerForm from "@/components/customerForm/CustomerForm";
import { useMainStore } from "@/zustand/zustandProvider";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const customer = () => {
  const { mode, id } = useLocalSearchParams<{ mode: string; id?: string }>();

  const customerId = id || "";

  const { data: customerData, isLoading } = useQuery({
    queryKey: ["CUSTOMER_ID"],
    queryFn: () => getCustomerById(customerId),
    enabled: !!customerId && mode === "update",
  });
  const customer = customerData?.data || {};

  const defaultValues =
    mode === "update" && !isLoading && customer
      ? {
          id: customer.id || 0,
          customerId: customer.id_customer || "",
          name: customer.name || "",
          address: customer.address || "",
          gender: customer.gender || "",
        }
      : {};

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <CustomerForm defaultValues={defaultValues} />
    </View>
  );
};
export default customer;
