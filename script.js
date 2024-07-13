// 검색 입력란과 결과 표시 영역 선택
const searchInput = document.getElementById('search-input');
const autocompleteResults = document.getElementById('autocomplete-results');
const resultsDiv = document.getElementById('results');

// 가상의 의약품 데이터 (실제 데이터로 대체해야 함)
const medications = [
    { name: "아스피린", price: 5000 },
    { name: "타이레놀", price: 3000 },
    { name: "이부프로펜", price: 4000 }
];

// 검색 입력 이벤트 리스너
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const matchedMedications = medications.filter(med => 
        med.name.toLowerCase().includes(searchTerm)
    );

    displayAutocomplete(matchedMedications);
});

// 자동완성 결과 표시
function displayAutocomplete(medications) {
    autocompleteResults.innerHTML = '';
    autocompleteResults.style.display = medications.length ? 'block' : 'none';

    medications.forEach(med => {
        const div = document.createElement('div');
        div.textContent = med.name;
        div.addEventListener('click', () => {
            searchInput.value = med.name;
            displayResults([med]);
            autocompleteResults.style.display = 'none';
        });
        autocompleteResults.appendChild(div);
    });
}

// 검색 결과 표시
function displayResults(medications) {
    resultsDiv.innerHTML = '';
    medications.forEach(med => {
        const div = document.createElement('div');
        div.textContent = `${med.name} - ${med.price}원`;
        resultsDiv.appendChild(div);
    });
}

// 검색창 외부 클릭 시 자동완성 결과 숨기기
document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target) && !autocompleteResults.contains(event.target)) {
        autocompleteResults.style.display = 'none';
    }
});
