import csv
import json
import sys

words = ["client_id", "date_facture", "description", "nom_unite", "nombre_unit", "prix_unit", "total_unit", "total_net", "taxe", "total", "num_facture"]
# Function to search for a word in the CSV and store all data under the row index where the word is found
def search_word_in_csv(word, file_path):
    data_under_word = []
    try:
        with open(file_path, mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            for row in reader:
                if word in row:
                    index = row.index(word)
                    # Store all data under the row index where the word is found
                    data_under_word.extend([row[index] for row in reader])
                    break
    except Exception as e:
        return f"Error: {str(e)}"
    return data_under_word

def main(csv_file_path):
    try:
        # Iterate over each word and search in the CSV
        arrays = []
        for word in words:
            data = search_word_in_csv(word, csv_file_path)
            if isinstance(data, str):  # Check if an error occurred
                print(data)
                return
            arrays.append(data)

        min_length = len(arrays[0])

        # Adjust lengths of all arrays
        adjusted_arrays = []
        for array in arrays:
            if len(array) < min_length:  # If array is shorter
                adjusted_array = array + [''] * (min_length - len(array))  # Add empty strings
            else:  # If array is longer
                adjusted_array = array[:min_length]  # Truncate the array
            adjusted_arrays.append(adjusted_array)

        # Now all arrays have the same length as the shortest array
        arrays = adjusted_arrays

        # Create the result list of dictionaries
        result = []
        for i in range(min_length):
            # Initialize a dictionary for each iteration
            obj = {}
            # Iterate over the arrays and their corresponding values
            for j, array in enumerate(arrays):
                # Create keys as "arrayA", "arrayB", ... and assign corresponding values
                key = words[j]
                obj[key] = array[i]

            if not all(value == '' for value in obj.values()):
                # Convert the value to float and then to integer
                if obj["total"] != '':
                    total_value = float(obj["total"])
                    if total_value > 0:
                        obj["category"] = "V"
                    else:
                        obj["category"] = "A"
                if obj["date_facture"]:
                    obj["date_facture"] = obj["date_facture"][0:10]
                result.append(obj)

        # Print the result as JSON string
        print(json.dumps(result))
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <csv_file_path>")
        sys.exit(1)
    main(sys.argv[1])
