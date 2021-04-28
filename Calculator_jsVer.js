// 문제 1 값이 나온 상태에서 퍼센트를 눌렀을때 NaN이 나온다. (O)
// 문제 2 Clear 버튼을 클릭했을때 함수가 작동이 안된다. (O) clear가 페이지에 있는 메소드여서 안되는 거였다.... 이런 간단한 걸 헤매고 있었다니
// 문제 3 기호가 있는 상태에서 퍼센트를 누르면 나눠진 값이 나오지만,
// = 를 눌렀을 때 이상하게 다음 숫자가 붙어서 나옴 (O)
// 문제 3 소숫점이 너무 김

// 기본 세팅
const PLUS = '+'
const SUB = '-'
const MULTI = '*'
const DIV = '/'   
const PERCENT = '%'

var cal_arr = []
var nums = []
var pattern = /[+*/%-]/

function clear_page() {
    result.textContent = ''
    progress.textContent = ''
    nums = []
    cal_arr = [] 
} 

function num_input(value) {
    if ( progress.textContent.match(pattern) && !progress.textContent.match('=') ){
        result.textContent = ''
    }
    else if ( progress.textContent.match('=') ){
        result.textContent = '';
        progress.textContent = '';
    }
    else if ( progress.textContent == 0 && result.textContent == 0 )
        clear_page()

    nums.push(value)
    result.textContent = nums.join('')
}     

function value_input(value) {
    cal_arr.push(nums.join(''))
    nums = []

    if ( cal_arr.join('').match('=') )
        cal_arr = [result.textContent, value]
    else if ( cal_arr[cal_arr.length-1] == "" )
    {
        cal_arr.pop()
        cal_arr[cal_arr.length-1] = value
    }
    else {
        cal_arr = [eval(cal_arr.join(''))]
        cal_arr.push(value)
        result.textContent = cal_arr[0]
    }
    progress.textContent = cal_arr.join('')
}

function cal_percent() {
    //계산을 위해 String -> Number로 데이터타입 변환
    var res = Number(result.textContent)
    
    if ( nums != "" )
        cal_arr.push(nums.join(''))

    //계산이 한번 발생한 경우
    if ( cal_arr.join('').match('=') ) {
        nums = [String(res*(res/100))]
        result.textContent = res*(res/100)
        progress.textContent = res*(res/100)
    }
    // 계산과정배열에 부호가 있는 경우(result에 있는 숫자를 %계산)
    else if ( progress.textContent.match(pattern) )
    {
        //사용자가 새로운 숫자를 입력했는지 확인
        if ( !cal_arr[cal_arr.length-1].match(pattern) )
            cal_arr[cal_arr.length-1] = String(res*(res/100))
        else
            cal_arr.push(String(res*(res/100)))
        result.textContent = res*(res/100)
        progress.textContent = cal_arr.join('')
    }
    //결과값을 계산과정배열 첫번째 index에 저장
    cal_arr[0] = res
    nums = []
}
        

function cal() {
    let equl = '='
    if ( nums != "" && !cal_arr.join('').match('=') )
        cal_arr.push(nums.join(''))

    if ( !cal_arr.join('').match('=') ) {
        if ( cal_arr[cal_arr.length-1].length == 1 && cal_arr[cal_arr.length-1].match(pattern) )
            cal_arr.push(result.textContent);
        progress.textContent = cal_arr.join('') + equl
        result.textContent = eval(cal_arr.join(''))
    }
    else if ( cal_arr.join('').match('=') ) {
        cal_arr.pop()
        cal_arr[0] = eval(cal_arr.join(''))
        if ( nums.join('') != "" && nums.join('') != cal_arr[0] ) cal_arr[0]=nums.join('')
        result.textContent = eval(cal_arr.join(''))
        progress.textContent = cal_arr.join('') + equl
    }
    nums = []
    cal_arr.push(equl)
}

function back_space() {
    let progress_value = progress.textContent;
    let result_value = result.textContent;
    if ( progress_value[progress_value.length-1] == '=' )
        progress.textContent = ''
    else if (progress_value.match(pattern) || progress_value == '' )
        if ( !isNaN(Number(result.textContent)) && result.textContent != '' ){
            result.textContent = result_value.slice(0,result_value.length-1)
            nums.pop()
        }
}

function abs() {
    result.textContent = Number(result.textContent)*-1
    nums = [result.textContent]
}

window.addEventListener('DOMContentLoaded',() => {
    result = document.getElementById('output')
    progress = document.getElementById('progress')

    window.addEventListener('keydown', (value) => {
        var val = value;

        if (  !isNaN(Number(val.key)) || val.key == '.' )
            num_input(val.key)
        else if ( val.key == PLUS ) value_input(PLUS)
        else if ( val.key == SUB ) value_input(SUB)
        else if ( val.key == MULTI ) value_input(MULTI)
        else if ( val.key == DIV ) value_input(DIV)
        else if ( val.key == PERCENT ) cal_percent()
        else if ( val.key == 'Enter' ) cal()
        else if ( val.key == 'Backspace') back_space()
        else if ( val.key == 'Escape') clear_page()
    })
})       