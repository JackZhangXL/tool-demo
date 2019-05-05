// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

const schedule = require('node-schedule');

const j = schedule.scheduleJob('49 * * * *', function() {
    console.log('49分（例如19:49, 20:49）时执行');
});

const j2 = schedule.scheduleJob({hour: 17, minute: 24, dayOfWeek: 0}, function() {
    console.log('周日的 17:23 分执行');
});


const date = new Date(2019, 11, 21, 5, 30, 0);
const j3 = schedule.scheduleJob(date, function() {
    console.log('可以指定具体时间，例如 2019-11-21 05:30:00');
});


const rule = new schedule.RecurrenceRule();
rule.minute = 9;
const j4 = schedule.scheduleJob(rule, function() {
    console.log('每小时的09分执行');
});


const rule2 = new schedule.RecurrenceRule();
rule2.dayOfWeek = [0, new schedule.Range(4, 6)];
rule2.hour = 17;
rule2.minute = 24;
const j5 = schedule.scheduleJob(rule2, function() {
    console.log('每周四~周日的 17:24 执行');
});


const startTime = new Date(Date.now() + 5000);
const endTime = new Date(startTime.getTime() + 5000);
const j6 = schedule.scheduleJob({ start: startTime, end: endTime, rule: '*/1 * * * * *' }, function(){
    console.log('5秒后执行，10秒后停止。每秒都执行，所以共执行5次。');
});
