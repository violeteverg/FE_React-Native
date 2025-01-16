import { getCustomerById } from "@/api/customerApi";
import { getProductById } from "@/api/productApi";
import { getTransactionById } from "@/api/transactionApi";
import CustomerForm from "@/components/customerForm/CustomerForm";
import ProductForm from "@/components/productForm/ProductForm";
import TransactionForm from "@/components/transactionForm/TransactionForm";
import { useMainStore } from "@/zustand/zustandProvider";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const transaction = () => {
  const { mode, id } = useLocalSearchParams<{ mode: string; id?: string }>();

  const transactionId = id || "";
  console.log(transactionId, "ini transaction id");

  const {
    data: transactionData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["TRANSACTION_ID"],
    queryFn: () => getTransactionById(Number(transactionId)),
    enabled: !!transactionId && mode === "update",
  });

  const transaction = transactionData?.data || {};

  const defaultValues =
    mode === "update" && !isLoading && transaction
      ? {
          id: transaction.id,
          bill_id: transaction.bill_id,
          date: transaction.date,
          customer_id: transaction.customer_id,
          products: transaction.product_transactions.map((pt: any) => ({
            product_id: pt.product_id,
            quantity: pt.quantity,
          })),
        }
      : {};

  if (isLoading || isFetching) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TransactionForm defaultValues={defaultValues} />
    </View>
  );
};
export default transaction;
