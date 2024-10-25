//캘린더
document.addEventListener("DOMContentLoaded", function () {
  // Calendar 초기화
  var calendar = new tui.Calendar("#calendar", {
    defaultView: "month",
    useCreationPopup: true,
    useDetailPopup: true,
  });

  // 샘플 일정 데이터
  calendar.createEvents([
    {
      id: "1",
      calendarId: "1",
      title: "Guitar Practice - Song 1",
      category: "time",
      start: "2024-10-25T10:00:00",
      end: "2024-10-25T12:00:00",
      isAllDay: false,
      state: false,
      attendees: ["John"],
    },
    {
      id: "2",
      calendarId: "1",
      title: "Drums Practice - Song 2",
      category: "time",
      start: "2024-10-26T14:00:00",
      end: "2024-10-26T16:00:00",
      isAllDay: false,
      state: false,
      attendees: ["Alice"],
    },
  ]);

  calendar.on("beforeCreateSchedule", function (event) {
    const scheduleData = {
      id: String(Math.random()),
      calendarId: "1",
      title: "${event.raw.instrument} Practice - ${event.raw.song}",
      category: "time",
      start: event.start,
      end: event.end,
      attendees: event.raw.performer,
    };
    calendar.createEvents([scheduleData]);
  });
});

//연습량 랭킹
var ctx1 = document.getElementById("practiceTimeChart").getContext("2d");
new Chart(ctx1, {
  type: "bar",
  data: {
    labels: ["Guitar", "Drums", "Bass", "Vocals"],
    datasets: [
      {
        label: "Practice Hours",
        data: [10, 15, 7, 12],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// 곡 완성도
var ctx2 = document.getElementById("songCompletionChart").getContext("2d");
new Chart(ctx2, {
  type: "doughnut",
  data: {
    labels: ["complete", "Incomplete"],
    datasets: [
      {
        label: "Completion Level",
        data: [70, 20],
        backgroundColor: ["#FF6384", "#4BC0C0"],
      },
    ],
  },
  options: {
    responsive: true,
  },
});

//합주 시간 추천
function calculatePopularDays(schedules) {
  var dayCount = {
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  };
  schedules.forEach(function (schedule) {
    var day = new Date(schedule.start).toLocaleString("en-US", {
      weekday: "long",
    });
    dayCount[day]++;
  });
  var popularDay = Object.keys(dayCount).reduce(function (a, b) {
    return dayCount[a] > dayCount[b] ? a : b;
  });
  return popularDay;
}

function calculatePopularTime(schedules) {
  var timeSlots = {
    "06:00 - 08:00": 0,
    "08:00 - 10:00": 0,
    "10:00 - 12:00": 0,
    "12:00 - 14:00": 0,
    "14:00 - 16:00": 0,
    "16:00 - 18:00": 0,
    "18:00 - 20:00": 0,
    "20:00 - 22:00": 0,
  };
  schedules.forEach(function (schedule) {
    var startTime = new Date(schedule.start).getHours();

    if (startTime >= 6 && startTime < 8) {
      timeSlots["08:00 - 10:00"]++;
    } else if (startTime >= 10 && startTime < 12) {
      timeSlots["10:00 - 12:00"]++;
    } else if (startTime >= 12 && startTime < 14) {
      timeSlots["12:00 - 14:00"]++;
    } else if (startTime >= 14 && startTime < 16) {
      timeSlots["14:00 - 16:00"]++;
    } else if (startTime >= 16 && startTime < 18) {
      timeSlots["16:00 - 18:00"]++;
    } else if (startTime >= 18 && startTime < 20) {
      timeSlots["18:00 - 20:00"]++;
    } else if (startTime >= 20 && startTime < 22) {
      timeSlots["20:00 - 22:00"]++;
    }
  });

  var popularTime = Object.keys(timeSlots).reduce(function (a, b) {
    return timeSlots[a] > timeSlots[b] ? a : b;
  });
  return popularTime;
}

function updateRehearsalRecommendation() {
  var schedules = calendar.getSchedules();
  var recommendedDay = calculatePopularDays(schedules);
  var recommendedTime = calculatePopularTime(schedules);
  var recommendationText = `Get to rehearsal on\n${recommendedDay} at ${recommendedTime}, you punks!`;
  document.getElementById("recommendedDayTime").innerText = recommendationText;
}
