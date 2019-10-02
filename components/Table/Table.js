import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { COLORS } from "../../constants/constants";

const TableRow = ({ created, size, crust, price }) => {
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableRowCell}>
        <Text style={styles.tableRowCellText}>{created}</Text>
      </View>
      <View style={styles.tableRowCell}>
        <Text style={styles.tableRowCellText}>{size.slice(0, 1)}</Text>
      </View>
      <View style={styles.tableRowCell}>
        <Text style={styles.tableRowCellText}>{crust}</Text>
      </View>
      <View style={styles.tableRowCell}>
        <Text style={styles.tableRowCellText}>{price} €</Text>
      </View>
      <View style={styles.statusRowCell}>
        <View style={styles.dot}></View>
        <View>
          <Text style={styles.tableRowCellText}>Sent</Text>
        </View>
      </View>
    </View>
  );
};

const Table = ({ data }) => {
  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderCellText}>Created</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderCellText}>Size</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderCellText}>Crust</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderCellText}>Price</Text>
          </View>
          <View style={styles.tableHeaderCell}>
            <Text style={styles.tableHeaderCellText}>Status</Text>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TableRow
              created={item.created}
              size={item.size}
              crust={item.crust}
              price={item.price}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  table: {
    width: "90%"
  },
  tableHeaderCell: {
    width: "20%"
  },
  tableHeaderCellText: {
    fontSize: 16,
    textAlign: "center"
  },
  tableRowCell: {
    width: "20%",
    flexDirection: "row",
    alignItems: "center"
  },
  dot: {
    backgroundColor: "#2C8B11",
    width: 10,
    height: 10,
    borderRadius: 10,
    marginRight: 5
  },
  statusRowCell: {
    width: "20%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  tableRowCellText: {
    fontSize: 13,
    textAlign: "center",
    justifyContent: "center",
    width: "100%"
  },
  tableRow: {
    width: "100%",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
    flexDirection: "row",
    marginVertical: 5,
    borderStyle: "solid",
    borderColor: "#fafafa",
    borderWidth: 1,
    paddingVertical: 15
  },
  tableHeader: {
    backgroundColor: COLORS.shadowColor,
    paddingVertical: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly"
  }
});

export { Table };
