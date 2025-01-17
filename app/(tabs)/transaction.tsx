import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import Card from "@/components/card/card";
import { useQuery } from "@tanstack/react-query";
import { useMainStore } from "@/zustand/zustandProvider";
import { getAllTransaction } from "@/api/transactionApi";

export default function TransactionPage() {
  const router = useRouter();
  const { setType } = useMainStore((state) => state);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryKey: ["TRANSACTION", page, searchQuery],
    queryFn: () => getAllTransaction(page, searchQuery),
  });

  const handleUpdate = (id: string) => {
    console.log(`Update customer with ID: ${id}`);
    setType("update");
    router.push(`/form/transaction?mode=update&id=${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete customer with ID: ${id}`);
    router.push({
      pathname: "/remove/transaction/[id]",
      params: { id },
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreate = () => {
    console.log("Navigate to Create Page");
    setType("create");
    router.push("/form/transaction?mode=create");
  };
  const handleNextPage = () => {
    if (data?.pagination.current_page < data?.pagination.last_page) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (data?.pagination.current_page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder='Search Transaction...'
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
        <Text style={styles.createButtonText}>Create</Text>
      </TouchableOpacity>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          data?.pagination.current_page === 1 && styles.disabledButton,
        ]}
        onPress={handlePreviousPage}
        disabled={data?.pagination.current_page === 1}
      >
        <Text style={styles.paginationButtonText}>Previous</Text>
      </TouchableOpacity>
      <Text style={styles.paginationText}>
        Page {data?.pagination.current_page} of {data?.pagination.last_page}
      </Text>
      <TouchableOpacity
        style={[
          styles.paginationButton,
          data?.pagination.current_page === data?.pagination.last_page &&
            styles.disabledButton,
        ]}
        onPress={handleNextPage}
        disabled={data?.pagination.current_page === data?.pagination.last_page}
      >
        <Text style={styles.paginationButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <FlatList
      data={data?.data || []}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => {
        const productDetails = item.product_transactions.map(
          (product: any) => ({
            productCode: product.product.product_code,
            quantity: product.quantity,
          })
        );

        const subContent = {
          Nota: item.bill_id,
          Products: productDetails,
        };

        return (
          <Card
            id={item.id}
            content={{
              BillId: item.bill_id,
              Date: item.date,
              CustomerCode: item.customer.id_customer,
              Subtotal: item.subtotal,
            }}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            subContent={subContent}
            isExpand={true}
          />
        );
      }}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
    backgroundColor: "#fff",
  },
  createButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contentContainer: {
    padding: 16,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  paginationButton: {
    width: 100,
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  paginationButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  paginationText: {
    fontSize: 16,
  },
});
