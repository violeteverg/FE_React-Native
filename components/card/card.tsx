import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text, Button, Layout } from "@ui-kitten/components";

type CardContent = {
  [key: string]: string;
};

type CardProps = {
  id: string;
  content: CardContent;
  subContent?: any;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  isExpand?: boolean;
};

const CardComponent: React.FC<CardProps> = ({
  id,
  content,
  onUpdate,
  onDelete,
  subContent = {},
  isExpand = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card style={styles.card} onPress={toggleExpand}>
      <Layout style={styles.contentContainer}>
        <View>
          {Object.entries(content).map(([key, value]) => (
            <Text key={key} category='p1' style={styles.text}>
              {key}: {value}
            </Text>
          ))}
        </View>

        {isExpand && isExpanded && (
          <View style={styles.subContentContainer}>
            <Text category='h6' style={styles.subContentHeader}>
              Products:
            </Text>
            <Text>{subContent.Nota}</Text>
            {subContent.Products?.map((product: any, index: any) => (
              <View key={index} style={styles.productItem}>
                <Text>{`Product Code: ${product.productCode}`}</Text>
                <Text>{`Quantity: ${product.quantity}`}</Text>
              </View>
            ))}
          </View>
        )}
      </Layout>

      <Layout style={styles.buttonContainer}>
        <Button
          style={[styles.button]}
          onPress={() => onUpdate(id)}
          status='success'
          size='small'
        >
          Update
        </Button>
        <Button
          style={[styles.button]}
          onPress={() => onDelete(id)}
          status='danger'
          size='small'
        >
          Delete
        </Button>
      </Layout>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    padding: 16,
  },
  contentContainer: {
    marginBottom: 16,
  },
  text: {
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  expandButton: {
    marginTop: 8,
    alignSelf: "center",
  },
  subContentContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  subContentHeader: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  productItem: {
    marginBottom: 8,
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default CardComponent;
