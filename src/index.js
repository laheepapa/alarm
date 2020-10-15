// es modules are recommended, if available, especially for typescript
import flatpickr from "flatpickr";
import AlarmModel from "./model";

let now = new Date().getTime(); // 기준시간 (Default: 현재시간)
let tick; // 1초 단위 틱
let alarmList = []; // 등록된 알람 리스트

const currentTime = flatpickr("#currentTime", { // 기준시간 관리
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i:S",
    minuteIncrement: 1,
    defaultDate: now,
    onOpen: [function(selectedDates, dateStr, instance) {
        endTick();
    }],
    onChange: function(selectedDates, dateStr, instance) {
        console.log('onChange');
        now = new Date(selectedDates).getTime();
    },
    onClose: function(selectedDates, dateStr, instance){
        console.log('onClose');
        now = new Date(selectedDates).getTime();
        startTick();
    }
});

let startTick = () => { // 틱 시작
        tick = setTimeout(() => {
            now += 1000;
            currentTime.setDate(now);
            checkAlarm();
            startTick();
        }, 1000);
    }

let endTick = () => { // 틱 종료
        clearTimeout(tick);
    }

let checkAlarm = () => { // 알람 순회 & 체크
        let time = document.getElementById('currentTime').value;
        alarmList.map(alarm => {
            if (alarm.alarmTime === time ) { // 알람-기준시간 도달 시
                if(alarm.enable){
                    let result = getAlarmWay(alarm.alarmMode)
                    alert(result); // alert
                }
            }
        })
    }

const alarmTime = flatpickr("#alarmTime", { // 알람 세팅 시간 관리
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i:S",
        minuteIncrement: 1,
        defaultDate: now,
});

    //2. 알람 등록
    document.getElementById('sendBtn').addEventListener('click' , (e) =>{
        
        let data ={
            timerType : document.getElementById('timerType').value,
            date : document.getElementById('date').value,
            alarmMode : document.getElementById('alarmMode').value,
            alarmTime : document.getElementById('alarmTime').value,
            context : document.getElementById('context').value,
            enable : true
        }
        const alarmModel = new AlarmModel(data);

        var flag = false;        
        alarmList.map(el => {
            if(el.alarmTime === alarmModel.alarmTime){
                flag = true;
            }
        });
        
        if(!flag){
            alarmList.push(alarmModel); 
        } else {
            alert(`${alarmModel.alarmTime}은 이미 존재 합니다.`); // alert
        }

        if(alarmList.length > 0){
            //오름차순 정렬 
            let sortList = alarmList.sort(function (before, after)  { 
                if (before.alarmTime.split(':')[0] > after.alarmTime.split(':')[0]){
                        return 1;
                } else { 
                    if(before.alarmTime.split(':')[1] > after.alarmTime.split(':')[1]){
                        return 1 ;
                    } else {
                    return -1 ;
                    }
                }
            });  
            renderAlarmList(sortList);
        } else {
            renderAlarmList(alarmList);
        }

    })

//4. 알람 목록 + 삭제, 중지 버튼 추가
let renderAlarmList= (items) => { // 알람 리스트 재렌더링
        document.getElementById('alarm_list').textContent = '';
        items.map(alarm => {
            let plusUl = document.createElement('ul');
            plusUl.innerHTML =  `<li>${alarm.alarmTime} ${alarm.context}</li>`;   
            document.getElementById('alarm_list').appendChild(plusUl);

            let deletebtn = document.createElement('button');
            deletebtn.textContent ='삭제';
            deletebtn.setAttribute('value',alarm.alarmTime)
            document.getElementById('alarm_list').appendChild(deletebtn);
        
            deletebtn.addEventListener('click', (e) => {                              
                alarmList = alarmList.filter((val) => { 
                        return val.alarmTime !== e.target.value
                    }
                )
                renderAlarmList(alarmList);
            })
            
            let stopBtn = document.createElement('button');
            stopBtn.textContent ='끄기';
            stopBtn.setAttribute('value',alarm.alarmTime)
            document.getElementById('alarm_list').appendChild(stopBtn);    
            stopBtn.addEventListener('click', (e) => {
            alarmList.map( (val) => { 
                    if(val.alarmTime === e.target.value){
                        val.enable = false;
                    }
                })
            })
        });
    }


   let getAlarmWay = (alarmMode) => { // 알람 방법 (소리/진동)
        let result = '';
        switch (document.getElementById('timerType').value) {
            case 'normal':
                result = '띠링~~';
                break;
            case 'vibe':
                result = '지잉~~';
                break;
            case 'night':
                if (alarmMode === 'nomal') {
                    result = '';
                } else {
                    result = '띠링~~';
                }
                break;
            default:
                break;
        }
        return result;
    }
  
    startTick();