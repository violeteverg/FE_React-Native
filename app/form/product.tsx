import { getCustomerById } from "@/api/customerApi";
import { getProductById } from "@/api/productApi";
import CustomerForm from "@/components/customerForm/CustomerForm";
import ProductForm from "@/components/productForm/ProductForm";
import { useMainStore } from "@/zustand/zustandProvider";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const customer = () => {
  const { mode, id } = useLocalSearchParams<{ mode: string; id?: string }>();

  const productId = id || "";

  const { data: productData, isLoading } = useQuery({
    queryKey: ["PRODUCT_ID"],
    queryFn: () => getProductById(productId),
    enabled: !!productId && mode === "update",
  });

  const product = productData?.data || {};

  const defaultValues =
    mode === "update" && !isLoading && product
      ? {
          productCode: product.product_code,
          name: product.name,
          category: product.category as "ATK" | "RT" | "MASAK" | "Elektronik",
          price: product.price,
        }
      : {};

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ProductForm defaultValues={defaultValues} />
    </View>
  );
};
export default customer;
