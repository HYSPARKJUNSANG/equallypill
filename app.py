from flask import Flask, render_template, request, jsonify
import csv
import os

app = Flask(__name__)

# CSV 파일에서 의약품 데이터 로드
def load_medicines():
    medicines = []
    with open('medicines.csv', 'r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            medicines.append(row)
    return medicines

# 의약품 검색 함수
def search_medicines(query):
    medicines = load_medicines()
    results = []
    group = None
    for medicine in medicines:
        if query in medicine.get('제품코드', '') or query in medicine.get('제품명', ''):
            group = medicine.get('Group', '')
            break
    
    if group:
        for medicine in medicines:
            if medicine.get('Group', '') == group:
                results.append(medicine)
    
    return group, results

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.json['query']
    group, results = search_medicines(query)
    return jsonify({'group': group, 'results': results})

if __name__ == '__main__':
    app.run(debug=True)