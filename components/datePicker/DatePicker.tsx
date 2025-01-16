import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input, Button, Modal } from "@ui-kitten/components";
import DateTimePicker from "react-native-ui-datepicker";
import { Controller } from "react-hook-form";

interface DatePickerModalProps {
  control: any;
  name: string;
  label: string;
}

const DatePickerModal: React.FC<DatePickerModalProps> = ({
  control,
  name,
  label,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Menangani perubahan tanggal
  const handleDateChange = (params: any) => {
    setSelectedDate(params.date);
  };

  // Menutup modal dan mengirimkan tanggal ke form
  const handleCloseModal = (field: any) => {
    field.onChange(selectedDate); // Mengirimkan tanggal yang dipilih
    setModalVisible(false); // Menutup modal
  };

  return (
    <View style={styles.container}>
      {/* Input untuk memilih tanggal */}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <View>
            <Input
              style={styles.input}
              placeholder={label}
              value={selectedDate ? selectedDate.toLocaleDateString() : ""}
              onFocus={() => setModalVisible(true)} // Membuka modal saat input difokuskan
            />
            {/* Modal UI Kitten */}
            <Modal
              visible={isModalVisible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setModalVisible(false)} // Menutup modal saat bagian luar modal diketuk
            >
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Pilih Tanggal</Text>
                {/* DateTimePicker */}
                <DateTimePicker
                  mode='single'
                  date={selectedDate || new Date()}
                  onChange={handleDateChange}
                />
                <Button
                  style={styles.modalButton}
                  onPress={() => handleCloseModal(field)}
                >
                  Pilih
                </Button>
              </View>
            </Modal>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalButton: {
    marginTop: 16,
  },
});

export default DatePickerModal;
