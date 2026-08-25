/* =========================================
   MoveCare - app.js
   ========================================= */

"use strict";

/* =========================================
   إعدادات التطبيق
========================================= */

const MOVECARE_CONFIG = {
  REST_SECONDS: 25,
  DEFAULT_EXERCISE_SECONDS: 30,
  STORAGE_SETTINGS: "movecare_settings",
  STORAGE_PROGRESS: "movecare_progress"
};


/* =========================================
   حالة التطبيق
========================================= */

const AppState = {

  settings: null,

  selectedDay: null,

  workout: [],

  currentExercise: 0,

  timer: null,

  seconds: 0,

  paused: false,

  mode: "exercise",

  completedDays: [],

  sessionStarted: false

};


/* =========================================
   اختصارات العناصر
========================================= */

function $(id) {
  return document.getElementById(id);
}


/* =========================================
   حفظ الإعدادات
========================================= */

function saveSettings(settings) {

  AppState.settings = settings;

  localStorage.setItem(
    MOVECARE_CONFIG.STORAGE_SETTINGS,
    JSON.stringify(settings)
  );

}


/* =========================================
   قراءة الإعدادات
========================================= */

function loadSettings() {

  const saved = localStorage.getItem(
    MOVECARE_CONFIG.STORAGE_SETTINGS
  );

  if (!saved) {
    return null;
  }

  try {

    return JSON.parse(saved);

  } catch (error) {

    console.error("خطأ في قراءة الإعدادات", error);

    return null;

  }

}


/* =========================================
   حفظ التقدم
========================================= */

function saveProgress() {

  localStorage.setItem(
    MOVECARE_CONFIG.STORAGE_PROGRESS,
    JSON.stringify(AppState.completedDays)
  );

}


/* =========================================
   قراءة التقدم
========================================= */

function loadProgress() {

  const saved = localStorage.getItem(
    MOVECARE_CONFIG.STORAGE_PROGRESS
  );

  if (!saved) {

    AppState.completedDays = [];

    return;

  }

  try {

    AppState.completedDays = JSON.parse(saved);

  } catch {

    AppState.completedDays = [];

  }

}


/* =========================================
   الأيام
========================================= */

const WEEK_DAYS = [
  "السبت",
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة"
];


/* =========================================
   تحديد اليوم
========================================= */

function selectWorkoutDay(day) {

  if (
    !AppState.settings ||
    !AppState.settings.days.includes(day)
  ) {

    return;

  }

  AppState.selectedDay = day;

  showDayWorkout(day);

}


/* =========================================
   اختيار نوع البرنامج
========================================= */

function chooseWorkoutCategory() {

  const settings = AppState.settings;

  if (!settings) {

    return "إحماء";

  }


  /*
    إذا كان المستخدم لديه مشكلة في منطقة معينة،
    لا نختار تمارين المنطقة تلقائيًا.
  */

  if (settings.painArea === "الركبة") {

    return "الجزء العلوي";

  }

  if (settings.painArea === "الظهر") {

    return "تمدد";

  }

  if (settings.painArea === "الكتف") {

    return "الرجلين";

  }


  /*
    حسب الهدف
  */

  if (settings.goal === "مرونة") {

    return "تمدد";

  }

  if (settings.goal === "القوة") {

    return "قوة";

  }

  if (settings.goal === "نشاط ولياقة") {

    return "إحماء";

  }


  return "إحماء";

}


/* =========================================
   اختيار تمارين مناسبة
========================================= */

function buildWorkout() {

  if (
    typeof MOVECARE_EXERCISES === "undefined"
  ) {

    console.error(
      "لم يتم العثور على MOVECARE_EXERCISES"
    );

    return [];

  }

  const settings = AppState.settings;

  let exercises =
    [...MOVECARE_EXERCISES];


  /* -------------------------------------
     المستوى
  ------------------------------------- */

  if (settings.level) {

    if (settings.level === "مبتدئ") {

      exercises = exercises.filter(
        exercise =>
          exercise.level === "مبتدئ"
      );

    }

    if (settings.level === "متوسط") {

      exercises = exercises.filter(
        exercise =>
          exercise.level === "مبتدئ" ||
          exercise.level === "متوسط"
      );

    }

  }


  /* -------------------------------------
     استبعاد المناطق التي أبلغ المستخدم
     عن وجود ألم فيها
  ------------------------------------- */

  if (settings.painArea) {

    const blockedCategories = [];

    if (settings.painArea === "الركبة") {

      blockedCategories.push("الرجلين");

    }

    if (settings.painArea === "الظهر") {

      blockedCategories.push("الظهر");

    }

    if (settings.painArea === "الكتف") {

      blockedCategories.push("الكتفين");

      blockedCategories.push("الذراعين");

    }

    exercises =
      exercises.filter(
        exercise =>
          !blockedCategories.includes(
            exercise.category
          )
      );

  }


  /* -------------------------------------
     إذا أصبحت القائمة صغيرة جدًا،
     نستخدم التمارين الخفيفة فقط
  ------------------------------------- */

  if (exercises.length < 4) {

    exercises =
      MOVECARE_EXERCISES.filter(
        exercise =>
          exercise.level === "مبتدئ" &&
          exercise.category === "خفيف"
      );

  }


  /* -------------------------------------
     خلط التمارين
  ------------------------------------- */

  exercises.sort(
    () => Math.random() - 0.5
  );


  /*
    جلسة منزلية قصيرة:
    6 تمارين تقريبًا
  */

  return exercises.slice(0, 6);

}


/* =========================================
   عرض تمارين اليوم
========================================= */

function showDayWorkout(day) {

  AppState.selectedDay = day;

  const list = $("homeExercises");

  if (!list) {

    return;

  }

  const workout =
    buildWorkoutPreview();


  list.innerHTML = "";


  if (!workout.length) {

    list.innerHTML =
      "<p>لا توجد تمارين مناسبة حاليًا.</p>";

    return;

  }


  workout.forEach(
    (exercise, index) => {

      const row =
        document.createElement("div");

      row.className =
        "exercise-row";


      row.innerHTML = `

        <div class="exercise-number">
          ${index + 1}
        </div>

        <div class="exercise-info">

          <strong>
            ${exercise.name}
          </strong>

          <span>
            ${exercise.duration} ثانية
            • ${exercise.level}
          </span>

        </div>

      `;


      list.appendChild(row);

    }
  );

}


/* =========================================
   معاينة البرنامج
========================================= */

function buildWorkoutPreview() {

  const oldWorkout =
    AppState.workout;


  if (oldWorkout.length) {

    return oldWorkout;

  }


  return buildWorkout();

}


/* =========================================
   بدء جلسة
========================================= */

function startWorkoutSession(day) {

  if (!AppState.settings) {

    alert(
      "أكمل إعداد MoveCare أولًا."
    );

    return;

  }


  AppState.selectedDay =
    day || AppState.selectedDay;


  AppState.workout =
    buildWorkout();


  if (!AppState.workout.length) {

    alert(
      "لم نجد تمارين مناسبة لهذا البرنامج."
    );

    return;

  }


  AppState.currentExercise = 0;

  AppState.sessionStarted = true;

  AppState.paused = false;

  AppState.mode = "exercise";


  const home =
    $("homeScreen");

  const workoutScreen =
    $("workoutScreen");


  if (home) {

    home.classList.add("hidden");

  }

  if (workoutScreen) {

    workoutScreen.classList.remove("hidden");

  }


  showCurrentExercise();

}


/* =========================================
   عرض التمرين الحالي
========================================= */

function showCurrentExercise() {

  clearTimer();


  const exercise =
    AppState.workout[
      AppState.currentExercise
    ];


  if (!exercise) {

    finishWorkoutSession();

    return;

  }


  AppState.mode = "exercise";

  AppState.paused = false;

  AppState.seconds =
    exercise.duration ||
    MOVECARE_CONFIG.DEFAULT_EXERCISE_SECONDS;


  if ($("exerciseArea")) {

    $("exerciseArea")
      .classList.remove("hidden");

  }

  if ($("restArea")) {

    $("restArea")
      .classList.add("hidden");

  }


  if ($("currentExerciseName")) {

    $("currentExerciseName")
      .textContent =
      exercise.name;

  }


  if ($("currentExerciseDescription")) {

    $("currentExerciseDescription")
      .textContent =
      exercise.description;

  }


  if ($("exerciseTimer")) {

    $("exerciseTimer")
      .textContent =
      AppState.seconds;

  }


  updateSessionInformation();

  updateNextExercisePreview();

  startMovement(exercise.movement);

  startExerciseTimer();

}


/* =========================================
   معلومات الجلسة
========================================= */

function updateSessionInformation() {

  const current =
    AppState.currentExercise + 1;

  const total =
    AppState.workout.length;


  if ($("sessionExerciseCount")) {

    $("sessionExerciseCount")
      .textContent =
      `التمرين ${current} من ${total}`;

  }


  if ($("sessionDay")) {

    $("sessionDay")
      .textContent =
      AppState.selectedDay || "";

  }


  const percentage =
    ((current - 1) / total) * 100;


  if ($("sessionProgress")) {

    $("sessionProgress")
      .style.width =
      percentage + "%";

  }

}


/* =========================================
   مؤقت التمرين
========================================= */

function startExerciseTimer() {

  clearTimer();


  AppState.timer =
    setInterval(() => {

      if (AppState.paused) {

        return;

      }


      AppState.seconds--;


      if ($("exerciseTimer")) {

        $("exerciseTimer")
          .textContent =
          AppState.seconds;

      }


      if (AppState.seconds <= 0) {

        clearTimer();

        startRestPeriod();

      }

    }, 1000);

}


/* =========================================
   بداية الراحة
========================================= */

function startRestPeriod() {

  clearTimer();


  AppState.mode = "rest";

  AppState.paused = false;

  AppState.seconds =
    MOVECARE_CONFIG.REST_SECONDS;


  if ($("exerciseArea")) {

    $("exerciseArea")
      .classList.add("hidden");

  }


  if ($("restArea")) {

    $("restArea")
      .classList.remove("hidden");

  }


  updateNextExercisePreview();


  if ($("restTimer")) {

    $("restTimer")
      .textContent =
      AppState.seconds;

  }


  AppState.timer =
    setInterval(() => {

      if (AppState.paused) {

        return;

      }


      AppState.seconds--;


      if ($("restTimer")) {

        $("restTimer")
          .textContent =
          AppState.seconds;

      }


      if (AppState.seconds <= 0) {

        clearTimer();

        nextExercise();

      }

    }, 1000);

}


/* =========================================
   التمرين القادم
========================================= */

function getNextExercise() {

  return AppState.workout[
    AppState.currentExercise + 1
  ] || null;

}


/* =========================================
   عرض التمرين القادم أثناء الراحة
========================================= */

function updateNextExercisePreview() {

  const next =
    getNextExercise();


  const name =
    $("nextExerciseName");


  const description =
    $("nextExerciseDescription");


  if (!next) {

    if (name) {

      name.textContent =
        "انتهت الجلسة 🎉";

    }

    if (description) {

      description.textContent =
        "بعد الراحة ستظهر نتيجة تمرينك.";

    }

    return;

  }


  if (name) {

    name.textContent =
      next.name;

  }


  if (description) {

    description.textContent =
      next.description;

  }


  /*
    إذا كان لدينا نظام 3D،
    نعرض معاينة الحركة القادمة.
  */

  if (
    typeof previewMovement === "function"
  ) {

    previewMovement(
      next.movement
    );

  }

}


/* =========================================
   تخطي التمرين
========================================= */

function skipExercise() {

  if (AppState.mode === "rest") {

    skipRest();

    return;

  }


  clearTimer();

  nextExercise();

}


/* =========================================
   تخطي الراحة
========================================= */

function skipRest() {

  clearTimer();

  nextExercise();

}


/* =========================================
   الانتقال للتمرين التالي
========================================= */

function nextExercise() {

  AppState.currentExercise++;


  if (
    AppState.currentExercise >=
    AppState.workout.length
  ) {

    finishWorkoutSession();

    return;

  }


  showCurrentExercise();

}


/* =========================================
   إيقاف واستئناف
========================================= */

function toggleWorkoutPause() {

  AppState.paused =
    !AppState.paused;


  const button =
    $("pauseButton");


  if (button) {

    button.textContent =
      AppState.paused
        ? "استئناف"
        : "إيقاف مؤقت";

  }

}


/* =========================================
   إنهاء الجلسة
========================================= */

function finishWorkoutSession() {

  clearTimer();


  const day =
    AppState.selectedDay;


  if (
    day &&
    !AppState.completedDays.includes(day)
  ) {

    AppState.completedDays.push(day);

    saveProgress();

  }


  AppState.sessionStarted = false;


  if ($("finishScreen")) {

    $("finishScreen")
      .classList.remove("hidden");

  }


  updateHomeStats();

}


/* =========================================
   إغلاق شاشة النهاية
========================================= */

function closeFinishScreen() {

  if ($("finishScreen")) {

    $("finishScreen")
      .classList.add("hidden");

  }


  if ($("workoutScreen")) {

    $("workoutScreen")
      .classList.add("hidden");

  }


  if ($("homeScreen")) {

    $("homeScreen")
      .classList.remove("hidden");

  }


  AppState.workout = [];

  AppState.currentExercise = 0;

  updateHomeStats();

}


/* =========================================
   الخروج من الجلسة
========================================= */

function exitWorkoutSession() {

  if (
    !confirm(
      "هل تريد الخروج من التمرين؟"
    )
  ) {

    return;

  }


  clearTimer();

  AppState.sessionStarted = false;

  AppState.workout = [];


  if ($("workoutScreen")) {

    $("workoutScreen")
      .classList.add("hidden");

  }


  if ($("homeScreen")) {

    $("homeScreen")
      .classList.remove("hidden");

  }

}


/* =========================================
   إحصائيات الرئيسية
========================================= */

function updateHomeStats() {

  if ($("completedDays")) {

    $("completedDays")
      .textContent =
      AppState.completedDays.length;

  }


  if ($("totalWorkouts")) {

    $("totalWorkouts")
      .textContent =
      AppState.completedDays.length * 6;

  }


  if ($("streak")) {

    $("streak")
      .textContent =
      calculateStreak();

  }

}


/* =========================================
   حساب الأيام المتتالية
========================================= */

function calculateStreak() {

  /*
    نسخة بسيطة في البداية.
    سنطورها لاحقًا باستخدام التاريخ الحقيقي.
  */

  return AppState.completedDays.length;

}


/* =========================================
   تشغيل الحركة ثلاثية الأبعاد
========================================= */

function startMovement(type) {

  /*
    هذه الدالة تتصل بملف 3D لاحقًا.
  */

  if (
    typeof set3DMovement === "function"
  ) {

    set3DMovement(type);

  }

}


/* =========================================
   إعادة إعداد التطبيق
========================================= */

function resetMoveCare() {

  if (
    !confirm(
      "هل تريد حذف إعدادات MoveCare والبدء من جديد؟"
    )
  ) {

    return;

  }


  localStorage.removeItem(
    MOVECARE_CONFIG.STORAGE_SETTINGS
  );

  localStorage.removeItem(
    MOVECARE_CONFIG.STORAGE_PROGRESS
  );

  location.reload();

}


/* =========================================
   بدء التطبيق
========================================= */

function initMoveCare() {

  AppState.settings =
    loadSettings();


  loadProgress();


  /*
    إذا لم توجد إعدادات،
    نعرض شاشة الإعداد.
  */

  if (!AppState.settings) {

    if ($("setupScreen")) {

      $("setupScreen")
        .classList.remove("hidden");

    }

    if ($("homeScreen")) {

      $("homeScreen")
        .classList.add("hidden");

    }

    return;

  }


  if ($("setupScreen")) {

    $("setupScreen")
      .classList.add("hidden");

  }


  if ($("homeScreen")) {

    $("homeScreen")
      .classList.remove("hidden");

  }


  AppState.selectedDay =
    AppState.settings.days[0] ||
    WEEK_DAYS[0];


  updateHomeStats();

  showDayWorkout(
    AppState.selectedDay
  );

}


/* =========================================
   تشغيل التطبيق عند تحميل الصفحة
========================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initMoveCare();

  }
);
