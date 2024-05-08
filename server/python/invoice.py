import csv
import json
import sys
import traceback

def search_word_in_csv(word, file_path):
    data_under_word = []
    try:
        with open(file_path, mode='r', encoding='utf-8-sig') as file:
            reader = csv.reader(file)
            for row in reader:
                if word in row:
                    index = row.index(word)
                    data_under_word.extend([row[index] for row in reader])
                    break
    except Exception as e:
        # Print the exception traceback to stderr
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)
    return data_under_word

def main(csv_file_path, selected_cells):
    try:
        # Parse the selected cells array passed from the frontend
        words = selected_cells

        arrays = []
        for word in words:
            data = search_word_in_csv(word, csv_file_path)
            if isinstance(data, str):
                print(data)
                return
            arrays.append(data)

        min_length = len(arrays[0])

        adjusted_arrays = []
        for array in arrays:
            if len(array) < min_length:
                adjusted_array = array + [''] * (min_length - len(array))
            else:
                adjusted_array = array[:min_length]
            adjusted_arrays.append(adjusted_array)

        arrays = adjusted_arrays

        result = []
        for i in range(min_length):
            obj = {}
            for j, array in enumerate(arrays):
                key = words[j]
                obj[key] = array[i]

            if not all(value == '' for value in obj.values()):
                if obj['total'] != '':
                    total_value = float(obj["total"])
                    if total_value > 0:
                        obj["category"] = "V"
                    else:
                        obj["category"] = "A"
                if obj["date_facture"]:
                    obj["date_facture"] = obj["date_facture"][0:10]
                result.append(obj)

        print(json.dumps(result))
    except Exception as e:
        # Print the exception traceback to stderr
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py <csv_file_path> <selected_cells>")
        sys.exit(1)
    main(sys.argv[1], json.loads(sys.argv[2]))
