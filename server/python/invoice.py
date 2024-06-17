from flask import Flask, request, jsonify
import csv
import traceback
app = Flask(__name__)
def search_word_in_csv(word, file_path):
    data_under_word = []
    with open(file_path, mode='r', encoding='utf-8-sig') as file:
        reader = csv.reader(file)
        for row in reader:
            if word in row:
                index = row.index(word)
                data_under_word.extend([row[index] for row in reader])
                break
    return data_under_word
@app.route('/processCsv', methods=['POST'])
def process_csv():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        csv_file_name = data.get('csv_file_name')
        selected_cells = data.get('selected_cells')
        if not csv_file_name or not selected_cells:
            return jsonify({'error': 'csv_file_path and selected_cells are required'}), 400
        arrays = []
        for word in selected_cells:
            data = search_word_in_csv(word,f'server/public/invoices/{csv_file_name}')
            if isinstance(data, str): return jsonify({'error': data}), 500
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
                key = selected_cells[j]
                obj[key] = array[i]
            if not all(value == '' for value in obj.values()):
                
                if obj["date_facture"]:
                    obj["date_facture"] = obj["date_facture"][0:10]
                if obj["total"] != '':
                    total_value = float(obj["total"])
                    if total_value > 0:
                        obj["category"] = "V"
                    else:
                        obj["category"] = "A"
                result.append(obj)
        return jsonify(result), 200
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)