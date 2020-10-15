export default  class AlarmModel {
    constructor(model) {
        this.timerType = model.timerType || 'normal';
        this.date = model.date || null;

        this.alarmMode = model.alarmMode || null;
        this.alarmTime = model.alarmTime || null;
        this.context = model.context || '';
        this.enable = model.enable || true;
    }
}

